// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/departments/route.js
import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(req) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    const query = 'SELECT department_id, name FROM department ORDER BY name ASC';
    const [rows] = await connection.execute(query);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('API Error fetching departments:', error);
    return NextResponse.json({ message: 'Failed to fetch departments', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
