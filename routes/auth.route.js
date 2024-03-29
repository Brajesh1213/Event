import express from "express";
import { signin, signup, test } from "../controllers/auth.controller.js";

const router = express.Router();
router.get('/',test);
router.post('/signup',signup);
router.post('/signin',signin);

export default router;
