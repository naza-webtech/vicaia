import { useScrollReveal } from '../hooks/useScrollReveal';

const collections = [
  {
    name: 'Skincare',
    subtitle: 'Luxury skincare essentials',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Jewelry',
    subtitle: 'Gold & silver luxury',
    image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Apparel',
    subtitle: 'Premium urban fashion',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Fragrance',
    subtitle: 'Luxury perfumes',
    image: 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Collections() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 lg:py-36 bg-cream">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div ref={headingRef} className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#C89B7B]" />
            <span className="font-montserrat text-[#C89B7B] text-xs tracking-[0.3em] uppercase">The World of VICAIA</span>
            <div className="w-12 h-px bg-[#C89B7B]" />
          </div>
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-black">Shop by Collection</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((col, i) => (
            <CollectionCard key={col.name} collection={col} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  delay,
}: {
  collection: (typeof collections)[0];
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal relative overflow-hidden group cursor-pointer"
      style={{ transitionDelay: `${delay * 0.12}s` }}
    >
      <div className="overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-72 lg:h-96 object-cover hover-zoom"
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/80" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-playfair text-white text-xl font-bold mb-1">{collection.name}</h3>
        <p className="font-montserrat text-white/70 text-xs tracking-widest uppercase">{collection.subtitle}</p>
        <div className="w-0 h-px bg-[#C89B7B] group-hover:w-8 transition-all duration-500 mt-3" />
      </div>
    </div>
  );
}
