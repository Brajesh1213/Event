// Import mongoose
import mongoose from 'mongoose';
import User from './user.model.js';
import Event from './event.model.js';

// Define comment schema
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  text: { type: String, required: true },
});
const Comment = mongoose.model('Comment',commentSchema);

export default Comment;
