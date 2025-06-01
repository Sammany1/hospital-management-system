// /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/staff/technicians/add-technician/route.js
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
      hiring_date, // Added
      start_working_date, // Added
      // New address fields
      street_name,
      city,
      country,
      state_or_province,
      // technician specific fields (currently not directly inserted, but could be)
      // equipment_expertise, 
      // tech_area
    } = data;

    // Server-side Validation
    if (!firstName || !lastName || !departmentId || !hiring_date || !start_working_date) {
      return NextResponse.json({ message: 'First name, last name, department, hiring date, and start working date are required.' }, { status: 400 });
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Technician', ?, ?)
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
      postalCodeId,
      parseInt(departmentId),
    ];

    const [employeeResult] = await connection.execute(employeeQuery, employeeValues);
    const newEmployeeId = employeeResult.insertId;

    if (!newEmployeeId) {
      throw new Error('Failed to insert employee record.');
    }

    // 3. Insert into technician table
    const technicianQuery = `INSERT INTO technician (T_employee_id) VALUES (?)`;
    await connection.execute(technicianQuery, [newEmployeeId]);
    
    // Placeholder for inserting into employee_equipment_expertise and employee_tech_area if those fields are added to the form
    // Example: if (equipmentExpertise) { await connection.query('INSERT INTO employee_equipment_expertise (T_employee_id, equipment_expertise) VALUES (?, ?)', [employeeId, equipmentExpertise]); }
    // Example: if (techArea) { await connection.query('INSERT INTO employee_tech_area (T_employee_id, tech_area) VALUES (?, ?)', [employeeId, techArea]); }

    await connection.commit();

    return NextResponse.json({ 
        message: 'Technician added successfully', 
        employeeId: newEmployeeId, 
        postalCodeId: postalCodeId 
    }, { status: 201 });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('API Error add-technician:', error);
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'Failed to add technician. Possible duplicate entry (e.g., email).', error: error.message }, { status: 409 });
    }
    if (error.message.includes('postal code')) {
        return NextResponse.json({ message: 'Failed to process postal code information.', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Failed to add technician', error: error.message, code: error.code, sqlMessage: error.sqlMessage }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
