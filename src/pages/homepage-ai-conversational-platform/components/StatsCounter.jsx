import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsCounter = () => {
  const [stats, setStats] = useState({
    conversations: 0,
    satisfaction: 0,
    users: 0,
    uptime: 0
  });

  const finalStats = {
    conversations: 2847293,
    satisfaction: 98.7,
    users: 156842,
    uptime: 99.9
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        conversations: Math.floor(finalStats?.conversations * progress),
        satisfaction: Math.floor(finalStats?.satisfaction * progress * 10) / 10,
        users: Math.floor(finalStats?.users * progress),
        uptime: Math.floor(finalStats?.uptime * progress * 10) / 10
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(finalStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: 'MessageCircle',
      value: stats?.conversations?.toLocaleString(),
      label: 'Conversations',
      suffix: '+',
      color: 'primary'
    },
    {
      icon: 'Heart',
      value: stats?.satisfaction,
      label: 'Satisfaction Rate',
      suffix: '%',
      color: 'success'
    },
    {
      icon: 'Users',
      value: stats?.users?.toLocaleString(),
      label: 'Active Users',
      suffix: '+',
      color: 'secondary'
    },
    {
      icon: 'Zap',
      value: stats?.uptime,
      label: 'Uptime',
      suffix: '%',
      color: 'accent'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-secondary/5 via-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
            <span>Real-Time Statistics</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
            Trusted by thousands of users
            <span className="block text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
              worldwide
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join a growing community of innovators, creators, and professionals who trust AI Nexus for their daily AI interactions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statItems?.map((stat, index) => (
            <div
              key={stat?.label}
              className="text-center p-6 bg-card border border-border rounded-xl shadow-soft hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-${stat?.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon 
                  name={stat?.icon} 
                  size={28} 
                  className={`text-${stat?.color}`}
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl lg:text-3xl font-bold text-foreground">
                  {stat?.value}{stat?.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat?.label}
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="mt-4 w-full bg-muted/30 rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-full bg-${stat?.color} rounded-full transition-all duration-2000 ease-out`}
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Activity Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-card border border-border rounded-full px-6 py-3 shadow-soft">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse delay-200"></div>
            </div>
            <span className="text-sm font-medium text-success">Live Activity</span>
            <span className="text-sm text-muted-foreground">
              {Math.floor(Math.random() * 50) + 20} users chatting now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;