import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/errorHandler.js';

const createComment = async (req, res, next) => {
  const { content, postId, postTitle, userEmail, userId } = req.body;

  if (userId !== req.user.id) {
    return next(errorHandler(403, 'You are not allowed to create this comment'));
  }

  try {
    const newComment = new Comment({ content, postId, postTitle, userId, userEmail });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    return next(error instanceof Error? errorHandler(400, error.message) : error);
  }
};

const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: 1 });
    res.status(200).json(comments);
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const editComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return next(errorHandler(404, 'Comment not found'));
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to edit this comment'));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    return next(error instanceof Error? errorHandler(400, error.message) : error);
  }
};

const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return next(errorHandler(404, 'Comment not found'));
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this comment'));
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json('Comment has been deleted');
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const likeComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return next(errorHandler(404, 'Comment not found'));

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const getComments = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(403, 'You are not allowed to get all comments'));

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const [comments, totalComments, lastMonthComments] = await Promise.all([
      Comment.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit),
      Comment.countDocuments(),
      Comment.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } })
    ]);

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

export { 
  createComment, 
  getPostComments, 
  editComment, 
  deleteComment, 
  likeComment, 
  getComments 
};