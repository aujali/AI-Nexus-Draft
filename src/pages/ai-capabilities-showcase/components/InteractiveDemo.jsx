import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractiveDemo = ({ capability, onClose }) => {
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [metrics, setMetrics] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!userInput?.trim()) return;

    setIsProcessing(true);
    setResponse('');
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResponse = generateMockResponse(capability?.type, userInput);
      setResponse(mockResponse?.text);
      setMetrics(mockResponse?.metrics);
      setIsProcessing(false);
    }, 2000 + Math.random() * 1000);
  };

  const generateMockResponse = (type, input) => {
    const responses = {
      creative: {
        text: `Here's a creative response to "${input}":\n\nImagine a world where every word you speak becomes a brushstroke on the canvas of reality. Your idea transforms into a vivid narrative that weaves together elements of mystery, wonder, and human connection. The story unfolds with characters who embody the essence of your original thought, creating a tapestry of meaning that resonates with universal themes while maintaining its unique voice.`,
        metrics: { accuracy: 94, creativity: 98, coherence: 92, responseTime: '1.8s' }
      },
      analytical: {
        text: `Analysis of "${input}":\n\n1. Core Components: Breaking down the key elements reveals three primary factors that influence the outcome.\n\n2. Data Patterns: Historical trends suggest a 73% correlation with similar scenarios.\n\n3. Logical Framework: The reasoning follows a structured approach that considers multiple variables and their interdependencies.\n\n4. Conclusion: Based on the analysis, the most probable outcome aligns with established patterns while accounting for unique contextual factors.`,
        metrics: { accuracy: 96, logic: 94, depth: 89, responseTime: '2.1s' }
      },
      problem: {
        text: `Solution approach for "${input}":\n\nStep 1: Problem Definition\n- Identify core challenges and constraints\n- Map stakeholder requirements\n\nStep 2: Solution Framework\n- Generate multiple solution pathways\n- Evaluate feasibility and impact\n\nStep 3: Implementation Strategy\n- Prioritize quick wins and long-term goals\n- Create actionable timeline\n\nStep 4: Risk Mitigation\n- Anticipate potential obstacles\n- Develop contingency plans\n\nThis systematic approach ensures comprehensive problem resolution while maintaining flexibility for adaptation.`,
        metrics: { effectiveness: 91, practicality: 88, innovation: 85, responseTime: '1.9s' }
      },
      learning: {
        text: `Learning guide for "${input}":\n\n🎯 Learning Objectives:\n- Master fundamental concepts\n- Apply knowledge practically\n- Develop critical thinking skills\n\n📚 Structured Approach:\n1. Foundation Building (Week 1-2)\n2. Practical Application (Week 3-4)\n3. Advanced Concepts (Week 5-6)\n4. Project Implementation (Week 7-8)\n\n💡 Key Resources:\n- Interactive exercises\n- Real-world case studies\n- Community discussions\n- Progress assessments\n\nThis personalized learning path adapts to your pace and learning style for optimal knowledge retention.`,
        metrics: { clarity: 93, engagement: 90, comprehensiveness: 87, responseTime: '2.0s' }
      },
      voice: {
        text: `Voice interaction processed for "${input}":\n\n🎤 Speech Recognition Results:\n- Accuracy: 97.3%\n- Confidence Score: High\n- Processing Time: 0.8 seconds\n\n🗣️ Natural Language Understanding:\n- Intent Recognition: Successful\n- Entity Extraction: Complete\n- Context Awareness: Maintained\n\n🔊 Response Generation:\n- Tone Matching: Conversational\n- Emotional Intelligence: Engaged\n- Clarity Optimization: Applied\n\nThe voice AI demonstrates sophisticated understanding of nuanced speech patterns and responds with human-like naturalness.`,
        metrics: { recognition: 97, understanding: 95, naturalness: 92, responseTime: '0.8s' }
      }
    };

    return responses?.[type] || responses?.creative;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name={capability?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{capability?.title}</h2>
              <p className="text-sm text-muted-foreground">Interactive Demo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Input Section */}
          <form onSubmit={handleSubmit} className="mb-6">
            <Input
              label="Your Input"
              placeholder={`Try asking something related to ${capability?.title?.toLowerCase()}...`}
              value={userInput}
              onChange={(e) => setUserInput(e?.target?.value)}
              description="Enter your prompt to see AI Nexus in action"
              className="mb-4"
            />
            <Button
              type="submit"
              variant="default"
              loading={isProcessing}
              iconName="Send"
              iconPosition="left"
              disabled={!userInput?.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isProcessing ? 'Processing...' : 'Generate Response'}
            </Button>
          </form>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="bg-background/50 rounded-lg p-6 mb-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-sm text-muted-foreground">AI is thinking...</p>
            </div>
          )}

          {/* Response Section */}
          {response && (
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Bot" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">AI Response</span>
                </div>
                <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                  {response}
                </div>
              </div>

              {/* Metrics */}
              {metrics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(metrics)?.map(([key, value]) => (
                    <div key={key} className="bg-card rounded-lg p-3 text-center border">
                      <div className="text-lg font-bold text-foreground">
                        {typeof value === 'number' ? `${value}%` : value}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Ready to explore more?</h4>
                    <p className="text-sm text-muted-foreground">Start a full conversation with AI Nexus</p>
                  </div>
                  <Button
                    variant="default"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;