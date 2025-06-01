import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');

  let connection;
  try {
    await dbSemaphore.acquire();
    connection = await pool.getConnection();

    let query = 'SELECT * FROM employee_activity'; // Assuming a table named employee_activity
    const queryParams = [];

    if (role) {
      query += ' WHERE role = ?';
      queryParams.push(role);
    } else {
      // Optional: If no role is specified, you might want to return all employee activity
      // or handle it as an error, depending on your requirements.
      // For now, let's return all if no specific role is requested for general employee activity.
    }

    // TODO: Add more specific querying based on your database schema for employee activity
    // For example, you might want to join with a employee table to get names, filter by date, etc.

    const [rows] = await connection.execute(query, queryParams);

    if (rows.length === 0 && role === 'other') {
      // If specifically fetching 'other' employee reports and none are found,
      // you might return an empty array or a specific message.
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Database query error for employee activity report:', error);
    return NextResponse.json(
      { message: 'Error fetching employee activity report', error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
    dbSemaphore.release();
  }
}
