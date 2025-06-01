// /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/employee/other/add-other/route.js
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
      email,
      phoneNumber,
      dateOfBirth,
      sex,
      salary,
      departmentId,
      employeeType, // This will be the 'role' from the form e.g., 'Receptionist', 'Security'
      hiring_date, // Added
      start_working_date, // Added
      // New address fields
      street_name,
      city,
      country,
      state_or_province,
      // receptionist specific
      languageSpoken,
      // security specific
      clearanceLevel,
      badgeNumber
    } = data;

    // Server-side Validation
    if (!firstName || !lastName || !departmentId || !employeeType || !hiring_date || !start_working_date) {
      return NextResponse.json({ message: 'First name, last name, department, employee type, hiring date, and start working date are required.' }, { status: 400 });
    }
    // Validation for new address fields
    if (!street_name || !city || !country) {
      return NextResponse.json({ message: 'Street name, city, and country are required for the address.' }, { status: 400 });
    }
    const validEmployeeTypes = ['Receptionist', 'Security', 'Admin', 'Other']; // Add more as needed
    if (!validEmployeeTypes.includes(employeeType)) {
        return NextResponse.json({ message: 'Invalid employee type specified' }, { status: 400 });
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
    if (isNaN(parseInt(departmentId))) {
        return NextResponse.json({ message: 'Invalid Department ID' }, { status: 400 });
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
      start_working_date,
      email || null,
      hiring_date,
      employeeType, // Use the dynamic employeeType from the form
      postalCodeId,
      parseInt(departmentId),
    ];

    const [employeeResult] = await connection.execute(employeeQuery, employeeValues);
    const newEmployeeId = employeeResult.insertId;

    if (!newEmployeeId) {
      throw new Error('Failed to insert employee record.');
    }

    // 3. Insert into specific role table if applicable
    if (employeeType === 'Receptionist') {
      await connection.execute('INSERT INTO receptionist (R_employee_id) VALUES (?)', [newEmployeeId]);
      if (languageSpoken) {
        const languages = Array.isArray(languageSpoken) ? languageSpoken : languageSpoken.split(',').map(lang => lang.trim());
        for (const lang of languages) {
          if (lang) {
            await connection.execute('INSERT INTO Receptionists_language (R_employee_id, language_spoken) VALUES (?, ?)', [newEmployeeId, lang]);
          }
        }
      }
    } else if (employeeType === 'Security') {
      await connection.execute(
        'INSERT INTO security (S_employee_id, clearance_level, badge_number) VALUES (?, ?, ?)',
        [newEmployeeId, clearanceLevel || null, badgeNumber || null]
      );
    }
    // Add other role-specific table insertions here if necessary (e.g., Admin, Other specific tables)

    await connection.commit();

    return NextResponse.json({ 
        message: `Employee member (${employeeType}) added successfully`, 
        employeeId: newEmployeeId, 
        postalCodeId: postalCodeId 
    }, { status: 201 });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('API Error add-other:', error);
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: `Failed to add employee member (${data.employeeType || 'Unknown Type'}). Possible duplicate entry (e.g., email).`, error: error.message }, { status: 409 });
    }
    if (error.message.includes('postal code')) {
        return NextResponse.json({ message: 'Failed to process postal code information.', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: `Failed to add employee member (${data.employeeType || 'Unknown Type'})`, error: error.message, code: error.code, sqlMessage: error.sqlMessage }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
