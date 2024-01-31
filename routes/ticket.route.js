import express from "express";
import {  buyTicket, getTicketsByUser, test } from "../controllers/ticket.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/', test);
router.post('/buy/:id',verifyToken,buyTicket);
router.get('/user', verifyToken, getTicketsByUser);
// router.get('/allEvent',allEvent);



export default router;
