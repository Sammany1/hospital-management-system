import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui';
import styles from './page.module.css';

const staffCategories = [
  { name: 'Doctors', path: 'doctors', description: 'Manage medical doctors and specialists.' },
  { name: 'Nurses', path: 'nurses', description: 'Manage nursing staff and patient care.' },
  { name: 'Receptionists', path: 'receptionists', description: 'Manage front desk and patient reception.' },
  { name: 'Housekeeping', path: 'housekeeping', description: 'Manage cleaning and facility maintenance staff.' },
  { name: 'Technicians', path: 'technicians', description: 'Manage medical and lab technicians.' },
  { name: 'Security', path: 'security', description: 'Manage hospital security personnel.' },
  { name: 'All Staff', path: 'other', description: 'View all staff or add miscellaneous staff types.' },
];

export default function StaffPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Staff Management</h1>
      <p className={styles.subTitle}>Select a category to manage specific staff types or view all staff.</p>
      <div className={styles.categoryGrid}>
        {staffCategories.map((category) => (
          <Link key={category.path} href={`/staff/${category.path}`} passHref>
            <Card title={category.name} className={styles.categoryCard}>
              <p>{category.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
