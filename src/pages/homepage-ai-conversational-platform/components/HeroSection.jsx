import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const conversations = [
    "Help me write a compelling product launch email...",
    "Analyze this data and find key insights...",
    "Create a marketing strategy for my startup...",
    "Explain quantum computing in simple terms...",
    "Generate creative ideas for my presentation..."
  ];

  useEffect(() => {
    const conversation = conversations?.[currentIndex];
    let charIndex = 0;

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (charIndex < conversation?.length) {
          setCurrentText(conversation?.slice(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentIndex((prev) => (prev + 1) % conversations?.length);
            setCurrentText('');
          }, 2000);
          clearInterval(typingInterval);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [currentIndex, isTyping]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-card to-secondary/10 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
                <span>Next-Generation AI Platform</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Where AI meets
                <span className="block text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
                  intuition
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                Experience the future of human-AI collaboration through immersive conversations that inspire, create, and solve problems together.
              </p>
            </div>

            {/* Live Typing Demo */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-elevated max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="Brain" size={16} className="text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">AI Nexus</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
              <div className="text-foreground font-mono text-sm min-h-[24px]">
                {currentText}
                <span className="animate-pulse">|</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/chat-interface-immersive-ai-experience">
                <Button 
                  variant="default" 
                  size="lg"
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
                  size="lg"
                  iconName="Mic"
                  iconPosition="left"
                  className="hover-lift w-full sm:w-auto"
                >
                  Experience Voice AI
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-accent" />
                <span>Instant Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-secondary" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Right Content - AI Avatar */}
          <div className="relative flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              {/* Main Avatar Container */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-card to-secondary/20 rounded-3xl border border-border shadow-elevated flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Animated AI Visualization */}
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-full animate-pulse-glow"></div>
                    <div className="absolute inset-0 w-32 h-32 border-4 border-primary/30 rounded-full animate-spin"></div>
                    <div className="absolute inset-4 w-24 h-24 border-2 border-secondary/50 rounded-full animate-spin-reverse"></div>
                    <div className="absolute inset-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Brain" size={32} className="text-accent-foreground animate-bounce-gentle" />
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-8 left-8 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center animate-float">
                    <Icon name="MessageSquare" size={20} className="text-primary" />
                  </div>
                  <div className="absolute top-16 right-12 w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center animate-float delay-500">
                    <Icon name="Lightbulb" size={16} className="text-secondary" />
                  </div>
                  <div className="absolute bottom-12 left-16 w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center animate-float delay-1000">
                    <Icon name="Sparkles" size={18} className="text-accent" />
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-full px-4 py-2 shadow-elevated">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
                  <span className="text-sm font-medium text-success">AI Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;