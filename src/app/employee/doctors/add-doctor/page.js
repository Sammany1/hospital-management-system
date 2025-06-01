'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Card } from '@/components/ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation'; 

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

export default function AddDoctorPage() {
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
    // employee_type is fixed to 'Doctor' for this form
    // Removed postalCode, added individual address fields
    street_name: '',
    city: '',
    country: '',
    state_or_province: '',
    departmentId: '',
    specialization: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch departments for dropdown
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
        setFormErrors(prev => ({...prev, departmentId: `Failed to load departments: ${error.message}`}));
      }
    };
    fetchDepartments();
  }, []);

  const validateField = (name, value) => {
    let error = '';
    // Add new required address fields to this check
    if (!value && ['firstName', 'lastName', 'departmentId', 'specialization', 'street_name', 'city', 'country'].includes(name)) {
        // Basic required check, specific messages are below or can be added
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
        if (value && !/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid.';
        break;
      case 'phoneNumber':
        if (value && !/^[0-9\s\-\(\)]+$/.test(value)) error = 'Phone number is invalid.';
        break;
      case 'salary':
        if (value && isNaN(Number(value))) error = 'Salary must be a number.';
        else if (value && Number(value) < 0) error = 'Salary cannot be negative.';
        break;
      case 'dateOfBirth':
      case 'startWorkingDate':
      case 'hiringDate':
        if (value && isNaN(new Date(value).getTime())) error = 'Invalid date format.';
        break;
      case 'departmentId':
        if (!value) error = 'Department is required.';
        break;
      case 'specialization':
        if (!value) error = 'Specialization is required.';
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
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    // Specific check for employee_type being 'Doctor' is implicit
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Re-validate all fields on submit
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
        employee_type: 'Doctor', 
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : null,
        startWorkingDate: formData.startWorkingDate ? new Date(formData.startWorkingDate).toISOString().split('T')[0] : null,
        hiringDate: formData.hiringDate ? new Date(formData.hiringDate).toISOString().split('T')[0] : null,
        // postalCode is removed, individual address fields are already in formData
      };
      const response = await fetch('/api/employee/doctors/add-doctor', { // Updated API path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add doctor');
      }
      
      alert('Doctor added successfully!');
      // Reset form data including new address fields
      setFormData({
        firstName: '',
        lastName: '',
        sex: '',
        phoneNumber: '',
        dateOfBirth: '',
        salary: '',
        startWorkingDate: '',
        email: '',
        hiringDate: '',
        street_name: '',
        city: '',
        country: '',
        state_or_province: '',
        departmentId: '',
        specialization: '',
      });
      setFormErrors({});
      router.push('/employee/doctors/view'); 
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
                        !formData.departmentId || 
                        !formData.specialization ||
                        !formData.street_name || 
                        !formData.city || 
                        !formData.country;

  return (
    <div className={styles.formContainer}> 
      <Card title="Add New Doctor">
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

          <div className={styles.formField}>
            <label htmlFor="salary" className={styles.label}>Salary*</label>
            <Input name="salary" id="salary" type="number" step="0.01" value={formData.salary} onChange={handleChange} placeholder="Enter salary" />
            {formErrors.salary && <p className={styles.errorMessage}>{formErrors.salary}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="hiringDate" className={styles.label}>Hiring Date*</label>
            <Input name="hiringDate" id="hiringDate" type="date" value={formData.hiringDate} onChange={handleChange} />
            {formErrors.hiringDate && <p className={styles.errorMessage}>{formErrors.hiringDate}</p>}
          </div>
          
          <div className={styles.formField}>
            <label htmlFor="startWorkingDate" className={styles.label}>Start Working Date*</label>
            <Input name="startWorkingDate" id="startWorkingDate" type="date" value={formData.startWorkingDate} onChange={handleChange} />
            {formErrors.startWorkingDate && <p className={styles.errorMessage}>{formErrors.startWorkingDate}</p>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="departmentId" className={styles.label}>Department*</label>
            <select name="departmentId" id="departmentId" value={formData.departmentId} onChange={handleChange} className={styles.input}>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>{dept.name}</option>
              ))}
            </select>
            {formErrors.departmentId && <p className={styles.errorMessage}>{formErrors.departmentId}</p>}
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

          <div className={styles.formField}>
            <label htmlFor="specialization" className={styles.label}>Specialization*</label>
            <Input name="specialization" id="specialization" value={formData.specialization} onChange={handleChange} placeholder="Enter specialization" />
            {formErrors.specialization && <p className={styles.errorMessage}>{formErrors.specialization}</p>}
          </div>
          
          {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
          
          <Button type="submit" variant="primary" disabled={isFormInvalid}>
            {isSubmitting ? 'Adding Doctor...' : 'Add Doctor'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

// Note: For a production app, consider more robust validation libraries like Zod or Yup.
// The postalCode field is simplified. In a real app, you might have separate address fields
// or a search/select component for postal codes if they are pre-populated.
// The department dropdown is currently using placeholder data.
// You'll need to implement an API endpoint (/api/departments) to fetch actual departments.
