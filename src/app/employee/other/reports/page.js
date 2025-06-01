'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../../../../components/ui';
import styles from './page.module.css';

export default function GeneralEmployeeReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportData() {
      try {
        setLoading(true);
        const response = await fetch('/api/employee/other/reports');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setReportData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchReportData();
  }, []);

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>General Employee Activity Report</h1>
      {loading && <p className={styles.loading}>Loading report data...</p>}
      {error && <p className={styles.error}>Error: {error}. Ensure the API endpoint is correctly defined and the server is running.</p>}
      {!loading && !error && !reportData && <p>No report data found.</p>}

      {!loading && !error && reportData && (
        <div className={styles.reportContent}>
          {/* Summary Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Summary Statistics</h2>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{reportData.summary.totalEmployees}</p>
                <p className={styles.summaryLabel}>Total Employees</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{reportData.summary.totalDepartments}</p>
                <p className={styles.summaryLabel}>Total Departments</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{formatSalary(reportData.summary.averageSalary)}</p>
                <p className={styles.summaryLabel}>Average Salary</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{reportData.summary.hiredThisMonth}</p>
                <p className={styles.summaryLabel}>Hired This Month</p>
              </div>
            </div>
          </section>

          {/* Employees by Type Section */}
          {reportData.employeesByType && reportData.employeesByType.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Employees by Type</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Count</th>
                    <th>Average Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.employeesByType.map((type) => (
                    <tr key={type.employee_type}>
                      <td>{type.employee_type}</td>
                      <td>{type.count}</td>
                      <td>{formatSalary(type.averageSalary)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Employees by Department Section */}
          {reportData.employeesByDepartment && reportData.employeesByDepartment.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Employees by Department</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Count</th>
                    <th>Average Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.employeesByDepartment.map((dept) => (
                    <tr key={dept.department}>
                      <td>{dept.department}</td>
                      <td>{dept.count}</td>
                      <td>{formatSalary(dept.averageSalary)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Recently Hired Employees Section */}
          {reportData.recentlyHired && reportData.recentlyHired.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Recently Hired Employees (Last 30 Days)</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Department</th>
                    <th>Hiring Date</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.recentlyHired.map((emp) => (
                    <tr key={emp.employee_id}>
                      <td>{emp.employee_id}</td>
                      <td>{`${emp.first_name} ${emp.last_name}`}</td>
                      <td>{emp.employee_type}</td>
                      <td>{emp.department}</td>
                      <td>{new Date(emp.hiring_date).toLocaleDateString()}</td>
                      <td>{formatSalary(emp.salary)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
