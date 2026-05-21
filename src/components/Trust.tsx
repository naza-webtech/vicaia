import { Globe, Award, ShieldCheck, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const pillars = [
  {
    Icon: Globe,
    title: 'Global Shipping',
    description: 'We deliver to your door, wherever you are. Premium packaging, premium care.',
  },
  {
    Icon: Award,
    title: 'Premium Quality',
    description: 'Every product passes the VICAIA standard — no compromises on ingredients or craft.',
  },
  {
    Icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Your transactions are fully protected with industry-leading security.',
  },
  {
    Icon: TrendingUp,
    title: 'International Standards',
    description: 'Formulated and designed to compete with the world\'s best luxury brands.',
  },
];

export default function Trust() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 lg:py-32 bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div ref={headingRef} className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#C89B7B]" />
            <span className="font-montserrat text-[#C89B7B] text-xs tracking-[0.3em] uppercase">The Promise</span>
            <div className="w-12 h-px bg-[#C89B7B]" />
          </div>
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-white">
            The VICAIA Guarantee
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {pillars.map((pillar, i) => (
            <TrustCard key={pillar.title} pillar={pillar} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustCard({
  pillar,
  delay,
}: {
  pillar: (typeof pillars)[0];
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const { Icon, title, description } = pillar;

  return (
    <div
      ref={ref}
      className="reveal text-center group"
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 border border-[#C89B7B]/30 flex items-center justify-center group-hover:border-[#C89B7B] transition-colors duration-500">
          <Icon size={24} className="text-[#C89B7B]" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="font-playfair text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="font-montserrat text-white/50 text-xs leading-relaxed">{description}</p>
    </div>
  );
}
