import bcrypt from 'bcryptjs';
import { db } from '../../../lib/db';

export async function POST(req) {
  const { firstName, lastName, email, password, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ message: 'Passwords do not match' }), { status: 400 });
  }

  try {
    // Check duplicate email
    const [rows] = await db.query('SELECT * FROM signup WHERE `email` = ?', [email]);
    if (rows.length > 0) {
      return new Response(JSON.stringify({ message: 'Email already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO signup (`first-name`, `last-name`, `email`, `password`, `confirm-password`) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, hashedPassword]
    );

    return new Response(JSON.stringify({ message: 'Signup successful!' }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Database error' }), { status: 500 });
  }
}
