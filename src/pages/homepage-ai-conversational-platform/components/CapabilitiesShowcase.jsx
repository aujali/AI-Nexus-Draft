import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CapabilitiesShowcase = () => {
  const [activeCapability, setActiveCapability] = useState(0);

  const capabilities = [
    {
      id: 'creative',
      title: 'Creative Collaboration',
      description: 'Transform ideas into compelling content with AI-powered creativity',
      icon: 'Palette',
      color: 'accent',
      features: ['Story Writing', 'Content Creation', 'Brainstorming', 'Design Ideas'],
      example: `"Help me write a compelling story about a time traveler who discovers that changing the past creates parallel universes instead of altering the current timeline."\n\n"What an intriguing concept! Let me craft a story that explores the emotional weight of this discovery..."`
    },
    {
      id: 'analytical',
      title: 'Data Analysis',
      description: 'Unlock insights from complex data with intelligent analysis',
      icon: 'BarChart3',
      color: 'primary',
      features: ['Pattern Recognition', 'Trend Analysis', 'Report Generation', 'Visualization'],
      example: `"Analyze this sales data and identify key trends for Q4 strategy."\n\n"Based on your data, I've identified three critical trends: 1) Mobile purchases increased 45%, 2) Customer retention improved in the 25-34 demographic, 3) Weekend sales show untapped potential..."`
    },
    {
      id: 'problem-solving',
      title: 'Problem Solving',
      description: 'Break down complex challenges into actionable solutions',
      icon: 'Lightbulb',
      color: 'secondary',
      features: ['Strategic Planning', 'Decision Support', 'Risk Assessment', 'Solution Design'],
      example: `"My startup is struggling with user retention. How can I improve engagement?"\n\n"Let's approach this systematically. First, let's analyze your user journey to identify drop-off points, then implement targeted engagement strategies..."`
    },
    {
      id: 'learning',
      title: 'Learning Assistant',
      description: 'Accelerate learning with personalized explanations and guidance',
      icon: 'GraduationCap',
      color: 'success',
      features: ['Concept Explanation', 'Skill Development', 'Practice Problems', 'Progress Tracking'],
      example: `"Explain machine learning algorithms in simple terms."\n\n"Think of machine learning like teaching a child to recognize patterns. Just as a child learns to identify cats by seeing many cat photos, algorithms learn from data examples..."`
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Zap" size={16} />
            <span>AI Capabilities</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Discover what AI can do
            <span className="block text-transparent bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text">
              for you
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our AI's diverse capabilities through interactive demonstrations. 
            Click on each capability to see real conversation examples.
          </p>
        </div>

        {/* Interactive Capabilities Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Capability Cards */}
          <div className="space-y-4">
            {capabilities?.map((capability, index) => (
              <div
                key={capability?.id}
                onClick={() => setActiveCapability(index)}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover-lift ${
                  activeCapability === index
                    ? `bg-${capability?.color}/10 border-${capability?.color}/30 shadow-elevated`
                    : 'bg-background border-border hover:border-muted-foreground/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-${capability?.color}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon 
                      name={capability?.icon} 
                      size={24} 
                      className={`text-${capability?.color}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {capability?.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {capability?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {capability?.features?.map((feature) => (
                        <span
                          key={feature}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            activeCapability === index
                              ? `bg-${capability?.color}/20 text-${capability?.color}`
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    activeCapability === index
                      ? `border-${capability?.color} bg-${capability?.color}`
                      : 'border-muted-foreground/30'
                  }`}>
                    {activeCapability === index && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Capability Demo */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-background border border-border rounded-xl p-6 shadow-elevated animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 bg-${capabilities?.[activeCapability]?.color}/20 rounded-lg flex items-center justify-center`}>
                  <Icon 
                    name={capabilities?.[activeCapability]?.icon} 
                    size={20} 
                    className={`text-${capabilities?.[activeCapability]?.color}`}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {capabilities?.[activeCapability]?.title} Demo
                  </h4>
                  <p className="text-sm text-muted-foreground">Live conversation example</p>
                </div>
              </div>

              {/* Conversation Example */}
              <div className="space-y-4 mb-6">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} className="text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">You</span>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {capabilities?.[activeCapability]?.example?.split('\n\n')?.[0]}
                  </p>
                </div>

                <div className={`bg-${capabilities?.[activeCapability]?.color}/10 rounded-lg p-4`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 bg-${capabilities?.[activeCapability]?.color}/20 rounded-full flex items-center justify-center`}>
                      <Icon name="Brain" size={12} className={`text-${capabilities?.[activeCapability]?.color}`} />
                    </div>
                    <span className={`text-sm font-medium text-${capabilities?.[activeCapability]?.color}`}>AI Nexus</span>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {capabilities?.[activeCapability]?.example?.split('\n\n')?.[1]}
                  </p>
                </div>
              </div>

              {/* Try It Button */}
              <Link to="/chat-interface-immersive-ai-experience">
                <Button 
                  variant="default" 
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  className={`bg-${capabilities?.[activeCapability]?.color} hover:bg-${capabilities?.[activeCapability]?.color}/90 text-white hover-lift`}
                >
                  Try {capabilities?.[activeCapability]?.title}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Explore All Link */}
        <div className="text-center mt-12">
          <Link to="/ai-capabilities-showcase">
            <Button 
              variant="outline" 
              size="lg"
              iconName="Explore"
              iconPosition="right"
              className="hover-lift"
            >
              Explore All Capabilities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesShowcase;