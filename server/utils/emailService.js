import transporter from "./mailerConfig.js";

export const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "FK'Blog Verify Your Email",
    html: `
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          line-height: 1.5;
          color: #666;
        }
        a {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
      <div class="container">
        <h1>FK'Blog Email Verification</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="${process.env.BASE_URL}/verify-email/${token}">Verify Email</a>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "FK'Blog Password Reset Request",
    html: `
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          line-height: 1.5;
          color: #666;
        }
        a {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
      <div class="container">
        <h1>FK'Blog Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${process.env.BASE_URL}/reset-password/${token}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendContactEmail = async (body) => {
  const mailOptions = {
    from: `${body.name} <${process.env.SENDER_EMAIL}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: body.subject,
    html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${body.name}</li>
        <li>Email: ${body.email}</li>
        <li>Subject: ${body.subject}</li>
        <li>Message: ${body.message}</li>
      </ul>
    `
  };

  await transporter.sendMail(mailOptions);
};