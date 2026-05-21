import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/sessionId';

interface NavbarProps {
  onWishlistClick: () => void;
  currentPage?: string;
}

export default function Navbar({ onWishlistClick, currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    loadCounts();
    const interval = setInterval(loadCounts, 1000);
    return () => clearInterval(interval);
  }, []);

  async function loadCounts() {
    const sessionId = getSessionId();

    const { data: cartData } = await supabase
      .from('cart_items')
      .select('id', { count: 'exact' })
      .eq('session_id', sessionId);

    const { data: wishlistData } = await supabase
      .from('wishlist_items')
      .select('id', { count: 'exact' })
      .eq('session_id', sessionId);

    setCartCount(cartData?.length || 0);
    setWishlistCount(wishlistData?.length || 0);
  }

  const navLinks = [
    { label: 'New + Bestsellers', href: '/shop/bestsellers' },
    { label: 'Skincare', href: '/shop/skincare' },
    { label: 'Jewelry', href: '/shop/jewelry' },
    { label: 'Hair', href: '/shop/hair' },
    { label: 'Fragrance', href: '/shop/fragrance' },
    { label: 'Discover', href: '/shop/apparel' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className={`flex items-center gap-2 transition-colors duration-300 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            <img src="/logo.png" alt="VICAIA" className="w-8 h-8 object-contain" />
            <span className="font-playfair text-2xl font-bold tracking-[0.2em]">VICAIA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-montserrat text-xs font-medium tracking-widest uppercase transition-colors duration-300 hover:text-[#C89B7B] ${
                  scrolled ? 'text-black' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="/account"
              className={`transition-colors duration-300 hover:text-[#C89B7B] ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              <User size={18} strokeWidth={1.5} />
            </a>
            <button
              onClick={onWishlistClick}
              className={`relative transition-colors duration-300 hover:text-[#C89B7B] ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C89B7B] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <a
              href="/cart"
              className={`relative transition-colors duration-300 hover:text-[#C89B7B] ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C89B7B] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden transition-colors duration-300 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-montserrat text-xs font-medium tracking-widest uppercase text-black hover:text-[#C89B7B] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/account"
            className="font-montserrat text-xs font-medium tracking-widest uppercase text-black hover:text-[#C89B7B] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Account
          </a>
          <div className="flex gap-5 pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                setMenuOpen(false);
                onWishlistClick();
              }}
              className="relative text-black hover:text-[#C89B7B] transition-colors flex items-center gap-2"
            >
              <Heart size={18} strokeWidth={1.5} />
              <span className="font-montserrat text-xs font-medium">Wishlist ({wishlistCount})</span>
            </button>
            <a
              href="/cart"
              className="relative text-black hover:text-[#C89B7B] transition-colors flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="font-montserrat text-xs font-medium">Cart ({cartCount})</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
