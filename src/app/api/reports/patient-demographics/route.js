import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import dbSemaphore from '@/utils/db-semaphore';

// Helper function to calculate age
function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export async function GET(request) {
  await dbSemaphore.acquire();
  let connection;
  try {
    connection = await pool.getConnection();
    // Fetch only patients with known sex ('Male' or 'Female') and non-null date_of_birth
    const [patients] = await connection.query(
      "SELECT sex, date_of_birth FROM patient WHERE sex IN ('Male', 'Female') AND date_of_birth IS NOT NULL"
    );

    const totalPatients = patients.length; // This will now be the count of patients fitting the criteria
    const sexDistribution = { Male: 0, Female: 0 }; // Removed 'Other' and 'Unknown'
    const ageDistribution = {
      '0-18': 0,
      '19-35': 0,
      '36-50': 0,
      '51-65': 0,
      '65+': 0,
      // 'Unknown' removed as we filter out null date_of_birth
    };

    patients.forEach(patient => {
      // Sex distribution
      if (patient.sex === 'Male') sexDistribution.Male++;
      else if (patient.sex === 'Female') sexDistribution.Female++;
      // No need for 'Other' or 'Unknown' due to SQL filter

      // Age distribution
      const age = calculateAge(patient.date_of_birth);
      // age will not be null due to SQL filter `date_of_birth IS NOT NULL`
      if (age >= 0 && age <= 18) {
        ageDistribution['0-18']++;
      } else if (age >= 19 && age <= 35) {
        ageDistribution['19-35']++;
      } else if (age >= 36 && age <= 50) {
        ageDistribution['36-50']++;
      } else if (age >= 51 && age <= 65) {
        ageDistribution['51-65']++;
      } else if (age > 65) {
        ageDistribution['65+']++;
      }
      // No 'Unknown' age category needed now
    });

    return NextResponse.json({
      totalPatients,
      sexDistribution,
      ageDistribution,
    });

  } catch (error) {
    console.error('Failed to fetch patient demographics:', error);
    return NextResponse.json({ message: 'Failed to fetch patient demographics', error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
    dbSemaphore.release();
  }
}
