import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContextualSidebar = ({ currentTopic, conversationContext, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('tools');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Generate contextual suggestions based on conversation
    const generateSuggestions = () => {
      const baseSuggestions = [
        "Can you explain this in simpler terms?",
        "What are the pros and cons?",
        "Can you provide examples?",
        "How does this relate to current trends?",
        "What would be the next steps?"
      ];

      if (currentTopic?.includes('code') || currentTopic?.includes('programming')) {
        return [
          "Can you optimize this code?",
          "Explain the algorithm complexity",
          "Show me alternative approaches",
          "Add error handling",
          "Write unit tests for this"
        ];
      }

      if (currentTopic?.includes('business') || currentTopic?.includes('strategy')) {
        return [
          "What are the market implications?",
          "Analyze the competitive landscape",
          "Create a SWOT analysis",
          "Suggest implementation timeline",
          "Identify potential risks"
        ];
      }

      return baseSuggestions;
    };

    setSuggestions(generateSuggestions());
  }, [currentTopic]);

  const tabs = [
    { id: 'tools', name: 'Tools', icon: 'Wrench' },
    { id: 'suggestions', name: 'Suggestions', icon: 'Lightbulb' },
    { id: 'references', name: 'References', icon: 'BookOpen' },
    { id: 'export', name: 'Export', icon: 'Download' }
  ];

  const tools = [
    { name: 'Code Formatter', icon: 'Code', description: 'Format and beautify code' },
    { name: 'Language Translator', icon: 'Languages', description: 'Translate to different languages' },
    { name: 'Summary Generator', icon: 'FileText', description: 'Create concise summaries' },
    { name: 'Image Generator', icon: 'Image', description: 'Generate images from text' },
    { name: 'Data Analyzer', icon: 'BarChart', description: 'Analyze data patterns' }
  ];

  const references = [
    { title: "AI Best Practices Guide", type: "Documentation", url: "#" },
    { title: "Machine Learning Fundamentals", type: "Article", url: "#" },
    { title: "Natural Language Processing", type: "Research", url: "#" },
    { title: "Conversational AI Design", type: "Guide", url: "#" }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-card border-l border-border shadow-elevated z-40 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
          <h3 className="font-semibold text-foreground">Context Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="X"
          onClick={onClose}
          className="opacity-70 hover:opacity-100"
        />
      </div>
      {/* Current Topic */}
      <div className="p-4 bg-secondary/10 border-b border-border">
        <div className="text-xs text-muted-foreground mb-1">Current Topic</div>
        <div className="text-sm font-medium text-secondary truncate">{currentTopic}</div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-1 py-3 text-xs font-medium transition-colors duration-200 ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={14} />
            <span className="hidden sm:inline">{tab?.name}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tools' && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground mb-3">Available Tools</h4>
            {tools?.map((tool, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors duration-200 hover-lift"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={tool?.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{tool?.name}</div>
                    <div className="text-xs text-muted-foreground">{tool?.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground mb-3">Smart Suggestions</h4>
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 hover-lift"
              >
                <div className="flex items-start space-x-3">
                  <Icon name="MessageCircle" size={16} className="text-accent mt-0.5" />
                  <span className="text-sm text-foreground">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'references' && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground mb-3">Related References</h4>
            {references?.map((ref, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors duration-200 hover-lift"
              >
                <div className="flex items-start space-x-3">
                  <Icon name="ExternalLink" size={16} className="text-secondary mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{ref?.title}</div>
                    <div className="text-xs text-muted-foreground">{ref?.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Export Options</h4>
            <div className="space-y-3">
              <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
                Export as Text
              </Button>
              <Button variant="outline" fullWidth iconName="Download" iconPosition="left">
                Download PDF
              </Button>
              <Button variant="outline" fullWidth iconName="Share" iconPosition="left">
                Share Link
              </Button>
              <Button variant="outline" fullWidth iconName="Mail" iconPosition="left">
                Email Conversation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextualSidebar;