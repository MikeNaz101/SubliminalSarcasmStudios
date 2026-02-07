import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 1. Setup the "Transporter" (This is who sends the email)
        // You should put these values in a .env file later, but for now you can test directly.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mnaz.gamedev@gmail.com', // Your Gmail
                pass: 'vgnu cpyb frlu ztho',     // See instructions below for this!
            },
        });

        // 2. Format the "Text Message" for the Boss
        // Keep it short so it fits in a text.
        const textMessageSummary = `
        Name: ${data.firstName} ${data.lastName}
        Phone: ${data.phone}
        Wants: ${data.assistance.join(', ')}
        Message:
        ${data.message || "No message provided."}
        `;

        // 3. Send the Text Message (Using Carrier Gateways)
        // Replace the number and domain with your boss's info.
        // Verizon: @vtext.com | AT&T: @txt.att.net | T-Mobile: @tmomail.net
        await transporter.sendMail({
            from: '"Saint James Bot" <your_email@gmail.com>',
            to: '5185382592@mypixmessages.com', // <--- BOSS'S PHONE NUMBER HERE
            subject: 'New Lead',
            text: "\n" + textMessageSummary,
        });

        // 4. Send the Full Email to the Office
        await transporter.sendMail({
            from: '"Saint James Website" <your_email@gmail.com>',
            to: 'mnaz.gamedev@gmail.com', // <--- OFFICE EMAIL HERE
            subject: `New Inquiry from ${data.firstName} ${data.lastName}`,
            html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Interests:</strong> ${data.assistance.join(', ')}</p>
        <p><strong>Referral Source:</strong> ${data.referral}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
    }
}