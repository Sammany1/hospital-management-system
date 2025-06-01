import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import styles from './page.module.css';

export default function ReportsPage() {
  return (
    <div className={styles.container}>
      <Card title="Hospital Reports">
        <p>Access various reports for hospital operations, patient data, employee activity, and financials.</p>
        <div className={styles.buttonGroup}>
          <Link href="/reports/daily-activity" passHref legacyBehavior><Button variant="primary">Daily Activity Report</Button></Link>
          <Link href="/reports/patient-statistics" passHref legacyBehavior><Button>Patient Statistics</Button></Link>
          <Link href="/reports/employee-activity" passHref legacyBehavior><Button>Employee Activity</Button></Link>
          <Link href="/reports/financial-summary" passHref legacyBehavior><Button>Financial Summary</Button></Link>
          <Link href="/reports/room-utilization" passHref legacyBehavior><Button>Room Utilization</Button></Link>
        </div>
      </Card>
    </div>
  );
}
