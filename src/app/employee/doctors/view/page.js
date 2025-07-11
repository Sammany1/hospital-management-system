// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/employee/doctors/view/page.js
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button } from '../../../../components/ui';
import styles from './page.module.css';

export default function ViewDoctorsPage() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState('');

  const employeeType = "Doctors";

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('role', 'doctor');
      if (apiSearchTerm) {
        queryParams.append('search', apiSearchTerm);
      }
      const response = await fetch(`/api/employee?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${employeeType.toLowerCase()}: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setEmployee(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${employeeType.toLowerCase()}:`, err);
      setError(err.message);
      setEmployee([]);
    } finally {
      setLoading(false);
    }
  }, [apiSearchTerm]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setApiSearchTerm(searchTerm);
  };

  // Sort by employee_id, which should be the primary unique identifier from the employee table
  const sortedEmployee = [...employee].sort((a, b) => (a.employee_id || 0) - (b.employee_id || 0));

  return (
    <div className={styles.container}>
      <Card title={`View ${employeeType}`}>
        <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
          <Input
            type="text"
            placeholder={`Search ${employeeType.toLowerCase()} by name, email, ID, or specialization...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <Button type="submit" variant="primary" className={styles.searchButton}>
            Search
          </Button>
        </form>

        {loading && <p>Loading {employeeType.toLowerCase()}...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {!loading && !error && sortedEmployee.length === 0 && (
          <p>No {employeeType.toLowerCase()} found{apiSearchTerm ? ` for "${apiSearchTerm}"` : "."}</p>
        )}
        {!loading && !error && sortedEmployee.length > 0 && (
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Specialization</th>
                <th>Hiring Date</th>
                <th>Employee Type</th>
                {/* TODO: Add qualifications from DEmployee_qualification if needed via API */}
              </tr>
            </thead>
            <tbody>
              {sortedEmployee.map((member) => (
                <tr key={member.employee_id}>
                  <td>{member.employee_id}</td>
                  <td>{member.first_name}</td>
                  <td>{member.last_name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone_number}</td>
                  <td>{member.department_name || 'N/A'}</td>
                  <td>{member.specialization || 'N/A'}</td>
                  <td>{member.hiring_date ? new Date(member.hiring_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{member.employee_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}