import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Conversations',
      value: stats?.totalConversations,
      change: `+${stats?.conversationsGrowth}%`,
      changeType: 'positive',
      icon: 'MessageCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Voice Interactions',
      value: stats?.voiceInteractions,
      change: `+${stats?.voiceGrowth}%`,
      changeType: 'positive',
      icon: 'Mic',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Total Messages',
      value: stats?.totalMessages?.toLocaleString(),
      change: `+${stats?.messagesGrowth}%`,
      changeType: 'positive',
      icon: 'MessageSquare',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Avg Session Time',
      value: stats?.avgSessionTime,
      change: `+${stats?.sessionTimeGrowth}%`,
      changeType: 'positive',
      icon: 'Timer',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Breakthrough Moments',
      value: stats?.breakthroughMoments,
      change: `+${stats?.breakthroughGrowth}%`,
      changeType: 'positive',
      icon: 'Zap',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Shared Conversations',
      value: stats?.sharedConversations,
      change: `+${stats?.sharedGrowth}%`,
      changeType: 'positive',
      icon: 'Users',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 hover-lift transition-all duration-300 group"
        >
          {/* Icon */}
          <div className={`${stat?.bgColor} ${stat?.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon name={stat?.icon} size={24} />
          </div>

          {/* Value */}
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>

          {/* Change Indicator */}
          <div className={`flex items-center space-x-1 text-xs ${
            stat?.changeType === 'positive' ? 'text-success' : 'text-destructive'
          }`}>
            <Icon 
              name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
            />
            <span>{stat?.change} from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;