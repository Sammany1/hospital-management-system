'use client';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import styles from './page.module.css';

export default function BillingPage() {
  return (
    <div className={styles.container}>
      <Card title="Billing Management">
        <p>Oversee all financial transactions, including payments, refunds, and reporting.</p>
        <div className={styles.buttonGroup}>
            <Link href="/billing/view-payments" passHref legacyBehavior><Button variant="primary">View Payments</Button></Link>
            <Link href="/billing/record-payment" passHref legacyBehavior><Button variant="secondary">Record New Payment</Button></Link>
            <Link href="/billing/process-refund" passHref legacyBehavior><Button variant="secondary">Process Refund</Button></Link>
            <Link href="/billing/reports" passHref legacyBehavior><Button variant="secondary">View Reports</Button></Link>
        </div>
      </Card>
    </div>
  );
}
