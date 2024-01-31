import express from 'express';
import { allEventHost, deleteUser, signOut, test, updateUser } from '../controllers/users.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const  router=express.Router();

router.get('/',test)
router.post("/update/:id",verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',verifyToken,signOut);
router.get('/allListings/:id',verifyToken,allEventHost)
export default router;