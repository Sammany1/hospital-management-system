'use client';
import React, { useState, useEffect } from 'react';
import { Card, Select, Button, Input } from '../../../components/ui';
import styles from './page.module.css';

// Mock data - replace with API calls
const mockReportData = {
  paymentSummary: [
    { method: 'Card', totalAmount: 5500, count: 50 },
    { method: 'Cash', totalAmount: 1200, count: 20 },
    { method: 'Insurance', totalAmount: 12500, count: 30 },
  ],
  refundSummary: [
    { reason: 'Overcharge', totalAmount: 300, count: 5 },
    { reason: 'Service Not Rendered', totalAmount: 150, count: 2 },
  ],
  outstandingBills: [
    { patientId: 'P001', patientName: 'John Doe', amountDue: 250, dueDate: '2025-06-15' },
    { patientId: 'P002', patientName: 'Jane Smith', amountDue: 120, dueDate: '2025-06-20' },
  ]
};

export default function BillingReportsPage() {
  const [reportType, setReportType] = useState('paymentSummary');
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0,10),
    to: new Date().toISOString().slice(0,10),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const fetchReportData = async () => {
    setIsLoading(true);
    setError(null);
    setReportData(null);
    console.log(`Fetching report: ${reportType} from ${dateRange.from} to ${dateRange.to}`);
    // TODO: Replace with actual API call
    // Example: /api/billing/reports?type=${reportType}&from=${dateRange.from}&to=${dateRange.to}
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Based on reportType, you would fetch different data structures
      if (reportType === 'paymentSummary') {
        setReportData({ type: 'paymentSummary', data: mockReportData.paymentSummary });
      } else if (reportType === 'refundSummary') {
        setReportData({ type: 'refundSummary', data: mockReportData.refundSummary });
      } else if (reportType === 'outstandingBills') {
        setReportData({ type: 'outstandingBills', data: mockReportData.outstandingBills });
      } else {
        setReportData(null);
      }
    } catch (err) {
      console.error("Error fetching report data:", err);
      setError('Failed to load report data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on initial load or when report type/date changes
  useEffect(() => {
    fetchReportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType, dateRange.from, dateRange.to]);

  const reportOptions = [
    { value: 'paymentSummary', label: 'Payment Summary by Method' },
    { value: 'refundSummary', label: 'Refund Summary by Reason' },
    { value: 'outstandingBills', label: 'Outstanding Patient Bills' },
    // Add more report types here, e.g., revenue by department, insurance claim status, etc.
  ];

  const renderReportContent = () => {
    if (isLoading) return <p className={styles.loading}>Loading report...</p>;
    if (error) return <p className={styles.errorText}>{error}</p>;
    if (!reportData) return <p>Select a report type and date range to view data.</p>;

    switch (reportData.type) {
      case 'paymentSummary':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Payment Method</th>
                <th>Total Amount ($)</th>
                <th>Number of Transactions</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.method}</td>
                  <td>{item.totalAmount.toFixed(2)}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'refundSummary':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Refund Reason</th>
                <th>Total Amount ($)</th>
                <th>Number of Refunds</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.reason}</td>
                  <td>{item.totalAmount.toFixed(2)}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'outstandingBills':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Amount Due ($)</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.patientId}</td>
                  <td>{item.patientName}</td>
                  <td>{item.amountDue.toFixed(2)}</td>
                  <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <p>Report type not recognized or data not available.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Billing Reports">
        <div className={styles.filtersContainer}>
          <Select
            label="Report Type"
            name="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            {reportOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <Input 
            label="From Date"
            type="date" 
            name="from" 
            value={dateRange.from} 
            onChange={handleDateChange} 
          />
          <Input 
            label="To Date"
            type="date" 
            name="to" 
            value={dateRange.to} 
            onChange={handleDateChange} 
          />
          {/* <Button onClick={fetchReportData} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Report'}
          </Button> */}
          {/* Button removed as useEffect handles regeneration */}
        </div>

        <div className={styles.reportContentContainer}>
          {renderReportContent()}
        </div>
      </Card>
    </div>
  );
}
