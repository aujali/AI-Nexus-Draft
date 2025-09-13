import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ConversationTemplates = ({ onTemplateSelect, selectedTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('professional');

  const templates = {
    professional: [
      {
        id: 'meeting_prep',
        name: 'Meeting Preparation',
        description: 'Structured approach for meeting planning and agenda creation',
        icon: 'Calendar',
        settings: {
          formality: 85,
          detail: 90,
          creativity: 40,
          empathy: 60
        },
        samplePrompts: [
          "Help me prepare an agenda for tomorrow\'s team meeting",
          "What key points should I cover in the client presentation?",
          "How can I make this meeting more productive?"
        ],
        features: ['Agenda Templates', 'Action Items', 'Follow-up Tasks', 'Time Management'],
        color: '#96C8B7'
      },
      {
        id: 'project_planning',
        name: 'Project Planning',
        description: 'Comprehensive project management and strategic planning assistance',
        icon: 'Target',
        settings: {
          formality: 80,
          detail: 95,
          creativity: 50,
          empathy: 55
        },
        samplePrompts: [
          "Break down this project into manageable phases",
          "What risks should I consider for this timeline?",
          "Help me create a project roadmap"
        ],
        features: ['Milestone Planning', 'Risk Assessment', 'Resource Allocation', 'Timeline Creation'],
        color: '#C0C0C0'
      },
      {
        id: 'email_drafting',
        name: 'Email Drafting',
        description: 'Professional email composition with appropriate tone and structure',
        icon: 'Mail',
        settings: {
          formality: 75,
          detail: 70,
          creativity: 35,
          empathy: 70
        },
        samplePrompts: [
          "Help me write a follow-up email to a client",
          "Draft a professional response to this inquiry",
          "How should I phrase this request diplomatically?"
        ],
        features: ['Tone Adjustment', 'Template Library', 'Grammar Check', 'Cultural Sensitivity'],
        color: '#F3D096'
      }
    ],
    creative: [
      {
        id: 'brainstorming',
        name: 'Creative Brainstorming',
        description: 'Unleash innovative ideas and explore creative possibilities',
        icon: 'Lightbulb',
        settings: {
          formality: 25,
          detail: 60,
          creativity: 95,
          empathy: 80
        },
        samplePrompts: [
          "Let\'s brainstorm unique marketing campaign ideas",
          "What are some creative solutions to this design challenge?",
          "Help me think outside the box for this project"
        ],
        features: ['Idea Generation', 'Mind Mapping', 'Creative Exercises', 'Inspiration Sources'],
        color: '#E53E3E'
      },
      {
        id: 'content_creation',
        name: 'Content Creation',
        description: 'Writing assistance for blogs, social media, and creative content',
        icon: 'PenTool',
        settings: {
          formality: 40,
          detail: 75,
          creativity: 85,
          empathy: 75
        },
        samplePrompts: [
          "Help me write an engaging blog post introduction",
          "Create social media captions for this campaign",
          "What\'s a catchy headline for this article?"
        ],
        features: ['Style Adaptation', 'SEO Optimization', 'Audience Targeting', 'Content Planning'],
        color: '#48BB78'
      },
      {
        id: 'storytelling',
        name: 'Storytelling',
        description: 'Narrative development and creative writing assistance',
        icon: 'BookOpen',
        settings: {
          formality: 30,
          detail: 80,
          creativity: 90,
          empathy: 85
        },
        samplePrompts: [
          "Help me develop this character\'s backstory",
          "What\'s an interesting plot twist for my story?",
          "How can I make this scene more engaging?"
        ],
        features: ['Character Development', 'Plot Structure', 'Dialogue Writing', 'World Building'],
        color: '#ED8936'
      }
    ],
    learning: [
      {
        id: 'study_buddy',
        name: 'Study Buddy',
        description: 'Patient learning companion for education and skill development',
        icon: 'GraduationCap',
        settings: {
          formality: 50,
          detail: 85,
          creativity: 60,
          empathy: 90
        },
        samplePrompts: [
          "Explain this concept in simple terms",
          "Quiz me on this topic",
          "Help me understand why this is important"
        ],
        features: ['Concept Explanation', 'Practice Questions', 'Progress Tracking', 'Learning Paths'],
        color: '#96C8B7'
      },
      {
        id: 'skill_development',
        name: 'Skill Development',
        description: 'Structured approach to learning new skills and competencies',
        icon: 'TrendingUp',
        settings: {
          formality: 60,
          detail: 90,
          creativity: 70,
          empathy: 80
        },
        samplePrompts: [
          "Create a learning plan for this skill",
          "What are the fundamentals I should master first?",
          "How can I practice this effectively?"
        ],
        features: ['Learning Roadmaps', 'Practice Exercises', 'Skill Assessment', 'Resource Recommendations'],
        color: '#F3D096'
      },
      {
        id: 'research_assistant',
        name: 'Research Assistant',
        description: 'Methodical research support and information synthesis',
        icon: 'Search',
        settings: {
          formality: 70,
          detail: 95,
          creativity: 45,
          empathy: 65
        },
        samplePrompts: [
          "Help me research this topic thoroughly",
          "What are the key sources I should examine?",
          "Summarize the main arguments in this field"
        ],
        features: ['Source Evaluation', 'Information Synthesis', 'Citation Help', 'Fact Checking'],
        color: '#C0C0C0'
      }
    ],
    personal: [
      {
        id: 'life_coach',
        name: 'Life Coach',
        description: 'Supportive guidance for personal growth and goal achievement',
        icon: 'Heart',
        settings: {
          formality: 35,
          detail: 75,
          creativity: 70,
          empathy: 95
        },
        samplePrompts: [
          "Help me set realistic goals for this year",
          "I'm feeling stuck in my career, what should I do?",
          "How can I build better habits?"
        ],
        features: ['Goal Setting', 'Habit Tracking', 'Motivation Support', 'Self-Reflection'],
        color: '#48BB78'
      },
      {
        id: 'wellness_guide',
        name: 'Wellness Guide',
        description: 'Mindful approach to mental health and well-being',
        icon: 'Leaf',
        settings: {
          formality: 25,
          detail: 70,
          creativity: 65,
          empathy: 100
        },
        samplePrompts: [
          "I'm feeling overwhelmed, can you help?",
          "What are some mindfulness exercises I can try?",
          "How can I manage stress better?"
        ],
        features: ['Mindfulness Exercises', 'Stress Management', 'Emotional Support', 'Self-Care Tips'],
        color: '#E53E3E'
      },
      {
        id: 'decision_helper',
        name: 'Decision Helper',
        description: 'Structured decision-making support for life choices',
        icon: 'GitBranch',
        settings: {
          formality: 55,
          detail: 85,
          creativity: 60,
          empathy: 85
        },
        samplePrompts: [
          "Help me weigh the pros and cons of this decision",
          "What factors should I consider?",
          "I'm torn between two options, what do you think?"
        ],
        features: ['Decision Frameworks', 'Pro/Con Analysis', 'Value Clarification', 'Option Evaluation'],
        color: '#ED8936'
      }
    ]
  };

  const categories = [
    { key: 'professional', label: 'Professional', icon: 'Briefcase', count: templates?.professional?.length },
    { key: 'creative', label: 'Creative', icon: 'Palette', count: templates?.creative?.length },
    { key: 'learning', label: 'Learning', icon: 'BookOpen', count: templates?.learning?.length },
    { key: 'personal', label: 'Personal', icon: 'User', count: templates?.personal?.length }
  ];

  const getPersonalityBar = (value, color) => (
    <div className="w-full bg-muted rounded-full h-1">
      <div 
        className="h-1 rounded-full transition-all duration-300"
        style={{ 
          width: `${value}%`,
          backgroundColor: color
        }}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Conversation Templates</h3>
        <p className="text-sm text-muted-foreground">
          Pre-configured AI personalities optimized for specific use cases
        </p>
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.key}
            onClick={() => setActiveCategory(category?.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category?.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
            <span className="text-xs bg-background/20 px-1.5 py-0.5 rounded-full">
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.[activeCategory]?.map((template) => (
          <div
            key={template?.id}
            className={`group bg-card border rounded-xl p-6 cursor-pointer transition-all duration-300 hover-lift ${
              selectedTemplate?.id === template?.id
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${template?.color}20` }}
              >
                <Icon 
                  name={template?.icon} 
                  size={24} 
                  style={{ color: template?.color }}
                />
              </div>
              
              {selectedTemplate?.id === template?.id && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce-gentle">
                  <Icon name="Check" size={14} className="text-primary-foreground" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground">{template?.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {template?.description}
                </p>
              </div>

              {/* Personality Settings Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Formality</span>
                  <span className="text-foreground font-medium">{template?.settings?.formality}%</span>
                </div>
                {getPersonalityBar(template?.settings?.formality, template?.color)}
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Creativity</span>
                  <span className="text-foreground font-medium">{template?.settings?.creativity}%</span>
                </div>
                {getPersonalityBar(template?.settings?.creativity, template?.color)}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {template?.features?.slice(0, 2)?.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                  >
                    {feature}
                  </span>
                ))}
                {template?.features?.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                    +{template?.features?.length - 2}
                  </span>
                )}
              </div>

              {/* Sample Prompts Preview */}
              {selectedTemplate?.id === template?.id && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg animate-fade-in">
                  <p className="text-xs text-muted-foreground mb-2">Sample Prompts:</p>
                  <div className="space-y-1">
                    {template?.samplePrompts?.slice(0, 2)?.map((prompt, index) => (
                      <p key={index} className="text-xs text-foreground">
                        "• {prompt}"
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Template Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {Object.values(templates)?.flat()?.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Templates</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">4</div>
          <div className="text-xs text-muted-foreground">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">∞</div>
          <div className="text-xs text-muted-foreground">Customizations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">100%</div>
          <div className="text-xs text-muted-foreground">Optimized</div>
        </div>
      </div>
    </div>
  );
};

export default ConversationTemplates;