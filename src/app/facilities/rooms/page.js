'use client';
import React, { useState } from 'react';
import { Input, Button, Card } from '../../../components/ui';
import styles from './page.module.css';

export default function ManageRoomsPage() {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '', // e.g., ICURoom, OperationRoom, DialysisRoom
    capacity: '',
    status: 'Available', // Available, Occupied, Maintenance
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Managing Room:', formData);
    // TODO: API call to /api/facilities/rooms
    alert('Manage Rooms functionality to be implemented.');
  };
  // This page would likely have a list of rooms and a form to add/edit.
  return (
    <div className={styles.container}>
      <Card title="Manage Hospital Rooms">
        <p>Add new rooms, update room status, and view room details. (Functionality to be implemented)</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input name="roomNumber" placeholder="Room Number" value={formData.roomNumber} onChange={handleChange} />
          <Input name="roomType" placeholder="Room Type (e.g., ICU, General)" value={formData.roomType} onChange={handleChange} />
          <Input name="capacity" type="number" placeholder="Capacity" value={formData.capacity} onChange={handleChange} />
          {/* Consider a select dropdown for status */}
          <Input name="status" placeholder="Status (e.g., Available)" value={formData.status} onChange={handleChange} />
          <Button type="submit">Save Room</Button>
        </form>
        {/* Placeholder for list of rooms */}
      </Card>
    </div>
  );
}
