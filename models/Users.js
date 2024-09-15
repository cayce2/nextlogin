// models/User.js
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;