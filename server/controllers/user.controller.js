import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

const validateUsername = (username, next) => {
  if (username.length < 7 || username.length > 20) {
    return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
  }
  if (username.includes(' ') || username !== username.toLowerCase() || !username.match(/^[a-zA-Z0-9]+$/)) {
    return next(errorHandler(400, 'Username must only contain alphanumeric characters and cannot contain spaces'));
  }
};

const validatePassword = (password, next) => {
  if (password.length < 6) {
    return next(errorHandler(400, 'Password must be at least 6 characters'));
  }
};

const test = (req, res) => {
  res.json({ message: 'API is working :D' });
};

const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(error instanceof Error? errorHandler(403, error.message) : error);
    }

    if (req.body.password) {
      validatePassword(req.body.password);
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
      validateUsername(req.body.username);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );

    const { password, ...userWithoutPassword } = updatedUser._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error instanceof Error ? errorHandler(400, error.message) : error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      return next(error instanceof Error? errorHandler(403, error.message) : error);
    }
    
    const userId = req.params.userId;

    // Remove user's likes from posts and update numberOfLikes
    await Post.updateMany(
      { likes: userId },
      { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } }
    );
    await Post.deleteMany({ userId: userId });

    // Remove user's likes from comments and update numberOfLikes
    await Comment.updateMany(
      { likes: userId },
      { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } }
    );
    await Comment.deleteMany({ userId: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json('User and associated data have been deleted');
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out');
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(error instanceof Error? errorHandler(403, error.message) : error)
    }

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map(({ _doc: { password, ...rest } }) => rest);

    const totalUsers = await User.countDocuments();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const lastMonthUsers = await User.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({ users: usersWithoutPassword, totalUsers, lastMonthUsers });
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const getPublicUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(error instanceof Error? errorHandler(404, error.message) : error);
    }
    res.status(200).json({
      username: user.username,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

export {
  test,
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getPublicUserInfo,
  validateUsername,
  validatePassword,
};