import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui';
import styles from './page.module.css';

const employeeCategories = [
  { name: 'Doctors', path: 'doctors', description: 'Manage medical doctors and specialists.' },
  { name: 'Nurses', path: 'nurses', description: 'Manage nursing employee and patient care.' },
  { name: 'Receptionists', path: 'receptionists', description: 'Manage front desk and patient reception.' },
  { name: 'Housekeeping', path: 'housekeeping', description: 'Manage cleaning and facility maintenance employee.' },
  { name: 'Technicians', path: 'technicians', description: 'Manage medical and lab technicians.' },
  { name: 'Security', path: 'security', description: 'Manage hospital security personnel.' },
  { name: 'All Employees', path: 'other', description: 'View all employee or add miscellaneous employee types.' },
];

export default function EmployeePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Employee Management</h1>
      <p className={styles.subTitle}>Select a category to manage specific employee types or view all employee.</p>
      <div className={styles.categoryGrid}>
        {employeeCategories.map((category) => (
          <Link key={category.path} href={`/employee/${category.path}`} passHref>
            <Card title={category.name} className={styles.categoryCard}>
              <p>{category.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
