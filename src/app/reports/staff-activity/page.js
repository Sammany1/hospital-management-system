import React from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function EmployeeActivityReportPage() {
  return (
    <div className={styles.container}>
      <Card title="Employee Activity Report">
        <p>Reports on employee schedules, assignments, and performance. (Functionality to be implemented)</p>
      </Card>
    </div>
  );
}
