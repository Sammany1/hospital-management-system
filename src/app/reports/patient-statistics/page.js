import React from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function PatientStatisticsReportPage() {
  return (
    <div className={styles.container}>
      <Card title="Patient Statistics Report">
        <p>Detailed statistics about patients. (Functionality to be implemented)</p>
      </Card>
    </div>
  );
}
