import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let query = 'SELECT patient_id, first_name, last_name, email, phone_number, date_of_birth, sex FROM patient';
    const queryParams = [];

    if (search) {
      query += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR patient_id LIKE ?';
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY last_name, first_name;';

    const [rows] = await connection.query(query, queryParams);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    return NextResponse.json({ message: 'Failed to fetch patients', error: error.message }, { status: 500 });
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
    const { first_name, last_name, email, phone_number, date_of_birth, sex } = body;

    const query = 'INSERT INTO patient (first_name, last_name, email, phone_number, date_of_birth, sex) VALUES (?, ?, ?, ?, ?, ?)';
    const queryParams = [first_name, last_name, email, phone_number, date_of_birth, sex];

    const [result] = await connection.query(query, queryParams);
    const newPatient = { id: result.insertId, ...body };

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Failed to add patient:', error);
    return NextResponse.json({ message: 'Failed to add patient', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
