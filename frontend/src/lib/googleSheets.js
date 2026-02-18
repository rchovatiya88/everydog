import { GOOGLE_SCRIPT_URL, GOOGLE_SHEETS_ENABLED } from "@/config";

/**
 * Submit data to Google Sheets via Apps Script
 * @param {'registration' | 'newsletter' | 'contact'} type - Form type
 * @param {object} data - Form data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitToGoogleSheets(type, data) {
  if (!GOOGLE_SHEETS_ENABLED) {
    // Fallback: simulate success when Google Sheets isn't configured yet
    console.warn("Google Sheets not configured. Set GOOGLE_SCRIPT_URL in /src/config.js");
    const messages = {
      registration: "Registration successful! See you there!",
      newsletter: "Welcome to the pack! You're now subscribed.",
      contact: "Thanks for reaching out! We'll get back to you soon.",
    };
    return { success: true, message: messages[type] || "Submitted!" };
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ type, ...data }),
      headers: { "Content-Type": "text/plain" },
      // Note: Content-Type is text/plain to avoid CORS preflight
      // Google Apps Script handles JSON parsing internally
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Google Sheets submission error:", err);
    return { success: false, message: "Connection error. Please try again." };
  }
}
