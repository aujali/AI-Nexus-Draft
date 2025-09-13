import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      story: `AI Nexus transformed our content creation process. What used to take our team 3 days now takes 3 hours. The creative collaboration feature helped us generate 50+ campaign ideas in a single session, and the analytical capabilities provided insights we never would have discovered manually.`,
      metrics: {
        timeSaved: "85%",
        productivity: "+340%",
        satisfaction: "9.8/10"
      },
      capability: "Creative Collaboration"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      role: "Research Scientist",
      company: "BioTech Labs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      story: `The analytical thinking capabilities of AI Nexus are remarkable. It helped me process complex research data, identify patterns I missed, and even suggested novel research directions. The AI's ability to understand context and provide nuanced insights has accelerated our research timeline by months.`,
      metrics: {
        dataProcessing: "10x faster",
        insights: "+250%",
        accuracy: "97.3%"
      },
      capability: "Analytical Thinking"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Product Manager",
      company: "InnovateCorp",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      story: `AI Nexus became our problem-solving partner. When we faced a complex user experience challenge, the AI helped us break down the problem systematically, explore multiple solution pathways, and even predict potential user reactions. It's like having a brilliant consultant available 24/7.`,
      metrics: {
        problemsSolved: "95%",
        solutionSpeed: "4x faster",
        implementation: "88% success"
      },
      capability: "Problem Solving"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Learning & Development",
      company: "EduTech Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story: `The learning assistance feature revolutionized our training programs. AI Nexus creates personalized learning paths, adapts to different learning styles, and provides real-time feedback. Our employee engagement scores increased by 60%, and knowledge retention improved dramatically.`,
      metrics: {
        engagement: "+60%",
        retention: "+45%",
        completion: "92%"
      },
      capability: "Learning Assistance"
    }
  ];

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories?.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories?.length) % stories?.length);
  };

  const currentStory = stories?.[activeStory];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Success Stories</h3>
            <p className="text-sm text-muted-foreground">Real results from AI Nexus users</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={prevStory}
            className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <span className="text-sm text-muted-foreground px-2">
            {activeStory + 1} / {stories?.length}
          </span>
          <button
            onClick={nextStory}
            className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      <div className="animate-fade-in">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Image
              src={currentStory?.avatar}
              alt={currentStory?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{currentStory?.name}</h4>
            <p className="text-sm text-muted-foreground">{currentStory?.role}</p>
            <p className="text-xs text-muted-foreground">{currentStory?.company}</p>
          </div>
          <div className="ml-auto">
            <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
              {currentStory?.capability}
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-background/50 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Quote" size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
            <p className="text-sm text-foreground leading-relaxed italic">
              {currentStory?.story}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(currentStory?.metrics)?.map(([key, value], index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {key?.replace(/([A-Z])/g, ' $1')?.trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Story Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {stories?.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStory(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === activeStory ? 'bg-primary w-6' : 'bg-muted hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;