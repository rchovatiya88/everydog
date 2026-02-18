# plan.md

## Objectives
- Ship a simple, beautiful, mobile-first EveryDog League site (Dallas disc dog community) with 5 pages.
- Deliver core data flows end-to-end: events browse/filter → event detail → registration (with waiver + capacity), plus newsletter signup + contact form storage.
- Use FARM stack (FastAPI + React + MongoDB) with seed data; no admin/auth, no maps, no external integrations.

## Implementation Steps

### Phase 1: Core POC (Core Flow Validation)
Focus: prove the app’s “must-not-break” flow works with real DB writes and capacity rules.
- Backend skeleton
  - Set up FastAPI app, Mongo connection, env config, CORS.
  - Define collections: `events`, `registrations`.
  - Implement endpoints:
    - `GET /api/events?skill_level=&date_from=&date_to=`
    - `GET /api/events/{id}`
    - `POST /api/events/{id}/register` (validates waiver, increments capacity atomically)
  - Seed 6–8 sample events on startup.
  - Add server-side validation + clear error states (sold out, waiver missing, invalid email).
- Minimal POC UI (single route is fine)
  - Events list with basic filter + link to detail.
  - Event detail with registration form (name, email, dog info, experience level, waiver checkbox) + success/failure states.
- POC testing (must pass before Phase 2)
  - Manual E2E: register until capacity reached; verify no overbooking; verify `registered_count` updates.
  - Verify refresh shows consistent counts; verify bad inputs return useful messages.

**POC User Stories (must pass):**
1. As a visitor, I can view a list of upcoming events fetched from the backend.
2. As a visitor, I can filter events by skill level and see results update.
3. As a visitor, I can open an event detail page and see all event info + remaining spots.
4. As a visitor, I can register for an event with my dog details and a waiver checkbox.
5. As a visitor, I cannot register for a sold-out event and I see a clear sold-out message.

---

### Phase 2: V1 App Development (Full Site + Polished UX)
Build the full multi-page site around the proven core flow.
- Backend (complete MVP APIs)
  - Keep Phase 1 endpoints; add collections + endpoints:
    - `POST /api/newsletter` → `newsletter_subscribers`
    - `POST /api/contact` → `contact_messages`
  - Add duplicate protections (newsletter email unique; optional event registration duplicate check by email+event).
  - Add pagination-ready response shapes for events (even if simple now).
- Frontend (React + Router)
  - App shell: responsive navbar + footer; mobile hamburger.
  - Styling system: Inter font, palette (Sky Blue #4A90D9, Grass Green #4CAF50, Orange #FF8C00), card-based layout, rounded buttons.
  - Pages:
    - `/` Homepage: hero + tagline, 3 icon blocks, upcoming events preview, training preview CTA, simple community highlights gallery (stock), newsletter signup.
    - `/events` Events list with filters; event cards; route to detail.
    - `/events/:id` Event detail with registration form and capacity display.
    - `/training` Guide + FAQ sections (accordion).
    - `/about` Mission + founder placeholder + vision.
    - `/contact` Contact form + volunteer checkbox + Instagram placeholder link.
  - Form UX
    - Client validation, loading states, inline errors, success confirmations.
  - Use stock images (local references or direct Unsplash URLs) consistently.
- Conclude Phase 2 with 1 full E2E test run (testing agent) across primary flows.

**V1 User Stories:**
1. As a visitor, I can navigate between Home, Events, Training, About, and Contact via a responsive navbar.
2. As a visitor, I can register for an event and immediately see a confirmation state.
3. As a visitor, I can see remaining capacity/spots on event pages.
4. As a visitor, I can sign up for the newsletter and get a success message.
5. As a visitor, I can submit a contact message with optional volunteer interest.

---

### Phase 3: Hardening + Quality Improvements
Make the MVP more resilient and consistent without adding major scope.
- Backend hardening
  - Ensure atomic capacity updates (single DB operation) and consistent error codes.
  - Add indexes: events date, registrations (event_id, email), newsletter email unique.
  - Add basic rate limiting or simple anti-spam measures (lightweight).
- Frontend improvements
  - Better empty states (no events found), skeleton loaders, improved accessibility.
  - Extract reusable components (EventCard, NewsletterForm, FormField, PageHeader).
- Testing
  - Run testing agent again; fix regressions.

**Hardening User Stories:**
1. As a visitor, I see helpful empty states when no events match my filters.
2. As a visitor, I can’t accidentally submit the same form twice due to loading locks.
3. As a visitor on mobile, all pages remain readable and usable without layout breaking.
4. As a visitor, I get clear error feedback if the server rejects my submission.
5. As a visitor, page loads and transitions feel fast and consistent.

---

### Phase 4: Optional Enhancements (Only if requested)
- Add photo upload for community gallery (would introduce file storage decisions).
- Add admin dashboard + auth (explicit approval needed; impacts testing).
- Add richer events (multi-day, waitlist, recurring).

## Next Actions
1. Confirm copy placeholders: Instagram URL (or keep placeholder), contact email target text, and event locations wording (no maps).
2. Implement Phase 1 POC: backend endpoints + seed events + minimal UI for registration and capacity.
3. Validate POC capacity behavior (no overbooking) and form validation.
4. Proceed to Phase 2 full site build + run one E2E testing pass.

## Success Criteria
- Core flow works end-to-end: browse/filter events → view detail → register with waiver → capacity updates and blocks at limit.
- Newsletter signup and contact form store data successfully in MongoDB.
- All 5 pages exist, are mobile-first, and match the provided palette and tone.
- Clear UX states: loading, success, errors, sold-out.
- One full E2E test run passes for all V1 user stories with no critical bugs.
