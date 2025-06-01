import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const patientName = searchParams.get('patientName');
    const doctorName = searchParams.get('doctorName');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const sortBy = searchParams.get('sortBy') || 'a.date_time';
    const sortOrder = searchParams.get('sortOrder') || 'DESC';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    connection = await pool.getConnection();

    let whereClauses = ["e.employee_type = 'Doctor'"];
    let params = [];

    if (patientName) {
      whereClauses.push('(p.first_name LIKE ? OR p.last_name LIKE ?)');
      params.push(`%${patientName}%`, `%${patientName}%`);
    }
    if (doctorName) {
      whereClauses.push('(e.first_name LIKE ? OR e.last_name LIKE ?)');
      params.push(`%${doctorName}%`, `%${doctorName}%`);
    }
    if (dateFrom) {
      whereClauses.push('a.date_time >= ?');
      params.push(dateFrom);
    }
    if (dateTo) {
      // Add time to dateTo to include the whole day
      whereClauses.push('a.date_time <= ?');
      params.push(`${dateTo}T23:59:59`);
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countQuery = `
      SELECT COUNT(*) as total
      FROM appointment a
      JOIN patient p ON a.patient_id = p.patient_id
      JOIN employee e ON a.D_employee_id = e.employee_id
      JOIN doctor d ON e.employee_id = d.D_employee_id
      LEFT JOIN payment py ON a.payment_id = py.payment_id
      ${whereString}
    `;
    const [countResult] = await connection.execute(countQuery, params);
    const totalAppointments = countResult[0].total;

    const validSortColumns = ['a.appointment_id', 'a.date_time', 'p.last_name', 'e.last_name', 'd.specialization', 'a.duration', 'py.payment_status'];
    const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : 'a.date_time';
    const safeSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const dataQuery = `
      SELECT
        a.appointment_id,
        a.date_time,
        a.duration,
        p.patient_id,
        p.first_name AS patient_first_name,
        p.last_name AS patient_last_name,
        p.email AS patient_email,
        e.employee_id AS doctor_id,
        e.first_name AS doctor_first_name,
        e.last_name AS doctor_last_name,
        d.specialization AS doctor_specialization,
        py.payment_id,
        py.payment_status,
        py.amount_paid
      FROM
        appointment a
      JOIN
        patient p ON a.patient_id = p.patient_id
      JOIN
        employee e ON a.D_employee_id = e.employee_id
      JOIN
        doctor d ON e.employee_id = d.D_employee_id
      LEFT JOIN
        payment py ON a.payment_id = py.payment_id
      ${whereString}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await connection.execute(dataQuery, [...params, limit, offset]);

    return NextResponse.json({
      appointments: rows,
      pagination: {
        page,
        limit,
        totalAppointments,
        totalPages: Math.ceil(totalAppointments / limit),
      },
    });

  } catch (error) {
    console.error('API Error fetching appointments:', error);
    return NextResponse.json({ message: 'Failed to fetch appointments', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
