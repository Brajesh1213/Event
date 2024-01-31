import mongoose from 'mongoose';
import User from './user.model.js'; // Replace with the actual path to your User model
import Comment from './comment.model.js';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  // comment:{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}  

//   organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ensure correct reference
});
const Event = mongoose.model('Event',eventSchema);


export default Event