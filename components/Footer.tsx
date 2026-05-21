"use client";

import { Phone, Mail, MapPin, ArrowRight, Facebook, Instagram, Linkedin, Star } from 'lucide-react';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100083275517477',
    icon: Facebook,
    hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/gunjanholidays/',
    icon: Instagram,
    hoverClass: 'hover:text-[#E4405F] hover:border-[#E4405F] hover:bg-[#E4405F]/10',
  },
  {
    name: 'X (formerly Twitter)',
    url: 'https://x.com/GunjanHolidays',
    icon: XIcon,
    hoverClass: 'hover:text-white hover:border-white hover:bg-white/10',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/gunjan-holidays-4b4559266/',
    icon: Linkedin,
    hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10',
  },
  {
    name: 'Google Review',
    url: 'https://g.page/r/CSLK_2lzb5mfEB0/review',
    icon: Star,
    hoverClass: 'hover:text-[#FFC107] hover:border-[#FFC107] hover:bg-[#FFC107]/10 hover:fill-[#FFC107]',
  },
];

const quickLinks = ['Home', 'About Us', 'Destinations', 'Packages', 'Services', 'Gallery', 'Contact'];
const services = ['Flight Booking', 'Hotel Booking', 'Visa Assistance', 'Tour Packages', 'Cruise Planning', 'Travel Insurance'];

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
              className="flex items-center tracking-wide mb-4 hover:opacity-90 active:scale-95 group"
            >
              <img
                src="/images/logo.svg"
                alt="Gunjan Holidays"
                className="h-12 sm:h-14 w-auto object-contain brightness-0 invert"
              />
            </button>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your trusted travel partner for unforgettable journeys. We turn dream vacations into lifelong memories with personalized experiences and unmatched service.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-10 h-10 border border-white/10 rounded-lg text-white/40 transition-all duration-300 ${social.hoverClass}`}
                    title={social.name}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(`#${link.toLowerCase().replace(' ', '')}`)}
                    className="text-white/50 hover:text-blue-500 text-sm flex items-center gap-2 transition-colors duration-200 group"
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
                    className="text-white/50 hover:text-blue-500 text-sm flex items-center gap-2 transition-colors duration-200 group"
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
              <a
                href="https://g.page/r/CSLK_2lzb5mfEB0/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group/map"
              >
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 group-hover/map:text-blue-500 transition-colors" />
                <p className="text-white/50 text-sm leading-relaxed group-hover/map:text-blue-500 transition-colors">
                  24, G/F, Parth Empire,<br />
                  Opp. Rambag Police Station,<br />
                  Maninagar, Ahmedabad - 380008
                </p>
              </a>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919898297746" className="text-white/50 hover:text-blue-500 text-sm transition-colors">+91 98982 97746</a>
                  <a href="tel:+919998493934" className="text-white/50 hover:text-blue-500 text-sm transition-colors">+91 99984 93934</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <a href="mailto:info@gunjanholidays.com" className="text-white/50 hover:text-blue-500 text-sm transition-colors">info@gunjanholidays.com</a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
              <p className="text-blue-500 text-xs font-semibold uppercase tracking-wide mb-1">24/7 Support</p>
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
              <button key={item} className="text-white/40 hover:text-blue-500 text-xs transition-colors duration-200">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
