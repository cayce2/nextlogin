import dbConnect from '../../utils/dbConnect';  // Import your DB connection utility
import User from '../../models/User';  // Replace with your User model

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const users = await User.find();  // Fetch all users
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load users' });
    }
  }
}