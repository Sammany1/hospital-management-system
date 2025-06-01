import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET() {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    // Assuming 'Doctor' is a role_name in the employee_role table 
    // and D_employee_id in the doctor table refers to employee_id in the employee table.
    const query = `
      SELECT e.employee_id, e.first_name, e.last_name 
      FROM employee e
      JOIN doctor d ON e.employee_id = d.D_employee_id
      ORDER BY e.last_name, e.first_name;
    `;
    const [rows] = await connection.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return NextResponse.json({ message: 'Failed to fetch doctors', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}

export async function POST(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    const body = await request.json();
    const { employee_id, first_name, last_name } = body;

    // Insert the new doctor into the doctor table
    const insertQuery = `
      INSERT INTO doctor (D_employee_id) VALUES (?);
    `;
    await connection.query(insertQuery, [employee_id]);

    // Assuming there's no error, return a success message
    return NextResponse.json({ message: 'Doctor added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to add doctor:', error);
    return NextResponse.json({ message: 'Failed to add doctor', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
