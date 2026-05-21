import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Packages', href: '#packages' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={() => handleNav('#home')}
          className="flex items-center tracking-wide transition-all duration-300 hover:opacity-90 active:scale-95 group"
        >
          <span
            className={`text-2xl font-black transition-colors duration-300 ${
              scrolled ? 'text-slate-800' : 'text-white'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Gunjan
          </span>
          <span
            className="text-2xl font-light text-amber-500 ml-1 transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Holidays
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1 self-end mb-2"></span>
        </button>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-amber-500 ${
                  scrolled ? 'text-slate-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav('#contact')}
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
            >
              Book Now
            </button>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden transition-colors duration-300 ${scrolled ? 'text-slate-800' : 'text-white'}`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-slate-100">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left text-slate-700 hover:text-amber-500 font-medium py-3 border-b border-slate-50 transition-colors duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-3">
              <button
                onClick={() => handleNav('#contact')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-full transition-colors duration-300"
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
