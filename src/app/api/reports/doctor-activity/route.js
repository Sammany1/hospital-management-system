// /api/reports/doctor-activity/route.js
import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Successfully connected to the database for doctor activity report.");

    // Query to get total number of doctors
    const [totalDoctorsRows] = await connection.execute(`
      SELECT COUNT(*) AS totalDoctors FROM employee WHERE employee_type = 'Doctor'
    `);
    const totalDoctors = totalDoctorsRows[0].totalDoctors;

    // Query to get doctors by specialization
    const [specializationRows] = await connection.execute(`
      SELECT d.specialization, COUNT(e.employee_id) AS count
      FROM employee e
      JOIN doctor d ON e.employee_id = d.D_employee_id
      WHERE e.employee_type = 'Doctor'
      GROUP BY d.specialization
      ORDER BY count DESC
    `);
    const specializationDistribution = specializationRows.reduce((acc, row) => {
      acc[row.specialization] = row.count;
      return acc;
    }, {});

    // Query to get average patient load (example: appointments per doctor in the last 30 days)
    // This is a simplified example. A real-world scenario might involve more complex logic.
    const [avgPatientLoadRows] = await connection.execute(`
      SELECT 
        AVG(appointment_count) AS averagePatientLoad
      FROM (
        SELECT 
          a.D_employee_id, 
          COUNT(a.appointment_id) AS appointment_count
        FROM appointment a
        JOIN employee e ON a.D_employee_id = e.employee_id
        WHERE e.employee_type = 'Doctor' AND a.date_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY a.D_employee_id
      ) AS doctor_appointments
    `);
    const averagePatientLoad = avgPatientLoadRows[0].averagePatientLoad ? parseFloat(avgPatientLoadRows[0].averagePatientLoad).toFixed(2) : 'N/A';
    
    // Query for doctors with most appointments in the last 30 days (Top 5)
    const [topDoctorsByAppointmentsRows] = await connection.execute(`
      SELECT e.first_name, e.last_name, COUNT(a.appointment_id) AS appointment_count
      FROM employee e
      JOIN doctor d ON e.employee_id = d.D_employee_id
      JOIN appointment a ON e.employee_id = a.D_employee_id
      WHERE e.employee_type = 'Doctor' AND a.date_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY e.employee_id, e.first_name, e.last_name
      ORDER BY appointment_count DESC
      LIMIT 5
    `);


    const reportData = {
      totalDoctors,
      specializationDistribution,
      averagePatientLoad,
      topDoctorsByAppointments: topDoctorsByAppointmentsRows,
      // Add more data points as needed
    };

    return NextResponse.json(reportData);

  } catch (error) {
    console.error('API /api/reports/doctor-activity Error:', error);
    // Ensure a consistent error response structure
    return NextResponse.json({ 
      message: 'Error fetching doctor activity report data.', 
      error: error.message || 'An unknown error occurred.', // Provide a fallback error message
      errorDetails: error.code 
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
