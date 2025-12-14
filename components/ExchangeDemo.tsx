import React, { useState, useEffect, useRef } from 'react';
import { X, TrendingUp, Activity, Lock, Zap, ChevronDown, Clock, Shield, Search, Wallet, Settings, ArrowDown, ArrowUp, HelpCircle } from 'lucide-react';

interface ExchangeDemoProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'public' | 'dark';
}

interface Trade {
  price: number;
  amount: number;
  time: string;
  side: 'buy' | 'sell';
}

const Tooltip: React.FC<{ text: string; children: React.ReactNode; position?: 'top' | 'bottom' | 'left' | 'right'; className?: string }> = ({ text, children, position = 'top', className = '' }) => {
  const positions = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2'
  };

  return (
    <div className={`group relative flex items-center justify-center ${className}`}>
      {children}
      <div className={`absolute ${positions[position]} px-3 py-1.5 bg-neutral-900 border border-white/20 text-neutral-300 text-[10px] rounded shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60] backdrop-blur-md`}>
        {text}
      </div>
    </div>
  );
};

export const ExchangeDemo: React.FC<ExchangeDemoProps> = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState<'public' | 'dark'>(initialMode);
  const [price, setPrice] = useState(1850.42);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [chartData, setChartData] = useState<number[]>(Array(40).fill(1850));
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  
  // Theme configurations
  const theme = mode === 'public' ? {
     accent: 'text-emerald-400',
     bgAccent: 'bg-emerald-500',
     border: 'border-emerald-500/30',
     glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
     buyBtn: 'bg-emerald-500 hover:bg-emerald-400',
     sellBtn: 'bg-red-500 hover:bg-red-400',
     label: 'Hyper-Performance'
  } : {
     accent: 'text-indigo-400',
     bgAccent: 'bg-indigo-500',
     border: 'border-indigo-500/30',
     glow: 'shadow-[0_0_20px_rgba(99,102,241,0.15)]',
     buyBtn: 'bg-indigo-500 hover:bg-indigo-400',
     sellBtn: 'bg-pink-500 hover:bg-pink-400',
     label: 'ZK-Dark Pool'
  };

  // Simulate Data Stream
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
       const change = (Math.random() - 0.5) * 2;
       setPrice(p => {
         const newPrice = p + change;
         setChartData(prev => [...prev.slice(1), newPrice]);
         return newPrice;
       });

       if (Math.random() > 0.5) {
           const newTrade: Trade = {
               price: price + change,
               amount: Math.random() * 5,
               time: new Date().toLocaleTimeString(),
               side: Math.random() > 0.5 ? 'buy' : 'sell'
           };
           setTrades(prev => [newTrade, ...prev].slice(0, 15));
       }
    }, 800);

    return () => clearInterval(interval);
  }, [isOpen, price]);

  // Update internal mode if prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  // Chart Rendering Helper
  const renderChart = () => {
    const min = Math.min(...chartData);
    const max = Math.max(...chartData);
    const range = max - min || 1;
    
    return (
      <div className="flex items-end h-full gap-1 px-4 pb-4 opacity-50">
        {chartData.map((val, i) => {
           const height = ((val - min) / range) * 80 + 10;
           const isUp = i > 0 && val >= chartData[i-1];
           return (
             <div 
               key={i}
               className={`w-full rounded-sm transition-all duration-300 ${isUp ? (mode === 'public' ? 'bg-emerald-500' : 'bg-indigo-500') : 'bg-red-500'}`}
               style={{ height: `${height}%` }}
             />
           );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-scale-in font-mono text-sm">
      
      {/* Top Bar */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-[#050505]">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
             <div className={`w-3 h-3 rounded-full ${theme.bgAccent}`} />
             <span className="font-bold text-lg text-white tracking-tighter">Aeterna<span className="text-neutral-500">DEX</span></span>
           </div>
           
           <div className="h-6 w-px bg-white/10" />
           
           <Tooltip text="Select Trading Pair" position="bottom">
             <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-2 py-1 rounded transition-colors">
                <span className="font-bold text-white">ETH-USDC</span>
                <ChevronDown size={14} className="text-neutral-500" />
             </div>
           </Tooltip>

           <Tooltip text="Oracle Price Feed (Chainlink)" position="bottom">
             <div className={`text-xl font-bold ${theme.accent}`}>
                ${price.toFixed(2)}
             </div>
           </Tooltip>
        </div>

        <div className="flex items-center gap-4">
            {/* Mode Switcher */}
            <div className="flex bg-neutral-900 rounded-lg p-1 border border-white/5">
                <Tooltip text="Switch to Public CLOB (Transparent)" position="bottom">
                  <button 
                    onClick={() => setMode('public')}
                    className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${mode === 'public' ? 'bg-emerald-500/20 text-emerald-400' : 'text-neutral-500 hover:text-white'}`}
                  >
                      <Zap size={14} /> Public
                  </button>
                </Tooltip>
                <Tooltip text="Switch to Dark Pool (ZK-Privacy)" position="bottom">
                  <button 
                    onClick={() => setMode('dark')}
                    className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${mode === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'text-neutral-500 hover:text-white'}`}
                  >
                      <Lock size={14} /> Dark Pool
                  </button>
                </Tooltip>
            </div>

            <Tooltip text="Settings" position="bottom">
              <button className="p-2 hover:bg-white/10 rounded-full text-neutral-400 transition-colors">
                  <Settings size={18} />
              </button>
            </Tooltip>
            <Tooltip text="Connect Wallet" position="bottom">
              <button className="p-2 hover:bg-white/10 rounded-full text-neutral-400 transition-colors">
                  <Wallet size={18} />
              </button>
            </Tooltip>
            <Tooltip text="Close Terminal" position="bottom">
              <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-full text-neutral-400 transition-colors">
                  <X size={20} />
              </button>
            </Tooltip>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
         
         {/* Left: Chart & Info */}
         <div className="col-span-12 lg:col-span-9 flex flex-col border-r border-white/10">
            {/* Toolbar */}
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-4 text-xs text-neutral-500">
               <span className="text-white font-bold">Time</span>
               <Tooltip text="1 Minute Candles" position="bottom"><span className="hover:text-white cursor-pointer">1m</span></Tooltip>
               <Tooltip text="5 Minute Candles" position="bottom"><span className="text-white bg-white/10 px-1 rounded cursor-pointer">5m</span></Tooltip>
               <Tooltip text="15 Minute Candles" position="bottom"><span className="hover:text-white cursor-pointer">15m</span></Tooltip>
               <Tooltip text="1 Hour Candles" position="bottom"><span className="hover:text-white cursor-pointer">1h</span></Tooltip>
               <div className="flex-1" />
               <span className="flex items-center gap-1 text-white"><Activity size={12} /> TradingView</span>
            </div>

            {/* Chart Canvas Area */}
            <div className="flex-1 relative bg-gradient-to-b from-[#080808] to-black">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="border-r border-b border-white/[0.03]" />
                    ))}
                </div>
                
                {/* Simulated Chart */}
                <div className="absolute inset-0 py-8">
                    {renderChart()}
                </div>

                {/* Info Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
                     <span className="text-xs text-neutral-500">{theme.label} Active</span>
                     <div className={`flex items-center gap-2 px-2 py-1 rounded bg-black/50 backdrop-blur border ${theme.border} ${theme.accent}`}>
                         {mode === 'dark' ? <Shield size={12} /> : <Zap size={12} />}
                         <span className="text-xs font-bold">{mode === 'dark' ? 'Zero-Knowledge Proof Verified' : 'Latency: 8ms'}</span>
                     </div>
                </div>
            </div>

            {/* Bottom: Orders / History */}
            <div className="h-64 border-t border-white/10 bg-[#050505] flex flex-col">
                <div className="flex border-b border-white/10">
                    <button className="px-6 py-2 text-white border-t-2 border-white bg-white/5 font-bold text-xs">Open Orders (0)</button>
                    <button className="px-6 py-2 text-neutral-500 hover:text-white text-xs">Order History</button>
                    <button className="px-6 py-2 text-neutral-500 hover:text-white text-xs">Balances</button>
                </div>
                <div className="flex-1 flex items-center justify-center text-neutral-600 gap-2">
                    <Search size={16} />
                    <span>No open orders</span>
                </div>
            </div>
         </div>

         {/* Right: Orderbook & Entry */}
         <div className="col-span-12 lg:col-span-3 flex flex-col bg-[#080808]">
            
            {/* Order Book */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-[300px] border-b border-white/10">
                <div className="px-4 py-2 border-b border-white/10 text-xs font-bold text-neutral-400 flex justify-between">
                    <Tooltip text="Market Price" position="left"><span>Price (USDC)</span></Tooltip>
                    <Tooltip text={mode === 'dark' ? "Hidden in Dark Pool" : "Liquidity Amount"} position="left"><span>Amount (ETH)</span></Tooltip>
                </div>
                
                {/* Asks */}
                <div className="flex-1 overflow-hidden flex flex-col justify-end pb-1 space-y-[1px]">
                    {[...Array(12)].map((_, i) => (
                        <Tooltip key={`ask-${i}`} text={mode === 'dark' ? "Ask: Hidden Size/Price" : "Ask Order"} position="left" className="w-full">
                          <div className="flex justify-between px-4 text-xs relative group cursor-pointer hover:bg-white/5 w-full">
                              <span className="text-red-400 z-10 font-mono">{(price + 0.5 + (12-i)*0.05).toFixed(2)}</span>
                              <span className="text-neutral-400 z-10 font-mono relative">
                                  {mode === 'dark' ? '**.****' : (Math.random() * 2).toFixed(4)}
                                  {mode === 'dark' && <Lock size={8} className="absolute -left-3 top-1 text-indigo-500/50" />}
                              </span>
                              <div className="absolute right-0 top-0 bottom-0 bg-red-500/10 transition-all" style={{ width: `${Math.random() * 60}%`}} />
                          </div>
                        </Tooltip>
                    ))}
                </div>

                {/* Current Price */}
                <Tooltip text="Spread: 0.01%" position="left" className="w-full">
                  <div className={`py-3 text-center text-lg font-bold border-y border-white/10 flex items-center justify-center gap-2 ${price > 1850 ? 'text-emerald-400' : 'text-red-400'} w-full`}>
                      {price.toFixed(2)} 
                      {price > 1850 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  </div>
                </Tooltip>

                {/* Bids */}
                <div className="flex-1 overflow-hidden pt-1 space-y-[1px]">
                     {[...Array(12)].map((_, i) => (
                        <Tooltip key={`bid-${i}`} text={mode === 'dark' ? "Bid: Hidden Size/Price" : "Bid Order"} position="left" className="w-full">
                          <div className="flex justify-between px-4 text-xs relative group cursor-pointer hover:bg-white/5 w-full">
                              <span className={`${theme.accent} z-10 font-mono`}>{(price - 0.5 - i*0.05).toFixed(2)}</span>
                              <span className="text-neutral-400 z-10 font-mono relative">
                                  {mode === 'dark' ? '**.****' : (Math.random() * 2).toFixed(4)}
                                  {mode === 'dark' && <Lock size={8} className="absolute -left-3 top-1 text-indigo-500/50" />}
                              </span>
                              <div className={`absolute right-0 top-0 bottom-0 transition-all ${mode === 'dark' ? 'bg-indigo-500/10' : 'bg-emerald-500/10'}`} style={{ width: `${Math.random() * 60}%`}} />
                          </div>
                        </Tooltip>
                    ))}
                </div>
            </div>

            {/* Trade Form */}
            <div className="p-4 bg-[#050505]">
                <div className="flex bg-neutral-900 rounded p-1 mb-4">
                    <Tooltip text="Place Buy Order" position="top" className="flex-1">
                      <button 
                          onClick={() => setSide('buy')} 
                          className={`w-full py-1.5 text-xs font-bold rounded transition-colors ${side === 'buy' ? theme.buyBtn + ' text-black' : 'text-neutral-500 hover:text-white'}`}
                      >
                          Buy
                      </button>
                    </Tooltip>
                    <Tooltip text="Place Sell Order" position="top" className="flex-1">
                      <button 
                          onClick={() => setSide('sell')} 
                          className={`w-full py-1.5 text-xs font-bold rounded transition-colors ${side === 'sell' ? theme.sellBtn + ' text-black' : 'text-neutral-500 hover:text-white'}`}
                      >
                          Sell
                      </button>
                    </Tooltip>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                        <span>Avail</span>
                        <Tooltip text="Your Wallet Balance" position="left"><span className="text-white cursor-help border-b border-dotted border-white/20">142.50 USDC</span></Tooltip>
                    </div>
                    
                    <Tooltip text="Order Limit Price (USDC)" position="top" className="w-full">
                      <div className="relative w-full">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">Price</span>
                          <input 
                              type="text" 
                              value={price.toFixed(2)} 
                              readOnly 
                              className="w-full bg-neutral-900 border border-white/10 rounded-lg py-2.5 px-3 text-right text-sm text-white focus:outline-none focus:border-white/30"
                          />
                          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">USDC</span>
                      </div>
                    </Tooltip>

                    <Tooltip text="Order Amount (ETH)" position="top" className="w-full">
                      <div className="relative w-full">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">Amount</span>
                          <input 
                              type="text" 
                              placeholder="0.00" 
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 rounded-lg py-2.5 px-3 text-right text-sm text-white focus:outline-none focus:border-white/30"
                          />
                          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">ETH</span>
                      </div>
                    </Tooltip>

                    <div className="grid grid-cols-4 gap-2">
                        {[25, 50, 75, 100].map(pct => (
                            <Tooltip key={pct} text={`Use ${pct}% of balance`} position="top" className="w-full">
                              <button className="w-full bg-neutral-900 hover:bg-white/10 text-neutral-500 text-[10px] py-1 rounded border border-white/5 transition-colors">
                                  {pct}%
                              </button>
                            </Tooltip>
                        ))}
                    </div>
                </div>

                <Tooltip text={`Submit ${side.toUpperCase()} Order to ${mode === 'dark' ? 'Dark Pool' : 'Orderbook'}`} position="top" className="w-full">
                  <button className={`w-full py-3 rounded-lg font-bold text-black transition-all transform active:scale-95 ${side === 'buy' ? theme.buyBtn : theme.sellBtn} shadow-lg`}>
                      {side === 'buy' ? 'Buy ETH' : 'Sell ETH'}
                  </button>
                </Tooltip>

                {mode === 'dark' && (
                    <Tooltip text="Transactions in Dark Pool are encrypted via ZK-SNARKs and not visible in the public mempool." position="top" className="w-full">
                      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-indigo-400 bg-indigo-500/10 py-2 rounded border border-indigo-500/20 cursor-help">
                          <Shield size={10} />
                          <span>Shielded Transaction Active</span>
                          <HelpCircle size={10} className="ml-1 opacity-50" />
                      </div>
                    </Tooltip>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};