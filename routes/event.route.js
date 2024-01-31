import express from "express";
import {  createEvent, deleteEvent, test, updateListing } from "../controllers/event.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get('/', test);

router.post('/create',verifyToken,createEvent);
router.delete('/delete/:id',verifyToken,deleteEvent)
router.post('/update/:id',verifyToken,updateListing)

export default router;
