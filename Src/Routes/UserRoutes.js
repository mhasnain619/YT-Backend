import { Router } from "express";
import registerUser from "../Controllers/UserController.js";
import { upload } from "../Middlewares/Multer.Middleware.js";
const router = Router()

router.post('/register', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), registerUser);

export default router