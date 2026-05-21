import { Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const products = [
  {
    name: 'VICAIA Signature Scrub',
    price: 'TZS 45,000',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    tag: 'Bestseller',
    available: true,
  },
  {
    name: 'Luxury Jewelry',
    price: '',
    image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 0,
    tag: 'Coming Soon',
    available: false,
  },
  {
    name: 'Fragrance Collection',
    price: '',
    image: 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 0,
    tag: 'Coming Soon',
    available: false,
  },
  {
    name: 'Fashion Collection',
    price: '',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 0,
    tag: 'Coming Soon',
    available: false,
  },
];

export default function Bestsellers() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  const whatsappUrl = `https://wa.me/255689737254?text=${encodeURIComponent('Hello VICAIA, I want to order the scrub.')}`;

  return (
    <section id="bestsellers" className="py-24 lg:py-36 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#C89B7B]" />
            <span className="font-montserrat text-[#C89B7B] text-xs tracking-[0.3em] uppercase">The Collection</span>
            <div className="w-12 h-px bg-[#C89B7B]" />
          </div>
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-black">New & Bestsellers</h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} delay={i} whatsappUrl={whatsappUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  delay,
  whatsappUrl,
}: {
  product: (typeof products)[0];
  delay: number;
  whatsappUrl: string;
}) {
  const cardRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="reveal group"
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F8F5F2] mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover hover-zoom"
        />
        {/* Tag */}
        <div
          className={`absolute top-3 left-3 font-montserrat text-xs tracking-widest uppercase px-3 py-1 ${
            product.available ? 'bg-black text-white' : 'bg-[#C89B7B] text-white'
          }`}
        >
          {product.tag}
        </div>
        {/* Hover overlay */}
        {product.available && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-montserrat text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#C89B7B] hover:text-white transition-colors duration-300"
            >
              Order Now
            </a>
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        {product.rating > 0 && (
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: product.rating }).map((_, i) => (
              <Star key={i} size={11} className="fill-[#C89B7B] text-[#C89B7B]" />
            ))}
          </div>
        )}
        <h3 className="font-playfair text-base font-semibold text-black mb-1">{product.name}</h3>
        {product.price ? (
          <p className="font-montserrat text-sm text-gray-600">{product.price}</p>
        ) : (
          <p className="font-montserrat text-xs tracking-widest text-[#C89B7B] uppercase">Notify Me</p>
        )}
      </div>
    </div>
  );
}
