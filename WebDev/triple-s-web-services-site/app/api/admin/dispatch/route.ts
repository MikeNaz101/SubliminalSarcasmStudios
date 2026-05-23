import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { clients, selectedActions } = await req.json();

        // 1. Initialize the Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ENG_EMAIL_USER,
                pass: process.env.ENG_EMAIL_PASS,
            },
        });

        // 2. Loop through each selected client
        for (const client of clients) {
            const firstName = client.name.split(' ')[0];
            let emailHtml = `<div style="font-family: sans-serif; color: #171717;">`;

            // NEW: Initialize an empty attachments array for this specific client
            const emailAttachments: { filename: string; path: string }[] = [];

            if (selectedActions.includes('greeting')) {
                emailHtml += `<h2 style="color: #10b981;">Hello ${firstName},</h2>
                      <p>We have successfully received your project parameters at Triple S Web Services. Thank you for reaching out to us.</p>`;
            }

            if (selectedActions.includes('pamphlet')) {
                emailHtml += `
                <div style="margin-top: 25px; margin-bottom: 25px;">
                    <h3 style="color: #171717; margin-bottom: 10px;">Engineering & Engagement Architecture</h3>
                    <p style="color: #4a4a4a; line-height: 1.6; margin-bottom: 20px;">
                        To help you understand our process, please review our technical engagement breakdown. We operate in three distinct phases to ensure your system is built to scale.
                    </p>
                    <a href="https://tripleswebservices.com/Triple_S_Engagement_Pamphlet.pdf" 
                       style="background-color: #10b981; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                       View Engagement Architecture
                    </a>
                </div>`;
            }

            if (selectedActions.includes('scheduler')) {
                emailHtml += `<h3>Schedule a Technical Review</h3>
                      <p>Your time is valuable. If you would like to discuss your infrastructure requirements face-to-face or via Zoom, please select a 30-minute block on our calendar here: <strong>[INSERT CALENDLY LINK HERE]</strong></p>`;
            }

            if (selectedActions.includes('thankyou')) {
                emailHtml += `<p>We appreciate your interest in our expanding engineering firm and look forward to the possibility of building out your system.</p>`;
            }

            if (selectedActions.includes('review')) {
                emailHtml += `<h3>Project Finalization</h3>
                       <p>It was an absolute pleasure engineering this system for you. If you are satisfied with the architecture, leaving a review on our Google Business page helps us tremendously.</p>`;
            }

            emailHtml += `<br><p>Best regards,<br><strong>Triple S Web Services Engineering Team</strong></p></div>`;

            // 3. Dispatch the compiled email via Nodemailer
            await transporter.sendMail({
                from: process.env.ENG_EMAIL_USER,
                to: client.email,
                subject: `Project Update from Triple S Web Services`,
                html: emailHtml,
                attachments: emailAttachments // NEW: Inject the attachments array here
            });

            // 4. Update Supabase Status to 'contacted'
            if (client.status === 'new') {
                await supabase
                    .from('project_intakes')
                    .update({ status: 'contacted' })
                    .eq('id', client.id);
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Batch dispatch failed:", error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}