import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function TechniciansPage() {
  const categoryName = "Technicians";
  const basePath = "/employee/technicians";
  const addPath = "/employee/technicians/add-technician"; // Assuming a specific add page

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Manage {categoryName}</h1>
      <p className={styles.subTitle}>Add new technicians, view existing employee, or generate reports.</p>
      <div className={styles.optionsGrid}>
        <Link href={addPath} passHref>
          <Card title={`Add ${categoryName.slice(0, -1)}`} className={styles.optionCard}>
            <p>Register a new technician in the system.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/view`} passHref>
          <Card title={`View ${categoryName}`} className={styles.optionCard}>
            <p>Search and view records of existing technicians.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/reports`} passHref>
          <Card title={`${categoryName} Reports`} className={styles.optionCard}>
            <p>Generate and view reports related to technicians.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
