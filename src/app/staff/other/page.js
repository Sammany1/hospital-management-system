import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui';
import styles from './page.module.css'; // You'll create this CSS module

export default function OtherStaffPage() {
  const categoryName = "Other Staff";
  const basePath = "/staff/other";

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Manage {categoryName}</h1>
      <p className={styles.subTitle}>Add new staff, view existing staff, or generate reports for miscellaneous employee types.</p>
      <div className={styles.optionsGrid}>
        <Link href={`${basePath}/add`} passHref>
          <Card title={`Add ${categoryName}`} className={styles.optionCard}>
            <p>Register new staff members for various roles.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/view`} passHref>
          <Card title={`View ${categoryName}`} className={styles.optionCard}>
            <p>Search and view records of existing staff in other categories.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/reports`} passHref>
          <Card title={`${categoryName} Reports`} className={styles.optionCard}>
            <p>Generate and view reports related to general staff activities.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
