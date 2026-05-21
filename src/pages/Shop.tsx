import { useState, useEffect } from 'react';
import { Heart, Star, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/sessionId';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function Shop({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const sessionId = getSessionId();

      // Load category
      const { data: cat } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', category)
        .single();

      if (cat) {
        setCategoryData(cat);

        // Load products
        const { data: prods } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', cat.id);

        setProducts((prods as Product[]) || []);
      }

      // Load wishlist
      const { data: wishlistData } = await supabase
        .from('wishlist_items')
        .select('product_id')
        .eq('session_id', sessionId);

      if (wishlistData) {
        setWishlist(new Set(wishlistData.map((item) => item.product_id)));
      }

      setLoading(false);
    }

    loadData();
  }, [category]);

  const toggleWishlist = async (productId: string) => {
    const sessionId = getSessionId();
    if (wishlist.has(productId)) {
      await supabase.from('wishlist_items').delete().eq('product_id', productId).eq('session_id', sessionId);
      wishlist.delete(productId);
    } else {
      await supabase.from('wishlist_items').insert({ session_id: sessionId, product_id: productId });
      wishlist.add(productId);
    }
    setWishlist(new Set(wishlist));
  };

  const addToCart = async (productId: string) => {
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
  };

  const generateProductMessage = (productName: string, price: number) => {
    return `https://wa.me/255743128678?text=${encodeURIComponent(`Hello VICAIA, I want to order ${productName} (TZS ${price.toLocaleString()})`)}`;
  };

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12">
          <a href="/" className="flex items-center gap-1 font-montserrat text-xs text-gray-500 hover:text-black transition-colors">
            <ChevronLeft size={14} />
            Home
          </a>
          <span className="text-gray-300">/</span>
          <span className="font-montserrat text-xs tracking-widest uppercase text-black font-semibold">{categoryData?.name}</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-black mb-3">{categoryData?.name}</h1>
          <p className="font-montserrat text-gray-600 text-sm max-w-2xl">{categoryData?.description}</p>
          <div className="w-12 h-px bg-[#C89B7B] mt-6" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <p className="font-montserrat text-gray-400">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.has(product.id)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                  onAddToCart={() => addToCart(product.id)}
                  generateProductMessage={generateProductMessage}
                />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-24">
                <p className="font-montserrat text-gray-400">No products available in this category yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  generateProductMessage,
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  generateProductMessage: (name: string, price: number) => string;
}) {
  return (
    <div className="group">
      {/* Image */}
      <div className="relative mb-5 overflow-hidden bg-[#F8F5F2] h-96">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover-zoom" />

        {/* Wishlist button */}
        <button
          onClick={onToggleWishlist}
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-all"
        >
          <Heart size={18} className={isWishlisted ? 'fill-[#C89B7B] text-[#C89B7B]' : 'text-gray-400'} />
        </button>

        {/* Add to cart overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <button
            onClick={onAddToCart}
            className="bg-white text-black font-montserrat text-xs font-medium tracking-widest uppercase px-8 py-3 hover:bg-[#C89B7B] hover:text-white transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                <Star key={i} size={11} className="fill-[#C89B7B] text-[#C89B7B]" />
              ))}
            </div>
            <span className="font-montserrat text-xs text-gray-400">({product.reviews_count})</span>
          </div>
        )}
        <h3 className="font-playfair text-lg font-semibold text-black mb-2">{product.name}</h3>
        <p className="font-montserrat text-sm text-gray-600 mb-3">{product.description}</p>
        <p className="font-playfair text-xl font-bold text-black">TZS {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
