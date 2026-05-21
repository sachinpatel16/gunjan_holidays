"use client";

import { useEffect, useRef, useState } from 'react';
import { Award, Users, MapPin, Star, Shield, Heart } from 'lucide-react';

const stats = [
  { value: 15000, label: 'Happy Travelers', suffix: '+', icon: Users },
  { value: 85, label: 'Destinations', suffix: '+', icon: MapPin },
  { value: 12, label: 'Years Experience', suffix: '+', icon: Award },
  { value: 98, label: 'Satisfaction Rate', suffix: '%', icon: Star },
];

const reasons = [
  { icon: Shield, title: 'Safe & Secure', desc: 'Your safety is our top priority with 24/7 support throughout your journey.' },
  { icon: Star, title: 'Best Prices', desc: 'Competitive pricing with no hidden fees. Value for every rupee you spend.' },
  { icon: Heart, title: 'Personalized', desc: 'Tailored itineraries crafted to match your unique travel preferences.' },
  { icon: Award, title: 'Expert Guides', desc: 'Experienced local guides to make your trip truly unforgettable.' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-blue-600 text-sm font-semibold tracking-[0.2em] uppercase">About GunjanHolidays</span>
            <h2
              className="text-slate-900 text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Your Trusted Travel <span className="text-red-500">Partner</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6 text-justify">
              For over a decade, GunjanHolidays has been turning dream vacations into unforgettable realities. We believe every journey should be seamless, enriching, and perfectly tailored to you.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8 text-justify">
              From the snow-capped peaks of Switzerland to the turquoise lagoons of the Maldives, our team of seasoned travel experts crafts experiences that go beyond the ordinary. We handle every detail so you can focus on what truly matters — exploring and creating memories.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-semibold text-sm mb-1">{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Travel experience"
                className="w-full rounded-2xl shadow-2xl object-cover h-96 lg:h-[500px]"
              />
              <img
                src="https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Happy travelers"
                className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl shadow-xl border-4 border-white object-cover hidden md:block"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-2xl p-4 shadow-xl hidden md:block">
                <p className="text-2xl font-bold">12+</p>
                <p className="text-xs font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-24 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map(({ value, label, suffix, icon: Icon }) => (
            <div
              key={label}
              className="text-center bg-slate-50 rounded-2xl p-4 sm:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <p className="text-xl sm:text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
