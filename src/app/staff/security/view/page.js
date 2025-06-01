'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, Input, Button } from '../../../../components/ui';
import styles from './page.module.css';

const ViewSecurity = () => {
  const [securityStaff, setSecurityStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState('');

  const fetchSecurityStaff = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('role', 'security'); // Ensure lowercase for API consistency
      if (apiSearchTerm) {
        queryParams.append('search', apiSearchTerm);
      }
      const response = await fetch(`/api/staff?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch security staff: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setSecurityStaff(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching security staff:', err);
      setError(err.message);
      setSecurityStaff([]);
    } finally {
      setLoading(false);
    }
  }, [apiSearchTerm]);

  useEffect(() => {
    fetchSecurityStaff();
  }, [fetchSecurityStaff]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setApiSearchTerm(searchTerm);
  };

  const sortedStaff = [...securityStaff].sort((a, b) => (a.staff_id || 0) - (b.staff_id || 0));

  return (
    <div className={styles.container}>
      {/* <Navbar title="View Security Staff" /> */}
      {/* <Sidebar /> */}
      <main className={styles.mainContent}>
        <Card title="Security Staff Details">
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

          {loading && <p>Loading security staff...</p>}
          {error && <p className={styles.errorText}>Error: {error}. Please ensure the API endpoint is correct and the server is running.</p>}
          {!loading && !error && sortedStaff.length === 0 && (
            <p>No security staff found{apiSearchTerm ? ` for "${apiSearchTerm}"` : "."}</p>
          )}
          {!loading && !error && sortedStaff.length > 0 && (
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
                {sortedStaff.map((staff) => (
                  <tr key={staff.staff_id}>
                    <td>{staff.staff_id}</td>
                    <td>{`${staff.first_name} ${staff.last_name}`}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phone_number}</td>
                    {/* <td>{`${staff.street}, ${staff.city}, ${staff.state}, ${staff.country} - ${staff.postal_code}`}</td> */}
                    <td>{staff.hiring_date ? new Date(staff.hiring_date).toLocaleDateString() : 'N/A'}</td>
                    <td>{staff.start_working_date ? new Date(staff.start_working_date).toLocaleDateString() : 'N/A'}</td>
                    {/* <td>{staff.areas_assigned || 'N/A'}</td> */}
                    <td>{staff.clearance_level || 'N/A'}</td>
                    <td>{staff.badge_number || 'N/A'}</td>
                    <td>{staff.department_name || 'N/A'}</td>
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
