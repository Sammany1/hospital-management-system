import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();

    // 1. Total Technicians
    const [totalTechniciansRows] = await connection.execute(
      "SELECT COUNT(*) as totalTechnicians FROM employee WHERE employee_type = 'Technician'"
    );
    const totalTechnicians = totalTechniciansRows[0].totalTechnicians;

    // 2. Specialization Distribution (using tech_area)
    const [specializationRows] = await connection.execute(
      `SELECT eta.tech_area, COUNT(e.employee_id) as count
       FROM employee e
       JOIN employee_tech_area eta ON e.employee_id = eta.T_employee_id
       WHERE e.employee_type = 'Technician'
       GROUP BY eta.tech_area`
    );

    const specializationDistribution = {};
    specializationRows.forEach(row => {
      specializationDistribution[row.tech_area] = row.count;
    });

    // Data for metrics not directly available from schema
    const averageTestsConducted = 'N/A'; // Placeholder
    const topTechniciansByTests = []; // Placeholder

    return NextResponse.json({
      totalTechnicians,
      specializationDistribution,
      averageTestsConducted,
      topTechniciansByTests,
    });

  } catch (error) {
    console.error('API /api/reports/technician-activity Error:', error);
    return NextResponse.json(
      { message: 'Error fetching technician activity report', error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
