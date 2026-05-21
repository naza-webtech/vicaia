import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const imageRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className="reveal relative order-2 lg:order-1">
            <div className="overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3985341/pexels-photo-3985341.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="VICAIA brand story"
                className="w-full h-[480px] lg:h-[600px] object-cover hover-zoom"
              />
            </div>
            {/* Gold frame accent */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[#C89B7B] opacity-30 hidden lg:block" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="reveal reveal-delay-2 order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#C89B7B]" />
              <span className="font-montserrat text-[#C89B7B] text-xs tracking-[0.3em] uppercase font-medium">
                The House of Victoria
              </span>
            </div>

            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-black leading-tight mb-8">
              Born From a Vision<br />
              <span className="italic text-[#C89B7B]">of Excellence</span>
            </h2>

            <div className="space-y-5 mb-10">
              <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
                <strong className="text-black font-semibold">VICAIA</strong> (Vi-KA-ya) is the House of Victoria — born from a vision of uncompromising quality, sophistication, and international standards.
              </p>
              <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
                The brand exists to redefine luxury lifestyle products in Africa and beyond. Every product we create is a statement — a testament to the belief that excellence knows no borders.
              </p>
              <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
                From Tanzania to the world, VICAIA carries the spirit of a new African luxury renaissance — where premium quality, modern aesthetics, and cultural pride unite.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {[
                { value: '2026', label: 'Founded' },
                { value: '100%', label: 'Premium' },
                { value: 'TZ', label: 'Origin' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-playfair text-2xl font-bold text-[#C89B7B] mb-1">{stat.value}</p>
                  <p className="font-montserrat text-xs tracking-widest uppercase text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
