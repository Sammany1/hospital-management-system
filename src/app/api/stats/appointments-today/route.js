import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    // CURDATE() gets the current date in 'YYYY-MM-DD' format
    const [rows] = await connection.execute('SELECT COUNT(*) as appointmentsToday FROM appointment WHERE DATE(date_time) = CURDATE()');
    return NextResponse.json({ appointmentsToday: rows[0].appointmentsToday });
  } catch (error) {
    console.error('Error fetching appointments for today:', error);
    return NextResponse.json({ message: 'Error fetching appointments for today', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
