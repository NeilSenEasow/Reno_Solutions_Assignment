import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get database connection
async function getDbConnection() {
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true
    }
  });
  return connection;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    let imagePath = '';
    try {
      const fileExtension = path.extname(imageFile.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(process.cwd(), 'public', 'schoolImages', fileName);
      const fileBuffer = await imageFile.arrayBuffer();

      const imageDir = path.join(process.cwd(), 'public', 'schoolImages');
      await fs.mkdir(imageDir, { recursive: true });

      await fs.writeFile(filePath, Buffer.from(fileBuffer));
      imagePath = `/schoolImages/${fileName}`;
    } catch (error) {
      console.error('Image upload failed:', error);
      return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
    }

    const connection = await getDbConnection();
    await connection.execute(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imagePath, email_id]
    );
    connection.end();

    return NextResponse.json({ message: 'School added successfully!' });
  } catch (error) {
    console.error('Database insertion failed:', error);
    return NextResponse.json({ message: 'Failed to add school to database' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.execute('SELECT name, address, city, image FROM schools');
    connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ message: 'Failed to fetch schools' }, { status: 500 });
  }
}