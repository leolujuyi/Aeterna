import React from 'react';
import { Server, Brain, Globe, Shield, Zap, Cpu, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SpecItem {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  details: { label: string; value: string }[];
}

const specs: SpecItem[] = [
  {
    id: "spec-infrastructure", // Renamed to avoid conflict with Features
    icon: Server,
    title: "Infrastructure",
    subtitle: "LAYER 01",
    description: "Built on Cosmos SDK + Sovereign SDK. Decoupled execution and data availability ensures maximum throughput and modularity.",
    details: [
      { label: "Framework", value: "Cosmos + Sovereign" },
      { label: "DA Layer", value: "Celestia / Avail" },
      { label: "State Sync", value: "ZK-Light Clients" }
    ]
  },
  {
    id: "spec-ai", // Renamed
    icon: Brain,
    title: "AI Engine",
    subtitle: "LAYER 02",
    description: "Embedded AI coprocessor. Infernet nodes allow smart contracts to request off-chain inference with verified ZK or TEE proofs.",
    details: [
      { label: "Inference", value: "Ritual Infernet" },
      { label: "Verifiability", value: "ZK / TEE Proofs" },
      { label: "Memory", value: "Walrus Vector DB" }
    ]
  },
  {
    id: "spec-abstraction", // Renamed
    icon: Globe,
    title: "Abstraction",
    subtitle: "LAYER 03",
    description: "Universal Address (UA) using native state-machine derivation. Control accounts on 15+ chains without MPC vulnerabilities.",
    details: [
      { label: "Mechanism", value: "Multi-Curve Derivation" },
      { label: "Transport", value: "Polymer / Hyperlane" },
      { label: "Settlement", value: "Solver Dutch Auction" }
    ]
  },
  {
    id: "spec-payment", // Renamed
    icon: Shield,
    title: "Payments",
    subtitle: "LAYER 04",
    description: "x402 Protocol (HTTP 402) for AI Agent micropayments. Includes Paymaster abstraction and anti-hallucination spending limits.",
    details: [
      { label: "Standard", value: "x402 (HTTP Code)" },
      { label: "Auth", value: "Google AP2 / Passkeys" },
      { label: "Safety", value: "Spending Limits" }
    ]
  },
  {
    id: "tech-consensus", // Kept (Not in Features)
    icon: Zap,
    title: "Consensus",
    subtitle: "CORE",
    description: "Narwhal + Bullshark DAG. Separates data dissemination from metadata ordering for sub-second finality.",
    details: [
      { label: "Architecture", value: "DAG-based Mempool" },
      { label: "Latency", value: "< 100ms Finality" },
      { label: "Throughput", value: "160,000+ TPS" }
    ]
  },
  {
    id: "tech-vm", // Kept (Not in Features)
    icon: Cpu,
    title: "Multi-VM",
    subtitle: "EXECUTION",
    description: "Unified execution environment supporting Rust (Wasm), Move, and EVM smart contracts in a single state tree.",
    details: [
      { label: "Primary VM", value: "WASM (Rust)" },
      { label: "Safety VM", value: "Move (Sui-flavor)" },
      { label: "Legacy", value: "EVM Support" }
    ]
  }
];

const SpecCard: React.FC<{ item: SpecItem }> = ({ item }) => (
  <div id={item.id} className="group relative flex flex-col h-full bg-[#0A0A0A] border border-white/10 hover:border-nexus-yellow/50 transition-all duration-500 overflow-hidden scroll-mt-32">
    {/* Hover Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-nexus-yellow/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="p-8 flex flex-col h-full relative z-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-nexus-yellow group-hover:scale-110 group-hover:bg-nexus-yellow group-hover:text-black transition-all duration-300 shrink-0">
          <item.icon size={24} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-end">
             <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-1 group-hover:text-nexus-yellow transition-colors">
                {item.subtitle}
             </span>
             <ArrowUpRight size={16} className="text-neutral-700 group-hover:text-nexus-yellow opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0" />
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-nexus-yellow transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
          {item.description}
        </p>
      </div>

      {/* Tech Details Table (HUD Style) */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="space-y-3">
          {item.details.map((detail, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs group/row">
              <span className="text-neutral-500 font-mono uppercase tracking-wider group-hover/row:text-neutral-400 transition-colors">
                {detail.label}
              </span>
              <span className="text-neutral-300 font-mono bg-white/5 px-2 py-1 rounded border border-transparent group-hover:border-nexus-yellow/20 group-hover:text-white transition-all">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Decorative Background Icon */}
    <div className="absolute -bottom-8 -right-8 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none">
        <item.icon size={200} />
    </div>
  </div>
);

export const TechSpecs: React.FC = () => {
  return (
    <section className="py-32 bg-black relative border-t border-white/5">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-20 md:flex justify-between items-end">
            <div>
                <span className="text-nexus-yellow font-mono text-xs uppercase tracking-widest mb-2 block">System Modules</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Protocol <span className="text-neutral-500">Specifications</span>
                </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-sm md:text-right mt-4 md:mt-0 font-light leading-relaxed">
                A modular stack designed for autonomous AI agents. <br className="hidden md:block"/>
                Seamlessly integrated from consensus to application layer.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-2xl">
          {specs.map((spec, i) => (
            <ScrollReveal key={spec.id} delay={i * 50} className="h-full">
              <SpecCard item={spec} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};