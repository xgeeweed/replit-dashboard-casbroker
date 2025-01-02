import nodemailer from 'nodemailer';

const domain = process.env.NEXT_PUBLIC_APP_URL;

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"CAS BROKER VERIFY ACCOUNT" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await sendEmail(
    email,
    "Reset your password",
    `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  );
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await sendEmail(
    email,
    "Confirm your email",
    `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  );
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail(
    email,
    "2FA Code",
    `<p>Your 2FA code: ${token}</p>`
  );
};