import { NextResponse } from 'next/server';
import pool from '@/utils/db'; // Corrected path
import dbSemaphore from '@/utils/db-semaphore'; // Corrected path

export async function GET(request) {
  let connection;
  try {
    await dbSemaphore.acquire(); // Acquire semaphore before getting a connection
    connection = await pool.getConnection();

    // Summary Statistics
    const [summaryRows] = await connection.execute(`
      SELECT
        (SELECT COUNT(*) FROM appointment) AS totalAppointments,
        (SELECT COUNT(*) FROM appointment WHERE DATE(date_time) = CURDATE()) AS appointmentsToday,
        (SELECT COUNT(*) FROM appointment WHERE date_time >= DATE_FORMAT(CURDATE(), '%Y-%m-01') AND date_time < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01')) AS appointmentsThisMonth,
        (SELECT AVG(duration) FROM appointment WHERE duration IS NOT NULL) AS averageDurationMinutes,
        (SELECT SUM(p.amount_paid) FROM payment p JOIN appointment a ON p.payment_id = a.payment_id WHERE p.payment_status = 'Paid') AS totalRevenue
    `);

    // Appointments by Doctor
    const [appointmentsByDoctorRows] = await connection.execute(`
      SELECT
        e.first_name AS doctor_first_name,
        e.last_name AS doctor_last_name,
        doc.specialization,
        COUNT(a.appointment_id) AS appointment_count,
        AVG(a.duration) AS average_duration
      FROM appointment a
      JOIN doctor doc ON a.D_employee_id = doc.D_employee_id
      JOIN employee e ON doc.D_employee_id = e.employee_id
      GROUP BY a.D_employee_id, e.first_name, e.last_name, doc.specialization
      ORDER BY appointment_count DESC
      LIMIT 10;
    `);

    // Appointments by Payment Status
    const [appointmentsByPaymentStatusRows] = await connection.execute(`
      SELECT
        COALESCE(p.payment_status, 'Unpaid/Pending') AS payment_status,
        COUNT(a.appointment_id) AS appointment_count
      FROM appointment a
      LEFT JOIN payment p ON a.payment_id = p.payment_id
      GROUP BY COALESCE(p.payment_status, 'Unpaid/Pending')
      ORDER BY appointment_count DESC;
    `);

    // Upcoming Appointments (Next 7 Days)
    const [upcomingAppointmentsRows] = await connection.execute(`
      SELECT
        a.appointment_id,
        a.date_time,
        a.duration,
        pat.first_name AS patient_first_name,
        pat.last_name AS patient_last_name,
        e.first_name AS doctor_first_name,
        e.last_name AS doctor_last_name,
        doc.specialization
      FROM appointment a
      JOIN patient pat ON a.patient_id = pat.patient_id
      JOIN doctor doc ON a.D_employee_id = doc.D_employee_id
      JOIN employee e ON doc.D_employee_id = e.employee_id
      WHERE a.date_time BETWEEN NOW() AND NOW() + INTERVAL 7 DAY
      ORDER BY a.date_time ASC
      LIMIT 10;
    `);

    const reportData = {
      summary: {
        totalAppointments: summaryRows[0].totalAppointments || 0,
        appointmentsToday: summaryRows[0].appointmentsToday || 0,
        appointmentsThisMonth: summaryRows[0].appointmentsThisMonth || 0,
        averageDurationMinutes: summaryRows[0].averageDurationMinutes || 0,
        totalRevenue: summaryRows[0].totalRevenue || 0,
      },
      appointmentsByDoctor: appointmentsByDoctorRows.map(row => ({
        ...row,
        average_duration: row.average_duration || 0
      })),
      appointmentsByPaymentStatus: appointmentsByPaymentStatusRows,
      upcomingAppointments: upcomingAppointmentsRows,
    };

    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch appointment reports:', error);
    return NextResponse.json({ error: 'Failed to fetch appointment reports', details: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
    dbSemaphore.release(); // Release semaphore
  }
}
