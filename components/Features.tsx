import React from 'react';
import { Server, Brain, Share2, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

const Card: React.FC<{ 
  id?: string;
  title: string; 
  subtitle: string;
  desc: string; 
  icon: React.ReactNode; 
  className?: string;
  delay?: number;
  tags?: string[];
}> = ({ id, title, subtitle, desc, icon, className, delay, tags }) => (
  <ScrollReveal delay={delay} className={`h-full ${className}`}>
    <div id={id} className="h-full scroll-mt-32">
      <SpotlightCard 
        className="h-full group p-8 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:border-nexus-yellow/40 hover:shadow-[0_10px_40px_-10px_rgba(235,255,0,0.1)] bg-neutral-900/20" 
        spotlightColor="rgba(235, 255, 0, 0.15)"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-nexus-yellow group-hover:text-black transition-all duration-500 shadow-[0_0_0_1px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(235,255,0,0.4)] shrink-0">
              {icon}
            </div>
            <span className="text-xs font-mono font-bold text-nexus-yellow border border-nexus-yellow bg-nexus-yellow/10 px-3 py-1.5 rounded tracking-wide group-hover:bg-nexus-yellow group-hover:text-black transition-colors duration-300">
              {subtitle}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-white font-mono tracking-tight group-hover:text-nexus-yellow transition-colors duration-300">{title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed flex-grow group-hover:text-neutral-300 transition-colors duration-300 mb-6">{desc}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags?.map((tag, i) => (
              <span key={i} className="text-[10px] font-mono border border-white/10 rounded px-2 py-1 text-neutral-500 group-hover:border-nexus-yellow/30 group-hover:text-nexus-yellow transition-colors duration-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </div>
  </ScrollReveal>
);

export const Features: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-black relative" id="architecture">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 md:flex justify-between items-end">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
              The 4-Layer <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-600">Architecture Blueprint</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-neutral-400 max-w-sm text-lg md:text-right font-light mt-4 md:mt-0">
              Decoupled, Modular, and Sovereign. <br className="hidden md:inline" />
              Built for the next generation of AI Agents.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            id="layer-infrastructure"
            title="Infrastructure"
            subtitle="Layer 1"
            desc="High-performance modular foundation with decoupled execution and storage. Supports 160k+ TPS via DAG-based consensus."
            icon={<Server size={28} />}
            delay={0}
            tags={["Cosmos SDK", "Sovereign SDK", "Narwhal+Bullshark", "Walrus"]}
          />
          <Card 
            id="layer-ai"
            title="AI Core Engine"
            subtitle="Layer 2"
            desc="The decentralized brain. Orchestrates tasks, verifies inference via ZK/TEE, and maintains long-term memory for Agents."
            icon={<Brain size={28} />}
            delay={200}
            tags={["Ritual Infernet", "Bittensor", "Vector DB", "Chain Orchestrator"]}
          />
          <Card 
            id="layer-abstraction"
            title="Chain Abstraction"
            subtitle="Layer 3"
            desc="Native state-machine level abstraction. One Universal Address to control 15+ chains without MPC vulnerabilities."
            icon={<Share2 size={28} />}
            delay={300}
            tags={["Universal Address", "Solver Network", "No-MPC", "Intent Engine"]}
          />
          <Card 
            id="layer-payment"
            title="Payment & Trust"
            subtitle="Layer 4"
            desc="Anti-hallucination frameworks for AI spending. Micro-payments and atomic authorization for autonomous agents."
            icon={<ShieldCheck size={28} />}
            delay={400}
            tags={["Google AP2", "x402 Protocol", "Paymaster", "Gas Abstraction"]}
          />
        </div>
      </div>
    </section>
  );
};