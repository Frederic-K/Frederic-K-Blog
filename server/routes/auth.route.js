import express from "express";
import { signin, signup, verifyEmail, googleAuth, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/verify-email/:token', verifyEmail)
router.post('/google', googleAuth)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router