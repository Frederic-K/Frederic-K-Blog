import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';
import User from '../models/user.model.js';

export const checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      throw new Error('Unauthorized');
    }

    const decodedToken = await verifyToken(token);
    const user = await findAndValidateUser(decodedToken.id);

    req.user = user;
    next();
  } catch (error) {
    handleError(error, next);
  }
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) reject(new Error('Unauthorized'));
      else resolve(decodedToken);
    });
  });
};

const findAndValidateUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.isVerified) {
    throw new Error('User not verified');
  }
  return user;
};

const handleError = (error, next) => {
  if (error.message === 'Unauthorized') {
    next(errorHandler(401, 'Unauthorized'));
  } else if (error.message === 'User not verified') {
    next(errorHandler(403, 'User not verified'));
  } else {
    next(errorHandler(500, 'Server error'));
  }
};