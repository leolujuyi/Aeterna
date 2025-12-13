import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const chains = [
  "Ethereum", "Solana", "Bitcoin", "Cosmos", "Arbitrum", 
  "Optimism", "Base", "Sui", "Aptos", "Sei", 
  "Celestia", "TON", "Near", "Polkadot", "Avalanche"
];

const ChainTag: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-neutral-900/50 backdrop-blur-md mx-4 min-w-max hover:border-nexus-yellow/50 transition-colors group cursor-default">
    <div className="w-2 h-2 rounded-full bg-nexus-yellow/50 group-hover:bg-nexus-yellow group-hover:shadow-[0_0_8px_#EBFF00] transition-all" />
    <span className="text-lg font-bold text-neutral-400 group-hover:text-white transition-colors tracking-wide">{name}</span>
  </div>
);

export const Ecosystem: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <ScrollReveal>
        <div className="container mx-auto px-6 mb-12 text-center">
          <span className="text-nexus-yellow font-mono text-xs uppercase tracking-widest mb-2 block">Interoperability</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Native Connection to <span className="text-neutral-500">15+ Chains</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left Scroll */}
        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] mb-8">
          {[...chains, ...chains].map((chain, i) => (
            <ChainTag key={`${chain}-1-${i}`} name={chain} />
          ))}
        </div>

        {/* Row 2: Right Scroll (offset content slightly) */}
        <div className="flex w-max animate-scroll-right hover:[animation-play-state:paused]">
          {[...chains.reverse(), ...chains].map((chain, i) => (
            <ChainTag key={`${chain}-2-${i}`} name={chain} />
          ))}
        </div>
      </div>
    </section>
  );
};