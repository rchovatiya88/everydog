import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PHOTOS } from "@/data/events";
import {
  Heart,
  Users,
  MapPin,
  ArrowRight,
  Star,
  Target,
  Eye,
  Disc,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <section className="hero-bg section-spacing">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                About
                <br />
                <span className="text-[#0B74B5]">EveryDog League</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg mb-6 leading-relaxed">
                We&apos;re a community-first disc dog organization based in Dallas, Texas. Our mission is simple: make disc dog fun accessible to every dog and every owner, regardless of breed, size, or skill level.
              </p>
              <Link to="/events">
                <Button className="rounded-[12px] bg-[#0B74B5] text-white h-12 px-6 text-base hover:bg-[#095d91]">
                  Join Our Next Event <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="rounded-[20px] overflow-hidden shadow-lg border border-border">
              <img
                src={PHOTOS.fallFest3}
                alt="EveryDog League Fall Festival action shot"
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
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#E7F4FD] flex items-center justify-center mx-auto mb-6">
              <Heart className="w-7 h-7 text-[#0B74B5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
              EveryDog League was created to build a welcoming, inclusive disc dog community in Dallas. We believe that every dog - regardless of breed, size, age, or background - deserves the chance to play, compete, and have fun with their humans.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Too many dog sports feel exclusive or intimidating. We&apos;re changing that. No fancy equipment needed. No breed restrictions. No judgment. Just dogs, discs, and a whole lot of community spirit.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Users,
                iconBg: "bg-[#E7F4FD]",
                iconColor: "text-[#0B74B5]",
                title: "Inclusivity",
                desc: "Small dogs, pitbulls, rescues, seniors - all dogs are welcome and celebrated.",
              },
              {
                icon: Heart,
                iconBg: "bg-[#FFE9D6]",
                iconColor: "text-[#CC6E22]",
                title: "Safety First",
                desc: "We prioritize the health and safety of every dog at every event we host.",
              },
              {
                icon: Star,
                iconBg: "bg-[#EAF7EF]",
                iconColor: "text-[#1F7A4A]",
                title: "Positive Community",
                desc: "No negativity. No judgment. Just support, encouragement, and fun.",
              },
              {
                icon: Target,
                iconBg: "bg-[#F3F0FF]",
                iconColor: "text-[#4A3B8F]",
                title: "Empowerment",
                desc: "We empower dog parents with skills and confidence to enjoy disc dog.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-[20px] border-border shadow-sm h-full">
                <CardContent className="p-5">
                  <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <Card className="rounded-[20px] border-border shadow-md overflow-hidden">
              <CardContent className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E7F4FD] to-[#EAF7EF] flex items-center justify-center flex-shrink-0">
                    <Disc className="w-10 h-10 text-[#0B74B5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">Our Founder&apos;s Story</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      EveryDog League started from a simple observation: dog sports in Dallas weren&apos;t welcoming enough. Too many breed restrictions, too much emphasis on perfection, and not enough focus on fun. We set out to change that - one disc, one dog, one community at a time.
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                      What started as informal meetups at Flag Pole Hill has grown into a movement. Today, we host monthly events, free training sessions, and friendly competitions that bring Dallas dog owners together.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF7EF] flex items-center justify-center mx-auto mb-6">
              <Eye className="w-7 h-7 text-[#1F7A4A]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-6">
              We see a future where disc dog is the most accessible, inclusive dog sport in Texas. Starting in Dallas, we plan to expand to Fort Worth, Austin, and San Antonio - building communities in every city where dogs and their humans can come together.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#E7F4FD] text-[#0B74B5] border border-[#CDEBFA]">
                <MapPin className="w-3.5 h-3.5 mr-1.5" /> Dallas
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground border border-border">
                Fort Worth (Coming Soon)
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground border border-border">
                Austin (Coming Soon)
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
