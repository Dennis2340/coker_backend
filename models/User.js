import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  username: String,
  email: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
},
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
