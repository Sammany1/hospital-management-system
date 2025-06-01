'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Select } from '../../../../components/ui';
import styles from './page.module.css';

export default function AddSecurityPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    sex: '',
    salary: '',
    hiringDate: '',
    startWorkingDate: '',
    departmentId: '', // Assuming security might be in a general dept or specific one
    postalCodeId: '', // Or individual address fields
    clearanceLevel: '',
    badgeNumber: '',
    // Add address fields if not using postalCodeId directly
    street: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      ...formData,
      employee_type: 'Security',
      department_id: parseInt(formData.departmentId, 10) || null,
      salary: parseFloat(formData.salary) || 0,
      // Ensure postalCodeId is an int or handle address components separately
      postal_code_id: parseInt(formData.postalCodeId, 10) || null, 
    };

    try {
      const response = await fetch('/api/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to add security personnel' }));
        throw new Error(errorData.message || 'Failed to add security personnel');
      }

      setSuccess(true);
      // Optionally reset form or redirect
      // router.push('/employee/security/view'); 
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        sex: '',
        salary: '',
        hiringDate: '',
        startWorkingDate: '',
        departmentId: '',
        postalCodeId: '',
        clearanceLevel: '',
        badgeNumber: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch departments for Select dropdown (optional, can be hardcoded or fetched)
  // const [departments, setDepartments] = useState([]);
  // useEffect(() => { fetch departments... }, []);

  return (
    <div className={styles.container}>
      <Card title="Add New Security Personnel">
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorText}>{error}</p>}
          {success && <p className={styles.successText}>Security personnel added successfully!</p>}

          <div className={styles.grid}>
            <Input name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required />
            <Input name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required />
            <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
            <Input name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            <Input name="dateOfBirth" label="Date of Birth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
            <Select name="sex" label="Sex" value={formData.sex} onChange={handleChange} options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}, {value: 'Other', label: 'Other'}]} required />
            <Input name="salary" label="Salary" type="number" value={formData.salary} onChange={handleChange} required />
            <Input name="hiringDate" label="Hiring Date" type="date" value={formData.hiringDate} onChange={handleChange} required />
            <Input name="startWorkingDate" label="Start Working Date" type="date" value={formData.startWorkingDate} onChange={handleChange} required />
            
            <Input name="clearanceLevel" label="Clearance Level" value={formData.clearanceLevel} onChange={handleChange} />
            <Input name="badgeNumber" label="Badge Number" value={formData.badgeNumber} onChange={handleChange} />

            {/* Simplified Address Input for now, assuming postalCodeId might be complex to get dynamically */}
            <Input name="street" label="Street" value={formData.street} onChange={handleChange} />
            <Input name="city" label="City" value={formData.city} onChange={handleChange} />
            <Input name="state" label="State/Province" value={formData.state} onChange={handleChange} />
            <Input name="country" label="Country" value={formData.country} onChange={handleChange} />
            <Input name="postal_code" label="Postal Code" value={formData.postal_code} onChange={handleChange} />
            
            <Input name="departmentId" label="Department ID" type="number" value={formData.departmentId} onChange={handleChange} placeholder="e.g., 1 for General" />
            {/* <Input name="postalCodeId" label="Postal Code ID (Optional)" type="number" value={formData.postalCodeId} onChange={handleChange} /> */}
          </div>

          <Button type="submit" variant="primary" disabled={loading} className={styles.submitButton}>
            {loading ? 'Adding...' : 'Add Security Personnel'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
