import { Globe, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const quickLinks = ['Home', 'About Us', 'Destinations', 'Packages', 'Services', 'Gallery', 'Contact'];
const destinations = ['Bali, Indonesia', 'Dubai, UAE', 'Maldives', 'Switzerland', 'Goa, India', 'Thailand'];
const services = ['Flight Booking', 'Hotel Booking', 'Visa Assistance', 'Honeymoon Packages', 'Adventure Tours', 'Travel Insurance'];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-2 font-bold text-xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <Globe className="w-6 h-6 text-amber-500" />
              GunjanHolidays
            </button>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your trusted travel partner for unforgettable journeys. We turn dream vacations into lifelong memories with personalized experiences and unmatched service.
            </p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 border border-white/10 hover:border-amber-500 hover:bg-amber-500/10 rounded-lg text-white/40 hover:text-amber-400 text-xs font-bold transition-all duration-300"
                  title={s}
                >
                  {s[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(`#${link.toLowerCase().replace(' ', '')}`)}
                    className="text-white/50 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Our Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-white/50 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-white/50 text-sm leading-relaxed">42, Travel Plaza, MG Road<br />Mumbai, Maharashtra 400001</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-white/50 hover:text-amber-400 text-sm transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="mailto:info@gunjanholidays.in" className="text-white/50 hover:text-amber-400 text-sm transition-colors">info@gunjanholidays.in</a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide mb-1">24/7 Support</p>
              <p className="text-white/60 text-sm">We're always here to help you plan the perfect trip.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} GunjanHolidays. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
              <button key={item} className="text-white/40 hover:text-amber-400 text-xs transition-colors duration-200">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
