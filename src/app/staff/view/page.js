'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Navbar from '@/components/common/Navbar/Navbar';
import Sidebar from '@/components/common/Sidebar/Sidebar';

const ViewAllStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await fetch('/api/staff');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStaff(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    const filteredStaff = staff
        .filter(member => 
            `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(member => 
            filterRole ? member.role === filterRole : true
        );

    if (loading) return <p>Loading staff...</p>;
    if (error) return <p>Error loading staff: {error}</p>;

    const uniqueRoles = [...new Set(staff.map(s => s.role))];

    return (
        <div className={styles.container}>
            <Navbar title="View All Staff" />
            <Sidebar />
            <main className={styles.mainContent}>
                <h1 className={styles.title}>All Staff Members</h1>
                <div className={styles.filters}>
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <select 
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className={styles.roleFilter}
                    >
                        <option value="">All Roles</option>
                        {uniqueRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                {filteredStaff.length > 0 ? (
                    <table className={styles.staffTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Hiring Date</th>
                                <th>Start Date</th>
                                {/* Role-specific details - shown conditionally or with N/A */}
                                <th>Specialization (Doctor)</th>
                                <th>Wards (Nurse)</th>
                                <th>Languages (Nurse)</th>
                                <th>Equipment (Technician)</th>
                                <th>Tech Areas (Technician)</th>
                                <th>Assigned Areas (Security)</th>
                                <th>Clearance (Security)</th>
                                <th>Badge (Security)</th>
                                <th>Department (Housekeeping)</th>
                                <th>Shift (Housekeeping)</th>
                                <th>Responsibilities (Other)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.map((member) => (
                                <tr key={member.staff_id}>
                                    <td>{member.staff_id}</td>
                                    <td>{`${member.first_name} ${member.last_name}`}</td>
                                    <td>{member.role}</td>
                                    <td>{member.email}</td>
                                    <td>{member.phone_number}</td>
                                    <td>{`${member.street}, ${member.city}, ${member.state}, ${member.country} - ${member.postal_code}`}</td>
                                    <td>{new Date(member.hiring_date).toLocaleDateString()}</td>
                                    <td>{new Date(member.start_working_date).toLocaleDateString()}</td>
                                    {/* Display role-specific details, defaulting to N/A */}
                                    <td>{member.specialization || 'N/A'}</td>
                                    <td>{member.wards_assigned || 'N/A'}</td>
                                    <td>{member.languages_spoken || 'N/A'}</td>
                                    <td>{member.equipment_expertise || 'N/A'}</td>
                                    <td>{member.tech_areas || 'N/A'}</td>
                                    <td>{member.areas_assigned || 'N/A'}</td>
                                    <td>{member.clearance_level || 'N/A'}</td>
                                    <td>{member.badge_number || 'N/A'}</td>
                                    <td>{member.department_name || 'N/A'}</td>
                                    <td>{member.shift_schedule || 'N/A'}</td>
                                    <td>{member.responsibilities || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No staff members found matching your criteria.</p>
                )}
            </main>
        </div>
    );
};

export default ViewAllStaff;
