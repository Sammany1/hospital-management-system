'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Select } from '@/components/ui'; // Adjusted path, added Select
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function AddAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientId: '',
    dEmployeeId: '', // Corrected to D_employee_id for doctor
    appointmentDateTime: '', // Changed from appointmentDate to match schema 'date_time'
    duration: '30', // Default duration, e.g., 30 minutes
    // payment_id is usually handled post-appointment or by billing, not at scheduling typically
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch patients and doctors for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Patients
        const patientRes = await fetch('/api/patients'); // Assuming an API endpoint to get patients
        if (!patientRes.ok) throw new Error('Failed to fetch patients');
        const patientData = await patientRes.json();
        setPatients(patientData.map(p => ({ value: p.patient_id, label: `${p.first_name} ${p.last_name} (ID: ${p.patient_id})` })));

        // Fetch Doctors
        const doctorRes = await fetch('/api/staff/doctors'); // Assuming an API endpoint to get doctors
        if (!doctorRes.ok) throw new Error('Failed to fetch doctors');
        const doctorData = await doctorRes.json();
        setDoctors(doctorData.map(d => ({ value: d.employee_id, label: `Dr. ${d.first_name} ${d.last_name} (${d.specialization})` })));

      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setError('');
    if (!formData.patientId || !formData.dEmployeeId || !formData.appointmentDateTime || !formData.duration) {
      setError('All fields are required.');
      return false;
    }
    if (isNaN(parseInt(formData.duration)) || parseInt(formData.duration) <= 0) {
        setError('Duration must be a positive number.');
        return false;
    }
    // Basic validation for datetime-local format (YYYY-MM-DDTHH:MM)
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(formData.appointmentDateTime)) {
        setError('Invalid date/time format. Please use the provided picker.');
        return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/api/appointments/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            patient_id: formData.patientId,
            D_employee_id: formData.dEmployeeId,
            date_time: formData.appointmentDateTime,
            duration: parseInt(formData.duration),
            // payment_id can be omitted or set to null initially
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(`Appointment scheduled successfully! Appointment ID: ${result.appointment_id}`);
        setFormData({ patientId: '', dEmployeeId: '', appointmentDateTime: '', duration: '30' });
        // Optionally redirect: router.push('/appointments/view');
      } else {
        setError(result.message || 'Failed to schedule appointment');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Schedule New Appointment">
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="patientId" className={styles.label}>Patient:</label>
            <Select
              name="patientId"
              id="patientId"
              value={formData.patientId}
              onChange={handleChange}
              options={[{ value: '', label: 'Select Patient' }, ...patients]}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dEmployeeId" className={styles.label}>Doctor:</label>
            <Select
              name="dEmployeeId"
              id="dEmployeeId"
              value={formData.dEmployeeId}
              onChange={handleChange}
              options={[{ value: '', label: 'Select Doctor' }, ...doctors]}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="appointmentDateTime" className={styles.label}>Appointment Date & Time:</label>
            <Input
              name="appointmentDateTime"
              id="appointmentDateTime"
              type="datetime-local"
              value={formData.appointmentDateTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="duration" className={styles.label}>Duration (minutes):</label>
            <Input
              name="duration"
              id="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 30"
              required
            />
          </div>
          
          {/* Reason for appointment was not in the DB schema for `appointment` table, 
              it might be part of `treatment_assignment_note` or a similar table if linked to a treatment.
              If it's a general note for the appointment itself, the schema would need an update or it's stored elsewhere.
              For now, removing it from this form to align with `appointment` table.
          */}

          <Button type="submit" variant="primary" className={styles.submitButton}>Schedule Appointment</Button>
        </form>
      </Card>
    </div>
  );
}
