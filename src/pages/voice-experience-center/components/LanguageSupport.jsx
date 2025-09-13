import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const LanguageSupport = ({ selectedLanguage, onLanguageChange }) => {
  const [accentAdaptation, setAccentAdaptation] = useState(true);
  const [speechRate, setSpeechRate] = useState(1.0);

  const languages = [
    { value: 'en-US', label: 'English (US)', flag: '🇺🇸', accuracy: 98 },
    { value: 'en-GB', label: 'English (UK)', flag: '🇬🇧', accuracy: 97 },
    { value: 'es-ES', label: 'Spanish (Spain)', flag: '🇪🇸', accuracy: 95 },
    { value: 'es-MX', label: 'Spanish (Mexico)', flag: '🇲🇽', accuracy: 94 },
    { value: 'fr-FR', label: 'French (France)', flag: '🇫🇷', accuracy: 93 },
    { value: 'de-DE', label: 'German (Germany)', flag: '🇩🇪', accuracy: 92 },
    { value: 'it-IT', label: 'Italian (Italy)', flag: '🇮🇹', accuracy: 91 },
    { value: 'pt-BR', label: 'Portuguese (Brazil)', flag: '🇧🇷', accuracy: 90 },
    { value: 'ja-JP', label: 'Japanese (Japan)', flag: '🇯🇵', accuracy: 89 },
    { value: 'ko-KR', label: 'Korean (South Korea)', flag: '🇰🇷', accuracy: 88 },
    { value: 'zh-CN', label: 'Chinese (Simplified)', flag: '🇨🇳', accuracy: 87 },
    { value: 'hi-IN', label: 'Hindi (India)', flag: '🇮🇳', accuracy: 85 }
  ];

  const accents = [
    { region: 'North American', variants: ['General American', 'Canadian', 'Southern US'] },
    { region: 'British Isles', variants: ['Received Pronunciation', 'Scottish', 'Irish'] },
    { region: 'Australian/NZ', variants: ['Australian', 'New Zealand'] },
    { region: 'International', variants: ['Indian English', 'South African'] }
  ];

  const currentLanguage = languages?.find(lang => lang?.value === selectedLanguage);

  const handleSpeechRateChange = (rate) => {
    setSpeechRate(rate);
  };

  const testPronunciation = () => {
    // Mock pronunciation test
    const testPhrases = [
      "The quick brown fox jumps over the lazy dog",
      "How much wood would a woodchuck chuck if a woodchuck could chuck wood",
      "She sells seashells by the seashore",
      "Peter Piper picked a peck of pickled peppers"
    ];
    
    const randomPhrase = testPhrases?.[Math.floor(Math.random() * testPhrases?.length)];
    return randomPhrase;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Language & Accent Support</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{currentLanguage?.flag}</span>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{currentLanguage?.label}</div>
            <div className="text-xs text-success">{currentLanguage?.accuracy}% accuracy</div>
          </div>
        </div>
      </div>
      {/* Language Selection */}
      <div className="space-y-4">
        <Select
          label="Primary Language"
          description="Choose your preferred language for voice interaction"
          options={languages?.map(lang => ({
            value: lang?.value,
            label: `${lang?.flag} ${lang?.label}`,
            description: `${lang?.accuracy}% recognition accuracy`
          }))}
          value={selectedLanguage}
          onChange={onLanguageChange}
          searchable
          className="w-full"
        />

        {/* Language Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-card rounded-lg border border-border text-center">
            <div className="text-2xl font-bold text-primary">{currentLanguage?.accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="p-3 bg-card rounded-lg border border-border text-center">
            <div className="text-2xl font-bold text-secondary">12</div>
            <div className="text-xs text-muted-foreground">Languages</div>
          </div>
          <div className="p-3 bg-card rounded-lg border border-border text-center">
            <div className="text-2xl font-bold text-accent">45+</div>
            <div className="text-xs text-muted-foreground">Accents</div>
          </div>
          <div className="p-3 bg-card rounded-lg border border-border text-center">
            <div className="text-2xl font-bold text-success">24/7</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
        </div>
      </div>
      {/* Accent Adaptation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Accent Adaptation</h4>
            <p className="text-sm text-muted-foreground">AI learns and adapts to your speaking patterns</p>
          </div>
          <button
            onClick={() => setAccentAdaptation(!accentAdaptation)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              accentAdaptation ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                accentAdaptation ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {accentAdaptation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {accents?.map((accent, index) => (
              <div key={index} className="p-4 bg-card rounded-lg border border-border">
                <h5 className="font-medium text-foreground mb-2">{accent?.region}</h5>
                <div className="space-y-1">
                  {accent?.variants?.map((variant, vIndex) => (
                    <div key={vIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{variant}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Speech Rate Control */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground mb-2">Speech Rate Optimization</h4>
          <p className="text-sm text-muted-foreground">Adjust AI response speed to match your preference</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Slow</span>
            <span className="text-sm font-medium text-foreground">{speechRate?.toFixed(1)}x</span>
            <span className="text-sm text-muted-foreground">Fast</span>
          </div>
          
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={speechRate}
            onChange={(e) => handleSpeechRateChange(parseFloat(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5x</span>
            <span>1.0x</span>
            <span>1.5x</span>
            <span>2.0x</span>
          </div>
        </div>
      </div>
      {/* Pronunciation Test */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Pronunciation Test</h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={testPronunciation}
          >
            Test
          </Button>
        </div>
        
        <div className="p-3 bg-card rounded border border-border">
          <p className="text-sm text-foreground italic">
            "{testPronunciation()}"
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <Icon name="Info" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Speak this phrase to test pronunciation accuracy
          </span>
        </div>
      </div>
    </div>
  );
};

export default LanguageSupport;