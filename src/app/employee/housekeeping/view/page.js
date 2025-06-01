'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button } from '../../../../components/ui';
import styles from './page.module.css';

export default function ViewHousekeepingPage() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState('');

  const employeeType = "Housekeeping";

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('role', 'housekeeping');
      if (apiSearchTerm) {
        queryParams.append('search', apiSearchTerm);
      }
      const response = await fetch(`/api/employee?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${employeeType.toLowerCase()} employee: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setEmployee(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${employeeType.toLowerCase()} employee:`, err);
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

  const sortedEmployee = [...employee].sort((a, b) => (a.employee_id || 0) - (b.employee_id || 0));

  return (
    <div className={styles.container}>
      <Card title={`View ${employeeType} Employee`}>
        <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
          <Input
            type="text"
            placeholder={`Search ${employeeType.toLowerCase()} employee by name, email, or ID...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <Button type="submit" variant="primary" className={styles.searchButton}>
            Search
          </Button>
        </form>

        {loading && <p>Loading {employeeType.toLowerCase()} employee...</p>}
        {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
        {!loading && !error && sortedEmployee.length === 0 && (
          <p>No {employeeType.toLowerCase()} employee found{apiSearchTerm ? ` for "${apiSearchTerm}"` : "."}</p>
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
                <th>Hiring Date</th>
                <th>Employee Type</th>
                <th>Assigned Area(s)</th> {/* TODO: API needs to provide this from employee_area_assigned */}
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
                  <td>{member.hiring_date ? new Date(member.hiring_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{member.employee_type}</td>
                  <td>{member.area_assigned || 'N/A'}</td> {/* Placeholder until API provides it */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
