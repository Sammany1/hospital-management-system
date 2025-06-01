import { NextResponse } from 'next/server';
import pool from '../../../../../utils/db'; // Correctly import the pool
import dbSemaphore from '../../../../../utils/db-semaphore'; // Import the semaphore

export async function GET(request) {
  let connection;
  try {
    await dbSemaphore.acquire(); // Acquire semaphore before getting a connection
    connection = await pool.getConnection(); // Get a connection from the pool

    // Summary Statistics
    const [summaryRows] = await connection.execute(`
      SELECT
        (SELECT COUNT(*) FROM employee) AS totalEmployees,
        (SELECT COUNT(DISTINCT department_id) FROM employee) AS totalDepartmentsWithEmployees,
        (SELECT COUNT(*) FROM department) AS totalRegisteredDepartments,
        (SELECT AVG(salary) FROM employee) AS averageSalary,
        (SELECT COUNT(*) FROM employee WHERE hiring_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')) AS hiredThisMonth
    `);

    // Employees by Type
    const [employeesByTypeRows] = await connection.execute(`
      SELECT 
        employee_type, 
        COUNT(*) AS count, 
        AVG(salary) AS averageSalary
      FROM employee
      GROUP BY employee_type
      ORDER BY count DESC
    `);

    // Employees by Department
    const [employeesByDepartmentRows] = await connection.execute(`
      SELECT 
        d.name AS department, 
        COUNT(e.employee_id) AS count, 
        AVG(e.salary) AS averageSalary
      FROM employee e
      JOIN department d ON e.department_id = d.department_id
      GROUP BY d.department_id, d.name
      ORDER BY count DESC
    `);

    // Recently Hired Employees (Last 30 Days)
    const [recentlyHiredRows] = await connection.execute(`
      SELECT 
        e.employee_id, 
        e.first_name, 
        e.last_name, 
        e.employee_type, 
        d.name AS department, 
        e.hiring_date,
        e.salary
      FROM employee e
      JOIN department d ON e.department_id = d.department_id
      WHERE e.hiring_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      ORDER BY e.hiring_date DESC
      LIMIT 10
    `);

    const reportData = {
      summary: {
        totalEmployees: summaryRows[0].totalEmployees || 0,
        // Using totalRegisteredDepartments as it might be more relevant than just those with employees
        totalDepartments: summaryRows[0].totalRegisteredDepartments || 0, 
        averageSalary: summaryRows[0].averageSalary || 0,
        hiredThisMonth: summaryRows[0].hiredThisMonth || 0,
      },
      employeesByType: employeesByTypeRows.map(row => ({
        ...row,
        averageSalary: row.averageSalary || 0
      })),
      employeesByDepartment: employeesByDepartmentRows.map(row => ({
        ...row,
        averageSalary: row.averageSalary || 0
      })),
      recentlyHired: recentlyHiredRows,
    };

    if (!reportData.summary.totalEmployees && !reportData.employeesByType.length && !reportData.employeesByDepartment.length) {
        // If there's truly no employee data at all, we can still return the structure but note it.
        // Or return a 404 if preferred, but for a report, showing "0" might be better.
    }

    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch employee reports:', error);
    return NextResponse.json({ error: 'Failed to fetch employee reports', details: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
    dbSemaphore.release(); // Release semaphore
  }
}
