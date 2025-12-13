import React, { useState } from 'react';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';

export const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-32 border-t border-white/10 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-neutral-900/20" />
      
      {/* Animated Mesh Gradient Background for CTA */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nexus-yellow/30 rounded-full blur-[100px] animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-none">
              The Future is <br/>
              <span className="text-nexus-yellow">Chainless.</span>
            </h2>
            <p className="text-neutral-400 mb-12 max-w-xl mx-auto text-lg">
              Deploy your first AI Agent on Aeterna today. Access liquidity and data across 15+ chains with a single Universal Address.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
              <Button variant="primary" className="h-14 px-10 text-base shadow-[0_0_30px_rgba(235,255,0,0.3)] bg-nexus-yellow text-black border-nexus-yellow hover:bg-white hover:border-white">
                Start Building <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" className="h-14 px-10 text-base">
                Join Discord
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                <Mail size={16} className="text-nexus-yellow" />
                Stay Updated
              </h3>
              
              {status === 'success' ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center justify-center gap-3 text-green-400 animate-fade-in-up">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">Welcome to the resistance.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full bg-black border border-white/20 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-nexus-yellow/50 focus:ring-1 focus:ring-nexus-yellow/50 transition-all font-mono placeholder-neutral-600 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-black rounded-lg hover:bg-nexus-yellow transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                  </button>
                </form>
              )}
              <p className="text-[10px] text-neutral-600 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};