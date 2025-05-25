import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../Controllers/UserController.js";
import { upload } from "../Middlewares/Multer.Middleware.js";
import { verifyJwt } from "../Middlewares/AuthMiddlewere.js";
const router = Router()

router.route('/register').post(upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), registerUser);
router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verifyJwt, logOutUser)

export default router