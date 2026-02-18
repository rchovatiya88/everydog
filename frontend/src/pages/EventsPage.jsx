import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { CalendarDays, MapPin, Users, ArrowRight, Search } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillFilter, setSkillFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("soonest");

  useEffect(() => {
    fetchEvents();
  }, [skillFilter, sortOrder]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (skillFilter !== "All") params.append("skill_level", skillFilter);
      params.append("sort", sortOrder);
      const res = await axios.get(`${API}/events?${params.toString()}`);
      setEvents(res.data.events);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

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
            <Select value={skillFilter} onValueChange={setSkillFilter} data-testid="events-skill-filter-select">
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
            <Select value={sortOrder} onValueChange={setSortOrder} data-testid="events-sort-select">
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="rounded-[20px] border-border overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-4 bg-muted rounded animate-pulse mb-3 w-3/4" />
                  <div className="h-3 bg-muted rounded animate-pulse mb-2 w-1/2" />
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events.length === 0 ? (
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
                      {event.registered_count >= event.capacity && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-base font-semibold mb-3 line-clamp-1">{event.title}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="font-display font-medium text-foreground">
                            {event.registered_count >= event.capacity
                              ? "No spots remaining"
                              : `${event.capacity - event.registered_count} of ${event.capacity} spots left`}
                          </span>
                        </div>
                      </div>
                      <Button
                        className={`w-full mt-4 rounded-[12px] h-10 ${
                          event.registered_count >= event.capacity
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-[#0B74B5] text-white hover:bg-[#095d91]"
                        }`}
                        disabled={event.registered_count >= event.capacity}
                        data-testid={`event-card-register-button-${i}`}
                        onClick={(e) => e.preventDefault()}
                      >
                        {event.registered_count >= event.capacity ? "Sold Out" : "Register"}
                        {event.registered_count < event.capacity && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
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
