import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/errorHandler.js';

const createSlug = (title) => {
  return title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
};

const checkAdminPermission = (user, next) => {
  if (!user.isAdmin) {
    return next(errorHandler(403, 'You are not authorized to perform this action'));
  }
};

const createPost = async (req, res, next) => {
  try {
    checkAdminPermission(req.user, next);
    
    const { title, content } = req.body;
    if (!title || !content) {
      return next(error instanceof Error? errorHandler(400, 'Title and content are required') : error);
    }

    const slug = createSlug(title);
    const newPost = new Post({ ...req.body, slug, userId: req.user.id });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, sort = 'desc', userId, category, slug, postId, searchTerm, mostLiked } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortDirection = sort === 'asc' ? 1 : -1;
    
    const query = {
      ...(userId && { userId }),
      ...(category && { category }),
      ...(slug && { slug }),
      ...(postId && { _id: postId }),
      ...(searchTerm && {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
        ],
      }),
    };

    let posts;
    if (mostLiked === 'true') {
      posts = await Post.find(query)
        .sort({ numberOfLikes: -1, updatedAt: sortDirection })
        .skip(skip)
        .limit(parseInt(limit));
    } else {
      posts = await Post.find(query)
        .sort({ updatedAt: sortDirection })
        .skip(skip)
        .limit(parseInt(limit));
    }

    const totalPosts = await Post.countDocuments(query);
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const lastMonthPosts = await Post.countDocuments({ ...query, createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPosts / parseInt(limit)),
      totalPosts,
      lastMonthPosts,
      hasMore: skip + posts.length < totalPosts
    });
  } catch (error) {
    return next(error instanceof Error ? errorHandler(500, error.message) : error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    if (!req.user.isAdmin || req.user.id !== userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ postId: postId });
    res.status(200).json('The post and associated comments have been deleted');
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    if (!req.user.isAdmin || req.user.id !== userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: { title: req.body.title, content: req.body.content, category: req.body.category, images: req.body.images } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(error instanceof Error? errorHandler(404, 'Post not found') : error);
    }
    const userIndex = post.likes.indexOf(req.user.id);
    if (userIndex > -1) {
      post.likes.splice(userIndex, 1);
      post.numberOfLikes -= 1;
    } else {
      post.likes.push(req.user.id);
      post.numberOfLikes += 1;
    }
    await post.save();
    res.status(200).json({ message: 'Post liked/unliked successfully' });
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

export {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  likePost
};