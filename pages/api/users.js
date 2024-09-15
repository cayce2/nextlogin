// pages/api/users.js
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../models/User';

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export default getUsers;