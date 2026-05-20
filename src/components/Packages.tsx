import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

type PackageCategory = 'all' | 'domestic' | 'international';

const packages = [
  {
    category: 'domestic' as const,
    name: 'Goa Beach Bliss',
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹18,999',
    duration: '4N / 5D',
    badge: 'Best Value',
    badgeColor: 'bg-green-500',
    highlights: ['Beach resort stay', 'Water sports', 'Sunset cruise', 'Local cuisine tour', 'Airport transfers'],
  },
  {
    category: 'domestic' as const,
    name: 'Kashmir Paradise',
    image: 'https://images.pexels.com/photos/1006121/pexels-photo-1006121.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹32,999',
    duration: '6N / 7D',
    badge: 'Trending',
    badgeColor: 'bg-rose-500',
    highlights: ['Houseboat stay', 'Shikara ride', 'Gulmarg gondola', 'Pahalgam valley', 'Mughal gardens'],
  },
  {
    category: 'domestic' as const,
    name: 'Rajasthan Royal',
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹28,999',
    duration: '7N / 8D',
    badge: 'Heritage',
    badgeColor: 'bg-amber-600',
    highlights: ['Palace hotels', 'Camel safari', 'Desert camp', 'City palace tour', 'Pushkar visit'],
  },
  {
    category: 'international' as const,
    name: 'Bali Escapade',
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹55,999',
    duration: '5N / 6D',
    badge: 'Most Popular',
    badgeColor: 'bg-amber-500',
    highlights: ['5-star resort', 'Temple hopping', 'Rice terrace trek', 'Cooking class', 'Spa treatment'],
  },
  {
    category: 'international' as const,
    name: 'Dubai Glam',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹75,999',
    duration: '4N / 5D',
    badge: 'Luxury',
    badgeColor: 'bg-slate-700',
    highlights: ['Burj Khalifa visit', 'Desert safari', 'Dhow cruise dinner', 'Dubai mall', 'Gold souk tour'],
  },
  {
    category: 'international' as const,
    name: 'Maldives Honeymoon',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹1,15,999',
    duration: '6N / 7D',
    badge: 'Honeymoon',
    badgeColor: 'bg-pink-500',
    highlights: ['Overwater villa', 'Snorkeling & diving', 'Private beach', 'Candlelight dinner', 'Seaplane transfer'],
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<PackageCategory>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = active === 'all' ? packages : packages.filter((p) => p.category === active);

  return (
    <section id="packages" className="py-24 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase">Curated For You</span>
          <h2
            className="text-slate-900 text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Tour Packages
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Handpicked itineraries designed to give you the best experiences at the best prices.
          </p>
          <div className="inline-flex bg-slate-100 rounded-full p-1 gap-1">
            {(['all', 'domestic', 'international'] as PackageCategory[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                  active === tab ? 'bg-white text-amber-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-4 right-4 ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {pkg.badge}
                </span>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>{pkg.name}</p>
                  <p className="text-white/70 text-sm">{pkg.duration}</p>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-slate-600 text-sm">
                      <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400">Per person</p>
                    <p className="text-2xl font-bold text-slate-900">{pkg.price}</p>
                  </div>
                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 group/btn"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
