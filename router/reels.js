import { Router } from "express";
import { createReel, deleteReelById, getAllReels, getReelsByUserId, updateReelById } from "../controller/reels.js";

const router = Router() ; 
router.route('/create').post(createReel) ; 
router.route('/delete').delete(deleteReelById);
router.route('/update').put(updateReelById) ; 
router.route('/get-all').get(getAllReels) ; 
router.route('/getByUserId').get(getReelsByUserId); 
export default router; 