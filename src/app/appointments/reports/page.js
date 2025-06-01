"use client";

import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function AppointmentReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportData() {
      try {
        setLoading(true);
        const response = await fetch('/api/appointments/reports');
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointment Activity Report</h1>
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
                <p className={styles.summaryValue}>{reportData.summary.totalAppointments}</p>
                <p className={styles.summaryLabel}>Total Appointments</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{reportData.summary.appointmentsToday}</p>
                <p className={styles.summaryLabel}>Appointments Today</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{reportData.summary.appointmentsThisMonth}</p>
                <p className={styles.summaryLabel}>Appointments This Month</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{reportData.summary.averageDurationMinutes ? `${Math.round(reportData.summary.averageDurationMinutes)} mins` : 'N/A'}</p>
                <p className={styles.summaryLabel}>Avg. Duration</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryValue}>{formatCurrency(reportData.summary.totalRevenue)}</p>
                <p className={styles.summaryLabel}>Total Revenue (Paid)</p>
              </div>
            </div>
          </section>

          {/* Appointments by Doctor Section */}
          {reportData.appointmentsByDoctor && reportData.appointmentsByDoctor.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Top Doctors by Appointment Volume</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Appointments</th>
                    <th>Avg. Duration (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.appointmentsByDoctor.map((doc, index) => (
                    <tr key={index}><td>{`Dr. ${doc.doctor_first_name} ${doc.doctor_last_name}`}</td>
                      <td>{doc.specialization}</td>
                      <td>{doc.appointment_count}</td>
                      <td>{doc.average_duration ? Math.round(doc.average_duration) : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Appointments by Payment Status Section */}
          {reportData.appointmentsByPaymentStatus && reportData.appointmentsByPaymentStatus.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Appointments by Payment Status</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Payment Status</th>
                    <th>Appointment Count</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.appointmentsByPaymentStatus.map((status, index) => (
                    <tr key={index}><td>{status.payment_status}</td>
                      <td>{status.appointment_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Upcoming Appointments Section */}
          {reportData.upcomingAppointments && reportData.upcomingAppointments.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Upcoming Appointments (Next 7 Days)</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Duration (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.upcomingAppointments.map((appt) => (
                    <tr key={appt.appointment_id}><td>{formatDate(appt.date_time)}</td>
                      <td>{`${appt.patient_first_name} ${appt.patient_last_name}`}</td>
                      <td>{`Dr. ${appt.doctor_first_name} ${appt.doctor_last_name}`}</td>
                      <td>{appt.specialization}</td>
                      <td>{appt.duration || 'N/A'}</td>
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
