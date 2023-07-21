import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  address: String,
});
const User = mongoose.model('User', userSchema);
export { User };
