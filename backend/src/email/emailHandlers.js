import { sender, resendClient } from "../lib/resend.js";
import emailTemplate from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const data = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Welcome to Chatify! 🚀",
      html: emailTemplate(name, clientURL),
    });

    console.log("✅ Welcome email sent:", data?.id);
    return data;
  } catch (err) {
    console.error("❌ Failed to send welcome email:", err);
    throw err;
  }
};
