import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const destinations = [
  'Bali, Indonesia', 'Dubai, UAE', 'Maldives', 'Switzerland', 'Thailand', 'Goa', 'Kashmir', 'Rajasthan', 'Other',
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
          <h2
            className="text-slate-900 text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Plan Your Journey
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Have a destination in mind? Let us craft the perfect itinerary for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className={`lg:col-span-2 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-slate-900 rounded-3xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Contact Information</h3>
              <p className="text-white/60 text-sm mb-8">Reach out to us and we'll get back to you within 24 hours.</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Phone</p>
                    <a href="tel:+919876543210" className="text-white font-medium hover:text-amber-400 transition-colors">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Email</p>
                    <a href="mailto:info@gunjanholidays.in" className="text-white font-medium hover:text-amber-400 transition-colors">info@gunjanholidays.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Office</p>
                    <p className="text-white font-medium">42, Travel Plaza, MG Road<br />Mumbai, Maharashtra 400001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Hours</p>
                    <p className="text-white font-medium">Mon – Sat: 9am – 7pm<br />Sunday: 10am – 4pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {['FB', 'IG', 'TW', 'YT'].map((s) => (
                    <button
                      key={s}
                      className="w-9 h-9 border border-white/20 hover:border-amber-500 hover:bg-amber-500/10 rounded-lg text-white/50 hover:text-amber-400 text-xs font-bold transition-all duration-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center bg-amber-50 rounded-3xl p-12">
                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-slate-900 text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Message Sent!
                </h3>
                <p className="text-slate-500 mb-6">Thank you for reaching out. Our travel expert will get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-50 rounded-3xl p-8">
                <h3 className="text-slate-900 text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Send us a Message
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-slate-700 text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your dream destination, travel dates, group size, and any special requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className={`mt-12 rounded-2xl overflow-hidden h-64 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.4073219396637!2d72.82776881490116!3d18.93387658717395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce44a9a58f69%3A0x27f9a13bfac68ef4!2sMG%20Road%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>
      </div>
    </section>
  );
}
