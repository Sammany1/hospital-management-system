'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Input, Button, Select } from '../../../components/ui';
import styles from './page.module.css'; // Corrected path to shared CSS module

export default function AddEditRoomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingRoomId = searchParams.get('id');

  const [roomId, setRoomId] = useState(editingRoomId || null);
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('Available');
  const [pricePerDay, setPricePerDay] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // For loading room details and form submission

  // Fetch departments for the select dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        if (!response.ok) throw new Error('Failed to fetch departments');
        const data = await response.json();
        setDepartments(data || []); // Corrected: API returns an array directly
      } catch (err) {
        console.error("Error fetching departments:", err);
        setFormError('Could not load departments for selection.');
      }
    };
    fetchDepartments();
  }, []);

  // Fetch room details if editing
  useEffect(() => {
    if (editingRoomId) {
      setLoading(true);
      const fetchRoomDetails = async () => {
        try {
          // Assuming GET /api/facilities/rooms?id=X is how we fetch a single room by ID
          // This endpoint needs to be able to return a single room's details
          const response = await fetch(`/api/facilities/rooms?id=${editingRoomId}&limit=1`); 
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to fetch room details for editing');
          }
          const data = await response.json();
          if (data.rooms && data.rooms.length > 0) {
            const room = data.rooms[0];
            setRoomId(room.room_id); 
            setRoomNumber(room.room_number);
            setRoomType(room.room_type);
            setCapacity(room.capacity === null ? '' : room.capacity.toString());
            setStatus(room.status);
            setPricePerDay(room.price_per_day === null ? '' : room.price_per_day.toString());
            setDepartmentId(room.department_id.toString());
          } else {
            throw new Error('Room not found for editing.');
          }
        } catch (err) {
          console.error("Error fetching room details:", err);
          setFormError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRoomDetails();
    }
  }, [editingRoomId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setLoading(true);

    if (!roomNumber || !roomType || !departmentId) {
      setFormError('Room Number, Room Type, and Department are required.');
      setLoading(false);
      return;
    }

    const numCapacity = capacity === '' ? null : parseInt(capacity, 10);
    const numPricePerDay = pricePerDay === '' ? null : parseFloat(pricePerDay);

    if (capacity !== '' && (isNaN(numCapacity) || numCapacity < 0)) {
      setFormError('Capacity must be a non-negative number.');
      setLoading(false);
      return;
    }

    if (pricePerDay !== '' && (isNaN(numPricePerDay) || numPricePerDay < 0)) {
      setFormError('Price per day must be a non-negative number.');
      setLoading(false);
      return;
    }

    const roomData = {
      room_number: roomNumber,
      room_type: roomType,
      capacity: numCapacity,
      status,
      price_per_day: numPricePerDay,
      department_id: parseInt(departmentId),
    };

    const url = roomId ? `/api/facilities/rooms?id=${roomId}` : '/api/facilities/rooms';
    const method = roomId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${roomId ? 'update' : 'add'} room`);
      }
      
      setFormSuccess(`Room ${roomId ? 'updated' : 'added'} successfully!`);
      if (!roomId) { 
        resetForm();
      } else { 
         router.push('/facilities/view-rooms'); 
      }
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRoomNumber('');
    setRoomType('');
    setCapacity('');
    setStatus('Available');
    setPricePerDay('');
    setDepartmentId('');
    setFormError(null);
  };

  if (editingRoomId && loading && !formError) { // Show loading only if fetching, not if error already shown
    return <p className={styles.loading}>Loading room details...</p>;
  }

  return (
    <div className={styles.container}>
      <Card title={roomId ? 'Edit Room' : 'Add New Room'} className={styles.formCard}>
        <form onSubmit={handleFormSubmit}>
          {formError && <p className={styles.errorText}>{formError}</p>}
          {formSuccess && <p className={styles.successText}>{formSuccess}</p>}
          <div className={styles.formGrid}>
            <Input label="Room Number" type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="e.g., 101A" name="roomNumber" required />
            <Input label="Room Type" type="text" value={roomType} onChange={(e) => setRoomType(e.target.value)} placeholder="e.g., ICU, General" name="roomType" required />
            <Input label="Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g., 2" name="capacity" />
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} required name="status">
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Unavailable">Unavailable</option>
            </Select>
            <Input label="Price Per Day ($)" type="number" step="0.01" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="e.g., 250.00" name="pricePerDay" />
            <Select label="Department" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required name="departmentId">
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>{dept.name}</option>
              ))}
            </Select>
          </div>
          <div className={styles.formActions}>
            <Button type="submit" disabled={loading}>{roomId ? 'Update Room' : 'Save Room'}</Button>
            {roomId && <Button type="button" onClick={() => router.push('/facilities/view-rooms')} className={styles.cancelButton} disabled={loading}>Cancel</Button>}
            {!roomId && <Button type="button" onClick={resetForm} className={styles.clearButton} disabled={loading}>Clear Form</Button>}
          </div>
        </form>
      </Card>
    </div>
  );
}
