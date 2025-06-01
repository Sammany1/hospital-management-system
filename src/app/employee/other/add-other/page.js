// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/employee/other/add-other/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Select from '@/components/ui/Select/Select';
import { Card } from '@/components/ui'; // Assuming Card is in @/components/ui

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

export default function AddOtherEmployeePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    phoneNumber: '',
    dateOfBirth: '',
    salary: '',
    start_working_date: '',
    email: '',
    hiring_date: '',
    street_name: '',
    city: '',
    country: '',
    state_or_province: '',
    department_id: '',
    employee_type: '', // e.g., 'Receptionist', 'Security', 'Admin', 'Other'
    // Role-specific fields - shown conditionally
    language_spoken: '', // For Receptionist
    clearance_level: '', // For Security
    badge_number: ''     // For Security
  });
  const [formErrors, setFormErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employeeTypes = [
    { value: '', label: 'Select Role' },
    { value: 'Receptionist', label: 'Receptionist' },
    { value: 'Security', label: 'Security' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Other', label: 'Other' }
  ];

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
    const requiredGeneralFields = [
        'firstName', 'lastName', 'sex', 'dateOfBirth', 'phoneNumber', 'salary', 'email', 
        'start_working_date', 'hiring_date', 'street_name', 'city', 'country', 'department_id', 'employee_type'
    ];

    if (requiredGeneralFields.includes(name) && !value) {
      error = 'This field is required.';
    }

    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'street_name':
      case 'city':
      case 'country':
      case 'sex':
      case 'department_id':
      case 'employee_type':
        if (!value) error = 'This field is required.';
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
      // Role-specific validations
      case 'clearance_level':
        if (formData.employee_type === 'Security' && !value) error = 'Clearance level is required for Security employee.';
        break;
      case 'badge_number':
        if (formData.employee_type === 'Security' && !value) error = 'Badge number is required for Security employee.';
        break;
      // language_spoken is optional for Receptionist
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
      // Skip validation for optional fields if they are empty and not conditionally required
      if (key === 'state_or_province' && !formData[key]) return;
      if (key === 'language_spoken' && formData.employee_type !== 'Receptionist' && !formData[key]) return;
      if (key === 'language_spoken' && formData.employee_type === 'Receptionist' && !formData[key]) { /* optional */ return;}

      if (key === 'clearance_level' && formData.employee_type !== 'Security') return;
      if (key === 'badge_number' && formData.employee_type !== 'Security') return;

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
        // Ensure dates are in YYYY-MM-DD format for the API
        dateOfBirth: formData.dateOfBirth ? formatDateForInput(new Date(formData.dateOfBirth)) : null,
        start_working_date: formData.start_working_date ? formatDateForInput(new Date(formData.start_working_date)) : null,
        hiring_date: formData.hiring_date ? formatDateForInput(new Date(formData.hiring_date)) : null,
        // Send role-specific fields only if the role is selected
        language_spoken: formData.employee_type === 'Receptionist' ? (formData.language_spoken || null) : undefined,
        clearance_level: formData.employee_type === 'Security' ? (formData.clearance_level || null) : undefined,
        badge_number: formData.employee_type === 'Security' ? (formData.badge_number || null) : undefined,
      };
      
      // Remove undefined role-specific fields before sending
      Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

      const response = await fetch('/api/employee/other/add-other', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add employee member');
      }
      
      alert('Employee member added successfully!');
      setFormData({ // Reset form
        firstName: '', lastName: '', sex: '', phoneNumber: '', dateOfBirth: '',
        salary: '', start_working_date: '', email: '', hiring_date: '',
        street_name: '', city: '', country: '', state_or_province: '',
        department_id: '', employee_type: '',
        language_spoken: '', clearance_level: '', badge_number: ''
      });
      setFormErrors({});
      router.push('/employee/other/view'); 
    } catch (error) {
      console.error('Form submission error:', error);
      setFormErrors(prev => ({ ...prev, submit: error.message || 'An unexpected error occurred.' }));
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  let isFormInvalid = Object.values(formErrors).some(error => !!error) || 
                        isSubmitting ||
                        !formData.firstName || 
                        !formData.lastName || 
                        !formData.sex ||
                        !formData.dateOfBirth ||
                        !formData.phoneNumber ||
                        !formData.salary ||
                        !formData.email || 
                        !formData.start_working_date ||
                        !formData.hiring_date ||
                        !formData.street_name || 
                        !formData.city || 
                        !formData.country ||
                        !formData.department_id ||
                        !formData.employee_type;

  if (formData.employee_type === 'Security') {
    isFormInvalid = isFormInvalid || !formData.clearance_level || !formData.badge_number;
  }

  return (
    <div className={styles.formContainer}> 
      <Card title="Add New Employee Member (Other Roles)">
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

          {/* Role Selection */}
          <div className={styles.formField}>
            <label htmlFor="employee_type" className={styles.label}>Role/Employee Type*</label>
            <select name="employee_type" id="employee_type" value={formData.employee_type} onChange={handleChange} className={styles.input}>
              {employeeTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            {formErrors.employee_type && <p className={styles.errorMessage}>{formErrors.employee_type}</p>}
          </div>

          {/* Conditional fields based on employee_type */} 
          {formData.employee_type === 'Receptionist' && (
            <div className={styles.formField}>
              <label htmlFor="language_spoken" className={styles.label}>Languages Spoken (comma-separated)</label>
              <Input name="language_spoken" id="language_spoken" value={formData.language_spoken} onChange={handleChange} placeholder="e.g., English, Spanish" />
              {formErrors.language_spoken && <p className={styles.errorMessage}>{formErrors.language_spoken}</p>}
            </div>
          )}

          {formData.employee_type === 'Security' && (
            <>
              <div className={styles.formField}>
                <label htmlFor="clearance_level" className={styles.label}>Clearance Level*</label>
                <Input name="clearance_level" id="clearance_level" value={formData.clearance_level} onChange={handleChange} placeholder="Enter clearance level" />
                {formErrors.clearance_level && <p className={styles.errorMessage}>{formErrors.clearance_level}</p>}
              </div>
              <div className={styles.formField}>
                <label htmlFor="badge_number" className={styles.label}>Badge Number*</label>
                <Input name="badge_number" id="badge_number" value={formData.badge_number} onChange={handleChange} placeholder="Enter badge number" />
                {formErrors.badge_number && <p className={styles.errorMessage}>{formErrors.badge_number}</p>}
              </div>
            </>
          )}
          
          {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
          
          <Button type="submit" variant="primary" disabled={isFormInvalid}>
            {isSubmitting ? 'Adding Employee Member...' : 'Add Employee Member'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
