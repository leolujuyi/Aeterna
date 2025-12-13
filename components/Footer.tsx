import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                 <div className="w-3 h-3 bg-black rounded-full" />
               </div>
               <span className="text-lg font-bold">AETERNA</span>
            </div>
            <p className="text-neutral-500 text-sm max-w-xs">
              The AI Native, Chain Abstracted Public Chain. One address, infinite possibilities.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Developers</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sovereign SDK</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Faucet</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-white transition-colors">Bittensor Subnets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ritual Inference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Walrus Storage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Explorer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Community</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs">© 2025 Aeterna Foundation. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-neutral-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};