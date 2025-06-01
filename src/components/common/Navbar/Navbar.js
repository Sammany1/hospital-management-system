"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname
import styles from './Navbar.module.css';
import Image from 'next/image'; // Import Image for the logo

const Navbar = () => {
  const [dbStatus, setDbStatus] = useState({ status: 'Checking...', message: '', errorDetails: null });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/stats/database-status')
      .then(async res => {
        if (!res.ok) {
          // Try to parse error response if it's JSON, otherwise use status text
          let errorData = { message: `API request failed: ${res.status} ${res.statusText}` };
          try {
            const errorJson = await res.json();
            errorData = { 
              message: errorJson.message || `API request failed: ${res.status} ${res.statusText}`,
              errorDetails: errorJson.errorDetails || null
            };
          } catch (e) {
            // If response is not JSON, use the generic message
          }
          // Ensure status is set to Offline for any HTTP error
          setDbStatus({ status: 'Offline', ...errorData }); 
          return; // Stop further processing
        }
        return res.json();
      })
      .then(data => {
        if (data) { // Check if data is not undefined (which happens if res.ok was false)
          setDbStatus(data);
        }
      })
      .catch(networkError => {
        // Catch network errors or errors from .json() parsing if res.ok was true but content was bad
        console.error("Navbar DB Status Fetch Error:", networkError);
        setDbStatus({ 
          status: 'Offline', 
          message: 'Failed to connect to status API or parse response.',
          errorDetails: { message: networkError.message }
        });
      });
  }, []);

  const handleGoBack = () => {
    // Add more specific cases as needed, e.g., for billing, appointments add pages

    // Default behavior: Navigate to the parent path or dashboard
    if (pathname === '/') {
      return; // Already at dashboard
    }
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length <= 1) {
      router.push('/'); // Go to dashboard if it's a top-level page
    } else {
      const parentPath = '/' + segments.slice(0, -1).join('/');
      router.push(parentPath);
    }
  };

  const canGoBack = pathname !== '/'; // Disable button on the dashboard page

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/hospital-logo.svg" // Using the existing hospital logo
            alt="HOSYS Logo"
            width={40} // Adjust size as needed for the navbar
            height={40}
            priority
            className={styles.logoImage}
          />
          <span className={styles.logoText}>HOSYS</span>
        </Link>
        {canGoBack && (
          <button onClick={handleGoBack} className={styles.backButton} title="Go to previous page">
            &#x2190; {/* Left arrow HTML entity */}
          </button>
        )}
      </div>
      <div className={styles.navbarRight}>
        <div className={`${styles.dbStatus} ${dbStatus.status === 'Online' ? styles.dbOnline : styles.dbOffline}`}>
          Status: {dbStatus.status}
          {dbStatus.status === 'Offline' && dbStatus.message && (
            <span className={styles.dbStatusTooltip}>
              {dbStatus.message}
              {dbStatus.errorDetails?.message ? ` (Details: ${dbStatus.errorDetails.message})` : ''}
              {dbStatus.errorDetails?.code ? ` (Code: ${dbStatus.errorDetails.code})` : ''}
            </span>
          )}
        </div>
        {/* Add other nav items here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;
