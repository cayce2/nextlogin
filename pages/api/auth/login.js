// pages/api/auth/login.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/jwt';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }
      const token = signToken({ id: user._id, username: user.username });
      
      // Set token as HTTP-only cookie
      res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      }));

      res.status(200).json({ success: true, message: 'Logged in successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}