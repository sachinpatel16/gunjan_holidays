import { useState, ChangeEvent, FormEvent } from 'react';
import { Compass, X, Send } from 'lucide-react';
import { sendEmail } from '../utils/email';

export default function Widgets() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await sendEmail({
        name: form.name,
        email: form.email,
        message: form.message,
        subject: 'New Travel Planning Inquiry from Website Widget',
      });
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const canSend = form.name.trim() && form.email.trim() && form.message.trim() && !submitting;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-2rem)] sm:max-w-none">
      {open && (
        <div className="w-[calc(100vw-2rem)] sm:w-[350px] max-h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 animate-fade-in">
          <div className="flex items-center justify-between gap-4 p-5 bg-slate-900 text-white rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Plan Your Trip</p>
                <p className="text-xs text-slate-400">Share your details with our expert.</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close chat form"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white h-[350px]">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-amber-500 animate-bounce" />
              </div>
              <h3 className="text-slate-900 text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Inquiry Sent!
              </h3>
              <p className="text-slate-500 text-xs mb-6 px-4 leading-relaxed">
                Thank you for your interest. Our travel expert will contact you via email within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setOpen(false);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-white">
              {error && (
                <div className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100 leading-normal">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-500">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                  placeholder="e.g. Priya Sharma"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                  placeholder="you@example.com"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 resize-none"
                  placeholder="Tell us where you'd like to go and your travel dates..."
                  required
                  disabled={submitting}
                />
              </div>

              <button
                type="submit"
                disabled={!canSend}
                className={`w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  canSend
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 active:scale-[0.98]'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Open travel planner"
      >
        <Compass className={`w-7 h-7 text-white transition-transform duration-500 ${open ? 'rotate-180' : 'group-hover:rotate-45'}`} />
      </button>
    </div>
  );
}
