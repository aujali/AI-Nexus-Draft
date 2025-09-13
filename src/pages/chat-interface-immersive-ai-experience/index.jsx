import React, { useState, useEffect, useRef } from 'react';


import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAvatar from './components/AIAvatar';
import MessageBubble from './components/MessageBubble';
import ContextualSidebar from './components/ContextualSidebar';
import VoiceControls from './components/VoiceControls';
import ConversationThreads from './components/ConversationThreads';
import SmartSuggestions from './components/SmartSuggestions';
import MessageInput from './components/MessageInput';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isContextualSidebarVisible, setIsContextualSidebarVisible] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(true);
  const [currentTopic, setCurrentTopic] = useState('General Conversation');
  const [conversationTone, setConversationTone] = useState('neutral');
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock conversation threads
  useEffect(() => {
    const mockThreads = [
      {
        id: 1,
        topic: "Code Review Discussion",
        lastMessage: "Let me analyze this React component...",
        lastActivity: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        messageCount: 15,
        isActive: true
      },
      {
        id: 2,
        topic: "Business Strategy Planning",
        lastMessage: "The market analysis shows promising trends...",
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        messageCount: 8,
        isActive: false
      },
      {
        id: 3,
        topic: "Creative Writing Ideas",
        lastMessage: "Here are some plot twists you could consider...",
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        messageCount: 23,
        isActive: false
      }
    ];
    setThreads(mockThreads);
    setActiveThreadId(mockThreads?.[0]?.id);
  }, []);

  // Mock initial messages
  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        text: "Hello! I\'m your AI assistant. I\'m here to help you with anything you need - from coding and analysis to creative projects and problem-solving. What would you like to explore today?",
        isUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        tone: 'friendly'
      }
    ];
    setMessages(initialMessages);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: Date.now(),
      text: messageData?.text,
      isUser: true,
      timestamp: new Date(),
      attachments: messageData?.attachments || []
    };

    setMessages(prev => [...prev, userMessage]);
    setIsAITyping(true);
    setShowSmartSuggestions(false);

    // Analyze message for topic and tone
    analyzeMessage(messageData?.text);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageData?.text);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse?.text,
        isUser: false,
        timestamp: new Date(),
        tone: aiResponse?.tone
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
      setShowSmartSuggestions(true);
      setConversationTone(aiResponse?.tone);
    }, 2000 + Math.random() * 2000);
  };

  const analyzeMessage = (text) => {
    if (text?.toLowerCase()?.includes('code') || text?.toLowerCase()?.includes('programming')) {
      setCurrentTopic('Code Development');
    } else if (text?.toLowerCase()?.includes('business') || text?.toLowerCase()?.includes('strategy')) {
      setCurrentTopic('Business Strategy');
    } else if (text?.toLowerCase()?.includes('creative') || text?.toLowerCase()?.includes('writing')) {
      setCurrentTopic('Creative Writing');
    } else if (text?.toLowerCase()?.includes('data') || text?.toLowerCase()?.includes('analysis')) {
      setCurrentTopic('Data Analysis');
    } else {
      setCurrentTopic('General Conversation');
    }
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      code: {
        text: `I'd be happy to help you with that code! Let me break this down for you:\n\n1. **Structure Analysis**: The code structure looks good, but there are a few optimization opportunities.\n2. **Best Practices**: Consider implementing error handling and adding proper TypeScript types.\n3. **Performance**: We could optimize this with memoization and lazy loading.\n\nWould you like me to show you a refactored version with these improvements?`,
        tone: 'analytical'
      },
      business: {
        text: `That's an excellent strategic question! Let me provide you with a comprehensive analysis:\n\n**Market Opportunity**: The current market conditions are favorable for this approach.\n**Risk Assessment**: There are some considerations we should address:\n• Competitive landscape analysis\n• Resource allocation requirements\n• Timeline and milestone planning\n\nI can help you develop a detailed implementation roadmap. What specific aspect would you like to dive deeper into?`,
        tone: 'professional'
      },
      creative: {
        text: `What a fascinating creative direction! I love where your imagination is taking this. Here are some ideas to expand on your concept:\n\n✨ **Character Development**: Your protagonist could have a hidden backstory that connects to...\n🎭 **Plot Twists**: Consider introducing an unexpected element that challenges...\n🌟 **Emotional Arc**: The journey could explore themes of transformation and discovery...\n\nShall we brainstorm some specific scenes or dialogue that could bring this vision to life?`,
        tone: 'positive'
      },
      default: {
        text: `I understand what you're looking for! Let me provide you with a thoughtful response that addresses your question comprehensively.\n\nBased on what you've shared, here are some key insights and recommendations:\n\n• **Primary Consideration**: This approach has several advantages that align with your goals\n• **Alternative Perspectives**: There are also some different angles we could explore\n• **Next Steps**: I'd suggest we focus on the most impactful areas first\n\nWhat specific aspect would you like to explore further? I'm here to dive as deep as you'd like on any of these points.`,tone: 'neutral'
      }
    };

    const messageType = userMessage?.toLowerCase()?.includes('code') ? 'code' :
                       userMessage?.toLowerCase()?.includes('business') ? 'business' :
                       userMessage?.toLowerCase()?.includes('creative') ? 'creative' : 'default';

    return responses?.[messageType];
  };

  const handleVoiceMessage = (transcript) => {
    handleSendMessage({ text: transcript, attachments: [] });
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion) {
      handleSendMessage({ text: suggestion, attachments: [] });
    } else {
      setShowSmartSuggestions(false);
    }
  };

  const handleCopyMessage = (message) => {
    navigator.clipboard?.writeText(message);
    // Could add toast notification here
  };

  const handleShareMessage = (message) => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Conversation',
        text: message
      });
    }
  };

  const handleRegenerateMessage = (message) => {
    setIsAITyping(true);
    setTimeout(() => {
      const newResponse = generateAIResponse(message);
      const aiMessage = {
        id: Date.now(),
        text: newResponse?.text,
        isUser: false,
        timestamp: new Date(),
        tone: newResponse?.tone
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1500);
  };

  const handleNewThread = () => {
    const newThread = {
      id: Date.now(),
      topic: "New Conversation",
      lastMessage: "Starting new conversation...",
      lastActivity: new Date(),
      messageCount: 0,
      isActive: true
    };
    setThreads(prev => [...prev, newThread]);
    setActiveThreadId(newThread?.id);
    setMessages([]);
    setCurrentTopic('General Conversation');
  };

  const handleThreadSelect = (threadId) => {
    setActiveThreadId(threadId);
    // In a real app, you'd load the messages for this thread
    setMessages([
      {
        id: 1,
        text: "Continuing our previous conversation...",
        isUser: false,
        timestamp: new Date(),
        tone: 'neutral'
      }
    ]);
  };

  const handleDeleteThread = (threadId) => {
    setThreads(prev => prev?.filter(t => t?.id !== threadId));
    if (activeThreadId === threadId && threads?.length > 1) {
      const remainingThreads = threads?.filter(t => t?.id !== threadId);
      setActiveThreadId(remainingThreads?.[0]?.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      {/* Main Chat Interface */}
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } ${isContextualSidebarVisible ? 'mr-80' : 'mr-0'} pt-16`}>
        
        {/* Chat Header */}
        <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <AIAvatar 
                isTyping={isAITyping}
                conversationTone={conversationTone}
                messageCount={messages?.length}
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Nexus Chat</h1>
                <p className="text-sm text-muted-foreground">
                  {currentTopic} • {messages?.length} messages
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="History"
                iconPosition="left"
                onClick={() => {}}
              >
                History
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                onClick={() => setIsContextualSidebarVisible(!isContextualSidebarVisible)}
              />
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Left Panel - Conversation Threads */}
          <div className="w-80 border-r border-border bg-card/50 p-4 overflow-y-auto">
            <ConversationThreads
              threads={threads}
              activeThreadId={activeThreadId}
              onThreadSelect={handleThreadSelect}
              onNewThread={handleNewThread}
              onDeleteThread={handleDeleteThread}
            />

            {/* Voice Controls */}
            <div className="mt-6">
              <VoiceControls
                onVoiceMessage={handleVoiceMessage}
                isListening={isVoiceListening}
                onToggleListening={() => setIsVoiceListening(!isVoiceListening)}
              />
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col relative">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages?.map((message) => (
                <MessageBubble
                  key={message?.id}
                  message={message?.text}
                  isUser={message?.isUser}
                  timestamp={message?.timestamp}
                  onCopy={handleCopyMessage}
                  onShare={handleShareMessage}
                  onRegenerate={handleRegenerateMessage}
                />
              ))}
              
              {/* AI Typing Indicator */}
              {isAITyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-soft">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Smart Suggestions */}
            <SmartSuggestions
              conversationContext={currentTopic}
              onSuggestionClick={handleSuggestionClick}
              isVisible={showSmartSuggestions && !isAITyping && messages?.length > 1}
            />

            {/* Message Input */}
            <div className="p-6 border-t border-border bg-background/95 backdrop-blur-sm">
              <MessageInput
                onSendMessage={handleSendMessage}
                isAITyping={isAITyping}
                placeholder="Ask me anything... I'm here to help!"
              />
            </div>
          </div>
        </div>
      </main>
      {/* Contextual Sidebar */}
      <ContextualSidebar
        currentTopic={currentTopic}
        conversationContext={messages?.map(m => m?.text)?.join(' ')}
        isVisible={isContextualSidebarVisible}
        onClose={() => setIsContextualSidebarVisible(false)}
      />
    </div>
  );
};

export default ChatInterface;