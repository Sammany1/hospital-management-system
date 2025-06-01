\
import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db'; // Assuming your db utility is here

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      patientId,
      appointmentId,
      amount,
      paymentMethod,
      transactionDate,
      transactionReference, // Optional
      status, // Optional, e.g., 'Completed', 'Pending'
      processedByStaffId, // Optional
    } = data;

    // Basic validation
    if (!patientId || !amount || !paymentMethod || !transactionDate) {
      return NextResponse.json({ message: 'Missing required fields (patientId, amount, paymentMethod, transactionDate)' }, { status: 400 });
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }

    const paymentStatus = status || 'Completed'; // Default status to 'Completed'

    const result = await query({
      query: \`
        INSERT INTO Payments (
          patient_id, 
          appointment_id, 
          amount, 
          payment_method, 
          transaction_date, 
          transaction_reference,
          status,
          processed_by_staff_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      \`,
      values: [
        patientId,
        appointmentId || null,
        parseFloat(amount),
        paymentMethod,
        transactionDate,
        transactionReference || null,
        paymentStatus,
        processedByStaffId || null,
      ],
    });

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
    if (error.code === 'ER_NO_REFERENCED_ROW_2' && error.message.includes('appointment_id')) {
        return NextResponse.json({ message: 'Invalid Appointment ID. Appointment does not exist.' }, { status: 400 });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2' && error.message.includes('processed_by_staff_id')) {
        return NextResponse.json({ message: 'Invalid Staff ID for processing. Staff does not exist.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error recording payment', error: error.message }, { status: 500 });
  }
}

// Basic GET handler to check if the route is working (optional)
export async function GET() {
  return NextResponse.json({ message: 'Payments API endpoint. Use POST to record a payment.' });
}
