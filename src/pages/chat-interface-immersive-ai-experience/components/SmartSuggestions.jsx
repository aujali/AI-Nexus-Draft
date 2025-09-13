import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartSuggestions = ({ conversationContext, onSuggestionClick, isVisible }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    generateSuggestions();
  }, [conversationContext]);

  const generateSuggestions = () => {
    const contextualSuggestions = [
      {
        id: 1,
        text: "Can you explain this in simpler terms?",
        icon: "MessageCircle",
        category: "clarification",
        color: "text-blue-500"
      },
      {
        id: 2,
        text: "What are some practical examples?",
        icon: "Lightbulb",
        category: "examples",
        color: "text-yellow-500"
      },
      {
        id: 3,
        text: "How can I implement this?",
        icon: "Code",
        category: "implementation",
        color: "text-green-500"
      },
      {
        id: 4,
        text: "What are the potential challenges?",
        icon: "AlertTriangle",
        category: "analysis",
        color: "text-orange-500"
      },
      {
        id: 5,
        text: "Can you provide more details?",
        icon: "Info",
        category: "details",
        color: "text-purple-500"
      },
      {
        id: 6,
        text: "What would be the next steps?",
        icon: "ArrowRight",
        category: "next-steps",
        color: "text-indigo-500"
      }
    ];

    // Add context-specific suggestions
    if (conversationContext?.includes('code') || conversationContext?.includes('programming')) {
      contextualSuggestions?.push(
        {
          id: 7,
          text: "Can you optimize this code?",
          icon: "Zap",
          category: "optimization",
          color: "text-red-500"
        },
        {
          id: 8,
          text: "Add error handling",
          icon: "Shield",
          category: "error-handling",
          color: "text-cyan-500"
        }
      );
    }

    if (conversationContext?.includes('business') || conversationContext?.includes('strategy')) {
      contextualSuggestions?.push(
        {
          id: 9,
          text: "What are the market implications?",
          icon: "TrendingUp",
          category: "market-analysis",
          color: "text-emerald-500"
        },
        {
          id: 10,
          text: "Create a SWOT analysis",
          icon: "Grid",
          category: "analysis",
          color: "text-pink-500"
        }
      );
    }

    setSuggestions(contextualSuggestions?.slice(0, 6));
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion?.text);
  };

  const rotateSuggestions = () => {
    setCurrentIndex((prev) => (prev + 3) % suggestions?.length);
  };

  if (!isVisible || suggestions?.length === 0) return null;

  const visibleSuggestions = suggestions?.slice(currentIndex, currentIndex + 3);
  if (visibleSuggestions?.length < 3) {
    visibleSuggestions?.push(...suggestions?.slice(0, 3 - visibleSuggestions?.length));
  }

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 animate-slide-up">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-elevated p-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
            <span className="text-sm font-medium text-foreground">Smart Suggestions</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="RotateCcw"
              onClick={rotateSuggestions}
              className="opacity-70 hover:opacity-100"
            />
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={() => onSuggestionClick(null)}
              className="opacity-70 hover:opacity-100"
            />
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {visibleSuggestions?.map((suggestion, index) => (
            <button
              key={`${suggestion?.id}-${currentIndex}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="group flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 hover-lift text-left animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                <Icon 
                  name={suggestion?.icon} 
                  size={16} 
                  className={`${suggestion?.color} group-hover:text-primary transition-colors duration-200`}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                  {suggestion?.text}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span className="text-xs text-muted-foreground capitalize">
                    {suggestion?.category?.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <Icon 
                name="ArrowRight" 
                size={14} 
                className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0"
              />
            </button>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-1 mt-3">
          {Array.from({ length: Math.ceil(suggestions?.length / 3) })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                Math.floor(currentIndex / 3) === index
                  ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Tip */}
        <div className="text-center mt-3">
          <p className="text-xs text-muted-foreground">
            Click any suggestion to continue the conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggestions;