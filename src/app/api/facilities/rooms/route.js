// filepath: /Users/alsammany/Documents/Personal/SPRING 25/Database/Project/GUI/hospital/src/app/api/facilities/rooms/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../utils/db';
import dbSemaphore from '../../../../utils/db-semaphore';

// Add a new room
export async function POST(request) {
  try {
    const { room_number, room_type, capacity, status = 'Available', department_id, price_per_day } = await request.json();

    if (!room_number || !room_type || !department_id) {
      return NextResponse.json({ error: 'Room number, room type, and department ID are required' }, { status: 400 });
    }

    if (capacity !== undefined && (typeof capacity !== 'number' || capacity < 0)) {
        return NextResponse.json({ error: 'Capacity must be a non-negative number' }, { status: 400 });
    }

    if (price_per_day !== undefined && (typeof price_per_day !== 'number' || price_per_day < 0)) {
        return NextResponse.json({ error: 'Price per day must be a non-negative number' }, { status: 400 });
    }
    
    const parsedCapacity = capacity === undefined || capacity === null || capacity === '' ? null : parseInt(capacity);
    const parsedPricePerDay = price_per_day === undefined || price_per_day === null || price_per_day === '' ? null : parseFloat(price_per_day);


    await dbSemaphore.acquire();
    const connection = await pool.getConnection();

    try {
      // Check for room number collision
      const [existingRoom] = await connection.query('SELECT room_id FROM room WHERE room_number = ?', [room_number]);
      if (existingRoom.length > 0) {
        return NextResponse.json({ error: 'Room number already exists' }, { status: 409 });
      }

      const query = `
        INSERT INTO room (room_number, room_type, capacity, status, department_id, price_per_day, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
      `;
      const [result] = await connection.query(query, [room_number, room_type, parsedCapacity, status, department_id, parsedPricePerDay]);
      
      return NextResponse.json({ message: 'Room added successfully', roomId: result.insertId }, { status: 201 });
    } finally {
      if (connection) {
        connection.release();
      }
      dbSemaphore.release();
    }
  } catch (error) {
    console.error('Error adding room:', error);
    return NextResponse.json({ error: 'Failed to add room', details: error.message }, { status: 500 });
  }
}

// Get list of rooms with filtering, pagination, and sorting
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const offset = (page - 1) * limit;

  // Filters
  const roomNumberFilter = searchParams.get('room_number');
  const roomTypeFilter = searchParams.get('room_type');
  const statusFilter = searchParams.get('status');
  const departmentIdFilter = searchParams.get('department_id');


  // Sorting
  const sortBy = searchParams.get('sortBy') || 'room_id'; // Default sort column
  const sortOrder = searchParams.get('sortOrder') || 'ASC'; // Default sort order

  let connection;
  try {
    await dbSemaphore.acquire();
    connection = await pool.getConnection();

    let whereClauses = [];
    let queryParams = [];

    if (roomNumberFilter) {
      whereClauses.push("r.room_number LIKE ?");
      queryParams.push(`%${roomNumberFilter}%`);
    }
    if (roomTypeFilter) {
      whereClauses.push("r.room_type LIKE ?");
      queryParams.push(`%${roomTypeFilter}%`);
    }
    if (statusFilter) {
      whereClauses.push("r.status LIKE ?");
      queryParams.push(`%${statusFilter}%`);
    }
    if (departmentIdFilter) {
      whereClauses.push("r.department_id = ?");
      queryParams.push(parseInt(departmentIdFilter));
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const countQuery = `
      SELECT COUNT(r.room_id) as total
      FROM room r
      ${whereSql}
    `;
    const [countResult] = await connection.query(countQuery, queryParams);
    const totalRooms = countResult[0].total;
    const totalPages = Math.ceil(totalRooms / limit);

    const validSortKeys = {
      'room_id': 'r.room_id',
      'room_number': 'r.room_number',
      'room_type': 'r.room_type',
      'status': 'r.status',
      'capacity': 'r.capacity',
      'price_per_day': 'r.price_per_day',
      'department_name': 'd.name', // Assuming join with department table
      'created_at': 'r.created_at'
    };
    
    const sortColumn = validSortKeys[sortBy] || 'r.room_id';
    const direction = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    // Add secondary sort by room_id to ensure consistent ordering for pagination
    const orderBySql = `ORDER BY ${sortColumn} ${direction}, r.room_id ${direction}`;

    const roomsQuery = `
      SELECT
          r.room_id,
          r.room_number,
          r.room_type,
          r.capacity,
          r.status,
          r.price_per_day,
          r.created_at,
          r.department_id,
          d.name as department_name 
      FROM
          room r
      JOIN
          department d ON r.department_id = d.department_id
      ${whereSql}
      ${orderBySql}
      LIMIT ?
      OFFSET ?
    `;
    
    const finalQueryParams = [...queryParams, limit, offset];
    const [rooms] = await connection.query(roomsQuery, finalQueryParams);

    return NextResponse.json({
      rooms,
      totalPages,
      currentPage: page,
      totalRooms,
    });

  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms', details: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
    dbSemaphore.release();
  }
}

// Update an existing room
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('id');
    const { room_number, room_type, capacity, status, department_id, price_per_day } = await request.json();

    if (!roomId) {
      return NextResponse.json({ error: 'Room ID is required' }, { status: 400 });
    }

    if (!room_number && !room_type && capacity === undefined && !status && !department_id && price_per_day === undefined) {
      return NextResponse.json({ error: 'At least one field to update must be provided' }, { status: 400 });
    }
    
    if (capacity !== undefined && (typeof capacity !== 'number' || capacity < 0)) {
        return NextResponse.json({ error: 'Capacity must be a non-negative number' }, { status: 400 });
    }

    if (price_per_day !== undefined && (typeof price_per_day !== 'number' || price_per_day < 0)) {
        return NextResponse.json({ error: 'Price per day must be a non-negative number' }, { status: 400 });
    }

    const parsedCapacity = capacity === undefined || capacity === null || capacity === '' ? undefined : parseInt(capacity);
    const parsedPricePerDay = price_per_day === undefined || price_per_day === null || price_per_day === '' ? undefined : parseFloat(price_per_day);

    await dbSemaphore.acquire();
    const connection = await pool.getConnection();

    try {
      // Check if room exists
      const [existingRoom] = await connection.query('SELECT room_id, room_number FROM room WHERE room_id = ?', [roomId]);
      if (existingRoom.length === 0) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
      }

      // If room_number is being updated, check for collision with other rooms
      if (room_number && room_number !== existingRoom[0].room_number) {
        const [collidingRoom] = await connection.query('SELECT room_id FROM room WHERE room_number = ? AND room_id != ?', [room_number, roomId]);
        if (collidingRoom.length > 0) {
          return NextResponse.json({ error: 'Another room with this room number already exists' }, { status: 409 });
        }
      }

      let updateFields = [];
      let queryParams = [];

      if (room_number !== undefined) {
        updateFields.push('room_number = ?');
        queryParams.push(room_number);
      }
      if (room_type !== undefined) {
        updateFields.push('room_type = ?');
        queryParams.push(room_type);
      }
      if (parsedCapacity !== undefined) {
        updateFields.push('capacity = ?');
        queryParams.push(parsedCapacity);
      }
      if (status !== undefined) {
        updateFields.push('status = ?');
        queryParams.push(status);
      }
      if (department_id !== undefined) {
        updateFields.push('department_id = ?');
        queryParams.push(department_id);
      }
      if (parsedPricePerDay !== undefined) {
        updateFields.push('price_per_day = ?');
        queryParams.push(parsedPricePerDay);
      }
      
      if (updateFields.length === 0) {
        return NextResponse.json({ message: 'No changes provided', room: existingRoom[0] }, { status: 200 });
      }

      updateFields.push('updated_at = NOW()');
      queryParams.push(roomId);

      const query = `UPDATE room SET ${updateFields.join(', ')} WHERE room_id = ?`;
      const [result] = await connection.query(query, queryParams);

      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Room not found or no changes made' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Room updated successfully' });
    } finally {
      if (connection) {
        connection.release();
      }
      dbSemaphore.release();
    }
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json({ error: 'Failed to update room', details: error.message }, { status: 500 });
  }
}

// Delete a room
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('id');

    if (!roomId) {
      return NextResponse.json({ error: 'Room ID is required' }, { status: 400 });
    }

    await dbSemaphore.acquire();
    const connection = await pool.getConnection();

    try {
      // Optional: Check for dependencies (e.g., active assignments) before deleting
      // For example:
      // const [assignments] = await connection.query('SELECT COUNT(*) as count FROM patient_room_assignment WHERE room_id = ? AND end_date IS NULL', [roomId]);
      // if (assignments[0].count > 0) {
      //   return NextResponse.json({ error: 'Cannot delete room with active assignments. Please reassign patients first.' }, { status: 409 });
      // }

      const query = 'DELETE FROM room WHERE room_id = ?';
      const [result] = await connection.query(query, [roomId]);

      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Room deleted successfully' });
    } finally {
      if (connection) {
        connection.release();
      }
      dbSemaphore.release();
    }
  } catch (error) {
    console.error('Error deleting room:', error);
    // Consider more specific error handling, e.g., foreign key constraint violations
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return NextResponse.json({ error: 'Cannot delete room. It is currently in use or has related records (e.g., assignments, maintenance). Please ensure the room is vacant and all related records are cleared or reassigned before attempting deletion.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to delete room', details: error.message }, { status: 500 });
  }
}
