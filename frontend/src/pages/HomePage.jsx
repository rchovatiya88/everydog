import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { EVENTS, GALLERY_IMAGES, PHOTOS } from "@/data/events";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import {
  Dog,
  CalendarDays,
  Trophy,
  ArrowRight,
  MapPin,
  Users,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = "" }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function getSkillBadgeClass(level) {
  switch (level) {
    case "Beginner": return "badge-beginner";
    case "Intermediate": return "badge-intermediate";
    case "Advanced": return "badge-advanced";
    case "Open": return "badge-open";
    default: return "badge-beginner";
  }
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const previewEvents = useMemo(() => EVENTS.slice(0, 3), []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    try {
      const result = await submitToGoogleSheets("newsletter", { email });
      if (result.success) {
        toast.success(result.message);
        setNewsletterSubmitted(true);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="hero-bg section-spacing overflow-hidden" data-testid="hero-section">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="badge-beginner mb-4 text-xs px-3 py-1 rounded-full">
                <MapPin className="w-3 h-3 mr-1" /> Dallas, Texas
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight mb-4">
                Every Dog Gets
                <br />
                <span className="text-[#0B74B5]">to Fly.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Fun, inclusive disc events for every breed in Dallas. Big dogs. Small dogs. Rescue dogs. <strong>All dogs.</strong>
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/events">
                  <Button className="rounded-[12px] bg-[#0B74B5] text-white h-12 px-6 text-base hover:bg-[#095d91] shadow-sm hover:shadow-md" data-testid="hero-view-events-btn">
                    View Events <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/training">
                  <Button variant="outline" className="rounded-[12px] h-12 px-6 text-base border-border hover:bg-[#E7F4FD]/50" data-testid="hero-free-training-btn">
                    Free Training
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-[20px] overflow-hidden shadow-lg border border-border">
                <img src={PHOTOS.hero} alt="Dog catching disc mid-air at EveryDog League" className="w-full h-[320px] sm:h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-md border border-border p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAF7EF] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#1F7A4A]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">All Breeds Welcome</p>
                  <p className="text-[10px] text-muted-foreground">No experience needed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE'RE ABOUT ============ */}
      <section className="section-spacing bg-white" data-testid="about-section">
        <div className="container-main">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">What We're About</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">A community built on fun, inclusivity, and the joy of watching dogs fly.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {[
                { icon: Dog, iconBg: "bg-[#E7F4FD]", iconColor: "text-[#0B74B5]", title: "All Breeds Welcome", desc: "Pitbulls, small dogs, rescues, seniors — everyone belongs here. No breed restrictions, ever." },
                { icon: Sparkles, iconBg: "bg-[#EAF7EF]", iconColor: "text-[#1F7A4A]", title: "Free Beginner Training", desc: "We teach you how to safely train your dog to catch. No experience needed, just enthusiasm." },
                { icon: Trophy, iconBg: "bg-[#FFE9D6]", iconColor: "text-[#CC6E22]", title: "Fun Challenges & Prizes", desc: "Friendly competitions with awards and giveaways. Every dog is a winner in our book." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="rounded-[20px] border-border shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                    <CardContent className="p-5 sm:p-6">
                      <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center mb-4`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ UPCOMING EVENTS ============ */}
      <section className="section-spacing" data-testid="events-preview-section">
        <div className="container-main">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">Upcoming Events</h2>
                <p className="text-muted-foreground">Join us at a Dallas park near you.</p>
              </div>
              <Link to="/events">
                <Button variant="ghost" className="text-[#0B74B5] hover:bg-[#E7F4FD]/50 rounded-[12px]" data-testid="view-all-events-btn">
                  View all events <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {previewEvents.map((event, i) => (
                <motion.div key={event.id} variants={fadeUp}>
                  <Link to={`/events/${event.id}`}>
                    <Card className="rounded-[20px] border-border overflow-hidden event-card-hover cursor-pointer h-full">
                      <div className="relative">
                        <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getSkillBadgeClass(event.skill_level)}`}>{event.skill_level}</span>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-display text-base font-semibold mb-2 line-clamp-1">{event.title}</h3>
                        <div className="space-y-1.5 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5 flex-shrink-0" /><span>{new Date(event.date + "T00:00:00").toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span></div>
                          <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 flex-shrink-0" /><span className="line-clamp-1">{event.location}</span></div>
                          <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 flex-shrink-0" /><span className="font-display font-medium text-foreground">{event.capacity - event.registered_count} spots left</span></div>
                        </div>
                        <div className="mt-4"><span className="inline-flex items-center justify-center w-full rounded-[12px] bg-[#0B74B5] text-white h-10 text-sm font-medium">Register</span></div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ FREE TRAINING PREVIEW ============ */}
      <section className="section-spacing bg-white" data-testid="training-preview-section">
        <div className="container-main">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div variants={fadeUp}>
                <div className="rounded-[20px] overflow-hidden shadow-md border border-border">
                  <img src={PHOTOS.smallDog} alt="Small dog training with disc at EveryDog League" className="w-full h-[280px] sm:h-[340px] object-cover" />
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Badge className="badge-beginner mb-4 text-xs px-3 py-1 rounded-full"><Sparkles className="w-3 h-3 mr-1" /> Free for everyone</Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">New to Disc? We'll Teach You.</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">Our free beginner training covers everything from safe throwing techniques to building your dog's confidence with the disc. No experience required — just bring your pup and a positive attitude.</p>
                <ul className="space-y-3 mb-6">
                  {["Beginner intro sessions every month", "Safety-first approach to training", "One-on-one guidance from experienced trainers", "All equipment provided"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-[#1F7A4A] mt-0.5 flex-shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <Link to="/training">
                  <Button className="rounded-[12px] bg-[#1F7A4A] text-white h-11 px-6 hover:bg-[#175d38] shadow-sm" data-testid="training-cta-btn">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ COMMUNITY HIGHLIGHTS ============ */}
      <section className="section-spacing" data-testid="community-section">
        <div className="container-main">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Community Highlights</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">See what the EveryDog community is all about.</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {GALLERY_IMAGES.map((img, i) => (
                <motion.div key={i} variants={fadeUp} className="gallery-item rounded-[18px] overflow-hidden border border-border shadow-sm">
                  <img src={img.url} alt={img.alt} className="w-full h-40 sm:h-52 md:h-56 object-cover" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="section-spacing bg-white" data-testid="newsletter-section">
        <div className="container-main">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <Card className="rounded-[20px] border-border shadow-md overflow-hidden">
                <CardContent className="p-6 sm:p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFE9D6] flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-[#CC6E22]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Stay in the Loop</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">Get updates on events, training sessions, and community news. No spam, just good vibes and flying discs.</p>
                  {newsletterSubmitted ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#EAF7EF] flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#1F7A4A]" />
                      </div>
                      <p className="text-sm font-medium text-[#1F7A4A]" data-testid="newsletter-success-message">Welcome to the pack! You're subscribed.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 rounded-[12px] bg-white flex-1"
                        data-testid="newsletter-email-input"
                      />
                      <Button
                        type="submit"
                        disabled={subscribing}
                        className="rounded-[12px] bg-[#FF8A2A] text-white h-11 px-6 hover:bg-[#e67a1f] shadow-sm whitespace-nowrap"
                        data-testid="newsletter-submit-button"
                      >
                        {subscribing ? "Joining..." : "Join the Pack"}
                      </Button>
                    </form>
                  )}
                  <p className="text-xs text-muted-foreground mt-3">We respect your inbox. Unsubscribe anytime.</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
