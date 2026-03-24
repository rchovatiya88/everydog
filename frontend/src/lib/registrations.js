const STORAGE_KEY = "everydog_registrations";

/**
 * Save a new registration to local storage
 * @param {object} registrationData 
 */
export function saveRegistration(registrationData) {
  try {
    const existing = getRegistrations();
    // Add timestamp and a unique ID
    const newReg = {
      ...registrationData,
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      registered_at: new Date().toISOString()
    };
    
    existing.push(newReg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    
    // Also dispatch a custom event so the admin dashboard can update if open in another tab
    window.dispatchEvent(new Event("local-registrations-updated"));
    return true;
  } catch (error) {
    console.error("Failed to save registration to local storage", error);
    return false;
  }
}

/**
 * Get all registrations
 * @returns {Array} List of registrations
 */
export function getRegistrations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Get registrations for a specific event
 * @param {string} eventId 
 * @returns {Array} List of registrations for the event
 */
export function getRegistrationsForEvent(eventId) {
  const all = getRegistrations();
  return all.filter(reg => reg.event_id === eventId);
}
