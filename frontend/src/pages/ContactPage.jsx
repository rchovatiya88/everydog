import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import {
  Mail, Send, Heart, Instagram, CheckCircle2, MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "", volunteer_interest: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill in all required fields."); return; }
    if (!form.email.includes("@")) { toast.error("Please enter a valid email address."); return; }

    setSubmitting(true);
    try {
      const result = await submitToGoogleSheets("contact", form);
      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
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
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Get in Touch</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">Have a question, want to volunteer, or just want to say hi? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-2">
            <Card className="rounded-[20px] border-border shadow-md" data-testid="contact-form">
              <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><MessageSquare className="w-5 h-5 text-[#0B74B5]" /> Send Us a Message</CardTitle></CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-[#EAF7EF] flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-[#1F7A4A]" /></div>
                    <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground mb-4">Thanks for reaching out. We'll get back to you soon!</p>
                    <Button variant="outline" className="rounded-[12px]" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "", volunteer_interest: false }); }}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><Label htmlFor="contactName" className="text-sm font-medium">Name *</Label>
                        <Input id="contactName" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required className="mt-1 h-11 rounded-[12px] bg-white" data-testid="contact-name-input" /></div>
                      <div><Label htmlFor="contactEmail" className="text-sm font-medium">Email *</Label>
                        <Input id="contactEmail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required className="mt-1 h-11 rounded-[12px] bg-white" data-testid="contact-email-input" /></div>
                    </div>
                    <div><Label htmlFor="contactMessage" className="text-sm font-medium">Message *</Label>
                      <Textarea id="contactMessage" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what's on your mind..." rows={5} required className="mt-1 rounded-[12px] bg-white resize-none" data-testid="contact-message-textarea" /></div>
                    <div className="flex items-start gap-3 p-3 bg-[#EAF7EF] rounded-xl border border-[#CFEBDD]">
                      <Checkbox id="volunteer" checked={form.volunteer_interest} onCheckedChange={(checked) => setForm({ ...form, volunteer_interest: checked === true })} className="mt-0.5" data-testid="contact-volunteer-checkbox" />
                      <Label htmlFor="volunteer" className="text-sm text-muted-foreground cursor-pointer"><span className="font-medium text-foreground">I'm interested in volunteering!</span><br />Help us run events, train dogs, or spread the word.</Label>
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full sm:w-auto rounded-[12px] bg-[#0B74B5] text-white h-12 px-8 text-base hover:bg-[#095d91] shadow-sm" data-testid="contact-submit-button">
                      {submitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="space-y-5">
            <Card className="rounded-[20px] border-border shadow-sm"><CardContent className="p-5">
              <div className="w-11 h-11 rounded-xl bg-[#FFE9D6] flex items-center justify-center mb-4"><Heart className="w-5 h-5 text-[#CC6E22]" /></div>
              <h3 className="font-display text-base font-semibold mb-2">Volunteer With Us</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">We're always looking for passionate dog lovers to help run events, mentor beginners, and grow our community.</p>
              <p className="text-xs text-muted-foreground">Check the volunteer box in the contact form and we'll reach out!</p>
            </CardContent></Card>
            <Card className="rounded-[20px] border-border shadow-sm"><CardContent className="p-5">
              <div className="w-11 h-11 rounded-xl bg-[#F3F0FF] flex items-center justify-center mb-4"><Instagram className="w-5 h-5 text-[#4A3B8F]" /></div>
              <h3 className="font-display text-base font-semibold mb-2">Follow Us</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">Follow @everydogleague on Instagram for event photos, training tips, and community highlights.</p>
              <a href="https://instagram.com/everydogleague" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-[#0B74B5] hover:underline" data-testid="contact-instagram-link">@everydogleague <span className="ml-1">&rarr;</span></a>
            </CardContent></Card>
            <Card className="rounded-[20px] border-border shadow-sm"><CardContent className="p-5">
              <div className="w-11 h-11 rounded-xl bg-[#E7F4FD] flex items-center justify-center mb-4"><Mail className="w-5 h-5 text-[#0B74B5]" /></div>
              <h3 className="font-display text-base font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">For partnerships, sponsorships, or general inquiries.</p>
              <a href="mailto:hello@everydogleague.com" className="text-sm font-medium text-[#0B74B5] hover:underline">hello@everydogleague.com</a>
            </CardContent></Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
