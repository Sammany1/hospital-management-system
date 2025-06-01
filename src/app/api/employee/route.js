// filepath: /src/app/api/employee/route.js
import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const searchTerm = searchParams.get('search');

    try {
      connection = await pool.getConnection();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json({ message: 'Database connection error', error: error.message }, { status: 500 });
    }

    let selectFields = `
        e.employee_id AS employee_id,
        e.first_name,
        e.last_name,
        e.email,
        e.phone_number,
        e.hiring_date,
        e.start_working_date,
        e.employee_type,
        dpt.name AS department_name`;

    let joins = `
      FROM employee e
      LEFT JOIN department dpt ON e.department_id = dpt.department_id`;

    if (role === 'doctor') {
      selectFields += `, doc.specialization`;
      joins += ` LEFT JOIN doctor doc ON e.employee_id = doc.D_employee_id`;
    } else if (role === 'nurse') {
      selectFields += `, GROUP_CONCAT(DISTINCT nwa.ward_assigned SEPARATOR ', ') AS wards_assigned`;
      joins += ` LEFT JOIN nurse nrs ON e.employee_id = nrs.N_employee_id
                 LEFT JOIN Nemployee_ward_assigned nwa ON e.employee_id = nwa.N_employee_id`;
    } else if (role === 'receptionist') {
      selectFields += `, GROUP_CONCAT(DISTINCT rl.language_spoken SEPARATOR ', ') AS languages_spoken`;
      joins += ` LEFT JOIN receptionist rec ON e.employee_id = rec.R_employee_id
                 LEFT JOIN Receptionists_language rl ON e.employee_id = rl.R_employee_id`;
    } else if (role === 'technician') {
      selectFields += `, GROUP_CONCAT(DISTINCT eee.equipment_expertise SEPARATOR ', ') AS equipment_expertise,
                       GROUP_CONCAT(DISTINCT eta.tech_area SEPARATOR ', ') AS tech_areas`; // Corrected alias to tech_areas
      joins += ` LEFT JOIN technician tech ON e.employee_id = tech.T_employee_id
                 LEFT JOIN employee_equipment_expertise eee ON e.employee_id = eee.T_employee_id
                 LEFT JOIN employee_tech_area eta ON e.employee_id = eta.T_employee_id`;
    } else if (role === 'housekeeping') {
      selectFields += `, GROUP_CONCAT(DISTINCT eaa.area_assigned SEPARATOR ', ') AS areas_assigned`;
      joins += ` LEFT JOIN housekeeping_employee hk ON e.employee_id = hk.HK_employee_id
                 LEFT JOIN employee_area_assigned eaa ON e.employee_id = eaa.HK_employee_id`;
    } else if (role === 'security') {
      selectFields += `, sec.clearance_level, sec.badge_number`;
      joins += ` LEFT JOIN security sec ON e.employee_id = sec.S_employee_id`;
    }

    let baseQuery = `SELECT ${selectFields} ${joins}`;
    
    let conditions = [];
    let queryValues = [];

    if (role && role.toLowerCase() !== 'all') {
      conditions.push(`e.employee_type = ?`);
      queryValues.push(role.charAt(0).toUpperCase() + role.slice(1));
    }

    if (searchTerm) {
      // Updated to search in role-specific fields as well
      let searchCondition = '(e.first_name LIKE ? OR e.last_name LIKE ? OR e.email LIKE ? OR e.employee_id LIKE ?)';
      queryValues.push(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`);

      if (role === 'technician') {
        searchCondition = `(${searchCondition} OR eta.tech_area LIKE ?)`;
        queryValues.push(`%${searchTerm}%`);
      } else if (role === 'doctor') {
        searchCondition = `(${searchCondition} OR doc.specialization LIKE ?)`;
        queryValues.push(`%${searchTerm}%`);
      } else if (role === 'security') {
        searchCondition = `(${searchCondition} OR sec.clearance_level LIKE ? OR sec.badge_number LIKE ?)`;
        queryValues.push(`%${searchTerm}%`, `%${searchTerm}%`);
      }
      conditions.push(searchCondition);
    }

    let finalQuery = baseQuery;
    if (conditions.length > 0) {
      finalQuery += ` WHERE ${conditions.join(' AND ')}`;
    }

    if (role === 'nurse' || role === 'receptionist' || role === 'technician' || role === 'housekeeping') {
        finalQuery += ` GROUP BY e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.hiring_date, e.start_working_date, e.employee_type, dpt.name`;
        // Ensure all selected non-aggregated fields are in GROUP BY for roles with GROUP_CONCAT
        if (role === 'technician') {
            // tech_areas and equipment_expertise are already handled by GROUP_CONCAT, no need to add to GROUP BY here
        }
    } else if (role === 'doctor') {
        finalQuery += ` GROUP BY e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.hiring_date, e.start_working_date, e.employee_type, dpt.name, doc.specialization`;
    } else if (role === 'security') {
        finalQuery += ` GROUP BY e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.hiring_date, e.start_working_date, e.employee_type, dpt.name, sec.clearance_level, sec.badge_number`;
    }


    finalQuery += ` ORDER BY e.last_name, e.first_name`;

    const [rows] = await connection.execute(finalQuery, queryValues);
    return NextResponse.json(rows);

  } catch (error) {
    console.error('API /api/employee GET Error:', error);
    if (error.code === 'ER_NO_SUCH_TABLE' || error.message.includes('Unknown column')) {
        return NextResponse.json({ 
            message: 'Error fetching employee data. Schema mismatch. Check server logs and doc.md.', 
            error: error.message 
        }, { status: 500 });
    }
    return NextResponse.json({ message: 'Error fetching employee data', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}

export async function POST(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    const data = await request.json();
    const {
      first_name, last_name, email, phone_number, address, 
      hiring_date, start_working_date, employee_type, department_id,
      // Role-specific fields
      specialization, // Doctor
      // wards_assigned, // Nurse - handled separately if it's a multi-value field
      // languages_spoken, // Receptionist - handled separately
      // tech_areas, equipment_expertise, // Technician - handled separately
      // areas_assigned, // Housekeeping - handled separately
      clearance_level, badge_number // Security
    } = data;

    if (!first_name || !last_name || !email || !employee_type) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const employeeQuery = `
      INSERT INTO employee (
        first_name, last_name, email, phone_number, address, 
        hiring_date, start_working_date, employee_type, department_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const employeeValues = [
      first_name, last_name, email, phone_number, address,
      hiring_date || null, start_working_date || null, employee_type, department_id || null
    ];

    const [result] = await connection.execute(employeeQuery, employeeValues);
    const employeeId = result.insertId;

    if (!employeeId) {
      throw new Error('Failed to insert employee record.');
    }

    // Insert into role-specific table
    if (employee_type === 'Doctor' && specialization) {
      await connection.execute('INSERT INTO doctor (D_employee_id, specialization) VALUES (?, ?)', [employeeId, specialization]);
    } else if (employee_type === 'Nurse') {
      // Assuming N_employee_id is the FK in the nurse table
      await connection.execute('INSERT INTO nurse (N_employee_id) VALUES (?)', [employeeId]);
      // Handle wards_assigned if provided and it's a separate table like Nemployee_ward_assigned
      // Example: if (data.wards_assigned && Array.isArray(data.wards_assigned)) {
      //   for (const ward of data.wards_assigned) {
      //     await connection.execute('INSERT INTO Nemployee_ward_assigned (N_employee_id, ward_assigned) VALUES (?, ?)', [employeeId, ward]);
      //   }
      // }
    } else if (employee_type === 'Receptionist') {
      await connection.execute('INSERT INTO receptionist (R_employee_id) VALUES (?)', [employeeId]);
      // Handle languages_spoken
    } else if (employee_type === 'Technician') {
      await connection.execute('INSERT INTO technician (T_employee_id) VALUES (?)', [employeeId]);
      // Handle tech_areas and equipment_expertise - these are likely in separate junction tables
      // Example for tech_areas (assuming employee_tech_area table)
      // if (data.tech_areas && Array.isArray(data.tech_areas)) {
      //   for (const area of data.tech_areas) {
      //     await connection.execute('INSERT INTO employee_tech_area (T_employee_id, tech_area) VALUES (?, ?)', [employeeId, area]);
      //   }
      // }
    } else if (employee_type === 'Housekeeping') {
      await connection.execute('INSERT INTO housekeeping_employee (HK_employee_id) VALUES (?)', [employeeId]);
      // Handle areas_assigned
    } else if (employee_type === 'Security') {
      if (!badge_number) {
        // return NextResponse.json({ message: 'Badge number is required for Security personnel' }, { status: 400 });
        // For now, let's allow null or handle it, schema might allow null badge numbers initially
      }
      await connection.execute(
        'INSERT INTO security (S_employee_id, clearance_level, badge_number) VALUES (?, ?, ?)',
        [employeeId, clearance_level || null, badge_number || null]
      );
    }

    await connection.commit();

    return NextResponse.json({ 
      message: `${employee_type} added successfully`, 
      employeeId: employeeId,
      employee_id: employeeId // ensure employee_id is returned for consistency with GET
    }, { status: 201 });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('API /api/employee POST Error:', error);
    // Check for duplicate entry specifically for email
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.toLowerCase().includes('duplicate entry'))) {
        if (error.message.includes('email_UNIQUE')) { // Check if your unique constraint on email is named 'email_UNIQUE'
            return NextResponse.json({ message: 'Error adding employee: Email already exists.', error: error.message }, { status: 409 }); // 409 Conflict
        }
        return NextResponse.json({ message: 'Error adding employee: Duplicate entry.', error: error.message }, { status: 409 });
    }
    return NextResponse.json({ message: 'Error adding employee', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
