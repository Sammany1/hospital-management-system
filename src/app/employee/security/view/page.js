'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, Input, Button } from '../../../../components/ui';
import styles from './page.module.css';

const ViewSecurity = () => {
  const [securityEmployee, setSecurityEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState('');

  const fetchSecurityEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('role', 'security'); // Ensure lowercase for API consistency
      if (apiSearchTerm) {
        queryParams.append('search', apiSearchTerm);
      }
      const response = await fetch(`/api/employee?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch security employee: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setSecurityEmployee(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching security employee:', err);
      setError(err.message);
      setSecurityEmployee([]);
    } finally {
      setLoading(false);
    }
  }, [apiSearchTerm]);

  useEffect(() => {
    fetchSecurityEmployee();
  }, [fetchSecurityEmployee]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setApiSearchTerm(searchTerm);
  };

  const sortedEmployee = [...securityEmployee].sort((a, b) => (a.employee_id || 0) - (b.employee_id || 0));

  return (
    <div className={styles.container}>
      {/* <Navbar title="View Security Employee" /> */}
      {/* <Sidebar /> */}
      <main className={styles.mainContent}>
        <Card title="Security Employee Details">
          <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
            <Input
              type="text"
              placeholder="Search by name, email, ID, clearance, or badge..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <Button type="submit" variant="primary" className={styles.searchButton}>
              Search
            </Button>
          </form>

          {loading && <p>Loading security employee...</p>}
          {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
          {!loading && !error && sortedEmployee.length === 0 && (
            <p>No security employee found{apiSearchTerm ? ` for "${apiSearchTerm}"` : "."}</p>
          )}
          {!loading && !error && sortedEmployee.length > 0 && (
            <table className={styles.detailsTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {/* <th>Address</th> */}
                  <th>Hiring Date</th>
                  <th>Start Working Date</th>
                  {/* <th>Areas Assigned</th> */}
                  <th>Clearance Level</th>
                  <th>Badge Number</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployee.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>{employee.employee_id}</td>
                    <td>{`${employee.first_name} ${employee.last_name}`}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone_number}</td>
                    {/* <td>{`${employee.street}, ${employee.city}, ${employee.state}, ${employee.country} - ${employee.postal_code}`}</td> */}
                    <td>{employee.hiring_date ? new Date(employee.hiring_date).toLocaleDateString() : 'N/A'}</td>
                    <td>{employee.start_working_date ? new Date(employee.start_working_date).toLocaleDateString() : 'N/A'}</td>
                    {/* <td>{employee.areas_assigned || 'N/A'}</td> */}
                    <td>{employee.clearance_level || 'N/A'}</td>
                    <td>{employee.badge_number || 'N/A'}</td>
                    <td>{employee.department_name || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </main>
    </div>
  );
};

export default ViewSecurity;
