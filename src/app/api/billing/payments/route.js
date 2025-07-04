import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function POST(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    const data = await request.json();
    const {
      patientId,
      amount,
      paymentMethod,
      transactionDate,
      transactionReference, // Optional
      status, // Optional, e.g., 'Completed', 'Pending'
      processedByStaffId, // Optional
    } = data;

    connection = await pool.getConnection();

    // Basic validation
    if (!patientId || !amount || !paymentMethod || !transactionDate) {
      return NextResponse.json({ message: 'Missing required fields (patientId, amount, paymentMethod, transactionDate)' }, { status: 400 });
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }

    const paymentStatus = status || 'Completed'; // Default status to 'Completed'

    const [result] = await connection.execute(
      `INSERT INTO payment (
          patient_id, 
          payment_date, 
          amount_paid, 
          payment_method, 
          transaction_reference,
          payment_status,
          R_employee_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
        transactionDate,
        parseFloat(amount),
        paymentMethod,
        transactionReference || null,
        paymentStatus,
        processedByStaffId || null,
      ]
    );

    if (result.insertId) {
      return NextResponse.json({ message: 'Payment recorded successfully', paymentId: result.insertId }, { status: 201 });
    } else {
      console.error('Failed to insert payment:', result);
      return NextResponse.json({ message: 'Failed to record payment' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error recording payment:', error);
    // Check for duplicate entry or other specific SQL errors if needed
    if (error.code === 'ER_NO_REFERENCED_ROW_2' && error.message.includes('patient_id')) {
        return NextResponse.json({ message: 'Invalid Patient ID. Patient does not exist.' }, { status: 400 });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2' && error.message.includes('R_employee_id')) {
        return NextResponse.json({ message: 'Invalid Staff ID for processing. Staff does not exist.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error recording payment', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}

// GET handler to fetch payments with pagination and filtering
export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sortBy = searchParams.get('sortBy') || 'payment_date';
    const sortOrder = searchParams.get('sortOrder') || 'DESC';
    const patientName = searchParams.get('patient_name');
    const paymentMethod = searchParams.get('payment_method');
    
    const offset = (page - 1) * limit;
    
    // Build the WHERE clause for filtering
    let whereClause = '';
    const filterParams = [];
    const conditions = [];
    
    if (patientName) {
      conditions.push("CONCAT(p.first_name, ' ', p.last_name) LIKE ?");
      filterParams.push(`%${patientName}%`);
    }
    
    if (paymentMethod) {
      conditions.push("pay.payment_method = ?");
      filterParams.push(paymentMethod);
    }
    
    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }
    
    // Count total records
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM payment pay
      JOIN patient p ON pay.patient_id = p.patient_id
      ${whereClause}
    `;
    
    const [countResult] = await connection.query(countQuery, filterParams);
    const totalPayments = countResult[0].total;
    const totalPages = Math.ceil(totalPayments / limit);
    
    // Validate and map sort columns
    const validSortKeys = {
      'payment_id': 'pay.payment_id',
      'payment_date': 'pay.payment_date', 
      'amount': 'pay.amount_paid',
      'amount_paid': 'pay.amount_paid',
      'payment_method': 'pay.payment_method',
      'payment_status': 'pay.payment_status',
      'patient_name': 'patient_name',
      'R_employee_id': 'pay.R_employee_id'
    };
    
    const sortColumn = validSortKeys[sortBy] || 'pay.payment_date';
    const direction = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const orderBySql = `ORDER BY ${sortColumn} ${direction}`;
    
    // Fetch payments data
    const dataQuery = `
      SELECT 
        pay.payment_id,
        pay.payment_date,
        pay.amount_paid as amount,
        pay.payment_method,
        pay.transaction_reference,
        pay.payment_status,
        CONCAT(p.first_name, ' ', p.last_name) as patient_name,
        p.patient_id,
        pay.R_employee_id
      FROM payment pay
      JOIN patient p ON pay.patient_id = p.patient_id
      ${whereClause}
      ${orderBySql}
      LIMIT ? OFFSET ?
    `;
    
    // Create a separate array for data query parameters
    const dataParams = [...filterParams, limit, offset];
    const [payments] = await connection.query(dataQuery, dataParams);
    
    return NextResponse.json({
      payments,
      totalPages,
      totalPayments,
      currentPage: page
    });
    
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch payments',
      payments: [],
      totalPages: 0,
      totalPayments: 0
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
