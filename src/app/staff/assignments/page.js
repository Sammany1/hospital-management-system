import React from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function StaffAssignmentsPage() {
  return (
    <div className={styles.container}>
      <Card title="Staff Assignments">
        <p>Manage and view staff assignments to areas, wards, and equipment. (Functionality to be implemented)</p>
      </Card>
    </div>
  );
}
