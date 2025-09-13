import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VoiceVisualization from './components/VoiceVisualization';
import VoicePersonalitySelector from './components/VoicePersonalitySelector';
import VoiceTestingEnvironment from './components/VoiceTestingEnvironment';
import VoiceCommandDemo from './components/VoiceCommandDemo';
import LanguageSupport from './components/LanguageSupport';
import VoiceTutorial from './components/VoiceTutorial';

const VoiceExperienceCenter = () => {
  const [isListening, setIsListening] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [selectedPersonality, setSelectedPersonality] = useState('professional');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [activeTab, setActiveTab] = useState('demo');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Mock audio level simulation
  useEffect(() => {
    let interval;
    if (isListening || isAISpeaking) {
      interval = setInterval(() => {
        setVolume(Math.random() * 0.8 + 0.2);
      }, 100);
    } else {
      setVolume(0);
    }
    return () => clearInterval(interval);
  }, [isListening, isAISpeaking]);

  const handleStartListening = () => {
    setIsListening(true);
    setIsAISpeaking(false);
  };

  const handleStopListening = () => {
    setIsListening(false);
    // Simulate AI response
    setTimeout(() => {
      setIsAISpeaking(true);
      setTimeout(() => setIsAISpeaking(false), 3000);
    }, 1000);
  };

  const handlePersonalityChange = (personality) => {
    setSelectedPersonality(personality);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleEnvironmentChange = (environment) => {
    console.log('Environment changed:', environment);
  };

  const tabs = [
    { id: 'demo', label: 'Voice Demo', icon: 'Mic' },
    { id: 'commands', label: 'Commands', icon: 'Terminal' },
    { id: 'personality', label: 'Personality', icon: 'User' },
    { id: 'language', label: 'Languages', icon: 'Globe' },
    { id: 'environment', label: 'Testing', icon: 'Settings' },
    { id: 'tutorial', label: 'Tutorial', icon: 'BookOpen' }
  ];

  const features = [
    {
      icon: 'Mic',
      title: 'Real-time Recognition',
      description: 'Advanced speech-to-text with 98% accuracy across multiple languages and accents'
    },
    {
      icon: 'Volume2',
      title: 'Natural Voice Synthesis',
      description: 'Human-like AI responses with emotional intelligence and personality adaptation'
    },
    {
      icon: 'Shield',
      title: 'Noise Cancellation',
      description: 'Intelligent background noise filtering for clear communication in any environment'
    },
    {
      icon: 'Zap',
      title: 'Instant Processing',
      description: 'Lightning-fast voice command execution with sub-second response times'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Voice Experience Center - AI Nexus</title>
        <meta name="description" content="Explore advanced voice capabilities with real-time audio visualization, multi-language support, and intelligent noise cancellation." />
      </Helmet>
      <div className="min-h-screen bg-background pt-16">
        {/* Hero Section */}
        <section className="relative py-16 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                <Icon name="Mic" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Voice-First AI Experience</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                Voice Experience
                <span className="block text-primary">Center</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover the future of AI interaction through advanced voice technology. Experience real-time audio visualization, 
                intelligent noise cancellation, and natural conversation with AI personalities.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => setVoiceEnabled(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift px-8"
                >
                  Start Voice Experience
                </Button>
                <Link to="/chat-interface-immersive-ai-experience">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="hover-lift px-8"
                  >
                    Try Text Chat
                  </Button>
                </Link>
              </div>
            </div>

            {/* Voice Visualization */}
            <div className="max-w-4xl mx-auto mb-12">
              <VoiceVisualization 
                isListening={isListening}
                isAISpeaking={isAISpeaking}
                volume={volume}
              />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features?.map((feature, index) => (
                <div key={index} className="p-6 bg-card rounded-xl border border-border hover-lift">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Icon name={feature?.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Experience */}
        <section className="py-16 px-4 lg:px-6 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Interactive Voice Lab
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore different aspects of voice interaction technology through hands-on demonstrations and customization options.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
              {activeTab === 'demo' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Voice Interaction Demo</h3>
                    <p className="text-muted-foreground mb-8">
                      Experience real-time voice interaction with AI Nexus. Click the microphone to start speaking.
                    </p>
                  </div>
                  
                  <VoiceVisualization 
                    isListening={isListening}
                    isAISpeaking={isAISpeaking}
                    volume={volume}
                  />
                  
                  <div className="text-center space-y-4">
                    <Button
                      variant={isListening ? "destructive" : "default"}
                      size="lg"
                      iconName={isListening ? "MicOff" : "Mic"}
                      iconPosition="left"
                      onClick={isListening ? handleStopListening : handleStartListening}
                      className={`px-8 py-4 ${isListening ? 'animate-pulse' : 'hover-lift'}`}
                    >
                      {isListening ? 'Stop Listening' : 'Start Voice Demo'}
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      {isListening && "Listening for your voice command..."}
                      {isAISpeaking && "AI is responding to your request..."}
                      {!isListening && !isAISpeaking && "Click to begin voice interaction"}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'commands' && (
                <VoiceCommandDemo
                  isListening={isListening}
                  onStartListening={handleStartListening}
                  onStopListening={handleStopListening}
                />
              )}

              {activeTab === 'personality' && (
                <VoicePersonalitySelector
                  selectedPersonality={selectedPersonality}
                  onPersonalityChange={handlePersonalityChange}
                />
              )}

              {activeTab === 'language' && (
                <LanguageSupport
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                />
              )}

              {activeTab === 'environment' && (
                <VoiceTestingEnvironment
                  onEnvironmentChange={handleEnvironmentChange}
                />
              )}

              {activeTab === 'tutorial' && (
                <VoiceTutorial />
              )}
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="py-16 px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 bg-card rounded-2xl border border-border">
              <div className="p-4 bg-success/10 rounded-full w-fit mx-auto mb-6">
                <Icon name="Shield" size={32} className="text-success" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">Privacy-First Voice Technology</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your voice data is processed with enterprise-grade security. All audio is encrypted in transit, 
                processed locally when possible, and never stored without your explicit consent. Our AI learns 
                from interactions while maintaining complete privacy protection.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 justify-center">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span className="text-muted-foreground">End-to-End Encryption</span>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                  <Icon name="Server" size={16} className="text-success" />
                  <span className="text-muted-foreground">Local Processing</span>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                  <Icon name="UserCheck" size={16} className="text-success" />
                  <span className="text-muted-foreground">User Consent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 lg:px-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Experience Voice AI?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered the future of AI interaction. 
              Start your voice-powered conversation today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat-interface-immersive-ai-experience">
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift px-8"
                >
                  Start Voice Chat
                </Button>
              </Link>
              <Link to="/personalization-hub-ai-avatar-customization">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Settings"
                  iconPosition="left"
                  className="hover-lift px-8"
                >
                  Customize Experience
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VoiceExperienceCenter;