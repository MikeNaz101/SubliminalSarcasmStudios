import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase'; // Import the client we just made

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // 1. INJECT INTO SUPABASE FIRST
        const { error: dbError } = await supabase
            .from('project_intakes')
            .insert([
                { name, email, message }
            ]);

        if (dbError) {
            console.error("Supabase Insertion Error:", dbError);
            // We don't necessarily want to crash the whole request if the DB fails,
            // but we do want to log it.
        }

        // 2. CONFIGURE NODEMAILER
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ALERT_EMAIL_USER,
                pass: process.env.ALERT_EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.ALERT_EMAIL_USER,
            to: process.env.ALERT_EMAIL_USER,
            replyTo: email,
            subject: `[Triple S Lead] New Project Inquiry from ${name}`,
            text: message,
        };

        const adminAlertHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #171717; padding: 20px; text-align: center;">
                    <h2 style="color: #10b981; margin: 0;">New Project Intake</h2>
                </div>
                <div style="padding: 30px; background-color: #ffffff;">
                    <p style="margin-bottom: 10px; color: #4a4a4a;"><strong>Name:</strong> ${name}</p>
                    <p style="margin-bottom: 10px; color: #4a4a4a;"><strong>Email:</strong> ${email}</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 20px; margin-bottom: 30px;">
                        <p style="margin: 0; color: #171717; line-height: 1.5;">${message}</p>
                    </div>
                    <div style="text-align: center;">
                        <a href="https://tripleswebservices.com/admin/commander" 
                           style="background-color: #171717; color: #10b981; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; border: 1px solid #10b981;">
                           Access Commander Terminal
                        </a>
                    </div>
                </div>
            </div>
        `;

        // 3. TRANSMIT EMAIL
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Transmission failed:", error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}