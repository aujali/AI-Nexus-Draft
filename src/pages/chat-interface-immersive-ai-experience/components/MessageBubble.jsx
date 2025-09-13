import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isUser, timestamp, onRegenerate, onCopy, onShare }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })?.format(date);
  };

  const getMessageLength = () => {
    if (message?.length < 50) return 'short';
    if (message?.length < 200) return 'medium';
    return 'long';
  };

  const getBubbleSize = () => {
    const length = getMessageLength();
    switch (length) {
      case 'short':
        return 'max-w-xs';
      case 'medium':
        return 'max-w-md';
      default:
        return 'max-w-lg';
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div 
        className={`${getBubbleSize()} transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Message Container */}
        <div className={`relative px-4 py-3 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-md ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto rounded-br-md' 
            : 'bg-card text-card-foreground border border-border rounded-bl-md'
        }`}>
          {/* Message Content */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </div>

          {/* Timestamp */}
          <div className={`text-xs mt-2 ${
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            {formatTime(timestamp)}
          </div>

          {/* Message Status for User Messages */}
          {isUser && (
            <div className="absolute -bottom-1 -right-1">
              <div className="w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <Icon name="Check" size={8} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className={`flex items-center space-x-2 mt-2 transition-all duration-300 animate-fade-in ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <Button
              variant="ghost"
              size="xs"
              iconName="Copy"
              onClick={() => onCopy(message)}
              className="opacity-70 hover:opacity-100"
            />
            <Button
              variant="ghost"
              size="xs"
              iconName="Share"
              onClick={() => onShare(message)}
              className="opacity-70 hover:opacity-100"
            />
            {!isUser && (
              <Button
                variant="ghost"
                size="xs"
                iconName="RotateCcw"
                onClick={() => onRegenerate(message)}
                className="opacity-70 hover:opacity-100"
              />
            )}
          </div>
        )}

        {/* Message Reactions */}
        <div className={`flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <button className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200">
            <span className="text-xs">👍</span>
          </button>
          <button className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200">
            <span className="text-xs">👎</span>
          </button>
          <button className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200">
            <span className="text-xs">❤️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;