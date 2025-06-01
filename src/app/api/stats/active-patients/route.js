import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT COUNT(*) as activePatients FROM patient');
    return NextResponse.json({ activePatients: rows[0].activePatients });
  } catch (error) {
    console.error('Error fetching active patients:', error);
    return NextResponse.json({ message: 'Error fetching active patients', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
