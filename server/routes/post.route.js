import express from 'express';
import { checkUser } from "../utils/checkUser.js"
import { createPost, getPosts, likePost, updatePost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/createPost', checkUser, createPost)
router.get('/getPosts', getPosts)
router.patch('/likePost/:postId', checkUser, likePost)
// whith /:userId you check if the user is the owner of the post
router.patch('/updatePost/:postId/:userId', checkUser, updatePost)
router.delete('/deletePost/:postId/:userId', checkUser, deletePost)

export default router;