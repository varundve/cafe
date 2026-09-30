import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle2, MessageCircle, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { CAFE_PHONE } from '../utils/whatsapp';
import { useToast } from '../context/ToastContext';

interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  seating: 'indoor' | 'outdoor' | 'no-preference';
  specialRequest: string;
}

export const Reservations: React.FC = () => {
  const { showToast } = useToast();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    email: '',
    date: today,
    time: '18:00',
    guests: '2',
    seating: 'no-preference',
    specialRequest: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [submittedBooking, setSubmittedBooking] = useState<{
    id: string;
    data: ReservationFormData;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact number.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.date) {
      newErrors.date = 'Please pick a reservation date.';
    } else if (formData.date < today) {
      newErrors.date = 'Reservation date cannot be in the past.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Check Form', 'Please correct the errors in the reservation form.', 'error');
      return;
    }

    const bookingId = `BB-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedBooking({
      id: bookingId,
      data: { ...formData },
    });

    showToast(
      'Reservation Request Sent',
      `Booking request #${bookingId} has been recorded.`,
      'success'
    );
  };

  const handleWhatsAppConfirmation = () => {
    if (!submittedBooking) return;
    const { id, data } = submittedBooking;
    const text = `Hi Brew & Bean! I just placed a table booking request:
• Reference: ${id}
• Name: ${data.name}
• Date: ${data.date}
• Time: ${data.time}
• Guests: ${data.guests} person(s)
• Seating: ${data.seating.toUpperCase()}
${data.specialRequest ? `• Special Notes: ${data.specialRequest}` : ''}

Could you please confirm table availability? Thank you!`;

    const url = `https://wa.me/${CAFE_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Hospitality & Bookings
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-cream-50 font-normal mt-2">
          Reserve Your Table
        </h1>
        <p className="mt-3 text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
          Planning a coffee date, family dinner, or an afternoon work session? Let us know when you're visiting and we'll save a cozy spot for you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {submittedBooking ? (
          /* Confirmation State UI */
          <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-8 sm:p-14 shadow-luxury space-y-7 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-glow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                Booking Reference #{submittedBooking.id}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-cream-50 font-normal">
                Reservation Request Received
              </h2>
              <p className="text-sm text-espresso-300 max-w-lg mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-cream-100">{submittedBooking.data.name}</strong>! Your table request has been submitted. Our team will contact you via WhatsApp or phone to confirm availability.
              </p>
            </div>

            {/* Summary Details */}
            <div className="bg-espresso-950 border border-amber-900/30 rounded-xl p-6 max-w-md mx-auto text-left space-y-3.5 text-sm text-espresso-200 shadow-subtle">
              <div className="flex justify-between border-b border-espresso-800 pb-2.5">
                <span className="text-espresso-400">Date</span>
                <span className="font-semibold text-cream-100">{submittedBooking.data.date}</span>
              </div>
              <div className="flex justify-between border-b border-espresso-800 pb-2.5">
                <span className="text-espresso-400">Time</span>
                <span className="font-semibold text-cream-100">{submittedBooking.data.time}</span>
              </div>
              <div className="flex justify-between border-b border-espresso-800 pb-2.5">
                <span className="text-espresso-400">Guests</span>
                <span className="font-semibold text-cream-100">{submittedBooking.data.guests} person(s)</span>
              </div>
              <div className="flex justify-between border-b border-espresso-800 pb-2.5">
                <span className="text-espresso-400">Seating</span>
                <span className="font-semibold text-amber-400 capitalize">{submittedBooking.data.seating}</span>
              </div>
              {submittedBooking.data.specialRequest && (
                <div className="pt-1">
                  <span className="text-espresso-400 block text-xs">Special Requests:</span>
                  <p className="text-xs text-cream-100 italic mt-0.5">{submittedBooking.data.specialRequest}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleWhatsAppConfirmation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm border border-emerald-600/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setSubmittedBooking(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-espresso-750 text-cream-100 hover:bg-espresso-800 text-sm font-medium rounded-xl transition-colors"
              >
                <span>Make Another Booking</span>
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl shadow-luxury p-6 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Varun Gupta"
                    className={`w-full p-3 bg-espresso-950 border rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                      errors.name ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className={`w-full p-3 bg-espresso-950 border rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                      errors.phone ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full p-3 bg-espresso-950 border rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3 border-t border-espresso-800">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-sm text-cream-100 focus:border-amber-400"
                  />
                  {errors.date && (
                    <p className="text-xs text-rose-400 mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-sm text-cream-100 focus:border-amber-400"
                  >
                    <option value="08:30">08:30 AM (Morning Brew)</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM (Brunch)</option>
                    <option value="13:00">01:00 PM (Lunch)</option>
                    <option value="14:30">02:30 PM (Work & Coffee)</option>
                    <option value="16:00">04:00 PM (Afternoon Tea)</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="19:00">07:00 PM (Sunset / Evening)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Late Night Brew)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    Number of Guests
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {['1', '2', '3', '4', '5', '6+'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`py-2.5 text-center text-xs font-semibold rounded-lg border transition-all ${
                          formData.guests === num
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500 font-bold'
                            : 'border-espresso-750 bg-espresso-950 hover:border-espresso-600 text-espresso-200'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seating Preference */}
              <div className="pt-3 border-t border-espresso-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2.5">
                  Seating Ambience Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {[
                    { id: 'no-preference', label: 'No Preference', desc: 'First available cozy table' },
                    { id: 'indoor', label: 'Air-Conditioned Hall', desc: 'Plush velvet & quiet corners' },
                    { id: 'outdoor', label: 'Tree-Shaded Patio', desc: 'Breezy courtyard seating' },
                  ].map((seat) => (
                    <label
                      key={seat.id}
                      onClick={() => setFormData({ ...formData, seating: seat.id as any })}
                      className={`p-4 rounded-xl border cursor-pointer select-none text-left transition-all ${
                        formData.seating === seat.id
                          ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-500'
                          : 'border-espresso-750 bg-espresso-950 hover:border-espresso-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="seating"
                        value={seat.id}
                        checked={formData.seating === seat.id}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <p className="text-sm font-semibold text-cream-100">
                        {seat.label}
                      </p>
                      <p className="text-[11px] text-espresso-400 font-light mt-0.5">
                        {seat.desc}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="pt-3 border-t border-espresso-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Special Notes / Occasion (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  placeholder="e.g. Birthday slice with candle, quiet spot for Zoom call, highchair required..."
                  className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-sm text-cream-100 focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-espresso-800 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="text-xs text-espresso-400 font-light text-center sm:text-left">
                  Reserved tables are held for 15 minutes past scheduled arrival. No cancellation fees.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-espresso-950" />
                  <span>Request Table Reservation</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
