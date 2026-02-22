// All event data for EveryDog League - static data (no backend needed)

// Original EveryDog League photos
const PHOTOS = {
  hero: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/4wa9xf3w_20251004UpDogFallFestival%2CSaturday-Greedy-2274%20copy.jpeg",
  smallDog: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/qt0z8s1g_20240830UpDogTrilpeCrown%2CFunkey-00976%20copy.jpeg",
  frizgility: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/f05r8zs3_20230408UpDogAlaCarte-Frizgility--93%20copy.jpeg",
  howlidays: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/nnmv5tr8_20231202UpDogHowdyHowlidays%2CFunkey-10935%20copy.jpeg",
  funkey: "https://customer-assets.emergentagent.com/job_everydog-fly/artifacts/cygwef1p_20240504UpDog%2CFunKey-03786%20copy%202.jpeg",
};

export { PHOTOS };

export const EVENTS = [
  {
    id: "evt-001",
    title: "Beginner Disc Dog Meetup",
    date: "2025-08-15",
    time: "9:00 AM - 11:00 AM",
    location: "Flag Pole Hill Park, Dallas",
    description:
      "Perfect for first-timers! Learn the basics of disc dog in a fun, supportive environment. We'll cover safe throwing techniques, how to get your dog interested in the disc, and basic catches. All breeds and sizes welcome \u2014 from Chihuahuas to Great Danes!",
    skill_level: "Beginner",
    capacity: 30,
    registered_count: 12,
    what_to_bring: [
      "Water for you and your dog",
      "A soft disc (we have extras!)",
      "Treats",
      "Leash",
      "Shade tent (optional)",
    ],
    image_url: PHOTOS.frizgility,
  },
  {
    id: "evt-002",
    title: "Open Freestyle Jam Session",
    date: "2025-08-22",
    time: "8:00 AM - 10:30 AM",
    location: "White Rock Lake Park, Dallas",
    description:
      "An open freestyle session for all skill levels. Show off your tricks, learn from experienced throwers, and enjoy the community vibes. Music, good energy, and flying discs \u2014 what more could you want?",
    skill_level: "Open",
    capacity: 40,
    registered_count: 25,
    what_to_bring: [
      "Multiple discs",
      "Water and bowl",
      "Camera for action shots",
      "Good vibes",
    ],
    image_url: PHOTOS.hero,
  },
  {
    id: "evt-003",
    title: "Small Dog Spotlight",
    date: "2025-08-29",
    time: "9:30 AM - 11:30 AM",
    location: "Reverchon Park, Dallas",
    description:
      "A special event celebrating our small dogs! Mini discs, shorter throws, and activities designed specifically for dogs under 25 lbs. Prove that small dogs can fly just as high. Prizes for the best catches!",
    skill_level: "Beginner",
    capacity: 25,
    registered_count: 8,
    what_to_bring: [
      "Mini soft disc",
      "Water",
      "Treats",
      "Your awesome small dog",
    ],
    image_url: PHOTOS.smallDog,
  },
  {
    id: "evt-004",
    title: "Intermediate Skills Workshop",
    date: "2025-09-05",
    time: "8:00 AM - 10:00 AM",
    location: "Klyde Warren Park, Dallas",
    description:
      "Ready to take it to the next level? This workshop covers advanced catching techniques, distance throws, and trick combos. Your dog should already be comfortable with basic disc catches. Trainers on hand to help!",
    skill_level: "Intermediate",
    capacity: 20,
    registered_count: 15,
    what_to_bring: [
      "Competition-grade discs",
      "Water",
      "High-value treats",
      "Athletic shoes",
    ],
    image_url: PHOTOS.funkey,
  },
  {
    id: "evt-005",
    title: "Rescue Dog Welcome Day",
    date: "2025-09-12",
    time: "10:00 AM - 12:00 PM",
    location: "Trinity River Audubon Center, Dallas",
    description:
      "Adopted a rescue? This event is for you! We partner with local shelters to welcome rescue dogs into the disc community. Patient trainers, gentle introductions, and a whole lot of love. Every rescue deserves to fly.",
    skill_level: "Beginner",
    capacity: 35,
    registered_count: 10,
    what_to_bring: [
      "Soft disc",
      "Extra patience",
      "Water and shade",
      "Your rescue's favorite toy",
    ],
    image_url: PHOTOS.howlidays,
  },
  {
    id: "evt-006",
    title: "Advanced Freestyle Competition",
    date: "2025-09-20",
    time: "7:30 AM - 11:00 AM",
    location: "Lake Highlands Park, Dallas",
    description:
      "Our first official freestyle competition! Compete in categories: Distance, Accuracy, and Freestyle Routine. Open to experienced teams who've been training together. Ribbons, prizes, and bragging rights for the winners!",
    skill_level: "Advanced",
    capacity: 15,
    registered_count: 11,
    what_to_bring: [
      "Competition discs (3+)",
      "Water and cooling vest",
      "First aid kit",
      "Music for freestyle routine",
    ],
    image_url: PHOTOS.hero,
  },
  {
    id: "evt-007",
    title: "Family Fun Disc Day",
    date: "2025-09-27",
    time: "9:00 AM - 12:00 PM",
    location: "Bachman Lake Park, Dallas",
    description:
      "Bring the whole family! Fun games, relay races, and disc activities for kids and dogs together. Food trucks, face painting, and disc dog demos. A community celebration of dogs and their humans!",
    skill_level: "Open",
    capacity: 50,
    registered_count: 20,
    what_to_bring: [
      "Blankets and chairs",
      "Sunscreen",
      "Water for everyone",
      "Discs (we have extras)",
      "Good appetite for food trucks",
    ],
    image_url: PHOTOS.frizgility,
  },
];

export function getEventById(id) {
  return EVENTS.find((e) => e.id === id) || null;
}

export function getFilteredEvents(skillLevel = "All", sort = "soonest") {
  let filtered = [...EVENTS];
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
  { url: PHOTOS.frizgility, alt: "Dog and handler in frizgility competition" },
  { url: PHOTOS.howlidays, alt: "Disc dog action at Howdy Howlidays event" },
  { url: PHOTOS.funkey, alt: "Athletic disc catch at UpDog competition" },
  { url: PHOTOS.hero, alt: "High-flying disc dog catch" },
];
