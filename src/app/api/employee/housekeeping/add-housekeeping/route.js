// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/employee/add-housekeeping/route.js
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
      hiring_date,
      start_working_date,
      salary,
      department_id, 
      // New address fields
      street_name,
      city,
      country,
      state_or_province,
      area_assigned // Specific to housekeeping
    } = data;

    // Basic Server-side Validation
    if (!firstName || !lastName || !hiring_date || !start_working_date || !department_id) {
      return NextResponse.json({ message: 'Missing required fields: firstName, lastName, hiring_date, start_working_date, department_id are required.' }, { status: 400 });
    }
    // Validation for new address fields
    if (!street_name || !city || !country) {
      return NextResponse.json({ message: 'Street name, city, and country are required for the address.' }, { status: 400 });
    }
    if (area_assigned && typeof area_assigned !== 'string') {
        return NextResponse.json({ message: 'Invalid area_assigned format.' }, { status: 400 });
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
    if (hiring_date && isNaN(new Date(hiring_date).getTime())) {
      return NextResponse.json({ message: 'Invalid Hiring Date format. Please use YYYY-MM-DD.' }, { status: 400 });
    }
    if (start_working_date && isNaN(new Date(start_working_date).getTime())) {
      return NextResponse.json({ message: 'Invalid Start Working Date format. Please use YYYY-MM-DD.' }, { status: 400 });
    }

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

    // 2. Insert into employee table
    const employeeInsertQuery = `
      INSERT INTO employee (
        first_name, last_name, sex, date_of_birth, phone_number, email, 
        hiring_date, start_working_date, salary, employee_type, department_id, postal_code_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Housekeeping', ?, ?)
    `;
    const [employeeResult] = await connection.execute(employeeInsertQuery, [
      firstName, lastName, sex || null, dateOfBirth || null, phoneNumber || null, email || null,
      hiring_date, start_working_date, salary || null, department_id, postalCodeId
    ]);

    const newEmployeeId = employeeResult.insertId;

    if (!newEmployeeId) {
      // No need to rollback here, it will be handled in the catch block
      throw new Error('Failed to create employee record.');
    }

    // 3. Insert into housekeeping_employee table
    const housekeepingInsertQuery = `INSERT INTO housekeeping_employee (HK_employee_id) VALUES (?)`;
    await connection.execute(housekeepingInsertQuery, [newEmployeeId]);

    // 4. Insert into employee_area_assigned if area_assigned is provided
    if (area_assigned) {
      const areaAssignedQuery = `INSERT INTO employee_area_assigned (HK_employee_id, area_assigned) VALUES (?, ?)`;
      await connection.execute(areaAssignedQuery, [newEmployeeId, area_assigned]);
    }

    await connection.commit();

    return NextResponse.json({
      message: 'Housekeeping employee added successfully',
      employeeId: newEmployeeId,
      postalCodeId: postalCodeId
    }, { status: 201 });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error adding housekeeping employee:', error);
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'Failed to add housekeeping employee. Possible duplicate entry (e.g., email).', error: error.message }, { status: 409 });
    }
    if (error.message.includes('postal code')) {
        return NextResponse.json({ message: 'Failed to process postal code information.', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Failed to add housekeeping employee', error: error.message, code: error.code, sqlMessage: error.sqlMessage }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
