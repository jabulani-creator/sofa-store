import express from "express";
import { login, register, updateUser } from "../controllers/userController.js";
const router = express.Router();
import authentication from "../middleware/auth.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/updateUser").patch(authentication, updateUser);

export default router;
