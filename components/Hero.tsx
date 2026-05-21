"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1920',
    location: 'Santorini, Greece',
  },
  {
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1920',
    location: 'Maldives',
  },
  {
    image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1920',
    location: 'Swiss Alps, Switzerland',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setVisible(true);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleScroll = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.location}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 animate-fade-in">
          <span className="h-[1px] w-6 sm:w-10 bg-red-500/40" />
          {/* <span className="text-red-500 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase block">
            Keep Your Dreams Alive
          </span> */}
          <span className="h-[1px] w-6 sm:w-10 bg-red-500/40" />
        </div>
        <h1
          className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Explore the World
          <span className="block italic text-red-500">with Us</span>
        </h1>
        <p className="text-white/80 text-sm sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-10 leading-relaxed font-light">
          Discover extraordinary destinations, create lifelong memories, and experience the magic of travel with our curated luxury packages.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 text-sm sm:text-base text-center"
          >
            Book Now
          </a>
          <a
            href="#packages"
            onClick={(e) => { e.preventDefault(); document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="border-2 border-white/60 hover:border-white text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/10 text-sm sm:text-base text-center"
          >
            <Play className="w-4 h-4 fill-white" />
            Explore Packages
          </a>
        </div>

        <div className="flex gap-3 mt-6 sm:mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2 bg-blue-600' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase">
        {slides[current].location}
      </div>

      <button
        onClick={handleScroll}
        className="absolute bottom-8 right-8 text-white/60 hover:text-white transition-colors duration-300 animate-bounce hidden sm:block"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
