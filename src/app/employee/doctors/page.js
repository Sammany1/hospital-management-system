import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui';
import styles from './page.module.css'; // We'll create this next

export default function DoctorsPage() {
  const categoryName = "Doctors";
  const basePath = "/employee/doctors";
  const addPath = "/employee/doctors/add-doctor"; // Updated path

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Manage {categoryName}</h1>
      <p className={styles.subTitle}>Add new doctors, view existing employee, or generate reports.</p>
      <div className={styles.optionsGrid}>
        <Link href={addPath} passHref>
          <Card title={`Add ${categoryName.slice(0, -1)}`} className={styles.optionCard}>
            <p>Register a new doctor in the system.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/view`} passHref>
          <Card title={`View ${categoryName}`} className={styles.optionCard}>
            <p>Search and view records of existing doctors.</p>
          </Card>
        </Link>
        <Link href={`${basePath}/reports`} passHref>
          <Card title={`${categoryName} Reports`} className={styles.optionCard}>
            <p>Generate and view reports related to doctors.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
