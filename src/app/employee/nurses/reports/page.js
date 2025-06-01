'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui';
import styles from './page.module.css';

export default function NurseReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      setLoading(true);
      try {
        const response = await fetch('/api/reports/nurse-activity');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `Failed to fetch nurse reports: ${response.status} ${response.statusText}` }));
          throw new Error(errorData.message || `Failed to fetch nurse reports: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching nurse reports:', err);
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
      <Card title="Nurse Activity Report">
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Total Nurses</h3>
              <p className={styles.statValue}>{reportData.totalNurses}</p>
            </div>

            {reportData.departmentDistribution && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Department Distribution</h3>
                <ul className={styles.statList}>
                  {Object.entries(reportData.departmentDistribution).map(([department, count]) => (
                    <li key={department} className={styles.statListItem}>
                      <span className={styles.statLabel}>{department}:</span> {count}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {reportData.shiftDistribution && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Shift Distribution</h3>
                <ul className={styles.statList}>
                  {Object.entries(reportData.shiftDistribution).map(([shift, count]) => (
                    <li key={shift} className={styles.statListItem}>
                      <span className={styles.statLabel}>{shift}:</span> {count}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {reportData.wardDistribution && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Ward Distribution</h3>
                <ul className={styles.statList}>
                  {Object.entries(reportData.wardDistribution).map(([ward, count]) => (
                    <li key={ward} className={styles.statListItem}>
                      <span className={styles.statLabel}>{ward}:</span> {count}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}
        {!loading && !error && !reportData && (
            <p>No nurse activity data available.</p>
        )}
      </Card>
    </div>
  );
}
