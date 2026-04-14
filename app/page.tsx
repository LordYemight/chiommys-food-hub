'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-GRID
// Typography Personality: bold

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Truck, 
  Globe, 
  Heart, 
  Check, 
  Clock, 
  Map, 
  ImageOff, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone,
  CheckCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// --- Types ---
interface Stat { number: string; label: string; icon: string; }
interface Feature { title: string; description: string; icon: string; }
interface Product { name: string; description: string; price: string; image_url: string; }
interface Testimonial { name: string; text: string; role: string; }

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} 
      width={!fill ? (width || 800) : undefined} 
      height={!fill ? (height || 600) : undefined} 
      className={className} priority={priority} 
      onError={() => setError(false)}
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const DGrid = () => (
  <div className="py-10 border-y border-white/5 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
      {['Hygienic', 'Authentic', 'Export Ready', 'Fresh Daily', 'Nationwide'].map((word, i) => (
        <div key={i} className="flex items-center gap-3 text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          {word}
        </div>
      ))}
    </div>
  </div>
);

// --- Content ---

const BRAND = {
  name: "Chiommys Food Hub",
  tagline: "Everything Food N' More.",
  description: "Premium Port Harcourt culinary destination specializing in hygienic processing, authentic homemade meals, and export-quality exotic seafood.",
  industry: "Culinary Arts",
  region: "Port Harcourt, Nigeria"
};

const PRODUCTS: Product[] = [
  { name: "Spicy Peppered Snails", description: "Jumbo snails slow-cooked in a signature blend of local spices and fresh peppers.", price: "₦12,500", image_url: "https://images.unsplash.com/photo-1557267725-c530b236f446" },
  { name: "Exotic Seafood Medley", description: "Export-quality selection of prawns, crabs, and seasonal fish seasoned to perfection.", price: "₦22,000", image_url: "https://images.unsplash.com/photo-1633095200931-ee8d6598efbe" },
  { name: "Smoked Bush Meat", description: "Hygienically processed and traditionally smoked for an authentic deep-forest flavor.", price: "₦15,000", image_url: "https://images.unsplash.com/photo-1637666589445-a1ab6ab1de74" },
  { name: "Native Soup Base", description: "Rich homemade concentrate prepared with traditional spices for immediate culinary use.", price: "₦8,500", image_url: "https://images.unsplash.com/photo-1731007417464-07efadd9f91a" }
];

const FEATURES: Feature[] = [
  { title: "Hygienic Processing", description: "Our kitchen adheres to rigorous safety standards ensuring every meal is as clean as it is delicious.", icon: "ShieldCheck" },
  { title: "Nationwide Delivery", description: "From our heart in Port Harcourt to your doorstep anywhere in the country.", icon: "Truck" },
  { title: "Export Quality", description: "Strict quality control allows our seafood and processed goods to meet international standards.", icon: "Globe" },
  { title: "Homemade Flavor", description: "Authentic recipes passed down through generations to give you the comfort of home.", icon: "Heart" }
];

const STATS: Stat[] = [
  { number: "100%", label: "Hygienic", icon: "Check" },
  { number: "24hr", label: "Fresh Daily", icon: "Clock" },
  { number: "36", label: "States Covered", icon: "Map" }
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Nneka Amadi", text: "The peppered snails are consistently the best in the city. Clean, spicy, and very tender.", role: "Regular Customer" },
  { name: "Tunde Bakare", text: "I ordered their export-grade dried fish for a trip abroad and the packaging was flawless.", role: "Bulk Buyer" }
];

const ICON_MAP: Record<string, any> = {
  ShieldCheck: ShieldCheck,
  Truck: Truck,
  Globe: Globe,
  Heart: Heart,
  Check: Check,
  Clock: Clock,
  Map: Map
};

// --- Sections ---

export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-primary text-off-white">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent flex items-center justify-center font-heading font-black text-primary text-xl rounded-lg group-hover:rotate-12 transition-transform">C</div>
            <span className="font-heading font-extrabold text-xl tracking-tighter uppercase hidden sm:block">Chiommys</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Menu', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-accent transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Order Now
            </a>
          </div>

          <button onClick={() => setNavOpen(true)} className="md:hidden text-white p-2">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 transform ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <span className="font-heading font-black text-2xl text-accent">CHIOMMYS</span>
          <button onClick={() => setNavOpen(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="p-10 flex flex-col gap-8">
          {['Home', 'Menu', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setNavOpen(false)} className="text-4xl font-heading font-bold text-white hover:text-accent transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setNavOpen(false)} className="mt-4 bg-accent text-primary p-5 rounded-2xl font-black text-center text-lg">
            Place Your Order
          </a>
        </div>
      </div>

      {/* Hero Section - Pattern HR-B */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage 
          src="https://images.unsplash.com/photo-1738071020203-784282e6d4c6" 
          alt="Chiommys Food" 
          fill 
          className="object-cover opacity-60" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        
        <div className="relative z-10 max-w-4xl animate-slideUp">
          <h1 className="font-heading text-6xl md:text-[7rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            Fresh Heart <br />
            <span className="text-accent not-italic">of PH City.</span>
          </h1>
          <p className="text-white/70 mt-8 text-xl max-w-2xl leading-relaxed font-medium">
            Experience the intersection of hygiene, tradition, and exotic flavors with our curated seafood and homemade delicacies.
          </p>
          <div className="flex flex-wrap gap-5 mt-10">
            <a href="#menu" className="bg-accent text-primary px-10 py-5 font-black text-lg hover:scale-105 transition-all rounded-full shadow-2xl">
              View Our Menu
            </a>
            <a href="#about" className="flex items-center gap-3 text-white font-bold group border-b border-white/20 pb-1 self-center hover:border-accent transition-all">
              The Chiommys Story <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <DGrid />

      {/* Features Section - Pattern F-ICON-GRID */}
      <section id="features" className="py-28 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-none uppercase">
                Our Quality <br /><span className="text-accent">Commitment</span>
              </h2>
            </div>
            <p className="text-white/40 text-lg max-w-sm md:text-right">
              Why Chiommys remains the preferred choice for discerning palates across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = ICON_MAP[f.icon] || ShieldCheck;
              return (
                <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.03] hover:bg-accent/10 hover:border-accent/30 transition-all duration-500 group">
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Icon size={30} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-black text-white text-xl leading-tight uppercase mb-3">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section - Pattern P-HORIZONTAL */}
      <section id="menu" className="py-28 bg-primary relative overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-16 flex justify-between items-end">
          <div>
            <span className="text-accent font-black tracking-widest uppercase text-xs mb-3 block">Tactile Menu Experience</span>
            <h2 className="font-heading text-5xl font-black text-white uppercase italic">Today&apos;s Specialities</h2>
          </div>
          <div className="hidden md:flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30"><ChevronLeft /></div>
            <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center text-accent"><ChevronRight /></div>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 px-6 md:px-[calc((100vw-80rem)/2+1.5rem)] snap-x snap-mandatory scrollbar-hide">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="snap-start shrink-0 w-[85vw] md:w-[400px] group">
              <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden mb-6 border border-white/10 shadow-2xl">
                <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="bg-accent text-primary px-4 py-1.5 rounded-full font-black text-xs uppercase mb-4 inline-block">
                    Export Grade
                  </span>
                  <h3 className="font-heading text-3xl font-black text-white leading-tight uppercase mb-2">{p.name}</h3>
                  <p className="text-white/60 text-sm font-medium line-clamp-2 mb-4">{p.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-accent font-black text-2xl">{p.price}</span>
                    <a href="#contact" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary group-hover:bg-accent transition-colors">
                      <ChevronRight />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/20 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">Sharp delivery, nationwide.</p>
      </section>

      {/* About Section - Custom Split with Stats */}
      <section id="about" className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1519077336050-4ca5cac9d64f" alt="About Chiommys" fill className="object-cover" />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent rounded-3xl -z-10 animate-float" />
          </div>
          <div>
            <h2 className="font-heading text-5xl font-black text-white leading-none uppercase mb-8">
              The <span className="text-accent">Chiommys</span> Story
            </h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Born out of a passion for authentic Nigerian flavors and a commitment to food safety, Chiommys Food Hub bridges the gap between traditional kitchens and modern hygiene standards. 
            </p>
            <p className="text-white/40 mb-12">
              We specialize in sourcing the finest exotic seafood and processing them for both local enjoyment and international export. Our mission is simple: Everything Food N&apos; More, handled with absolute care.
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/10">
              {STATS.map((s, i) => {
                const Icon = ICON_MAP[s.icon] || Check;
                return (
                  <div key={i}>
                    <div className="text-accent mb-2"><Icon size={20} /></div>
                    <p className="font-heading text-3xl font-black text-white">{s.number}</p>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Pattern T-SLIDER */}
      <section className="py-28 bg-primary overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-5xl font-black text-white uppercase italic text-center">Customer Stories</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/[0.03] border border-white/5 rounded-3xl p-10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-8">
                    {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                  </div>
                  <p className="text-white/80 text-xl leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4 mt-10">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Pattern C3 */}
      <section id="contact" className="py-28 px-6 bg-secondary relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-6 block">Ready to Taste?</span>
          <h2 className="font-heading text-6xl md:text-7xl font-black text-white uppercase leading-none mb-6">Place Your Order</h2>
          <p className="text-white/40 mb-14 text-lg">Send us a message and our team will get back to you immediately with availability and delivery timelines.</p>
          
          <ContactForm />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent">
                <Instagram size={24} />
              </div>
              <a href="https://instagram.com/chiommys_food_hub" className="text-white font-bold hover:text-accent transition-colors">@chiommys_food_hub</a>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent">
                <MapPin size={24} />
              </div>
              <p className="text-white/60 font-medium">Rumuagholu Pipeline, Port Harcourt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-20 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 pb-16 border-b border-white/5">
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="w-12 h-12 bg-accent flex items-center justify-center font-heading font-black text-primary text-2xl rounded-xl">C</div>
             <p className="text-white/30 text-sm max-w-[200px] text-center md:text-left">Export-quality culinary hub based in PH City.</p>
          </div>
          <div className="flex gap-8 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            <a href="#hero" className="hover:text-accent transition-colors">Home</a>
            <a href="#menu" className="hover:text-accent transition-colors">Menu</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>
        <p className="text-center mt-10 text-white/20 text-[10px] font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Chiommys Food Hub. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-10 animate-scaleIn">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/30 text-accent">
          <CheckCheck size={40} />
        </div>
        <h3 className="font-heading text-3xl font-black text-white uppercase italic mb-2">Order Received</h3>
        <p className="text-white/40 max-w-xs mx-auto">One of our chefs will reach out to you within the hour to finalize your delivery details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" placeholder="Full Name" required
          className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-accent transition-colors"
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required
          className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-accent transition-colors"
          onChange={e => setForm({...form, email: e.target.value})}
        />
      </div>
      <textarea 
        placeholder="What can we process for you today?" rows={5} required
        className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-accent transition-colors resize-none"
        onChange={e => setForm({...form, message: e.target.value})}
      />
      <button 
        type="submit" disabled={loading}
        className="bg-accent text-primary p-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {loading ? "SENDING..." : "SUBMIT ORDER"}
      </button>
    </form>
  );
}