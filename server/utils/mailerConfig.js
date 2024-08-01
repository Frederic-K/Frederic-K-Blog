import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const loadEnv = () => {
  const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
  dotenv.config({ path: envFile });
};

loadEnv();

const transporterConfig = {
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PWD,
  },
};

const transporter = nodemailer.createTransport(transporterConfig);

export default transporter;