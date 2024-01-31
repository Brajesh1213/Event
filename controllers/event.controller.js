import Event from '../models/event.model.js';
import { errorhandler } from '../utils/error.js';

export const test = (req, res) => {
    res.send("API Working");
};


export const createEvent = async (req, res) => {
    // console.log(req.user);
    try {
        const red=req.user._id;
        console.log(red);
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication failed. User not found.' });
        }
       
        const newEvent = await Event.create({
            ...req.body,
            organizer:req.user.id
            // organizer: red, 
        });
        
        // res.status(201).json(req.user._id);
        // console.log(Event().organizer)
        res.status(201).json(newEvent);
        // console.log(organizer)

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// import Event from '../models/event.model.js';
// Assuming you have the necessary imports and Event model
// export const getAllEventsWithComments = async (req, res, next) => {
//     try {
//       const events = await Event.find().populate('organizer').populate({
//         path: 'comment',
//         populate: { path: 'user', options: { strictPopulate: false } },
//       });
//       res.status(200).json(events);
//     } catch (error) {
//       next(error);
//     }
//   };
    
export const deleteEvent = async (req, res, next) => {
    try {
        const eventToDelete = await Event.findById(req.params.id);

        if (!eventToDelete) {
            return next(errorhandler(404, 'Event not found.'));
        }

        // Check if the authenticated user is the organizer of the event
        if (req.user.id !== eventToDelete.organizer.toString()) {
            return next(errorhandler(401, 'You can only delete your own event.'));
        }

        // Delete the event
        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

export const updateListing =async(req,res)=>{
    
    const listing = await Event.findById(req.params.id);
    if(!listing)return next(errorhandler(401,"you can only update your own listing "));
    try{
     const updatedListing  = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
     );
     res.status(200).json(updatedListing)
    }
    catch(error){
        next(error);
    }
}