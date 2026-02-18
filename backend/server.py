from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'everydog_league')]

# Create the main app
app = FastAPI(title="EveryDog League API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class EventModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    date: str
    time: str
    location: str
    description: str
    skill_level: str  # Beginner, Intermediate, Advanced, Open
    capacity: int
    registered_count: int = 0
    what_to_bring: List[str] = []
    image_url: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class RegistrationCreate(BaseModel):
    name: str
    email: str
    dog_name: str
    dog_breed: str
    dog_size: str  # Small, Medium, Large
    experience_level: str  # Beginner, Intermediate, Advanced
    waiver_signed: bool

class RegistrationModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    name: str
    email: str
    dog_name: str
    dog_breed: str
    dog_size: str
    experience_level: str
    waiver_signed: bool
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class NewsletterCreate(BaseModel):
    email: str

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str
    volunteer_interest: bool = False

# ============ SEED DATA ============

SEED_EVENTS = [
    {
        "id": "evt-001",
        "title": "Beginner Disc Dog Meetup",
        "date": "2025-08-15",
        "time": "9:00 AM - 11:00 AM",
        "location": "Flag Pole Hill Park, Dallas",
        "description": "Perfect for first-timers! Learn the basics of disc dog in a fun, supportive environment. We'll cover safe throwing techniques, how to get your dog interested in the disc, and basic catches. All breeds and sizes welcome — from Chihuahuas to Great Danes!",
        "skill_level": "Beginner",
        "capacity": 30,
        "registered_count": 12,
        "what_to_bring": ["Water for you and your dog", "A soft disc (we have extras!)", "Treats", "Leash", "Shade tent (optional)"],
        "image_url": "https://images.unsplash.com/photo-1763989979148-c3d0c0c7edb6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxkb2clMjBjYXRjaGluZyUyMGZyaXNiZWUlMjBkaXNjJTIwb3V0ZG9vciUyMHBhcmt8ZW58MHx8fHwxNzcxNDQyNjk5fDA&ixlib=rb-4.1.0&q=85",
        "created_at": "2025-06-01T00:00:00+00:00"
    },
    {
        "id": "evt-002",
        "title": "Open Freestyle Jam Session",
        "date": "2025-08-22",
        "time": "8:00 AM - 10:30 AM",
        "location": "White Rock Lake Park, Dallas",
        "description": "An open freestyle session for all skill levels. Show off your tricks, learn from experienced throwers, and enjoy the community vibes. Music, good energy, and flying discs — what more could you want?",
        "skill_level": "Open",
        "capacity": 40,
        "registered_count": 25,
        "what_to_bring": ["Multiple discs", "Water and bowl", "Camera for action shots", "Good vibes"],
        "image_url": "https://images.unsplash.com/photo-1763989979285-d86a24b5ff06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHw0fHxkb2clMjBjYXRjaGluZyUyMGZyaXNiZWUlMjBkaXNjJTIwb3V0ZG9vciUyMHBhcmt8ZW58MHx8fHwxNzcxNDQyNjk5fDA&ixlib=rb-4.1.0&q=85",
        "created_at": "2025-06-01T00:00:00+00:00"
    },
    {
        "id": "evt-003",
        "title": "Small Dog Spotlight",
        "date": "2025-08-29",
        "time": "9:30 AM - 11:30 AM",
        "location": "Reverchon Park, Dallas",
        "description": "A special event celebrating our small dogs! Mini discs, shorter throws, and activities designed specifically for dogs under 25 lbs. Prove that small dogs can fly just as high. Prizes for the best catches!",
        "skill_level": "Beginner",
        "capacity": 25,
        "registered_count": 8,
        "what_to_bring": ["Mini soft disc", "Water", "Treats", "Your awesome small dog"],
        "image_url": "https://images.unsplash.com/photo-1761959939998-aae193908c11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZ3MlMjBwbGF5aW5nJTIwb3V0ZG9vciUyMGRpdmVyc2UlMjBicmVlZHN8ZW58MHx8fHwxNzcxNDQyNzAxfDA&ixlib=rb-4.1.0&q=85",
        "created_at": "2025-06-01T00:00:00+00:00"
    },
    {
        "id": "evt-004",
        "title": "Intermediate Skills Workshop",
        "date": "2025-09-05",
        "time": "8:00 AM - 10:00 AM",
        "location": "Klyde Warren Park, Dallas",
        "description": "Ready to take it to the next level? This workshop covers advanced catching techniques, distance throws, and trick combos. Your dog should already be comfortable with basic disc catches. Trainers on hand to help!",
        "skill_level": "Intermediate",
        "capacity": 20,
        "registered_count": 15,
        "what_to_bring": ["Competition-grade discs", "Water", "High-value treats", "Athletic shoes"],
        "image_url": "https://images.pexels.com/photos/13042608/pexels-photo-13042608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "created_at": "2025-06-01T00:00:00+00:00"
    },
    {
        "id": "evt-005",
        "title": "Rescue Dog Welcome Day",
        "date": "2025-09-12",
        "time": "10:00 AM - 12:00 PM",
        "location": "Trinity River Audubon Center, Dallas",
        "description": "Adopted a rescue? This event is for you! We partner with local shelters to welcome rescue dogs into the disc community. Patient trainers, gentle introductions, and a whole lot of love. Every rescue deserves to fly.",
        "skill_level": "Beginner",
        "capacity": 35,
        "registered_count": 10,
        "what_to_bring": ["Soft disc", "Extra patience", "Water and shade", "Your rescue's favorite toy"],
        "image_url": "https://images.unsplash.com/photo-1597595735637-05a49627ee29?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwyfHxoYXBweSUyMGRvZ3MlMjBwbGF5aW5nJTIwb3V0ZG9vciUyMGRpdmVyc2UlMjBicmVlZHN8ZW58MHx8fHwxNzcxNDQyNzAxfDA&ixlib=rb-4.1.0&q=85",
        "created_at": "2025-06-01T00:00:00+00:00"
    },
    {
        "id": "evt-006",
        "title": "Advanced Freestyle Competition",
        "date": "2025-09-20",
        "time": "7:30 AM - 11:00 AM",
        "location": "Lake Highlands Park, Dallas",
        "description": "Our first official freestyle competition! Compete in categories: Distance, Accuracy, and Freestyle Routine. Open to experienced teams who've been training together. Ribbons, prizes, and bragging rights for the winners!",
        "skill_level": "Advanced",
        "capacity": 15,
        "registered_count": 11,
        "what_to_bring": ["Competition discs (3+)", "Water and cooling vest", "First aid kit", "Music for freestyle routine"],
        "image_url": "https://images.pexels.com/photos/6527910/pexels-photo-6527910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "created_at": "2025-06-01T00:00:00+00:00"
    },
    {
        "id": "evt-007",
        "title": "Family Fun Disc Day",
        "date": "2025-09-27",
        "time": "9:00 AM - 12:00 PM",
        "location": "Bachman Lake Park, Dallas",
        "description": "Bring the whole family! Fun games, relay races, and disc activities for kids and dogs together. Food trucks, face painting, and disc dog demos. A community celebration of dogs and their humans!",
        "skill_level": "Open",
        "capacity": 50,
        "registered_count": 20,
        "what_to_bring": ["Blankets and chairs", "Sunscreen", "Water for everyone", "Discs (we have extras)", "Good appetite for food trucks"],
        "image_url": "https://images.unsplash.com/photo-1758543535665-ca0c1c64d9d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHxoYXBweSUyMGRvZ3MlMjBwbGF5aW5nJTIwb3V0ZG9vciUyMGRpdmVyc2UlMjBicmVlZHN8ZW58MHx8fHwxNzcxNDQyNzAxfDA&ixlib=rb-4.1.0&q=85",
        "created_at": "2025-06-01T00:00:00+00:00"
    }
]

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "EveryDog League API"}

# --- Events ---

@api_router.get("/events")
async def get_events(skill_level: Optional[str] = None, sort: Optional[str] = "soonest"):
    query = {}
    if skill_level and skill_level != "All":
        query["skill_level"] = skill_level
    
    sort_order = 1 if sort == "soonest" else -1
    events = await db.events.find(query, {"_id": 0}).sort("date", sort_order).to_list(100)
    return {"events": events}

@api_router.get("/events/{event_id}")
async def get_event(event_id: str):
    event = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# --- Event Registration ---

@api_router.post("/events/{event_id}/register")
async def register_for_event(event_id: str, registration: RegistrationCreate):
    # Validate waiver
    if not registration.waiver_signed:
        raise HTTPException(status_code=400, detail="You must agree to the safety waiver to register.")
    
    # Check event exists
    event = await db.events.find_one({"id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Check capacity
    if event.get("registered_count", 0) >= event.get("capacity", 0):
        raise HTTPException(status_code=400, detail="Sorry, this event is sold out!")
    
    # Check duplicate registration
    existing = await db.registrations.find_one({"event_id": event_id, "email": registration.email})
    if existing:
        raise HTTPException(status_code=400, detail="You're already registered for this event!")
    
    # Create registration
    reg = RegistrationModel(
        event_id=event_id,
        **registration.model_dump()
    )
    await db.registrations.insert_one(reg.model_dump())
    
    # Atomically increment registered_count
    await db.events.update_one(
        {"id": event_id},
        {"$inc": {"registered_count": 1}}
    )
    
    return {"message": "Registration successful! See you there!", "registration_id": reg.id}

# --- Newsletter ---

@api_router.post("/newsletter")
async def subscribe_newsletter(data: NewsletterCreate):
    # Check duplicate
    existing = await db.newsletter_subscribers.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="You're already subscribed!")
    
    doc = {
        "id": str(uuid.uuid4()),
        "email": data.email,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.newsletter_subscribers.insert_one(doc)
    return {"message": "Welcome to the pack! You're now subscribed."}

# --- Contact ---

@api_router.post("/contact")
async def submit_contact(data: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "message": data.message,
        "volunteer_interest": data.volunteer_interest,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contact_messages.insert_one(doc)
    return {"message": "Thanks for reaching out! We'll get back to you soon."}

# ============ SEED ============

async def seed_events():
    count = await db.events.count_documents({})
    if count == 0:
        logger.info("Seeding events...")
        for event in SEED_EVENTS:
            await db.events.insert_one(event)
        logger.info(f"Seeded {len(SEED_EVENTS)} events")
    else:
        logger.info(f"Events collection already has {count} documents, skipping seed")

@app.on_event("startup")
async def startup():
    await seed_events()
    # Create indexes
    await db.events.create_index("id", unique=True)
    await db.events.create_index("skill_level")
    await db.events.create_index("date")
    await db.registrations.create_index([("event_id", 1), ("email", 1)], unique=True)
    await db.newsletter_subscribers.create_index("email", unique=True)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
