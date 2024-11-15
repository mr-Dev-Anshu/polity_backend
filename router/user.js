import { Router } from "express";
import { login, logout, signup } from "../controller/authentication.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router() ; 

router.route('/signup').post(signup)
router.route('/login').post(login) ; 
router.route('/logout').post(verifyToken , logout) ; 
export default router ; 













































