'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Select } from '../../../components/ui';
import styles from './page.module.css';

const formatDate = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export default function ViewPaymentsPage() {
  const router = useRouter();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination and Sorting
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [sortBy, setSortBy] = useState('payment_date');
  const [sortOrder, setSortOrder] = useState('DESC');

  // Filters
  const [patientNameFilter, setPatientNameFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
    });
    if (patientNameFilter) params.append('patient_name', patientNameFilter);
    if (paymentMethodFilter) params.append('payment_method', paymentMethodFilter);

    try {
      const response = await fetch(`/api/billing/payments?${params.toString()}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPayments(data.payments || []);
      setTotalPages(data.totalPages || 1);
      setTotalPayments(data.totalPayments || 0);
    } catch (err) {
      setError(err.message);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, sortOrder, patientNameFilter, paymentMethodFilter]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPayments();
  };

  const handleClearFilters = () => {
    setPatientNameFilter('');
    setPaymentMethodFilter('');
    setPage(1);
    // Fetch will be triggered by state updates if fetchPayments is in dependency array of a useEffect
  };

  return (
    <div className={styles.container}>
      <Card title="View All Payments">
        <form onSubmit={handleFilterSubmit} className={styles.filterForm}>
          <Input
            type="text"
            placeholder="Filter by Patient Name"
            value={patientNameFilter}
            onChange={(e) => setPatientNameFilter(e.target.value)}
          />
          <Select
            value={paymentMethodFilter}
            onChange={(e) => setPaymentMethodFilter(e.target.value)}
          >
            <option value="">All Payment Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Insurance">Insurance</option>
            <option value="Other">Other</option>
          </Select>
          <Button type="submit" variant="primary">Filter</Button>
          <Button type="button" variant="secondary" onClick={handleClearFilters}>Clear</Button>
        </form>

        {loading && <p>Loading payments...</p>}
        {error && <p className={styles.errorText}>Error: {error}</p>}
        
        <div className={styles.tableContainer}>
          <table className={styles.paymentsTable}>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Method</th>
                <th>Status</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {payments && payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.payment_id}>
                    <td>{payment.patient_name}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>{formatDate(payment.payment_date)}</td>
                    <td>{payment.payment_method}</td>
                    <td>{payment.payment_status}</td>
                    <td>{payment.transaction_reference || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.paginationControls}>
            <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
            <span>Page {page} of {totalPages}</span>
            <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
        </div>
      </Card>
    </div>
  );
}
