import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import styles from './page.module.css';

export default function PatientsPage() {
  return (
    <div className={styles.container}>
      <Card title="Patient Management">
        <p>Manage patient information, view history, and access patient-related reports.</p>
        <div className={styles.buttonGroup}>
          <Link href="/patients/add" passHref legacyBehavior>
            <Button variant="primary">Add New Patient</Button>
          </Link>
          <Link href="/patients/view" passHref legacyBehavior>
            <Button variant="secondary">View Patients</Button>
          </Link>
          <Link href="/patients/reports" passHref legacyBehavior>
            <Button variant="secondary">Patient Reports</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
