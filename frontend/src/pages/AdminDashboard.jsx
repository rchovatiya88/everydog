import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getAllEvents, saveAdminEvent, updateAdminEvent, deleteAdminEvent, PHOTOS } from "@/data/events";
import { getRegistrationsForEvent } from "@/lib/registrations";
import { compressImage } from "@/lib/imageUtils";
import { 
  Users, CalendarPlus, LayoutDashboard, CalendarDays, 
  MapPin, CheckCircle2, ChevronRight, ArrowLeft, Upload,
  Trash2, Edit, Lock, LogOut, Download
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("everydog_admin_auth") === "true";
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard', 'create-event', 'registrations'
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: "Dog Disc Challenge",
    date: "2026-04-04",
    time: "8:00 AM - 2:00 PM",
    location: "Field #3 - 1440 Keller Springs Rd, Carrollton, TX 75006",
    description: "Point-Only Event • Perfect Practice Before UPDIF\nAll Breeds & Skill Levels Welcome!",
    skill_level: "Open",
    capacity: 150,
    games: "Four Way Play, Greedy, Spaced Out, Throw N Go, Time Warp",
    contact: "Sarah Owen | everydog.disc.club@gmail.com",
    image_url: "",
    what_to_bring: "Water, Leash, Treats, Soft disc"
  });
  const [isUploading, setIsUploading] = useState(false);

  const loadEvents = () => {
    setEvents(getAllEvents());
  };

  useEffect(() => {
    loadEvents();
    window.addEventListener("local-events-updated", loadEvents);
    window.addEventListener("local-registrations-updated", loadEvents);
    return () => {
      window.removeEventListener("local-events-updated", loadEvents);
      window.removeEventListener("local-registrations-updated", loadEvents);
    };
  }, []);

  const handleViewRegistrations = (event) => {
    setSelectedEvent(event);
    setRegistrations(getRegistrationsForEvent(event.id));
    setActiveTab("registrations");
  };

  const handleDownloadExcel = () => {
    if (registrations.length === 0) {
      toast.error("No registrations to download.");
      return;
    }
    
    const headers = ["Name", "Email", "Dog Name", "Dog Breed", "Dog Size", "Experience Level", "Games", "Waiver Signed", "Registered At"];
    const rows = registrations.map(reg => [
      reg.name || "",
      reg.email || "",
      reg.dog_name || "",
      reg.dog_breed || "",
      reg.dog_size || "",
      reg.experience_level || "",
      reg.selected_games || "",
      reg.waiver_signed ? "Yes" : "No",
      new Date(reg.registered_at).toLocaleString()
    ]);
    
    const tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <style>
          table, td, th { border: none; }
        </style>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Registrations</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
      </head>
      <body>
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th style="font-weight:bold; text-align:left; border-bottom:1px solid #000;">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => `<tr>${r.map(cell => `<td style="text-align:left;">${cell}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    const blob = new Blob([tableHtml], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedEvent.title.replace(/\s+/g, '_')}_registrations.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const compressedDataUrl = await compressImage(file, 800);
      setForm(prev => ({ ...prev, image_url: compressedDataUrl }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Failed to process image.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "", date: "", time: "", location: "", description: "",
      skill_level: "Open", capacity: 50, games: "", contact: "", image_url: "",
      what_to_bring: ""
    });
    setEditingEventId(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === "admin@gmail.com" && loginForm.password === "Ilovedogs@123") {
      sessionStorage.setItem("everydog_admin_auth", "true");
      setIsAuthenticated(true);
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("everydog_admin_auth");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-[20px] shadow-lg border-border">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-[#0B74B5]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-[#0B74B5]" />
            </div>
            <CardTitle className="font-display text-2xl">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Sign in to manage events and registrations.</p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input 
                  id="admin-email" 
                  type="email" 
                  autoComplete="email"
                  value={loginForm.email} 
                  onChange={e => setLoginForm({...loginForm, email: e.target.value})} 
                  placeholder="example@gmail.com" 
                  required 
                  className="rounded-[12px] h-11 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input 
                  id="admin-password" 
                  type="password" 
                  autoComplete="current-password"
                  value={loginForm.password} 
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                  placeholder="••••••••" 
                  required 
                  className="rounded-[12px] h-11 bg-white"
                />
              </div>
              <Button type="submit" className="w-full h-11 rounded-[12px] bg-[#0B74B5] hover:bg-[#095d91] text-white">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleEditEvent = (event) => {
    setForm({
      title: event.title || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      description: event.description || "",
      skill_level: event.skill_level || "Open",
      capacity: event.capacity || 50,
      games: event.games || "",
      contact: event.contact || "",
      image_url: event.image_url || "",
      what_to_bring: event.what_to_bring ? event.what_to_bring.join(", ") : ""
    });
    setEditingEventId(event.id);
    setActiveTab("create-event");
  };

  const handleDeleteEvent = (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      if (deleteAdminEvent(event.id)) {
        toast.success("Event deleted!");
        loadEvents();
      } else {
        toast.error("Failed to delete event.");
      }
    }
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.location || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!form.image_url) {
      toast.error("Please upload an event image or flyer.");
      return;
    }

    if (editingEventId) {
      if (updateAdminEvent(editingEventId, {
        ...form,
        capacity: parseInt(form.capacity),
        what_to_bring: form.what_to_bring ? form.what_to_bring.split(",").map(i => i.trim()).filter(Boolean) : []
      })) {
        toast.success("Event updated successfully!");
        setActiveTab("dashboard");
        resetForm();
      } else {
        toast.error("Failed to update event.");
      }
    } else {
      const saved = saveAdminEvent({
        ...form,
        capacity: parseInt(form.capacity),
        what_to_bring: form.what_to_bring ? form.what_to_bring.split(",").map(i => i.trim()).filter(Boolean) : []
      });

      if (saved) {
        toast.success("Event created successfully!");
        setActiveTab("dashboard");
        resetForm();
      } else {
        toast.error("Failed to save event. Image might be too large.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Top Admin Navigation */}
      <div className="bg-white border-b border-border sticky top-0 z-30">
        <div className="container-main py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0B74B5] flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-display font-semibold text-lg tracking-tight">Admin Console</h1>
          </div>
          <div className="flex gap-2 text-sm">
            <Button 
              variant={activeTab === "dashboard" || activeTab === "registrations" ? "default" : "ghost"} 
              className={activeTab === "dashboard" || activeTab === "registrations" ? "bg-[#0B74B5] rounded-[10px]" : "rounded-[10px]"}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </Button>
            <Button 
              variant={activeTab === "create-event" ? "default" : "ghost"} 
              className={activeTab === "create-event" ? "bg-[#1F7A4A] rounded-[10px]" : "rounded-[10px] text-[#1F7A4A]"}
              onClick={() => { resetForm(); setActiveTab("create-event"); }}
            >
              <CalendarPlus className="w-4 h-4 mr-2" />
              {editingEventId ? "Edit Event" : "Host Event"}
            </Button>
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <Button 
              variant="ghost" 
              className="rounded-[10px] text-muted-foreground hover:text-destructive shrink-0"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Active Events</h2>
                <p className="text-muted-foreground text-sm">Manage your upcoming disc dog meetups and competitions.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {events.map((event) => {
                const regs = getRegistrationsForEvent(event.id);
                return (
                  <Card key={event.id} className="rounded-[16px] overflow-hidden border-border transition-all hover:shadow-md">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-32 sm:h-auto">
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-display font-semibold text-lg">{event.title}</h3>
                            <Badge variant="outline" className="bg-[#E7F4FD] text-[#0B74B5] border-transparent">{event.skill_level}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {event.date}</div>
                            <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location}</div>
                            <div className="flex items-center gap-1.5 text-foreground font-medium">
                              <Users className="w-3.5 h-3.5 text-[#CC6E22]" /> 
                              {event.registered_count} / {event.capacity} Registered
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-[10px] text-muted-foreground"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-[10px] text-destructive border-transparent hover:bg-destructive/10"
                            onClick={() => handleDeleteEvent(event)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-[10px] ml-auto"
                            onClick={() => handleViewRegistrations(event)}
                          >
                            Registrations <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* REGISTRATIONS TAB */}
        {activeTab === "registrations" && selectedEvent && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <Button variant="ghost" onClick={() => setActiveTab("dashboard")} className="mb-4 rounded-[10px] -ml-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{selectedEvent.title}</h2>
                <p className="text-muted-foreground text-sm">Registrations and attendee details.</p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-[10px] bg-white border-border shadow-sm text-[#0B74B5] hover:text-[#095d91] hover:bg-slate-50"
                onClick={handleDownloadExcel}
                disabled={registrations.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>

            <Card className="rounded-[20px] border-border shadow-sm overflow-hidden">
              <div className="p-6 bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#EAF7EF] rounded-xl">
                    <Users className="w-6 h-6 text-[#1F7A4A]" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{registrations.length}</p>
                    <p className="text-sm text-muted-foreground">Total Registrations</p>
                  </div>
                </div>

                {registrations.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                    <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No registrations yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                      <thead className="text-sm font-bold text-foreground bg-muted/80 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left rounded-tl-lg">Attendee</th>
                          <th className="px-4 py-3 text-left">Dog Info</th>
                          <th className="px-4 py-3 text-left">Experience</th>
                          <th className="px-4 py-3 text-center">Waiver</th>
                          <th className="px-4 py-3 text-right rounded-tr-lg">Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.map((reg) => (
                          <tr key={reg.id} className="border-b border-border hover:bg-muted/30">
                            <td className="px-4 py-4 text-left">
                              <p className="font-medium text-foreground">{reg.name}</p>
                              <p className="text-xs text-muted-foreground">{reg.email}</p>
                            </td>
                            <td className="px-4 py-4 text-left">
                              <p className="font-medium">{reg.dog_name}</p>
                              <p className="text-xs text-muted-foreground">{reg.dog_breed} ({reg.dog_size})</p>
                            </td>
                            <td className="px-4 py-4 text-left">
                              <Badge variant="secondary" className="font-normal">{reg.experience_level}</Badge>
                              {reg.selected_games && (
                                <p className="text-[10px] text-muted-foreground mt-1 font-medium">{reg.selected_games}</p>
                              )}
                            </td>
                            <td className="px-4 py-4 text-center">
                              {reg.waiver_signed ? <CheckCircle2 className="w-5 h-5 text-[#1F7A4A] mx-auto" /> : <span className="text-muted-foreground">-</span>}
                            </td>
                            <td className="px-4 py-4 text-xs text-muted-foreground text-right">
                              {new Date(reg.registered_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* CREATE EVENT TAB */}
        {activeTab === "create-event" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-2xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">{editingEventId ? "Edit Event Details" : "Host New Event"}</h2>
              <p className="text-muted-foreground text-sm">{editingEventId ? "Modify your event information below." : "Fill out the details to create a new meetup or competition."}</p>
            </div>

            <Card className="rounded-[20px] border-border shadow-md">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSaveEvent} className="space-y-5">
                  <div className="space-y-1">
                    <Label htmlFor="title" className="text-sm font-medium">Event Title</Label>
                    <Input id="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Sunday Spring Toss" className="h-11 rounded-[12px] bg-white" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                      <Input id="date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="h-11 rounded-[12px] bg-white" required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                      <Input id="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="e.g. 9:00 AM - 12:00 PM" className="h-11 rounded-[12px] bg-white" required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input id="location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. White Rock Lake Park" className="h-11 rounded-[12px] bg-white" required />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="description" className="text-sm font-medium">Event Description</Label>
                    <textarea 
                      id="description" 
                      value={form.description} 
                      onChange={e => setForm({...form, description: e.target.value})} 
                      className="flex w-full rounded-[12px] border border-input bg-white px-3 py-2 text-sm shadow-sm min-h-[100px]" 
                      placeholder="Tell attendees what to expect..."
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="contact" className="text-sm font-medium">Contact Person & Email</Label>
                      <Input id="contact" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} placeholder="e.g. Sarah Owen | email@example.com" className="h-11 rounded-[12px] bg-white" required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="games" className="text-sm font-medium">Games Offered (comma separated)</Label>
                      <Input id="games" value={form.games} onChange={e => setForm({...form, games: e.target.value})} placeholder="e.g. Throw N Go, Greedy" className="h-11 rounded-[12px] bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="capacity" className="text-sm font-medium">Capacity (Runs/Spots)</Label>
                      <Input id="capacity" type="number" min="1" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} className="h-11 rounded-[12px] bg-white" required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="skill_level" className="text-sm font-medium">Skill Level</Label>
                      <select
                        id="skill_level"
                        value={form.skill_level}
                        onChange={e => setForm({...form, skill_level: e.target.value})}
                        className="flex h-11 w-full rounded-[12px] border border-input bg-white px-3 text-sm shadow-sm"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Open">Open (All Levels)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="what_to_bring" className="text-sm font-medium">What to Bring (comma separated)</Label>
                    <Input id="what_to_bring" value={form.what_to_bring} onChange={e => setForm({...form, what_to_bring: e.target.value})} placeholder="e.g. Water, Leash, Treats" className="h-11 rounded-[12px] bg-white" />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Event Flyer / Image</Label>
                    <div className="flex items-center gap-4">
                      {form.image_url && (
                        <div className="w-20 h-20 rounded-md overflow-hidden border border-border">
                          <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="file:bg-[#E7F4FD] file:text-[#0B74B5] file:border-0 file:rounded-md file:px-4 file:py-1 file:mr-4 file:font-semibold"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Upload event photo (max 1MB). It will be resized automatically.</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <Button type="submit" className="w-full h-12 rounded-[12px] bg-[#1F7A4A] hover:bg-[#175c37] text-white font-medium text-base">
                    {editingEventId ? "Save Changes" : "Publish Event"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
