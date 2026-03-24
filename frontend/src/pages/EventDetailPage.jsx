import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getEventById } from "@/data/events";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { saveRegistration } from "@/lib/registrations";
import {
  CalendarDays, MapPin, Clock, Users, ArrowLeft,
  CheckCircle2, AlertCircle, Backpack, Dog, Mail,
} from "lucide-react";

function getSkillBadgeClass(level) {
  switch (level) {
    case "Beginner":
      return "badge-beginner";
    case "Intermediate":
      return "badge-intermediate";
    case "Advanced":
      return "badge-advanced";
    case "Open":
      return "badge-open";
    default:
      return "badge-beginner";
  }
}

export default function EventDetailPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId);
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    dog_name: "",
    dog_breed: "",
    dog_size: "",
    experience_level: "",
    waiver_signed: false,
    selected_games: {},
  });

  if (!event) {
    return (
      <div className="section-spacing">
        <div className="container-main text-center py-16">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Event Not Found</h2>
          <p className="text-muted-foreground mb-4">This event doesn&apos;t exist or has been removed.</p>
          <Link to="/events">
            <Button className="rounded-[12px] bg-[#0B74B5] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const spotsRemaining = event.capacity - event.registered_count;
  const capacityPercent = (event.registered_count / event.capacity) * 100;
  const gamesList = event.games ? event.games.split(",").map(g => g.trim()).filter(Boolean) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.dog_name || !form.dog_breed || !form.dog_size || !form.experience_level) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!form.waiver_signed) {
      toast.error("You must agree to the safety waiver.");
      return;
    }
    if (!form.email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    setSubmitting(true);
    try {
      const registrationData = {
        ...form,
        selected_games: Object.keys(form.selected_games).filter(k => form.selected_games[k]).join(", "),
        event_id: event.id,
        event_name: event.title,
        event_date: event.date,
      };
      
      // Save locally for the Admin Dashboard
      saveRegistration(registrationData);
      
      // Also send to Google Sheets
      const result = await submitToGoogleSheets("registration", registrationData);
      if (result.success) {
        toast.success(result.message);
        setRegistered(true);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-spacing">
      <div className="container-main">
        <div className="mb-6">
          <Link to="/events">
            <Button variant="ghost" className="rounded-[12px] text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-[20px] overflow-hidden border border-border shadow-sm mb-6">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-[250px] sm:h-[350px] object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSkillBadgeClass(event.skill_level)}`}>
                  {event.skill_level}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4" data-testid="event-detail-title">{event.title}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#E7F4FD] flex items-center justify-center flex-shrink-0"><CalendarDays className="w-5 h-5 text-[#0B74B5]" /></div>
                  <div><p className="text-xs text-muted-foreground">Date</p><p className="text-sm font-medium">{new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7EF] flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-[#1F7A4A]" /></div>
                  <div><p className="text-xs text-muted-foreground">Time</p><p className="text-sm font-medium">{event.time}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE9D6] flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-[#CC6E22]" /></div>
                  <div><p className="text-xs text-muted-foreground">Location</p><p className="text-sm font-medium">{event.location}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#E7F4FD] flex items-center justify-center flex-shrink-0"><Users className="w-5 h-5 text-[#0B74B5]" /></div>
                  <div><p className="text-xs text-muted-foreground">Capacity</p><p className="text-sm font-medium" data-testid="event-spots-remaining-text">{spotsRemaining} of {event.capacity} spots remaining</p></div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>{event.registered_count} registered</span><span>{event.capacity} capacity</span></div>
                <Progress value={capacityPercent} className="h-2 rounded-full" />
              </div>
              <Separator className="mb-6" />
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold mb-3">About This Event</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{event.description}</p>
                {event.contact && (
                  <div className="mt-4 p-4 bg-[#F8FAFC] rounded-xl border border-border inline-block flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Contact: {event.contact}</span>
                  </div>
                )}
              </div>
              {event.what_to_bring && event.what_to_bring.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2"><Backpack className="w-5 h-5" /> What to Bring</h3>
                  <ul className="space-y-2">
                    {event.what_to_bring.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[#1F7A4A] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="rounded-[20px] border-border shadow-md" data-testid="event-detail-register-form">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-lg">{registered ? "You&apos;re Registered!" : "Register for This Event"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {registered ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-[#EAF7EF] flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-[#1F7A4A]" /></div>
                      <h3 className="text-lg font-semibold mb-2">See You There!</h3>
                      <p className="text-sm text-muted-foreground mb-4">You&apos;re all set for {event.title}. We&apos;ll be in touch with event details.</p>
                      <Link to="/events"><Button variant="outline" className="rounded-[12px]">Browse More Events</Button></Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" required className="mt-1 h-11 rounded-[12px] bg-white" data-testid="event-register-name-input" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" required className="mt-1 h-11 rounded-[12px] bg-white" data-testid="event-register-email-input" />
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><Dog className="w-4 h-4" /> Dog Information</div>
                      <div>
                        <Label htmlFor="dogName" className="text-sm font-medium">Dog&apos;s Name</Label>
                        <Input id="dogName" value={form.dog_name} onChange={(e) => setForm({ ...form, dog_name: e.target.value })} placeholder="Max" required className="mt-1 h-11 rounded-[12px] bg-white" data-testid="event-register-dog-name-input" />
                      </div>
                      <div>
                        <Label htmlFor="breed" className="text-sm font-medium">Breed</Label>
                        <Input id="breed" value={form.dog_breed} onChange={(e) => setForm({ ...form, dog_breed: e.target.value })} placeholder="Golden Retriever" required className="mt-1 h-11 rounded-[12px] bg-white" data-testid="event-register-breed-input" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium" htmlFor="dog-size">Dog Size</Label>
                        <select
                          id="dog-size"
                          value={form.dog_size}
                          onChange={(e) => setForm({ ...form, dog_size: e.target.value })}
                          className="mt-1 flex h-11 w-full rounded-[12px] border border-input bg-white px-3 text-sm shadow-sm"
                          data-testid="event-register-size-select"
                        >
                          <option value="">Select size</option>
                          <option value="Small">Small (Under 25 lbs)</option>
                          <option value="Medium">Medium (25-55 lbs)</option>
                          <option value="Large">Large (Over 55 lbs)</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium" htmlFor="experience-level">Experience Level</Label>
                        <select
                          id="experience-level"
                          value={form.experience_level}
                          onChange={(e) => setForm({ ...form, experience_level: e.target.value })}
                          className="mt-1 flex h-11 w-full rounded-[12px] border border-input bg-white px-3 text-sm shadow-sm"
                          data-testid="event-register-experience-select"
                        >
                          <option value="">Select experience</option>
                          <option value="Beginner">Beginner - Never tried disc</option>
                          <option value="Intermediate">Intermediate - Some experience</option>
                          <option value="Advanced">Advanced - Regularly compete</option>
                        </select>
                      </div>
                      
                      {gamesList.length > 0 && (
                        <>
                          <Separator />
                          <div className="flex items-center gap-2 text-sm font-medium text-foreground">Select Games</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            {gamesList.map(game => (
                              <div key={game} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`game-${game}`} 
                                  checked={!!form.selected_games[game]} 
                                  onCheckedChange={(checked) => setForm(prev => ({
                                    ...prev,
                                    selected_games: { ...prev.selected_games, [game]: checked }
                                  }))} 
                                />
                                <Label htmlFor={`game-${game}`} className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{game}</Label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      <Separator />
                      <div className="flex items-start gap-3 p-3 bg-[#FFF8F0] rounded-xl border border-[#FFE9D6]">
                        <Checkbox id="waiver" checked={form.waiver_signed} onCheckedChange={(checked) => setForm({ ...form, waiver_signed: checked === true })} className="mt-0.5" data-testid="event-register-waiver-checkbox" />
                        <Label htmlFor="waiver" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                          I agree to the safety waiver. I understand that disc dog activities involve physical activity and I take responsibility for my dog&apos;s safety and behavior.
                        </Label>
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full rounded-[12px] bg-[#0B74B5] text-white h-12 text-base hover:bg-[#095d91] shadow-sm" data-testid="event-register-submit-button">
                        {submitting ? "Registering..." : "Register Now"}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">{spotsRemaining} spots remaining. Free event.</p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
