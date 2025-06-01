import { NextResponse } from 'next/server';
import pool from '../../../../../utils/db';
import dbSemaphore from '../../../../../utils/db-semaphore';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const offset = (page - 1) * limit;

  // Filters
  const patientName = searchParams.get('patientName');
  const doctorName = searchParams.get('doctorName');
  const treatmentName = searchParams.get('treatmentName');
  const status = searchParams.get('status');
  const filterStartDate = searchParams.get('startDate'); // expecting YYYY-MM-DD
  const filterEndDate = searchParams.get('endDate');     // expecting YYYY-MM-DD

  // Sorting
  const sortBy = searchParams.get('sortBy') || 'start_date';
  const sortOrder = searchParams.get('sortOrder') || 'DESC';

  let connection;
  try {
    await dbSemaphore.acquire();
    connection = await pool.getConnection();

    let whereClauses = [];
    let queryParams = [];

    if (patientName) {
      whereClauses.push("(p.first_name LIKE ? OR p.last_name LIKE ?)");
      queryParams.push(`%${patientName}%`, `%${patientName}%`);
    }
    if (doctorName) {
      whereClauses.push("(doc_emp.first_name LIKE ? OR doc_emp.last_name LIKE ?)");
      queryParams.push(`%${doctorName}%`, `%${doctorName}%`);
    }
    if (treatmentName) {
      whereClauses.push("t.name LIKE ?");
      queryParams.push(`%${treatmentName}%`);
    }
    if (status) {
      whereClauses.push("ta.status LIKE ?");
      queryParams.push(`%${status}%`);
    }
    if (filterStartDate) {
      whereClauses.push("DATE(ts.start_date_time) >= ?");
      queryParams.push(filterStartDate);
    }
    if (filterEndDate) {
      // Ensure this filters for assignments *starting* on or before this date.
      // If the intent is a range, both startDate and endDate should be used for the same field.
      whereClauses.push("DATE(ts.start_date_time) <= ?");
      queryParams.push(filterEndDate);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const countQuery = `
      SELECT COUNT(DISTINCT ta.assignment_id) as total
      FROM treatment_assignment ta
      JOIN patient p ON ta.patient_id = p.patient_id
      JOIN treatment t ON ta.treatment_id = t.treatment_id
      JOIN employee doc_emp ON ta.D_employee_id = doc_emp.employee_id
      LEFT JOIN treatmentSchedule ts ON ta.assignment_id = ts.assignment_id
      ${whereSql}
    `;
    const [countResult] = await connection.query(countQuery, queryParams);
    const totalAssignments = countResult[0].total;
    const totalPages = Math.ceil(totalAssignments / limit);

    const validSortKeys = {
      'assignment_id': 'ta.assignment_id',
      'patient_name': 'p.last_name', // Consider CONCAT(p.first_name, ' ', p.last_name) if needed
      'treatment_name': 't.name',
      'doctor_name': 'doc_emp.last_name', // Consider CONCAT for full name sort
      'start_date': 'ts.start_date_time',
      'end_date': 'ts.end_date_time',
      'status': 'ta.status'
    };
    
    const sortColumn = validSortKeys[sortBy] || 'ts.start_date_time';
    const direction = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const orderBySql = `ORDER BY ${sortColumn} ${direction}, ta.assignment_id ${direction}`;

    const assignmentsQuery = `
      SELECT
          ta.assignment_id,
          p.first_name AS patient_first_name,
          p.last_name AS patient_last_name,
          t.name AS treatment_name,
          doc_emp.first_name AS doctor_first_name,
          doc_emp.last_name AS doctor_last_name,
          ts.start_date_time AS start_date,
          ts.end_date_time AS end_date,
          ta.status,
          (SELECT GROUP_CONCAT(note SEPARATOR '; ') FROM treatment_assignment_note WHERE assignment_id = ta.assignment_id) AS notes
      FROM
          treatment_assignment ta
      JOIN
          patient p ON ta.patient_id = p.patient_id
      JOIN
          treatment t ON ta.treatment_id = t.treatment_id
      JOIN
          employee doc_emp ON ta.D_employee_id = doc_emp.employee_id
      LEFT JOIN
          treatmentSchedule ts ON ta.assignment_id = ts.assignment_id
      ${whereSql}
      ${orderBySql}
      LIMIT ?
      OFFSET ?
    `;
    
    const finalQueryParams = [...queryParams, limit, offset];
    const [assignments] = await connection.query(assignmentsQuery, finalQueryParams);

    return NextResponse.json({
      assignments,
      totalPages,
      currentPage: page,
      totalAssignments,
    });

  } catch (error) {
    console.error('Error fetching treatment assignments:', error);
    // It's good practice to not send raw error messages to client in production
    return NextResponse.json({ error: 'Failed to fetch treatment assignments', details: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
    dbSemaphore.release();
  }
}
