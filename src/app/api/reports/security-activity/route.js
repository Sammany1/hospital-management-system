import { NextResponse } from 'next/server';
import pool from '@/utils/db'; // Corrected: import pool directly
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection(); // Get connection from pool

    // Get total security personnel
    const [totalSecurityResultRows] = await connection.execute( // Use connection.execute
      "SELECT COUNT(*) as totalSecurityPersonnel FROM employee WHERE employee_type = 'Security'"
    );
    const totalSecurityPersonnel = totalSecurityResultRows[0]?.totalSecurityPersonnel || 0;

    // Get clearance level distribution
    const [clearanceDistributionRows] = await connection.execute( // Use connection.execute
      `
        SELECT 
          s.clearance_level, 
          COUNT(e.employee_id) as count
        FROM employee e
        JOIN security s ON e.employee_id = s.S_employee_id
        WHERE e.employee_type = 'Security'
        GROUP BY s.clearance_level
        ORDER BY s.clearance_level
      `
    );
    const clearanceLevelDistribution = clearanceDistributionRows.map(row => ({
      level: row.clearance_level,
      count: row.count,
    }));

    return NextResponse.json({
      totalSecurityPersonnel,
      clearanceLevelDistribution,
      // Add other security-related metrics here if needed
    });
  } catch (error) {
    console.error('Error fetching security activity report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch security activity report.', error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release(); // Release connection
    dbSemaphore.release();
  }
}
