// /api/reports/nurse-activity/route.js
import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Successfully connected to the database for nurse activity report.");

    // Query to get total number of nurses
    const [totalNursesRows] = await connection.execute(`
      SELECT COUNT(*) AS totalNurses FROM employee WHERE employee_type = 'Nurse'
    `);
    const totalNurses = totalNursesRows[0].totalNurses;

    // Query to get nurses by department
    const [departmentRows] = await connection.execute(`
      SELECT d.name AS department_name, COUNT(e.employee_id) AS count
      FROM employee e
      JOIN department d ON e.department_id = d.department_id
      WHERE e.employee_type = 'Nurse'
      GROUP BY d.name
      ORDER BY count DESC
    `);
    const departmentDistribution = departmentRows.reduce((acc, row) => {
      acc[row.department_name] = row.count;
      return acc;
    }, {});

    // Query to get nurses by shift - COMMENTED OUT DUE TO SCHEMA LIMITATION
    // const [shiftRows] = await connection.execute(`
    //   SELECT nwa.shift, COUNT(DISTINCT nwa.N_employee_id) AS count
    //   FROM Nemployee_ward_assigned nwa
    //   JOIN employee e ON nwa.N_employee_id = e.employee_id
    //   WHERE e.employee_type = 'Nurse' AND nwa.shift IS NOT NULL AND nwa.shift <> ''
    //   GROUP BY nwa.shift
    //   ORDER BY nwa.shift
    // `);
    // const shiftDistribution = shiftRows.reduce((acc, row) => {
    //   acc[row.shift] = row.count;
    //   return acc;
    // }, {});
    const shiftDistribution = { "Note": "Shift data not available due to schema limitations." };


    // Query to get nurses by ward
    const [wardRows] = await connection.execute(`
      SELECT nwa.ward_assigned, COUNT(DISTINCT nwa.N_employee_id) AS count
      FROM Nemployee_ward_assigned nwa
      JOIN employee e ON nwa.N_employee_id = e.employee_id
      WHERE e.employee_type = 'Nurse'
      GROUP BY nwa.ward_assigned
      ORDER BY count DESC
    `);
    const wardDistribution = wardRows.reduce((acc, row) => {
      acc[row.ward_assigned] = row.count; // Corrected from row.ward_name
      return acc;
    }, {});
    
    const reportData = {
      totalNurses,
      departmentDistribution,
      shiftDistribution,
      wardDistribution,
    };

    return NextResponse.json(reportData);

  } catch (error) {
    console.error('API /api/reports/nurse-activity Error:', error);
    return NextResponse.json({ 
      message: 'Error fetching nurse activity report data.', 
      error: error.message || 'An unknown error occurred.',
      errorDetails: error.code 
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
