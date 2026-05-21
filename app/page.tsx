import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Destinations from '@/components/Destinations';
import Packages from '@/components/Packages';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Widgets from '@/components/Widgets';

export default function Home() {
  return (
    <div className="font-inter antialiased">
      <Navbar />
      <Hero />
      <About />
      <Destinations />
      <Packages />
      <Services />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <Contact />
      <Footer />
      <Widgets />
    </div>
  );
}
