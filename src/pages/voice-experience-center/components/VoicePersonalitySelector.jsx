import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoicePersonalitySelector = ({ selectedPersonality, onPersonalityChange }) => {
  const personalities = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clear, concise, and business-focused communication',
      icon: 'Briefcase',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      traits: ['Formal tone', 'Structured responses', 'Industry terminology']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Imaginative, expressive, and inspiring conversations',
      icon: 'Palette',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      traits: ['Artistic language', 'Metaphorical thinking', 'Innovative ideas']
    },
    {
      id: 'analytical',
      name: 'Analytical',
      description: 'Data-driven, logical, and detail-oriented approach',
      icon: 'BarChart3',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      traits: ['Evidence-based', 'Systematic analysis', 'Precise explanations']
    },
    {
      id: 'conversational',
      name: 'Conversational',
      description: 'Friendly, casual, and naturally engaging dialogue',
      icon: 'MessageCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      traits: ['Casual tone', 'Empathetic responses', 'Natural flow']
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Voice Personality</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => onPersonalityChange('professional')}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalities?.map((personality) => (
          <div
            key={personality?.id}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-lift ${
              selectedPersonality === personality?.id
                ? `border-primary bg-primary/5 shadow-soft`
                : 'border-border bg-card hover:border-muted-foreground/30'
            }`}
            onClick={() => onPersonalityChange(personality?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${personality?.bgColor}`}>
                <Icon name={personality?.icon} size={20} className={personality?.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">{personality?.name}</h4>
                  {selectedPersonality === personality?.id && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {personality?.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {personality?.traits?.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {selectedPersonality === personality?.id && (
              <div className="absolute top-2 right-2">
                <Icon name="Check" size={16} className="text-primary" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoicePersonalitySelector;