import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Check if user exists
    const [rows] = await db.query('SELECT * FROM login WHERE `email` = ?', [email]);
    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const user = rows[0];

    // Compare password (if hashed, use bcrypt.compare)
    // Currently your table is plain text:
    if (user.password !== password) {
      return new Response(JSON.stringify({ message: 'Incorrect password' }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Database error' }), { status: 500 });
  }
}
