'use client';

import React, { useState } from 'react';
import { Input, Button, Card } from '@/components/ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function DefineTreatmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: '',
    category: '',
    specilization_required: '', // Matches schema spelling
    treatment_minutes: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setError('');
    const { name, cost, treatment_minutes } = formData;
    if (!name) {
      setError('Treatment name is required.');
      return false;
    }
    if (cost && (isNaN(parseFloat(cost)) || parseFloat(cost) < 0)) {
      setError('Cost must be a non-negative number.');
      return false;
    }
    if (treatment_minutes && (isNaN(parseInt(treatment_minutes)) || parseInt(treatment_minutes) <= 0)) {
      setError('Treatment minutes must be a positive integer.');
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
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        cost: formData.cost ? parseFloat(formData.cost) : null,
        treatment_minutes: formData.treatment_minutes ? parseInt(formData.treatment_minutes) : null,
      };

      const response = await fetch('/api/treatments/define', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(`Treatment defined successfully! ID: ${result.treatment_id}`);
        setFormData({
          name: '',
          description: '',
          cost: '',
          category: '',
          specilization_required: '',
          treatment_minutes: '',
        });
        // Optionally redirect: router.push('/treatments');
      } else {
        setError(result.message || 'Failed to define treatment.');
      }
    } catch (err) {
      console.error('Failed to submit form:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Define New Treatment">
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Treatment Name <span className={styles.required}>*</span></label>
            <Input
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Standard Consultation"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <Input
              name="description"
              id="description"
              type="textarea" // Assuming Input component can handle textarea or use a dedicated TextArea component
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the treatment"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cost" className={styles.label}>Cost ($)</label>
            <Input
              name="cost"
              id="cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
              placeholder="e.g., 150.00"
              step="0.01"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>Category</label>
            <Input
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., General Medicine, Surgery, Therapy"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="specilization_required" className={styles.label}>Specialization Required</label>
            <Input
              name="specilization_required"
              id="specilization_required"
              value={formData.specilization_required}
              onChange={handleChange}
              placeholder="e.g., Cardiology, Pediatrics, None"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="treatment_minutes" className={styles.label}>Treatment Duration (minutes)</label>
            <Input
              name="treatment_minutes"
              id="treatment_minutes"
              type="number"
              value={formData.treatment_minutes}
              onChange={handleChange}
              placeholder="e.g., 60"
            />
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Defining...' : 'Define Treatment'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
