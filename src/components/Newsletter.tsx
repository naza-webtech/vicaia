import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const contentRef = useScrollReveal<HTMLDivElement>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim().toLowerCase() });

    if (error) {
      if (error.code === '23505') {
        setStatus('success');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
        setStatus('error');
      }
    } else {
      setStatus('success');
      setEmail('');
    }
  }

  return (
    <section className="py-24 lg:py-36 bg-[#F8F5F2]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div ref={contentRef} className="reveal max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#C89B7B]" />
            <span className="font-montserrat text-[#C89B7B] text-xs tracking-[0.3em] uppercase">Exclusive Access</span>
            <div className="w-12 h-px bg-[#C89B7B]" />
          </div>

          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-black mb-5">
            Join The<br />
            <span className="italic text-[#C89B7B]">Sovereign Circle</span>
          </h2>

          <p className="font-montserrat text-gray-500 text-sm leading-relaxed mb-10">
            Be the first to know about future drops, launches, and exclusive collections.
          </p>

          {status === 'success' ? (
            <div className="border border-[#C89B7B] px-8 py-6">
              <p className="font-playfair text-xl text-black mb-2">Welcome to the Circle.</p>
              <p className="font-montserrat text-gray-500 text-sm">You will be the first to know.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 border border-black px-6 py-4 font-montserrat text-sm text-black placeholder-gray-400 outline-none focus:border-[#C89B7B] transition-colors bg-white"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-black text-white font-montserrat font-medium tracking-[0.2em] uppercase text-xs px-8 py-4 transition-all duration-300 hover:bg-[#C89B7B] disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining...' : 'Join'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="font-montserrat text-red-500 text-xs mt-4">{errorMsg}</p>
          )}
        </div>
      </div>
    </section>
  );
}
