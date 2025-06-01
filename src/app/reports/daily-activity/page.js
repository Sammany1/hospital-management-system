'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui'; // Adjusted path
import styles from './page.module.css';

export default function DailyActivityReportPage() { // Renamed from DailyCustomersReportPage
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch data from an API endpoint /api/reports/daily-activity
    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/reports/daily-activity'); // Updated API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error("Error fetching daily activity report:", error);
        setReportData(null); // Or set an error state
      }
      setLoading(false);
    };

    fetchReport();
  }, []);

  return (
    <div className={styles.container}>
      <Card title="Daily Activity Report"> {/* Updated title */}
        {loading && <p>Loading report...</p>}
        {reportData && !loading && (
          <div>
            <p><strong>Date:</strong> {reportData.date}</p>
            <p><strong>Number of Patients Today:</strong> {reportData.customerCount}</p> {/* Clarified label */}
            {/* Display more report details here */}
          </div>
        )}
        {!reportData && !loading && <p>No report data available.</p>}
      </Card>
    </div>
  );
}
