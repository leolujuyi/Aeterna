import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';
import { Server, Brain, Share2, ShieldCheck, Check } from 'lucide-react';

const phases = [
  {
    title: "Phase 1: Genesis",
    status: "completed",
    date: "Infrastructure",
    icon: Server,
    items: ["Mainnet Alpha Launch", "Narwhal + Bullshark Consensus", "Sovereign SDK Integration", "Multi-VM Support (Rust/Move)"]
  },
  {
    title: "Phase 2: Awakening",
    status: "current",
    date: "AI Engine",
    icon: Brain,
    items: ["Ritual Infernet Integration", "Bittensor Subnet Bridge", "On-Chain Agent Orchestrator", "Walrus Memory Protocol"]
  },
  {
    title: "Phase 3: Unification",
    status: "upcoming",
    date: "Abstraction",
    icon: Share2,
    items: ["Universal Address (UA) Live", "Solver Network Auction", "No-MPC Multi-Curve Signing", "Intent Engine V1"]
  },
  {
    title: "Phase 4: Trust",
    status: "upcoming",
    date: "Payment",
    icon: ShieldCheck,
    items: ["Google AP2 Authorization", "x402 Micropayments", "Global Paymaster", "Enterprise API Gateway"]
  }
];

export const Roadmap: React.FC = () => {
  const getDotStyles = (status: string) => {
    if (status === 'completed') return 'border-nexus-yellow bg-nexus-yellow text-black shadow-[0_0_10px_#EBFF00]';
    if (status === 'current') return 'border-nexus-yellow animate-pulse shadow-[0_0_20px_#EBFF00] bg-black';
    return 'border-neutral-800 bg-neutral-900';
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden" id="roadmap">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-nexus-yellow/5 rounded-full blur-[120px] pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
           <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
              Deployment <span className="text-nexus-yellow">Roadmap</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Our strategic path towards a fully interconnected, AI-native decentralized future.
            </p>
           </ScrollReveal>
        </div>

        <div className="max-w-5xl mx-auto relative">
          
          {/* Central Timeline Line with Animated Beam */}
          <div className="absolute top-0 left-8 md:left-1/2 -translate-x-1/2 w-px h-full bg-white/10 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-nexus-yellow to-transparent animate-beam opacity-50" />
          </div>

          {phases.map((phase, index) => {
            const PhaseIcon = phase.icon;
            const isEven = index % 2 === 0;
            const isCurrent = phase.status === 'current';

            return (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between mb-16 md:mb-0 relative w-full ${isEven ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Center Dot (Desktop Only) */}
                <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full border-2 z-20 transition-all duration-500 ${getDotStyles(phase.status)}`}>
                  {phase.status === 'completed' && <Check size={16} strokeWidth={4} />}
                  {isCurrent && <div className="w-3 h-3 bg-nexus-yellow rounded-full animate-ping opacity-75" />}
                  {phase.status === 'upcoming' && <div className="w-2 h-2 bg-neutral-800 rounded-full" />}
                </div>
                
                 {/* Center Dot (Mobile Only) */}
                 <div className={`md:hidden absolute left-8 top-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-2 z-20 transition-all duration-500 bg-black ${getDotStyles(phase.status)}`}>
                  {phase.status === 'completed' && <Check size={16} strokeWidth={4} />}
                  {isCurrent && <div className="w-3 h-3 bg-nexus-yellow rounded-full animate-ping opacity-75" />}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[42%] pl-16 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'} relative md:py-12`}>
                  <ScrollReveal delay={index * 100} animation="scale-in">
                    <SpotlightCard 
                      className={`
                        h-full p-8 border transition-all duration-500 group
                        ${isCurrent 
                          ? 'border-nexus-yellow/50 shadow-[0_0_30px_rgba(235,255,0,0.15)]' 
                          : 'border-white/5 hover:border-white/20'}
                      `}
                      spotlightColor={isCurrent ? "rgba(235, 255, 0, 0.15)" : "rgba(255, 255, 255, 0.1)"}
                      bgClass={isCurrent ? "bg-nexus-yellow/5" : ""}
                    >
                      
                      {/* Background Icon Watermark */}
                      <div className={`
                        absolute ${isEven ? '-left-8' : '-right-8'} -bottom-8 
                        opacity-[0.03] group-hover:opacity-10 
                        transition-all duration-700 ease-out 
                        transform group-hover:scale-125 group-hover:rotate-12
                        text-white pointer-events-none
                        ${isCurrent ? 'opacity-[0.07] text-nexus-yellow' : ''}
                      `}>
                        <PhaseIcon size={180} strokeWidth={1} />
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Meta Info Row */}
                        <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                isCurrent ? 'border-nexus-yellow/30 text-nexus-yellow bg-nexus-yellow/10' : 'border-white/10 text-neutral-500 bg-white/5'
                              }`}>
                            {phase.status}
                          </span>
                          <span className={`font-mono text-sm ${isCurrent ? 'text-nexus-yellow' : 'text-neutral-500'}`}>{phase.date}</span>
                        </div>

                        {/* Title with Inline Icon */}
                        <h3 className={`text-2xl font-bold mb-6 text-white flex items-center gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className={`
                               flex items-center justify-center w-10 h-10 rounded-lg border backdrop-blur-sm
                               ${isCurrent ? 'bg-nexus-yellow text-black border-nexus-yellow' : 'bg-white/5 text-white border-white/10 group-hover:bg-nexus-yellow group-hover:text-black group-hover:border-nexus-yellow'}
                               transition-all duration-300 group-hover:scale-110
                            `}>
                               <PhaseIcon size={20} strokeWidth={2} />
                            </div>
                            <span className="group-hover:text-nexus-yellow transition-colors duration-300">{phase.title}</span>
                        </h3>
                        
                        {/* Items List */}
                        <ul className={`space-y-3 ${isEven ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                          {phase.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 group/item">
                              {isEven && <span className={`hidden md:block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isCurrent ? 'bg-nexus-yellow/70' : 'bg-neutral-800 group-hover/item:bg-white'}`} />}
                              <span className={`md:hidden w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-nexus-yellow/70' : 'bg-neutral-800'}`} />
                              
                              <span className={`text-sm transition-colors duration-300 ${isCurrent ? 'text-neutral-300' : 'text-neutral-500 group-hover/item:text-neutral-300'}`}>
                                {item}
                              </span>
                              
                              {!isEven && <span className={`hidden md:block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isCurrent ? 'bg-nexus-yellow/70' : 'bg-neutral-800 group-hover/item:bg-white'}`} />}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </SpotlightCard>
                  </ScrollReveal>
                </div>

                {/* Empty side for layout balance */}
                <div className="hidden md:block w-[42%]" />
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};