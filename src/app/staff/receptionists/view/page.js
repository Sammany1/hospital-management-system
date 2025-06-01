'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button } from '../../../../components/ui';
import styles from './page.module.css';

export default function ViewReceptionistsPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState('');

  const staffType = "Receptionists";

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('role', 'receptionist');
      if (apiSearchTerm) {
        queryParams.append('search', apiSearchTerm);
      }
      const response = await fetch(`/api/staff?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${staffType.toLowerCase()}: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setStaff(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${staffType.toLowerCase()}:`, err);
      setError(err.message);
      setStaff([]);
    } finally {
      setLoading(false);
    }
  }, [apiSearchTerm]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setApiSearchTerm(searchTerm);
  };

  const sortedStaff = [...staff].sort((a, b) => (a.employee_id || 0) - (b.employee_id || 0));

  return (
    <div className={styles.container}>
      <Card title={`View ${staffType}`}>
        <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
          <Input
            type="text"
            placeholder={`Search ${staffType.toLowerCase()} by name, email, or ID...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <Button type="submit" variant="primary" className={styles.searchButton}>
            Search
          </Button>
        </form>

        {loading && <p>Loading {staffType.toLowerCase()}...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {!loading && !error && sortedStaff.length === 0 && (
          <p>No {staffType.toLowerCase()} found{apiSearchTerm ? ` for "${apiSearchTerm}"` : "."}</p>
        )}
        {!loading && !error && sortedStaff.length > 0 && (
          <table className={styles.staffTable}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Hiring Date</th>
                <th>Employee Type</th>
                {/* TODO: Add language_spoken from Receptionists_language if needed via API */}
              </tr>
            </thead>
            <tbody>
              {sortedStaff.map((member) => (
                <tr key={member.employee_id}>
                  <td>{member.employee_id}</td>
                  <td>{member.first_name}</td>
                  <td>{member.last_name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone_number}</td>
                  <td>{member.department_name || 'N/A'}</td>
                  <td>{member.hiring_date ? new Date(member.hiring_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{member.employee_type}</td>
                  {/* Display receptionist-specific data if available, e.g., member.language_spoken */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
