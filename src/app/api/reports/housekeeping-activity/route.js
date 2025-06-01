// /api/reports/housekeeping-activity/route.js
import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Successfully connected to the database for housekeeping activity report.");

    // Query to get total number of housekeeping employee
    const [totalEmployeeRows] = await connection.execute(`
      SELECT COUNT(*) AS totalHousekeepingEmployee FROM employee WHERE employee_type = 'Housekeeping'
    `);
    const totalHousekeepingEmployee = totalEmployeeRows[0].totalHousekeepingEmployee;

    // Query to get housekeeping employee by assigned area (example)
    // This assumes a table 'employee_area_assigned' links housekeeping employee to areas
    const [areaAssignmentRows] = await connection.execute(`
      SELECT eaa.area_assigned, COUNT(eaa.HK_employee_id) AS count
      FROM employee_area_assigned eaa
      JOIN employee e ON eaa.HK_employee_id = e.employee_id
      WHERE e.employee_type = 'Housekeeping'
      GROUP BY eaa.area_assigned
      ORDER BY count DESC
    `);
    const areaAssignments = areaAssignmentRows.reduce((acc, row) => {
      acc[row.area_assigned] = row.count;
      return acc;
    }, {});

    // Example: Tasks completed today (requires a 'tasks' table or similar)
    // For demonstration, let's assume a placeholder value or a simplified query if schema is unknown
    // const [tasksTodayRows] = await connection.execute(
    //   `SELECT COUNT(*) AS tasksCompletedToday FROM housekeeping_tasks WHERE DATE(completion_date) = CURDATE()`
    // );
    // const tasksCompletedToday = tasksTodayRows.length > 0 ? tasksTodayRows[0].tasksCompletedToday : 0;
    const tasksCompletedToday = 'N/A (requires task tracking schema)'; // Placeholder

    // Example: Average cleaning time (requires specific schema for tasks and durations)
    // const [avgCleaningTimeRows] = await connection.execute(
    //   `SELECT AVG(duration_minutes) AS avgCleaningTime FROM housekeeping_tasks WHERE status = 'completed'`
    // );
    // const averageCleaningTime = avgCleaningTimeRows.length > 0 && avgCleaningTimeRows[0].avgCleaningTime ? 
    //                             parseFloat(avgCleaningTimeRows[0].avgCleaningTime).toFixed(2) + ' mins' : 'N/A';
    const averageCleaningTime = 'N/A (requires task tracking schema)'; // Placeholder


    const reportData = {
      totalHousekeepingEmployee,
      areaAssignments,
      tasksCompletedToday, // Example data point
      averageCleaningTime, // Example data point
      // Add more relevant data points as needed
    };

    return NextResponse.json(reportData);

  } catch (error) {
    console.error('API /api/reports/housekeeping-activity Error:', error);
    return NextResponse.json({ 
      message: 'Error fetching housekeeping activity report data.', 
      error: error.message || 'An unknown error occurred.',
      errorDetails: error.code 
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
