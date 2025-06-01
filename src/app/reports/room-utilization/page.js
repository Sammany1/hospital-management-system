import React from 'react';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function RoomUtilizationReportPage() {
  return (
    <div className={styles.container}>
      <Card title="Room Utilization Report">
        <p>Report on room occupancy, availability, and usage patterns. (Functionality to be implemented)</p>
      </Card>
    </div>
  );
}
