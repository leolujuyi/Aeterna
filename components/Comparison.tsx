import React from 'react';
import { Check, X, Minus, Zap, Brain, Globe, Shield, Cpu } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

const ComparisonRow: React.FC<{ 
  feature: string; 
  icon: React.ReactNode;
  aeterna: string; 
  near: string; 
  avail: string; 
  sui: string;
  delay: number; 
}> = ({ feature, icon, aeterna, near, avail, sui, delay }) => (
  <div 
    className="grid grid-cols-5 border-b border-white/5 py-6 hover:bg-white/5 transition-colors duration-300 items-center text-sm md:text-base group relative z-10"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="col-span-2 md:col-span-1 text-neutral-300 font-medium pl-6 flex items-center gap-3">
        <span className="text-nexus-yellow/50 group-hover:text-nexus-yellow transition-colors">{icon}</span>
        {feature}
    </div>
    
    <div className="col-span-3 md:col-span-1 text-nexus-yellow font-bold flex items-center gap-2 bg-nexus-yellow/10 p-3 rounded-xl border border-nexus-yellow/20 shadow-[0_0_15px_rgba(235,255,0,0.1)] relative overflow-hidden">
       <div className="absolute inset-0 bg-nexus-yellow/5 animate-pulse-slow"></div>
       <Check size={16} className="relative z-10" strokeWidth={3} /> 
       <span className="relative z-10">{aeterna}</span>
    </div>
    
    <div className="col-span-1 text-neutral-500 hidden md:flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">{near}</div>
    <div className="col-span-1 text-neutral-500 hidden md:flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">{avail}</div>
    <div className="col-span-1 text-neutral-500 hidden md:flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">{sui}</div>
  </div>
);

export const Comparison: React.FC = () => {
  return (
    <section className="py-32 bg-black relative" id="comparison">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-nexus-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-20 text-center">
            <span className="text-nexus-yellow font-mono text-xs uppercase tracking-widest mb-3 block">Benchmark</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700">Superiority</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Aeterna is the only protocol offering native state-machine chain abstraction and decentralized AI inference directly at the consensus layer.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} animation="scale-in">
          <SpotlightCard className="rounded-3xl border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl" spotlightColor="rgba(255, 255, 255, 0.05)">
            {/* Header */}
            <div className="grid grid-cols-5 bg-white/5 py-8 font-bold text-white border-b border-white/10 text-xs md:text-sm uppercase tracking-wider">
              <div className="col-span-2 md:col-span-1 pl-6 flex items-center">Core Feature</div>
              <div className="col-span-3 md:col-span-1 text-nexus-yellow flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-nexus-yellow animate-pulse"></div>
                 Aeterna
              </div>
              <div className="col-span-1 hidden md:block text-neutral-600 text-center">NEAR</div>
              <div className="col-span-1 hidden md:block text-neutral-600 text-center">Avail Nexus</div>
              <div className="col-span-1 hidden md:block text-neutral-600 text-center">Sui</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
               <ComparisonRow 
                 feature="Chain Abstraction"
                 icon={<Globe size={18} />}
                 aeterna="Native (No-MPC)" 
                 near="MPC Signatures" 
                 avail="MPC + Solver" 
                 sui="None"
                 delay={0}
               />
               <ComparisonRow 
                 feature="AI Engine" 
                 icon={<Brain size={18} />}
                 aeterna="Ritual + Bittensor" 
                 near="None" 
                 avail="None" 
                 sui="Basic ML"
                 delay={100}
               />
               <ComparisonRow 
                 feature="Consensus" 
                 icon={<Zap size={18} />}
                 aeterna="Narwhal + Bullshark" 
                 near="Nightshade" 
                 avail="CometBFT" 
                 sui="Narwhal + Bullshark"
                 delay={200}
               />
               <ComparisonRow 
                 feature="Payment Trust" 
                 icon={<Shield size={18} />}
                 aeterna="AP2 + x402" 
                 near="None" 
                 avail="None" 
                 sui="None"
                 delay={300}
               />
               <ComparisonRow 
                 feature="VM Support" 
                 icon={<Cpu size={18} />}
                 aeterna="Multi-VM (Rust/Move)" 
                 near="WASM" 
                 avail="None" 
                 sui="Move Only"
                 delay={400}
               />
            </div>
          </SpotlightCard>
          
           <div className="mt-6 flex justify-center md:hidden">
              <div className="text-xs text-neutral-500 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Globe size={12} /> View on desktop for full comparison
              </div>
           </div>
        </ScrollReveal>
      </div>
    </section>
  );
};