import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalityTuner = ({ selectedAvatar, onPersonalityChange }) => {
  const [personalitySettings, setPersonalitySettings] = useState({
    creativity: 65,
    formality: 50,
    detail: 60,
    empathy: 75,
    responseLength: 'medium',
    humor: 40,
    patience: 80
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [sampleTopic, setSampleTopic] = useState('work_project');

  useEffect(() => {
    if (selectedAvatar) {
      setPersonalitySettings({
        ...personalitySettings,
        ...selectedAvatar?.personality,
        humor: selectedAvatar?.personality?.creativity * 0.6,
        patience: selectedAvatar?.personality?.empathy * 0.8
      });
    }
  }, [selectedAvatar]);

  const handleSliderChange = (trait, value) => {
    const newSettings = { ...personalitySettings, [trait]: value };
    setPersonalitySettings(newSettings);
    onPersonalityChange(newSettings);
  };

  const handleResponseLengthChange = (length) => {
    const newSettings = { ...personalitySettings, responseLength: length };
    setPersonalitySettings(newSettings);
    onPersonalityChange(newSettings);
  };

  const resetToDefaults = () => {
    if (selectedAvatar) {
      const defaultSettings = {
        ...selectedAvatar?.personality,
        responseLength: 'medium',
        humor: selectedAvatar?.personality?.creativity * 0.6,
        patience: selectedAvatar?.personality?.empathy * 0.8
      };
      setPersonalitySettings(defaultSettings);
      onPersonalityChange(defaultSettings);
    }
  };

  const getSliderColor = (value) => {
    if (value < 30) return 'bg-warning';
    if (value < 70) return 'bg-primary';
    return 'bg-success';
  };

  const getResponsePreview = () => {
    const topics = {
      work_project: {
        question: "How should I approach this complex work project?",
        responses: {
          low_creativity_high_formal: "I recommend following established project management protocols. Begin with stakeholder analysis, define clear deliverables, and establish milestone checkpoints.",
          high_creativity_low_formal: "Oh wow, this sounds exciting! Let's brainstorm some wild ideas first - what if we flipped the whole approach upside down? Sometimes the craziest ideas lead to breakthrough solutions!",
          balanced: "Great question! Let's combine structured planning with creative thinking. We could start by mapping out the core requirements, then explore some innovative approaches to make this project really stand out."
        }
      },
      creative_writing: {
        question: "I\'m stuck on my story\'s plot. Any ideas?",
        responses: {
          low_creativity_high_formal: "Consider reviewing established narrative structures such as the three-act format. Analyze similar works in your genre for plot development patterns.",
          high_creativity_low_formal: "Ooh, plot twists! What if your main character discovers they're actually the villain? Or maybe the whole story is happening in reverse? Let's get weird with it!",
          balanced: "Writer's block happens to everyone! Let's try a few techniques - maybe explore your character's biggest fear, or introduce an unexpected ally. What genre are you working in?"
        }
      },
      personal_advice: {
        question: "I'm feeling overwhelmed with life decisions.",
        responses: {
          low_creativity_high_formal: "Decision-making under stress requires systematic evaluation. I suggest creating a pros and cons matrix for each option and consulting with trusted advisors.",
          high_creativity_low_formal: "Hey, take a deep breath! Life's messy and that's totally okay. What if we made this fun? Let's imagine your future self giving you advice - what would they say?",
          balanced: "I hear you - big decisions can feel overwhelming. Let's break this down together. What's the most important value you want to honor in this decision?"
        }
      }
    };

    const topic = topics?.[sampleTopic];
    const { creativity, formality, empathy } = personalitySettings;
    
    let responseKey = 'balanced';
    if (creativity < 40 && formality > 70) responseKey = 'low_creativity_high_formal';
    else if (creativity > 70 && formality < 40) responseKey = 'high_creativity_low_formal';

    return {
      question: topic?.question,
      response: topic?.responses?.[responseKey]
    };
  };

  const sliderTraits = [
    {
      key: 'creativity',
      label: 'Creativity',
      icon: 'Lightbulb',
      description: 'How imaginative and innovative responses should be',
      lowLabel: 'Practical',
      highLabel: 'Innovative'
    },
    {
      key: 'formality',
      label: 'Formality',
      icon: 'Briefcase',
      description: 'Professional vs casual communication style',
      lowLabel: 'Casual',
      highLabel: 'Professional'
    },
    {
      key: 'detail',
      label: 'Detail Level',
      icon: 'Search',
      description: 'How comprehensive and thorough responses should be',
      lowLabel: 'Concise',
      highLabel: 'Detailed'
    },
    {
      key: 'empathy',
      label: 'Empathy',
      icon: 'Heart',
      description: 'Emotional understanding and supportiveness',
      lowLabel: 'Direct',
      highLabel: 'Supportive'
    },
    {
      key: 'humor',
      label: 'Humor',
      icon: 'Smile',
      description: 'Use of jokes, wit, and playful language',
      lowLabel: 'Serious',
      highLabel: 'Playful'
    },
    {
      key: 'patience',
      label: 'Patience',
      icon: 'Clock',
      description: 'Tolerance for repetition and learning pace',
      lowLabel: 'Efficient',
      highLabel: 'Patient'
    }
  ];

  const responseLengthOptions = [
    { key: 'brief', label: 'Brief', description: '1-2 sentences', icon: 'Minus' },
    { key: 'medium', label: 'Medium', description: '2-4 sentences', icon: 'Equal' },
    { key: 'detailed', label: 'Detailed', description: '4+ sentences', icon: 'Plus' }
  ];

  const sampleTopics = [
    { key: 'work_project', label: 'Work Project', icon: 'Briefcase' },
    { key: 'creative_writing', label: 'Creative Writing', icon: 'PenTool' },
    { key: 'personal_advice', label: 'Personal Advice', icon: 'Heart' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Personality Tuning</h3>
          <p className="text-sm text-muted-foreground">
            Fine-tune {selectedAvatar?.name || 'your AI'}'s personality traits
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={resetToDefaults}
          >
            Reset
          </Button>
          <Button
            variant={previewMode ? 'default' : 'outline'}
            size="sm"
            iconName="Eye"
            onClick={() => setPreviewMode(!previewMode)}
          >
            Preview
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personality Sliders */}
        <div className="space-y-6">
          <h4 className="font-medium text-foreground">Personality Traits</h4>
          
          {sliderTraits?.map((trait) => (
            <div key={trait?.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={trait?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{trait?.label}</span>
                </div>
                <span className="text-sm font-medium text-primary">
                  {personalitySettings?.[trait?.key]}%
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={personalitySettings?.[trait?.key]}
                  onChange={(e) => handleSliderChange(trait?.key, parseInt(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${personalitySettings?.[trait?.key]}%, var(--color-muted) ${personalitySettings?.[trait?.key]}%, var(--color-muted) 100%)`
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{trait?.lowLabel}</span>
                <span>{trait?.highLabel}</span>
              </div>
              
              <p className="text-xs text-muted-foreground">{trait?.description}</p>
            </div>
          ))}

          {/* Response Length */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h5 className="text-sm font-medium text-foreground">Response Length</h5>
            <div className="grid grid-cols-3 gap-2">
              {responseLengthOptions?.map((option) => (
                <button
                  key={option?.key}
                  onClick={() => handleResponseLengthChange(option?.key)}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                    personalitySettings?.responseLength === option?.key
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={16} className="mx-auto mb-1" />
                  <div className="text-xs font-medium">{option?.label}</div>
                  <div className="text-xs opacity-75">{option?.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Response Preview</h4>
            <div className="flex items-center space-x-1">
              {sampleTopics?.map((topic) => (
                <button
                  key={topic?.key}
                  onClick={() => setSampleTopic(topic?.key)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    sampleTopic === topic?.key
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  title={topic?.label}
                >
                  <Icon name={topic?.icon} size={14} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            {/* User Question */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{getResponsePreview()?.question}</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Bot" size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                  <p className="text-sm text-foreground">{getResponsePreview()?.response}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personality Summary */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h5 className="text-sm font-medium text-foreground">Current Personality Profile</h5>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Style:</span>
                <span className="text-foreground font-medium">
                  {personalitySettings?.formality > 70 ? 'Professional' : 
                   personalitySettings?.formality < 30 ? 'Casual' : 'Balanced'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Approach:</span>
                <span className="text-foreground font-medium">
                  {personalitySettings?.creativity > 70 ? 'Creative' : 
                   personalitySettings?.creativity < 30 ? 'Practical' : 'Adaptive'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Detail:</span>
                <span className="text-foreground font-medium">
                  {personalitySettings?.detail > 70 ? 'Comprehensive' : 
                   personalitySettings?.detail < 30 ? 'Concise' : 'Moderate'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tone:</span>
                <span className="text-foreground font-medium">
                  {personalitySettings?.empathy > 70 ? 'Supportive' : 
                   personalitySettings?.empathy < 30 ? 'Direct' : 'Balanced'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTuner;