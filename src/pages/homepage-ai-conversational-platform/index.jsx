import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CapabilitiesShowcase from './components/CapabilitiesShowcase';
import StatsCounter from './components/StatsCounter';
import ConversationGallery from './components/ConversationGallery';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>AI Nexus - Where AI Meets Intuition | Next-Generation Conversational Platform</title>
        <meta name="description" content="Experience the future of AI conversation with AI Nexus. Immersive chat interface, voice AI, and intelligent collaboration for creators, professionals, and innovators." />
        <meta name="keywords" content="AI chat, conversational AI, voice AI, AI assistant, intelligent conversation, AI collaboration" />
        <meta property="og:title" content="AI Nexus - Where AI Meets Intuition" />
        <meta property="og:description" content="Revolutionary AI conversational platform that transcends traditional chat interfaces with immersive, emotionally intelligent digital experiences." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage-ai-conversational-platform" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section with animated AI avatar and live typing demo */}
          <HeroSection />
          
          {/* Interactive capabilities showcase with real conversation examples */}
          <CapabilitiesShowcase />
          
          {/* Real-time statistics counter showing platform metrics */}
          <StatsCounter />
          
          {/* Curated gallery of remarkable AI interactions */}
          <ConversationGallery />
          
          {/* User testimonials with achievement stories */}
          <TestimonialsSection />
          
          {/* Final call-to-action with multiple entry points */}
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">AI</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">AI Nexus</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Where AI meets intuition. Experience the future of human-AI collaboration.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/chat-interface-immersive-ai-experience" className="hover:text-foreground transition-colors">Chat Interface</a></li>
                  <li><a href="/voice-experience-center" className="hover:text-foreground transition-colors">Voice AI</a></li>
                  <li><a href="/ai-capabilities-showcase" className="hover:text-foreground transition-colors">Capabilities</a></li>
                  <li><a href="/personalization-hub-ai-avatar-customization" className="hover:text-foreground transition-colors">Customization</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/conversation-history-dashboard" className="hover:text-foreground transition-colors">Examples</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} AI Nexus. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-sm text-muted-foreground">Follow us:</span>
                <div className="flex space-x-2">
                  <a href="#" className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <span className="text-xs">𝕏</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <span className="text-xs">in</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <span className="text-xs">gh</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;