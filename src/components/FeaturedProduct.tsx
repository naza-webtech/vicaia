import { Star, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FeaturedProduct() {
  const imageRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();

  const whatsappUrl = `https://wa.me/255743128678?text=${encodeURIComponent('Hello VICAIA, I want to order the scrub.')}`;

  const features = [
    'Premium natural ingredients',
    'Silky smooth skin finish',
    'Luxury self-care experience',
  ];

  return (
    <section id="product" className="py-24 lg:py-36 bg-cream">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Product Image */}
          <div ref={imageRef} className="reveal overflow-hidden relative group">
            <div className="overflow-hidden">
              <img
                src="https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="VICAIA Signature Scrub"
                className="w-full h-[500px] lg:h-[680px] object-cover hover-zoom"
              />
            </div>
            {/* Corner accent */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#C89B7B] opacity-70" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#C89B7B] opacity-70" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="reveal reveal-delay-2">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C89B7B]" />
              <span className="font-montserrat text-[#C89B7B] text-xs tracking-[0.3em] uppercase font-medium">
                Featured Launch
              </span>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-[#C89B7B] text-[#C89B7B]" />
              ))}
            </div>

            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-black leading-tight mb-6">
              VICAIA<br />
              <span className="italic text-[#C89B7B]">Signature Scrub</span>
            </h2>

            <p className="font-montserrat text-gray-600 text-sm leading-relaxed mb-8 max-w-md">
              Nature meets luxury. Reveal radiant skin with our premium body scrub crafted for those who demand excellence. Each formula embodies the VICAIA standard — uncompromising quality, sensory indulgence, and visible results.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle size={15} className="text-[#C89B7B] flex-shrink-0" />
                  <span className="font-montserrat text-sm text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="mb-10">
              <p className="font-montserrat text-xs tracking-widest uppercase text-gray-400 mb-1">Starting From</p>
              <p className="font-playfair text-3xl font-bold text-black">TZS 45,000</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C89B7B] text-white font-montserrat font-medium tracking-[0.2em] uppercase text-xs px-8 py-4 transition-all duration-300 hover:bg-[#A07850] text-center"
              >
                Order via WhatsApp
              </a>
              <a
                href="#bestsellers"
                className="border border-black text-black font-montserrat font-medium tracking-[0.2em] uppercase text-xs px-8 py-4 transition-all duration-300 hover:border-[#C89B7B] hover:text-[#C89B7B] text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
