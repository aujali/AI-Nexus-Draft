import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineView = ({ conversations, onSelectConversation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { value: 'day', label: 'Day', icon: 'Calendar' },
    { value: 'week', label: 'Week', icon: 'CalendarDays' },
    { value: 'month', label: 'Month', icon: 'Calendar' },
    { value: 'year', label: 'Year', icon: 'CalendarRange' }
  ];

  const groupConversationsByPeriod = (conversations, period) => {
    const groups = {};
    conversations?.forEach(conv => {
      const date = new Date(conv.lastActivity);
      let key;
      
      switch (period) {
        case 'day':
          key = date?.toDateString();
          break;
        case 'week':
          const weekStart = new Date(date);
          weekStart?.setDate(date?.getDate() - date?.getDay());
          key = `Week of ${weekStart?.toLocaleDateString()}`;
          break;
        case 'month':
          key = date?.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
          break;
        case 'year':
          key = date?.getFullYear()?.toString();
          break;
        default:
          key = date?.toDateString();
      }
      
      if (!groups?.[key]) {
        groups[key] = [];
      }
      groups?.[key]?.push(conv);
    });
    
    return Object.entries(groups)?.sort(([a], [b]) => new Date(b) - new Date(a));
  };

  const groupedConversations = groupConversationsByPeriod(conversations, selectedPeriod);

  const getBreakthroughIcon = (conversation) => {
    if (conversation?.isBreakthrough) {
      return <Icon name="Zap" size={16} className="text-accent" />;
    }
    if (conversation?.hasInsights) {
      return <Icon name="Lightbulb" size={16} className="text-secondary" />;
    }
    return <Icon name="MessageCircle" size={16} className="text-muted-foreground" />;
  };

  const getConversationTypeColor = (tags) => {
    if (tags?.includes('creative')) return 'border-l-purple-400';
    if (tags?.includes('business')) return 'border-l-blue-400';
    if (tags?.includes('technical')) return 'border-l-green-400';
    if (tags?.includes('personal')) return 'border-l-orange-400';
    if (tags?.includes('research')) return 'border-l-indigo-400';
    return 'border-l-gray-400';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Timeline" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Conversation Timeline</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {periods?.map((period) => (
            <Button
              key={period?.value}
              variant={selectedPeriod === period?.value ? 'default' : 'outline'}
              size="sm"
              iconName={period?.icon}
              iconPosition="left"
              onClick={() => setSelectedPeriod(period?.value)}
            >
              {period?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-8">
          {groupedConversations?.map(([period, periodConversations], periodIndex) => (
            <div key={period} className="relative">
              {/* Period Header */}
              <div className="flex items-center mb-4">
                <div className="relative z-10 bg-primary text-primary-foreground rounded-full p-3 mr-4">
                  <Icon name="Calendar" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{period}</h3>
                  <p className="text-sm text-muted-foreground">
                    {periodConversations?.length} conversation{periodConversations?.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Conversations in Period */}
              <div className="ml-16 space-y-4">
                {periodConversations?.map((conversation, index) => (
                  <div
                    key={conversation?.id}
                    className={`relative bg-background border-l-4 ${getConversationTypeColor(conversation?.tags)} rounded-lg p-4 hover-lift cursor-pointer transition-all duration-300 group`}
                    onClick={() => onSelectConversation(conversation?.id)}
                  >
                    {/* Conversation Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getBreakthroughIcon(conversation)}
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {conversation?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(conversation.lastActivity)?.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-muted-foreground">
                          {conversation?.messageCount} msgs
                        </span>
                        <Icon name="ArrowRight" size={16} className="text-primary" />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {conversation?.tags?.slice(0, 3)?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {conversation?.tags?.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                          +{conversation?.tags?.length - 3}
                        </span>
                      )}
                    </div>

                    {/* AI Summary Preview */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {conversation?.aiSummary}
                    </p>

                    {/* Features */}
                    <div className="flex items-center space-x-4">
                      {conversation?.hasVoice && (
                        <div className="flex items-center space-x-1 text-xs text-accent">
                          <Icon name="Mic" size={12} />
                          <span>Voice</span>
                        </div>
                      )}
                      {conversation?.hasFiles && (
                        <div className="flex items-center space-x-1 text-xs text-secondary">
                          <Icon name="Paperclip" size={12} />
                          <span>Files</span>
                        </div>
                      )}
                      {conversation?.isShared && (
                        <div className="flex items-center space-x-1 text-xs text-primary">
                          <Icon name="Users" size={12} />
                          <span>Shared</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="Timer" size={12} />
                        <span>{conversation?.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {groupedConversations?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No conversations found</h3>
            <p className="text-muted-foreground mb-4">
              Start a new conversation to see your timeline grow
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Start New Chat
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;