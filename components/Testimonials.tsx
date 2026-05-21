"use client";
import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    trip: 'Bali Package',
    review: 'GunjanHolidays made our Bali trip absolutely magical! Every detail was perfectly arranged — from the overwater villa to the temple tours. Their team was available 24/7 and handled everything flawlessly.',
  },
  {
    name: 'Rahul Gupta',
    location: 'Delhi',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    trip: 'Dubai Glam Tour',
    review: 'The Dubai package was worth every penny. Burj Khalifa visit, desert safari, dhow cruise — all seamlessly organized. The guide was knowledgeable and friendly. Highly recommend!',
  },
  {
    name: 'Anita & Vikram Patel',
    location: 'Ahmedabad',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    trip: 'Maldives Honeymoon',
    review: 'Our honeymoon in Maldives was beyond our dreams. The overwater villa, the private beach dinners, snorkeling at sunrise — GunjanHolidays thought of everything. We\'ll definitely be back for our next trip!',
  },
  {
    name: 'Suresh Menon',
    location: 'Bangalore',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    trip: 'Switzerland Tour',
    review: 'Switzerland with GunjanHolidays was a dream come true. The Jungfraujoch trip, Rhine Falls, and Zurich city tour — all well organized. The accommodation was excellent and the team\'s support was outstanding.',
  },
  {
    name: 'Meera Krishnan',
    location: 'Chennai',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    trip: 'Thailand Adventure',
    review: 'The Thailand package was incredible value for money. We visited 3 islands, tried amazing food, and had the most fun on the group tour. The tour manager was fantastic — knowledgeable and fun!',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const go = (dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
    startAuto();
  };

  const t = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase">What Travelers Say</span>
          <h2
            className="text-white text-4xl md:text-5xl font-bold mt-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Stories & Reviews
          </h2>
        </div>

        <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 relative">
            <Quote className="absolute top-8 left-8 w-10 h-10 text-blue-600/30" />

            <div className="text-center">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                ))}
              </div>

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 italic max-w-3xl mx-auto">
                "{t.review}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
                />
                <div className="text-left">
                  <p className="text-white font-bold text-lg">{t.name}</p>
                  <p className="text-white/50 text-sm">{t.location}</p>
                  <span className="text-red-500 text-xs font-semibold">{t.trip}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-blue-600 text-white/60 hover:text-blue-500 flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setCurrent(i); startAuto(); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-8 h-2 bg-blue-600' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-blue-600 text-white/60 hover:text-blue-500 flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
