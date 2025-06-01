'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function PatientReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      try {
        setLoading(true);
        const response = await fetch('/api/reports/patient-demographics');
        if (!response.ok) {
          throw new Error(`Failed to fetch patient demographics: ${response.status}`);
        }
        const data = await response.json();
        // Filter out sex categories 'Other' and 'Unknown' if they somehow still appear from API
        if (data.sexDistribution) {
            delete data.sexDistribution.Other;
            delete data.sexDistribution.Unknown;
        }
        // Filter out age category 'Unknown' if it somehow still appears
        if (data.ageDistribution) {
            delete data.ageDistribution.Unknown;
        }
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

  return (
    <div className={styles.container}>
      <Card title="Patient Demographic Report">
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Total Patients (Male/Female, Known Age)</h3>
              <p className={styles.statValue}>{reportData.totalPatients}</p>
            </div>

            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Sex Distribution</h3>
              <ul className={styles.statList}>
                {Object.entries(reportData.sexDistribution).map(([sex, count]) => (
                  <li key={sex} className={styles.statListItem}>
                    <span className={styles.statLabel}>{sex}:</span> {count}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Age Distribution</h3>
              <ul className={styles.statList}>
                {Object.entries(reportData.ageDistribution).map(([ageGroup, count]) => (
                  <li key={ageGroup} className={styles.statListItem}>
                    <span className={styles.statLabel}>{ageGroup}:</span> {count}
                  </li>
                ))}
              </ul>
            </div>
            {/* Further reports can be added here or linked to from here */}
          </div>
        )}
        {!loading && !error && !reportData && (
            <p>No patient demographic data available.</p>
        )}
      </Card>
    </div>
  );
}
