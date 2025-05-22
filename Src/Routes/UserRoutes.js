import { Router } from "express";
import registerUser from "../Controllers/UserController.js";

const router = Router()

router.route('/register').post(registerUser)

export default router