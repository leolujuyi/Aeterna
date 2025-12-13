import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Code2, Sparkles, Box, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

declare global {
  interface Window {
    Prism: any;
  }
}

const CodeBlock: React.FC<{ code: string; language: string; isVisible: boolean }> = ({ code, language, isVisible }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isVisible && codeRef.current && window.Prism) {
      window.Prism.highlightElement(codeRef.current);
    }
  }, [isVisible, code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`absolute inset-0 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 z-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2">
             <Code2 size={14} className="text-neutral-500" />
             <span className="text-xs font-mono text-neutral-400">{language}</span>
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 p-6 overflow-auto custom-scrollbar bg-black/50">
          <pre className="!bg-transparent !m-0 !p-0 !text-sm !leading-relaxed">
            <code ref={codeRef} className={`language-${language} !bg-transparent !text-sm !font-mono !text-shadow-none`}>
              {code}
            </code>
          </pre>
        </div>

        {/* Copy Button */}
        <button 
          onClick={handleCopy}
          className="absolute top-16 right-6 p-2 rounded-lg bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/5"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

export const Developers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agent' | 'chain'>('agent');

  const agentCode = `import { Agent, Ritual, Walrus } from '@aeterna/sdk';

// Initialize Autonomous Agent
const supervisor = new Agent({
  id: 'agent_x7f2',
  model: 'llama-3.1-405b-ritual',
  memory: new Walrus.VectorStore({ 
    bucketId: '0x123...abc' 
  }),
});

// Define Intent Listener
supervisor.onIntent('OptimizeYield', async (ctx) => {
  // 1. Inference Verification (ZK Proof)
  const strategy = await ctx.infernet.query({
    prompt: 'Analyze highest APY pools on Arbitrum',
    proof: true
  });
  
  // 2. Execute via Solver
  if (strategy.apy > 15.0) {
    await ctx.execute({
      chain: 'arbitrum',
      call: 'aave.deposit(USDC)',
      amount: ctx.params.amount
    });
  }
});`;

  const chainCode = `import { UniversalAddress, Solver } from '@aeterna/sdk';

// 1. Setup Universal Address (UA)
const ua = new UniversalAddress({
  curves: ['secp256k1', 'ed25519'],
  auth: 'google_ap2_passkey'
});

console.log(ua.address); // 'alice.aeterna'

// 2. Sign Cross-Chain Intent
const intent = await ua.sign({
  target: 'solana',
  action: 'swap',
  params: {
    from: 'SOL',
    to: 'USDC',
    amount: 5.0
  }
});

// 3. Broadcast to Solver Network
const txHash = await Solver.broadcast(intent, {
  maxFee: '0.01 ETH',
  speed: 'turbo'
});`;

  return (
    <section className="py-32 bg-black relative overflow-hidden" id="docs">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nexus-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="flex-1 w-full">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-yellow/10 border border-nexus-yellow/20 text-nexus-yellow text-xs font-mono mb-8 uppercase tracking-wider">
                <Terminal size={12} />
                <span>Documentation</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
                Write Once. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-600">Deploy Everywhere.</span>
              </h2>
              
              <p className="text-neutral-400 text-lg mb-10 leading-relaxed max-w-xl">
                The Aeterna SDK abstracts away the complexity of cross-chain cryptography and decentralized AI. 
                Write logic in TypeScript, Rust, or Python. We handle the consensus, proofs, and execution.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white mb-1">4</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Supported VMs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white mb-1">15+</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Connected Chains</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white mb-1">&lt;100ms</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Finality</span>
                </div>
                 <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white mb-1">0</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Bridge Hacks</span>
                </div>
              </div>

              <button className="group flex items-center gap-2 text-white font-bold hover:text-nexus-yellow transition-colors">
                Read the Documentation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Code Window */}
          <div className="flex-1 w-full max-w-xl">
            <ScrollReveal delay={200} animation="scale-in">
              <SpotlightCard className="h-[500px] bg-[#0A0A0A] border-neutral-800 p-0 group overflow-hidden" spotlightColor="rgba(255, 255, 255, 0.1)">
                
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                  <button 
                    onClick={() => setActiveTab('agent')}
                    className={`flex-1 py-4 text-sm font-mono transition-all relative ${
                      activeTab === 'agent' 
                        ? 'text-white bg-white/5' 
                        : 'text-neutral-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                       <Sparkles size={14} className={activeTab === 'agent' ? 'text-nexus-yellow' : ''} />
                       AI Agent SDK
                    </div>
                    {activeTab === 'agent' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-yellow shadow-[0_0_10px_#EBFF00]" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('chain')}
                    className={`flex-1 py-4 text-sm font-mono transition-all relative ${
                      activeTab === 'chain' 
                        ? 'text-white bg-white/5' 
                        : 'text-neutral-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                       <Box size={14} className={activeTab === 'chain' ? 'text-nexus-yellow' : ''} />
                       Universal Address
                    </div>
                    {activeTab === 'chain' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-yellow shadow-[0_0_10px_#EBFF00]" />}
                  </button>
                </div>

                {/* Code Blocks Container */}
                <div className="relative flex-1 h-[calc(100%-53px)]">
                  <CodeBlock 
                    code={agentCode} 
                    language="typescript" 
                    isVisible={activeTab === 'agent'} 
                  />
                  <CodeBlock 
                    code={chainCode} 
                    language="typescript" 
                    isVisible={activeTab === 'chain'} 
                  />
                </div>

              </SpotlightCard>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};