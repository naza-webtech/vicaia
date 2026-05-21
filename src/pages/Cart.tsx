import { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/sessionId';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('cart_items')
      .select('id, product_id, quantity, products(id, name, price, image_url)')
      .eq('session_id', sessionId);

    setCartItems((data as CartItem[]) || []);
    setLoading(false);
  }

  async function updateQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    await supabase.from('cart_items').update({ quantity }).eq('id', cartItemId);
    loadCart();
  }

  async function removeItem(cartItemId: string) {
    await supabase.from('cart_items').delete().eq('id', cartItemId);
    loadCart();
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);
  const shipping = subtotal > 150000 ? 0 : 15000;
  const total = subtotal + shipping;

  function generateOrderMessage() {
    let message = 'Hello VICAIA! I would like to place an order.\n\n';
    message += '=== ORDER DETAILS ===\n\n';

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.products.name}\n`;
      message += `   Qty: ${item.quantity} x TZS ${item.products.price.toLocaleString()}\n`;
      message += `   Subtotal: TZS ${(item.products.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += '=== SUMMARY ===\n';
    message += `Subtotal: TZS ${subtotal.toLocaleString()}\n`;
    message += `Shipping: ${shipping === 0 ? 'FREE' : `TZS ${shipping.toLocaleString()}`}\n`;
    message += `TOTAL: TZS ${total.toLocaleString()}\n\n`;
    message += 'Please confirm and proceed with payment.';

    return message;
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-12">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12">
          <a href="/" className="flex items-center gap-1 font-montserrat text-xs text-gray-500 hover:text-black transition-colors">
            <ChevronLeft size={14} />
            Home
          </a>
          <span className="text-gray-300">/</span>
          <span className="font-montserrat text-xs tracking-widest uppercase text-black font-semibold">Shopping Cart</span>
        </div>

        <h1 className="font-playfair text-4xl font-bold text-black mb-12">Your Cart</h1>

        {loading ? (
          <p className="font-montserrat text-gray-400">Loading...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-montserrat text-gray-400 mb-6">Your cart is empty</p>
            <a href="/" className="font-montserrat text-xs text-[#C89B7B] tracking-widest uppercase hover:text-black transition-colors">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 pb-6 border-b border-gray-100">
                    {/* Image */}
                    <div className="w-24 h-24 bg-[#F8F5F2] flex-shrink-0 overflow-hidden">
                      <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-playfair text-base font-semibold text-black mb-1">{item.products.name}</h3>
                        <p className="font-montserrat text-sm font-bold text-black">TZS {item.products.price.toLocaleString()}</p>
                      </div>

                      {/* Quantity and remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 font-montserrat text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-8">
                <h3 className="font-playfair text-lg font-bold text-black mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between font-montserrat text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">TZS {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-montserrat text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `TZS ${shipping.toLocaleString()}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="font-montserrat text-xs text-[#C89B7B]">Free shipping on orders over TZS 150,000</p>
                  )}
                </div>

                <div className="flex justify-between font-playfair text-lg font-bold text-black mb-6">
                  <span>Total</span>
                  <span>TZS {total.toLocaleString()}</span>
                </div>

                <a
                  href={`https://wa.me/255743128678?text=${encodeURIComponent(generateOrderMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-black text-white font-montserrat font-medium tracking-widest uppercase text-xs px-6 py-4 block text-center transition-colors hover:bg-[#C89B7B]"
                >
                  Checkout via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
