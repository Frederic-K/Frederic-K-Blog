import express from 'express';
import { checkUser } from "../utils/checkUser.js"
import { contact } from "../controllers/contact.controller.js"

const router = express.Router();    

router.post('/contact', checkUser, contact)

export default router;