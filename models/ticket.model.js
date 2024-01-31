// ticket.model.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  // Add other ticket details as needed (e.g., type, price, quantity)
});

export default mongoose.model('Ticket', ticketSchema);
