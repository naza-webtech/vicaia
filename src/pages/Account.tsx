import { ChevronLeft } from 'lucide-react';

export default function Account() {
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
          <span className="font-montserrat text-xs tracking-widest uppercase text-black font-semibold">Account</span>
        </div>

        <div className="max-w-2xl">
          <h1 className="font-playfair text-4xl font-bold text-black mb-12">My Account</h1>

          {/* Feature coming soon */}
          <div className="border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-[#F8F5F2] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="font-playfair text-2xl font-bold text-black mb-3">Account Coming Soon</h2>
            <p className="font-montserrat text-gray-600 text-sm mb-8">
              We're building an amazing account experience for you. Sign in, manage orders, and save your preferences soon.
            </p>
            <div className="space-y-3">
              <p className="font-montserrat text-xs text-gray-500">
                For now, use WhatsApp to place and track your orders:
              </p>
              <a

                href="https://wa.me/255743128678"

                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white font-montserrat font-medium tracking-widest uppercase text-xs px-8 py-4 transition-colors hover:bg-[#C89B7B]"
              >
                Chat with VICAIA
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
