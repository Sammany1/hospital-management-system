'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Select, Textarea } from '../../../components/ui'; // Added Textarea
import styles from './page.module.css';

export default function ProcessRefundPage() {
  const [formData, setFormData] = useState({
    paymentId: '', // To link to the original payment
    refundAmount: '',
    refundReason: '',
    refundDate: new Date().toISOString().slice(0, 10),
    processedByStaffId: '', // Optional
  });

  // TODO: Consider fetching a list of payments that are eligible for refunds
  // For now, paymentId will be a manual input.
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch staff for dropdown
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('/api/employee?role=Billing'); // Assuming a 'Billing' role or similar
        if (!response.ok) throw new Error('Failed to fetch staff');
        const data = await response.json();
        setStaff(data || []);
      } catch (err) {
        console.error("Error fetching staff:", err);
        // setError('Could not load staff members.');
      }
    };
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    if (!formData.paymentId || !formData.refundAmount || !formData.refundDate) {
      setError('Please fill in all required fields: Payment ID, Refund Amount, and Refund Date.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/billing/refunds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          refundAmount: parseFloat(formData.refundAmount), // Ensure amount is a number
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to process refund');
      }

      setSuccessMessage(`Refund processed successfully! Refund ID: ${result.refundId}`);
      // Optionally reset form
      setFormData({
        paymentId: '',
        refundAmount: '',
        refundReason: '',
        refundDate: new Date().toISOString().slice(0, 10),
        processedByStaffId: formData.processedByStaffId, // Keep staff if selected
      });

    } catch (err) {
      console.error('Error processing refund:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Process Customer Refund">
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorText}>{error}</p>}
          {successMessage && <p className={styles.successText}>{successMessage}</p>}

          <Input
            label="Original Payment ID"
            name="paymentId"
            placeholder="Enter the ID of the payment to be refunded"
            value={formData.paymentId}
            onChange={handleChange}
            required
          />

          <Input
            label="Refund Amount"
            name="refundAmount"
            type="number"
            placeholder="e.g., 50.00"
            value={formData.refundAmount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />

          <Textarea
            label="Reason for Refund (Optional)"
            name="refundReason"
            placeholder="Enter reason for the refund"
            value={formData.refundReason}
            onChange={handleChange}
            rows={3}
          />

          <Input
            label="Refund Date"
            name="refundDate"
            type="date"
            value={formData.refundDate}
            onChange={handleChange}
            required
          />

          <Select
            label="Processed By (Optional)"
            name="processedByStaffId"
            value={formData.processedByStaffId}
            onChange={handleChange}
          >
            <option value="">Select Staff Member</option>
            {staff.map(member => (
              <option key={member.employee_id} value={member.employee_id}>
                {member.employee_id} - {member.first_name} {member.last_name}
              </option>
            ))}
          </Select>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Process Refund'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
