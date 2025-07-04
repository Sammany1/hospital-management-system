import pool from '../../../utils/db';
import dbSemaphore from '../../../utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;

  try {
    connection = await pool.getConnection();

    // 1. Summary Statistics
    const [summaryRows] = await connection.execute(`
      SELECT 
        (SELECT SUM(amount) FROM billing WHERE status != 'Refunded') as totalRevenue,
        (SELECT SUM(amount) FROM refunds) as totalRefunds,
        (SELECT COUNT(*) FROM billing) as totalTransactions
    `);

    // 2. Recent Transactions (last 10)
    const [recentTransactions] = await connection.execute(`
      SELECT b.payment_id, p.name as patient_name, b.amount, b.payment_date, b.status
      FROM billing b
      JOIN patient p ON b.patient_id = p.patient_id
      ORDER BY b.payment_date DESC
      LIMIT 10
    `);

    // 3. Recent Refunds (last 10)
    const [recentRefunds] = await connection.execute(`
      SELECT r.refund_id, p.name as patient_name, r.amount, r.refund_date, r.reason
      FROM refunds r
      JOIN billing b ON r.payment_id = b.payment_id
      JOIN patient p ON b.patient_id = p.patient_id
      ORDER BY r.refund_date DESC
      LIMIT 10
    `);

    const reportData = {
      summary: summaryRows[0],
      recentTransactions,
      recentRefunds,
    };

    return new Response(JSON.stringify(reportData), { status: 200 });

  } catch (error) {
    console.error('Error fetching billing reports:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch billing reports' }), { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
