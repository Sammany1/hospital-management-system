import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui';
import styles from './page.module.css'; // You'll create this CSS module

export default function OtherEmployeePage() {
  const categoryName = "All Employees";
  const basePath = "/employee/other";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage {categoryName}</h1>
      <p className={styles.description}>
        Add new employee, view existing employee, or generate reports for miscellaneous employee types.
      </p>
      <div className={styles.grid}>
        <Link href={`${basePath}/add`} passHref>
          <Card title={`Add Other Employee`} className={styles.card}>
            <h2>Add Other Employee &rarr;</h2>
            <p>Register new employee members for various roles.</p>
          </Card>
        </Link>

        <Link href={`${basePath}/view`} passHref>
          <Card title={`View ${categoryName}`} className={styles.card}>
            <h2>View All Other Employee &rarr;</h2>
            <p>Search and view records of existing employee in other categories.</p>
          </Card>
        </Link>

        <Link href={`${basePath}/reports`} passHref>
          <Card title={`${categoryName} Reports`} className={styles.card}>
            <h2>Other Employee Reports &rarr;</h2>
            <p>Generate and view reports related to general employee activities.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
