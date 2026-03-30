import { getRegistrationsForEvent } from "../lib/registrations";
import { getGoogleDriveImageUrl } from "../lib/googleDrive";

// All event data for EveryDog League - static data (no backend needed)

// Homepage/gallery images now resolve from Google Drive file IDs in src/config.js.
const PHOTOS = {
  hero: getGoogleDriveImageUrl("hero", "Hero"),
  smallDog: getGoogleDriveImageUrl("smallDog", "Small Dog Training"),
  frizgility: getGoogleDriveImageUrl("frizgility", "Frizgility"),
  howlidays: getGoogleDriveImageUrl("howlidays", "Howdy Howlidays"),
  funkey: getGoogleDriveImageUrl("funkey", "FunKey"),
  skyhoundz: getGoogleDriveImageUrl("skyhoundz", "SkyHoundz"),
  fallFest2: getGoogleDriveImageUrl("fallFest2", "Fall Festival 2"),
  rockNRollers: getGoogleDriveImageUrl("rockNRollers", "Rock-N-Rollers"),
  stPattys: getGoogleDriveImageUrl("stPattys", "St. Patty's Day"),
  fallFest3: getGoogleDriveImageUrl("fallFest3", "Fall Festival 3"),
};

export { PHOTOS };

export const EVENTS = [];

const ADMIN_EVENTS_KEY = "everydog_admin_events";

export function getAdminEvents() {
  try {
    const data = window.localStorage.getItem(ADMIN_EVENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAdminEvent(eventData) {
  try {
    const existing = getAdminEvents();
    const newEvent = {
      ...eventData,
      id: `evt-admin-${Date.now()}`,
      registered_count: 0
    };
    existing.push(newEvent);
    window.localStorage.setItem(ADMIN_EVENTS_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event("local-events-updated"));
    return newEvent;
  } catch (error) {
    console.error("Failed to save admin event", error);
    return null;
  }
}

export function updateAdminEvent(id, updatedData) {
  try {
    const existing = getAdminEvents();
    const index = existing.findIndex(e => e.id === id);
    if (index !== -1) {
      existing[index] = { ...existing[index], ...updatedData };
      window.localStorage.setItem(ADMIN_EVENTS_KEY, JSON.stringify(existing));
      window.dispatchEvent(new Event("local-events-updated"));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to update admin event", error);
    return false;
  }
}

export function deleteAdminEvent(id) {
  try {
    const existing = getAdminEvents();
    const updated = existing.filter(e => e.id !== id);
    window.localStorage.setItem(ADMIN_EVENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("local-events-updated"));
    return true;
  } catch (error) {
    console.error("Failed to delete admin event", error);
    return false;
  }
}

export function getAllEvents() {
  const baseEvents = [...EVENTS, ...getAdminEvents()];
  return baseEvents.map(evt => ({
    ...evt,
    registered_count: getRegistrationsForEvent(evt.id).length
  }));
}

export function getEventById(id) {
  return getAllEvents().find((e) => e.id === id) || null;
}

export function getFilteredEvents(skillLevel = "All", sort = "soonest") {
  let filtered = getAllEvents();
  if (skillLevel && skillLevel !== "All") {
    filtered = filtered.filter((e) => e.skill_level === skillLevel);
  }
  filtered.sort((a, b) =>
    sort === "soonest"
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date)
  );
  return filtered;
}

export const GALLERY_IMAGES = [
  { url: PHOTOS.hero, alt: "Border Collie catching disc mid-air at Fall Festival" },
  { url: PHOTOS.smallDog, alt: "Small dog running with frisbee at Triple Crown" },
  { url: PHOTOS.skyhoundz, alt: "Disc dog action at SkyHoundz competition" },
  { url: PHOTOS.stPattys, alt: "Handler and dog at St. Patty's Day event" },
  { url: PHOTOS.rockNRollers, alt: "Frizgility run at Rock-N-Rollers event" },
  { url: PHOTOS.fallFest3, alt: "Flying catch at UpDog Fall Festival" },
  { url: PHOTOS.frizgility, alt: "Dog and handler in frizgility competition" },
  { url: PHOTOS.howlidays, alt: "Disc dog action at Howdy Howlidays" },
  { url: PHOTOS.fallFest2, alt: "High-energy disc catch at Fall Festival" },
];
