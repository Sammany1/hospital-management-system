import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui';
import styles from './page.module.css';

export default function SecurityPage() {
  const categoryName = "Security";
  const basePath = "/employee/security";
  const addPath = "/employee/security/add-security";

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Manage {categoryName}</h1>
      <p className={styles.subTitle}>Add new security employee, view existing employee, or generate reports.</p>
      <div className={styles.optionsGrid}>
        <Link href={addPath} passHref>
          <Card title={`Add Security Employee`} className={styles.optionCard}>
            <p>Register new security personnel.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/view`} passHref>
          <Card title={`View ${categoryName} Employee`} className={styles.optionCard}>
            <p>Search and view records of existing security employee.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/reports`} passHref>
          <Card title={`${categoryName} Reports`} className={styles.optionCard}>
            <p>Generate and view reports related to security.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
