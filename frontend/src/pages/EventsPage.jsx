import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFilteredEvents } from "@/data/events";
import { CalendarDays, MapPin, Users, ArrowRight, Search } from "lucide-react";

function getSkillBadgeClass(level) {
  switch (level) {
    case "Beginner": return "badge-beginner";
    case "Intermediate": return "badge-intermediate";
    case "Advanced": return "badge-advanced";
    case "Open": return "badge-open";
    default: return "badge-beginner";
  }
}

export default function EventsPage() {
  const [skillFilter, setSkillFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("soonest");

  const events = useMemo(
    () => getFilteredEvents(skillFilter, sortOrder),
    [skillFilter, sortOrder]
  );

  return (
    <div className="section-spacing">
      <div className="container-main">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
            Upcoming Events
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Find a disc dog event near you in Dallas. All breeds and skill levels welcome.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-8 p-4 bg-white rounded-[16px] border border-border shadow-sm"
        >
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Skill Level</label>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="h-11 rounded-[12px] bg-white" data-testid="events-skill-filter-select">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Sort By</label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="h-11 rounded-[12px] bg-white" data-testid="events-sort-select">
                <SelectValue placeholder="Soonest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soonest">Soonest First</SelectItem>
                <SelectItem value="latest">Latest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              No events match your filters. Try changing the skill level or check back soon!
            </p>
            <Button
              variant="outline"
              onClick={() => { setSkillFilter("All"); setSortOrder("soonest"); }}
              className="rounded-[12px]"
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link to={`/events/${event.id}`}>
                  <Card className="rounded-[20px] border-border overflow-hidden event-card-hover cursor-pointer h-full">
                    <div className="relative">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getSkillBadgeClass(event.skill_level)}`}>
                          {event.skill_level}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-base font-semibold mb-3 line-clamp-1">{event.title}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{new Date(event.date + "T00:00:00").toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="font-display font-medium text-foreground">
                            {event.capacity - event.registered_count} of {event.capacity} spots left
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="inline-flex items-center justify-center w-full rounded-[12px] bg-[#0B74B5] text-white h-10 text-sm font-medium">
                          Register <ArrowRight className="w-4 h-4 ml-2" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
