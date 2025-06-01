import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import styles from './page.module.css';

export default function AppointmentsPage() {
  return (
    <div className={styles.container}>
      <Card title="Appointment Management">
        <p>Schedule, view, and manage patient appointments.</p>
        <div className={styles.buttonGroup}>
          <Link href="/appointments/schedule">
            <Button variant="primary">Schedule New Appointment</Button>
          </Link>
          <Link href="/appointments/view">
            <Button variant="secondary">View Appointments</Button>
          </Link>
          <Link href="/appointments/reports">
            <Button variant="secondary">Appointment Reports</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
