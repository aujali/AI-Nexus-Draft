import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const tutorialSteps = [
    {
      title: "Optimal Speaking Distance",
      icon: "Mic",
      content: `Position yourself 6-12 inches from your microphone for best results. This distance ensures clear audio capture while minimizing background noise interference.`,
      tips: [
        "Maintain consistent distance throughout conversation",
        "Avoid moving closer or farther during speech",
        "Use a headset microphone for hands-free experience"
      ],
      demo: "Try speaking at different distances to hear the difference"
    },
    {
      title: "Clear Pronunciation",
      icon: "Volume2",
      content: `Speak clearly and at a moderate pace. The AI processes speech better when words are well-articulated and not rushed.`,
      tips: [
        "Pronounce each word distinctly",
        "Avoid mumbling or speaking too quickly",
        "Take natural pauses between sentences"
      ],
      demo: "Practice saying: \'Navigate to the chat interface'"
    },
    {
      title: "Context Setting",
      icon: "MessageSquare",
      content: `Provide context at the beginning of your request. This helps the AI understand your intent and provide more accurate responses.`,
      tips: [
        "Start with action words: 'Show me', 'Navigate to', 'Create'",
        "Be specific about what you want to accomplish",
        "Use complete sentences rather than fragments"
      ],
      demo: "Good: \'Show me my conversation history from last week'"
    },
    {
      title: "Handling Interruptions",
      icon: "Pause",
      content: `Learn how to pause, resume, and correct voice interactions effectively. The AI can handle natural speech patterns including hesitations.`,
      tips: [
        "Say \'pause\' to temporarily stop listening",
        "Use \'cancel\' to abort current command",
        "Say \'repeat\' to hear the last response again"
      ],
      demo: "Try: \'Navigate to... pause... resume... chat interface'"
    },
    {
      title: "Multi-step Commands",
      icon: "List",
      content: `Break complex requests into clear, sequential steps. The AI can handle multi-part instructions when properly structured.`,
      tips: [
        "Use 'first', 'then', 'finally' for sequence",
        "Keep each step simple and actionable",
        "Allow processing time between complex commands"
      ],
      demo: "Example: 'First show capabilities, then navigate to voice settings'"
    },
    {
      title: "Error Recovery",
      icon: "RotateCcw",
      content: `When the AI misunderstands, use correction techniques to get back on track quickly and efficiently.`,
      tips: [
        "Say 'no, I meant...' to correct misunderstandings",
        "Rephrase using different words if not recognized",
        "Use \'start over\' to begin a new command"
      ],
      demo: "Practice: 'No, I meant show my personalization settings'"
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = () => {
    if (!completedSteps?.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const currentTutorial = tutorialSteps?.[currentStep];
  const isCompleted = completedSteps?.includes(currentStep);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Voice Interaction Tutorial</h3>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {currentStep + 1} of {tutorialSteps?.length}
          </div>
          <div className="w-16 bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps?.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Tutorial Content */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${isCompleted ? 'bg-success/10' : 'bg-primary/10'}`}>
            <Icon 
              name={isCompleted ? "CheckCircle" : currentTutorial?.icon} 
              size={24} 
              className={isCompleted ? 'text-success' : 'text-primary'} 
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {currentTutorial?.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {currentTutorial?.content}
              </p>
            </div>

            {/* Tips */}
            <div className="space-y-2">
              <h5 className="font-medium text-foreground">Key Tips:</h5>
              <ul className="space-y-1">
                {currentTutorial?.tips?.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="ArrowRight" size={14} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Demo */}
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Play" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Try This</span>
              </div>
              <p className="text-sm text-foreground italic">
                {currentTutorial?.demo}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          {!isCompleted && (
            <Button
              variant="success"
              iconName="Check"
              iconPosition="left"
              onClick={markStepComplete}
            >
              Mark Complete
            </Button>
          )}
          
          <Button
            variant="default"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={nextStep}
            disabled={currentStep === tutorialSteps?.length - 1}
          >
            {currentStep === tutorialSteps?.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {tutorialSteps?.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              index === currentStep
                ? 'border-primary bg-primary/10'
                : completedSteps?.includes(index)
                ? 'border-success bg-success/10' :'border-border bg-card hover:border-muted-foreground/30'
            }`}
          >
            <Icon 
              name={completedSteps?.includes(index) ? "CheckCircle" : step?.icon} 
              size={20} 
              className={`mx-auto mb-1 ${
                index === currentStep
                  ? 'text-primary'
                  : completedSteps?.includes(index)
                  ? 'text-success' :'text-muted-foreground'
              }`}
            />
            <div className="text-xs text-center text-muted-foreground">
              Step {index + 1}
            </div>
          </button>
        ))}
      </div>
      {/* Completion Status */}
      {completedSteps?.length === tutorialSteps?.length && (
        <div className="p-4 bg-success/10 rounded-lg border border-success/20 animate-fade-in">
          <div className="flex items-center space-x-3">
            <Icon name="Trophy" size={24} className="text-success" />
            <div>
              <h4 className="font-semibold text-success">Tutorial Complete!</h4>
              <p className="text-sm text-success/80">
                You've mastered voice interaction techniques. Ready to experience AI Nexus with voice!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceTutorial;