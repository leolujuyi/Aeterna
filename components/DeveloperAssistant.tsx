import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, X, Code, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatRole, ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

export const DeveloperAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: ChatRole.MODEL,
      text: "Aeterna Protocol Online. I am AeternaAI. Ask me about the 4-layer architecture, Ritual inference, or Chain Abstraction.",
      timestamp: Date.now()
    }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(input, messages);
      setMessages(prev => [...prev, {
        role: ChatRole.MODEL,
        text: response || "Error processing request.",
        timestamp: Date.now()
      }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-white text-black p-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform duration-300 flex items-center gap-2 font-bold"
      >
        <Sparkles size={20} />
        <span className="hidden md:inline">Ask AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[90vw] md:w-[450px] h-[600px] bg-black border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-neutral-900/80 backdrop-blur border-b border-white/10 p-4 flex justify-between items-center cursor-move">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-white" />
          <span className="font-mono text-sm font-bold tracking-wider">AETERNA_AI_V1.0</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
              msg.role === ChatRole.USER 
                ? 'bg-white text-black' 
                : 'bg-neutral-900 border border-white/10 text-neutral-300 font-mono'
            }`}>
              {msg.role === ChatRole.MODEL ? (
                <div className="prose prose-invert prose-p:my-1 prose-pre:bg-black prose-pre:border prose-pre:border-white/10 max-w-none text-xs md:text-sm">
                   <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
               
              ) : msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-900 border border-white/10 rounded-lg p-3 flex items-center gap-2">
              <Loader2 className="animate-spin text-white" size={16} />
              <span className="text-xs text-neutral-500 font-mono">Computing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-neutral-900/50 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Explain the No-MPC architecture..."
            className="w-full bg-black border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-white/40 font-mono placeholder-neutral-600 transition-colors"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white disabled:opacity-50 transition-colors p-1"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};