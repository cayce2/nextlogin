// pages/api/auth/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the token cookie
    res.setHeader('Set-Cookie', serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    }));

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}