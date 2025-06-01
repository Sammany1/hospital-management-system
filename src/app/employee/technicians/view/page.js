'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button } from '../../../../components/ui';
import styles from './page.module.css';

export default function ViewTechniciansPage() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState('');

  const employeeType = "Technician";

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('role', 'technician');
      if (apiSearchTerm) {
        queryParams.append('search', apiSearchTerm);
      }
      const response = await fetch(`/api/employee?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${employeeType.toLowerCase()}s: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setEmployee(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
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

  // Sort by employee_id for consistency
  const sortedEmployee = [...employee].sort((a, b) => (a.employee_id || 0) - (b.employee_id || 0));

  return (
    <div className={styles.container}>
      <Card title="View Technicians">
        <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
          <Input
            type="text"
            placeholder="Search by name, email, ID, or specialization..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <Button type="submit" variant="primary" className={styles.searchButton}>
            Search
          </Button>
        </form>

        {loading && <p>Loading technicians...</p>}
        {error && <p className={styles.errorText}>Error: {error}</p>}
        {!loading && !error && sortedEmployee.length === 0 && (
          <p>No technicians found{apiSearchTerm ? ` for "${apiSearchTerm}"` : ""}.</p>
        )}
        {!loading && !error && sortedEmployee.length > 0 && (
          <table className={styles.detailsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Hiring Date</th>
                <th>Start Working Date</th>
                <th>Specialization</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {sortedEmployee.map((tech) => (
                <tr key={tech.employee_id}>
                  <td>{tech.employee_id}</td>
                  <td>{`${tech.first_name} ${tech.last_name}`}</td>
                  <td>{tech.email}</td>
                  <td>{tech.phone_number}</td>
                  <td>{tech.hiring_date ? new Date(tech.hiring_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{tech.start_working_date ? new Date(tech.start_working_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{tech.specialization || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}