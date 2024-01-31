import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.route.js'; // Correct the import
import eventRouter from './routes/event.route.js'
import ticketRouter from './routes/ticket.route.js'
import commentRoute from './routes/comment.route.js'
 import cookieParser from "cookie-parser";
dotenv.config();

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());
// Use userRoutes for '/api/user'

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/event',eventRouter);
app.use('/api/ticket',ticketRouter);
app.use('/api/Comments',commentRoute);



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message= err.message||'INTERNAL SERVER ERROR';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,

    });

});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/", (req, res) => {
    res.json({
        message: "Api is working"
    });
});
