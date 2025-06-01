'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui';
import styles from './page.module.css';

export default function SecurityReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const employeeType = "Security";

  useEffect(() => {
    async function fetchReportData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/reports/security-activity`); // Corrected API endpoint
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

  // TODO: Adapt the rendering logic based on the actual structure of reportData for security.
  return (
    <div className={styles.container}>
      <Card title={`${employeeType} Employee Activity Report`}> {/* Changed title */}
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Summary</h3>
              <p className={styles.statItem}><span className={styles.statLabel}>Total Security Personnel:</span> {reportData.totalSecurityPersonnel ?? 'N/A'}</p>
            </div>

            {reportData.clearanceLevelDistribution && reportData.clearanceLevelDistribution.length > 0 && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Clearance Level Distribution</h3>
                <table className={styles.distributionTable}>
                  <thead>
                    <tr>
                      <th>Clearance Level</th>
                      <th>Number of Personnel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.clearanceLevelDistribution.map((item) => (
                      <tr key={item.level}>
                        <td>{item.level}</td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Placeholder for other report sections if data becomes available */}
            {/* Example:
            {reportData.incidentsHandled && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Incidents Handled (Last 30 Days)</h3>
                <p className={styles.statItem}>{reportData.incidentsHandled}</p>
              </div>
            )}
            */}
          </div>
        )}
        {!loading && !error && !reportData && (
            <p>No report data available for {employeeType.toLowerCase()} employee at this time.</p>
        )}
      </Card>
    </div>
  );
}
