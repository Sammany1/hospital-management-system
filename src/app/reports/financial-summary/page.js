import React from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function FinancialSummaryReportPage() {
  return (
    <div className={styles.container}>
      <Card title="Financial Summary Report">
        <p>Overall financial performance, revenue, and expenses. (Functionality to be implemented)</p>
      </Card>
    </div>
  );
}
