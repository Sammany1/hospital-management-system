'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button, Select } from '../../../components/ui'; // Assuming Select is available
import styles from './page.module.css';

export default function TreatmentAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const [patientNameFilter, setPatientNameFilter] = useState('');
  const [doctorNameFilter, setDoctorNameFilter] = useState('');
  const [treatmentNameFilter, setTreatmentNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // Sorting State
  const [sortBy, setSortBy] = useState('start_date'); // Default sort column
  const [sortOrder, setSortOrder] = useState('DESC'); // Default sort order

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
      });
      if (patientNameFilter) params.append('patientName', patientNameFilter);
      if (doctorNameFilter) params.append('doctorName', doctorNameFilter);
      if (treatmentNameFilter) params.append('treatmentName', treatmentNameFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (startDateFilter) params.append('startDate', startDateFilter);
      if (endDateFilter) params.append('endDate', endDateFilter);

      const response = await fetch(`/api/treatments/assignments/list?${params.toString()}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAssignments(data.assignments);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, sortOrder, patientNameFilter, doctorNameFilter, treatmentNameFilter, statusFilter, startDateFilter, endDateFilter]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when filters change
    fetchAssignments(); // fetchAssignments is already a dependency of useEffect, direct call might be redundant if not for immediate effect
  };

  const handleClearFilters = () => {
    setPatientNameFilter('');
    setDoctorNameFilter('');
    setTreatmentNameFilter('');
    setStatusFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
    setPage(1);
    // fetchAssignments(); // Will be triggered by state changes if fetchAssignments is in useEffect deps
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortOrder('ASC');
    }
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return 'N/A'; // Or 'Invalid Date' or however you want to handle it
    }
    return date.toLocaleDateString();
  };

  if (error && !loading) { // Show error only if not loading, to prevent flicker
    return <div className={styles.container}><p>Error loading treatment assignments: {error}</p></div>;
  }

  return (
    <div className={styles.container}>
      <Card title="Treatment Assignments">
        <form onSubmit={handleFilterSubmit} className={styles.filtersContainer}>
          <Input type="text" placeholder="Patient Name" value={patientNameFilter} onChange={(e) => setPatientNameFilter(e.target.value)} />
          <Input type="text" placeholder="Doctor Name" value={doctorNameFilter} onChange={(e) => setDoctorNameFilter(e.target.value)} />
          <Input type="text" placeholder="Treatment Name" value={treatmentNameFilter} onChange={(e) => setTreatmentNameFilter(e.target.value)} />
          <Input type="text" placeholder="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          <Input type="date" placeholder="Start Date" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} />
          <Input type="date" placeholder="End Date" value={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />
          <Button type="submit">Filter</Button>
          <Button type="button" onClick={handleClearFilters} className={styles.clearButton}>Clear Filters</Button>
        </form>

        <div className={styles.controls}>
          <label htmlFor="limit-select">Items per page: </label>
          <select id="limit-select" value={limit} onChange={handleLimitChange} className={styles.limitSelect}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {loading ? (
          <p>Loading treatment assignments...</p>
        ) : assignments.length === 0 ? (
          <p>No treatment assignments found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort('assignment_id')}>Assignment ID {sortBy === 'assignment_id' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('patient_name')}>Patient {sortBy === 'patient_name' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('treatment_name')}>Treatment {sortBy === 'treatment_name' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('doctor_name')}>Doctor {sortBy === 'doctor_name' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('start_date')}>Start Date {sortBy === 'start_date' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('end_date')}>End Date {sortBy === 'end_date' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('status')}>Status {sortBy === 'status' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.assignment_id}>
                  <td>{assignment.assignment_id}</td>
                  <td>{`${assignment.patient_first_name || ''} ${assignment.patient_last_name || ''}`.trim()}</td>
                  <td>{assignment.treatment_name || 'N/A'}</td>
                  <td>{`Dr. ${assignment.doctor_first_name || ''} ${assignment.doctor_last_name || ''}`.trim()}</td>
                  <td>{formatDate(assignment.start_date)}</td>
                  <td>{formatDate(assignment.end_date)}</td>
                  <td>{assignment.status || 'N/A'}</td>
                  <td>{assignment.notes || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={page <= 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      </Card>
    </div>
  );
}
