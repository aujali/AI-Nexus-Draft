import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

// Import all components
import AvatarGallery from './components/AvatarGallery';
import PersonalityTuner from './components/PersonalityTuner';
import ConversationTemplates from './components/ConversationTemplates';
import VoicePersonality from './components/VoicePersonality';
import IntegrationPreferences from './components/IntegrationPreferences';
import UsageAnalytics from './components/UsageAnalytics';

const PersonalizationHub = () => {
  const [activeTab, setActiveTab] = useState('avatar');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [personalitySettings, setPersonalitySettings] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const tabs = [
    {
      key: 'avatar',
      label: 'AI Avatar',
      icon: 'User',
      description: 'Choose your AI personality'
    },
    {
      key: 'personality',
      label: 'Personality',
      icon: 'Settings',
      description: 'Fine-tune traits and behavior'
    },
    {
      key: 'templates',
      label: 'Templates',
      icon: 'FileText',
      description: 'Conversation presets'
    },
    {
      key: 'voice',
      label: 'Voice',
      icon: 'Mic',
      description: 'Voice personality matching'
    },
    {
      key: 'integrations',
      label: 'Integrations',
      icon: 'Link',
      description: 'Connect your tools'
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      description: 'Usage insights'
    }
  ];

  // Initialize with default avatar
  useEffect(() => {
    if (!selectedAvatar) {
      const defaultAvatar = {
        id: 'nova',
        name: 'Nova',
        type: 'Friendly Companion',
        personality: {
          creativity: 65,
          formality: 25,
          detail: 50,
          empathy: 95
        }
      };
      setSelectedAvatar(defaultAvatar);
      setPersonalitySettings(defaultAvatar?.personality);
    }
  }, [selectedAvatar]);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setPersonalitySettings(avatar?.personality);
    setHasUnsavedChanges(true);
  };

  const handlePersonalityChange = (settings) => {
    setPersonalitySettings(settings);
    setHasUnsavedChanges(true);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setPersonalitySettings(template?.settings);
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to backend
    setHasUnsavedChanges(false);
    // Show success notification
  };

  const handleResetToDefaults = () => {
    if (selectedAvatar) {
      setPersonalitySettings(selectedAvatar?.personality);
      setHasUnsavedChanges(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'avatar':
        return (
          <AvatarGallery
            selectedAvatar={selectedAvatar}
            onAvatarSelect={handleAvatarSelect}
          />
        );
      case 'personality':
        return (
          <PersonalityTuner
            selectedAvatar={selectedAvatar}
            onPersonalityChange={handlePersonalityChange}
          />
        );
      case 'templates':
        return (
          <ConversationTemplates
            onTemplateSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
          />
        );
      case 'voice':
        return (
          <VoicePersonality
            selectedAvatar={selectedAvatar}
            personalitySettings={personalitySettings}
          />
        );
      case 'integrations':
        return <IntegrationPreferences />;
      case 'analytics':
        return (
          <UsageAnalytics
            selectedAvatar={selectedAvatar}
            personalitySettings={personalitySettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Link to="/homepage-ai-conversational-platform" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">Personalization Hub</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Personalization Hub
                </h1>
                <p className="text-lg text-muted-foreground">
                  Customize your AI experience to match your unique style and preferences
                </p>
              </div>
              
              {/* Save Actions */}
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-3 animate-fade-in">
                  <div className="flex items-center space-x-2 text-sm text-warning">
                    <Icon name="AlertCircle" size={16} />
                    <span>Unsaved changes</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={handleResetToDefaults}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Save"
                    onClick={handleSaveChanges}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Current Configuration Summary */}
          {selectedAvatar && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Bot" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Current AI: {selectedAvatar?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedAvatar?.type}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs">
                      <span className="text-muted-foreground">
                        Creativity: <span className="text-foreground font-medium">{personalitySettings?.creativity || 0}%</span>
                      </span>
                      <span className="text-muted-foreground">
                        Formality: <span className="text-foreground font-medium">{personalitySettings?.formality || 0}%</span>
                      </span>
                      <span className="text-muted-foreground">
                        Empathy: <span className="text-foreground font-medium">{personalitySettings?.empathy || 0}%</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    asChild
                  >
                    <Link to="/chat-interface-immersive-ai-experience">
                      Test Chat
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Mic"
                    iconPosition="left"
                    asChild
                  >
                    <Link to="/voice-experience-center">
                      Test Voice
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`group flex items-center space-x-3 px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover-lift ${
                    activeTab === tab?.key
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon 
                    name={tab?.icon} 
                    size={18} 
                    className={`transition-colors duration-200 ${
                      activeTab === tab?.key ? 'text-primary-foreground' : 'group-hover:text-foreground'
                    }`}
                  />
                  <div className="text-left">
                    <div className="font-medium">{tab?.label}</div>
                    <div className={`text-xs ${
                      activeTab === tab?.key ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {tab?.description}
                    </div>
                  </div>
                  
                  {activeTab === tab?.key && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce-gentle" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-card border border-border rounded-xl p-8 min-h-[600px] animate-fade-in">
            {renderTabContent()}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center hover-lift cursor-pointer group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Quick Setup</h4>
              <p className="text-sm text-muted-foreground">
                Get started with recommended settings based on your usage
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center hover-lift cursor-pointer group">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors">
                <Icon name="Download" size={24} className="text-secondary" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Export Settings</h4>
              <p className="text-sm text-muted-foreground">
                Save your configuration to use across devices
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center hover-lift cursor-pointer group">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <Icon name="Share" size={24} className="text-accent" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Share Profile</h4>
              <p className="text-sm text-muted-foreground">
                Share your AI personality with friends and colleagues
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalizationHub;