import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { Resend } from "resend";

// Rate limiter: 20 request per IP per 60 seconds
const rateLimiter = new RateLimiterMemory({
  keyPrefix: "contact-form",
  points: 20,
  duration: 60,
});

// Escape function to prevent HTML injection
const escapeHTML = (str: string) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      {
        message:
          "Too many submissions. Please wait a minute before trying again.",
      },
      { status: 429 }
    );
  }

  const data = await req.json();

  const { country, name, email, phone, message, token } = data;
  const RECAPTCHA_SECRET = process.env.GOOGLE_RECAPS_SECRET;

  const recaptchaResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
    }
  );

  const recaptchaData = await recaptchaResponse.json();

  if (!recaptchaData.success) {
    return NextResponse.json(
      {
        message: "Captcha verification failed, Please try again.",
      },
      { status: 403 }
    );
  }

  // Send response to client immediately
  const response = NextResponse.json(
    {
      success: true,
      message: "Message sent successfully",
    },
    { status: 200 }
  );

  // Send email in background
  (async () => {
    try {
      const resend = new Resend(process.env.EMAIL_API_KEY);

      resend.emails.send({
        from: process.env.EMAIL_FROM ?? "",
        to: process.env.EMAIL_TO ?? "",
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Contact Form Submission</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #09090b; color: #fafafa;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #09090b;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #121215; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); overflow: hidden; border: 1px solid rgba(209, 213, 219, 0.26);">
                      
                      <!-- Header -->
                      <tr>
                        <td style="background: #22c55e; padding: 40px 30px; text-align: center; border-bottom: 2px solid #22c55e;">
                          <h1 style="margin: 0; color: #fafafa; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                            New Contact Form Submission
                          </h1>
                          <p style="margin: 10px 0 0 0; color: rgba(252, 253, 255, 0.77); font-size: 14px; font-weight: 500;">
                            Portfolio Landing Page
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Contact Info Section -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <div style="background-color: rgba(34, 197, 94, 0.05); border-left: 4px solid #22c55e; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #fafafa; font-size: 20px; font-weight: 600;">
                              Contact Information
                            </h2>
                            
                            <!-- Name -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                              <tr>
                                <td style="padding: 3px 0;">
                                  <table role="presentation" style="width: 100%;">
                                    <tr>
                                      <td style="width: 24px; vertical-align: top; padding-right: 12px;">
                                        <div style="width: 20px; height: 20px;">
                                          <span style="color: #09090b; font-size: 12px;">👤</span>
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: rgba(252, 253, 255, 0.77); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                                        <p style="margin: 4px 0 0 0; color: #fafafa; font-size: 16px; font-weight: 600;">${name}</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Email -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                              <tr>
                                <td style="padding: 3px 0;">
                                  <table role="presentation" style="width: 100%;">
                                    <tr>
                                      <td style="width: 24px; vertical-align: top; padding-right: 12px;">
                                        <div style="width: 20px; height: 20px;">
                                          <span style="color: #09090b; font-size: 12px;">✉️</span>
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: rgba(252, 253, 255, 0.77); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                        <p style="margin: 4px 0 0 0; color: #22c55e; font-size: 16px; font-weight: 600;">
                                          <a href="mailto:${escapeHTML(
                                            email
                                          )}" style="color: #22c55e; text-decoration: none;">${escapeHTML(
                                            email
                                          )}</a>
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Phone & Country Row -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <tr>
                                <td>
                                  <table role="presentation" style="width: 100%;">
                                    <tr>
                                      <td style="width: 24px; vertical-align: top; padding-right: 12px;">
                                        <div style="width: 20px; height: 20px;">
                                          <span style="color: #09090b; font-size: 12px;">📞</span>
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: rgba(252, 253, 255, 0.77); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Phone</p>
                                        <p style="margin: 4px 0 0 0; color: #fafafa; font-size: 16px; font-weight: 600;">${phone}</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td>
                                  <table role="presentation" style="width: 100%;">
                                    <tr>
                                      <td style="width: 24px; vertical-align: top; padding-right: 12px;">
                                        <div style="width: 20px; height: 20px; background-color: #22c55e; border-radius: 4px;">
                                          <span style="color: #09090b; font-size: 12px;">🌍</span>
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: rgba(252, 253, 255, 0.77); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Country</p>
                                        <p style="margin: 4px 0 0 0; color: #fafafa; font-size: 16px; font-weight: 600;">${country}</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </div>
                          
                          <!-- Message Section -->
                          <div style="background-color: rgba(34, 197, 94, 0.05); border-left: 4px solid #22c55e; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                            <h2 style="margin: 0 0 16px 0; color: #18181b; font-size: 20px; font-weight: 600;">
                              Message
                            </h2>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e4e4e7;">
                              <p style="margin: 0; color: #3f3f46; font-size: 15px; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word;">${escapeHTML(
                                message
                              )}</p>
                            </div>
                          </div>
                          
                          <!-- Action Button -->
                          <div style="text-align: center; margin-top: 30px;">
                            <a href="mailto:${escapeHTML(
                              email
                            )}" style="display: inline-block; background: #22c55e; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                              Reply to ${name}
                            </a>
                          </div>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #fcfdffc5; padding: 24px 30px; text-align: center; border-top: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 8px 0; color: #fafafa; font-size: 13px;">
                            📅 Received on <strong style="color: #fafafa;">${new Date().toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}</strong>
                          </p>
                          <p style="margin: 0; color: #fafafa; font-size: 12px;">
                            Automated notification from your Portfolio Landing Page
                          </p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
      });
    } catch (error) {
      console.error("Failed to send email. Please try again.");
    }
  })();

  return response;
}
