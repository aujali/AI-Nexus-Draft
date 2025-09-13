import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Home',
      path: '/homepage-ai-conversational-platform',
      icon: 'Home'
    },
    {
      name: 'Chat',
      path: '/chat-interface-immersive-ai-experience',
      icon: 'MessageCircle'
    },
    {
      name: 'Capabilities',
      path: '/ai-capabilities-showcase',
      icon: 'Zap'
    },
    {
      name: 'Voice',
      path: '/voice-experience-center',
      icon: 'Mic'
    }
  ];

  const moreItems = [
    {
      name: 'History',
      path: '/conversation-history-dashboard',
      icon: 'History'
    },
    {
      name: 'Personalization',
      path: '/personalization-hub-ai-avatar-customization',
      icon: 'Settings'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/homepage-ai-conversational-platform" 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} className="text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground tracking-tight">AI Nexus</span>
            <span className="text-xs text-muted-foreground -mt-1">Conscious AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift ${
                isActivePath(item?.path)
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.name}</span>
            </Link>
          ))}
          
          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300">
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </button>
            
            <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 animate-slide-up">
              <div className="py-2">
                {moreItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      isActivePath(item?.path)
                        ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            iconName="Mic"
            iconPosition="left"
            className="hover-lift"
          >
            Try Voice
          </Button>
          <Button 
            variant="default" 
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
          >
            Start Chat
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-up">
          <div className="px-4 py-4 space-y-2">
            {[...navigationItems, ...moreItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border space-y-2">
              <Button 
                variant="outline" 
                fullWidth
                iconName="Mic"
                iconPosition="left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Try Voice AI
              </Button>
              <Button 
                variant="default" 
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Chatting Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;