// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/employee/add-nurse/route.js
import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function POST(req) {
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
    employee_type, // Should be 'Nurse'
    // New address fields
    street_name,
    city,
    country,
    state_or_province,
  } = formData;

  // Server-side Validation
  if (!firstName || !lastName || !departmentId) {
    return NextResponse.json({ message: 'First name, last name, and department are required.' }, { status: 400 });
  }
  if (employee_type !== 'Nurse') {
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


  let connection;
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
      employee_type, // 'Nurse'
      postalCodeId, // Use the obtained postal_code_id
      departmentId ? parseInt(departmentId) : null,
    ];

    const [employeeResult] = await connection.execute(employeeQuery, employeeValues);
    const newEmployeeId = employeeResult.insertId;

    if (!newEmployeeId) {
      throw new Error('Failed to insert employee record.');
    }

    // 3. Insert into nurse table
    const nurseQuery = `
      INSERT INTO nurse (N_employee_id) VALUES (?)
    `;
    const nurseValues = [newEmployeeId];
    await connection.execute(nurseQuery, nurseValues);

    await connection.commit();

    return NextResponse.json({ message: 'Nurse added successfully', employeeId: newEmployeeId, postalCodeId: postalCodeId }, { status: 201 });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('API Error add-nurse:', error);
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'Failed to add nurse. Possible duplicate entry (e.g., email).', error: error.message }, { status: 409 });
    }
    // Add more specific error handling for postal code issues if necessary
    if (error.message.includes('postal code')) {
        return NextResponse.json({ message: 'Failed to process postal code information.', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Failed to add nurse', error: error.message, code: error.code, sqlMessage: error.sqlMessage }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
