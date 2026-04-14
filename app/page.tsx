'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Phone, Mail, MapPin, Instagram, 
  ShieldCheck, Truck, Globe, Utensils, 
  ImageOff, CheckCheck, UtensilsCrossed, 
  ChefHat, Timer, ShoppingBag 
} from 'lucide-react';

const IMAGES = {
  hero: "https://picsum.photos/seed/food0/1920/1080",
  products: [
    "https://picsum.photos/seed/food2/800/600",
    "https://picsum.photos/seed/food3/800/600",
    "https://picsum.photos/seed/food4/800/600",
    "https://picsum.photos/seed/food5/800/600"
  ],
  about: "https://picsum.photos/seed/food10/800/1000"
};

const brand = {
  name: "Chiommys Food Hub",
  tagline: "Everything Food N' More.",
  description: "Premium Port Harcourt food hub specializing in hygienic processing, authentic homemade meals, and export-quality exotic seafood including peppered snails and bush meat.",
  industry: "Food Hub",
  region: "Port Harcourt, Nigeria"
};

const products = [
  { name: "Signature Peppered Snails", description: "Jumbo snails slow-cooked in a spicy traditional sauce with aromatic herbs.", price: "₦12,500" },
  { name: "Exotic Bush Meat Platter", description: "Authentic bush meat, smoked and seasoned to perfection for a rich, earthy flavor.", price: "₦15,000" },
  { name: "Seafood Special Pack", description: "Export quality selection of prawns, crabs, and fish prepared with homemade care.", price: "₦22,000" },
  { name: "Homemade Native Soup", description: "Rich, authentic soups made with traditional ingredients and zero preservatives.", price: "₦8,500" }
];

const features = [
  { title: "Hygienic Processing", description: "We maintain the highest standards of cleanliness in our Port Harcourt kitchen.", icon: ShieldCheck },
  { title: "Nationwide Delivery", description: "Fast and reliable shipping of our delicacies across all states in Nigeria.", icon: Truck },
  { title: "Export Quality", description: "Carefully packaged meals that meet international standards for travel and export.", icon: Globe },
  { title: "Homemade Flavor", description: "Every meal is crafted with the warmth and authentic taste of a traditional home kitchen.", icon: Utensils }
];

const testimonials = [
  { name: "Nneka Okoro", text: "The peppered snails are the best in Port Harcourt. Clean, spicy, and perfectly cooked.", role: "Verified Buyer" },
  { name: "Tunde Balogun", text: "I ordered the export pack to London and it arrived in perfect condition. Authentic taste.", role: "International Client" },
  { name: "Efe Williams", text: "Finally a food hub that prioritizes hygiene as much as flavor. Highly recommended.", role: "Local Regular" }
];

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} 
      width={!fill ? (width ?? 800) : undefined} 
      height={!fill ? (height ?? 600) : undefined} 
      className={className} priority={priority} 
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<any>(null);
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

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const heroRev = useScrollReveal(0.1);
  const featRev = useScrollReveal(0.15);
  const prodRev = useScrollReveal(0.1);
  const aboutRev = useScrollReveal(0.2);
  const testRev = useScrollReveal(0.1);
  const contactRev = useScrollReveal(0.15);

  return (
    <main className="min-h-screen bg-secondary">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">C</div>
            <span className="font-heading font-black text-xl tracking-tighter text-white">CHIOMMYS</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Menu', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/80 hover:text-accent font-bold text-sm uppercase tracking-widest transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-8 py-3 rounded-full font-black text-sm hover:scale-105 transition-all shadow-xl">
              ORDER NOW
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col">
          <button onClick={() => setMobileMenu(false)} className="self-end text-white mb-12">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Menu', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-4xl font-heading font-black text-white">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="mt-8 bg-white text-primary px-8 py-4 rounded-xl font-black text-center text-xl">
              Order Now
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="Chiommys Food" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
        
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} ref={heroRev.ref}>
          <h1 className="font-heading text-6xl md:text-[9vw] font-black text-white leading-[0.85] tracking-tighter">
            THE FRESH HEART <br/> OF PH CITY
          </h1>
          <p className="text-white/80 mt-8 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium">
            Everything Food N&apos; More. Discover the intersection of hygienic processing and authentic homemade flavors.
          </p>
          <div className="flex flex-wrap gap-5 mt-10">
            <a href="#products" className="bg-primary text-white px-10 py-5 font-black text-lg hover:brightness-110 hover:scale-[1.03] transition-all rounded-full shadow-2xl">
              Order Fresh Now
            </a>
            <a href="#about" className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-10 py-5 font-black text-lg hover:bg-white/20 transition-all rounded-full">
              Our Standard
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-10 border-y border-white/5 bg-secondary">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 px-6">
          {['Freshly Cooked', 'Hygienic Hub', 'No Preservatives', 'Global Export'].map((word, i) => (
            <div key={i} className="flex items-center gap-4 text-white/30 text-xs font-heading font-black tracking-[0.3em] uppercase">
              <div className="w-2 h-2 rounded-full bg-primary" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section ref={featRev.ref} id="features" className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none">WHY CHOOSE <br/><span className="text-primary">CHIOMMYS</span></h2>
            </div>
            <p className="text-white/40 max-w-xs text-lg font-medium">Uncompromising quality in every bite. Sharp delivery, nationwide.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`p-10 rounded-[2.5rem] bg-zinc-900 border border-white/5 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden ${
                featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <f.icon size={32} />
                </div>
                <h3 className="font-heading font-black text-white text-2xl mb-4 leading-tight">{f.title}</h3>
                <p className="text-white/50 text-base leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={prodRev.ref} id="menu" className="py-28 bg-secondary border-t border-white/5 overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-16 flex items-center justify-between">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter">OUR EXOTIC MENU</h2>
          <div className="hidden md:flex gap-4">
            <Timer className="text-primary" size={24} />
            <span className="text-white/40 font-black text-sm tracking-widest uppercase">Fresh Batch Daily</span>
          </div>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-12 px-6 md:px-[calc((100vw-80rem)/2)] scrollbar-hide snap-x snap-mandatory">
          {products.map((p, i) => (
            <div key={i} className={`snap-start shrink-0 w-[320px] md:w-[450px] group transition-all duration-1000 delay-300 ${
              prodRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'
            }`}>
              <div className="relative h-[400px] md:h-[550px] rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
                <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="inline-block bg-primary text-white px-6 py-2 rounded-full font-black text-sm mb-4 shadow-xl">
                    {p.price}
                  </span>
                  <h3 className="font-heading text-3xl md:text-4xl font-black text-white leading-tight mb-2">{p.name}</h3>
                  <p className="text-white/70 text-base line-clamp-2 font-medium">{p.description}</p>
                </div>
              </div>
              <a href="#contact" className="inline-flex items-center gap-4 text-primary font-black text-xl hover:translate-x-3 transition-transform">
                ORDER THIS ITEM <UtensilsCrossed size={20} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRev.ref} id="about" className="py-28 px-6 bg-secondary border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div className={`transition-all duration-1000 ${aboutRev.isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <p className="text-primary font-heading font-black tracking-[0.4em] uppercase mb-6">Established PH Quality</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none mb-8">STANDARD OF <br/> EXCELLENCE.</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12 max-w-lg">
              Located at Rumuagholu Pipeline, Chiommys Food Hub is dedicated to bringing the finest exotic seafood and homemade meals to your table, wherever you are in the world.
            </p>
            
            <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
              {[
                { number: '100%', label: 'Hygienic', icon: ShieldCheck },
                { number: 'Daily', label: 'Fresh Prep', icon: Timer },
                { number: 'Sharp', label: 'Nationwide', icon: Truck },
                { number: 'Global', label: 'Export', icon: Globe }
              ].map((s, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <s.icon className="text-primary" size={20} />
                    <p className="font-heading text-4xl font-black text-white">{s.number}</p>
                  </div>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative h-[600px] md:h-[800px] transition-all duration-1000 delay-300 ${
            aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <div className="absolute inset-0 bg-primary/20 rounded-[4rem] translate-x-6 translate-y-6" />
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-8 border-secondary shadow-2xl">
              <SafeImage src={IMAGES.about} alt="Chiommys Hub" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-accent p-10 rounded-[3rem] shadow-2xl hidden lg:block">
              <div className="flex items-center gap-6">
                <ChefHat size={48} className="text-primary" />
                <div>
                  <p className="font-heading font-black text-secondary text-2xl leading-none">Export Quality</p>
                  <p className="text-secondary/50 font-bold mt-1">International Standard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testRev.ref} id="testimonials" className="py-28 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex items-center justify-between">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-secondary leading-none">CUSTOMER <br/> STORIES</h2>
          <Instagram className="text-secondary/20 hidden md:block" size={100} />
        </div>
        
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-secondary border border-white/5 rounded-[3rem] p-12">
                <div className="flex gap-2 mb-8">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-3 h-3 rounded-full bg-primary" />)}
                </div>
                <p className="text-white text-2xl font-bold leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-secondary font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-white text-lg leading-none">{t.name}</p>
                    <p className="text-white/40 text-sm mt-1 uppercase font-bold tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRev.ref} className="py-28 px-6 bg-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-secondary leading-[0.85] tracking-tighter mb-16">
            GET YOUR <br/> <span className="text-primary">FRESH FIX</span>
          </h2>
          
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start border-t-4 border-secondary/10 pt-16">
            <div className="space-y-10">
              <div className="group">
                <p className="text-secondary/30 font-black uppercase tracking-[0.3em] mb-4">Location</p>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary shrink-0" size={28} />
                  <p className="text-secondary text-2xl font-black leading-tight">Rumuagholu Pipeline,<br/> Port Harcourt, Nigeria</p>
                </div>
              </div>
              
              <div className="group">
                <p className="text-secondary/30 font-black uppercase tracking-[0.3em] mb-4">Social Hub</p>
                <a href="https://instagram.com/chiommys_food_hub" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <Instagram className="text-primary shrink-0" size={28} />
                  <p className="text-secondary text-2xl font-black">@chiommys_food_hub</p>
                </a>
              </div>

              <div className="p-8 bg-primary rounded-[2rem] text-white shadow-2xl">
                <ShoppingBag size={40} className="mb-4" />
                <h4 className="text-2xl font-black mb-2">Ready to order?</h4>
                <p className="font-medium opacity-80 leading-relaxed mb-6">Contact us for sharp delivery to your doorstep anywhere in Nigeria.</p>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest">Active Now</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-10 md:p-16 rounded-[3.5rem] shadow-2xl border border-white/5">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-scaleIn">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 border-2 border-primary/30">
                    <CheckCheck size={48} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-4xl font-black text-white">We Gat You!</h3>
                  <p className="text-white/50 mt-4 text-lg max-w-xs font-medium">Chiommy will contact you shortly to confirm your order details.</p>
                  <button onClick={() => setSent(false)} className="mt-10 text-primary font-black border-b-2 border-primary/30 pb-1 hover:border-primary transition-all">Send Another Request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(['name', 'email'] as const).map(field => (
                      <div key={field}>
                        <label className="block text-white/30 text-xs font-black uppercase tracking-widest mb-3 ml-1">{field}</label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          value={form[field]}
                          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                          required
                          className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-lg outline-none focus:border-primary transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-white/30 text-xs font-black uppercase tracking-widest mb-3 ml-1">Phone Number</label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-lg outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/30 text-xs font-black uppercase tracking-widest mb-3 ml-1">Your Order / Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-lg outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-6 rounded-2xl font-black text-xl hover:brightness-110 hover:scale-[1.01] transition-all disabled:opacity-60 shadow-xl"
                  >
                    {loading ? 'PROCESSING...' : 'CONFIRM ORDER'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl">C</div>
              <span className="font-heading font-black text-3xl tracking-tighter text-white">CHIOMMYS</span>
            </div>
            <p className="text-white/30 font-medium max-w-xs text-center md:text-left">
              Hygienic processing, authentic flavors, and global standards from Port Harcourt.
            </p>
          </div>
          
          <div className="flex gap-12 text-center md:text-left">
            <div>
              <p className="text-white/20 font-black text-xs uppercase tracking-[0.3em] mb-6">Explore</p>
              <ul className="space-y-4">
                {['Home', 'Menu', 'About', 'Contact'].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="text-white/60 hover:text-primary font-bold transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/20 font-black text-xs uppercase tracking-[0.3em] mb-6">Connect</p>
              <a href="https://instagram.com/chiommys_food_hub" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-sm font-bold">
            &copy; {new Date().getFullYear()} Chiommys Food Hub. Built with excellence.
          </p>
          <div className="flex gap-8">
            <span className="text-white/20 text-xs font-black uppercase tracking-widest">Hygienic</span>
            <span className="text-white/20 text-xs font-black uppercase tracking-widest">Authentic</span>
            <span className="text-white/20 text-xs font-black uppercase tracking-widest">Export Quality</span>
          </div>
        </div>
      </footer>
    </main>
  );
}