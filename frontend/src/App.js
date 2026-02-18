import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import HomePage from "@/pages/HomePage";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import TrainingPage from "@/pages/TrainingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <SiteFooter />
        <Toaster position="top-right" richColors />
      </div>
    </BrowserRouter>
  );
}

export default App;
