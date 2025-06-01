import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    // ...existing code for GET
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}

export async function POST(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    const data = await request.json();
    const {
      patient_id,    // Foreign Key to patient table
      D_employee_id, // Foreign Key to employee table (for doctor)
      date_time,     // datetime for the appointment
      duration,      // int, duration in minutes
      payment_id     // Foreign Key to payment table, can be NULL initially
    } = data;

    // Server-side Validation
    if (!patient_id || !D_employee_id || !date_time) {
      return NextResponse.json({ message: 'Patient ID, Doctor ID, and Appointment Date/Time are required.' }, { status: 400 });
    }
    if (isNaN(parseInt(patient_id))) {
        return NextResponse.json({ message: 'Invalid Patient ID.' }, { status: 400 });
    }
    if (isNaN(parseInt(D_employee_id))) {
        return NextResponse.json({ message: 'Invalid Doctor ID.' }, { status: 400 });
    }
    // Validate date_time format (basic check, more robust validation might be needed)
    if (isNaN(new Date(date_time).getTime())) {
        return NextResponse.json({ message: 'Invalid Appointment Date/Time format.' }, { status: 400 });
    }
    if (duration && (isNaN(parseInt(duration)) || parseInt(duration) <= 0)) {
        return NextResponse.json({ message: 'Duration must be a positive integer.' }, { status: 400 });
    }
    if (payment_id && isNaN(parseInt(payment_id))) {
        return NextResponse.json({ message: 'Invalid Payment ID.'}, { status: 400 });
    }

    try {
      connection = await pool.getConnection();
      const query = 'INSERT INTO appointment (patient_id, D_employee_id, date_time, duration, payment_id) VALUES (?, ?, ?, ?, ?)'
      const values = [
        parseInt(patient_id),
        parseInt(D_employee_id),
        date_time, 
        duration ? parseInt(duration) : null, // Duration can be optional or have a default
        payment_id ? parseInt(payment_id) : null // payment_id is nullable
      ];

      const [result] = await connection.execute(query, values);
      const newAppointmentId = result.insertId;

      connection.release();

      if (newAppointmentId) {
        return NextResponse.json({ message: 'Appointment scheduled successfully', appointment_id: newAppointmentId }, { status: 201 });
      } else {
        throw new Error('Failed to create appointment record.');
      }

    } catch (dbError) {
      if (connection) connection.release();
      console.error('Database Error scheduling appointment:', dbError);
      // Check for foreign key constraint errors specifically
      if (dbError.code === 'ER_NO_REFERENCED_ROW_2') {
        let missingEntity = 'related record';
        if (dbError.message.includes('`patient_id`')) missingEntity = 'patient';
        else if (dbError.message.includes('`D_employee_id`')) missingEntity = 'doctor';
        else if (dbError.message.includes('`payment_id`')) missingEntity = 'payment record';
        return NextResponse.json({ message: `Failed to schedule appointment. The specified ${missingEntity} does not exist.` }, { status: 400 });
      }
      return NextResponse.json({ message: 'Failed to schedule appointment due to database error', error: dbError.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Request Processing Error:', error);
    return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
