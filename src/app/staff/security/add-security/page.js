'use client';

import { useState } from 'react';
import { Input, Button, Card } from '@/components/ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export default function AddSecurityPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    phoneNumber: '',
    email: '',
    hiringDate: '',
    shift: '',
    clearanceLevel: '',
    badgeNumber: '',
    street_name: '',
    city: '',
    country: '',
    state_or_province: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    if (!value && ['firstName', 'lastName', 'email', 'phoneNumber', 'shift', 'clearanceLevel', 'badgeNumber', 'street_name', 'city', 'country'].includes(name)) {
      error = 'This field is required.';
    }
    switch (name) {
      case 'email':
        if (value && !/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid.';
        break;
      case 'phoneNumber':
        if (value && !/^[0-9\s\-\(\)]+$/.test(value)) error = 'Phone number is invalid.';
        break;
      case 'hiringDate':
        if (value && isNaN(new Date(value).getTime())) error = 'Invalid date format.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = {};
    let formIsValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        currentErrors[key] = error;
        formIsValid = false;
      }
    });
    setFormErrors(currentErrors);

    if (!formIsValid) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        employee_type: 'Security',
        hiringDate: formData.hiringDate ? new Date(formData.hiringDate).toISOString().split('T')[0] : null,
      };
      const response = await fetch('/api/staff/security/add-security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add security staff');
      }

      alert('Security staff added successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        sex: '',
        phoneNumber: '',
        email: '',
        hiringDate: '',
        shift: '',
        clearanceLevel: '',
        badgeNumber: '',
        street_name: '',
        city: '',
        country: '',
        state_or_province: '',
      });
      setFormErrors({});
      router.push('/staff/security/view');
    } catch (error) {
      setFormErrors(prev => ({ ...prev, submit: error.message || 'An unexpected error occurred.' }));
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormInvalid = Object.values(formErrors).some(error => !!error) ||
    isSubmitting ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phoneNumber ||
    !formData.shift ||
    !formData.clearanceLevel ||
    !formData.badgeNumber ||
    !formData.street_name ||
    !formData.city ||
    !formData.country;

  return (
    <div className={styles.formContainer}>
      <Card title="Add Security Staff">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="firstName" className={styles.label}>First Name*</label>
            <Input name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" />
            {formErrors.firstName && <p className={styles.errorMessage}>{formErrors.firstName}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="lastName" className={styles.label}>Last Name*</label>
            <Input name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" />
            {formErrors.lastName && <p className={styles.errorMessage}>{formErrors.lastName}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="email" className={styles.label}>Email*</label>
            <Input name="email" id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" />
            {formErrors.email && <p className={styles.errorMessage}>{formErrors.email}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="phoneNumber" className={styles.label}>Phone Number*</label>
            <Input name="phoneNumber" id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number" />
            {formErrors.phoneNumber && <p className={styles.errorMessage}>{formErrors.phoneNumber}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="sex" className={styles.label}>Sex</label>
            <select name="sex" id="sex" value={formData.sex} onChange={handleChange} className={styles.input}>
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.sex && <p className={styles.errorMessage}>{formErrors.sex}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="hiringDate" className={styles.label}>Hiring Date</label>
            <Input name="hiringDate" id="hiringDate" type="date" value={formData.hiringDate} onChange={handleChange} />
            {formErrors.hiringDate && <p className={styles.errorMessage}>{formErrors.hiringDate}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="shift" className={styles.label}>Shift*</label>
            <select name="shift" id="shift" value={formData.shift} onChange={handleChange} className={styles.input}>
              <option value="">Select shift</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
            {formErrors.shift && <p className={styles.errorMessage}>{formErrors.shift}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="clearanceLevel" className={styles.label}>Clearance Level*</label>
            <Input name="clearanceLevel" id="clearanceLevel" value={formData.clearanceLevel} onChange={handleChange} placeholder="Enter clearance level" />
            {formErrors.clearanceLevel && <p className={styles.errorMessage}>{formErrors.clearanceLevel}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="badgeNumber" className={styles.label}>Badge Number*</label>
            <Input name="badgeNumber" id="badgeNumber" value={formData.badgeNumber} onChange={handleChange} placeholder="Enter badge number" />
            {formErrors.badgeNumber && <p className={styles.errorMessage}>{formErrors.badgeNumber}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="street_name" className={styles.label}>Street Name*</label>
            <Input name="street_name" id="street_name" value={formData.street_name} onChange={handleChange} placeholder="Enter street name" />
            {formErrors.street_name && <p className={styles.errorMessage}>{formErrors.street_name}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="city" className={styles.label}>City*</label>
            <Input name="city" id="city" value={formData.city} onChange={handleChange} placeholder="Enter city" />
            {formErrors.city && <p className={styles.errorMessage}>{formErrors.city}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="country" className={styles.label}>Country*</label>
            <Input name="country" id="country" value={formData.country} onChange={handleChange} placeholder="Enter country" />
            {formErrors.country && <p className={styles.errorMessage}>{formErrors.country}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="state_or_province" className={styles.label}>State/Province</label>
            <Input name="state_or_province" id="state_or_province" value={formData.state_or_province} onChange={handleChange} placeholder="Enter state or province (optional)" />
            {formErrors.state_or_province && <p className={styles.errorMessage}>{formErrors.state_or_province}</p>}
          </div>
          {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
          <Button type="submit" variant="primary" disabled={isFormInvalid}>
            {isSubmitting ? 'Adding Security...' : 'Add Security'}
          </Button>
        </form>
      </Card>
    </div>
  );
}