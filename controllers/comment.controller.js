import mongoose from "mongoose";
import { errorhandler } from "../utils/error.js";
import Event from "../models/event.model.js";
// import Comment from "../models/comment.model.js";
import Comment from "../models/comment.model.js";
export const  test =(req,res)=>{
    res.send("Comment Routes ");
}



export const addComment = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return next(errorhandler(404, 'Event not found.'));
    }

    const { text } = req.body;

    const newComment = new Comment({ user: req.user.id, event: eventId, text });
    await newComment.save();

   

    res.status(201).json({ message: 'Comment added successfully.' });
  } catch (error) {
    next(error);
  }
};




export const deleteComment = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Comment.findById(eventId);

    if (!event) {
      return next(errorhandler(404, 'Event not found'));
    }

    // const userComments = await Comment.find({ user: req.user.id, event: eventId });

    // if (userComments.length === 0) {
    //   return next(errorhandler(404, 'Comment not found'));
    // }

    // const lastComment = userComments[userComments.length - 1];

    // if (req.user.id !== lastComment.user.toString()) {
    //   return next(errorhandler(401, 'You can only delete your last comment'));
    // }

    await Comment.findByIdAndDelete(eventId);

    res.status(200).json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    next(error);
  }

};

    
export const allEvent=async(req,res,next)=>{
   
    try {
            const events = await Comment.find().populate('user').populate({
              path: 'event',
              populate: { path: 'user', options: { strictPopulate: false } },
            });
            res.status(200).json(events);
          } catch (error) {
            next(error);
          }
  
  

}


export const updateComment = async (req, res, next) => {
    const commentId = req.params.id;
    const newText = req.body.text;
  
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { text: newText },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  };