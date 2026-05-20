import { useEffect, useRef, useState } from 'react';
import { Plane, Hotel, FileText, Heart, Mountain, Users, Shield, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Flight Booking',
    desc: 'Best deals on domestic and international flights with flexible cancellation policies.',
    color: 'bg-sky-50 text-sky-600',
    hoverColor: 'hover:bg-sky-600',
  },
  {
    icon: Hotel,
    title: 'Hotel Booking',
    desc: 'Handpicked hotels from budget to luxury — your perfect stay awaits at every destination.',
    color: 'bg-amber-50 text-amber-600',
    hoverColor: 'hover:bg-amber-600',
  },
  {
    icon: FileText,
    title: 'Visa Assistance',
    desc: 'Hassle-free visa processing with expert guidance for 50+ countries worldwide.',
    color: 'bg-green-50 text-green-600',
    hoverColor: 'hover:bg-green-600',
  },
  {
    icon: Heart,
    title: 'Honeymoon Packages',
    desc: 'Romantic getaways crafted for couples — from Maldives overwater villas to Paris nights.',
    color: 'bg-rose-50 text-rose-600',
    hoverColor: 'hover:bg-rose-600',
  },
  {
    icon: Mountain,
    title: 'Adventure Tours',
    desc: 'Thrilling experiences — trekking, rafting, skydiving, and more for the adventurous soul.',
    color: 'bg-orange-50 text-orange-600',
    hoverColor: 'hover:bg-orange-600',
  },
  {
    icon: Users,
    title: 'Group Tours',
    desc: 'Special group packages with dedicated tour managers for corporate and family groups.',
    color: 'bg-teal-50 text-teal-600',
    hoverColor: 'hover:bg-teal-600',
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    desc: 'Comprehensive travel insurance covering medical emergencies, trip cancellations, and more.',
    color: 'bg-slate-50 text-slate-600',
    hoverColor: 'hover:bg-slate-600',
  },
  {
    icon: Plane,
    title: 'Customized Tours',
    desc: 'Build your perfect holiday from scratch — choose your destinations, pace, and style.',
    color: 'bg-violet-50 text-violet-600',
    hoverColor: 'hover:bg-violet-600',
  },
];

export default function Services() {
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
    <section id="services" className="py-24 bg-slate-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase">What We Offer</span>
          <h2
            className="text-slate-900 text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Services
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            End-to-end travel services designed to make your journey seamless and extraordinary.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, desc, color, hoverColor }, i) => (
            <div
              key={title}
              className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${color} group-${hoverColor} transition-colors duration-300`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-slate-800 font-bold text-lg mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-1 text-amber-500 text-sm font-semibold hover:gap-2 transition-all duration-200"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
