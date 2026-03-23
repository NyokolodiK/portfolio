import { ContactFormData } from "@/components/contact/ContactClient";
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
      <div style="font-family: 'Inter', Arial, sans-serif; background-color: #1c1c22; padding: 40px 20px; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #27272c; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
          <!-- Header -->
          <div style="background: linear-gradient(to bottom right, #27272c, #1a1a1f); padding: 30px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">
              <span style="color: #ffffff;">New Message</span>
              <span style="color: #00ff99;">.</span>
            </h1>
            <p style="color: rgba(255, 255, 255, 0.6); margin-top: 8px; font-size: 14px;">Portfolio Contact Form</p>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">
            <div style="margin-bottom: 24px;">
              <label style="display: block; color: #00ff99; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">From</label>
              <div style="font-size: 18px; color: #ffffff; font-weight: 500;">${name} ${surname}</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
              <div style="display: inline-block; width: 48%; vertical-align: top;">
                <label style="display: block; color: #00ff99; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Email</label>
                <div style="font-size: 15px; color: #ffffff;">${email}</div>
              </div>
              <div style="display: inline-block; width: 48%; vertical-align: top;">
                <label style="display: block; color: #00ff99; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Phone</label>
                <div style="font-size: 15px; color: #ffffff;">${phone || "Not provided"}</div>
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); pt: 24px; padding-top: 24px;">
              <label style="display: block; color: #00ff99; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Message</label>
              <div style="font-size: 16px; color: rgba(255, 255, 255, 0.8); line-height: 1.6; white-space: pre-wrap; background-color: rgba(255, 255, 255, 0.03); padding: 20px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05);">${message}</div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: rgba(255, 255, 255, 0.02); padding: 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.4);">
              Sent from kagiso-nyokolodi.dev &bull; ${new Date().toLocaleDateString()}
            </p>
          </div>
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
