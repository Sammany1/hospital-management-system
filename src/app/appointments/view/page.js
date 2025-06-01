import React from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function ViewAppointmentsPage() {
  return (
    <div className={styles.container}>
      <Card title="View Appointments">
        <p>This page will display a list or calendar of appointments. (Functionality to be implemented)</p>
      </Card>
    </div>
  );
}
