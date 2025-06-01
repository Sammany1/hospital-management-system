import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import styles from './page.module.css';

export default function BillingPage() {
  return (
    <div className={styles.container}>
      <Card title="Billing & Payments">
        <p>Manage patient billing, record payments, and process refunds.</p>
        <div className={styles.buttonGroup}>
          <Link href="/billing/record-payment" passHref legacyBehavior><Button variant="primary">Record Payment</Button></Link>
          <Link href="/billing/process-refund" passHref legacyBehavior><Button>Process Refund</Button></Link>
          <Link href="/billing/reports" passHref legacyBehavior><Button variant="secondary">Billing Reports</Button></Link>
        </div>
      </Card>
    </div>
  );
}
