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

        <h3 className={styles.sectionTitle}>Staff</h3>
        <Link href="/staff" className={styles.navLink}>
          Manage Staff
        </Link>

        <h3 className={styles.sectionTitle}>Appointments</h3>
        <Link href="/appointments" className={styles.navLink}>
          Manage Appointments
        </Link>
        <Link href="/appointments/schedule" className={styles.navLink}>
          Schedule Appointment
        </Link>

        <h3 className={styles.sectionTitle}>Treatments</h3>
        <Link href="/treatments" className={styles.navLink}>
          Manage Treatments
        </Link>
        <Link href="/treatments/define" className={styles.navLink}>
          Define Treatment
        </Link>
        <Link href="/treatments/schedule-treatment" className={styles.navLink}>
          Schedule Treatment
        </Link>


        <h3 className={styles.sectionTitle}>Facilities</h3>
        <Link href="/facilities" className={styles.navLink}>
          Manage Facilities
        </Link>
        <Link href="/facilities/rooms" className={styles.navLink}>
          Manage Rooms
        </Link>

        <h3 className={styles.sectionTitle}>Billing</h3>
        <Link href="/billing" className={styles.navLink}>
          Manage Billing
        </Link>
        <Link href="/billing/record-payment" className={styles.navLink}>
          Record Payment
        </Link>
        <Link href="/billing/process-refund" className={styles.navLink}>
          Process Refund
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
