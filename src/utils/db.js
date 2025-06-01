import mysql from 'mysql2/promise';

// Ensure you have .env.local file with these variables
// or replace placeholders directly for testing (not recommended for production)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
  user: process.env.DB_USER || 'sql12781999',
  password: process.env.DB_PASSWORD || 'WlmJiWefkI',
  database: process.env.DB_DATABASE || 'sql12781999',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Increased from 1
  queueLimit: 0,
  connectTimeout: 20000, // Added a longer timeout
  acquireTimeout: 20000, // Added a longer timeout
  debug: false // Set to true for more detailed logging if needed
});

// Test the connection (optional, but good for diagnostics)
/* // Commenting out this un-semaphored connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
*/

export default pool;

// Example of how to use it in an API route:
// import pool from '@/utils/db';
//
// export async function GET(request) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     const [rows, fields] = await connection.execute('SELECT * FROM your_table_name');
//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error('Database query error:', error);
//     return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
//   } finally {
//     if (connection) connection.release();
//   }
// }
