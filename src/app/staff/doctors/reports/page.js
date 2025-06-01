// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/staff/doctors/reports/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui'; // Adjusted path
import styles from './page.module.css';

export default function DoctorReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      setLoading(true);
      try {
        const response = await fetch('/api/reports/doctor-activity'); 
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `Failed to fetch doctor reports: ${response.status} ${response.statusText}` }));
          throw new Error(errorData.message || `Failed to fetch doctor reports: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching doctor reports:', err);
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
      <Card title="Doctor Activity Report">
        {loading && <p>Loading report data...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {reportData && (
          <div className={styles.reportContent}>
            <div className={styles.reportSection}>
              <h3 className={styles.sectionTitle}>Total Doctors</h3>
              <p className={styles.statValue}>{reportData.totalDoctors}</p>
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
              <h3 className={styles.sectionTitle}>Average Patient Load (Last 30 Days)</h3>
              <p className={styles.statValue}>{reportData.averagePatientLoad !== 'N/A' ? reportData.averagePatientLoad + ' appointments/doctor' : 'N/A'}</p>
            </div>

            {reportData.topDoctorsByAppointments && reportData.topDoctorsByAppointments.length > 0 && (
                <div className={styles.reportSection}>
                    <h3 className={styles.sectionTitle}>Top Doctors by Appointments (Last 30 Days)</h3>
                    <ul className={styles.statList}>
                        {reportData.topDoctorsByAppointments.map((doctor, index) => (
                            <li key={index} className={styles.statListItem}>
                                <span className={styles.statLabel}>{doctor.first_name} {doctor.last_name}:</span> {doctor.appointment_count} appointments
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
          </div>
        )}
        {!loading && !error && !reportData && (
            <p>No doctor activity data available.</p>
        )}
      </Card>
    </div>
  );
}