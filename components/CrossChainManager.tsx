import React, { useState, useEffect } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ArrowRight, Check, X, AlertCircle, Loader2, ChevronRight, Activity, Zap, ShieldCheck, ExternalLink, Settings, XCircle, RefreshCw, Clock } from 'lucide-react';

interface OperationStep {
  label: string;
  status: 'completed' | 'current' | 'pending' | 'failed';
  timestamp?: string;
  detail?: string;
}

interface Operation {
  id: string;
  type: string;
  sourceChain: string;
  targetChain: string;
  sourceToken: string;
  targetToken: string;
  amount: string;
  status: 'processing' | 'completed' | 'failed';
  steps: OperationStep[];
  solver?: string;
  estimatedTime?: string;
}

const mockOperations: Operation[] = [
  {
    id: '0x8f2...91b',
    type: 'Cross-Chain Swap',
    sourceChain: 'Arbitrum',
    targetChain: 'Solana',
    sourceToken: 'USDC',
    targetToken: 'SOL',
    amount: '1,000.00',
    status: 'processing',
    solver: 'Wintermute',
    estimatedTime: '~15s remaining',
    steps: [
      { label: 'Intent Signed', status: 'completed', timestamp: '10:42:01', detail: 'Signed via Universal Address' },
      { label: 'Solver Auction', status: 'completed', timestamp: '10:42:03', detail: 'Winner: Wintermute (0.05% fee)' },
      { label: 'Source Lock', status: 'current', timestamp: 'Processing...', detail: 'Verifying USDC deposit on Arbitrum' },
      { label: 'Destination Fill', status: 'pending', detail: 'Releasing SOL on Solana' }
    ]
  },
  {
    id: '0x7e3...55a',
    type: 'Yield Farm Deposit',
    sourceChain: 'Base',
    targetChain: 'Arbitrum',
    sourceToken: 'ETH',
    targetToken: 'aArbUSDC',
    amount: '2.50',
    status: 'processing',
    solver: 'Flow Traders',
    estimatedTime: '~45s remaining',
    steps: [
      { label: 'Intent Signed', status: 'completed', timestamp: '10:43:12', detail: 'Biometric Auth Confirmed' },
      { label: 'Solver Auction', status: 'current', timestamp: 'Processing...', detail: 'Broadcasting to Solver Network' },
      { label: 'Source Lock', status: 'pending', detail: 'Pending Auction Winner' },
      { label: 'Yield Route', status: 'pending', detail: 'Deposit to Aave V3' }
    ]
  },
  {
    id: '0x3a1...74c',
    type: 'Bridge & Stake',
    sourceChain: 'Ethereum',
    targetChain: 'Cosmos Hub',
    sourceToken: 'ETH',
    targetToken: 'ATOM',
    amount: '5.50',
    status: 'completed',
    solver: 'Jump Crypto',
    estimatedTime: 'Done',
    steps: [
      { label: 'Intent Signed', status: 'completed', timestamp: '09:15:22', detail: 'Passkey Auth Verified' },
      { label: 'Solver Auction', status: 'completed', timestamp: '09:15:24', detail: 'Winner: Jump Crypto' },
      { label: 'Source Lock', status: 'completed', timestamp: '09:15:30', detail: '5.5 ETH Locked' },
      { label: 'Destination Fill', status: 'completed', timestamp: '09:15:32', detail: 'Staked 450 ATOM to Validator #1' }
    ]
  },
  {
    id: '0x9b2...11x',
    type: 'Token Transfer',
    sourceChain: 'Optimism',
    targetChain: 'Base',
    sourceToken: 'OP',
    targetToken: 'OP',
    amount: '500.00',
    status: 'completed',
    solver: 'Amber Group',
    estimatedTime: 'Done',
    steps: [
      { label: 'Intent Signed', status: 'completed', timestamp: '08:30:10', detail: 'One-Click Sign' },
      { label: 'Solver Auction', status: 'completed', timestamp: '08:30:11', detail: 'Winner: Amber Group' },
      { label: 'Optimistic Verify', status: 'completed', timestamp: '08:30:15', detail: 'State Root Verified' },
      { label: 'Transfer', status: 'completed', timestamp: '08:30:18', detail: 'Assets Received' }
    ]
  },
  {
    id: '0x1c9...22f',
    type: 'NFT Purchase',
    sourceChain: 'Polygon',
    targetChain: 'Ethereum',
    sourceToken: 'MATIC',
    targetToken: 'ETH',
    amount: '2,500.00',
    status: 'failed',
    solver: 'N/A',
    estimatedTime: 'Stopped',
    steps: [
      { label: 'Intent Signed', status: 'completed', timestamp: 'Yesterday', detail: 'Wallet Connected' },
      { label: 'Solver Auction', status: 'failed', timestamp: 'Error', detail: 'Slippage Exceeded (>3%)' },
      { label: 'Source Lock', status: 'pending', detail: 'Cancelled' },
      { label: 'Destination Fill', status: 'pending', detail: 'Cancelled' }
    ]
  }
];

export const CrossChainManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  
  // Filter operations based on tab
  const filteredOps = mockOperations.filter(op => {
      if (activeTab === 'active') return op.status === 'processing';
      return ['completed', 'failed'].includes(op.status);
  });

  const [selectedOp, setSelectedOp] = useState<Operation>(filteredOps[0] || mockOperations[0]);

  // Update selected operation when tab changes
  useEffect(() => {
      if (filteredOps.length > 0) {
          setSelectedOp(filteredOps[0]);
      }
  }, [activeTab]);

  // chain color helper
  const getChainColor = (chain: string) => {
    switch (chain) {
      case 'Ethereum': return 'bg-blue-600';
      case 'Solana': return 'bg-green-500';
      case 'Arbitrum': return 'bg-blue-400';
      case 'Bitcoin': return 'bg-orange-500';
      case 'Cosmos Hub': return 'bg-purple-500';
      case 'Polygon': return 'bg-violet-600';
      case 'Base': return 'bg-blue-500';
      case 'Optimism': return 'bg-red-500';
      default: return 'bg-neutral-500';
    }
  };

  return (
    <section className="py-24 bg-black relative border-t border-white/5" id="cross-chain-manager">
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-nexus-yellow font-mono text-xs uppercase tracking-widest mb-2 block">Operations Center</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Intent <span className="text-neutral-500">Manager</span>
              </h2>
            </div>
            <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-white/10">
               <button 
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 text-sm font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'active' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
               >
                  <RefreshCw size={14} className={activeTab === 'active' ? 'animate-spin-slow' : ''} />
                  Active
                  <span className="bg-nexus-yellow/20 text-nexus-yellow text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                      {mockOperations.filter(o => o.status === 'processing').length}
                  </span>
               </button>
               <button 
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 text-sm font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
               >
                  <Clock size={14} />
                  History
               </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Operation List */}
          <ScrollReveal delay={100} className="lg:col-span-1 h-full">
            <div className="bg-neutral-900/30 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col min-h-[400px]">
               <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-neutral-400 tracking-wider">
                      {activeTab === 'active' ? 'Live Operations' : 'Past Operations'}
                  </span>
                  <Activity size={14} className="text-nexus-yellow" />
               </div>
               
               <div className="flex-1 overflow-y-auto max-h-[500px] p-2 space-y-2 custom-scrollbar">
                  {filteredOps.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-40 text-neutral-500 text-sm">
                          <Clock size={24} className="mb-2 opacity-50" />
                          No {activeTab} operations found.
                      </div>
                  ) : (
                      filteredOps.map((op) => (
                        <div 
                          key={op.id}
                          onClick={() => setSelectedOp(op)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${
                            selectedOp?.id === op.id 
                              ? 'bg-white/10 border-nexus-yellow/50 shadow-[0_0_20px_rgba(235,255,0,0.05)]' 
                              : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                          }`}
                        >
                           <div className="flex justify-between items-start mb-2">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                                 op.status === 'processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                 op.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                                 {op.status.toUpperCase()}
                              </span>
                              <span className="text-[10px] font-mono text-neutral-500">{op.id}</span>
                           </div>
                           
                           <h4 className="text-sm font-bold text-white mb-1">{op.type}</h4>
                           
                           <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                              <div className="flex items-center gap-1">
                                 <div className={`w-1.5 h-1.5 rounded-full ${getChainColor(op.sourceChain)}`} />
                                 {op.sourceChain}
                              </div>
                              <ArrowRight size={10} />
                              <div className="flex items-center gap-1">
                                 <div className={`w-1.5 h-1.5 rounded-full ${getChainColor(op.targetChain)}`} />
                                 {op.targetChain}
                              </div>
                           </div>

                           <div className="flex justify-between items-center text-xs">
                              <span className="text-white font-mono">{op.amount} {op.sourceToken}</span>
                              <ChevronRight size={14} className={`transition-transform duration-300 ${selectedOp?.id === op.id ? 'translate-x-1 text-nexus-yellow' : 'text-neutral-600'}`} />
                           </div>
                        </div>
                      ))
                  )}
               </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Visualization & Management */}
          <ScrollReveal delay={200} className="lg:col-span-2">
             {selectedOp ? (
                 <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative h-full">
                    
                    {/* Visual Flow Header */}
                    <div className="p-8 border-b border-white/5 relative overflow-hidden">
                       {/* Background Glow */}
                       <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none ${
                          selectedOp.status === 'processing' ? 'bg-blue-500' :
                          selectedOp.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                       }`} />

                       <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="flex items-center gap-6 w-full md:w-auto">
                             {/* Source Node */}
                             <div className="flex flex-col items-center gap-2">
                                <div className={`w-16 h-16 rounded-2xl ${getChainColor(selectedOp.sourceChain)} bg-opacity-20 border border-white/10 flex items-center justify-center relative`}>
                                   <span className="font-bold text-xs">{selectedOp.sourceToken}</span>
                                   <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getChainColor(selectedOp.sourceChain)} border-2 border-black flex items-center justify-center text-[8px] font-bold`}>S</div>
                                </div>
                                <span className="text-xs font-bold text-neutral-400">{selectedOp.sourceChain}</span>
                             </div>

                             {/* Flow Animation */}
                             <div className="flex-1 md:w-32 flex flex-col items-center gap-1">
                                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
                                   <div className={`absolute inset-0 bg-nexus-yellow/50 rounded-full ${selectedOp.status === 'processing' ? 'animate-shimmer' : selectedOp.status === 'completed' ? 'w-full' : 'w-1/3 bg-red-500'}`} />
                                </div>
                                <span className={`text-[10px] uppercase tracking-wider font-bold ${
                                    selectedOp.status === 'processing' ? 'text-nexus-yellow animate-pulse' :
                                    selectedOp.status === 'completed' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                   {selectedOp.status === 'processing' ? 'Bridging...' : selectedOp.status}
                                </span>
                             </div>

                             {/* Target Node */}
                             <div className="flex flex-col items-center gap-2">
                                 <div className={`w-16 h-16 rounded-2xl ${getChainColor(selectedOp.targetChain)} bg-opacity-20 border border-white/10 flex items-center justify-center relative`}>
                                   <span className="font-bold text-xs">{selectedOp.targetToken}</span>
                                   <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getChainColor(selectedOp.targetChain)} border-2 border-black flex items-center justify-center text-[8px] font-bold`}>D</div>
                                </div>
                                <span className="text-xs font-bold text-neutral-400">{selectedOp.targetChain}</span>
                             </div>
                          </div>

                          {/* Controls */}
                          <div className="flex gap-2 w-full md:w-auto">
                             {selectedOp.status === 'processing' && (
                               <>
                                 <button className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                                    <XCircle size={14} /> Cancel
                                 </button>
                                 <button className="flex-1 md:flex-none px-4 py-2 bg-nexus-yellow/10 hover:bg-nexus-yellow/20 text-nexus-yellow border border-nexus-yellow/20 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                                    <Zap size={14} /> Boost Gas
                                 </button>
                               </>
                             )}
                             {selectedOp.status === 'completed' && (
                                <button className="flex-1 md:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                                    <ExternalLink size={14} /> View Explorer
                                </button>
                             )}
                          </div>
                       </div>
                    </div>

                    {/* Steps Timeline */}
                    <div className="p-8 bg-neutral-900/20 min-h-[300px]">
                       <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                          <Settings size={16} className="text-neutral-500" />
                          Execution Flow
                       </h3>
                       
                       <div className="space-y-0 relative">
                          {/* Vertical Line */}
                          <div className="absolute left-6 top-4 bottom-4 w-px bg-white/10" />

                          {selectedOp.steps.map((step, idx) => (
                             <div key={idx} className="relative pl-16 py-3 group">
                                {/* Icon Indicator */}
                                <div className={`absolute left-3 top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 transition-colors bg-black ${
                                   step.status === 'completed' ? 'border-green-500 text-green-500' :
                                   step.status === 'current' ? 'border-blue-500 text-blue-500 animate-pulse' :
                                   step.status === 'failed' ? 'border-red-500 text-red-500' :
                                   'border-neutral-700 text-neutral-700'
                                }`}>
                                   {step.status === 'completed' && <Check size={14} strokeWidth={3} />}
                                   {step.status === 'current' && <Loader2 size={14} className="animate-spin" />}
                                   {step.status === 'failed' && <X size={14} strokeWidth={3} />}
                                   {step.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                   <div>
                                      <div className={`text-sm font-bold ${
                                         step.status === 'completed' ? 'text-white' : 
                                         step.status === 'current' ? 'text-blue-400' : 
                                         step.status === 'failed' ? 'text-red-400' : 'text-neutral-500'
                                      }`}>
                                         {step.label}
                                      </div>
                                      <div className="text-xs text-neutral-400">{step.detail}</div>
                                   </div>
                                   {step.timestamp && (
                                      <div className="text-[10px] font-mono text-neutral-600 bg-black/30 px-2 py-1 rounded">
                                         {step.timestamp}
                                      </div>
                                   )}
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Meta Footer */}
                    <div className="p-4 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] text-neutral-500">
                        <div className="flex gap-4">
                           <span className="flex items-center gap-1"><ShieldCheck size={12} /> Validated by Aeterna L3</span>
                           {selectedOp.solver && <span className="flex items-center gap-1"><Zap size={12} /> Solver: {selectedOp.solver}</span>}
                        </div>
                        <div>ID: {selectedOp.id}</div>
                    </div>
                 </div>
             ) : (
                 <div className="h-full bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col items-center justify-center text-neutral-500">
                     <Activity size={48} className="mb-4 opacity-20" />
                     <p>Select an operation to view details</p>
                 </div>
             )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};