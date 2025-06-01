import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import styles from './page.module.css';

export default function FacilitiesPage() {
  return (
    <div className={styles.container}>
      <Card title="Facility Management">
        <p>Manage hospital rooms, equipment, and other physical resources.</p>
        <div className={styles.buttonGroup}>
          <Link href="/facilities/view-rooms" passHref legacyBehavior><Button variant="primary">View & Manage Rooms</Button></Link>
          <Link href="/facilities/add-room" passHref legacyBehavior><Button variant="secondary">Add New Room</Button></Link>
        </div>
      </Card>
    </div>
  );
}
