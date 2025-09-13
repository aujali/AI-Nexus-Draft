import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AvatarGallery = ({ selectedAvatar, onAvatarSelect }) => {
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const avatars = [
    {
      id: 'aria',
      name: 'Aria',
      type: 'Creative Explorer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      personality: {
        creativity: 85,
        formality: 30,
        detail: 60,
        empathy: 90
      },
      description: 'Imaginative and inspiring, perfect for creative brainstorming and artistic exploration.',
      sampleResponse: `I love exploring creative possibilities! Let's think outside the box and discover something amazing together. What if we approached this from a completely different angle?`,
      voiceStyle: 'Warm and enthusiastic',
      specialties: ['Creative Writing', 'Art Direction', 'Innovation', 'Storytelling'],
      color: '#F3D096'
    },
    {
      id: 'sage',name: 'Sage',type: 'Analytical Advisor',image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      personality: {
        creativity: 40,
        formality: 80,
        detail: 95,
        empathy: 70
      },
      description: 'Methodical and precise, ideal for research, analysis, and strategic planning.',
      sampleResponse: `Based on the data available, I recommend a systematic approach. Let me break this down into key components and analyze each factor methodically.`,
      voiceStyle: 'Professional and measured',
      specialties: ['Data Analysis', 'Research', 'Strategy', 'Problem Solving'],
      color: '#96C8B7'
    },
    {
      id: 'nova',name: 'Nova',type: 'Friendly Companion',image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      personality: {
        creativity: 65,
        formality: 25,
        detail: 50,
        empathy: 95
      },
      description: 'Warm and conversational, great for casual chats and emotional support.',sampleResponse: `Hey there! I'm so excited to chat with you today. How are you feeling? I'm here to help with whatever you need, and we can take it at your pace.`,voiceStyle: 'Casual and supportive',
      specialties: ['Conversation', 'Support', 'Learning', 'Daily Tasks'],
      color: '#C0C0C0'
    },
    {
      id: 'zephyr',name: 'Zephyr',type: 'Tech Innovator',image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      personality: {
        creativity: 75,
        formality: 60,
        detail: 85,
        empathy: 60
      },
      description: 'Forward-thinking and technical, perfect for coding, tech discussions, and innovation.',sampleResponse: `Interesting challenge! Let's architect a solution that's both elegant and scalable. I'm thinking we could leverage modern frameworks and optimize for performance.`,
      voiceStyle: 'Confident and technical',
      specialties: ['Programming', 'Technology', 'Innovation', 'System Design'],
      color: '#E53E3E'
    },
    {
      id: 'luna',
      name: 'Luna',
      type: 'Mindful Guide',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      personality: {
        creativity: 70,
        formality: 45,
        detail: 70,
        empathy: 100
      },
      description: 'Thoughtful and wise, excellent for reflection, wellness, and personal growth.',
      sampleResponse: `Take a moment to breathe and center yourself. What you're experiencing is completely valid. Let's explore this together with patience and understanding.`,
      voiceStyle: 'Calm and nurturing',
      specialties: ['Wellness', 'Reflection', 'Growth', 'Mindfulness'],
      color: '#48BB78'
    },
    {
      id: 'phoenix',
      name: 'Phoenix',
      type: 'Dynamic Leader',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      personality: {
        creativity: 80,
        formality: 70,
        detail: 75,
        empathy: 80
      },
      description: 'Energetic and motivational, ideal for leadership, goal-setting, and achievement.',
      sampleResponse: `Let's turn this vision into reality! I see tremendous potential here. We'll create a strategic plan and tackle each milestone with determination and focus.`,
      voiceStyle: 'Energetic and inspiring',
      specialties: ['Leadership', 'Strategy', 'Motivation', 'Goal Setting'],
      color: '#ED8936'
    }
  ];

  const getPersonalityBar = (value) => (
    <div className="w-full bg-muted rounded-full h-1.5">
      <div 
        className="bg-primary h-1.5 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Choose Your AI Avatar</h3>
          <p className="text-sm text-muted-foreground">Select an AI personality that matches your interaction style</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            iconName="Grid3X3"
            onClick={() => setViewMode('grid')}
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            iconName="List"
            onClick={() => setViewMode('list')}
          />
        </div>
      </div>
      {/* Avatar Grid/List */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {avatars?.map((avatar) => (
          <div
            key={avatar?.id}
            className={`group relative bg-card border rounded-xl p-6 cursor-pointer transition-all duration-300 hover-lift ${
              selectedAvatar?.id === avatar?.id
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onAvatarSelect(avatar)}
          >
            {/* Selection Indicator */}
            {selectedAvatar?.id === avatar?.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce-gentle">
                <Icon name="Check" size={14} className="text-primary-foreground" />
              </div>
            )}

            <div className={`flex ${viewMode === 'list' ? 'flex-row space-x-6' : 'flex-col space-y-4'}`}>
              {/* Avatar Image */}
              <div className={`relative ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                <div className={`relative overflow-hidden rounded-lg ${viewMode === 'list' ? 'w-24 h-24' : 'w-full h-32'}`}>
                  <Image
                    src={avatar?.image}
                    alt={avatar?.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    style={{ backgroundColor: `${avatar?.color}20` }}
                  />
                </div>
                
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-glow" />
                </div>
              </div>

              {/* Avatar Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">{avatar?.name}</h4>
                  <p className="text-sm text-muted-foreground">{avatar?.type}</p>
                </div>

                <p className="text-sm text-foreground/80 line-clamp-2">
                  {avatar?.description}
                </p>

                {/* Personality Traits */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Creativity</span>
                    <span className="text-foreground font-medium">{avatar?.personality?.creativity}%</span>
                  </div>
                  {getPersonalityBar(avatar?.personality?.creativity)}
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Formality</span>
                    <span className="text-foreground font-medium">{avatar?.personality?.formality}%</span>
                  </div>
                  {getPersonalityBar(avatar?.personality?.formality)}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1">
                  {avatar?.specialties?.slice(0, viewMode === 'list' ? 4 : 2)?.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {specialty}
                    </span>
                  ))}
                  {avatar?.specialties?.length > (viewMode === 'list' ? 4 : 2) && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                      +{avatar?.specialties?.length - (viewMode === 'list' ? 4 : 2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sample Response Preview */}
            {selectedAvatar?.id === avatar?.id && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg border-l-4 border-primary animate-fade-in">
                <p className="text-xs text-muted-foreground mb-1">Sample Response:</p>
                <p className="text-sm text-foreground italic">"{avatar?.sampleResponse}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{avatars?.length}</div>
          <div className="text-xs text-muted-foreground">AI Personalities</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">∞</div>
          <div className="text-xs text-muted-foreground">Customizations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">24/7</div>
          <div className="text-xs text-muted-foreground">Availability</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">100%</div>
          <div className="text-xs text-muted-foreground">Personalized</div>
        </div>
      </div>
    </div>
  );
};

export default AvatarGallery;