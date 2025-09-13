import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoicePersonality = ({ selectedAvatar, personalitySettings }) => {
  const [selectedVoice, setSelectedVoice] = useState('natural');
  const [isPlaying, setIsPlaying] = useState(null);
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1.0,
    pitch: 1.0,
    tone: 'friendly',
    accent: 'neutral'
  });
  const audioRef = useRef(null);

  const voiceProfiles = [
    {
      id: 'natural',
      name: 'Natural',
      description: 'Warm and conversational, perfect for everyday interactions',
      gender: 'neutral',
      accent: 'neutral',
      personality: 'balanced',
      sampleText: "Hi there! I\'m excited to help you with whatever you need today. Let\'s explore some amazing possibilities together!",
      characteristics: ['Warm', 'Clear', 'Engaging', 'Professional'],
      matchScore: 95,
      color: '#96C8B7'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Confident and articulate, ideal for business and formal contexts',
      gender: 'neutral',
      accent: 'neutral',
      personality: 'formal',
      sampleText: "Good day. I\'m here to provide you with comprehensive assistance and detailed analysis for your professional needs.",
      characteristics: ['Authoritative', 'Clear', 'Precise', 'Confident'],
      matchScore: 88,
      color: '#C0C0C0'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Expressive and dynamic, great for brainstorming and artistic projects',
      gender: 'neutral',
      accent: 'neutral',
      personality: 'enthusiastic',
      sampleText: "Oh wow, this is going to be amazing! I can already see so many creative possibilities. Let's dive in and make something incredible!",
      characteristics: ['Expressive', 'Energetic', 'Inspiring', 'Dynamic'],
      matchScore: 92,
      color: '#F3D096'
    },
    {
      id: 'calm',
      name: 'Calm',
      description: 'Soothing and patient, perfect for learning and reflection',
      gender: 'neutral',
      accent: 'neutral',
      personality: 'gentle',
      sampleText: "Take your time. I\'m here to support you through this journey. Let\'s explore this topic together at a pace that feels comfortable for you.",
      characteristics: ['Soothing', 'Patient', 'Supportive', 'Gentle'],
      matchScore: 90,
      color: '#48BB78'
    },
    {
      id: 'energetic',
      name: 'Energetic',
      description: 'Upbeat and motivating, excellent for productivity and goal-setting',
      gender: 'neutral',
      accent: 'neutral',
      personality: 'motivational',
      sampleText: "Let's do this! I'm pumped to help you achieve your goals. We're going to make incredible progress together!",
      characteristics: ['Upbeat', 'Motivating', 'Positive', 'Dynamic'],
      matchScore: 85,
      color: '#E53E3E'
    },
    {
      id: 'wise',
      name: 'Wise',
      description: 'Thoughtful and insightful, ideal for deep conversations and advice',
      gender: 'neutral',
      accent: 'neutral',
      personality: 'thoughtful',
      sampleText: "That's a profound question. Let me share some insights that might help you see this from a different perspective.",
      characteristics: ['Thoughtful', 'Insightful', 'Measured', 'Deep'],
      matchScore: 87,
      color: '#ED8936'
    }
  ];

  const toneOptions = [
    { key: 'friendly', label: 'Friendly', icon: 'Smile' },
    { key: 'professional', label: 'Professional', icon: 'Briefcase' },
    { key: 'casual', label: 'Casual', icon: 'Coffee' },
    { key: 'enthusiastic', label: 'Enthusiastic', icon: 'Zap' }
  ];

  const accentOptions = [
    { key: 'neutral', label: 'Neutral', flag: '🌍' },
    { key: 'american', label: 'American', flag: '🇺🇸' },
    { key: 'british', label: 'British', flag: '🇬🇧' },
    { key: 'australian', label: 'Australian', flag: '🇦🇺' }
  ];

  const handleVoicePlay = (voiceId) => {
    if (isPlaying === voiceId) {
      setIsPlaying(null);
      // In a real app, this would stop the audio
      return;
    }
    
    setIsPlaying(voiceId);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(null);
    }, 3000);
  };

  const handleSettingChange = (setting, value) => {
    setVoiceSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getMatchScore = (voice) => {
    if (!personalitySettings) return voice?.matchScore;
    
    // Calculate match based on personality settings
    let score = 70;
    
    if (voice?.personality === 'formal' && personalitySettings?.formality > 70) score += 20;
    if (voice?.personality === 'enthusiastic' && personalitySettings?.creativity > 70) score += 15;
    if (voice?.personality === 'gentle' && personalitySettings?.empathy > 80) score += 25;
    if (voice?.personality === 'balanced') score += 10;
    
    return Math.min(100, score);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Voice Personality</h3>
        <p className="text-sm text-muted-foreground">
          Choose a voice that matches {selectedAvatar?.name || 'your AI'}'s personality
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voice Profiles */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-medium text-foreground">Voice Profiles</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voiceProfiles?.map((voice) => (
              <div
                key={voice?.id}
                className={`group bg-card border rounded-lg p-4 cursor-pointer transition-all duration-300 hover-lift ${
                  selectedVoice === voice?.id
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedVoice(voice?.id)}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${voice?.color}20` }}
                    >
                      <Icon 
                        name="Volume2" 
                        size={18} 
                        style={{ color: voice?.color }}
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{voice?.name}</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{voice?.personality}</span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Target" size={12} className="text-success" />
                          <span className="text-xs text-success font-medium">
                            {getMatchScore(voice)}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedVoice === voice?.id && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3">
                  {voice?.description}
                </p>

                {/* Characteristics */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {voice?.characteristics?.map((char) => (
                    <span
                      key={char}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {char}
                    </span>
                  ))}
                </div>

                {/* Sample Text & Play Button */}
                <div className="space-y-2">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-foreground italic">
                      "{voice?.sampleText}"
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName={isPlaying === voice?.id ? "Square" : "Play"}
                    iconPosition="left"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleVoicePlay(voice?.id);
                    }}
                    className={isPlaying === voice?.id ? 'animate-pulse' : ''}
                  >
                    {isPlaying === voice?.id ? 'Playing...' : 'Preview Voice'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Settings */}
        <div className="space-y-6">
          <h4 className="font-medium text-foreground">Voice Settings</h4>
          
          {/* Speed Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Speaking Speed</label>
              <span className="text-sm text-primary font-medium">{voiceSettings?.speed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={voiceSettings?.speed}
              onChange={(e) => handleSettingChange('speed', parseFloat(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Pitch Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Voice Pitch</label>
              <span className="text-sm text-primary font-medium">{voiceSettings?.pitch}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={voiceSettings?.pitch}
              onChange={(e) => handleSettingChange('pitch', parseFloat(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lower</span>
              <span>Higher</span>
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {toneOptions?.map((tone) => (
                <button
                  key={tone?.key}
                  onClick={() => handleSettingChange('tone', tone?.key)}
                  className={`p-2 rounded-lg border text-center transition-all duration-200 ${
                    voiceSettings?.tone === tone?.key
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tone?.icon} size={16} className="mx-auto mb-1" />
                  <div className="text-xs font-medium">{tone?.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Accent</label>
            <div className="space-y-2">
              {accentOptions?.map((accent) => (
                <button
                  key={accent?.key}
                  onClick={() => handleSettingChange('accent', accent?.key)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    voiceSettings?.accent === accent?.key
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-lg">{accent?.flag}</span>
                  <span className="text-sm font-medium">{accent?.label}</span>
                  {voiceSettings?.accent === accent?.key && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Test */}
          <div className="space-y-3 pt-4 border-t border-border">
            <label className="text-sm font-medium text-foreground">Test Your Settings</label>
            <Button
              variant="default"
              fullWidth
              iconName="Mic"
              iconPosition="left"
              onClick={() => handleVoicePlay('test')}
              className={`bg-accent hover:bg-accent/90 text-accent-foreground ${
                isPlaying === 'test' ? 'animate-pulse' : ''
              }`}
            >
              {isPlaying === 'test' ? 'Testing Voice...' : 'Test Voice Settings'}
            </Button>
          </div>

          {/* Voice Analytics */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h5 className="text-sm font-medium text-foreground">Voice Profile</h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selected Voice:</span>
                <span className="text-foreground font-medium">
                  {voiceProfiles?.find(v => v?.id === selectedVoice)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Personality Match:</span>
                <span className="text-success font-medium">
                  {getMatchScore(voiceProfiles?.find(v => v?.id === selectedVoice))}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed:</span>
                <span className="text-foreground font-medium">{voiceSettings?.speed}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tone:</span>
                <span className="text-foreground font-medium capitalize">{voiceSettings?.tone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicePersonality;