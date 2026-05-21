import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message, destination, subject } = await request.json();

    const smtpHost = process.env.SMTP_HOST || process.env.VITE_SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || process.env.VITE_SMTP_PORT;
    const smtpSecure = process.env.SMTP_SECURE || process.env.VITE_SMTP_SECURE;
    const smtpUser = process.env.SMTP_USER || process.env.VITE_SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.VITE_SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM_EMAIL || process.env.VITE_SMTP_FROM_EMAIL || 'noreply@gunjanholidays.com';
    const adminEmail = process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass || !adminEmail) {
      console.error('SMTP configuration error: Missing required variables in .env');
      return NextResponse.json(
        { success: false, error: 'Server email service is not properly configured.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: smtpSecure === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 1. Email to admin with inquiry details
    const adminMailOptions = {
      from: `"GunjanHolidays Website" <${smtpFrom}>`,
      to: adminEmail,
      subject: subject || `New Travel Inquiry from ${name}`,
      text: `New travel planning inquiry from ${name}.\n\nDetails:\nName: ${name}\nEmail: ${email}\nDestination: ${destination || 'Not Specified'}\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">New Booking Inquiry</h1>
            <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 14px;">GunjanHolidays Lead Generation Portal</p>
          </div>
          <div style="padding: 32px 24px;">
            <p style="color: #475569; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">You have received a new inquiry from the website. Here are the details:</p>
            <div style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; padding: 24px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600; width: 35%;">Name</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600; border-top: 1px solid #f1f5f9;">Email</td>
                  <td style="padding: 8px 0; color: #2563eb; font-size: 15px; font-weight: 500; border-top: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600; border-top: 1px solid #f1f5f9;">Destination</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 500; border-top: 1px solid #f1f5f9;">
                    <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; display: inline-block;">${destination || 'Not Specified'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600; border-top: 1px solid #f1f5f9; vertical-align: top;">Message</td>
                  <td style="padding: 8px 0; color: #334155; font-size: 14px; line-height: 1.6; border-top: 1px solid #f1f5f9; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${email}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">Reply to Client</a>
            </div>
          </div>
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">This email was sent automatically from GunjanHolidays website. Please do not reply directly to this message.</p>
          </div>
        </div>
      `,
    };

    // 2. Thank you email to the user
    const currentYear = new Date().getFullYear();
    const userMailOptions = {
      from: `"GunjanHolidays" <${smtpFrom}>`,
      to: email,
      subject: 'Thank You for Contacting GunjanHolidays',
      text: `Dear ${name},\n\nThank you for reaching out to GunjanHolidays. We have received your query and will get back to you shortly.\n\nYour Query Details:\nDestination: ${destination || 'Not Specified'}\nMessage: ${message}\n\nBest regards,\nGunjanHolidays Team`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">Thank You!</h1>
            <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 14px;">We have received your inquiry</p>
          </div>
          <div style="padding: 32px 24px;">
            <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">Dear ${name},</p>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">Thank you for reaching out to <strong>GunjanHolidays</strong>. Our travel experts are excited to help you plan your next adventure! We have received your inquiry and will get back to you with a customized proposal within 24 hours.</p>
            
            <div style="border-left: 4px solid #2563eb; padding-left: 16px; margin: 24px 0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 600; margin: 0 0 4px 0;">Your Inquiry Summary</p>
              <p style="color: #0f172a; font-size: 15px; font-weight: 500; margin: 0 0 8px 0;"><strong>Destination:</strong> ${destination || 'Not Specified'}</p>
              <p style="color: #334155; font-size: 14px; line-height: 1.5; font-style: italic; margin: 0; background-color: #f8fafc; padding: 12px; border-radius: 6px;">"${message}"</p>
            </div>

            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">If you have any urgent questions, please feel free to call our representative directly at <a href="tel:+919898297746" style="color: #2563eb; text-decoration: none; font-weight: 500;">+91 98982 97746</a> or email us at <a href="mailto:info@gunjanholidays.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">info@gunjanholidays.com</a>.</p>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
              <p style="color: #0f172a; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">Best Regards,</p>
              <p style="color: #64748b; font-size: 14px; margin: 0;">The GunjanHolidays Team</p>
            </div>
          </div>
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0;">GunjanHolidays, 24, G/F, Parth Empire, Opp. Rambag Police Station, Maninagar, Ahmedabad - 380008</p>
            <p style="color: #cbd5e1; font-size: 11px; margin: 0;">&copy; ${currentYear} GunjanHolidays. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log(`Email successfully sent to admin (${adminEmail}) and thank you email sent to ${email}`);

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error: any) {
    console.error('SMTP sending error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send inquiry email' },
      { status: 500 }
    );
  }
}
