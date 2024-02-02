import express from 'express';
const router = express.Router();
import { createRandomUser,deleteAllRandomUsers,getAllRandomUsers } from '../controllers/userController.js';
import { verifyTokenAndSuperAdmin } from '../middleware/verifyToken.js';

// Route to create a random user
router.post('/',verifyTokenAndSuperAdmin, createRandomUser);

// Route to get all random users
router.get('/', getAllRandomUsers);

router.delete('/',deleteAllRandomUsers)
export default router;