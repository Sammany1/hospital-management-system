'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui';
import styles from './page.module.css';

export default function OtherStaffReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      setLoading(true);
      try {
        // Assuming a general staff activity report endpoint or one that can be filtered
        // For now, let's imagine an endpoint /api/reports/staff-activity?type=general or similar
        // This needs to be defined in your backend.
        const response = await fetch(`/api/reports/staff-activity?role=other`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch general staff reports: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching general staff reports:`, err);
        setError(err.message);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchReportData();
  }, []);

  return (
    <div className={styles.container}>
      <Card title="General Staff Activity Report">
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Ensure the API endpoint is correctly defined.</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Overall Staff Summary</h3>
              <p className={styles.statItem}>
                <span className={styles.statLabel}>Total Active Staff (Other Categories):</span> 
                {reportData.totalOtherStaff ?? 'N/A'}
              </p>
              {/* Example: Distribution by employee_type if API provides it */}
              {reportData.employeeTypeDistribution && reportData.employeeTypeDistribution.length > 0 && (
                <>
                  <h4 className={styles.subSectionTitle}>Distribution by Type:</h4>
                  <ul className={styles.statList}>
                    {reportData.employeeTypeDistribution.map(item => (
                      <li key={item.type} className={styles.statListItem}>
                        <span className={styles.statLabel}>{item.type}:</span> {item.count}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {reportData.departmentDistribution && reportData.departmentDistribution.length > 0 && (
                <div className={styles.reportSection}>
                    <h3 className={styles.sectionTitle}>Staff Distribution by Department</h3>
                    <ul className={styles.statList}>
                        {reportData.departmentDistribution.map(dept => (
                            <li key={dept.department_name} className={styles.statListItem}>
                                <span className={styles.statLabel}>{dept.department_name}:</span> {dept.count} staff members
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* Add more relevant general staff report sections here based on your API capabilities */}
            {/* For example: Average tenure, hiring trends for 'other' staff, etc. */}

          </div>
        )}
        {!loading && !error && !reportData && (
            <p>No general staff report data available at this time.</p>
        )}
      </Card>
    </div>
  );
}
