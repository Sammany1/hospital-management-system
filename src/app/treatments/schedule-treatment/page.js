'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from '../../../components/ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function ScheduleTreatmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    scheduledDate: '',
    notes: '',
    status: 'Scheduled', // Default status as per schema requirement
  });

  // Search states
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [treatmentTypeSearchTerm, setTreatmentTypeSearchTerm] = useState('');
  const [doctorSearchTerm, setDoctorSearchTerm] = useState(''); // For prescribing doctor
  
  const [searchedPatients, setSearchedPatients] = useState([]);
  const [allTreatmentTypes, setAllTreatmentTypes] = useState([]);
  const [filteredTreatmentTypesDisplay, setFilteredTreatmentTypesDisplay] = useState([]); // For displaying search results
  const [searchedDoctors, setSearchedDoctors] = useState([]); // For prescribing doctor
  
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTreatmentType, setSelectedTreatmentType] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // For prescribing doctor

  // Loading states
  const [patientSearchLoading, setPatientSearchLoading] = useState(false);
  const [treatmentTypesLoading, setTreatmentTypesLoading] = useState(false);
  const [treatmentSearchLoading, setTreatmentSearchLoading] = useState(false); // New loading state for treatment search button
  const [doctorSearchLoading, setDoctorSearchLoading] = useState(false); // For prescribing doctor

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all treatment types on component mount
  useEffect(() => {
    const fetchTreatmentTypes = async () => {
      setTreatmentTypesLoading(true);
      setError('');
      try {
        const response = await fetch('/api/treatments/define');
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to fetch treatment types');
        }
        const data = await response.json();
        setAllTreatmentTypes(data);
      } catch (err) {
        setError(err.message);
        setAllTreatmentTypes([]);
      } finally {
        setTreatmentTypesLoading(false);
      }
    };
    fetchTreatmentTypes();
  }, []);

  const handleTreatmentTypeSearch = () => { // New handler for button click
    setTreatmentSearchLoading(true);
    setError('');
    // Filter logic remains client-side for now, but simulates a search action
    const filtered = treatmentTypeSearchTerm
      ? allTreatmentTypes.filter(tt =>
          tt.name.toLowerCase().includes(treatmentTypeSearchTerm.toLowerCase()) ||
          (tt.description && tt.description.toLowerCase().includes(treatmentTypeSearchTerm.toLowerCase()))
        )
      : allTreatmentTypes;
    
    setFilteredTreatmentTypesDisplay(filtered);

    if (filtered.length === 0 && treatmentTypeSearchTerm) {
      setError('No treatment types found matching your search.');
    }
    setTreatmentSearchLoading(false);
  };

  const handlePatientSearch = async () => {
    if (!patientSearchTerm.trim()) {
      setSearchedPatients([]);
      return;
    }
    setPatientSearchLoading(true);
    setError('');
    try {
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
    setPatientSearchTerm(`${patient.first_name} ${patient.last_name} (ID: ${patient.patient_id}, Email: ${patient.email})`);
    setSearchedPatients([]);
  };

  const handleSelectTreatmentType = (treatmentType) => {
    setSelectedTreatmentType(treatmentType);
    setTreatmentTypeSearchTerm(`${treatmentType.name} (ID: ${treatmentType.treatment_id})`);
    setFilteredTreatmentTypesDisplay([]); // Clear results after selection
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorSearchTerm(`Dr. ${doctor.first_name} ${doctor.last_name} (ID: ${doctor.employee_id}, Spec: ${doctor.specialization || 'N/A'})`);
    setSearchedDoctors([]);
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
    if (!selectedPatient || !selectedTreatmentType || !selectedDoctor || !formData.scheduledDate || !formData.status) {
      setError('Please select a patient, a treatment type, a prescribing doctor, specify the scheduled date, and ensure status is set.');
      return false;
    }
    if (!selectedTreatmentType.cost && selectedTreatmentType.cost !== 0) {
        setError('Selected treatment type does not have a valid cost. Please check treatment definition.');
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
      // Construct payload for /api/treatments/assignments (or your actual endpoint for scheduling/assigning treatment)
      const payload = {
        patientId: selectedPatient.patient_id,
        treatmentId: selectedTreatmentType.treatment_id,
        doctorId: selectedDoctor.employee_id,
        status: formData.status,
        // cost is derived by the backend from treatmentId, so not needed here directly for assignment creation
        scheduledDateTime: new Date(formData.scheduledDate).toISOString(), // Ensure ISO format
        notes: formData.notes || null,
      };

      const response = await fetch('/api/treatments/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(`Treatment scheduled successfully! Assignment ID: ${result.assignmentId || 'N/A'}`);
        setFormData({ scheduledDate: '', notes: '', status: 'Scheduled' });
        setSelectedPatient(null);
        setSelectedTreatmentType(null);
        setSelectedDoctor(null);
        setPatientSearchTerm('');
        setTreatmentTypeSearchTerm('');
        setDoctorSearchTerm('');
        // Optionally redirect: router.push('/treatments/view'); 
      } else {
        setError(result.message || 'Failed to schedule treatment.');
      }
    } catch (error) {
      console.error('Failed to submit treatment schedule form:', error);
      setError('An error occurred while scheduling the treatment. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Schedule Treatment for Patient">
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        {/* Patient Search Section */}
        <div className={styles.formGroup}>
          <label htmlFor="patientSearch" className={styles.label}>Search Patient (Name, Email, or ID):</label>
          <div className={styles.searchContainer}>
            <Input
              type="text"
              id="patientSearch"
              value={patientSearchTerm}
              onChange={(e) => setPatientSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()}
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

        {/* Treatment Type Search/Select Section */}
        <div className={styles.formGroup}>
          <label htmlFor="treatmentTypeSearch" className={styles.label}>Search & Select Treatment Type:</label>
          <div className={styles.searchContainer}> {/* Added searchContainer for layout consistency */}
            <Input
              type="text"
              id="treatmentTypeSearch"
              value={treatmentTypeSearchTerm}
              onChange={(e) => {
                setTreatmentTypeSearchTerm(e.target.value);
                // Optionally, clear previous search results when typing starts again
                if (filteredTreatmentTypesDisplay.length > 0) {
                  setFilteredTreatmentTypesDisplay([]);
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleTreatmentTypeSearch()}
              placeholder="Search treatment by name or description"
              className={styles.searchInput}
              disabled={treatmentTypesLoading} // Keep disabled while initial list loads
            />
            <Button onClick={handleTreatmentTypeSearch} disabled={treatmentTypesLoading || treatmentSearchLoading} className={styles.searchButton}>
              {treatmentSearchLoading ? 'Searching...' : 'Search Treatment'}
            </Button>
          </div>
          {treatmentTypesLoading && <p>Loading initial treatment types...</p>}
          {filteredTreatmentTypesDisplay.length > 0 && (
            <ul className={styles.searchResults}>
              {filteredTreatmentTypesDisplay.map(tt => (
                <li key={tt.treatment_id} onClick={() => handleSelectTreatmentType(tt)} className={styles.searchResultItem}>
                  {tt.name} (Cost: ${tt.cost !== undefined ? tt.cost : 'N/A'}) - {tt.description ? tt.description.substring(0,50) : ''}...
                </li>
              ))}
            </ul>
          )}
          {/* Adjusted instruction text */}
          {!treatmentTypeSearchTerm && allTreatmentTypes.length > 0 && !selectedTreatmentType && filteredTreatmentTypesDisplay.length === 0 && (
             <p className={styles.instruction}>Enter search term and click "Search Treatment".</p>
          )}
          {selectedTreatmentType && <p className={styles.selectedItem}>Selected Treatment: {selectedTreatmentType.name} (ID: {selectedTreatmentType.treatment_id}, Cost: ${selectedTreatmentType.cost !== undefined ? selectedTreatmentType.cost : 'N/A'})</p>}
        </div>
        
        {/* Prescribing Doctor Search Section */}
        <div className={styles.formGroup}>
          <label htmlFor="doctorSearch" className={styles.label}>Search Prescribing Doctor (Name, Specialization, or ID):</label>
          <div className={styles.searchContainer}>
            <Input
              type="text"
              id="doctorSearch"
              value={doctorSearchTerm}
              onChange={(e) => setDoctorSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDoctorSearch()}
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
          <div className={styles.formGroup}>
            <label htmlFor="scheduledDate" className={styles.label}>Scheduled Date & Time:</label>
            <Input
              name="scheduledDate"
              id="scheduledDate"
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>Status:</label>
            <Input
              name="status"
              id="status"
              type="text"
              value={formData.status}
              onChange={handleChange} // Or make readOnly if always 'Scheduled' initially
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>Notes (Optional):</label>
            <Input
              name="notes"
              id="notes"
              type="text"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any relevant notes for the treatment assignment"
            />
          </div>
          
          <Button type="submit" variant="primary" className={styles.submitButton} disabled={!selectedPatient || !selectedTreatmentType || !selectedDoctor}>
            Schedule Treatment
          </Button>
        </form>
      </Card>
    </div>
  );
}
