import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db'; // Assuming your db utility is here

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      paymentId,
      refundAmount,
      refundReason,
      refundDate,
      processedByStaffId, // Optional
    } = data;

    // Basic validation
    if (!paymentId || !refundAmount || !refundDate) {
      return NextResponse.json({ message: 'Missing required fields (paymentId, refundAmount, refundDate)' }, { status: 400 });
    }

    const amount = parseFloat(refundAmount);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ message: 'Invalid refund amount.' }, { status: 400 });
    }

    // TODO: Add more sophisticated validation:
    // 1. Check if paymentId exists in the Payments table.
    // 2. Check if the refundAmount does not exceed the original payment amount (or remaining refundable amount).
    //    - This might involve fetching the original payment and any previous refunds for it.
    //    - For simplicity, this example doesn't implement this check yet.

    const result = await query({
      query: \`
        INSERT INTO Refunds (
          payment_id, 
          refund_amount, 
          refund_date, 
          refund_reason,
          processed_by_staff_id
        ) VALUES (?, ?, ?, ?, ?)
      \`,
      values: [
        paymentId,
        amount,
        refundDate,
        refundReason || null,
        processedByStaffId || null,
      ],
    });

    if (result.insertId) {
      // Optionally, you might want to update the original payment record status or refunded_amount here.
      return NextResponse.json({ message: 'Refund processed successfully', refundId: result.insertId }, { status: 201 });
    } else {
      console.error('Failed to insert refund:', result);
      return NextResponse.json({ message: 'Failed to process refund' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing refund:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        if (error.message.includes('payment_id')) {
            return NextResponse.json({ message: 'Invalid Payment ID. The original payment does not exist.' }, { status: 400 });
        }
        if (error.message.includes('processed_by_staff_id')) {
            return NextResponse.json({ message: 'Invalid Staff ID for processing. Staff does not exist.' }, { status: 400 });
        }
    }
    return NextResponse.json({ message: 'Error processing refund', error: error.message }, { status: 500 });
  }
}

// Basic GET handler to check if the route is working (optional)
export async function GET() {
  return NextResponse.json({ message: 'Refunds API endpoint. Use POST to process a refund.' });
}
