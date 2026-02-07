import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 1. Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents"); // Match your screenshot

        // 2. Save ticket to the database for record-keeping
        const ticketEntry = await db.collection("maintenance_tickets").insertOne({
            unitNumber: data.unitNumber,
            category: data.category,
            urgency: data.urgency,
            description: data.description,
            status: "Open", // Default status for new tickets
            createdAt: new Date(),
        });

        // 3. Setup Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // 4. Determine Email Priority
        let emailPriority: 'high' | 'normal' | 'low' = 'normal';
        if (data.urgency.toLowerCase().includes("high")) emailPriority = 'high';
        if (data.urgency.toLowerCase().includes("low")) emailPriority = 'low';

        // 5. Send the Email Alert
        await transporter.sendMail({
            from: `"SJP Maintenance" <${process.env.GMAIL_USER}>`,
            to: process.env.OFFICE_EMAIL,
            subject: `[${data.urgency.toUpperCase()}] Unit ${data.unitNumber} - ${data.category}`,
            priority: emailPriority,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0f172a; border-bottom: 3px solid #C5A028; padding-bottom: 10px;">
            New Maintenance Request
          </h2>
          <p><strong>Database ID:</strong> ${ticketEntry.insertedId}</p>
          <p><strong>Unit:</strong> <span style="font-size: 1.2em; font-weight: bold;">${data.unitNumber}</span></p>
          <p><strong>Urgency:</strong> <span style="color: ${emailPriority === 'high' ? '#e11d48' : '#0f172a'}; font-weight: bold;">${data.urgency}</span></p>
          <p><strong>Category:</strong> ${data.category}</p>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <strong>Issue Description:</strong><br/>
            ${data.description}
          </div>
          <p style="font-size: 11px; color: #64748b; margin-top: 20px;">
            Submitted via Saint James Place Resident Portal
          </p>
        </div>
      `,
        });

        return NextResponse.json({
            success: true,
            message: "Ticket saved and email sent",
            ticketId: ticketEntry.insertedId
        });

    } catch (error) {
        console.error("Maintenance API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}