import mongoose from "mongoose";
import Event from "../models/event.model.js";
import { errorhandler } from "../utils/error.js";
import Ticket from "../models/ticket.model.js"
export const  test =(req,res)=>{
    res.send("Ticket Routes ");
}

export const buyTicket = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return next(errorhandler(404, 'Event not found.'));
    }

    // Check if the event has enough available tickets
    if (event.availableTickets <= 0) {
      return next(errorhandler(400, 'No available tickets for this event.'));
    }

    // Create a new ticket
    const newTicket = new Ticket({
      user: req.user.id, // Link the ticket to the authenticated user
      event: eventId,     // Link the ticket to the event
      // Add other ticket details as needed (e.g., type, price, quantity)
    });

    await newTicket.save();

    // Update the event's availableTickets count
    event.availableTickets -= 1;
    await event.save();

    res.status(201).json({ message: 'Ticket purchased successfully.', ticket: newTicket });
  } catch (error) {
    next(error);
  }
};

export const getTicketsByUser = async (req, res, next) => {
  try {
    const userTickets = await Ticket.find({ user: req.user._id }).populate('event');

    res.status(200).json(userTickets);
  } catch (error) {
    next(error);
  }
};
