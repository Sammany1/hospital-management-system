import { NextResponse } from 'next/server';
import pool from '@/utils/db'; // Corrected import for default export
import dbSemaphore from '@/utils/db-semaphore';

export async function GET() {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    // Optional: Perform a simple query to ensure the connection is truly alive
    await connection.ping(); 
    return NextResponse.json({ status: 'Online', message: 'Database connection successful.' });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        status: 'Offline', 
        message: 'Database connection failed.',
        errorDetails: {
          message: error.message,
          code: error.code, // MySQL error code (e.g., 'ECONNREFUSED', 'ER_ACCESS_DENIED_ERROR')
        }
      }, 
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
