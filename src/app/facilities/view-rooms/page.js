'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Select } from '../../../components/ui';
import styles from './page.module.css'; // Corrected path

export default function ViewRoomsPage() {
  const router = useRouter();

  // List state
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Pagination and Sorting
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRooms, setTotalRooms] = useState(0);
  const [sortBy, setSortBy] = useState('room_number');
  const [sortOrder, setSortOrder] = useState('ASC');

  // Filters
  const [roomNumberFilter, setRoomNumberFilter] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState(''); // Changed from departmentFilter

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
    });
    if (roomNumberFilter) params.append('room_number', roomNumberFilter);
    if (roomTypeFilter) params.append('room_type', roomTypeFilter);
    if (statusFilter) params.append('status', statusFilter);
    if (departmentNameFilter) params.append('department_name', departmentNameFilter); // Changed from department_id to department_name

    try {
      const response = await fetch(`/api/facilities/rooms?${params.toString()}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRooms(data.rooms);
      setTotalPages(data.totalPages);
      setTotalRooms(data.totalRooms);
    } catch (err) {
      setError(err.message);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, sortOrder, roomNumberFilter, roomTypeFilter, statusFilter, departmentNameFilter]); // Added departmentNameFilter

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleEdit = (roomId) => {
    router.push(`/facilities/add-room?id=${roomId}`);
  };
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    setError(null);
    setSuccessMessage(null);
    try {
        const response = await fetch(`/api/facilities/rooms?id=${id}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete room');
        }
        setSuccessMessage('Room deleted successfully!');
        fetchRooms(); // Refresh list
        setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3s
    } catch (err) {
        setError(err.message);
        setTimeout(() => setError(null), 5000); // Clear error after 5s
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRooms();
  };

  const handleClearFilters = () => {
    setRoomNumberFilter('');
    setRoomTypeFilter('');
    setStatusFilter('');
    setDepartmentNameFilter(''); // Changed
    setPage(1);
    // fetchRooms(); // Will be triggered by useEffect due to state changes
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

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <Card title="Manage Hospital Rooms" className={styles.listCard}>
        {error && <p className={styles.errorText}>{error}</p>}
        {successMessage && <p className={styles.successText}>{successMessage}</p>}
        
        <form onSubmit={handleFilterSubmit} className={styles.filtersContainer}>
            <Input label="Filter by Room No." type="text" placeholder="Room No." value={roomNumberFilter} onChange={e => setRoomNumberFilter(e.target.value)} className={styles.filterInput} name="roomNumberFilter" />
            {/* Changed Room Type filter to Select */}
            <Select label="Filter by Room Type" value={roomTypeFilter} onChange={e => setRoomTypeFilter(e.target.value)} className={styles.filterSelect} name="roomTypeFilter">
                <option value="">All Types</option>
                <option value="General">General</option>
                <option value="ICU">ICU</option>
                <option value="Emergency">Emergency</option>
                <option value="Maternity">Maternity</option>
                <option value="Dialysis">Dialysis</option>
                <option value="Isolation">Isolation</option>
                <option value="Operation">Operation</option>
                <option value="Radiology">Radiology</option>
                <option value="Recovery">Recovery</option>
                <option value="Pediatric">Pediatric</option>
                <option value="Private">Private</option>
                <option value="Semi-Private">Semi-Private</option>
                <option value="Ward">Ward</option>
                {/* Add other common room types as needed */}
            </Select>
            <Select label="Filter by Status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={styles.filterSelect} name="statusFilter">
                <option value="">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Unavailable">Unavailable</option>
            </Select>
            {/* Changed Department filter to Input */}
            <Input label="Filter by Department Name" type="text" placeholder="Department Name" value={departmentNameFilter} onChange={e => setDepartmentNameFilter(e.target.value)} className={styles.filterInput} name="departmentNameFilter" />
            <Button type="submit" className={styles.filterButton}>Filter</Button>
            <Button type="button" onClick={handleClearFilters} className={styles.clearButton}>Clear</Button>
        </form>

        <div className={styles.listInfoContainer}>
            <p>Total Rooms: {totalRooms}</p>
            <div>
                <label htmlFor="limit-select">Rooms per page: </label>
                <Select id="limit-select" value={limit} onChange={handleLimitChange} className={styles.limitSelect} name="limitSelect">
                    {[5, 10, 20, 50].map(num => <option key={num} value={num}>{num}</option>)}
                </Select>
            </div>
        </div>

        {loading && <p className={styles.loading}>Loading rooms...</p>}
        {!loading && !error && rooms.length === 0 && <p className={styles.noResults}>No rooms found matching your criteria.</p>}
        
        {!loading && !error && rooms.length > 0 && (
          <>
            <div className={styles.tableContainer}>
                <table className={styles.roomsTable}>
                <thead>
                    <tr>
                    {[
                        { key: 'room_number', label: 'Room No.' },
                        { key: 'room_type', label: 'Type' },
                        { key: 'department_name', label: 'Department' },
                        { key: 'capacity', label: 'Capacity' },
                        { key: 'status', label: 'Status' },
                        { key: 'price_per_day', label: 'Price/Day' },
                        { key: 'created_at', label: 'Created' },
                    ].map(col => (
                        <th key={col.key} onClick={() => handleSort(col.key)} className={styles.tableHeaderSortable}>
                        {col.label} {sortBy === col.key ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}
                        </th>
                    ))}
                    <th className={styles.actionsHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                    <tr key={room.room_id}>
                        <td>{room.room_number}</td>
                        <td>{room.room_type}</td>
                        <td>{room.department_name}</td>
                        <td>{room.capacity === null ? 'N/A' : room.capacity}</td>
                        <td>{room.status}</td>
                        <td>{room.price_per_day === null ? 'N/A' : `$${Number(room.price_per_day).toFixed(2)}`}</td>
                        <td>{formatDate(room.created_at)}</td>
                        <td className={styles.actionButtons}>
                        <Button onClick={() => handleEdit(room.room_id)} className={`${styles.editButton} ${styles.smallButton}`}>Edit</Button>
                        <Button onClick={() => handleDelete(room.room_id)} className={`${styles.deleteButton} ${styles.smallButton}`}>Delete</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className={styles.paginationControls}>
              <Button onClick={handlePrevPage} disabled={page <= 1}>Previous</Button>
              <span>Page {page} of {totalPages} (Total: {totalRooms})</span>
              <Button onClick={handleNextPage} disabled={page >= totalPages}>Next</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
