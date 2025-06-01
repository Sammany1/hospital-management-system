'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Select } from '../../../../components/ui'; // Assuming Select is in ui/index.js
import styles from './page.module.css';

// Helper for date formatting (YYYY-MM-DD)
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

export default function AddOtherEmployeePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    phoneNumber: '',
    dateOfBirth: '',
    salary: '',
    startWorkingDate: '',
    email: '',
    hiringDate: '',
    street_name: '', // From postalcode table
    city: '',          // From postalcode table
    country: '',       // From postalcode table
    state_or_province: '', // From postalcode table
    departmentId: '',
    employee_type: '', // Field to specify the type of 'other' employee
    // Add any other common fields or role-specific fields if needed later
  });
  const [formErrors, setFormErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch departments for dropdown
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch('/api/departments');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setFormErrors(prev => ({ ...prev, departments: error.message }));
      }
    }
    fetchDepartments();
  }, []);

  const validateField = (name, value) => {
    let error = '';
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'sex', 'phoneNumber', 'dateOfBirth', 
      'salary', 'startWorkingDate', 'email', 'hiringDate', 
      'street_name', 'city', 'country', 'departmentId', 'employee_type'
    ];
    if (requiredFields.includes(name) && !value) {
      error = 'This field is required.';
    }

    // Specific validations
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Email is invalid.';
    }
    if (name === 'phoneNumber' && value && !/^[0-9\s\-\(\)]+$/.test(value)) {
      error = 'Phone number is invalid.';
    }
    if (name === 'salary' && value && (isNaN(parseFloat(value)) || parseFloat(value) <= 0)) {
      error = 'Salary must be a positive number.';
    }
    if ((name === 'hiringDate' || name === 'startWorkingDate' || name === 'dateOfBirth') && value && isNaN(new Date(value).getTime())) {
      error = 'Invalid date format.';
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
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    if (!validateForm()) {
      setSubmitMessage('Please correct the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare payload, ensuring dates are in YYYY-MM-DD format if needed by backend
      const payload = {
        ...formData,
        hiring_date: formData.hiringDate ? formatDateForInput(formData.hiringDate) : null,
        start_working_date: formData.startWorkingDate ? formatDateForInput(formData.startWorkingDate) : null,
        date_of_birth: formData.dateOfBirth ? formatDateForInput(formData.dateOfBirth) : null,
        // The API will handle postal_code_id creation/lookup
        // employee_type is already in formData
      };
      // Remove original date fields if backend expects specific names
      delete payload.hiringDate;
      delete payload.startWorkingDate;
      delete payload.dateOfBirth;

      const response = await fetch('/api/employee', { // Using the generic /api/employee endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to add ${formData.employee_type || 'employee'}`);
      }
      
      setSubmitMessage(`${formData.employee_type || 'Employee'} added successfully! Employee ID: ${responseData.employeeId}`);
      // Optionally reset form or redirect
      // router.push('/employee/other/view'); 
      setFormData({
        firstName: '', lastName: '', sex: '', phoneNumber: '', dateOfBirth: '',
        salary: '', startWorkingDate: '', email: '', hiringDate: '',
        street_name: '', city: '', country: '', state_or_province: '',
        departmentId: '', employee_type: '',
      });
      setFormErrors({});

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage(`Error: ${error.message}`);
      setFormErrors(prev => ({ ...prev, submit: error.message || 'An unexpected error occurred.' }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFormInvalid = Object.values(formErrors).some(error => !!error) || 
                        isSubmitting ||
                        !formData.firstName || 
                        !formData.lastName || 
                        !formData.sex || 
                        !formData.phoneNumber || 
                        !formData.dateOfBirth || 
                        !formData.salary || 
                        !formData.startWorkingDate || 
                        !formData.email || 
                        !formData.hiringDate || 
                        !formData.street_name || 
                        !formData.city || 
                        !formData.country || 
                        !formData.departmentId ||
                        !formData.employee_type;

  return (
    <div className={styles.formContainer}>
      <Card title="Add Other Employee Member">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="employee_type" className={styles.label}>Employee Type*</label>
            <Input 
              name="employee_type" 
              id="employee_type" 
              value={formData.employee_type} 
              onChange={handleChange} 
              placeholder="e.g., Janitor, Admin Assistant, IT Support"
              className={styles.input}
            />
            {formErrors.employee_type && <p className={styles.errorMessage}>{formErrors.employee_type}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="firstName" className={styles.label}>First Name*</label>
            <Input name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" className={styles.input}/>
            {formErrors.firstName && <p className={styles.errorMessage}>{formErrors.firstName}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="lastName" className={styles.label}>Last Name*</label>
            <Input name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" className={styles.input}/>
            {formErrors.lastName && <p className={styles.errorMessage}>{formErrors.lastName}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="sex" className={styles.label}>Sex*</label>
            <Select name="sex" id="sex" value={formData.sex} onChange={handleChange} className={styles.select}>
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            {formErrors.sex && <p className={styles.errorMessage}>{formErrors.sex}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="email" className={styles.label}>Email*</label>
            <Input name="email" id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className={styles.input}/>
            {formErrors.email && <p className={styles.errorMessage}>{formErrors.email}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="phoneNumber" className={styles.label}>Phone Number*</label>
            <Input name="phoneNumber" id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number" className={styles.input}/>
            {formErrors.phoneNumber && <p className={styles.errorMessage}>{formErrors.phoneNumber}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="dateOfBirth" className={styles.label}>Date of Birth*</label>
            <Input name="dateOfBirth" id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} className={styles.input}/>
            {formErrors.dateOfBirth && <p className={styles.errorMessage}>{formErrors.dateOfBirth}</p>}
          </div>
          
          <div className={styles.formField}>
            <label htmlFor="salary" className={styles.label}>Salary*</label>
            <Input name="salary" id="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="Enter salary" className={styles.input}/>
            {formErrors.salary && <p className={styles.errorMessage}>{formErrors.salary}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="hiringDate" className={styles.label}>Hiring Date*</label>
            <Input name="hiringDate" id="hiringDate" type="date" value={formData.hiringDate} onChange={handleChange} className={styles.input}/>
            {formErrors.hiringDate && <p className={styles.errorMessage}>{formErrors.hiringDate}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="startWorkingDate" className={styles.label}>Start Working Date*</label>
            <Input name="startWorkingDate" id="startWorkingDate" type="date" value={formData.startWorkingDate} onChange={handleChange} className={styles.input}/>
            {formErrors.startWorkingDate && <p className={styles.errorMessage}>{formErrors.startWorkingDate}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="departmentId" className={styles.label}>Department*</label>
            <Select name="departmentId" id="departmentId" value={formData.departmentId} onChange={handleChange} className={styles.select}>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>{dept.name}</option>
              ))}
            </Select>
            {formErrors.departmentId && <p className={styles.errorMessage}>{formErrors.departmentId}</p>}
            {formErrors.departments && <p className={styles.errorMessage}>{formErrors.departments}</p>} {/* Error for fetching depts */}
          </div>

          <h3 className={styles.sectionTitle}>Address Details</h3>
          <div className={styles.formField}>
            <label htmlFor="street_name" className={styles.label}>Street Name*</label>
            <Input name="street_name" id="street_name" value={formData.street_name} onChange={handleChange} placeholder="Enter street name" className={styles.input}/>
            {formErrors.street_name && <p className={styles.errorMessage}>{formErrors.street_name}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="city" className={styles.label}>City*</label>
            <Input name="city" id="city" value={formData.city} onChange={handleChange} placeholder="Enter city" className={styles.input}/>
            {formErrors.city && <p className={styles.errorMessage}>{formErrors.city}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="state_or_province" className={styles.label}>State/Province</label>
            <Input name="state_or_province" id="state_or_province" value={formData.state_or_province} onChange={handleChange} placeholder="Enter state or province (optional)" className={styles.input}/>
            {formErrors.state_or_province && <p className={styles.errorMessage}>{formErrors.state_or_province}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="country" className={styles.label}>Country*</label>
            <Input name="country" id="country" value={formData.country} onChange={handleChange} placeholder="Enter country" className={styles.input}/>
            {formErrors.country && <p className={styles.errorMessage}>{formErrors.country}</p>}
          </div>
          
          {submitMessage && <p className={formErrors.submit ? styles.errorMessage : styles.successMessage}>{submitMessage}</p>}
          {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}

          <Button type="submit" variant="primary" disabled={isFormInvalid} className={styles.submitButton}>
            {isSubmitting ? 'Adding Employee...' : 'Add Employee Member'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
