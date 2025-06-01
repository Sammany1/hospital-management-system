'use client';
import React, { useState } from 'react';
import { Input, Button, Card } from '../../../components/ui';
import styles from './page.module.css';

export default function ScheduleTreatmentPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    treatmentId: '',
    scheduledDate: '',
    notes: '',
    // Corresponds to 'treatmentSchedule' and 'treatment_assignment'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Scheduling Treatment:', formData);
    // TODO: API call to /api/treatments/schedule
    alert('Schedule Treatment functionality to be implemented.');
  };

  return (
    <div className={styles.container}>
      <Card title="Schedule Treatment for Patient">
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} />
          <Input name="treatmentId" placeholder="Treatment ID" value={formData.treatmentId} onChange={handleChange} />
          <Input name="scheduledDate" type="datetime-local" placeholder="Scheduled Date" value={formData.scheduledDate} onChange={handleChange} />
          <Input name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
          <Button type="submit">Schedule Treatment</Button>
        </form>
      </Card>
    </div>
  );
}
