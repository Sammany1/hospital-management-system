"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Button } from "../components/ui";
import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  // const [dbStatus, setDbStatus] = useState({ status: 'Checking...', message: '' }); // Moved to Navbar
  const [activePatients, setActivePatients] = useState("N/A");
  const [appointmentsToday, setAppointmentsToday] = useState("N/A");
  const [availableDoctors, setAvailableDoctors] = useState("N/A");
  // Placeholder for lab results until API is ready
  const [pendingLabResults, setPendingLabResults] = useState("12");

  useEffect(() => {
    // Fetch Database Status - Moved to Navbar
    // fetch(\'/api/stats/database-status\')
    //   .then(res => res.json())
    //   .then(data => setDbStatus(data))
    //   .catch(() => setDbStatus({ status: \'Offline\', message: \'Failed to connect to status API.\' }));

    // Fetch Active Patients
    fetch("/api/stats/active-patients")
      .then((res) => res.json())
      .then((data) => setActivePatients(data.activePatients.toString()))
      .catch(() => setActivePatients("Error"));

    // Fetch Appointments Today
    fetch("/api/stats/appointments-today")
      .then((res) => res.json())
      .then((data) => setAppointmentsToday(data.appointmentsToday.toString()))
      .catch(() => setAppointmentsToday("Error"));

    // Fetch Available Doctors
    fetch("/api/stats/available-doctors")
      .then((res) => res.json())
      .then((data) => setAvailableDoctors(data.availableDoctors.toString()))
      .catch(() => setAvailableDoctors("Error"));

    // TODO: Fetch Pending Lab Results when API is available
    // fetch(\'/api/stats/pending-lab-results\')
    //   .then(res => res.json())
    //   .then(data => setPendingLabResults(data.pendingLabResults.toString()))
    //   .catch(() => setPendingLabResults(\'Error\'));

  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Header section removed, as Navbar is now part of the global Layout */}
      {/* <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Image
            src="/hospital-logo.svg"
            alt="Hospital Logo"
            width={150}
            height={50}
            priority
            className={styles.logo}
          />
          <h1 className={styles.title}>Hospital Management System</h1>
        </div>
        <div className={styles.headerRight}>
          <div className={`${styles.dbStatus} ${dbStatus.status === \'Online\' ? styles.dbOnline : styles.dbOffline}`}>
            DB: {dbStatus.status}
            {dbStatus.status === \'Offline\' && dbStatus.message && (
              <span className={styles.dbStatusTooltip}>{dbStatus.message} {dbStatus.errorDetails?.code ? `(${dbStatus.errorDetails.code})` : \'\'}</span>
            )}
          </div>
        </div>
      </header> */}

      <main className={styles.mainContent}>
        <Card title="Welcome to HOSYS" className={styles.welcomeCard}>
          <p className={styles.welcomeText}>
            Your central hub for managing patient care, employee, appointments, and
            critical hospital operations efficiently.
          </p>
          <p className={styles.welcomeSubtext}>
            Navigate through the system using the sidebar to access different
            modules.
          </p>
        </Card>

        <section className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <Link href="/patients/add" passHref legacyBehavior>
              <a className={styles.actionCardLink}>
                <Card title="Add New Patient" className={styles.actionCard}>
                  <p>Register a new patient into the system.</p>
                  <Button
                    variant="primary"
                    className={styles.actionButton}
                  >
                    Go to Add Patient
                  </Button>
                </Card>
              </a>
            </Link>
            <Link href="/appointments/schedule" passHref legacyBehavior>
              <a className={styles.actionCardLink}>
                <Card title="Schedule Appointment" className={styles.actionCard}>
                  <p>Book a new appointment for a patient.</p>
                  <Button
                    variant="primary"
                    className={styles.actionButton}
                  >
                    Go to Schedule
                  </Button>
                </Card>
              </a>
            </Link>
            <Link href="/patients/view" passHref legacyBehavior>
              <a className={styles.actionCardLink}>
                <Card title="View Patients" className={styles.actionCard}>
                  <p>Search and view existing patient records.</p>
                  <Button
                    variant="secondary"
                    className={styles.actionButton}
                  >
                    Go to View Patients
                  </Button>
                </Card>
              </a>
            </Link>
            <Link href="/reports/daily-activity" passHref legacyBehavior>
              <a className={styles.actionCardLink}>
                <Card title="Daily Activity Report" className={styles.actionCard}>
                  <p>View today's key statistics and activities.</p>
                  <Button
                    variant="secondary"
                    className={styles.actionButton}
                  >
                    Go to Reports
                  </Button>
                </Card>
              </a>
            </Link>
          </div>
        </section>

        <section className={styles.systemStats}>
          <h2 className={styles.sectionTitle}>System Overview</h2>
          <div className={styles.statsGrid}>
            <Card title="Active Patients" className={styles.statCard}>
              <p className={styles.statValue}>{activePatients}</p>
            </Card>
            <Card title="Appointments Today" className={styles.statCard}>
              <p className={styles.statValue}>{appointmentsToday}</p>
            </Card>
            <Card title="Available Doctors" className={styles.statCard}>
              <p className={styles.statValue}>{availableDoctors}</p>
            </Card>
            <Card title="Pending Lab Results" className={styles.statCard}>
              <p className={styles.statValue}>{pendingLabResults}</p>
              {/* Placeholder - Fetch dynamically later */}
            </Card>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} HOSYS - Hospital Management System.
          All rights reserved.
        </p>
        <p>Version 1.0.0</p>
      </footer>
    </div>
  );
}
