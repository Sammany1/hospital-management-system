import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui';
import styles from './page.module.css'; 

export default function HousekeepingPage() {
  const categoryName = "Housekeeping Staff";
  const basePath = "/staff/housekeeping";
  const addPath = "/staff/housekeeping/add-housekeeping";

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Manage {categoryName}</h1>
      <p className={styles.subTitle}>Add new housekeeping staff, view existing staff, or generate reports.</p>
      <div className={styles.optionsGrid}>
        <Link href={addPath} passHref>
          <Card title={`Add ${categoryName.slice(0, -1)}`} className={styles.optionCard}>
            <p>Register a new member of the housekeeping team.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/view`} passHref>
          <Card title={`View ${categoryName}`} className={styles.optionCard}>
            <p>View and manage existing housekeeping staff records.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/reports`} passHref>
          <Card title={`${categoryName} Reports`} className={styles.optionCard}>
            <p>Generate and view reports related to housekeeping staff.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
