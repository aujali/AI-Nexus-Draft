import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/20 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-6 text-center">
        {/* Main CTA Content */}
        <div className="mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Ready to Experience AI Nexus?</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Start your AI journey
            <span className="block text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              today
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of innovators, creators, and professionals who are already experiencing 
            the future of AI conversation. No credit card required.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/chat-interface-immersive-ai-experience">
            <Button 
              variant="default" 
              size="xl"
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift w-full sm:w-auto"
            >
              Start Chatting Free
            </Button>
          </Link>
          
          <Link to="/voice-experience-center">
            <Button 
              variant="outline" 
              size="xl"
              iconName="Mic"
              iconPosition="left"
              className="hover-lift w-full sm:w-auto"
            >
              Try Voice AI
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center space-x-3 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover-lift">
            <Icon name="Zap" size={20} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Instant Setup</span>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover-lift">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-sm font-medium text-foreground">Privacy Protected</span>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover-lift">
            <Icon name="Heart" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Always Free Tier</span>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Want to explore more features first?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ai-capabilities-showcase">
              <Button 
                variant="ghost" 
                size="sm"
                iconName="Explore"
                iconPosition="left"
                className="hover-lift"
              >
                Explore Capabilities
              </Button>
            </Link>
            <Link to="/conversation-history-dashboard">
              <Button 
                variant="ghost" 
                size="sm"
                iconName="History"
                iconPosition="left"
                className="hover-lift"
              >
                View Examples
              </Button>
            </Link>
            <Link to="/personalization-hub-ai-avatar-customization">
              <Button 
                variant="ghost" 
                size="sm"
                iconName="Settings"
                iconPosition="left"
                className="hover-lift"
              >
                Customize Experience
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-primary" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-secondary" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-accent" />
              <span>AI Ethics Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;