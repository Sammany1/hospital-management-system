'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button } from '../../../components/ui'; // Added Input and Button
import styles from './page.module.css';

export default function ViewPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState(''); // To trigger fetch only on explicit search

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      const query = apiSearchTerm ? `?search=${encodeURIComponent(apiSearchTerm)}` : '';
      const response = await fetch(`/api/patients${query}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.status}`);
      }
      const data = await response.json();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, [apiSearchTerm]); // Dependency on apiSearchTerm

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setApiSearchTerm(searchTerm); // Trigger fetch by updating apiSearchTerm
  };

  // Sort patients by patient_id before rendering
  const sortedPatients = [...patients].sort((a, b) => a.patient_id - b.patient_id);

  return (
    <div className={styles.container}>
      <Card title="View Patients">
        <div className={styles.searchContainer}>
          <Input 
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <Button onClick={handleSearchSubmit} variant="primary" className={styles.searchButton}>
            Search
          </Button>
        </div>

        {loading && <p>Loading patients...</p>}
        {error && <p className={styles.errorText}>Error: {error}</p>}
        {!loading && !error && sortedPatients.length === 0 && (
          <p>No patients found{apiSearchTerm ? ` for "${apiSearchTerm}"` : "."}</p>
        )}
        {!loading && !error && sortedPatients.length > 0 && (
          <table className={styles.patientTable}>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Sex</th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients.map((patient) => (
                <tr key={patient.patient_id}>
                  <td>{patient.patient_id}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone_number}</td>
                  <td>{patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : 'N/A'}</td>
                  <td>{patient.sex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
