import { useState, useEffect } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/sessionId';

interface WishlistItem {
  id: string;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    rating: number;
    reviews_count: number;
  };
}

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Wishlist({ isOpen, onClose }: WishlistProps) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadWishlist();
    }
  }, [isOpen]);

  async function loadWishlist() {
    setLoading(true);
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('wishlist_items')
      .select('id, product_id, products(id, name, price, image_url, rating, reviews_count)')
      .eq('session_id', sessionId);

    setItems((data as WishlistItem[]) || []);
    setLoading(false);
  }

  async function removeFromWishlist(itemId: string) {
    await supabase.from('wishlist_items').delete().eq('id', itemId);
    loadWishlist();
  }

  async function addToCart(productId: string) {
    const sessionId = getSessionId();
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', productId)
      .single();

    if (existing) {
      await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + 1 })
        .eq('id', existing.id);
    } else {
      await supabase.from('cart_items').insert({ session_id: sessionId, product_id: productId, quantity: 1 });
    }
    removeFromWishlist(items.find((i) => i.products.id === productId)?.id || '');
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-black">My Wishlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <p className="font-montserrat text-gray-400 text-sm">Loading...</p>
          ) : items.length === 0 ? (
            <p className="font-montserrat text-gray-400 text-sm text-center py-12">Your wishlist is empty</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                  {/* Image */}
                  <div className="w-20 h-20 bg-[#F8F5F2] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-playfair text-sm font-semibold text-black mb-1">
                        {item.products.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: Math.floor(item.products.rating) }).map((_, i) => (
                          <Star key={i} size={10} className="fill-[#C89B7B] text-[#C89B7B]" />
                        ))}
                      </div>
                      <p className="font-montserrat text-sm font-bold text-black">
                        TZS {item.products.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(item.products.id)}
                        className="flex-1 bg-[#C89B7B] text-white font-montserrat text-xs font-medium tracking-widest uppercase px-2 py-2 hover:bg-[#A07850] transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors"
                      >
                        <X size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
