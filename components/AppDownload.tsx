import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Smartphone, Wifi, Battery, Fingerprint, Bell, Layers, Zap, ScanLine, QrCode, ArrowRight } from 'lucide-react';

const StoreButton: React.FC<{ type: 'apple' | 'google' }> = ({ type }) => (
  <button className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:border-nexus-yellow/50 hover:bg-white/10 rounded-xl px-4 py-3 transition-all duration-300 w-full sm:w-auto min-w-[150px]">
    <div className="text-white group-hover:text-nexus-yellow transition-colors">
      {type === 'apple' ? (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.61-.91.61.03 2.34.25 3.44 1.86-2.73 1.36-2.3 5.48.5 6.68-.34.83-.8 1.64-1.45 2.62zM13 3.5c.52-1.19 2.05-2.3 3.61-2.02.26 1.54-1.12 3.12-2.35 3.64-.67.28-2.11 0-1.26-1.62z"/></svg>
      ) : (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.15L13.69,12L3.84,21.85C3.34,21.6,3,21.09,3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.12,13.42L20.3,10.5C20.56,10.65,20.56,11,20.3,11.5M13.69,12L3.84,2.15L6.05,2.66L16.81,8.88L13.69,12Z"/></svg>
      )}
    </div>
    <div className="text-left">
      <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider leading-none mb-1">Download on</div>
      <div className="text-sm font-bold text-white leading-none">
        {type === 'apple' ? 'App Store' : 'Google Play'}
      </div>
    </div>
  </button>
);

export const AppDownload: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-b border-white/5" id="mobile-app">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-b from-neutral-900 to-black opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left Column: Text Content */}
          <div className="flex-1 max-w-xl order-2 lg:order-1">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-nexus-yellow animate-pulse" />
                <span className="text-nexus-yellow font-mono text-xs uppercase tracking-widest">Mobile Companion</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter leading-tight text-white">
                Your Agent. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Synced & Pocket-Sized.</span>
              </h2>

              <p className="text-neutral-400 text-lg mb-8 leading-relaxed border-l-2 border-white/10 pl-6">
                Monitor your AI swarm, approve high-value transactions with FaceID, and access the Solver Network from anywhere. 
                Seamlessly handoff context between Desktop and Mobile.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <StoreButton type="apple" />
                        <StoreButton type="google" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
                        <ScanLine size={12} />
                        <span>v2.4.0 (Stable) • iOS 16+ • Android 13+</span>
                    </div>
                </div>
                
                {/* QR Code Block */}
                <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-white/10">
                    <div className="bg-white p-2 rounded-lg">
                        <QrCode className="text-black w-10 h-10" />
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono leading-tight">
                        Scan to <br /> Install <br /> <span className="text-nexus-yellow">Beta</span>
                    </div>
                </div>
              </div>

              {/* Stats/Features Row */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                   <div className="flex items-center gap-2 text-white font-bold mb-1">
                      <Fingerprint size={16} className="text-nexus-yellow" /> Biometric
                   </div>
                   <div className="text-[10px] text-neutral-500">Hardware Enclave Signing</div>
                </div>
                <div>
                   <div className="flex items-center gap-2 text-white font-bold mb-1">
                      <Zap size={16} className="text-nexus-yellow" /> Real-time
                   </div>
                   <div className="text-[10px] text-neutral-500">Push Notifications for Alpha</div>
                </div>
                <div>
                   <div className="flex items-center gap-2 text-white font-bold mb-1">
                      <Layers size={16} className="text-nexus-yellow" /> Multi-Chain
                   </div>
                   <div className="text-[10px] text-neutral-500">15+ Networks Supported</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="flex-1 w-full flex justify-center lg:justify-end order-1 lg:order-2">
            <ScrollReveal delay={200} animation="scale-in">
              <div className="relative">
                {/* Decorative Circles behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nexus-yellow/5 rounded-full blur-[80px] pointer-events-none" />
                
                {/* Phone Frame */}
                <div className="relative w-[300px] h-[600px] bg-neutral-900 rounded-[3rem] border-[8px] border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 group transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out">
                  
                  {/* Dynamic Island Area */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[25px] bg-black rounded-b-xl z-30" />
                  
                  {/* Screen Content */}
                  <div className="absolute inset-0 bg-black flex flex-col">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-6 py-3 text-[10px] text-white/50 font-medium z-20">
                          <span>10:42</span>
                          <div className="flex gap-1.5">
                              <Wifi size={12} />
                              <Battery size={12} />
                          </div>
                      </div>

                      {/* App Header */}
                      <div className="px-6 pb-6 pt-8 z-10 bg-gradient-to-b from-neutral-900 to-black">
                          <div className="flex justify-between items-center mb-6">
                               <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-nexus-yellow flex items-center justify-center">
                                      <div className="w-3 h-3 bg-black rounded-sm" />
                                  </div>
                                  <span className="font-bold text-white tracking-tight">Aeterna</span>
                               </div>
                               <div className="relative">
                                  <Bell size={20} className="text-white/50" />
                                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-black" />
                               </div>
                          </div>
                          <div className="text-neutral-400 text-xs font-mono mb-1">Total Assets</div>
                          <div className="text-3xl font-bold text-white tracking-tight">$842,592.00</div>
                          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                              <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white">ETH 45%</span>
                              <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white">SOL 30%</span>
                              <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white">USDC 25%</span>
                          </div>
                      </div>

                      {/* Main Feed */}
                      <div className="px-4 py-2 space-y-3 z-10 overflow-y-auto no-scrollbar">
                          {/* Agent Status Card */}
                          <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-4">
                              <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-bold text-nexus-yellow uppercase tracking-wider flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-nexus-yellow animate-pulse"/>
                                      Live Agent
                                  </span>
                                  <span className="text-[10px] text-neutral-600">ID: #882A</span>
                              </div>
                              <div className="text-sm text-white mb-1">Arbitrage Opportunity</div>
                              <div className="text-xs text-neutral-400 mb-3">Detected price spread on Uniswap v3 vs Orca.</div>
                              <div className="flex items-center justify-between bg-black rounded-lg p-2 border border-white/5">
                                  <div className="text-[10px] font-mono text-green-400">Est. Profit: +$420.50</div>
                                  <ArrowRight size={12} className="text-neutral-500" />
                              </div>
                          </div>

                           {/* Recent Activity */}
                           <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-4">
                              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-3">Recent Activity</div>
                              <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                              <Layers size={14} />
                                          </div>
                                          <div>
                                              <div className="text-xs text-white font-bold">Bridge to Base</div>
                                              <div className="text-[10px] text-neutral-500">10 mins ago</div>
                                          </div>
                                      </div>
                                      <div className="text-xs text-white">-5.0 ETH</div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Bottom Tab Bar */}
                      <div className="mt-auto border-t border-white/10 bg-black px-6 py-4 flex justify-between items-center text-white/50">
                          <div className="text-nexus-yellow flex flex-col items-center gap-1">
                              <Layers size={20} />
                          </div>
                          <div className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                              <ScanLine size={20} />
                          </div>
                          <div className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                              <Fingerprint size={20} />
                          </div>
                      </div>

                      {/* Background Gradient */}
                      <div className="absolute top-[20%] right-0 w-[200px] h-[200px] bg-nexus-yellow/10 rounded-full blur-[60px] pointer-events-none" />
                  </div>
                </div>

                {/* Floating Elements around phone */}
                <div className="absolute top-20 -left-12 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                            <Zap size={16} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white">Gas Saved</div>
                            <div className="text-[10px] text-neutral-400">$12.45 (Paymaster)</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-32 -right-8 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                            <Fingerprint size={16} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white">Biometric Auth</div>
                            <div className="text-[10px] text-neutral-400">Verified</div>
                        </div>
                    </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};