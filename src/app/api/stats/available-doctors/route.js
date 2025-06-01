import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT COUNT(*) as availableDoctors FROM employee WHERE employee_type = 'Doctor'");
    return NextResponse.json({ availableDoctors: rows[0].availableDoctors });
  } catch (error) {
    console.error('Error fetching available doctors:', error);
    return NextResponse.json({ message: 'Error fetching available doctors', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
