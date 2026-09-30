import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CAFE_PHONE, generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { useToast } from '../context/ToastContext';
import { InstagramIcon } from '../components/InstagramIcon';

export const Contact: React.FC = () => {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please provide your name.';
    if (!form.email.trim()) errs.email = 'Please provide your email address.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Please enter a valid email.';
    if (!form.message.trim()) errs.message = 'Please write your message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Check Form', 'Please correct the highlighted fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast(
      'Message Received',
      'Thank you for reaching out! Our team will get back to you shortly.',
      'success'
    );
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Concierge & Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-cream-50 font-normal mt-2">
          We’d love to hear from you
        </h1>
        <p className="mt-3 text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
          Questions about dietary requests, private gathering spaces, specialty beans, or catering? Drop us a note or call us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-espresso-900 border border-amber-900/40 rounded-2xl p-6 sm:p-10 shadow-luxury">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-glow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-cream-50">
                Message Received!
              </h3>
              <p className="text-sm text-espresso-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-cream-100">{form.name}</strong>. We have received your note regarding "{form.subject}". A member of our café team will respond shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                }}
                className="mt-4 px-6 py-2.5 border border-espresso-750 text-cream-100 text-xs sm:text-sm font-medium rounded-xl hover:bg-espresso-850 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Meera Kapoor"
                    className={`w-full p-3 bg-espresso-950 border rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                      errors.name ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="meera@example.com"
                    className={`w-full p-3 bg-espresso-950 border rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-sm text-cream-100 focus:border-amber-400 transition-colors"
                  >
                    <option value="General Inquiry">General Question</option>
                    <option value="Private Booking / Gathering">Private Event / Party</option>
                    <option value="Coffee Bean Bulk Purchase">Specialty Beans & Grinds</option>
                    <option value="Catering">Event Catering & Platters</option>
                    <option value="Feedback">Feedback / Compliment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can our café team help you?"
                  className={`w-full p-3 bg-espresso-950 border rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:border-amber-400 transition-colors ${
                    errors.message ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-luxury space-y-6">
            <h3 className="font-serif text-xl font-medium text-cream-50 border-b border-espresso-800 pb-3">
              Direct Contact
            </h3>

            <div className="space-y-4 text-sm text-espresso-200 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Brew & Bean Café</p>
                  <p>14/72, Mall Road, Civil Lines</p>
                  <p>Kanpur, Uttar Pradesh 208001</p>
                  <p className="text-xs text-amber-400/80 mt-0.5">Opposite Green Park Stadium Gate 2</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Operating Hours</p>
                  <p>Monday – Friday: 8:00 AM – 10:30 PM</p>
                  <p>Saturday – Sunday: 8:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Direct Telephone</p>
                  <a href={`tel:${CAFE_PHONE}`} className="hover:text-amber-400 transition-colors">
                    +91 98390 12840
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Electronic Mail</p>
                  <a href="mailto:hello@brewandbean.com" className="hover:text-amber-400 transition-colors">
                    hello@brewandbean.com
                  </a>
                </div>
              </div>
            </div>

            {/* Instant Actions */}
            <div className="pt-2 border-t border-espresso-800 space-y-3">
              <a
                href={generateGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors border border-emerald-600/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-espresso-750 text-cream-100 hover:bg-espresso-850 text-xs sm:text-sm font-medium rounded-xl transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-amber-400" />
                <span>Follow @brewandbean on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
