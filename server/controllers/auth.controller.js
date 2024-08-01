import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { errorHandler } from '../utils/errorHandler.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/emailService.js';

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return next(errorHandler(400, 'All fields required'));
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: tokenExpiration,
      isVerified: false,
    });

    await newUser.save();
    await sendVerificationEmail(email, verificationToken);

    res.json('Signup successful. Please check your email to verify your account.');
  } catch (error) {
    console.error('Error during signup: ', error);
    return next(error instanceof Error? errorHandler(400, error.message) : error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ 
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(errorHandler(400, 'Invalid or expired verification token'));
    }

    if (user.isVerified) {
      return res.status(200).json('Email is already verified.');
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.json('Email verified successfully. You can now log in.');
  } catch (error) {
    console.error('Error during email verification:', error);
    return(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next(errorHandler(401, 'Invalid user or password'));
    }

    if (!user.isVerified) {
      return next(errorHandler(403, 'Please verify your email before logging in'));
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...userData } = user._doc;

    res.status(200).cookie('access_token', token, { httpOnly: true }).json(userData);
  } catch (error) {
    console.error('Error during sign-in:', error);
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const googleAuth = async (req, res, next) => {
  // Set the COOP header for this route, scoping with the 'Access-Control-Allow-Origin' header
  // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  const { email, name, googleAuthPhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      user = new User({
        username: `${name.toLowerCase().split(' ').join('')}${Math.random().toString(36).substring(2, 6)}`,
        email,
        password: hashedPassword,
        profilePicture: googleAuthPhotoUrl,
        isVerified: true,
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
    const { password, ...userData } = user._doc;

    res.status(200).cookie('access_token', token, { httpOnly: true }).json(userData);
  } catch (error) {
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return next(errorHandler(400, 'Email is required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiration;
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.json('Password reset link has been sent to your email.');
  } catch (error) {
    console.error('Error during forgot password: ', error);
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password === '') {
    return next(errorHandler(400, 'Password is required'));
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(errorHandler(400, 'Invalid or expired reset token'));
    }

    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    const { password: _, ...userData } = user._doc;
    res.status(200).json({
      message: 'Password has been reset successfully.',
      user: userData
    });
  } catch (error) {
    console.error('Error during password reset: ', error);
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

export {
  signup,
  verifyEmail,
  signin,
  googleAuth,
  forgotPassword,
  resetPassword,
};