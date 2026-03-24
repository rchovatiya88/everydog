import { getRegistrationsForEvent } from "../lib/registrations";

// All event data for EveryDog League - static data (no backend needed)

// Original EveryDog League photos
const PHOTOS = {
  // Batch 1
  hero: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/4wa9xf3w_20251004UpDogFallFestival%2CSaturday-Greedy-2274%20copy.jpeg",
  smallDog: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/qt0z8s1g_20240830UpDogTrilpeCrown%2CFunkey-00976%20copy.jpeg",
  frizgility: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/f05r8zs3_20230408UpDogAlaCarte-Frizgility--93%20copy.jpeg",
  howlidays: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/nnmv5tr8_20231202UpDogHowdyHowlidays%2CFunkey-10935%20copy.jpeg",
  funkey: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/cygwef1p_20240504UpDog%2CFunKey-03786%20copy%202.jpeg",
  // Batch 2
  skyhoundz: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/i00n1086_20250815SkyHoundz%2CD%26ARound1-0121%20copy.jpeg",
  fallFest2: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/9dhxf8xh_20251004UpDogFallFestival%2CSaturday-Greedy-4034%20copy.jpeg",
  rockNRollers: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/dt28eiu0_20240113UpDogRock-N-Rollers%2CFrizgilityL2-07116%20copy.jpeg",
  stPattys: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/8t22jcby_20240317UpDog%2CStPattysDay-7Up%2CSarah%26Cheeters--45%20copy.jpeg",
  fallFest3: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/5eujte4j_20251004UpDogFallFestival%2CSaturday-Greedy-4051%20copy.jpeg",
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
