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
      name,
      description,
      cost,
      category,
      specilization_required, // Matches schema: specilization_required
      treatment_minutes,
    } = data;

    // Server-side Validation
    if (!name) {
      return NextResponse.json({ message: 'Treatment name is required.' }, { status: 400 });
    }
    if (cost && (isNaN(parseFloat(cost)) || parseFloat(cost) < 0)) {
      return NextResponse.json({ message: 'Cost must be a non-negative number.' }, { status: 400 });
    }
    if (treatment_minutes && (isNaN(parseInt(treatment_minutes)) || parseInt(treatment_minutes) <= 0)) {
      return NextResponse.json({ message: 'Treatment minutes must be a positive integer.' }, { status: 400 });
    }
    // Add more validation as needed for other fields (e.g., length, format)

    connection = await pool.getConnection();
    
    const query = `
      INSERT INTO treatment (
        name, description, cost, category, specilization_required, treatment_minutes
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      name,
      description || null,
      cost ? parseFloat(cost) : null,
      category || null,
      specilization_required || null,
      treatment_minutes ? parseInt(treatment_minutes) : null,
    ];

    const [result] = await connection.execute(query, values);
    const newTreatmentId = result.insertId;

    if (newTreatmentId) {
      return NextResponse.json({ 
        message: 'Treatment defined successfully', 
        treatment_id: newTreatmentId 
      }, { status: 201 });
    } else {
      throw new Error('Failed to create treatment record in database.');
    }

  } catch (error) {
    console.error('API Error defining treatment:', error);
    // Specific error for duplicate entry if name must be unique (assuming it should be)
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.includes('Duplicate entry'))) {
        return NextResponse.json({ message: 'Failed to define treatment. A treatment with this name may already exist.' }, { status: 409 }); // 409 Conflict
    }
    return NextResponse.json({ message: 'Failed to define treatment', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
