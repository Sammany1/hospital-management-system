'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '../../components/ui'; 
import styles from './page.module.css';

export default function BillingPage() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Billing Management</h1>
      <p className={styles.description}>Manage patient payments, process refunds, and view financial reports.</p>
      <div className={styles.cardsContainer}>
        <Card 
          title="Record Payment"
          className={styles.navCard}
          onClick={() => navigateTo('/billing/record-payment')}
        >
          <p>Log new patient payments, update payment statuses, and manage payment details. Link payments to appointments or services.</p>
          <Button variant="primary" className={styles.navButton} onClick={(e) => { e.stopPropagation(); navigateTo('/billing/record-payment'); }}>
            Record Payment
          </Button>
        </Card>

        <Card 
          title="Process Refund"
          className={styles.navCard}
          onClick={() => navigateTo('/billing/process-refund')}
        >
          <p>Handle patient refunds for cancelled appointments or overpayments. Track refund status and reasons.</p>
          <Button variant="primary" className={styles.navButton} onClick={(e) => { e.stopPropagation(); navigateTo('/billing/process-refund'); }}>
            Process Refund
          </Button>
        </Card>

        <Card 
          title="Billing Reports"
          className={styles.navCard}
          onClick={() => navigateTo('/billing/reports')}
        >
          <p>Generate and view comprehensive financial reports, including payment histories, outstanding balances, and refund summaries.</p>
          <Button variant="primary" className={styles.navButton} onClick={(e) => { e.stopPropagation(); navigateTo('/billing/reports'); }}>
            View Reports
          </Button>
        </Card>
      </div>
    </div>
  );
}
