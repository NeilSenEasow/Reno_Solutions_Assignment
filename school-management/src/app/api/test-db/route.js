import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true
      }
    });

    console.log('Connection established successfully');

    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Test query result:', rows);

    connection.end();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}