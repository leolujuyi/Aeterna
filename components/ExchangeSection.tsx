import React, { useState, useEffect } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Button } from './Button';
import { SpotlightCard } from './SpotlightCard';
import { ExchangeDemo } from './ExchangeDemo';
import { Shield, Zap, Lock, Activity, EyeOff, TrendingUp, ArrowRightLeft, Ghost, Network, Scale, Clock, FileKey, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

interface Order {
  price: string;
  amount: string;
  total: string;
  type: 'ask' | 'bid';
}

const Tooltip: React.FC<{ text: string; children: React.ReactNode; position?: 'top' | 'bottom'; className?: string }> = ({ text, children, position = 'top', className = '' }) => {
  const positions = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2'
  };

  return (
    <div className={`group relative flex items-center justify-center ${className}`}>
      {children}
      <div className={`absolute ${positions[position]} px-3 py-1.5 bg-neutral-900 border border-white/20 text-neutral-300 text-[10px] rounded shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60] backdrop-blur-md hidden md:block`}>
        {text}
      </div>
    </div>
  );
};

export const ExchangeSection: React.FC = () => {
  const [isDarkPool, setIsDarkPool] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulation effect for order book
  useEffect(() => {
    const generateOrder = (type: 'ask' | 'bid', base: number) => ({
      price: (base + Math.random() * (type === 'ask' ? 1 : -1)).toFixed(2),
      amount: (Math.random() * 100).toFixed(4),
      total: (Math.random() * 5000).toFixed(2),
      type
    });

    const init = () => {
      const arr: Order[] = [];
      for(let i=0; i<6; i++) arr.push(generateOrder('ask', 1850));
      for(let i=0; i<6; i++) arr.push(generateOrder('bid', 1849));
      setOrders(arr);
    };
    init();

    const interval = setInterval(() => {
       setOrders(prev => prev.map(o => {
           if(Math.random() > 0.7) {
               const base = o.type === 'ask' ? 1850 : 1849;
               return generateOrder(o.type, base);
           }
           return o;
       }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const themeText = isDarkPool ? 'text-indigo-400' : 'text-emerald-400';
  const themeBorder = isDarkPool ? 'border-indigo-500/30' : 'border-emerald-500/30';

  return (
    <section className="py-20 md:py-32 bg-black relative border-t border-white/5 overflow-hidden" id="exchange">
       {/* Background Glow */}
       <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[150px] opacity-10 transition-colors duration-700 pointer-events-none ${isDarkPool ? 'bg-indigo-600' : 'bg-emerald-600'}`} />

       <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16 md:mb-24">
             
             {/* Text Content */}
             <div className="flex-1 w-full">
                <ScrollReveal>
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${themeBorder} ${isDarkPool ? 'bg-indigo-500/10' : 'bg-emerald-500/10'} ${themeText} text-xs font-mono mb-8 uppercase tracking-wider transition-all duration-500`}>
                      {isDarkPool ? <Lock size={12} /> : <Zap size={12} />}
                      <span>{isDarkPool ? 'ZK-Dark Pool Mode' : 'Hyper-Performance Mode'}</span>
                   </div>

                   <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
                      {isDarkPool ? (
                          <>Invisible <span className="text-indigo-400">Liquidity.</span></>
                      ) : (
                          <>Institutional <span className="text-emerald-400">Velocity.</span></>
                      )}
                   </h2>

                   <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl min-h-[auto] md:min-h-[96px]">
                      {isDarkPool 
                        ? "Execute large block orders without slippage or information leakage. Our ZK-Dark Pool encrypts order size and direction using ZK-SNARKs, revealing details only to TEE-enclaves upon execution. Perfect for whales and institutions requiring absolute privacy."
                        : "The world's fastest on-chain Central Limit Order Book (CLOB). Built on the Narwhal DAG for sub-10ms latency and 160k TPS. Experience CEX-level performance with the security of self-custody."}
                   </p>

                   {/* Feature Toggles */}
                   <div className="flex flex-col gap-4 mb-10">
                       <Tooltip text="Click to enable Public High-Performance Mode" position="top">
                         <div 
                           className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-4 group w-full ${!isDarkPool ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                           onClick={() => setIsDarkPool(false)}
                         >
                             <div className={`p-2 rounded-lg ${!isDarkPool ? 'bg-emerald-500 text-black' : 'bg-neutral-800 text-neutral-400'}`}>
                                <Activity size={20} />
                             </div>
                             <div>
                                <h4 className={`font-bold ${!isDarkPool ? 'text-white' : 'text-neutral-400'}`}>Public CLOB</h4>
                                <p className="text-xs text-neutral-500">Transparent orderbook, micro-second matching.</p>
                             </div>
                         </div>
                       </Tooltip>

                       <Tooltip text="Click to enable ZK-Privacy Dark Pool Mode" position="bottom">
                         <div 
                           className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-4 group w-full ${isDarkPool ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                           onClick={() => setIsDarkPool(true)}
                         >
                             <div className={`p-2 rounded-lg ${isDarkPool ? 'bg-indigo-500 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                                <EyeOff size={20} />
                             </div>
                             <div>
                                <h4 className={`font-bold ${isDarkPool ? 'text-white' : 'text-neutral-400'}`}>Dark Pool</h4>
                                <p className="text-xs text-neutral-500">Zero-Knowledge order privacy, Anti-MEV.</p>
                             </div>
                         </div>
                       </Tooltip>
                   </div>

                   <Tooltip text="Launch Interactive Trading Terminal Demo" position="bottom">
                     <Button 
                          onClick={() => setIsTerminalOpen(true)}
                          className={`w-full sm:w-auto ${isDarkPool ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-emerald-500 hover:bg-emerald-400'} text-black border-transparent shadow-lg transition-colors duration-500`}
                     >
                        Launch Terminal <ArrowRightLeft className="ml-2" size={16} />
                     </Button>
                   </Tooltip>
                </ScrollReveal>
             </div>

             {/* UI Simulation */}
             <div className="flex-1 w-full max-w-lg hidden md:block">
                <ScrollReveal delay={200} animation="scale-in">
                   <div className={`rounded-xl border ${themeBorder} bg-[#050505] overflow-hidden transition-colors duration-500 shadow-2xl`}>
                      {/* Terminal Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                         <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                               <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                               <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <span className="ml-2 text-xs font-mono text-neutral-500">Aeterna DEX v2.1</span>
                         </div>
                         <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${isDarkPool ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            {isDarkPool ? 'Encrypted' : 'Live Feed'}
                         </div>
                      </div>

                      {/* Chart Area (Simplified) */}
                      <div className="h-32 border-b border-white/5 p-4 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-end justify-between px-4 pb-4 opacity-30">
                              {[...Array(20)].map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`w-1 rounded-t-sm transition-all duration-300 ${isDarkPool ? 'bg-indigo-500' : 'bg-emerald-500'}`}
                                    style={{ height: `${20 + Math.random() * 80}%` }}
                                  />
                              ))}
                          </div>
                          <div className="relative z-10">
                              <div className="text-2xl font-mono font-bold text-white mb-1">
                                 {isDarkPool ? '****.**' : '1,850.42'} <span className="text-sm text-neutral-500">ETH/USDC</span>
                              </div>
                              <div className={`text-xs font-mono flex items-center gap-1 ${themeText}`}>
                                 <TrendingUp size={12} /> +2.4%
                              </div>
                          </div>
                      </div>

                      {/* Order Book */}
                      <div className="p-4 font-mono text-xs">
                          <div className="grid grid-cols-3 text-neutral-500 mb-2 px-2 uppercase tracking-wider text-[10px]">
                              <span>Price</span>
                              <span className="text-right">Amount</span>
                              <span className="text-right">Total</span>
                          </div>
                          <div className="space-y-1">
                              {/* Asks */}
                              {orders.filter(o => o.type === 'ask').reverse().map((o, i) => (
                                  <div key={`ask-${i}`} className="grid grid-cols-3 px-2 py-0.5 hover:bg-white/5 rounded transition-colors relative overflow-hidden">
                                      <span className="text-red-400 relative z-10">{isDarkPool ? '******' : o.price}</span>
                                      <span className="text-right text-neutral-300 relative z-10">{isDarkPool ? '****' : o.amount}</span>
                                      <span className="text-right text-neutral-500 relative z-10">{isDarkPool ? '****' : o.total}</span>
                                      {/* Fill bar background */}
                                      <div className="absolute top-0 right-0 bottom-0 bg-red-500/10 z-0 transition-all duration-300" style={{ width: `${Math.random() * 50}%` }} />
                                  </div>
                              ))}
                              
                              {/* Spread */}
                              <div className={`py-2 text-center text-[10px] tracking-widest my-1 ${themeText} border-y border-white/5 bg-white/[0.02]`}>
                                  {isDarkPool ? 'Z-KNOWLEDGE SPREAD' : 'SPREAD 0.01%'}
                              </div>

                              {/* Bids */}
                              {orders.filter(o => o.type === 'bid').map((o, i) => (
                                  <div key={`bid-${i}`} className="grid grid-cols-3 px-2 py-0.5 hover:bg-white/5 rounded transition-colors relative overflow-hidden">
                                      <span className={`${themeText} relative z-10`}>{isDarkPool ? '******' : o.price}</span>
                                      <span className="text-right text-neutral-300 relative z-10">{isDarkPool ? '****' : o.amount}</span>
                                      <span className="text-right text-neutral-500 relative z-10">{isDarkPool ? '****' : o.total}</span>
                                      <div className={`absolute top-0 right-0 bottom-0 z-0 transition-all duration-300 ${isDarkPool ? 'bg-indigo-500/10' : 'bg-emerald-500/10'}`} style={{ width: `${Math.random() * 50}%` }} />
                                  </div>
                              ))}
                          </div>
                      </div>
                      
                      {/* Footer Info */}
                      <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between text-[10px] text-neutral-500">
                          <div className="flex items-center gap-1.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${isDarkPool ? 'bg-indigo-500' : 'bg-emerald-500'} animate-pulse`} />
                              WebSocket Connected
                          </div>
                          <div>14ms</div>
                      </div>
                   </div>
                </ScrollReveal>
             </div>
          </div>

          {/* Deep Dive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
             <ScrollReveal delay={0}>
                <SpotlightCard className="h-full p-6 bg-neutral-900/30" spotlightColor={isDarkPool ? "rgba(99, 102, 241, 0.1)" : "rgba(16, 185, 129, 0.1)"}>
                   <div className="mb-4 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Ghost size={20} className={isDarkPool ? "text-indigo-400" : "text-neutral-400"} />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">Private Orders</h3>
                   <p className="text-sm text-neutral-400 leading-relaxed">
                      Utilizes ZK-SNARKs to keep order size and direction hidden from the public mempool until the moment of execution, preventing information leakage.
                   </p>
                </SpotlightCard>
             </ScrollReveal>

             <ScrollReveal delay={100}>
                <SpotlightCard className="h-full p-6 bg-neutral-900/30" spotlightColor={isDarkPool ? "rgba(99, 102, 241, 0.1)" : "rgba(16, 185, 129, 0.1)"}>
                   <div className="mb-4 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Scale size={20} className={isDarkPool ? "text-indigo-400" : "text-neutral-400"} />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">MEV Protection</h3>
                   <p className="text-sm text-neutral-400 leading-relaxed">
                      Encrypted mempool ensures fair ordering. Sandwich attacks and front-running are mathematically impossible due to TEE-based sequencing.
                   </p>
                </SpotlightCard>
             </ScrollReveal>

             <ScrollReveal delay={200}>
                <SpotlightCard className="h-full p-6 bg-neutral-900/30" spotlightColor={isDarkPool ? "rgba(99, 102, 241, 0.1)" : "rgba(16, 185, 129, 0.1)"}>
                   <div className="mb-4 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Network size={20} className={isDarkPool ? "text-indigo-400" : "text-neutral-400"} />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">Atomic Composability</h3>
                   <p className="text-sm text-neutral-400 leading-relaxed">
                      Combine spot, perp, and lending actions in a single transaction block. Execute complex strategies across the entire ecosystem instantly.
                   </p>
                </SpotlightCard>
             </ScrollReveal>

             <ScrollReveal delay={300}>
                <SpotlightCard className="h-full p-6 bg-neutral-900/30" spotlightColor={isDarkPool ? "rgba(99, 102, 241, 0.1)" : "rgba(16, 185, 129, 0.1)"}>
                   <div className="mb-4 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Clock size={20} className={isDarkPool ? "text-indigo-400" : "text-neutral-400"} />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">Sub-ms Latency</h3>
                   <p className="text-sm text-neutral-400 leading-relaxed">
                      Built on the Narwhal + Bullshark DAG consensus, achieving 160k TPS with guaranteed finality under 100ms for HFT-grade performance.
                   </p>
                </SpotlightCard>
             </ScrollReveal>
          </div>

          {/* New Privacy Architecture Section */}
          <div className="border-t border-white/5 pt-16 md:pt-20">
            <ScrollReveal>
              <div className="text-center mb-12 md:mb-16">
                <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest mb-2 block">Under the Hood</span>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Cryptographic <span className="text-indigo-500">Invisibility Cloak</span>
                </h3>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                   How Aeterna achieves total order privacy while maintaining a decentralized, permissionless state.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               {/* ZK Column */}
               <ScrollReveal delay={0}>
                 <div className="bg-neutral-900/20 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all h-full">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                       <FileKey size={120} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                       <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">1</span>
                       Client-Side ZK Proofs
                    </h4>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                       Before an order leaves your device, the Aeterna SDK generates a <strong>Groth16/Plonk proof</strong>.
                       This proves you have the funds and the intent is valid, without revealing:
                    </p>
                    <ul className="space-y-3 mb-6">
                       {['Order Size', 'Limit Price', 'Direction (Buy/Sell)'].map(item => (
                          <li key={item} className="flex items-center gap-2 text-sm text-neutral-300">
                             <CheckCircle2 size={16} className="text-indigo-500" /> {item}
                          </li>
                       ))}
                    </ul>
                    <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-indigo-300 border border-indigo-500/20 overflow-x-auto">
                       <span className="text-neutral-500">// Public Mempool View</span> <br/>
                       {`{ proof: "0x7f2...a9c", inputs: [HASH(price), HASH(qty)] }`}
                    </div>
                 </div>
               </ScrollReveal>

               {/* TEE Column */}
               <ScrollReveal delay={100}>
                 <div className="bg-neutral-900/20 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all h-full">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Cpu size={120} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                       <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">2</span>
                       TEE Sequencing (SGX)
                    </h4>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                       Encrypted orders are routed to validators running <strong>Intel SGX Enclaves</strong>.
                       The matching engine runs inside this secure black box. Order details are decrypted only microseconds before matching.
                    </p>
                    <div className="space-y-4">
                       <div className="flex items-start gap-3">
                          <ShieldCheck className="text-emerald-500 mt-1 shrink-0" size={20} />
                          <div>
                             <strong className="text-white text-sm block">Anti-MEV Guarantee</strong>
                             <span className="text-xs text-neutral-500">Block builders cannot front-run trades they cannot see.</span>
                          </div>
                       </div>
                       <div className="flex items-start gap-3">
                           <Lock className="text-emerald-500 mt-1 shrink-0" size={20} />
                           <div>
                             <strong className="text-white text-sm block">Hardware Root of Trust</strong>
                             <span className="text-xs text-neutral-500">Remote attestation proves code integrity on-chain.</span>
                          </div>
                       </div>
                    </div>
                 </div>
               </ScrollReveal>
            </div>
          </div>
       </div>

       <ExchangeDemo isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} initialMode={isDarkPool ? 'dark' : 'public'} />
    </section>
  );
};