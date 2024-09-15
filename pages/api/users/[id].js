import { connectToDatabase } from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, email, role } = req.body;
    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, role } }
    );
    res.status(200).json({ message: 'User updated successfully' });
  }

  if (req.method === 'DELETE') {
    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'User deleted successfully' });
  }
}
