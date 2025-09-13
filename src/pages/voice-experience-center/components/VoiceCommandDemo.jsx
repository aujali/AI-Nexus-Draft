import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceCommandDemo = ({ isListening, onStartListening, onStopListening }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [commandHistory, setCommandHistory] = useState([
    { command: "Navigate to chat interface", response: "Opening chat interface...", timestamp: new Date(Date.now() - 300000) },
    { command: "Show my conversation history", response: "Displaying conversation history dashboard", timestamp: new Date(Date.now() - 180000) },
    { command: "Change voice personality to creative", response: "Voice personality updated to Creative mode", timestamp: new Date(Date.now() - 60000) }
  ]);

  const voiceCommands = [
    {
      category: 'Navigation',
      commands: [
        { phrase: "Go to homepage", description: "Navigate to main dashboard" },
        { phrase: "Open chat interface", description: "Start new conversation" },
        { phrase: "Show capabilities", description: "View AI features" },
        { phrase: "Open voice center", description: "Access voice settings" }
      ]
    },
    {
      category: 'Voice Control',
      commands: [
        { phrase: "Start listening", description: "Activate voice input" },
        { phrase: "Stop listening", description: "Deactivate voice input" },
        { phrase: "Change personality", description: "Switch voice personality" },
        { phrase: "Adjust volume", description: "Modify audio settings" }
      ]
    },
    {
      category: 'Conversation',
      commands: [
        { phrase: "New conversation", description: "Start fresh chat session" },
        { phrase: "Save conversation", description: "Store current chat" },
        { phrase: "Export chat", description: "Download conversation" },
        { phrase: "Clear history", description: "Remove chat records" }
      ]
    }
  ];

  const handleVoiceCommand = () => {
    if (isListening) {
      onStopListening();
      // Simulate command recognition
      setTimeout(() => {
        const mockCommands = [
          "Navigate to personalization hub",
          "Show AI capabilities showcase",
          "Start new voice conversation",
          "Change to analytical personality"
        ];
        const randomCommand = mockCommands?.[Math.floor(Math.random() * mockCommands?.length)];
        setRecognizedText(randomCommand);
        
        // Add to history
        const newCommand = {
          command: randomCommand,
          response: `Executing: ${randomCommand}`,
          timestamp: new Date()
        };
        setCommandHistory(prev => [newCommand, ...prev?.slice(0, 4)]);
      }, 1500);
    } else {
      setRecognizedText('');
      onStartListening();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Voice Commands</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
          <span className="text-sm text-muted-foreground">
            {isListening ? 'Listening...' : 'Ready'}
          </span>
        </div>
      </div>
      {/* Voice Input Area */}
      <div className="p-6 bg-card rounded-xl border border-border">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="lg"
              iconName={isListening ? "MicOff" : "Mic"}
              iconPosition="left"
              onClick={handleVoiceCommand}
              className={`px-8 py-4 ${isListening ? 'animate-pulse' : 'hover-lift'}`}
            >
              {isListening ? 'Stop Listening' : 'Start Voice Command'}
            </Button>
            
            {isListening && (
              <div className="absolute -inset-2 border-2 border-accent rounded-lg animate-ping opacity-75"></div>
            )}
          </div>

          {recognizedText && (
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 animate-fade-in">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Volume2" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Recognized Command</span>
              </div>
              <p className="text-foreground font-medium">"{recognizedText}"</p>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Try saying commands like "Navigate to chat interface" or "Show capabilities"
          </p>
        </div>
      </div>
      {/* Command Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {voiceCommands?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="List" size={16} className="text-secondary" />
              <span>{category?.category}</span>
            </h4>
            
            <div className="space-y-2">
              {category?.commands?.map((cmd, cmdIndex) => (
                <div
                  key={cmdIndex}
                  className="p-3 bg-card rounded-lg border border-border hover:border-muted-foreground/30 transition-colors duration-200 cursor-pointer group"
                  onClick={() => setRecognizedText(cmd?.phrase)}
                >
                  <div className="flex items-start space-x-2">
                    <Icon name="Quote" size={14} className="text-muted-foreground mt-0.5 group-hover:text-foreground transition-colors" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {cmd?.phrase}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cmd?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Recent Commands */}
      {commandHistory?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="History" size={16} className="text-secondary" />
            <span>Recent Commands</span>
          </h4>
          
          <div className="space-y-2">
            {commandHistory?.map((item, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">"{item?.command}"</p>
                    <p className="text-xs text-success mt-1">{item?.response}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item?.timestamp?.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceCommandDemo;