import React from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function EmployeeAssignmentsPage() {
  return (
    <div className={styles.container}>
      <Card title="Employee Assignments">
        <p>Manage and view employee assignments to areas, wards, and equipment. (Functionality to be implemented)</p>
      </Card>
    </div>
  );
}
