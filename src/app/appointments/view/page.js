'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button } from '@/components/ui'; // Assuming Select might be needed later
import styles from './page.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

const formatDate = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export default function ViewAppointmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15, // Default limit
    totalAppointments: 0,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    patientName: searchParams.get('patientName') || '',
    doctorName: searchParams.get('doctorName') || '',
    dateFrom: searchParams.get('dateFrom') || '',
    dateTo: searchParams.get('dateTo') || '',
    sortBy: searchParams.get('sortBy') || 'a.date_time',
    sortOrder: searchParams.get('sortOrder') || 'DESC',
  });

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });
      const response = await fetch(`/api/appointments/list?${queryParams.toString()}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data.appointments || []);
      setPagination(data.pagination || { page: 1, limit: pagination.limit, totalAppointments: 0, totalPages: 1 });
    } catch (err) {
      setError(err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Update URL when filters change
  useEffect(() => {
    const query = {};
    if (filters.patientName) query.patientName = filters.patientName;
    if (filters.doctorName) query.doctorName = filters.doctorName;
    if (filters.dateFrom) query.dateFrom = filters.dateFrom;
    if (filters.dateTo) query.dateTo = filters.dateTo;
    if (filters.sortBy !== 'a.date_time') query.sortBy = filters.sortBy;
    if (filters.sortOrder !== 'DESC') query.sortOrder = filters.sortOrder;
    if (pagination.page > 1) query.page = pagination.page;

    // Construct the new path with query parameters
    const newPath = `/appointments/view${Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : ''}`;
    router.replace(newPath, { scroll: false }); // Use replace to avoid multiple history entries for filter changes

  }, [filters, pagination.page, router]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1 on filter change
  };

  const handleSort = (column) => {
    const newSortOrder = (filters.sortBy === column && filters.sortOrder === 'ASC') ? 'DESC' : 'ASC';
    setFilters(prev => ({ ...prev, sortBy: column, sortOrder: newSortOrder }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const renderSortIcon = (column) => {
    if (filters.sortBy === column) {
      return filters.sortOrder === 'ASC' ? ' ▲' : ' ▼';
    }
    return ''; // No icon if not sorted by this column
  };

  return (
    <div className={styles.container}>
      <Card title="View All Appointments" className={styles.card}>
        <div className={styles.filtersContainer}>
          <Input
            type="text"
            name="patientName"
            placeholder="Filter by Patient Name"
            value={filters.patientName}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
          <Input
            type="text"
            name="doctorName"
            placeholder="Filter by Doctor Name"
            value={filters.doctorName}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
          <Input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className={styles.filterInput}
            title="Filter by Date From"
          />
          <Input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            className={styles.filterInput}
            title="Filter by Date To"
          />
          {/* Consider adding a Button to apply filters if preferred over instant apply */}
        </div>

        {loading && <p className={styles.loadingMessage}>Loading appointments...</p>}
        {error && <p className={styles.errorMessage}>Error: {error}</p>}
        
        {!loading && !error && appointments.length === 0 && (
          <p className={styles.noResultsMessage}>No appointments found matching your criteria.</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.appointmentsTable}>
                <thead>
                  <tr>
                    <th onClick={() => handleSort('a.appointment_id')}>ID{renderSortIcon('a.appointment_id')}</th>
                    <th onClick={() => handleSort('a.date_time')}>Date & Time{renderSortIcon('a.date_time')}</th>
                    <th onClick={() => handleSort('p.last_name')}>Patient{renderSortIcon('p.last_name')}</th>
                    <th onClick={() => handleSort('e.last_name')}>Doctor{renderSortIcon('e.last_name')}</th>
                    <th onClick={() => handleSort('d.specialization')}>Specialization{renderSortIcon('d.specialization')}</th>
                    <th onClick={() => handleSort('a.duration')}>Duration (mins){renderSortIcon('a.duration')}</th>
                    <th onClick={() => handleSort('py.payment_status')}>Payment Status{renderSortIcon('py.payment_status')}</th>
                    <th>Amount Paid</th>
                    {/* Add more columns as needed, e.g., actions */}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appt => (
                    <tr key={appt.appointment_id}>
                      <td>{appt.appointment_id}</td>
                      <td>{formatDate(appt.date_time)}</td>
                      <td>{`${appt.patient_first_name} ${appt.patient_last_name}`} (ID: {appt.patient_id})</td>
                      <td>{`Dr. ${appt.doctor_first_name} ${appt.doctor_last_name}`} (ID: {appt.doctor_id})</td>
                      <td>{appt.doctor_specialization}</td>
                      <td>{appt.duration}</td>
                      <td>{appt.payment_status || 'N/A'}</td>
                      <td>{formatCurrency(appt.amount_paid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.paginationControls}>
              <Button 
                onClick={() => handlePageChange(pagination.page - 1)} 
                disabled={pagination.page <= 1 || loading}
              >
                Previous
              </Button>
              <span>Page {pagination.page} of {pagination.totalPages} (Total: {pagination.totalAppointments})</span>
              <Button 
                onClick={() => handlePageChange(pagination.page + 1)} 
                disabled={pagination.page >= pagination.totalPages || loading}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
