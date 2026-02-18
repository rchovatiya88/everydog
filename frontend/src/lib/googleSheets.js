import { GOOGLE_SCRIPT_URL, GOOGLE_SHEETS_ENABLED } from "@/config";

/**
 * Submit data to Google Sheets via Apps Script
 * Google Apps Script POST requests involve a redirect chain.
 * We use mode: 'no-cors' which reliably sends the data but
 * doesn't return a readable response. So we optimistically
 * show success, with a fallback try using redirect: 'follow'.
 *
 * @param {'registration' | 'newsletter' | 'contact'} type
 * @param {object} data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitToGoogleSheets(type, data) {
  const messages = {
    registration: "Registration successful! See you there!",
    newsletter: "Welcome to the pack! You're now subscribed.",
    contact: "Thanks for reaching out! We'll get back to you soon.",
  };

  if (!GOOGLE_SHEETS_ENABLED) {
    console.warn("Google Sheets not configured. Set GOOGLE_SCRIPT_URL in /src/config.js");
    return { success: true, message: messages[type] || "Submitted!" };
  }

  const payload = JSON.stringify({ type, ...data });

  try {
    // Attempt 1: Try with redirect follow (works when CORS allows it)
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "text/plain" },
      redirect: "follow",
    });

    // If we can read the response, use it (duplicate checks, etc.)
    try {
      const result = await response.json();
      return result;
    } catch {
      // Response wasn't JSON (redirect page) — data was still sent
      return { success: true, message: messages[type] || "Submitted!" };
    }
  } catch {
    // Attempt 2: CORS block — use no-cors mode (data still gets sent)
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });
      return { success: true, message: messages[type] || "Submitted!" };
    } catch (err) {
      console.error("Google Sheets submission failed:", err);
      return { success: false, message: "Connection error. Please try again." };
    }
  }
}
