import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CapabilityCard = ({ 
  title, 
  description, 
  icon, 
  demoType, 
  examples, 
  metrics, 
  onTryDemo,
  isActive = false 
}) => {
  const [currentExample, setCurrentExample] = useState(0);

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples?.length);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples?.length) % examples?.length);
  };

  return (
    <div className={`bg-card rounded-xl border transition-all duration-300 hover-lift ${
      isActive ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isActive ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
            }`}>
              <Icon name={icon} size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {metrics?.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-foreground">{metric?.value}</div>
              <div className="text-xs text-muted-foreground">{metric?.label}</div>
            </div>
          ))}
        </div>

        {/* Example Demo */}
        <div className="bg-background/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Live Example</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevExample}
                className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <Icon name="ChevronLeft" size={12} />
              </button>
              <span className="text-xs text-muted-foreground">
                {currentExample + 1}/{examples?.length}
              </span>
              <button
                onClick={nextExample}
                className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <Icon name="ChevronRight" size={12} />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-card rounded-lg p-3 border-l-4 border-accent">
              <div className="text-xs text-muted-foreground mb-1">Input:</div>
              <div className="text-sm text-foreground">{examples?.[currentExample]?.input}</div>
            </div>
            <div className="bg-card rounded-lg p-3 border-l-4 border-primary">
              <div className="text-xs text-muted-foreground mb-1">AI Response:</div>
              <div className="text-sm text-foreground">{examples?.[currentExample]?.output}</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          fullWidth
          iconName="Play"
          iconPosition="left"
          onClick={() => onTryDemo(demoType)}
          className="hover-lift"
        >
          Try This Yourself
        </Button>
      </div>
    </div>
  );
};

export default CapabilityCard;