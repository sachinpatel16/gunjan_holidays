import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-amber-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-white text-3xl md:text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Get Exclusive Travel Deals
        </h2>
        <p className="text-amber-100 text-lg mb-8">
          Subscribe to our newsletter and receive curated travel offers, destination guides, and early bird discounts.
        </p>

        {submitted ? (
          <div className="bg-white/20 rounded-2xl px-8 py-6 inline-block">
            <p className="text-white font-semibold text-lg">Thank you for subscribing!</p>
            <p className="text-amber-100 text-sm mt-1">We'll send you the best deals straight to your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 rounded-full bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
