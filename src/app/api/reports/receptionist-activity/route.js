// /api/reports/receptionist-activity/route.js
import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Successfully connected to the database for receptionist activity report.");

    // Query to get total number of receptionists
    const [totalReceptionistsRows] = await connection.execute(`
      SELECT COUNT(*) AS totalReceptionists FROM employee WHERE employee_type = 'Receptionist'
    `);
    const totalReceptionists = totalReceptionistsRows[0].totalReceptionists;

    // Query to get receptionists by department (assuming receptionists are assigned to departments like other employee)
    const [departmentRows] = await connection.execute(`
      SELECT d.name AS department_name, COUNT(e.employee_id) AS count
      FROM employee e
      JOIN department d ON e.department_id = d.department_id
      WHERE e.employee_type = 'Receptionist'
      GROUP BY d.name
      ORDER BY count DESC
    `);
    const departmentDistribution = departmentRows.reduce((acc, row) => {
      acc[row.department_name] = row.count;
      return acc;
    }, {});
    
    // Example: Average patient check-ins per receptionist today (Placeholder - requires specific schema)
    const averageCheckIns = 'N/A (requires check-in tracking schema)';

    const reportData = {
      totalReceptionists,
      departmentDistribution,
      averageCheckIns,
      // Add more relevant data points as needed
    };

    return NextResponse.json(reportData);

  } catch (error) {
    console.error('API /api/reports/receptionist-activity Error:', error);
    return NextResponse.json({ 
      message: 'Error fetching receptionist activity report data.', 
      error: error.message || 'An unknown error occurred.',
      errorDetails: error.code 
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
