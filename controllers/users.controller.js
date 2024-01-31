import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import Event from "../models/event.model.js";
export const test = (req, res) => {
    res.json({
        message: "API is working",
    });
};

export const updateUser = async (req, res, next) => {
    // if (!req.user || req.user.id !== req.params.id) {
    //     // Use errorhandler instead of errorhandler
    //     return next(errorhandler(401, "You can only update your account"));
    // }
            
    try {
        if (req.body.password) {
            req.body.password = await bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
};
export const deleteUser= async(req,res,next)=>{
    if(req.user.id!=req.params.id){
        return next(errorhandler(401,"You can only delete your account "));
         }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('USER HAS DELETED ....')
    }
    catch(error){
        next(error);
    }

}


export const signOut = (req,res)=>{
    res.clearCookie('access_token').status(200).json({message:'Signout success'})
  }



  export const allEventHost = async (req,res,next)=>{
    if(req.user.id===req.params.id){
        try{
            const allListing =await Event.find({organizer:req.params.id});
            res.status(200).json(allListing);

        }
        catch(error){
            next(error);
        }
    }
    else{
        return next(errorhandler(401,"You can only view your listings"))
    }
  }