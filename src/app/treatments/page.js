import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import styles from './page.module.css';

export default function TreatmentsPage() {
  return (
    <div className={styles.container}>
      <Card title="Treatment Management">
        <p>Define medical treatments, schedule them for patients, and manage assignments.</p>
        <div className={styles.buttonGroup}>
          <Link href="/treatments/define" passHref legacyBehavior><Button variant="primary">Define Treatment</Button></Link>
          <Link href="/treatments/schedule-treatment" passHref legacyBehavior><Button>Schedule Treatment</Button></Link>
          <Link href="/treatments/assignments" passHref legacyBehavior><Button variant="secondary">View Assignments</Button></Link>
        </div>
      </Card>
    </div>
  );
}
