import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUser,
	permission,
} from "../controllers/SuperadminController.js";
import { verifyTokenAndSuperAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

//Give permission
router.put("/:id", verifyTokenAndSuperAdmin, permission);

//Get user
router.get("/:id", verifyTokenAndSuperAdmin, getUser);

//Get All Users
router.get("/", verifyTokenAndSuperAdmin, getAllUsers);

//Delete User
router.delete("/:id", verifyTokenAndSuperAdmin, deleteUser);

export default router;
