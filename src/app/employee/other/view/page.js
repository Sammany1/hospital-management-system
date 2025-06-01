'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button } from '../../../../components/ui';
import styles from './page.module.css';

export default function ViewOtherEmployeePage() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiSearchTerm, setApiSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(''); // For filtering by specific employee_type

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      // No specific role, so we fetch all and then can filter client-side or expect API to handle general employee
      // queryParams.append('role', 'all'); // Or omit role to get all non-specific employee if API supports
      if (apiSearchTerm) {
        queryParams.append('search', apiSearchTerm);
      }
      // If your API supports filtering by a general 'employee_type' for 'other' employee:
      // if (filterType) {
      //   queryParams.append('employee_type', filterType);
      // }
      
      const response = await fetch(`/api/employee?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch employee: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      // Filter here if API doesn't support filtering 'other' types directly
      // For now, assume API returns all employee, or employee not fitting specific roles like Doctor, Nurse etc.
      setEmployee(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setEmployee([]);
    } finally {
      setLoading(false);
    }
  }, [apiSearchTerm, filterType]);

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

  // const handleFilterChange = (e) => {
  //   setFilterType(e.target.value);
  //   // Optionally trigger fetchEmployee if API supports server-side filtering for employee_type
  //   // fetchEmployee(); 
  // };

  // Client-side filtering if needed, or adjust based on API capabilities
  const filteredEmployee = employee.filter(member => {
    if (filterType && member.employee_type !== filterType) {
      return false;
    }
    // Add other client-side search logic if searchTerm is not fully handled by API for 'other' employee
    return true;
  }).sort((a, b) => (a.employee_id || 0) - (b.employee_id || 0));

  // Get unique employee types for filter dropdown
  const uniqueEmployeeTypes = Array.from(new Set(employee.map(s => s.employee_type))).filter(Boolean);

  return (
    <div className={styles.container}>
      <Card title="View All Employees Members">
        <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
          <Input
            type="text"
            placeholder="Search by name, email, ID, or type..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {/* Optional: Filter by specific employee type if many 'other' types exist */}
          {/* 
          <Select value={filterType} onChange={handleFilterChange} className={styles.filterSelect}>
            <option value="">All Other Types</option>
            {uniqueEmployeeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
          */}
          <Button type="submit" variant="primary" className={styles.searchButton}>
            Search
          </Button>
        </form>

        {loading && <p>Loading employee...</p>}
        {error && <p className={styles.errorText}>Error: {error}</p>}
        {!loading && !error && filteredEmployee.length === 0 && (
          <p>No employee members found{apiSearchTerm ? ` for "${apiSearchTerm}"` : ""}{filterType ? ` of type "${filterType}"` : ""}.</p>
        )}
        {!loading && !error && filteredEmployee.length > 0 && (
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Employee Type</th>
                <th>Department</th>
                <th>Hiring Date</th>
                <th>Start Date</th>
                {/* Add other relevant columns for general employee */}
              </tr>
            </thead>
            <tbody>
              {filteredEmployee.map((member) => (
                <tr key={member.employee_id}>
                  <td>{member.employee_id}</td>
                  <td>{`${member.first_name} ${member.last_name}`}</td>
                  <td>{member.email}</td>
                  <td>{member.phone_number}</td>
                  <td>{member.employee_type || 'N/A'}</td>
                  <td>{member.department_name || 'N/A'}</td>
                  <td>{member.hiring_date ? new Date(member.hiring_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{member.start_working_date ? new Date(member.start_working_date).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
