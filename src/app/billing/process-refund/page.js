'use client';
import React, { useState } from 'react';
import { Input, Button, Card } from '../../../components/ui';
import styles from './page.module.css';

export default function ProcessRefundPage() {
  const [formData, setFormData] = useState({
    paymentId: '', // Original payment ID
    refundAmount: '',
    reason: '',
    refundDate: new Date().toISOString().slice(0,10),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Processing Refund:', formData);
    // TODO: API call to /api/billing/process-refund
    alert('Process Refund functionality to be implemented.');
  };

  return (
    <div className={styles.container}>
      <Card title="Process Refund">
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input name="paymentId" placeholder="Original Payment ID" value={formData.paymentId} onChange={handleChange} />
          <Input name="refundAmount" type="number" placeholder="Refund Amount" value={formData.refundAmount} onChange={handleChange} />
          <Input name="reason" placeholder="Reason for Refund" value={formData.reason} onChange={handleChange} />
          <Input name="refundDate" type="date" placeholder="Refund Date" value={formData.refundDate} onChange={handleChange} />
          <Button type="submit">Process Refund</Button>
        </form>
      </Card>
    </div>
  );
}
