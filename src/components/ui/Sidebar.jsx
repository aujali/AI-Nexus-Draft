import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Home',
      path: '/homepage-ai-conversational-platform',
      icon: 'Home',
      description: 'AI platform overview'
    },
    {
      name: 'Chat Interface',
      path: '/chat-interface-immersive-ai-experience',
      icon: 'MessageCircle',
      description: 'Immersive AI conversations'
    },
    {
      name: 'AI Capabilities',
      path: '/ai-capabilities-showcase',
      icon: 'Zap',
      description: 'Explore AI features'
    },
    {
      name: 'Voice Center',
      path: '/voice-experience-center',
      icon: 'Mic',
      description: 'Voice AI interactions'
    },
    {
      name: 'History',
      path: '/conversation-history-dashboard',
      icon: 'History',
      description: 'Past conversations'
    },
    {
      name: 'Personalization',
      path: '/personalization-hub-ai-avatar-customization',
      icon: 'Settings',
      description: 'Customize AI avatar'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;
  const shouldShowText = !isCollapsed || isHovered;

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } lg:fixed`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {shouldShowText && (
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
              <span className="text-sm font-medium text-muted-foreground">Navigation</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover-lift ${
                isActivePath(item?.path)
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex-shrink-0">
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={`transition-colors duration-200 ${
                    isActivePath(item?.path) ? 'text-primary' : 'group-hover:text-foreground'
                  }`}
                />
              </div>
              
              {shouldShowText && (
                <div className="flex-1 min-w-0 animate-fade-in">
                  <div className="font-medium truncate">{item?.name}</div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">
                    {item?.description}
                  </div>
                </div>
              )}

              {isActivePath(item?.path) && (
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce-gentle"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* AI Status Indicator */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 px-3 py-3 rounded-lg bg-secondary/10 border border-secondary/20 ${
            shouldShowText ? '' : 'justify-center'
          }`}>
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
              <div className="absolute inset-0 w-3 h-3 bg-success rounded-full animate-ping opacity-75"></div>
            </div>
            
            {shouldShowText && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <div className="text-xs font-medium text-secondary">AI Status</div>
                <div className="text-xs text-muted-foreground">Online & Ready</div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth={shouldShowText}
            iconName="Mic"
            iconPosition={shouldShowText ? "left" : undefined}
            className="hover-lift"
          >
            {shouldShowText ? 'Voice Chat' : ''}
          </Button>
          
          <Button
            variant="default"
            size="sm"
            fullWidth={shouldShowText}
            iconName="Plus"
            iconPosition={shouldShowText ? "left" : undefined}
            className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
          >
            {shouldShowText ? 'New Chat' : ''}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;