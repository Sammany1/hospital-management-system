import React from 'react';
import Navbar from '../common/Navbar/Navbar'; // Corrected path
import Sidebar from '../common/Sidebar/Sidebar'; // Corrected path
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
