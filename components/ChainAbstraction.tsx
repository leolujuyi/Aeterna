import React, { useState, useEffect } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Button } from './Button';
import { Globe, ArrowRight, Layers, Zap, ShieldCheck, Cpu, CheckCircle2, Lock, Key, RefreshCw, Timer, Coins, BarChart3 } from 'lucide-react';

interface ChainNode {
  id: string;
  name: string;
  color: string;
  icon?: string;
  angle: number; // Position on the circle (degrees)
}

const chains: ChainNode[] = [
  { id: 'eth', name: 'Ethereum', color: '#627EEA', angle: 270 },
  { id: 'sol', name: 'Solana', color: '#14F195', angle: 342 },
  { id: 'btc', name: 'Bitcoin', color: '#F7931A', angle: 54 },
  { id: 'arb', name: 'Arbitrum', color: '#2D374B', angle: 126 },
  { id: 'cos', name: 'Cosmos', color: '#2E3148', angle: 198 },
];

export const ChainAbstraction: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0); // 0: Idle, 1: Signing, 2: Solving, 3: Executing, 4: Success
  const [intent, setIntent] = useState("Swap 1000 USDC (Arb) → 15 SOL (Solana)");

  const handleExecute = () => {
    if (activeStep > 0) return;
    setActiveStep(1); // Signing (1.5s)
    
    setTimeout(() => setActiveStep(2), 1500); // Solving (2s)
    setTimeout(() => setActiveStep(3), 3500); // Executing (2s)
    setTimeout(() => setActiveStep(4), 5500); // Success (2s)
    setTimeout(() => setActiveStep(0), 8500); // Reset
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden" id="chain-abstraction">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,255,0,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nexus-yellow/30 bg-nexus-yellow/5 text-nexus-yellow text-xs font-mono mb-6 uppercase tracking-wider">
               <Globe size={12} />
               <span>Layer 3 Abstraction</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
              One Key. <span className="text-white">Every Door.</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
              The Universal Address (UA) protocol abstracts liquidity, gas, and signatures. 
              Control assets on 15+ chains with a single Passkey or MetaMask signature.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           
           {/* Interactive Visualization */}
           <ScrollReveal delay={100} className="relative h-[500px] flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                 
                 {/* Orbit Rings */}
                 <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
                 <div className="absolute inset-[15%] rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
                 
                 {/* Central Node (Universal Address) */}
                 <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full 
                    bg-black border-2 flex flex-col items-center justify-center z-20 transition-all duration-500
                    ${activeStep === 1 ? 'border-nexus-yellow shadow-[0_0_50px_rgba(235,255,0,0.3)] scale-110' : 'border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}
                    ${activeStep === 4 ? 'border-green-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : ''}
                 `}>
                    <div className="relative">
                       {activeStep === 0 && <Key className="text-white w-8 h-8" />}
                       {activeStep === 1 && <Lock className="text-nexus-yellow w-8 h-8 animate-pulse" />}
                       {activeStep === 2 && <Cpu className="text-blue-400 w-8 h-8 animate-spin-slow" />}
                       {activeStep === 3 && <Zap className="text-orange-400 w-8 h-8 animate-pulse" />}
                       {activeStep === 4 && <CheckCircle2 className="text-green-500 w-8 h-8" />}
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                       {activeStep === 0 && "UA Idle"}
                       {activeStep === 1 && "Signing"}
                       {activeStep === 2 && "Solving"}
                       {activeStep === 3 && "Bridging"}
                       {activeStep === 4 && "Complete"}
                    </div>
                 </div>

                 {/* Chain Satellites */}
                 {chains.map((chain, i) => {
                    const isTarget = (chain.id === 'sol' || chain.id === 'arb');
                    const isActive = activeStep >= 3 && isTarget;
                    
                    // Calculate position
                    const radius = 42; // percentage
                    const x = 50 + radius * Math.cos((chain.angle * Math.PI) / 180);
                    const y = 50 + radius * Math.sin((chain.angle * Math.PI) / 180);

                    return (
                       <div 
                          key={chain.id}
                          className={`
                            absolute w-12 h-12 rounded-full bg-neutral-900 border flex items-center justify-center z-10 transition-all duration-700
                            ${isActive ? 'border-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/10 text-neutral-600'}
                          `}
                          style={{ 
                             left: `${x}%`, 
                             top: `${y}%`, 
                             transform: `translate(-50%, -50%) ${isActive ? 'scale(1.2)' : 'scale(1)'}` 
                          }}
                       >
                          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: chain.color }} />
                          
                          {/* Connection Beam */}
                          {isActive && (
                             <div className="absolute top-1/2 left-1/2 w-[160px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left -z-10 animate-beam-shoot"
                                  style={{ 
                                     transform: `rotate(${chain.angle + 180}deg)`,
                                     width: '180px' // Approximate radius distance in pixels relative to container
                                  }} 
                             />
                          )}
                       </div>
                    );
                 })}
              </div>
           </ScrollReveal>

           {/* Controls & Features */}
           <div className="flex flex-col gap-8">
              <ScrollReveal delay={200}>
                 <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <RefreshCw size={100} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-6">Intent Execution Demo</h3>
                    
                    <div className="bg-black/50 border border-white/10 rounded-xl p-4 mb-6 font-mono text-sm text-neutral-300 flex items-center justify-between">
                       <span>{intent}</span>
                       <span className="text-nexus-yellow text-xs border border-nexus-yellow/20 px-2 py-1 rounded bg-nexus-yellow/5">
                          Cross-Chain
                       </span>
                    </div>

                    <div className="space-y-4 mb-8">
                       <div className={`flex items-center gap-4 transition-opacity duration-300 ${activeStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= 1 ? 'bg-nexus-yellow text-black' : 'bg-neutral-800'}`}>1</div>
                          <div>
                             <div className="text-white text-sm font-bold">Single Signature</div>
                             <div className="text-xs text-neutral-500">User signs intent via Passkey (No MPC)</div>
                          </div>
                       </div>
                       <div className={`flex items-center gap-4 transition-opacity duration-300 ${activeStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= 2 ? 'bg-blue-500 text-black' : 'bg-neutral-800'}`}>2</div>
                          <div>
                             <div className="text-white text-sm font-bold">Solver Auction</div>
                             <div className="text-xs text-neutral-500">Solvers compete to fill order for best price</div>
                          </div>
                       </div>
                       <div className={`flex items-center gap-4 transition-opacity duration-300 ${activeStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= 3 ? 'bg-green-500 text-black' : 'bg-neutral-800'}`}>3</div>
                          <div>
                             <div className="text-white text-sm font-bold">Atomic Settlement</div>
                             <div className="text-xs text-neutral-500">Funds released on destination chain instantly</div>
                          </div>
                       </div>
                    </div>

                    <Button 
                       onClick={handleExecute} 
                       disabled={activeStep > 0}
                       className={`w-full ${activeStep > 0 ? 'opacity-50 cursor-not-allowed' : ''} bg-white text-black hover:bg-neutral-200 border-transparent`}
                    >
                       {activeStep === 0 ? "Execute Intent" : 
                        activeStep === 4 ? "Execution Complete" : "Processing..."}
                       {activeStep === 0 && <ArrowRight size={18} className="ml-2" />}
                    </Button>
                 </div>
              </ScrollReveal>

              <div className="grid grid-cols-2 gap-4">
                 <ScrollReveal delay={300}>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-nexus-yellow/30 transition-colors">
                       <ShieldCheck className="text-nexus-yellow mb-2" size={24} />
                       <h4 className="font-bold text-white mb-1">No-MPC Security</h4>
                       <p className="text-xs text-neutral-400">Native state machine derivation. Your keys never leave your device.</p>
                    </div>
                 </ScrollReveal>
                 <ScrollReveal delay={400}>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-nexus-yellow/30 transition-colors">
                       <Zap className="text-nexus-yellow mb-2" size={24} />
                       <h4 className="font-bold text-white mb-1">Gas Abstraction</h4>
                       <p className="text-xs text-neutral-400">Pay gas in any token (USDC, ETH, SOL). We handle the conversion.</p>
                    </div>
                 </ScrollReveal>
              </div>
           </div>

        </div>

        {/* New Section: Solver Network Deep Dive */}
        <div className="mt-32 border-t border-white/5 pt-24">
            <ScrollReveal>
                <div className="text-center mb-16">
                    <span className="text-nexus-yellow font-mono text-xs uppercase tracking-widest mb-2 block">Execution Layer</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        The <span className="text-blue-500">Solver Network</span>
                    </h3>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        A permissionless marketplace where specialized agents compete to fulfill cross-chain intents faster and cheaper.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1: Dutch Auction */}
                <ScrollReveal delay={0} className="h-full">
                   <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all h-full group">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                            <Timer size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Dutch Auction Engine</h4>
                        <div className="space-y-4 text-sm text-neutral-400">
                            <p>
                                Unlike AMMs, Solvers bid to fill your order. The price starts high and decays rapidly until a Solver accepts.
                            </p>
                            <div className="bg-black rounded-lg p-4 font-mono text-xs space-y-2 border border-white/5">
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Decay Frequency</span>
                                    <span className="text-white">150ms / tick</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Decay Ratio</span>
                                    <span className="text-white">0.5% linear</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Auction Venue</span>
                                    <span className="text-white">On-Chain (L3)</span>
                                </div>
                            </div>
                        </div>
                   </div>
                </ScrollReveal>

                {/* Card 2: Liquidity Sourcing */}
                <ScrollReveal delay={100} className="h-full">
                    <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8 hover:border-nexus-yellow/30 transition-all h-full group">
                        <div className="w-12 h-12 rounded-lg bg-nexus-yellow/10 flex items-center justify-center text-nexus-yellow mb-6 group-hover:scale-110 transition-transform">
                             <Coins size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Just-In-Time Liquidity</h4>
                        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                            Solvers utilize diverse sources to fund execution instantly on the destination chain, often before the source transaction finalizes.
                        </p>
                        <ul className="space-y-2 text-sm text-neutral-400">
                             <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-nexus-yellow rounded-full" />
                                <span>Flash Loans (Aave/Uniswap)</span>
                             </li>
                             <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-nexus-yellow rounded-full" />
                                <span>Private Inventory (Wintermute/Jump)</span>
                             </li>
                             <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-nexus-yellow rounded-full" />
                                <span>Staked Liquidity Vaults (SLV)</span>
                             </li>
                        </ul>
                    </div>
                </ScrollReveal>

                {/* Card 3: Settlement */}
                <ScrollReveal delay={200} className="h-full">
                    <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-all h-full group">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                             <BarChart3 size={24} />
                        </div>
                         <h4 className="text-xl font-bold text-white mb-4">Optimistic Settlement</h4>
                         <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            Solvers take on the reorg risk. Users get funds instantly.
                            If a Solver fails to deliver, their stake is slashed and the user is refunded by the SLV.
                         </p>
                         <div className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 px-3 py-2 rounded border border-green-500/20">
                            <CheckCircle2 size={14} />
                            <span>Guaranteed Execution</span>
                         </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
      </div>
    </section>
  );
};