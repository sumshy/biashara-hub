// import { randomBytes } from 'crypto';
// import nodemailer from 'nodemailer';

// export const generateVerificationToken = () => {
//     return randomBytes(32).toString('hex');
// };

// export const sendVerificationEmail = async (email: string, token: string, role: string) => {
//     const transporter = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: process.env.MAILTRAP_USER,
//             pass: process.env.MAILTRAP_PASS,
//         },
//     });

//     // The verification URL now points to the frontend
//     const verificationUrl = `http://localhost:3000/${role}/verify-email?token=${token}`;

//     const mailOptions = {
//         from: '"Biashara Hub" <noreply@biasharahub.com>',
//         to: email,
//         subject: 'Biashara Hub Email Verification',
//         text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
//         html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                 <h1 style="color: #4a4a4a;">Welcome to Biashara Hub!</h1>
//                 <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:</p>
//                 <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
//                 <p>If the button doesn't work, you can also click on this link:</p>
//                 <a href="${verificationUrl}">${verificationUrl}</a>
//                 <p>If you didn't sign up for Biashara Hub, please ignore this email.</p>
//                 <p>Best regards,<br>The Biashara Hub Team</p>
//             </div>
//         `
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Verification email sent successfully to:', email);
//     } catch (error) {
//         console.error('Error sending verification email:', error);
//         throw new Error('Failed to send verification email');
//     }
// };