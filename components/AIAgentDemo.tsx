import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Cpu, Layers, Activity, Zap } from 'lucide-react';
import { sendAgentCommand } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AIAgentDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AgentMessage {
  role: 'user' | 'agent';
  text: string;
}

export const AIAgentDemo: React.FC<AIAgentDemoProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AgentMessage[]>([
    { role: 'agent', text: "**Aeterna Autonomous Agent Online.** \n\nReady to execute cross-chain intents via Universal Address." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isProcessing) return;

    const userMsg: AgentMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    try {
      const response = await sendAgentCommand(text);
      setMessages(prev => [...prev, { role: 'agent', text: response || "EXECUTION ERROR" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'agent', text: "SYSTEM FAILURE: Connection lost." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const suggestions = [
    "Bridge 5 ETH to Solana",
    "Find highest yield for USDC",
    "Swap BTC for NFT on Tensor"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-black border border-nexus-yellow/30 rounded-2xl shadow-[0_0_50px_rgba(235,255,0,0.15)] overflow-hidden flex flex-col max-h-[80vh] animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-nexus-yellow/20 bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-nexus-yellow/10 flex items-center justify-center border border-nexus-yellow/30">
              <Bot className="text-nexus-yellow" size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider">AETERNA AGENT</h3>
              <div className="flex items-center gap-2 text-[10px] text-nexus-yellow font-mono uppercase">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-yellow opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-nexus-yellow"></span>
                 </span>
                 System Online
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Visualization Bar */}
        <div className="flex border-b border-white/10 bg-black/50 overflow-x-auto">
            <div className="flex-1 min-w-[100px] p-3 border-r border-white/10 flex flex-col items-center justify-center gap-1">
                <span className="text-neutral-500 text-[10px] uppercase font-mono">Status</span>
                <span className={`text-xs font-bold ${isProcessing ? 'text-nexus-yellow animate-pulse' : 'text-green-500'}`}>
                    {isProcessing ? 'EXECUTING' : 'IDLE'}
                </span>
            </div>
            <div className="flex-1 min-w-[100px] p-3 border-r border-white/10 flex flex-col items-center justify-center gap-1">
                <span className="text-neutral-500 text-[10px] uppercase font-mono">Consensus</span>
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <Layers size={12} /> Narwhal
                </div>
            </div>
            <div className="flex-1 min-w-[100px] p-3 border-r border-white/10 flex flex-col items-center justify-center gap-1">
                <span className="text-neutral-500 text-[10px] uppercase font-mono">Latency</span>
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <Activity size={12} /> 45ms
                </div>
            </div>
             <div className="flex-1 min-w-[100px] p-3 flex flex-col items-center justify-center gap-1">
                <span className="text-neutral-500 text-[10px] uppercase font-mono">Solver</span>
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <Cpu size={12} /> Active
                </div>
            </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/80" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[85%] p-4 rounded-xl text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-neutral-800 text-white rounded-br-none' 
                  : 'bg-nexus-yellow/10 border border-nexus-yellow/20 text-nexus-yellow font-mono rounded-bl-none shadow-[0_0_15px_rgba(235,255,0,0.05)] w-full'}
              `}>
                {msg.role === 'agent' ? (
                   <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-ul:my-2 prose-li:my-0 prose-pre:bg-black/50 prose-pre:border prose-pre:border-nexus-yellow/20 prose-code:text-nexus-yellow prose-headings:text-nexus-yellow prose-strong:text-nexus-yellow">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
                ) : msg.text}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-nexus-yellow/10 border border-nexus-yellow/20 rounded-xl p-4 flex items-center gap-3">
                 <Zap className="text-nexus-yellow animate-pulse" size={16} />
                 <span className="text-xs font-mono text-nexus-yellow animate-pulse">
                    Solver Network Negotiating...
                 </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-neutral-900 border-t border-white/10">
           {messages.length < 3 && (
             <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {suggestions.map((s, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSend(s)}
                        className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs text-neutral-300 hover:bg-white/10 hover:border-nexus-yellow hover:text-nexus-yellow transition-all whitespace-nowrap"
                    >
                        {s}
                    </button>
                ))}
             </div>
           )}
           <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter chain command..."
                className="w-full bg-black border border-white/20 rounded-xl pl-4 pr-12 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-nexus-yellow/50 focus:ring-1 focus:ring-nexus-yellow/50 transition-all font-mono"
              />
              <button 
                type="submit" 
                disabled={isProcessing || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-nexus-yellow text-black rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
              >
                <Send size={18} />
              </button>
           </form>
        </div>

      </div>
    </div>
  );
};