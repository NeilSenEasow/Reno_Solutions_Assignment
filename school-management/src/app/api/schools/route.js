import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get database connection
async function getDbConnection() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  return connection;
}

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const address = formData.get('address');
  const city = formData.get('city');
  const state = formData.get('state');
  const contact = formData.get('contact');
  const email_id = formData.get('email_id');
  const imageFile = formData.get('image');

  // Validate all required fields
  if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // Handle image upload
  let imagePath = '';
  try {
    const fileExtension = path.extname(imageFile.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(process.cwd(), 'public', 'schoolImages', fileName);
    const fileBuffer = await imageFile.arrayBuffer();

    // Ensure the schoolImages directory exists
    const imageDir = path.join(process.cwd(), 'public', 'schoolImages');
    await fs.mkdir(imageDir, { recursive: true });

    await fs.writeFile(filePath, Buffer.from(fileBuffer));
    imagePath = `/schoolImages/${fileName}`;
  } catch (error) {
    console.error('Image upload failed:', error);
    return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
  }

  // Save data to MySQL
  let connection;
  try {
    connection = await getDbConnection();
    await connection.execute(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imagePath, email_id]
    );
    return NextResponse.json({ message: 'School added successfully!' });
  } catch (error) {
    console.error('Database insertion failed:', error);
    return NextResponse.json({ message: 'Failed to add school to database' }, { status: 500 });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export async function GET() {
  let connection;
  try {
    connection = await getDbConnection();
    const [rows] = await connection.execute('SELECT name, address, city, image FROM schools');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ message: 'Failed to fetch schools' }, { status: 500 });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}