import { ContactFormData } from "@/app/contact/page";
import nodemailer from "nodemailer";


export async function POST(req: Request): Promise<Response> {
  const { name, surname, email, phone, message }: ContactFormData =
    await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name} ${surname}" <${email}>`,
    to: "knyokolodi@gmail.com",
    subject: "Portfolio Contact Form Submission",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f7fafc; padding: 20px; border-radius: 8px;">
        <!-- Logo Section -->
        <h1 style="font-size: 36px; font-weight: 600; text-align: center; margin-bottom: 20px;">
          <span style="color: #2d3748;">K</span><span style="color: #38b2ac;">.</span>
        </h1>
        <!-- Contact Form Content -->
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <p style="font-size: 16px; color: #4a5568; margin-bottom: 10px;"><strong>Name:</strong> ${name} ${surname}</p>
          <p style="font-size: 16px; color: #4a5568; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; color: #4a5568; margin-bottom: 10px;"><strong>Phone:</strong> ${
            phone || "Not provided"
          }</p>
          <p style="font-size: 16px; color: #4a5568; margin-bottom: 10px;"><strong>Message:</strong></p>
          <p style="font-size: 16px; color: #4a5568; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email" }),
      { status: 500 }
    );
  }
}
