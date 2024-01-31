import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addComment, allEvent, deleteComment, test, updateComment } from "../controllers/comment.controller.js";
const router = express.Router();

router.get('/', test);
router.post('/add/:id',verifyToken,addComment);
router.delete('/delete/:id',verifyToken,deleteComment);
router.post('/update/:id',verifyToken,updateComment);
router.get('/allEvent',allEvent);


export default router;
