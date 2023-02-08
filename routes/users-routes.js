import pool from "../db.js";
import express from "express";
import bcrypt from "bcrypt";
import { authenticationMiddleware } from "../middlewares/auth.js";
import { addUserController, getUsersController } from "../comtrollers/users-controller.js";

const router = express.Router();

router.get('/', getUsersController)
router.post("/login", addUserController)

export default router