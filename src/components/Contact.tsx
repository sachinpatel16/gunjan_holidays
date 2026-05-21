import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { sendEmail } from '../utils/email';

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
    destination: 'Bali, Indonesia',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await sendEmail({
        name: form.name,
        email: form.email,
        message: `Preferred Destination: ${form.destination}\n\nMessage:\n${form.message}`,
        subject: 'New Travel Planning Inquiry',
      });
      setSubmitted(true);
      setForm({ name: '', email: '', destination: 'Bali, Indonesia', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-blue-600 text-sm font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
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

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <div className={`lg:col-span-3 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white h-full border border-white/5 flex flex-col justify-between shadow-2xl shadow-slate-950/20">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Contact Information</h3>
                <p className="text-white/60 text-sm mb-8">Reach out to us and we'll get back to you within 24 hours.</p>

                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-white/20 transition-colors duration-300">
                    <h4 className="text-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone Numbers
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">General Inquiry (Mr. Gunjan Thakkar)</p>
                        <div className="flex flex-col text-sm">
                          <a href="tel:+919898297746" className="text-white font-medium hover:text-blue-500 transition-colors">+91 98982 97746</a>
                          <a href="tel:+919998493934" className="text-white font-medium hover:text-blue-500 transition-colors">+91 99984 93934</a>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">Tour Packages</p>
                        <a href="tel:+918530020200" className="text-white font-medium hover:text-blue-500 transition-colors text-sm">+91 85300 20200</a>
                      </div>
                      <div className="space-y-1 sm:col-span-2 border-t border-white/5 pt-3">
                        <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">Ticket & Passport</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                          <a href="tel:+917016130890" className="text-white font-medium hover:text-blue-500 transition-colors">+91 70161 30890</a>
                          <a href="tel:+918401757677" className="text-white font-medium hover:text-blue-500 transition-colors">+91 84017 57677</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2 text-red-500">
                        <Mail className="w-4 h-4" />
                        <span className="text-[9px] uppercase tracking-wider font-bold">Email Us</span>
                      </div>
                      <a href="mailto:info@gunjanholidays.com" className="text-white text-sm font-medium hover:text-blue-500 transition-colors break-all">info@gunjanholidays.com</a>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2 text-red-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-[9px] uppercase tracking-wider font-bold">Hours</span>
                      </div>
                      <p className="text-white text-xs leading-relaxed font-medium">
                        Mon – Fri: 09:00 – 17:00<br />
                        Sat & Sun: Closed
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3 text-red-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[9px] uppercase tracking-wider font-bold">Our Office</span>
                    </div>
                    <p className="text-white text-sm leading-relaxed font-medium">
                      24, G/F, Parth Empire,<br />
                      Opp. Rambag Police Station,<br />
                      Maninagar, Ahmedabad - 380008
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">Follow Us</span>
                <div className="flex gap-2">
                  {['FB', 'IG', 'TW', 'YT'].map((s) => (
                    <button
                      key={s}
                      className="w-8 h-8 border border-white/10 hover:border-blue-600 hover:bg-blue-600/10 rounded-lg text-white/40 hover:text-blue-500 text-xs font-bold transition-all duration-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center bg-blue-50 border border-blue-100 rounded-3xl p-12 shadow-sm">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                  <Send className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-slate-900 text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Inquiry Submitted!
                </h3>
                <p className="text-slate-500 mb-6 max-w-sm">Thank you. Our travel expert will create a custom itinerary and reach out via email within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 active:scale-95"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 h-full flex flex-col justify-between">
                <div className="flex-1 flex flex-col">
                  <h3 className="text-slate-900 text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Plan Your Dream Vacation
                  </h3>

                  {error && (
                    <div className="mb-5 text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100 leading-normal">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4 flex-1 flex flex-col">
                    <div>
                      <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm disabled:opacity-75 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm disabled:opacity-75 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Preferred Destination *</label>
                      <select
                        name="destination"
                        value={form.destination}
                        onChange={handleChange}
                        disabled={submitting}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {destinations.map((dest) => (
                          <option key={dest} value={dest}>
                            {dest}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Message & Requirements *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        placeholder="Tell us about your dream destination, travel dates, group size, and any special requirements..."
                        className="w-full flex-1 min-h-[120px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm resize-none disabled:opacity-75 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/20 ${
                      submitting ? 'cursor-not-allowed opacity-75' : ''
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Plan...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className={`mt-12 rounded-2xl overflow-hidden h-64 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.747970898516!2d72.6053331753389!3d23.00331487918485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8fe587c69997%3A0xc319227c95b68233!2sParth%20Empire%2C%20Maninagar%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716270000000!5m2!1sen!2sin"
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
