import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Dashboard
        </Link>

        <h3 className={styles.sectionTitle}>Patients</h3>
        <Link href="/patients" className={styles.navLink}>
          Manage Patients
        </Link>
        <Link href="/patients/add" className={styles.navLink}>
          Add Patient
        </Link>

        <h3 className={styles.sectionTitle}>Employee</h3>
        <Link href="/employee" className={styles.navLink}>
          Manage Employee
        </Link>

        <h3 className={styles.sectionTitle}>Appointments</h3>
        <Link href="/appointments" className={styles.navLink}>
          Manage Appointments
        </Link>

        <h3 className={styles.sectionTitle}>Treatments</h3>
        <Link href="/treatments" className={styles.navLink}>
          Manage Treatments
        </Link>

        <h3 className={styles.sectionTitle}>Facilities</h3>
        <Link href="/facilities" className={styles.navLink}>
          Manage Facilities
        </Link>

        <h3 className={styles.sectionTitle}>Billing</h3>
        <Link href="/billing" className={styles.navLink}>
          Manage Billing
        </Link>

        <h3 className={styles.sectionTitle}>Reports</h3>
        <Link href="/reports" className={styles.navLink}>
          View Reports
        </Link>
        <Link href="/reports/daily-activity" className={styles.navLink}>
          Daily Activity
        </Link>
        {/* Add more report links here */}
      </nav>
    </aside>
  );
};

export default Sidebar;
