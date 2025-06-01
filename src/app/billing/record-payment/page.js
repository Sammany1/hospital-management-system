'use client';
import React, { useState } from 'react';
import { Input, Button, Card } from '../../../components/ui';
import styles from './page.module.css';

export default function RecordPaymentPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentId: '',
    amount: '',
    paymentMethod: 'Card', // Card, Cash, Insurance
    transactionDate: new Date().toISOString().slice(0,10),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Recording Payment:', formData);
    // TODO: API call to /api/billing/record-payment
    alert('Record Payment functionality to be implemented.');
  };

  return (
    <div className={styles.container}>
      <Card title="Record Patient Payment">
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} />
          <Input name="appointmentId" placeholder="Appointment ID (Optional)" value={formData.appointmentId} onChange={handleChange} />
          <Input name="amount" type="number" placeholder="Amount Paid" value={formData.amount} onChange={handleChange} />
          {/* Consider a select for paymentMethod */}
          <Input name="paymentMethod" placeholder="Payment Method" value={formData.paymentMethod} onChange={handleChange} />
          <Input name="transactionDate" type="date" placeholder="Transaction Date" value={formData.transactionDate} onChange={handleChange} />
          <Button type="submit">Record Payment</Button>
        </form>
      </Card>
    </div>
  );
}
