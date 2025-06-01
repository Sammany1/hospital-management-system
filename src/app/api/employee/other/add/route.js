import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';
import { NextResponse } from 'next/server';

export async function POST(request) {
  let connection;
  try {
    await dbSemaphore.acquire();
    connection = await pool.getConnection();
    const data = await request.json();
    const { name, email, phone, address, type /* other fields */ } = data;

    // TODO: Add validation for input data

    const [result] = await connection.execute(
      'INSERT INTO employee (name, email, phone, address, type, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, type, 'Other'] // Assuming 'Other' as a general role for this category
    );

    return NextResponse.json({ message: 'Employee member added successfully', id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error adding employee member:', error);
    return NextResponse.json({ message: 'Error adding employee member', error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
    dbSemaphore.release();
  }
}
