'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui';
import styles from './page.module.css';

export default function ReceptionistReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const employeeType = "Receptionists";

  useEffect(() => {
    async function fetchReportData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/reports/receptionist-activity`); // Changed API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch ${employeeType.toLowerCase()} reports: ${response.status} ${response.statusText}`);
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
  }, []);

  // TODO: Adapt the rendering logic based on the actual structure of reportData for receptionists.
  return (
    <div className={styles.container}>
      <Card title={`${employeeType} Reports`}>
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Activity Summary (Example)</h3>
              {/* TODO: Update these based on actual receptionist report data structure */}
              <p className={styles.statItem}><span className={styles.statLabel}>Total {employeeType}:</span> {reportData.totalReceptionists || reportData.totalEmployee || 'N/A'}</p>
              <p className={styles.statItem}><span className={styles.statLabel}>Patient Check-ins Today:</span> {reportData.patientCheckInsToday || 'N/A'}</p>
              <p className={styles.statItem}><span className={styles.statLabel}>Average Call Volume (Daily):</span> {reportData.avgCallVolumeDaily || 'N/A'}</p>
            </div>

            {reportData.shiftCoverage && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Shift Coverage</h3>
                <ul className={styles.statList}>
                  {Object.entries(reportData.shiftCoverage).map(([shift, count]) => (
                    <li key={shift} className={styles.statListItem}>
                      <span className={styles.statLabel}>{shift}:</span> {count} {employeeType.toLowerCase()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Further Details</h3>
                <p>More detailed reports can be generated for individual receptionists or specific time periods.</p>
            </div>
          </div>
        )}
        {!loading && !error && !reportData && (
            <p>No report data available for {employeeType.toLowerCase()} at this time.</p>
        )}
      </Card>
    </div>
  );
}
