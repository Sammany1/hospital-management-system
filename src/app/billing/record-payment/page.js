'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Select } from '../../../components/ui'; // Added Select
import styles from './page.module.css';

export default function RecordPaymentPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentId: '', // Optional
    amount: '',
    paymentMethod: 'Card', // Default value
    transactionDate: new Date().toISOString().slice(0, 10),
    transactionReference: '', // Optional
    status: 'Completed', // Default value
    processedByStaffId: '', // Optional, could be pre-filled if user is logged in staff
  });
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]); // Optional: for linking payment to an appointment
  const [staff, setStaff] = useState([]); // For processedByStaffId
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch patients for dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients');
        if (!response.ok) throw new Error('Failed to fetch patients');
        const data = await response.json();
        setPatients(data || []); // Adjusted: API returns an array directly
      } catch (err) {
        console.error("Error fetching patients:", err);
        // setError('Could not load patients. Please try again.');
      }
    };
    fetchPatients();
  }, []);

  // Fetch appointments (optional - can be filtered by selected patientId)
  useEffect(() => {
    if (formData.patientId) {
      const fetchAppointments = async () => {
        try {
          const response = await fetch(`/api/appointments/list?patient_id=${formData.patientId}`); // Adjusted API endpoint and param name
          if (!response.ok) throw new Error('Failed to fetch appointments for the selected patient');
          const data = await response.json();
          setAppointments(data.appointments || []); // API returns { appointments: [...] }
        } catch (err) {
          console.error("Error fetching appointments:", err);
          // setError('Could not load appointments for the patient.');
        }
      };
      fetchAppointments();
    } else {
      setAppointments([]); // Clear appointments if no patient is selected
    }
  }, [formData.patientId]);

  // Fetch staff for dropdown (e.g., receptionists, billing staff)
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        // Using 'Receptionist' as an example role. Adjust if needed.
        const response = await fetch('/api/employee?role=Receptionist'); 
        if (!response.ok) throw new Error('Failed to fetch staff');
        const data = await response.json();
        setStaff(data || []); // Adjusted: API returns an array directly
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
    setError(null); // Clear error on change
    setSuccessMessage(''); // Clear success message on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    if (!formData.patientId || !formData.amount || !formData.paymentMethod || !formData.transactionDate) {
        setError('Please fill in all required fields: Patient, Amount, Payment Method, and Date.');
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/billing/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            amount: parseFloat(formData.amount) // Ensure amount is a number
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to record payment');
      }

      setSuccessMessage(`Payment recorded successfully! Payment ID: ${result.paymentId}`);
      // Optionally reset form or parts of it
      setFormData({
        ...formData, // Keep some fields like date or staff if preferred
        patientId: '',
        appointmentId: '',
        amount: '',
        transactionReference: '',
        // paymentMethod: 'Card', // Keep or reset
        // status: 'Completed' // Keep or reset
      });

    } catch (err) {
      console.error('Error recording payment:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethodOptions = [
    { value: 'Card', label: 'Card' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Online Transfer', label: 'Online Transfer' },
  ];

  const paymentStatusOptions = [
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Failed', label: 'Failed' },
  ];

  return (
    <div className={styles.container}>
      <Card title="Record Patient Payment">
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorText}>{error}</p>}
          {successMessage && <p className={styles.successText}>{successMessage}</p>}

          <Select
            label="Patient"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.patient_id} value={patient.patient_id}>
                {patient.patient_id} - {patient.first_name} {patient.last_name}
              </option>
            ))}
          </Select>

          <Select
            label="Appointment (Optional)"
            name="appointmentId"
            value={formData.appointmentId}
            onChange={handleChange}
            disabled={!formData.patientId || appointments.length === 0} // Disable if no patient or no appointments
          >
            <option value="">Select Appointment (if applicable)</option>
            {appointments.map(appointment => (
              <option key={appointment.appointment_id} value={appointment.appointment_id}>
                {appointment.appointment_id} - {appointment.appointment_date} ({appointment.appointment_type})
              </option>
            ))}
          </Select>

          <Input 
            label="Amount Paid"
            name="amount" 
            type="number" 
            placeholder="e.g., 150.00" 
            value={formData.amount} 
            onChange={handleChange} 
            required 
            min="0.01" 
            step="0.01"
          />

          <Select
            label="Payment Method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            {paymentMethodOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>

          <Input 
            label="Transaction Date"
            name="transactionDate" 
            type="date" 
            value={formData.transactionDate} 
            onChange={handleChange} 
            required 
          />

          <Input 
            label="Transaction Reference (Optional)"
            name="transactionReference" 
            placeholder="e.g., CHK12345, INV98765"
            value={formData.transactionReference} 
            onChange={handleChange} 
          />

          <Select
            label="Payment Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {paymentStatusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          
          <Select
            label="Processed By (Optional)"
            name="processedByStaffId"
            value={formData.processedByStaffId}
            onChange={handleChange}
          >
            <option value="">Select Staff Member</option>
            {staff.map(member => (
              // Using employee_id from employee API endpoint
              <option key={member.employee_id} value={member.employee_id}>
                {member.employee_id} - {member.first_name} {member.last_name}
              </option>
            ))}
          </Select>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Record Payment'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
