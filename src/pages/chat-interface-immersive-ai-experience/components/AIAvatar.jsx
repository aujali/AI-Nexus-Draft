import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AIAvatar = ({ isTyping, conversationTone, messageCount }) => {
  const [expression, setExpression] = useState('neutral');
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Change expression based on conversation tone
    if (isTyping) {
      setExpression('thinking');
    } else if (conversationTone === 'positive') {
      setExpression('happy');
    } else if (conversationTone === 'analytical') {
      setExpression('focused');
    } else {
      setExpression('neutral');
    }
  }, [isTyping, conversationTone]);

  useEffect(() => {
    // Subtle eye movement animation
    const interval = setInterval(() => {
      setEyePosition({
        x: Math.random() * 4 - 2,
        y: Math.random() * 2 - 1
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAvatarGradient = () => {
    switch (expression) {
      case 'thinking':
        return 'from-primary via-secondary to-accent';
      case 'happy':
        return 'from-success via-secondary to-accent';
      case 'focused':
        return 'from-secondary via-primary to-accent';
      default:
        return 'from-primary via-secondary to-accent';
    }
  };

  return (
    <div className="relative">
      {/* Main Avatar Container */}
      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarGradient()} p-1 transition-all duration-500 ${
        isTyping ? 'animate-pulse scale-105' : 'scale-100'
      }`}>
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center relative overflow-hidden">
          {/* AI Brain Icon */}
          <Icon 
            name="Brain" 
            size={24} 
            className={`text-primary transition-all duration-300 ${
              isTyping ? 'animate-bounce' : ''
            }`} 
          />
          
          {/* Eyes Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
              <div 
                className="w-1 h-1 bg-primary rounded-full transition-transform duration-1000"
                style={{ transform: `translate(${eyePosition?.x}px, ${eyePosition?.y}px)` }}
              />
              <div 
                className="w-1 h-1 bg-primary rounded-full transition-transform duration-1000"
                style={{ transform: `translate(${eyePosition?.x}px, ${eyePosition?.y}px)` }}
              />
            </div>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse-glow" />
        </div>
      </div>
      {/* Thinking Animation */}
      {isTyping && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-soft animate-bounce-gentle">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
      {/* Conversation Stats */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-accent/20 text-accent-foreground text-xs px-2 py-1 rounded-full border border-accent/30">
          {messageCount} msgs
        </div>
      </div>
    </div>
  );
};

export default AIAvatar;