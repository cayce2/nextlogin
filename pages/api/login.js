import { connectToDatabase } from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Connect to the database
      await connectToDatabase();

      // Find the user in the database
      const user = await User.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // If credentials are valid, return success response
      return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
