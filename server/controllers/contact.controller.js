import { errorHandler } from '../utils/errorHandler.js';
import { sendContactEmail } from '../utils/emailService.js';

const contact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
    return next(errorHandler(400, 'All fields are required'));
    }

    await sendContactEmail(req.body);

    res.status(200).json({
      success: true,
      message: 'Thanks for contacting us. We will get back to you shortly'
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return next(error instanceof Error? errorHandler(500, error.message) : error);
  }
};

export { contact };