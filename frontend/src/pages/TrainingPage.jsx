import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PHOTOS } from "@/data/events";
import {
  AlertTriangle,
  Droplets,
  Shield,
  Heart,
  Dog,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function TrainingPage() {
  return (
    <div>
      <section className="hero-bg section-spacing" data-testid="training-hero">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <Badge className="badge-beginner mb-4 text-xs px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 mr-1" /> Free for everyone
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                New to Disc?
                <br />
                <span className="text-[#0B74B5]">We&apos;ll Teach You.</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg mb-6 leading-relaxed">
                Our free beginner training covers everything you need to start your disc dog journey. No experience required - just bring your pup.
              </p>
              <Link to="/events">
                <Button className="rounded-[12px] bg-[#0B74B5] text-white h-12 px-6 text-base hover:bg-[#095d91]">
                  Find a Training Session <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="rounded-[20px] overflow-hidden shadow-lg border border-border">
              <img
                src={PHOTOS.stPattys}
                alt="Handler and dog at EveryDog League St. Patty&apos;s Day event"
                className="w-full h-[300px] sm:h-[380px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">What Is Disc Dog Training?</h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              Disc dog (or &quot;frisbee dog&quot;) is a fun sport where you and your dog work as a team to catch flying discs. It&apos;s great exercise, builds an incredible bond, and is open to dogs of all shapes and sizes. Think of it as fetch - but way more exciting!
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing" data-testid="training-faq">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Common Questions</h2>
            <p className="text-muted-foreground">Everything you need to know before your first session.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {[
              {
                icon: Dog,
                iconColor: "text-[#0B74B5]",
                title: "Is My Dog Too Small?",
                body: "Absolutely not! Small dogs are amazing disc dogs. We use mini soft discs designed for smaller mouths, and shorter throwing distances. Chihuahuas, Yorkies, Dachshunds - they all love it. We've seen tiny dogs outjump dogs three times their size.",
              },
              {
                icon: Heart,
                iconColor: "text-[#CC6E22]",
                title: "Are Pitbulls Allowed?",
                body: "Yes, 100%! All breeds are welcome at EveryDog League. Pitbulls, bully breeds, and mixes are not only welcome but celebrated. Our community exists to break down breed stigma and prove that every dog deserves a chance to play and compete.",
              },
              {
                icon: Sparkles,
                iconColor: "text-[#1F7A4A]",
                title: "Is My Dog Too Old?",
                body: "Senior dogs can absolutely participate! We adapt activities based on your dog's ability. Low throws, gentle catches, and ground-rolling discs are all options. The goal is fun and enrichment, not competition.",
              },
              {
                icon: Target,
                iconColor: "text-[#0B74B5]",
                title: "Do I Need Experience?",
                body: "Not at all! Most of our members started with zero disc dog experience. Our beginner sessions walk you through everything step by step. We even provide discs if you don't have one.",
              },
            ].map((item) => (
              <details key={item.title} className="rounded-[16px] border border-border bg-white px-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display font-semibold text-base">
                  <span className="flex items-center gap-2">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                    {item.title}
                  </span>
                  <span className="text-muted-foreground">+</span>
                </summary>
                <p className="text-muted-foreground leading-relaxed pb-4">{item.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Safety First</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Your dog&apos;s health and safety is our top priority.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: AlertTriangle,
                iconBg: "bg-[#FFE9D6]",
                iconColor: "text-[#CC6E22]",
                title: "Warm-Up First",
                desc: "Always warm up your dog with a short walk before throwing. Cold muscles lead to injuries.",
              },
              {
                icon: Target,
                iconBg: "bg-[#E7F4FD]",
                iconColor: "text-[#0B74B5]",
                title: "Safe Distance",
                desc: "Start with short, low throws. Never throw over your dog's head height until they're experienced.",
              },
              {
                icon: Droplets,
                iconBg: "bg-[#EAF7EF]",
                iconColor: "text-[#1F7A4A]",
                title: "Stay Hydrated",
                desc: "Dallas heat is real. Bring plenty of water and take frequent shade breaks.",
              },
              {
                icon: Shield,
                iconBg: "bg-[#F3F0FF]",
                iconColor: "text-[#4A3B8F]",
                title: "Use Soft Discs",
                desc: "Always use soft, dog-safe discs. Regular frisbees can chip teeth and hurt gums.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-[20px] border-border shadow-sm h-full">
                <CardContent className="p-5">
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-display text-sm font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing" data-testid="beginner-guide">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Beginner Guide</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps to get your dog catching discs.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                step: 1,
                title: "Teach Focus",
                desc: "Start by getting your dog's attention with treats near the disc. Let them sniff it, lick it, and get comfortable. Reward any interest in the disc.",
                color: "bg-[#0B74B5]",
              },
              {
                step: 2,
                title: "Introduce the Disc",
                desc: "Roll the disc on the ground like a ball. Let your dog chase it and grab it. Reward them for picking it up. Don't throw it yet - just build excitement.",
                color: "bg-[#1F7A4A]",
              },
              {
                step: 3,
                title: "Short Toss",
                desc: "Start with gentle, low tosses just a few feet away. Aim for your dog's chest height. Celebrate every catch and every attempt. Keep sessions short - 5 to 10 minutes max.",
                color: "bg-[#FF8A2A]",
              },
              {
                step: 4,
                title: "Gradually Increase Distance",
                desc: "As your dog gets confident, slowly increase the distance. Focus on consistency over distance. A reliable 10-foot catch is better than a random 30-foot catch.",
                color: "bg-[#4A3B8F]",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 mb-6 last:mb-0">
                <div className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center flex-shrink-0 font-display font-bold text-lg`}>
                  {item.step}
                </div>
                <Card className="flex-1 rounded-[16px] border-border shadow-sm">
                  <CardContent className="p-5">
                    <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/events">
              <Button className="rounded-[12px] bg-[#0B74B5] text-white h-12 px-8 text-base hover:bg-[#095d91]">
                Find a Beginner Event <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
