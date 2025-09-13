import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationCard = ({ conversation, onView, onShare, onDelete, onExport }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getTagColor = (tag) => {
    const colors = {
      'creative': 'bg-purple-100 text-purple-700 border-purple-200',
      'business': 'bg-blue-100 text-blue-700 border-blue-200',
      'technical': 'bg-green-100 text-green-700 border-green-200',
      'personal': 'bg-orange-100 text-orange-700 border-orange-200',
      'research': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'planning': 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors?.[tag] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
            {conversation?.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{formatDate(conversation?.lastActivity)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span>{conversation?.messageCount} messages</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Timer" size={14} />
              <span>{conversation?.duration}</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onView(conversation?.id)}
            className="hover:bg-primary/10"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            onClick={() => onShare(conversation?.id)}
            className="hover:bg-secondary/10"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={() => onExport(conversation?.id)}
            className="hover:bg-accent/10"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(conversation?.id)}
            className="hover:bg-destructive/10 hover:text-destructive"
          />
        </div>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {conversation?.tags?.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getTagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>
      {/* AI Summary */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">AI Summary</span>
        </div>
        <p className={`text-sm text-muted-foreground leading-relaxed ${
          isExpanded ? '' : 'line-clamp-2'
        }`}>
          {conversation?.aiSummary}
        </p>
        {conversation?.aiSummary?.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary hover:text-primary/80 mt-1 font-medium"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      {/* Preview Messages */}
      <div className="space-y-2 mb-4">
        {conversation?.preview?.map((message, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              message?.sender === 'user' ?'bg-primary/10 text-primary' :'bg-secondary/10 text-secondary'
            }`}>
              <Icon 
                name={message?.sender === 'user' ? 'User' : 'Bot'} 
                size={12} 
              />
            </div>
            <p className="text-sm text-muted-foreground flex-1 truncate">
              {message?.content}
            </p>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          {conversation?.hasVoice && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Mic" size={12} className="text-accent" />
              <span>Voice</span>
            </div>
          )}
          {conversation?.hasFiles && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Paperclip" size={12} className="text-secondary" />
              <span>Files</span>
            </div>
          )}
          {conversation?.isShared && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Users" size={12} className="text-primary" />
              <span>Shared</span>
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onView(conversation?.id)}
          className="hover-lift"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ConversationCard;