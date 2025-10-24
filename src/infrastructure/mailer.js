import nodemailer from 'nodemailer';

export function mailerProvider(config) {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    secure: config.SMTP_SECURE === 'true',
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
    pool: true,
  });

  return { transporter };
}
