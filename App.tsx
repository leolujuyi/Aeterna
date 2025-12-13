import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TechSpecs } from './components/TechSpecs';
import { Comparison } from './components/Comparison';
import { UseCases } from './components/UseCases';
import { Developers } from './components/Developers';
import { Roadmap } from './components/Roadmap';
import { Footer } from './components/Footer';
import { DeveloperAssistant } from './components/DeveloperAssistant';
import { GrainOverlay } from './components/GrainOverlay';
import { AIAgentDemo } from './components/AIAgentDemo';
import { Ecosystem } from './components/Ecosystem';
import { CTA } from './components/CTA';

const App: React.FC = () => {
  const [isAgentDemoOpen, setIsAgentDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-nexus-yellow selection:text-black font-sans">
      <GrainOverlay />
      <Header />
      <main>
        <Hero onOpenAgent={() => setIsAgentDemoOpen(true)} />
        <Features />
        <TechSpecs />
        <Ecosystem />
        <Comparison />
        <UseCases />
        <Developers />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
      <DeveloperAssistant />
      <AIAgentDemo isOpen={isAgentDemoOpen} onClose={() => setIsAgentDemoOpen(false)} />
    </div>
  );
};

export default App;