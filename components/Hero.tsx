import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Box, Bot } from 'lucide-react';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';
import { ParticleBackground } from './ParticleBackground';

// Scramble Text Effect Component (Kept for potential reuse, though usage minimized in this design)
const ScrambleText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    timeout = setTimeout(() => {
      setIsRevealing(true);
      let iteration = 0;
      
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2; // Speed of reveal
      }, 30);

    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={className}>{displayText || (isRevealing ? '' : '\u00A0')}</span>;
};

// CountUp Component
const CountUp: React.FC<{ end: string; duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const numericEnd = parseInt(end.replace(/[^0-9]/g, ''));
  const suffix = end.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = numericEnd / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= numericEnd) {
              setCount(numericEnd.toString());
              clearInterval(timer);
            } else {
              setCount(Math.floor(start).toString());
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericEnd, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

interface HeroProps {
  onOpenAgent: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAgent }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      
      {/* Deep Background - Slower Parallax */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-nexus-yellow/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      {/* Particle Background - Medium Parallax */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <ScrollReveal delay={100} animation="scale-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nexus-yellow/30 bg-nexus-yellow/5 backdrop-blur-sm mb-12 cursor-default hover:bg-nexus-yellow/10 transition-colors shadow-[0_0_15px_rgba(235,255,0,0.1)] group">
            <Box size={14} className="text-nexus-yellow animate-spin-slow" />
            <span className="text-xs font-mono uppercase tracking-widest text-nexus-yellow group-hover:text-white transition-colors">Narwhal + Bullshark Consensus Live</span>
          </div>
        </ScrollReveal>

        {/* Main Title with Pronounced Scale Animation */}
        <div className="relative mb-10 opacity-0 animate-hero-title [animation-fill-mode:forwards] [animation-delay:200ms]">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] flex flex-col items-center">
            {/* New Layout: CHAIN ABSTRACTION */}
            <span className="block text-white mb-2">CHAIN</span>
            <span className="block text-white">ABSTRACTION</span>
            
            {/* Decorative underline */}
            <span className="w-1/2 h-1 bg-nexus-yellow mt-4 transform scale-x-0 animate-[scaleIn_0.8s_ease-out_1.2s_forwards] origin-center shadow-[0_0_20px_#EBFF00]"></span>
          </h1>
        </div>

        <ScrollReveal delay={500}>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
            Control 15+ chains with <span className="text-white font-bold">one Universal Address</span>.
            Empower AI Agents with <span className="text-white font-bold">Autonomous Execution</span> and <span className="text-white font-bold">Trustless Payments</span>.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={700}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button 
                variant="primary" 
                className="h-14 px-12 text-base border-transparent hover:scale-105 bg-nexus-yellow text-black border-nexus-yellow hover:bg-white hover:text-black hover:border-white shadow-[0_0_20px_rgba(235,255,0,0.4)]"
                onClick={onOpenAgent}
            >
               <Bot className="mr-2" size={20} /> Launch AI Agent
            </Button>
            <Button variant="outline" className="h-14 px-12 text-base group bg-black/50 backdrop-blur-sm border-white/20 hover:border-nexus-yellow hover:text-nexus-yellow">
              Read Whitepaper <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </ScrollReveal>

        {/* Floating Stats */}
        <div className="mt-32 border-t border-white/10 pt-16 bg-gradient-to-b from-transparent to-black/80 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'TPS (Narwhal)', value: '160,000+' },
              { label: 'Finality', value: '<100ms' },
              { label: 'Architectural Layers', value: '4' },
              { label: 'On-Chain AI', value: '100%' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={900 + (i * 100)}>
                <div className="text-center group cursor-default relative">
                  <div className="text-4xl md:text-5xl font-bold font-mono mb-2 text-white group-hover:text-nexus-yellow transition-colors duration-300 ease-out">
                    <CountUp end={stat.value} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium group-hover:text-white transition-colors">{stat.label}</div>
                  {/* Subtle dot decoration */}
                  <div className="absolute -left-4 top-1/2 w-1 h-1 bg-neutral-800 rounded-full group-hover:bg-nexus-yellow transition-colors" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};