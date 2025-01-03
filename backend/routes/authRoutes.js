// authRoutes.js
import express from 'express';
import { signup, signin } from '../controllers/authController.js'; // Use import instead of require

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router; // Use default export
