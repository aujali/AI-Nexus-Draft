import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const UsageAnalytics = ({ selectedAvatar, personalitySettings }) => {
  const [timeRange, setTimeRange] = useState('7days');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock analytics data
  const conversationData = [
    { day: 'Mon', conversations: 12, satisfaction: 4.8 },
    { day: 'Tue', conversations: 19, satisfaction: 4.6 },
    { day: 'Wed', conversations: 8, satisfaction: 4.9 },
    { day: 'Thu', conversations: 15, satisfaction: 4.7 },
    { day: 'Fri', conversations: 22, satisfaction: 4.8 },
    { day: 'Sat', conversations: 6, satisfaction: 5.0 },
    { day: 'Sun', conversations: 9, satisfaction: 4.9 }
  ];

  const personalityEffectiveness = [
    { trait: 'Creativity', current: personalitySettings?.creativity || 65, optimal: 75, satisfaction: 4.7 },
    { trait: 'Formality', current: personalitySettings?.formality || 50, optimal: 45, satisfaction: 4.8 },
    { trait: 'Detail', current: personalitySettings?.detail || 60, optimal: 70, satisfaction: 4.6 },
    { trait: 'Empathy', current: personalitySettings?.empathy || 75, optimal: 80, satisfaction: 4.9 }
  ];

  const conversationTypes = [
    { name: 'Work & Productivity', value: 35, color: '#96C8B7' },
    { name: 'Creative Projects', value: 28, color: '#F3D096' },
    { name: 'Learning & Research', value: 22, color: '#C0C0C0' },
    { name: 'Personal Support', value: 15, color: '#48BB78' }
  ];

  const timeRanges = [
    { key: '7days', label: '7 Days' },
    { key: '30days', label: '30 Days' },
    { key: '90days', label: '90 Days' },
    { key: '1year', label: '1 Year' }
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'BarChart3' },
    { key: 'personality', label: 'Personality', icon: 'User' },
    { key: 'conversations', label: 'Conversations', icon: 'MessageCircle' },
    { key: 'recommendations', label: 'Insights', icon: 'Lightbulb' }
  ];

  const getOptimalityScore = (current, optimal) => {
    const difference = Math.abs(current - optimal);
    return Math.max(0, 100 - (difference * 2));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">91</div>
          <div className="text-sm text-muted-foreground">Total Conversations</div>
          <div className="text-xs text-success">+23% vs last week</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-secondary">4.8</div>
          <div className="text-sm text-muted-foreground">Avg Satisfaction</div>
          <div className="text-xs text-success">+0.2 vs last week</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent">13m</div>
          <div className="text-sm text-muted-foreground">Avg Session</div>
          <div className="text-xs text-warning">-2m vs last week</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">87%</div>
          <div className="text-sm text-muted-foreground">Goal Achievement</div>
          <div className="text-xs text-success">+5% vs last week</div>
        </div>
      </div>

      {/* Conversation Trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Conversation Activity</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="conversations" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversation Types */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Conversation Categories</h4>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversationTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {conversationTypes?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-3">
            {conversationTypes?.map((type) => (
              <div key={type?.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type?.color }}
                  />
                  <span className="text-sm text-foreground">{type?.name}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{type?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonality = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Personality Effectiveness</h4>
        <div className="space-y-4">
          {personalityEffectiveness?.map((trait) => (
            <div key={trait?.trait} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{trait?.trait}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    Current: {trait?.current}% | Optimal: {trait?.optimal}%
                  </span>
                  <span className="text-xs font-medium text-success">
                    {trait?.satisfaction}/5.0
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${trait?.current}%` }}
                  />
                </div>
                <div 
                  className="absolute top-0 w-1 h-2 bg-accent rounded-full"
                  style={{ left: `${trait?.optimal}%` }}
                  title={`Optimal: ${trait?.optimal}%`}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Optimality: {getOptimalityScore(trait?.current, trait?.optimal)}%
                </span>
                <span className={`font-medium ${
                  Math.abs(trait?.current - trait?.optimal) <= 10 ? 'text-success' : 
                  Math.abs(trait?.current - trait?.optimal) <= 20 ? 'text-warning' : 'text-error'
                }`}>
                  {Math.abs(trait?.current - trait?.optimal) <= 10 ? 'Optimal' :
                   Math.abs(trait?.current - trait?.optimal) <= 20 ? 'Good' : 'Needs Adjustment'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Satisfaction Trends</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis domain={[4.0, 5.0]} stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Optimization Suggestions</h4>
              <p className="text-sm text-muted-foreground">Based on your usage patterns</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="ArrowUp" size={14} className="text-success" />
                <span className="text-sm font-medium text-success">Increase Detail Level</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your satisfaction is higher when AI provides more detailed responses (+15% detail recommended)
              </p>
            </div>
            
            <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="ArrowDown" size={14} className="text-warning" />
                <span className="text-sm font-medium text-warning">Reduce Formality</span>
              </div>
              <p className="text-xs text-muted-foreground">
                You engage more in casual conversations (-10% formality suggested)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Usage Insights</h4>
              <p className="text-sm text-muted-foreground">Patterns and trends</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="text-sm font-medium text-foreground">Peak Usage</div>
                <div className="text-xs text-muted-foreground">Most active time</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">2-4 PM</div>
                <div className="text-xs text-muted-foreground">Weekdays</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="text-sm font-medium text-foreground">Preferred Length</div>
                <div className="text-xs text-muted-foreground">Response preference</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-secondary">Medium</div>
                <div className="text-xs text-muted-foreground">2-4 sentences</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Recommended Actions</h4>
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            iconName="Settings"
            iconPosition="left"
            className="justify-start"
          >
            Apply Suggested Personality Adjustments
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Mic"
            iconPosition="left"
            className="justify-start"
          >
            Try Voice Mode During Peak Hours
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="BookOpen"
            iconPosition="left"
            className="justify-start"
          >
            Explore Learning Templates
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Usage Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Insights into your AI interaction patterns and optimization opportunities
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRanges?.map((range) => (
            <button
              key={range?.key}
              onClick={() => setTimeRange(range?.key)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
                timeRange === range?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setActiveTab(tab?.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'personality' && renderPersonality()}
        {activeTab === 'conversations' && renderOverview()}
        {activeTab === 'recommendations' && renderRecommendations()}
      </div>
    </div>
  );
};

export default UsageAnalytics;