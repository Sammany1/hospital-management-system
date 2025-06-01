'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from '@/components/ui'; // Adjusted path, removed Select
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function AddAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientId: '',
    dEmployeeId: '',
    appointmentDateTime: '',
    duration: '30',
  });

  // Search states
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [searchedPatients, setSearchedPatients] = useState([]);
  const [searchedDoctors, setSearchedDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Loading states for search
  const [patientSearchLoading, setPatientSearchLoading] = useState(false);
  const [doctorSearchLoading, setDoctorSearchLoading] = useState(false);

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePatientSearch = async () => {
    if (!patientSearchTerm.trim()) {
      setSearchedPatients([]);
      return;
    }
    setPatientSearchLoading(true);
    setError('');
    try {
      // Assuming your API can filter by a search term (e.g., name, email, or ID)
      const response = await fetch(`/api/patients?search=${encodeURIComponent(patientSearchTerm)}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to search patients');
      }
      const data = await response.json();
      setSearchedPatients(data);
      if (data.length === 0) {
        setError('No patients found matching your search.');
      }
    } catch (err) {
      setError(err.message);
      setSearchedPatients([]);
    } finally {
      setPatientSearchLoading(false);
    }
  };

  const handleDoctorSearch = async () => {
    if (!doctorSearchTerm.trim()) {
      setSearchedDoctors([]);
      return;
    }
    setDoctorSearchLoading(true);
    setError('');
    try {
      // Assuming your API can filter by a search term and role=doctor
      const response = await fetch(`/api/employee?role=doctor&search=${encodeURIComponent(doctorSearchTerm)}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to search doctors');
      }
      const data = await response.json();
      setSearchedDoctors(data);
      if (data.length === 0) {
        setError('No doctors found matching your search.');
      }
    } catch (err) {
      setError(err.message);
      setSearchedDoctors([]);
    } finally {
      setDoctorSearchLoading(false);
    }
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({ ...prev, patientId: patient.patient_id }));
    setPatientSearchTerm(`${patient.first_name} ${patient.last_name} (ID: ${patient.patient_id}, Email: ${patient.email})`);
    setSearchedPatients([]); // Clear search results
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData(prev => ({ ...prev, dEmployeeId: doctor.employee_id }));
    setDoctorSearchTerm(`Dr. ${doctor.first_name} ${doctor.last_name} (ID: ${doctor.employee_id}, Specialization: ${doctor.specialization})`);
    setSearchedDoctors([]); // Clear search results
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setError('');
    if (!selectedPatient || !selectedDoctor || !formData.appointmentDateTime || !formData.duration) {
      setError('Please select a patient, a doctor, and specify the appointment date/time and duration.');
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
            patient_id: selectedPatient.patient_id, // Use ID from selected patient
            D_employee_id: selectedDoctor.employee_id, // Use ID from selected doctor
            date_time: formData.appointmentDateTime,
            duration: parseInt(formData.duration),
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(`Appointment scheduled successfully! Appointment ID: ${result.appointment_id}`);
        setFormData({ patientId: '', dEmployeeId: '', appointmentDateTime: '', duration: '30' });
        setSelectedPatient(null);
        setSelectedDoctor(null);
        setPatientSearchTerm('');
        setDoctorSearchTerm('');
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
        
        {/* Patient Search Section */}
        <div className={styles.formGroup}>
          <label htmlFor="patientSearch" className={styles.label}>Search Patient (Name, Email, or ID):</label>
          <div className={styles.searchContainer}>
            <Input
              type="text"
              id="patientSearch"
              name="patientSearch"
              value={patientSearchTerm}
              onChange={(e) => setPatientSearchTerm(e.target.value)}
              placeholder="Enter patient name, email, or ID"
              className={styles.searchInput}
            />
            <Button onClick={handlePatientSearch} disabled={patientSearchLoading} className={styles.searchButton}>
              {patientSearchLoading ? 'Searching...' : 'Search Patient'}
            </Button>
          </div>
          {searchedPatients.length > 0 && (
            <ul className={styles.searchResults}>
              {searchedPatients.map(p => (
                <li key={p.patient_id} onClick={() => handleSelectPatient(p)} className={styles.searchResultItem}>
                  {p.first_name} {p.last_name} (ID: {p.patient_id}, Email: {p.email})
                </li>
              ))}
            </ul>
          )}
          {selectedPatient && <p className={styles.selectedItem}>Selected Patient: {selectedPatient.first_name} {selectedPatient.last_name} (ID: {selectedPatient.patient_id})</p>}
        </div>

        {/* Doctor Search Section */}
        <div className={styles.formGroup}>
          <label htmlFor="doctorSearch" className={styles.label}>Search Doctor (Name, Specialization, or ID):</label>
          <div className={styles.searchContainer}>
            <Input
              type="text"
              id="doctorSearch"
              name="doctorSearch"
              value={doctorSearchTerm}
              onChange={(e) => setDoctorSearchTerm(e.target.value)}
              placeholder="Enter doctor name, specialization, or ID"
              className={styles.searchInput}
            />
            <Button onClick={handleDoctorSearch} disabled={doctorSearchLoading} className={styles.searchButton}>
              {doctorSearchLoading ? 'Searching...' : 'Search Doctor'}
            </Button>
          </div>
          {searchedDoctors.length > 0 && (
            <ul className={styles.searchResults}>
              {searchedDoctors.map(d => (
                <li key={d.employee_id} onClick={() => handleSelectDoctor(d)} className={styles.searchResultItem}>
                  Dr. {d.first_name} {d.last_name} (ID: {d.employee_id}, Spec: {d.specialization || 'N/A'})
                </li>
              ))}
            </ul>
          )}
          {selectedDoctor && <p className={styles.selectedItem}>Selected Doctor: Dr. {selectedDoctor.first_name} {selectedDoctor.last_name} (ID: {selectedDoctor.employee_id})</p>}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Patient and Doctor Selects are replaced by search and select UI */}
          {/* Hidden inputs or direct use of selectedPatient.patient_id and selectedDoctor.employee_id in handleSubmit */}
          
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
          
          <Button type="submit" variant="primary" className={styles.submitButton}>Schedule Appointment</Button>
        </form>
      </Card>
    </div>
  );
}
