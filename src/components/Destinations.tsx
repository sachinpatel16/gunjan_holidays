import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';

const destinations = [
  {
    name: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹45,000',
    duration: '6 Days',
    rating: 4.9,
    reviews: 342,
    desc: 'Temples, rice terraces, and pristine beaches in the Island of the Gods.',
    tag: 'Most Popular',
  },
  {
    name: 'Dubai, UAE',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹65,000',
    duration: '5 Days',
    rating: 4.8,
    reviews: 289,
    desc: 'Ultramodern architecture, luxury shopping, and desert adventures.',
    tag: 'Trending',
  },
  {
    name: 'Maldives',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹95,000',
    duration: '7 Days',
    rating: 5.0,
    reviews: 198,
    desc: 'Overwater bungalows, crystal-clear lagoons, and coral reefs.',
    tag: 'Luxury',
  },
  {
    name: 'Switzerland',
    image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹1,20,000',
    duration: '8 Days',
    rating: 4.9,
    reviews: 156,
    desc: 'Snow-capped Alps, charming villages, and breathtaking landscapes.',
    tag: 'Premium',
  },
  {
    name: 'Goa, India',
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹18,000',
    duration: '4 Days',
    rating: 4.7,
    reviews: 512,
    desc: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage.',
    tag: 'Budget Friendly',
  },
  {
    name: 'Thailand',
    image: 'https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹38,000',
    duration: '6 Days',
    rating: 4.8,
    reviews: 423,
    desc: 'Ancient temples, tropical islands, and world-class street food.',
    tag: 'Adventure',
  },
];

const tagColors: Record<string, string> = {
  'Most Popular': 'bg-red-500',
  'Trending': 'bg-rose-500',
  'Luxury': 'bg-slate-700',
  'Premium': 'bg-teal-600',
  'Budget Friendly': 'bg-green-500',
  'Adventure': 'bg-blue-600',
};

export default function Destinations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="destinations" className="py-16 md:py-24 bg-slate-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-blue-600 text-sm font-semibold tracking-[0.2em] uppercase">Explore the World</span>
          <h2
            className="text-slate-900 text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Popular Destinations
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From exotic beaches to majestic mountains, discover the world's most breathtaking destinations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((dest, i) => (
            <div
              key={dest.name}
              className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 ${tagColors[dest.tag]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                  {dest.tag}
                </span>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{dest.name}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{dest.desc}</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-red-500 text-red-500" />
                    <span className="text-slate-600 font-medium">{dest.rating}</span>
                    <span className="text-slate-400">({dest.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-shrink-0">
                    <span className="text-xs text-slate-400">Starting from</span>
                    <p className="text-slate-900 font-bold text-lg sm:text-xl">{dest.price}</p>
                  </div>
                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-semibold text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-300 group/btn whitespace-nowrap"
                  >
                    Book Trip
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
