// pages/api/user.js
import { verifyToken } from '../../utils/jwt';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ success: false, error: 'No token provided' });
      }

      const decoded = verifyToken(token);
      res.status(200).json({ success: true, username: decoded.username });
    } catch (error) {
      res.status(401).json({ success: false, error: 'Invalid token' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}