import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  const whatsappUrl = `https://wa.me/255743128678`;

  return (
    <footer className="bg-black text-white">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="VICAIA" className="w-8 h-8 object-contain" />
              <h3 className="font-playfair text-2xl font-bold tracking-[0.2em]">VICAIA</h3>
            </div>
            <p className="font-montserrat text-white/50 text-xs leading-relaxed mb-6">
              The House of Victoria. Luxury lifestyle products crafted for those who demand excellence.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-[#C89B7B] hover:text-[#C89B7B] transition-colors duration-300"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-[#C89B7B] hover:text-[#C89B7B] transition-colors duration-300 font-montserrat text-xs font-bold"
              >
                TT
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-[#C89B7B] hover:text-[#C89B7B] transition-colors duration-300"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-montserrat text-xs tracking-[0.25em] uppercase text-[#C89B7B] mb-5">Collections</h4>
            <ul className="space-y-3">
              {['Skincare', 'Jewelry', 'Apparel', 'Fragrance', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-montserrat text-xs text-white/50 hover:text-white transition-colors tracking-wide">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-montserrat text-xs tracking-[0.25em] uppercase text-[#C89B7B] mb-5">Support</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Order Status', 'Returns', 'Shipping', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-montserrat text-xs text-white/50 hover:text-white transition-colors tracking-wide">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat text-xs tracking-[0.25em] uppercase text-[#C89B7B] mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat text-xs text-white/50 hover:text-white transition-colors tracking-wide"
                >
                  WhatsApp: +255 689 737 254
                </a>
              </li>
              <li>
                <span className="font-montserrat text-xs text-white/50 tracking-wide">Tanzania</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-montserrat text-white/30 text-xs tracking-wide">
            &copy; 2026 VICAIA. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-montserrat text-white/30 text-xs hover:text-white/60 transition-colors tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
