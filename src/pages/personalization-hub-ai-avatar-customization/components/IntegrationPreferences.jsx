import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const IntegrationPreferences = () => {
  const [connectedServices, setConnectedServices] = useState({
    calendar: false,
    email: false,
    slack: false,
    notion: false,
    github: false,
    drive: false
  });

  const [preferences, setPreferences] = useState({
    autoSync: true,
    notifications: true,
    contextSharing: false,
    dataRetention: '30days',
    privacyMode: 'balanced'
  });

  const integrationServices = [
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Sync your schedule for better meeting preparation and time management',
      icon: 'Calendar',
      category: 'Productivity',
      features: ['Meeting prep', 'Schedule awareness', 'Reminder assistance'],
      status: 'available',
      color: '#4285F4'
    },
    {
      id: 'email',
      name: 'Gmail',
      description: 'Help with email drafting, organization, and response suggestions',
      icon: 'Mail',
      category: 'Communication',
      features: ['Email drafting', 'Smart replies', 'Organization'],
      status: 'available',
      color: '#EA4335'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Integrate AI assistance directly into your team communications',
      icon: 'MessageSquare',
      category: 'Communication',
      features: ['Message assistance', 'Thread summaries', 'Status updates'],
      status: 'available',
      color: '#4A154B'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Enhance your knowledge management with AI-powered insights',
      icon: 'FileText',
      category: 'Knowledge',
      features: ['Content generation', 'Note organization', 'Database queries'],
      status: 'available',
      color: '#000000'
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Code review assistance and development workflow integration',
      icon: 'Github',
      category: 'Development',
      features: ['Code review', 'Documentation', 'Issue analysis'],
      status: 'beta',
      color: '#181717'
    },
    {
      id: 'drive',
      name: 'Google Drive',
      description: 'Document analysis and collaborative editing assistance',
      icon: 'HardDrive',
      category: 'Storage',
      features: ['Document analysis', 'Content suggestions', 'File organization'],
      status: 'coming_soon',
      color: '#0F9D58'
    }
  ];

  const privacyOptions = [
    {
      key: 'strict',
      label: 'Strict Privacy',
      description: 'Minimal data sharing, local processing when possible',
      icon: 'Shield'
    },
    {
      key: 'balanced',
      label: 'Balanced',
      description: 'Optimized experience with privacy safeguards',
      icon: 'Scale'
    },
    {
      key: 'performance',
      label: 'Performance',
      description: 'Maximum features with enhanced data utilization',
      icon: 'Zap'
    }
  ];

  const retentionOptions = [
    { key: '7days', label: '7 Days', description: 'Minimal retention' },
    { key: '30days', label: '30 Days', description: 'Standard retention' },
    { key: '90days', label: '90 Days', description: 'Extended retention' },
    { key: 'indefinite', label: 'Indefinite', description: 'Keep until deleted' }
  ];

  const handleServiceToggle = (serviceId) => {
    setConnectedServices(prev => ({
      ...prev,
      [serviceId]: !prev?.[serviceId]
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'bg-success', text: 'Available', icon: 'Check' },
      beta: { color: 'bg-warning', text: 'Beta', icon: 'TestTube' },
      coming_soon: { color: 'bg-muted', text: 'Coming Soon', icon: 'Clock' }
    };
    
    const config = statusConfig?.[status];
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color} text-white`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.text}</span>
      </span>
    );
  };

  const connectedCount = Object.values(connectedServices)?.filter(Boolean)?.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Integration Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Connect your favorite tools and customize how AI integrates with your workflow
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{connectedCount} Connected</div>
            <div className="text-xs text-muted-foreground">{integrationServices?.length} Available</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Integrations */}
        <div className="lg:col-span-2 space-y-6">
          <h4 className="font-medium text-foreground">Available Integrations</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationServices?.map((service) => (
              <div
                key={service?.id}
                className={`bg-card border rounded-lg p-4 transition-all duration-300 ${
                  connectedServices?.[service?.id]
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${service?.color}15` }}
                    >
                      <Icon 
                        name={service?.icon} 
                        size={20} 
                        style={{ color: service?.color }}
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{service?.name}</h5>
                      <span className="text-xs text-muted-foreground">{service?.category}</span>
                    </div>
                  </div>
                  
                  {getStatusBadge(service?.status)}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3">
                  {service?.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {service?.features?.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Connect Button */}
                <Button
                  variant={connectedServices?.[service?.id] ? "outline" : "default"}
                  size="sm"
                  fullWidth
                  iconName={connectedServices?.[service?.id] ? "Unlink" : "Link"}
                  iconPosition="left"
                  onClick={() => handleServiceToggle(service?.id)}
                  disabled={service?.status === 'coming_soon'}
                  className={connectedServices?.[service?.id] ? 'border-primary text-primary' : ''}
                >
                  {connectedServices?.[service?.id] ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <h4 className="font-medium text-foreground">Integration Settings</h4>
          
          {/* General Preferences */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">General</h5>
            
            <div className="space-y-3">
              <Checkbox
                label="Auto-sync data"
                description="Automatically sync data from connected services"
                checked={preferences?.autoSync}
                onChange={(e) => handlePreferenceChange('autoSync', e?.target?.checked)}
              />
              
              <Checkbox
                label="Integration notifications"
                description="Receive notifications about integration activities"
                checked={preferences?.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e?.target?.checked)}
              />
              
              <Checkbox
                label="Context sharing"
                description="Allow AI to use context from connected services"
                checked={preferences?.contextSharing}
                onChange={(e) => handlePreferenceChange('contextSharing', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Privacy Mode */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">Privacy Mode</h5>
            
            <div className="space-y-2">
              {privacyOptions?.map((option) => (
                <button
                  key={option?.key}
                  onClick={() => handlePreferenceChange('privacyMode', option?.key)}
                  className={`w-full flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    preferences?.privacyMode === option?.key
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={16} className="mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{option?.label}</div>
                    <div className="text-xs opacity-75">{option?.description}</div>
                  </div>
                  {preferences?.privacyMode === option?.key && (
                    <Icon name="Check" size={16} className="ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">Data Retention</h5>
            
            <div className="grid grid-cols-2 gap-2">
              {retentionOptions?.map((option) => (
                <button
                  key={option?.key}
                  onClick={() => handlePreferenceChange('dataRetention', option?.key)}
                  className={`p-2 rounded-lg border text-center transition-all duration-200 ${
                    preferences?.dataRetention === option?.key
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="text-xs font-medium">{option?.label}</div>
                  <div className="text-xs opacity-75">{option?.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Integration Summary */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h5 className="text-sm font-medium text-foreground">Integration Summary</h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connected Services:</span>
                <span className="text-foreground font-medium">{connectedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Privacy Mode:</span>
                <span className="text-foreground font-medium capitalize">{preferences?.privacyMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Retention:</span>
                <span className="text-foreground font-medium">
                  {retentionOptions?.find(opt => opt?.key === preferences?.dataRetention)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auto-sync:</span>
                <span className={`font-medium ${preferences?.autoSync ? 'text-success' : 'text-muted-foreground'}`}>
                  {preferences?.autoSync ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              variant="default"
              fullWidth
              iconName="Save"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Save Preferences
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Export Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPreferences;