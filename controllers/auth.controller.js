import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const test = (req,res)=>{
  res.send("AUth Api")
}

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
          return next(errorhandler(404, "User not found"));
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
          return next(errorhandler(401, "Wrong credentials"));
      }

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set the expiration date for the cookie (e.g., expires in 1 hour)
      
      const expiryDate = new Date(Date.now() + 7*3600000);

      const { password: hashedPassword, ...rest } = validUser._doc;

      res
          .cookie("access_token", token, {
              httpOnly: true,
              expires: expiryDate,
              sameSite: 'Strict', // Adjust as needed for your use case
          })
          .status(200)
          .json(rest);
  } catch (error) {
      next(errorhandler(500, "Internal Server Error"));
  }
};
