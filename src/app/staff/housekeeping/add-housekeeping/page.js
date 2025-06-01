// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/staff/housekeeping/add-housekeeping/page.js
'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Card } from '@/components/ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

// Helper for date formatting (YYYY-MM-DD) - Can be moved to a utils file
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

export default function AddHousekeepingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    phoneNumber: '',
    dateOfBirth: '',
    salary: '',
    start_working_date: '', // Renamed from startWorkingDate to match API
    email: '',
    hiring_date: '', // Renamed from hiringDate to match API
    street_name: '',
    city: '',
    country: '',
    state_or_province: '',
    department_id: '', // Renamed from departmentId to match API
    area_assigned: '', // Specific to housekeeping
  });
  const [formErrors, setFormErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setFormErrors(prev => ({...prev, department_id: `Failed to load departments: ${error.message}`}));
      }
    };
    fetchDepartments();
  }, []);

  const validateField = (name, value) => {
    let error = '';
    // Required fields based on DOCS.md for employee and new address fields
    // sex, date_of_birth, phone_number, salary, email, start_working_date, hiring_date are required for employee
    // street_name, city, country are required for postalcode
    // department_id is required for employee
    // area_assigned is optional for housekeeping_staff (can be null in employee_area_assigned or not present)
    const requiredFields = [
        'firstName', 'lastName', 'sex', 'dateOfBirth', 'phoneNumber', 'salary', 'email', 
        'start_working_date', 'hiring_date', 'street_name', 'city', 'country', 'department_id'
    ];

    if (requiredFields.includes(name) && !value) {
      error = 'This field is required.';
    }

    switch (name) {
      // Using field names as in formData state
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
      case 'salary':
        if (!value) error = 'Salary is required.';
        else if (value && isNaN(Number(value))) error = 'Salary must be a number.';
        else if (value && Number(value) < 0) error = 'Salary cannot be negative.';
        break;
      case 'dateOfBirth':
      case 'start_working_date':
      case 'hiring_date':
        if (!value) error = `${name.replace(/_/g, ' ')} is required.`;
        else if (value && isNaN(new Date(value).getTime())) error = 'Invalid date format. Use YYYY-MM-DD.';
        break;
      case 'sex':
        if (!value) error = 'Sex is required.';
        break;
      case 'department_id':
        if (!value) error = 'Department is required.';
        break;
      case 'street_name':
        if (!value) error = 'Street name is required.';
        break;
      case 'city':
        if (!value) error = 'City is required.';
        break;
      case 'country':
        if (!value) error = 'Country is required.';
        break;
      // area_assigned is optional, no specific validation here unless rules change
      // state_or_province is optional
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
      // Skip validation for optional fields if they are empty
      if (key === 'state_or_province' && !formData[key]) return;
      if (key === 'area_assigned' && !formData[key]) return;

      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form validation failed", formErrors);
      alert("Please correct the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        employee_type: 'Housekeeping', // Set employee_type for the API
        // Ensure dates are in YYYY-MM-DD format for the API
        dateOfBirth: formData.dateOfBirth ? formatDateForInput(new Date(formData.dateOfBirth)) : null,
        start_working_date: formData.start_working_date ? formatDateForInput(new Date(formData.start_working_date)) : null,
        hiring_date: formData.hiring_date ? formatDateForInput(new Date(formData.hiring_date)) : null,
        // area_assigned can be sent as is, or null if empty
        area_assigned: formData.area_assigned || null,
      };
      
      const response = await fetch('/api/staff/housekeeping/add-housekeeping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add housekeeping staff');
      }
      
      alert('Housekeeping staff added successfully!');
      setFormData({ // Reset form
        firstName: '', lastName: '', sex: '', phoneNumber: '', dateOfBirth: '',
        salary: '', start_working_date: '', email: '', hiring_date: '',
        street_name: '', city: '', country: '', state_or_province: '',
        department_id: '', area_assigned: '',
      });
      setFormErrors({});
      router.push('/staff/housekeeping'); 
    } catch (error) {
      console.error('Form submission error:', error);
      setFormErrors(prev => ({ ...prev, submit: error.message || 'An unexpected error occurred.' }));
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check required fields for submit button disabling
  const isFormInvalid = Object.values(formErrors).some(error => !!error) || 
                        isSubmitting ||
                        !formData.firstName || 
                        !formData.lastName || 
                        !formData.sex ||
                        !formData.dateOfBirth ||
                        !formData.phoneNumber ||
                        !formData.salary ||
                        !formData.email || // Email is required by employee table
                        !formData.start_working_date ||
                        !formData.hiring_date ||
                        !formData.street_name || 
                        !formData.city || 
                        !formData.country ||
                        !formData.department_id;


  return (
    <div className={styles.formContainer}> 
      <Card title="Add New Housekeeping Staff">
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* General Employee Fields */}
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

          <div className={styles.formField}>
            <label htmlFor="salary" className={styles.label}>Salary*</label>
            <Input name="salary" id="salary" type="number" step="0.01" value={formData.salary} onChange={handleChange} placeholder="Enter salary" />
            {formErrors.salary && <p className={styles.errorMessage}>{formErrors.salary}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="hiring_date" className={styles.label}>Hiring Date*</label>
            <Input name="hiring_date" id="hiring_date" type="date" value={formData.hiring_date} onChange={handleChange} />
            {formErrors.hiring_date && <p className={styles.errorMessage}>{formErrors.hiring_date}</p>}
          </div>
          
          <div className={styles.formField}>
            <label htmlFor="start_working_date" className={styles.label}>Start Working Date*</label>
            <Input name="start_working_date" id="start_working_date" type="date" value={formData.start_working_date} onChange={handleChange} />
            {formErrors.start_working_date && <p className={styles.errorMessage}>{formErrors.start_working_date}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="department_id" className={styles.label}>Department*</label>
            <select name="department_id" id="department_id" value={formData.department_id} onChange={handleChange} className={styles.input}>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>{dept.name}</option>
              ))}
            </select>
            {formErrors.department_id && <p className={styles.errorMessage}>{formErrors.department_id}</p>}
          </div>
          
          {/* Address Fields */}
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
          
          {/* Housekeeping Specific Fields */}
          <div className={styles.formField}>
            <label htmlFor="area_assigned" className={styles.label}>Area Assigned</label>
            <Input name="area_assigned" id="area_assigned" value={formData.area_assigned} onChange={handleChange} placeholder="Enter area assigned (e.g., Floor 1, Wing A)" />
            {formErrors.area_assigned && <p className={styles.errorMessage}>{formErrors.area_assigned}</p>}
          </div>
          
          {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
          
          <Button type="submit" variant="primary" disabled={isFormInvalid}>
            {isSubmitting ? 'Adding Staff...' : 'Add Housekeeping Staff'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
