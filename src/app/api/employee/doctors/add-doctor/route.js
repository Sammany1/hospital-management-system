// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/employee/doctors/add-doctor/route.js
// API route for adding a doctor
// Implements database transaction and server-side validation

import { NextResponse } from 'next/server';
import pool from '@/utils/db'; // Adjusted path assuming utils is in src
import dbSemaphore from '@/utils/db-semaphore'; // Import the semaphore

export async function POST(req) {
  await dbSemaphore.acquire(); // Acquire semaphore
  let connection; // Declare connection here to be accessible in finally
  try {
    const formData = await req.json();

    const {
      firstName,
      lastName,
      sex,
      phoneNumber,
      dateOfBirth,
      salary,
      startWorkingDate,
      email,
      hiringDate,
      departmentId,
      specialization,
      employee_type, // Should be 'Doctor'
      // New address fields
      street_name,
      city,
      country,
      state_or_province,
    } = formData;

    // Server-side Validation
    if (!firstName || !lastName || !departmentId || !specialization) {
      return NextResponse.json({ message: 'First name, last name, department, and specialization are required.' }, { status: 400 });
    }
    if (employee_type !== 'Doctor') {
      return NextResponse.json({ message: 'Invalid employee type for this endpoint.' }, { status: 400 });
    }
    // Validation for new address fields
    if (!street_name || !city || !country) {
      return NextResponse.json({ message: 'Street name, city, and country are required for the address.' }, { status: 400 });
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email format.' }, { status: 400 });
    }
    if (salary && (isNaN(parseFloat(salary)) || parseFloat(salary) < 0)) {
      return NextResponse.json({ message: 'Salary must be a non-negative number.' }, { status: 400 });
    }
    if (dateOfBirth && isNaN(new Date(dateOfBirth).getTime())) {
      return NextResponse.json({ message: 'Invalid Date of Birth format. Please use YYYY-MM-DD.' }, { status: 400 });
    }
    if (hiringDate && isNaN(new Date(hiringDate).getTime())) {
      return NextResponse.json({ message: 'Invalid Hiring Date format. Please use YYYY-MM-DD.' }, { status: 400 });
    }
     if (startWorkingDate && isNaN(new Date(startWorkingDate).getTime())) {
      return NextResponse.json({ message: 'Invalid Start Working Date format. Please use YYYY-MM-DD.' }, { status: 400 });
    }

    // Inner try for transaction logic, distinct from the outer try for semaphore
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      let postalCodeId;

      // 1. Check if postal code already exists or insert it
      const selectPostalCodeQuery = `
        SELECT postal_code_id FROM postalcode 
        WHERE street_name = ? AND city = ? AND country = ? AND (state_or_province = ? OR (? IS NULL AND state_or_province IS NULL))
      `;
      const [postalRows] = await connection.execute(selectPostalCodeQuery, [street_name, city, country, state_or_province || null, state_or_province || null]);

      if (postalRows.length > 0) {
        postalCodeId = postalRows[0].postal_code_id;
      } else {
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

      // 2. Insert into employee table with the obtained postal_code_id
      const employeeQuery = `
        INSERT INTO employee (
          first_name, last_name, sex, phone_number, date_of_birth, salary, 
          start_working_date, email, hiring_date, employee_type, 
          postal_code_id, department_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const employeeValues = [
        firstName,
        lastName,
        sex || null, 
        phoneNumber || null,
        dateOfBirth || null,
        salary ? parseFloat(salary) : null,
        startWorkingDate || null,
        email || null,
        hiringDate || null,
        employee_type, // 'Doctor'
        postalCodeId, // Use the obtained postal_code_id
        departmentId ? parseInt(departmentId) : null,
      ];

      const [employeeResult] = await connection.execute(employeeQuery, employeeValues);
      const newEmployeeId = employeeResult.insertId;

      if (!newEmployeeId) {
        throw new Error('Failed to insert employee record.');
      }

      // 3. Insert into doctor table
      const doctorQuery = `
        INSERT INTO doctor (D_employee_id, specialization) VALUES (?, ?)
      `;
      const doctorValues = [newEmployeeId, specialization];
      await connection.execute(doctorQuery, doctorValues);

      await connection.commit();

      return NextResponse.json({ message: 'Doctor added successfully', employeeId: newEmployeeId, postalCodeId: postalCodeId }, { status: 201 });

    } catch (error) { // This is the catch for the inner try (transaction)
      if (connection) {
        await connection.rollback();
      }
      console.error('API Error add-doctor (transaction):', error);
      // Re-throw or handle specific errors to be caught by outer catch if necessary,
      // or return specific HTTP responses directly.
      if (error.code === 'ER_DUP_ENTRY') {
          return NextResponse.json({ message: 'Failed to add doctor. Possible duplicate entry (e.g., email).', error: error.message }, { status: 409 });
      }
      if (error.message.includes('postal code')) {
          return NextResponse.json({ message: 'Failed to process postal code information.', error: error.message }, { status: 500 });
      }
      // Ensure a response is returned or error is re-thrown
      return NextResponse.json({ message: 'Failed to add doctor during transaction', error: error.message, code: error.code, sqlMessage: error.sqlMessage }, { status: 500 });
    }
    // The outer try block doesn't have its own specific catch here,
    // as errors within the transaction are handled by the inner catch.
    // If pool.getConnection() itself fails before the inner try, it would be caught by the outer finally's logic.

  } catch (error) { // This is the catch for the outer try (e.g., req.json() failure, or if pool.getConnection() failed before inner try)
    // Note: The previous version's outer catch was effectively for the transaction.
    // This outer catch now handles errors outside the transaction block, like `req.json()` or initial `pool.getConnection()` if it were outside the inner try.
    // However, `pool.getConnection()` is now inside the inner try. So this primarily catches `req.json()` errors or unforeseen issues.
    console.error('API Error add-doctor (outer):', error);
    // Ensure a response is returned for errors caught at this level.
    return NextResponse.json({ message: 'Failed to process request for adding doctor', error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
    dbSemaphore.release(); // Release semaphore
  }
}
