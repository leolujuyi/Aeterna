import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Twitter, Server, Brain, Globe, Shield, Zap, Cpu, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from './Button';

// Icon mapping for the grid items
const MenuIcon = ({ icon: Icon, className }: { icon: any, className?: string }) => (
  <Icon className={`w-10 h-10 stroke-1 shrink-0 ${className}`} />
);

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [mobileOpen]);

  const navLinks = [
    { 
      name: 'Architecture', 
      href: '#architecture', 
      hasMenu: true,
      subItems: [
        { name: 'Infrastructure', href: '#layer-infrastructure' },
        { name: 'AI Engine', href: '#ai-core-engine' },
        { name: 'Abstraction', href: '#chain-abstraction' },
        { name: 'Payment', href: '#layer-payment' },
        { name: 'Narwhal DAG', href: '#tech-consensus' },
        { name: 'Multi-VM', href: '#tech-vm' }
      ]
    },
    { name: 'Exchange', href: '#exchange', hasMenu: false },
    { name: 'Use Cases', href: '#use-cases', hasMenu: false },
    { name: 'Docs', href: '#docs', hasMenu: false }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100; // Offset for header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileOpen(false);
    setActiveMenu(null);
    setMobileSubmenuOpen(null);
  };

  const handleMobileGroupClick = (e: React.MouseEvent, linkName: string) => {
     e.preventDefault();
     setMobileSubmenuOpen(mobileSubmenuOpen === linkName ? null : linkName);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center 
        ${scrolled && !mobileOpen ? 'pt-4' : 'pt-0'}`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div 
          className={`
            relative flex items-center justify-between transition-all duration-500 mx-auto
            ${mobileOpen 
                ? 'w-full h-20 bg-transparent border-transparent px-6 md:px-12' 
                : scrolled 
                    ? 'w-[90%] md:w-[80%] lg:w-[1200px] h-14 rounded-full glass-panel px-6 mt-2' 
                    : 'w-full h-20 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 md:px-12'
            }
          `}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group z-50" onClick={() => {
             window.scrollTo({ top: 0, behavior: 'smooth' });
             setMobileOpen(false);
          }}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
              ${(scrolled || mobileOpen) ? 'bg-white' : 'bg-nexus-yellow'}
            `}>
              <div className="w-3 h-3 bg-black rounded-sm transform group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className={`text-xl font-bold tracking-tighter ${(scrolled || mobileOpen) ? 'text-white' : 'text-nexus-yellow'}`}>
              AETERNA
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center h-full">
            {navLinks.map((link, idx) => (
              <div 
                key={link.name} 
                className="h-full flex items-center opacity-0 animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms` }}
                onMouseEnter={() => link.hasMenu ? setActiveMenu(link.name) : setActiveMenu(null)}
              >
                <a 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`
                    relative px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 h-full flex items-center hover:scale-110 origin-center
                    ${activeMenu === link.name ? 'text-nexus-yellow' : 'text-neutral-400 hover:text-white'}
                  `}
                >
                  {link.name}
                  {activeMenu === link.name && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-yellow shadow-[0_0_10px_#EBFF00]" />
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="p-2 text-neutral-400 hover:text-nexus-yellow transition-colors">
              <Github size={20} />
            </a>
            
            <div className="h-6 w-px bg-white/10" />

            <Button 
              variant="outline" 
              className={`
                h-9 px-4 text-xs font-bold uppercase tracking-wide border-nexus-yellow/30 text-neutral-300 hover:bg-white/5 hover:text-white
                ${scrolled ? 'border-white/20' : ''}
              `}
            >
              Testnet
            </Button>

            <Button 
              variant="primary" 
              className={`
                 h-9 px-5 text-xs font-bold uppercase tracking-wide bg-nexus-yellow text-black border-nexus-yellow hover:bg-white hover:text-black hover:border-white shadow-[0_0_15px_rgba(235,255,0,0.3)]
              `}
            >
              Launch App
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2 hover:text-nexus-yellow transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
             <div className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? 'rotate-90' : 'rotate-0'}`}>
                {mobileOpen ? <X size={28} /> : <Menu size={28} />}
             </div>
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMenu === 'Architecture' && (
          <div 
            className="absolute top-full left-0 w-full bg-black border-y border-nexus-yellow/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden animate-menu-reveal"
            onMouseEnter={() => setActiveMenu('Architecture')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-6 py-12">
              <div className="flex items-center gap-4 mb-8 text-nexus-yellow/80">
                <span className="text-sm font-mono">CORE //</span>
                <h3 className="text-xl font-bold uppercase tracking-widest">Aeterna 4-Layer Stack</h3>
              </div>

              {/* Grid Layout matching reference image */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-nexus-yellow/30">
                
                {/* Item 1 */}
                <a 
                  href="#layer-infrastructure" 
                  onClick={(e) => handleLinkClick(e, '#layer-infrastructure')}
                  className="group relative border-r border-b border-nexus-yellow/30 p-8 hover:bg-nexus-yellow transition-colors duration-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-nexus-yellow group-hover:text-black mb-1 uppercase">Infrastructure</h4>
                      <span className="text-xs text-neutral-500 group-hover:text-black/70">Cosmos + Sovereign</span>
                    </div>
                    <MenuIcon icon={Server} className="text-nexus-yellow group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </a>

                {/* Item 2 */}
                <a 
                  href="#ai-core-engine" 
                  onClick={(e) => handleLinkClick(e, '#ai-core-engine')}
                  className="group relative border-r border-b border-nexus-yellow/30 p-8 hover:bg-nexus-yellow transition-colors duration-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-nexus-yellow group-hover:text-black mb-1 uppercase">AI Engine</h4>
                      <span className="text-xs text-neutral-500 group-hover:text-black/70">Ritual + Bittensor</span>
                    </div>
                    <MenuIcon icon={Brain} className="text-nexus-yellow group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </a>

                {/* Item 3 */}
                <a 
                  href="#chain-abstraction" 
                  onClick={(e) => handleLinkClick(e, '#chain-abstraction')}
                  className="group relative border-r border-b border-nexus-yellow/30 p-8 hover:bg-nexus-yellow transition-colors duration-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-nexus-yellow group-hover:text-black mb-1 uppercase">Abstraction</h4>
                      <span className="text-xs text-neutral-500 group-hover:text-black/70">Universal Address</span>
                    </div>
                    <MenuIcon icon={Globe} className="text-nexus-yellow group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </a>

                 {/* Item 4 */}
                 <a 
                    href="#layer-payment"
                    onClick={(e) => handleLinkClick(e, '#layer-payment')} 
                    className="group relative border-r border-b border-nexus-yellow/30 p-8 hover:bg-nexus-yellow transition-colors duration-0"
                 >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-nexus-yellow group-hover:text-black mb-1 uppercase">Payment</h4>
                      <span className="text-xs text-neutral-500 group-hover:text-black/70">AP2 + x402</span>
                    </div>
                    <MenuIcon icon={Shield} className="text-nexus-yellow group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </a>

                {/* Item 5 - Stats */}
                <a 
                    href="#tech-consensus" 
                    onClick={(e) => handleLinkClick(e, '#tech-consensus')}
                    className="group relative border-r border-b border-nexus-yellow/30 p-8 hover:bg-nexus-yellow transition-colors duration-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-nexus-yellow group-hover:text-black mb-1 uppercase">Narwhal DAG</h4>
                      <span className="text-xs text-neutral-500 group-hover:text-black/70">160k TPS</span>
                    </div>
                    <MenuIcon icon={Zap} className="text-nexus-yellow group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </a>

                 {/* Item 6 - VM */}
                 <a 
                    href="#tech-vm" 
                    onClick={(e) => handleLinkClick(e, '#tech-vm')}
                    className="group relative border-r border-b border-nexus-yellow/30 p-8 hover:bg-nexus-yellow transition-colors duration-0"
                 >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-nexus-yellow group-hover:text-black mb-1 uppercase">Multi-VM</h4>
                      <span className="text-xs text-neutral-500 group-hover:text-black/70">Rust/Move/EVM</span>
                    </div>
                    <MenuIcon icon={Cpu} className="text-nexus-yellow group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </a>
                
              </div>
              
              {/* Decorative corners for cyberpunk feel */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-nexus-yellow" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-nexus-yellow" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-nexus-yellow" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-nexus-yellow" />
            </div>
          </div>
        )}
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col justify-center px-8 transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) overflow-y-auto
          ${mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <div className={`fixed inset-0 grid-bg transition-opacity duration-1000 ${mobileOpen ? 'opacity-20' : 'opacity-0'}`} />
        <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-nexus-yellow/5 pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10 w-full max-w-lg mx-auto py-24">
          {navLinks.map((link, idx) => (
            <div key={link.name} className="flex flex-col">
                <a 
                  href={link.href} 
                  onClick={(e) => link.hasMenu ? handleMobileGroupClick(e, link.name) : handleLinkClick(e, link.href)}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent text-stroke hover:text-nexus-yellow transition-all duration-300 flex items-center gap-4 group cursor-pointer"
                  style={{ 
                      WebkitTextStroke: '1px rgba(235, 255, 0, 0.5)',
                      transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${100 + idx * 100}ms`,
                      opacity: mobileOpen ? 1 : 0,
                      transform: mobileOpen ? 'translateY(0) skewX(0)' : 'translateY(100%) skewX(-10deg)',
                      filter: mobileOpen ? 'blur(0)' : 'blur(10px)'
                  }}
                >
                  <div className="flex items-center gap-4 w-full">
                      <span className="text-sm font-mono text-nexus-yellow/50 opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                      <span className="flex-1">{link.name}</span>
                      {link.hasMenu ? (
                         <ChevronDown 
                            className={`text-nexus-yellow transition-transform duration-300 ${mobileSubmenuOpen === link.name ? 'rotate-180' : 'rotate-0'}`} 
                            size={32} 
                         />
                      ) : (
                         <ArrowUpRight 
                            className={`text-nexus-yellow transition-all duration-500 delay-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0`} 
                            size={32} 
                        />
                      )}
                  </div>
                </a>

                {/* Mobile Submenu Accordion */}
                {link.hasMenu && link.subItems && (
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileSubmenuOpen === link.name ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                      <div className="flex flex-col gap-4 pl-12 border-l-2 border-nexus-yellow/10 ml-5 py-2">
                          {link.subItems.map((sub, subIdx) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                onClick={(e) => handleLinkClick(e, sub.href)}
                                className="text-lg sm:text-xl text-neutral-400 hover:text-white transition-colors block font-mono tracking-wide transform translate-x-0 hover:translate-x-2 duration-300"
                                style={{
                                    transitionDelay: `${subIdx * 50}ms`
                                }}
                              >
                                  {sub.name}
                              </a>
                          ))}
                      </div>
                  </div>
                )}
            </div>
          ))}
        </div>

        <div 
            className={`w-full max-w-lg mx-auto border-t border-nexus-yellow/20 pt-8 transition-all duration-700 delay-500 mb-10 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
           <div className="flex flex-col gap-6">
              <Button variant="primary" className="w-full bg-nexus-yellow text-black border-nexus-yellow hover:bg-white justify-center h-14 text-lg shadow-[0_0_20px_rgba(235,255,0,0.2)]">
                Launch App <ExternalLink size={20} />
              </Button>
              
              <div className="flex justify-between items-center text-neutral-400">
                 <div className="flex flex-col gap-2">
                   <span className="text-xs text-nexus-yellow uppercase tracking-widest">Connect</span>
                   <div className="flex gap-4 text-white">
                      <Twitter className="hover:text-nexus-yellow cursor-pointer transition-colors" />
                      <Github className="hover:text-nexus-yellow cursor-pointer transition-colors" />
                   </div>
                 </div>
                 <Button variant="outline" className="text-xs border-white/20 hover:border-nexus-yellow hover:text-nexus-yellow">Testnet V2.1</Button>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};