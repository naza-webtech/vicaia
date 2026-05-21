import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 600 + i * 200);
    });
  }, []);

  const whatsappUrl = `https://wa.me/255743128678?text=${encodeURIComponent('Hello VICAIA, I want to order the scrub.')}`;

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1920"
      >
        <source
          src="https://player.vimeo.com/external/434045526.hd.mp4?s=35a70e4a43e0c2f87ea8a2ee2fef74c6dffdc9f3&profile_id=175"
          type="video/mp4"
        />
      </video>

      {/* Fallback image shown while video loads or on error */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          zIndex: -1,
        }}
      />

      {/* Dark luxury overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
        {/* Thin line ornament */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-px bg-[#C89B7B]" />
          <span className="font-montserrat text-[#C89B7B] text-xs tracking-[0.3em] uppercase">Est. 2026</span>
          <div className="w-12 h-px bg-[#C89B7B]" />
        </div>

        <h1
          ref={titleRef}
          className="font-playfair text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight max-w-4xl mb-6 tracking-tight"
        >
          The VICAIA Standard<br />
          <span className="italic text-[#C89B7B]">of Elegance</span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-montserrat text-white/80 text-sm sm:text-base font-light tracking-widest uppercase max-w-md mb-12"
        >
          Luxury skincare crafted for modern elegance.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C89B7B] text-white font-montserrat font-medium tracking-[0.2em] uppercase text-xs px-10 py-4 transition-all duration-300 hover:bg-[#A07850] min-w-[200px] text-center"
          >
            Shop The Scrub
          </a>
          <a
            href="#about"
            className="border border-white text-white font-montserrat font-medium tracking-[0.2em] uppercase text-xs px-10 py-4 transition-all duration-300 hover:border-[#C89B7B] hover:text-[#C89B7B] min-w-[200px] text-center"
          >
            Discover VICAIA
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-montserrat text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/50" />
      </div>
    </section>
  );
}
