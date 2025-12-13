import React from 'react';
import { ShoppingBag, MapPin, BedDouble } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

const UseCaseCard: React.FC<{ 
  title: string; 
  subtitle: string;
  items: string[];
  icon: React.ReactNode; 
  className?: string;
  delay?: number;
}> = ({ title, subtitle, items, icon, className, delay }) => (
  <ScrollReveal delay={delay} className={`h-full ${className}`}>
    <SpotlightCard className="h-full group p-8 bg-neutral-900/40" spotlightColor="rgba(255, 255, 255, 0.08)">
      <div className="flex flex-col h-full relative z-10">
        <div className="mb-6 flex items-center justify-between">
            <div className="p-3 bg-white/10 rounded-xl text-white">
                {icon}
            </div>
            <span className="text-xs font-mono uppercase text-neutral-500 tracking-widest">{subtitle}</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-6 text-white">{title}</h3>
        
        <ul className="space-y-3">
          {items.map((item, i) => (
             <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-nexus-yellow shrink-0" />
                <span>{item}</span>
             </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  </ScrollReveal>
);

export const UseCases: React.FC = () => {
  return (
    <section className="py-32 border-t border-white/5 relative bg-black" id="use-cases">
      <div className="container mx-auto px-6">
         <ScrollReveal>
            <div className="mb-16 text-center">
                <span className="text-nexus-yellow font-mono text-xs uppercase tracking-widest mb-2 block">Real-World Application</span>
                <h2 className="text-4xl font-bold mb-4">Built for <span className="text-white">Complex Scenarios</span></h2>
                <p className="text-neutral-500">Sovereign architecture handles mid-to-high throughput demands effortlessly.</p>
            </div>
         </ScrollReveal>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <UseCaseCard 
                title="Headless E-commerce"
                subtitle="Web3 Retail"
                icon={<ShoppingBag size={24} />}
                items={[
                    "NFT Fractional Ownership for high-value goods",
                    "AI-driven decentralized recommendation engine",
                    "Gasless payments via Paymaster",
                    "Supply chain tracking with DID + ZK"
                ]}
                delay={0}
            />
            <UseCaseCard 
                title="Decentralized O2O"
                subtitle="DePIN Delivery"
                icon={<MapPin size={24} />}
                items={[
                    "Token incentives for rider networks (DePIN)",
                    "ZK-SNARKs for location privacy",
                    "Smart contract transparent pricing",
                    "Carbon neutral delivery NFTs"
                ]}
                delay={150}
            />
            <UseCaseCard 
                title="Hotel Booking"
                subtitle="RWA Hospitality"
                icon={<BedDouble size={24} />}
                items={[
                    "RWA Room NFTs with split booking support",
                    "AI Agents negotiate prices automatically",
                    "Travel-to-Earn referral models",
                    "Dynamic pricing via Oracle feeds"
                ]}
                delay={300}
            />
         </div>
      </div>
    </section>
  );
};