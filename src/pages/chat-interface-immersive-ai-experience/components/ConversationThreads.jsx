import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationThreads = ({ threads, activeThreadId, onThreadSelect, onNewThread, onDeleteThread }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date?.toLocaleDateString();
  };

  const getThreadIcon = (topic) => {
    if (topic?.toLowerCase()?.includes('code')) return 'Code';
    if (topic?.toLowerCase()?.includes('business')) return 'Briefcase';
    if (topic?.toLowerCase()?.includes('creative')) return 'Palette';
    if (topic?.toLowerCase()?.includes('analysis')) return 'BarChart';
    return 'MessageCircle';
  };

  const getThreadColor = (topic) => {
    if (topic?.toLowerCase()?.includes('code')) return 'text-blue-500';
    if (topic?.toLowerCase()?.includes('business')) return 'text-green-500';
    if (topic?.toLowerCase()?.includes('creative')) return 'text-purple-500';
    if (topic?.toLowerCase()?.includes('analysis')) return 'text-orange-500';
    return 'text-primary';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={18} className="text-primary" />
          <h3 className="font-semibold text-foreground">Conversation Threads</h3>
          <div className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
            {threads?.length}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            iconName="Plus"
            onClick={onNewThread}
            className="opacity-70 hover:opacity-100"
          />
          <Button
            variant="ghost"
            size="xs"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="opacity-70 hover:opacity-100"
          />
        </div>
      </div>
      {/* Thread List */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-48'} overflow-y-auto`}>
        {threads?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="MessageCircle" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No conversations yet</p>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={onNewThread}
              className="mt-3"
            >
              Start New Chat
            </Button>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {threads?.map((thread) => (
              <div
                key={thread?.id}
                onClick={() => onThreadSelect(thread?.id)}
                className={`group flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover-lift ${
                  activeThreadId === thread?.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
                }`}
              >
                {/* Thread Icon */}
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${
                  activeThreadId === thread?.id ? 'bg-primary/20' : ''
                }`}>
                  <Icon 
                    name={getThreadIcon(thread?.topic)} 
                    size={16} 
                    className={`${getThreadColor(thread?.topic)} ${
                      activeThreadId === thread?.id ? 'text-primary' : ''
                    }`}
                  />
                </div>

                {/* Thread Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {thread?.topic}
                    </h4>
                    <span className="text-xs text-muted-foreground ml-2">
                      {formatDate(thread?.lastActivity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground truncate">
                      {thread?.lastMessage}
                    </p>
                    <div className="flex items-center space-x-1 ml-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span className="text-xs text-muted-foreground">
                        {thread?.messageCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thread Actions */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Trash2"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onDeleteThread(thread?.id);
                    }}
                    className="text-error hover:text-error opacity-70 hover:opacity-100"
                  />
                </div>

                {/* Active Indicator */}
                {activeThreadId === thread?.id && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="p-3 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="Search"
              className="opacity-70 hover:opacity-100"
            />
            <Button
              variant="ghost"
              size="xs"
              iconName="Filter"
              className="opacity-70 hover:opacity-100"
            />
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
            <span className="text-xs text-muted-foreground">
              {threads?.filter(t => t?.isActive)?.length} active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationThreads;