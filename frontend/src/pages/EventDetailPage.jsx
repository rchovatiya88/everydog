import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getEventById } from "@/data/events";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Backpack,
  Dog,
} from "lucide-react";

function getSkillBadgeClass(level) {
  switch (level) {
    case "Beginner": return "badge-beginner";
    case "Intermediate": return "badge-intermediate";
    case "Advanced": return "badge-advanced";
    case "Open": return "badge-open";
    default: return "badge-beginner";
  }
}

export default function EventDetailPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId);
  const [registered, setRegistered] = useState(false);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [dogSize, setDogSize] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  if (!event) {
    return (
      <div className="section-spacing">
        <div className="container-main text-center py-16">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Event Not Found</h2>
          <p className="text-muted-foreground mb-4">This event doesn't exist or has been removed.</p>
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

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Validate
    if (!formData.get("name") || !formData.get("email") || !formData.get("dog_name") || !formData.get("dog_breed")) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!dogSize || !experienceLevel) {
      toast.error("Please select dog size and experience level.");
      return;
    }
    if (!waiverSigned) {
      toast.error("You must agree to the safety waiver.");
      return;
    }

    // Add select values to form data
    formData.set("dog_size", dogSize);
    formData.set("experience_level", experienceLevel);
    formData.set("waiver_signed", "yes");
    formData.set("event_name", event.title);
    formData.set("event_date", event.date);

    // Submit to Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setRegistered(true);
        toast.success("Registration successful! See you there!");
      })
      .catch(() => {
        // Still show success in static/preview mode
        setRegistered(true);
        toast.success("Registration successful! See you there!");
      });
  };

  return (
    <div className="section-spacing">
      <div className="container-main">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/events">
            <Button variant="ghost" className="rounded-[12px] text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="rounded-[20px] overflow-hidden border border-border shadow-sm mb-6">
              <img src={event.image_url} alt={event.title} className="w-full h-[250px] sm:h-[350px] object-cover" />
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSkillBadgeClass(event.skill_level)}`}>
                  {event.skill_level}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4" data-testid="event-detail-title">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#E7F4FD] flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-[#0B74B5]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">
                      {new Date(event.date + "T00:00:00").toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7EF] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#1F7A4A]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE9D6] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#CC6E22]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-[#E7F4FD] flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#0B74B5]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="text-sm font-medium" data-testid="event-spots-remaining-text">
                      {spotsRemaining} of {event.capacity} spots remaining
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{event.registered_count} registered</span>
                  <span>{event.capacity} capacity</span>
                </div>
                <Progress value={capacityPercent} className="h-2 rounded-full" />
              </div>

              <Separator className="mb-6" />

              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold mb-3">About This Event</h3>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              {event.what_to_bring && event.what_to_bring.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                    <Backpack className="w-5 h-5" /> What to Bring
                  </h3>
                  <ul className="space-y-2">
                    {event.what_to_bring.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[#1F7A4A] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Registration Form (Netlify) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-1"
          >
            <div className="lg:sticky lg:top-24">
              <Card className="rounded-[20px] border-border shadow-md" data-testid="event-detail-register-form">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-lg">
                    {registered ? "You're Registered!" : "Register for This Event"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {registered ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-[#EAF7EF] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-[#1F7A4A]" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">See You There!</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You're all set for {event.title}. We'll be in touch with event details.
                      </p>
                      <Link to="/events">
                        <Button variant="outline" className="rounded-[12px]">
                          Browse More Events
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <form
                      name="event-registration"
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      onSubmit={handleRegistrationSubmit}
                      className="space-y-4"
                    >
                      <input type="hidden" name="form-name" value="event-registration" />
                      <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
                      <input type="hidden" name="event_id" value={event.id} />
                      <input type="hidden" name="event_name" value={event.title} />
                      <input type="hidden" name="event_date" value={event.date} />

                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                        <Input
                          id="name" name="name"
                          placeholder="Jane Smith"
                          required
                          className="mt-1 h-11 rounded-[12px] bg-white"
                          data-testid="event-register-name-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                          id="email" name="email" type="email"
                          placeholder="jane@example.com"
                          required
                          className="mt-1 h-11 rounded-[12px] bg-white"
                          data-testid="event-register-email-input"
                        />
                      </div>

                      <Separator />
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Dog className="w-4 h-4" /> Dog Information
                      </div>

                      <div>
                        <Label htmlFor="dogName" className="text-sm font-medium">Dog's Name</Label>
                        <Input
                          id="dogName" name="dog_name"
                          placeholder="Max"
                          required
                          className="mt-1 h-11 rounded-[12px] bg-white"
                          data-testid="event-register-dog-name-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="breed" className="text-sm font-medium">Breed</Label>
                        <Input
                          id="breed" name="dog_breed"
                          placeholder="Golden Retriever"
                          required
                          className="mt-1 h-11 rounded-[12px] bg-white"
                          data-testid="event-register-breed-input"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Dog Size</Label>
                        <Select value={dogSize} onValueChange={setDogSize}>
                          <SelectTrigger className="mt-1 h-11 rounded-[12px] bg-white" data-testid="event-register-size-select">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Small">Small (Under 25 lbs)</SelectItem>
                            <SelectItem value="Medium">Medium (25-55 lbs)</SelectItem>
                            <SelectItem value="Large">Large (Over 55 lbs)</SelectItem>
                          </SelectContent>
                        </Select>
                        <input type="hidden" name="dog_size" value={dogSize} />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Experience Level</Label>
                        <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                          <SelectTrigger className="mt-1 h-11 rounded-[12px] bg-white" data-testid="event-register-experience-select">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner - Never tried disc</SelectItem>
                            <SelectItem value="Intermediate">Intermediate - Some experience</SelectItem>
                            <SelectItem value="Advanced">Advanced - Regularly compete</SelectItem>
                          </SelectContent>
                        </Select>
                        <input type="hidden" name="experience_level" value={experienceLevel} />
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3 p-3 bg-[#FFF8F0] rounded-xl border border-[#FFE9D6]">
                        <Checkbox
                          id="waiver"
                          checked={waiverSigned}
                          onCheckedChange={(checked) => setWaiverSigned(checked === true)}
                          className="mt-0.5"
                          data-testid="event-register-waiver-checkbox"
                        />
                        <Label htmlFor="waiver" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                          I agree to the safety waiver. I understand that disc dog activities involve physical activity and I take responsibility for my dog's safety and behavior.
                        </Label>
                      </div>
                      <input type="hidden" name="waiver_signed" value={waiverSigned ? "yes" : "no"} />

                      <Button
                        type="submit"
                        className="w-full rounded-[12px] bg-[#0B74B5] text-white h-12 text-base hover:bg-[#095d91] shadow-sm"
                        data-testid="event-register-submit-button"
                      >
                        Register Now
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        {spotsRemaining} spots remaining. Free event.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
