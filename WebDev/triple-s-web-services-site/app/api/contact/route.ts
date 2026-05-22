import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        // 1. Extract the data sent from your Terminal component
        const { name, email, message } = await request.json();

        // 2. Configure the email transport using your environment variables
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Works for standard Gmail and Google Workspace
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 3. Format the email you will receive
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // You are sending this TO yourself
            replyTo: email, // This allows you to just hit "Reply" to email the client back
            subject: `[Triple S Lead] New Project Inquiry from ${name}`,
            text: `
      NEW CLIENT INQUIRY
      -------------------
      Name: ${name}
      Email: ${email}
      
      Project Parameters:
      ${message}
      `,
        };

        // 4. Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Transmission sent." });
    } catch (error) {
        console.error("Email API Error:", error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}