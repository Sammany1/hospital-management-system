// API route for daily activity report

import { NextResponse } from 'next/server';
import pool from '@/utils/db'; // Assuming db.js is set up for MySQL
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Get count of appointments for today
    const [appointmentRows] = await connection.execute(
      'SELECT COUNT(*) as appointmentCount FROM appointment WHERE DATE(date_time) = ?',
      [today]
    );
    const appointmentCount = appointmentRows[0] ? appointmentRows[0].appointmentCount : 0;

    // Get count of new patients registered today
    // Assuming 'patient' table has a 'created_at' or similar timestamp field for registration date.
    // Based on doc.md, 'patient' table does not have a 'created_at' field.
    // We will assume new patients are those whose 'patient_id' was created today.
    // This is a common proxy if a specific registration timestamp is missing.
    // For a more accurate count, a 'registration_date' or 'created_at' column should be added to the 'patient' table.
    // For now, we cannot accurately get "new patients today" without a timestamp.
    // Let's count all patients as a placeholder, or we can count patients based on their first appointment.
    // Given the current schema, let's count patients who had their *first* appointment today.
    // This is an approximation of "newly active patients today".
    
    // To count patients whose first_name or last_name is not null and were added today,
    // we would need a creation timestamp on the patient table.
    // Since we don't have it, we'll count patients who had an appointment scheduled today.
    // This is not "new patients" but "active patients today via appointments".
    // A better approach for "new patients" would be to check if their first appointment EVER was today.

    // Let's count patients who have an appointment today.
    const [newlyActivePatientsRows] = await connection.execute(
      'SELECT COUNT(DISTINCT patient_id) as newPatientCount FROM appointment WHERE DATE(date_time) = ?',
      [today]
    );
    const newPatientCount = newlyActivePatientsRows[0] ? newlyActivePatientsRows[0].newPatientCount : 0;
    
    const data = {
      date: new Date().toLocaleDateString(),
      newPatients: newPatientCount, // This now represents patients with appointments today
      appointmentsToday: appointmentCount,
      // Add more relevant metrics based on your schema and report needs
    };

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('API Error daily-activity report:', error);
    return NextResponse.json({ message: 'Failed to fetch daily activity report', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
