import express from 'express';
import { checkUser } from '../utils/checkUser.js'
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getComments,
  likeComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', checkUser, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.patch('/editComment/:commentId', checkUser, editComment);
router.patch('/likeComment/:commentId', checkUser, likeComment);
router.delete('/deleteComment/:commentId', checkUser, deleteComment);
// Get comments for dashboard
router.get('/getComments', checkUser, getComments);

export default router;
