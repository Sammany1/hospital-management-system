'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui'; // Adjusted path
import styles from './page.module.css';

export default function HousekeepingReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const employeeType = "Housekeeping"; // Used for titles and messages

  useEffect(() => {
    async function fetchReportData() {
      setLoading(true);
      try {
        // Corrected API endpoint
        const response = await fetch('/api/reports/housekeeping-activity'); 
        if (!response.ok) {
          // Try to parse JSON error response, otherwise use status text
          const errorData = await response.json().catch(() => ({ 
            message: `Failed to fetch ${employeeType.toLowerCase()} reports: ${response.status} ${response.statusText}` 
          }));
          throw new Error(errorData.message || `Failed to fetch ${employeeType.toLowerCase()} reports: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${employeeType.toLowerCase()} reports:`, err);
        setError(err.message);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchReportData();
  }, [employeeType]); // employeeType added to dependency array as it's used in fetchReportData

  return (
    <div className={styles.container}>
      <Card title={`${employeeType} Activity Report`}>
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Total {employeeType} Employee</h3>
              <p className={styles.statValue}>{reportData.totalHousekeepingEmployee}</p>
            </div>

            {reportData.areaAssignments && Object.keys(reportData.areaAssignments).length > 0 && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Area Assignments</h3>
                <ul className={styles.statList}>
                  {Object.entries(reportData.areaAssignments).map(([area, count]) => (
                    <li key={area} className={styles.statListItem}>
                      <span className={styles.statLabel}>{area}:</span> {count} employee assigned
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Example sections for other data points - adapt as needed */}
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Tasks Completed Today</h3>
              <p className={styles.statValue}>{reportData.tasksCompletedToday}</p>
            </div>
            
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Average Cleaning Time</h3>
              <p className={styles.statValue}>{reportData.averageCleaningTime}</p>
            </div>

          </div>
        )}
        {!loading && !error && !reportData && (
            <p>No {employeeType.toLowerCase()} activity data available.</p>
        )}
      </Card>
    </div>
  );
}
