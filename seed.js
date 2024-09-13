import mongoose from 'mongoose';
import User from './models/User';
import { connectToDatabase } from './lib/mongodb';

async function seed() {
  await connectToDatabase();

  // Create a user
  const user = new User({
    username: 'admin',
    password: 'password', // In a real-world app, you'd hash the password
  });

  await user.save();
  console.log('User created');
  mongoose.connection.close();
}

seed();
