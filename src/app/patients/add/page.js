'use client';

import { useState } from 'react';
import { Input, Button, Card } from '@/components/ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function AddPatientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '', 
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    // Removed postal_code_id, added individual address fields
    street_name: '',
    city: '',
    country: '',
    state_or_province: '', 
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    // Ensure required fields are not empty
    if (!value && ['firstName', 'lastName', 'sex', 'dateOfBirth', 'phoneNumber', 'email', 'street_name', 'city', 'country'].includes(name)) {
      error = 'This field is required.';
    }

    switch (name) {
      case 'firstName':
        if (!value) error = 'First name is required.';
        break;
      case 'lastName':
        if (!value) error = 'Last name is required.';
        break;
      case 'email':
        if (!value) error = 'Email is required.';
        else if (value && !/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid.';
        break;
      case 'phoneNumber':
        if (!value) error = 'Phone number is required.';
        else if (value && !/^[0-9\s\-\(\)]+$/.test(value)) error = 'Phone number is invalid.';
        break;
      case 'dateOfBirth':
        if (!value) error = 'Date of birth is required.';
        else if (value && isNaN(new Date(value).getTime())) error = 'Invalid date format.';
        break;
      case 'sex':
        if (!value) error = 'Sex is required.';
        break;
      // Add validation for new address fields
      case 'street_name':
        if (!value) error = 'Street name is required.';
        break;
      case 'city':
        if (!value) error = 'City is required.';
        break;
      case 'country':
        if (!value) error = 'Country is required.';
        break;
      // state_or_province is optional, so no specific validation here beyond general checks if any
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
    // Re-validate all fields on submit, including new required fields
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

    if (!formIsValid) {
      console.log("Form validation failed", currentErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : null,
        // No longer sending postal_code_id directly, API will handle it
      };
      
      const response = await fetch('/api/patients/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add patient');
      }
      
      alert('Patient added successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        // Reset new address fields
        street_name: '',
        city: '',
        country: '',
        state_or_province: '',
      });
      setFormErrors({});
      // router.push('/patients/view'); 

    } catch (error) {
      console.error('Form submission error:', error);
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
                        !formData.sex ||
                        !formData.dateOfBirth ||
                        !formData.phoneNumber ||
                        !formData.email ||
                        !formData.street_name ||
                        !formData.city ||
                        !formData.country;


  return (
    <div className={styles.formContainer}>
      <Card title="Add New Patient">
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
            <label htmlFor="sex" className={styles.label}>Sex*</label>
            <select name="sex" id="sex" value={formData.sex} onChange={handleChange} className={styles.input}>
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.sex && <p className={styles.errorMessage}>{formErrors.sex}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="dateOfBirth" className={styles.label}>Date of Birth*</label>
            <Input name="dateOfBirth" id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            {formErrors.dateOfBirth && <p className={styles.errorMessage}>{formErrors.dateOfBirth}</p>}
          </div>

          {/* New address fields based on postalcode table */}
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
          {/* End of new address fields */}

          {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
          
          <Button type="submit" variant="primary" disabled={isFormInvalid}>
            {isSubmitting ? 'Adding Patient...' : 'Add Patient'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
