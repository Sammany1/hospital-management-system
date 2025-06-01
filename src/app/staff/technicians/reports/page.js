'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui';
import styles from './page.module.css';

export default function TechnicianReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      setLoading(true);
      try {
        const response = await fetch('/api/reports/technician-activity');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `Failed to fetch technician reports: ${response.status} ${response.statusText}` }));
          throw new Error(errorData.message || `Failed to fetch technician reports: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching technician reports:', err);
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
      <Card title="Technician Activity Report">
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Total Technicians</h3>
              <p className={styles.statValue}>{reportData.totalTechnicians}</p>
            </div>

            {reportData.specializationDistribution && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Specialization Distribution</h3>
                <ul className={styles.statList}>
                  {Object.entries(reportData.specializationDistribution).map(([specialization, count]) => (
                    <li key={specialization} className={styles.statListItem}>
                      <span className={styles.statLabel}>{specialization}:</span> {count}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Average Tests Conducted (Last 30 Days)</h3>
              <p className={styles.statValue}>{reportData.averageTestsConducted !== 'N/A' ? reportData.averageTestsConducted + ' tests/technician' : 'N/A'}</p>
            </div>

            {reportData.topTechniciansByTests && reportData.topTechniciansByTests.length > 0 && (
              <div className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Top Technicians by Tests (Last 30 Days)</h3>
                <ul className={styles.statList}>
                  {reportData.topTechniciansByTests.map((tech, index) => (
                    <li key={index} className={styles.statListItem}>
                      <span className={styles.statLabel}>{tech.first_name} {tech.last_name}:</span> {tech.test_count} tests
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {!loading && !error && !reportData && (
          <p>No technician activity data available.</p>
        )}
      </Card>
    </div>
  );
}