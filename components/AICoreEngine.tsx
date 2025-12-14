import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';
import { Brain, Cpu, Database, Network, Share2, Code, Workflow } from 'lucide-react';

export const AICoreEngine: React.FC = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/5" id="ai-core-engine">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-6 uppercase tracking-wider">
               <Brain size={12} />
               <span>Layer 2: AI Core Engine</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
              Decentralized <span className="text-white">AgentCore</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
               A never-down intelligent network replicating AWS Bedrock. 
               Orchestrated by CosmWasm, Powered by Ritual, Incentivized by Bittensor.
            </p>
          </div>
        </ScrollReveal>

        {/* Core Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
           {/* Card 1: Orchestrator */}
           <ScrollReveal delay={0}>
              <SpotlightCard className="h-full p-8 bg-neutral-900/20" spotlightColor="rgba(168, 85, 247, 0.2)">
                 <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                    <Workflow size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Orchestrator Brain</h3>
                 <p className="text-sm text-neutral-400 mb-4">On-Chain Supervisor Agent</p>
                 <ul className="space-y-2 text-sm text-neutral-500">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> CosmWasm Contracts</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Task Decomposition (ReAct)</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Full State On-Chain</li>
                 </ul>
              </SpotlightCard>
           </ScrollReveal>
           
           {/* Card 2: Inference */}
           <ScrollReveal delay={100}>
              <SpotlightCard className="h-full p-8 bg-neutral-900/20" spotlightColor="rgba(168, 85, 247, 0.2)">
                 <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                    <Cpu size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Inference Engine</h3>
                 <p className="text-sm text-neutral-400 mb-4">Ritual (Infernet)</p>
                 <ul className="space-y-2 text-sm text-neutral-500">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Verifiable ZK/TEE Proofs</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Gemini 3 / Llama 3.1 405B</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> No Single Point of Failure</li>
                 </ul>
              </SpotlightCard>
           </ScrollReveal>

           {/* Card 3: Incentives */}
           <ScrollReveal delay={200}>
              <SpotlightCard className="h-full p-8 bg-neutral-900/20" spotlightColor="rgba(168, 85, 247, 0.2)">
                 <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                    <Network size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Eco Incentives</h3>
                 <p className="text-sm text-neutral-400 mb-4">Bittensor Subnets</p>
                 <ul className="space-y-2 text-sm text-neutral-500">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Compute Staking</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Model Competition</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Yuma Consensus</li>
                 </ul>
              </SpotlightCard>
           </ScrollReveal>

           {/* Card 4: Memory */}
           <ScrollReveal delay={300}>
              <SpotlightCard className="h-full p-8 bg-neutral-900/20" spotlightColor="rgba(168, 85, 247, 0.2)">
                 <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                    <Database size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Long-Term Memory</h3>
                 <p className="text-sm text-neutral-400 mb-4">Walrus + Vector DB</p>
                 <ul className="space-y-2 text-sm text-neutral-500">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Decentralized Blob Storage</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Blob ID in Contract</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Vector Retrieval</li>
                 </ul>
              </SpotlightCard>
           </ScrollReveal>

           {/* Card 5: Tools */}
           <ScrollReveal delay={400}>
              <SpotlightCard className="h-full p-8 bg-neutral-900/20" spotlightColor="rgba(168, 85, 247, 0.2)">
                 <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                    <Share2 size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Tool Layer</h3>
                 <p className="text-sm text-neutral-400 mb-4">Native Integration</p>
                 <ul className="space-y-2 text-sm text-neutral-500">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> DEX / Oracle Access</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> IBC Bridge Calls</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"/> Automated DeFi</li>
                 </ul>
              </SpotlightCard>
           </ScrollReveal>
        </div>

        {/* Deep Dive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            
            {/* Ritual Detail */}
            <ScrollReveal>
                <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8 relative overflow-hidden h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <Cpu className="text-purple-400" size={32} />
                        <h3 className="text-2xl font-bold text-white">Ritual Inference</h3>
                    </div>
                    <p className="text-neutral-400 mb-6">
                        The preferred solution for decentralized AI inference, enabling smart contracts to natively access advanced models.
                    </p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-black/40 rounded border border-white/5">
                            <span className="text-sm text-neutral-400">Network</span>
                            <span className="text-sm font-bold text-white">Infernet Nodes</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-black/40 rounded border border-white/5">
                            <span className="text-sm text-neutral-400">Proofs</span>
                            <span className="text-sm font-bold text-white">ZK / TEE / Optimistic</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-black/40 rounded border border-white/5">
                            <span className="text-sm text-neutral-400">Models</span>
                            <span className="text-sm font-bold text-white">Llama 3, Gemini 3, GPT-4o</span>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Bittensor Detail */}
            <ScrollReveal delay={100}>
                 <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8 relative overflow-hidden h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <Network className="text-purple-400" size={32} />
                        <h3 className="text-2xl font-bold text-white">Bittensor Incentives</h3>
                    </div>
                    <p className="text-neutral-400 mb-6">
                        Sovereign execution layer running TAO-compatible subnets to crowdsource the best intelligence.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-black/40 rounded border border-white/5">
                            <div className="text-xs text-neutral-500 uppercase mb-1">Miners</div>
                            <div className="font-bold text-white">Run Models</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded border border-white/5">
                            <div className="text-xs text-neutral-500 uppercase mb-1">Validators</div>
                            <div className="font-bold text-white">Evaluate Quality</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded border border-white/5">
                            <div className="text-xs text-neutral-500 uppercase mb-1">Subnets</div>
                            <div className="font-bold text-white">125+ Tracks</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded border border-white/5">
                            <div className="text-xs text-neutral-500 uppercase mb-1">Emission</div>
                            <div className="font-bold text-white">41% / 41% / 18%</div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>

        {/* Protocols Table */}
        <ScrollReveal>
             <div className="rounded-2xl border border-white/10 bg-neutral-900/30 overflow-hidden">
                <div className="px-8 py-6 border-b border-white/10 flex items-center gap-3 bg-white/5">
                    <Code className="text-purple-400" size={20} />
                    <h3 className="text-lg font-bold text-white">AI Agent Protocols</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-neutral-400 font-mono uppercase text-xs">
                            <tr>
                                <th className="px-8 py-4">Protocol</th>
                                <th className="px-8 py-4">Function</th>
                                <th className="px-8 py-4">Integration Module</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-neutral-300">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-4 font-bold text-white">ERC-8004</td>
                                <td className="px-8 py-4">AI Agent Identity & Trust Registration</td>
                                <td className="px-8 py-4 font-mono text-purple-400">x/agent</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-4 font-bold text-white">x402</td>
                                <td className="px-8 py-4">AI Native Micropayments (HTTP 402)</td>
                                <td className="px-8 py-4 font-mono text-purple-400">x/pay</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-4 font-bold text-white">Google A2A</td>
                                <td className="px-8 py-4">Agent-to-Agent Communication</td>
                                <td className="px-8 py-4 font-mono text-purple-400">Hooks + IBC</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-4 font-bold text-white">Google AP2</td>
                                <td className="px-8 py-4">Payment Authorization Framework</td>
                                <td className="px-8 py-4 font-mono text-purple-400">x/ap2pay</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             </div>
        </ScrollReveal>

      </div>
    </section>
  );
};