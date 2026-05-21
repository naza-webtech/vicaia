import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wishlist from './pages/Wishlist';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Account from './pages/Account';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [shopCategory, setShopCategory] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') {
        setCurrentPage('home');
      } else if (path === '/cart') {
        setCurrentPage('cart');
      } else if (path === '/account') {
        setCurrentPage('account');
      } else if (path.startsWith('/shop/')) {
        const category = path.split('/')[2];
        setShopCategory(category);
        setCurrentPage('shop');
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = (page: string, category?: string) => {
    if (page === 'shop' && category) {
      setShopCategory(category);
      window.history.pushState(null, '', `/shop/${category}`);
    } else if (page === 'home') {
      window.history.pushState(null, '', '/');
    } else if (page === 'cart') {
      window.history.pushState(null, '', '/cart');
    } else if (page === 'account') {
      window.history.pushState(null, '', '/account');
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Handle direct navigation via anchor clicks
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      if (link) {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('/shop/')) {
          e.preventDefault();
          const category = href.split('/')[2];
          handleNavigation('shop', category);
        } else if (href === '/cart') {
          e.preventDefault();
          handleNavigation('cart');
        } else if (href === '/account') {
          e.preventDefault();
          handleNavigation('account');
        } else if (href === '/') {
          e.preventDefault();
          handleNavigation('home');
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar onWishlistClick={() => setWishlistOpen(true)} currentPage={currentPage} />
      <Wishlist isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />

      {currentPage === 'home' && <Home />}
      {currentPage === 'shop' && <Shop category={shopCategory} />}
      {currentPage === 'cart' && <Cart />}
      {currentPage === 'account' && <Account />}

      <Footer />
    </div>
  );
}
