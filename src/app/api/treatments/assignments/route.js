// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/treatments/assignments/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../utils/db';
import dbSemaphore from '../../../../utils/db-semaphore';

export async function POST(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    const body = await request.json();
    const {
      patientId,
      doctorId, // This is D_employee_id
      treatmentId,
      status,
      notes, // Optional
      scheduledDateTime, // ISO string expected e.g., "2025-06-01T10:22:00.000Z"
    } = body;

    // Basic Validation
    if (!patientId || !doctorId || !treatmentId || !status || !scheduledDateTime) {
      return NextResponse.json({ message: 'Missing required fields: patientId, doctorId, treatmentId, status, and scheduledDateTime are required.' }, { status: 400 });
    }

    try {
      new Date(scheduledDateTime).toISOString();
    } catch (e) {
      return NextResponse.json({ message: 'Invalid scheduledDateTime format. ISO string expected.' }, { status: 400 });
    }
    
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Fetch treatment cost and duration
    const [treatmentRows] = await connection.execute(
      'SELECT cost, treatment_minutes FROM treatment WHERE treatment_id = ?',
      [treatmentId]
    );

    if (treatmentRows.length === 0) {
      await connection.rollback();
      return NextResponse.json({ message: 'Treatment definition not found.' }, { status: 404 });
    }
    const treatmentDetails = treatmentRows[0];
    const cost = treatmentDetails.cost;
    const treatmentMinutes = treatmentDetails.treatment_minutes;

    if (cost === null || cost === undefined) {
        await connection.rollback();
        return NextResponse.json({ message: 'Cost for the selected treatment is not defined.' }, { status: 400 });
    }
    if (treatmentMinutes === null || treatmentMinutes === undefined) {
        await connection.rollback();
        return NextResponse.json({ message: 'Duration (treatment_minutes) for the selected treatment is not defined.' }, { status: 400 });
    }

    // 2. Create treatment assignment
    const assignmentQuery = `
      INSERT INTO treatment_assignment (patient_id, D_employee_id, treatment_id, status, cost)
      VALUES (?, ?, ?, ?, ?)
    `;
    const assignmentValues = [patientId, doctorId, treatmentId, status, cost];
    const [assignmentResult] = await connection.execute(assignmentQuery, assignmentValues);
    const newAssignmentId = assignmentResult.insertId;

    if (!newAssignmentId) {
      await connection.rollback();
      throw new Error('Failed to create treatment assignment.');
    }

    // 3. Add notes if provided
    if (notes && notes.trim() !== '') {
      const noteQuery = `
        INSERT INTO treatment_assignment_note (assignment_id, note)
        VALUES (?, ?)
      `;
      await connection.execute(noteQuery, [newAssignmentId, notes.trim()]);
    }

    // 4. Create treatment schedule entry
    const startDateTime = new Date(scheduledDateTime);
    const endDateTime = new Date(startDateTime.getTime() + treatmentMinutes * 60000); // treatmentMinutes to milliseconds

    const scheduleQuery = `
      INSERT INTO treatmentSchedule (assignment_id, start_date_time, end_date_time)
      VALUES (?, ?, ?)
    `;
    // Format dates to MySQL DATETIME format 'YYYY-MM-DD HH:MM:SS'
    const formatMySqlDateTime = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    await connection.execute(scheduleQuery, [
        newAssignmentId, 
        formatMySqlDateTime(startDateTime), 
        formatMySqlDateTime(endDateTime)
    ]);
    
    await connection.commit();

    return NextResponse.json({
      message: 'Treatment assigned and scheduled successfully',
      assignmentId: newAssignmentId,
    }, { status: 201 });

  } catch (error) {
    console.error('API Error assigning treatment:', error);
    if (connection) await connection.rollback();
    // Check for foreign key constraint errors specifically
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        let missingEntity = 'an unspecified entity';
        if (error.message.includes('fk_treatment_assignment_patient')) missingEntity = 'patient';
        else if (error.message.includes('fk_treatment_assignment_doctor')) missingEntity = 'doctor';
        else if (error.message.includes('fk_treatment_assignment_treatment')) missingEntity = 'treatment definition';
        return NextResponse.json({ message: `Failed to assign treatment: The specified ${missingEntity} does not exist.` }, { status: 404 });
    }
    return NextResponse.json({ message: 'Failed to assign treatment', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
