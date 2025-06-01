import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function POST(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      phoneNumber,
      email,
      // New address fields instead of postal_code_id
      street_name,
      city,
      country,
      state_or_province, 
    } = data;

    // Server-side Validation for new address fields
    if (!street_name || !city || !country) {
      return NextResponse.json({ message: 'Street name, city, and country are required.' }, { status: 400 });
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email format.' }, { status: 400 });
    }
    if (dateOfBirth && isNaN(new Date(dateOfBirth).getTime())) {
        return NextResponse.json({ message: 'Invalid Date of Birth format. Please use YYYY-MM-DD.' }, { status: 400 });
    }

    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      let postalCodeId;

      // 1. Check if postal code already exists
      const selectPostalCodeQuery = `
        SELECT postal_code_id FROM postalcode 
        WHERE street_name = ? AND city = ? AND country = ? AND (state_or_province = ? OR (? IS NULL AND state_or_province IS NULL))
      `;
      const [postalRows] = await connection.execute(selectPostalCodeQuery, [street_name, city, country, state_or_province || null, state_or_province || null]);

      if (postalRows.length > 0) {
        postalCodeId = postalRows[0].postal_code_id;
      } else {
        // 2. If not, insert new postal code
        const insertPostalCodeQuery = `
          INSERT INTO postalcode (street_name, city, country, state_or_province) 
          VALUES (?, ?, ?, ?)
        `;
        const [postalResult] = await connection.execute(insertPostalCodeQuery, [street_name, city, country, state_or_province || null]);
        postalCodeId = postalResult.insertId;
        if (!postalCodeId) {
            throw new Error('Failed to insert postal code.');
        }
      }

      // 3. Insert patient with the obtained postal_code_id
      const patientQuery = `
        INSERT INTO patient (
          first_name, last_name, sex, date_of_birth, phone_number, email, postal_code_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const patientValues = [
        firstName || null,
        lastName || null,
        sex || null,
        dateOfBirth || null, 
        phoneNumber || null,
        email || null,
        postalCodeId 
      ];

      const [result] = await connection.execute(patientQuery, patientValues);
      const newPatientId = result.insertId;

      if (!newPatientId && result.affectedRows === 0) {
        throw new Error('Failed to create patient record.');
      }

      await connection.commit();
      return NextResponse.json({ message: 'Patient added successfully', patientId: newPatientId, postalCodeId: postalCodeId }, { status: 201 });

    } catch (dbError) {
      if (connection) {
        await connection.rollback();
      }
      console.error('Database Error adding patient:', dbError);
      // Removed specific postal_code_id error messages as it's now handled internally
      if (dbError.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'Failed to add patient. Possible duplicate entry (e.g., email or phone already exists for another patient).' , error: dbError.message }, { status: 409 });
      }
      return NextResponse.json({ message: 'Failed to add patient due to database error', error: dbError.message, code: dbError.code, sqlMessage: dbError.sqlMessage }, { status: 500 });
    }
  } catch (error) {
    console.error('Request Processing Error:', error);
    return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
