import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ConversationCard from './components/ConversationCard';
import SearchFilters from './components/SearchFilters';
import TimelineView from './components/TimelineView';
import StatsOverview from './components/StatsOverview';
import ExportModal from './components/ExportModal';
import ShareModal from './components/ShareModal';

const ConversationHistoryDashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    sortBy: 'recent',
    tags: [],
    hasVoice: false,
    hasFiles: false,
    isShared: false,
    includeArchived: false,
    hasInsights: false,
    hasBreakthroughs: false,
    isCollaborative: false,
    minMessages: '',
    maxMessages: '',
    minDuration: ''
  });

  // Mock data for conversations
  const mockConversations = [
    {
      id: 1,
      title: "Creative Writing: Sci-Fi Novel Plot Development",
      lastActivity: new Date('2024-12-12T10:30:00'),
      messageCount: 47,
      duration: "2h 15m",
      tags: ['creative', 'planning'],
      aiSummary: `Developed a comprehensive plot for a dystopian sci-fi novel set in 2087. Explored themes of AI consciousness, environmental collapse, and human resilience. Created detailed character arcs for protagonist Maya Chen, an AI researcher who discovers her own artificial origins. Discussed world-building elements including the Neo-Singapore megacity, underground resistance movements, and the ethical implications of memory manipulation technology.`,
      preview: [
        { sender: 'user', content: "I want to write a sci-fi novel about AI consciousness. Can you help me develop the plot?" },
        { sender: 'ai', content: "I'd love to help! Let's start with the core premise. What if your protagonist discovers they're an AI who believes they're human?" }
      ],
      hasVoice: true,
      hasFiles: false,
      isShared: true,
      isBreakthrough: true,
      hasInsights: true
    },
    {
      id: 2,
      title: "Business Strategy: Market Analysis for SaaS Product",
      lastActivity: new Date('2024-12-11T16:45:00'),
      messageCount: 32,
      duration: "1h 45m",
      tags: ['business', 'research'],
      aiSummary: `Conducted comprehensive market analysis for a new project management SaaS targeting small to medium businesses. Identified key competitors including Asana, Monday.com, and Trello. Analyzed pricing strategies, feature gaps, and market positioning opportunities. Developed go-to-market strategy focusing on integration capabilities and user experience differentiation.`,
      preview: [
        { sender: 'user', content: "I need to analyze the project management software market for my startup idea." },
        { sender: 'ai', content: "Let's break this down systematically. First, let's identify your target market segment and key competitors." }
      ],
      hasVoice: false,
      hasFiles: true,
      isShared: false,
      isBreakthrough: false,
      hasInsights: true
    },
    {
      id: 3,
      title: "Technical Help: React Performance Optimization",
      lastActivity: new Date('2024-12-11T09:20:00'),
      messageCount: 28,
      duration: "1h 30m",
      tags: ['technical', 'research'],
      aiSummary: `Troubleshot performance issues in a React application with large data sets. Implemented virtualization using react-window, optimized re-renders with React.memo and useMemo, and restructured component hierarchy to prevent unnecessary updates. Achieved 60% improvement in rendering performance and reduced memory usage by 40%.`,
      preview: [
        { sender: 'user', content: "My React app is slow when rendering large lists. What optimization techniques should I use?" },
        { sender: 'ai', content: "For large lists, virtualization is key. Let's implement react-window and optimize your component structure." }
      ],
      hasVoice: false,
      hasFiles: true,
      isShared: true,
      isBreakthrough: true,
      hasInsights: false
    },
    {
      id: 4,
      title: "Personal Assistant: Travel Planning for Japan",
      lastActivity: new Date('2024-12-10T14:15:00'),
      messageCount: 55,
      duration: "3h 20m",
      tags: ['personal', 'planning'],
      aiSummary: `Planned comprehensive 14-day Japan itinerary covering Tokyo, Kyoto, Osaka, and Hiroshima. Researched cultural experiences, food recommendations, transportation options, and accommodation suggestions. Created detailed daily schedules balancing tourist attractions with authentic local experiences. Included budget breakdown and seasonal considerations for cherry blossom season.`,
      preview: [
        { sender: 'user', content: "I\'m planning a 2-week trip to Japan in spring. Can you help me create an itinerary?" },
        { sender: 'ai', content: "Absolutely! Spring is perfect for cherry blossoms. Let\'s plan your journey through Japan\'s highlights." }
      ],
      hasVoice: true,
      hasFiles: false,
      isShared: false,
      isBreakthrough: false,
      hasInsights: true
    },
    {
      id: 5,
      title: "Research & Analysis: Climate Change Impact Study",
      lastActivity: new Date('2024-12-09T11:30:00'),
      messageCount: 41,
      duration: "2h 45m",
      tags: ['research', 'technical'],
      aiSummary: `Analyzed recent climate data and research papers on global warming impacts. Examined temperature trends, sea level rise projections, and extreme weather patterns. Discussed mitigation strategies, renewable energy adoption rates, and policy implications. Created comprehensive summary of findings for academic presentation.`,
      preview: [
        { sender: 'user', content: "I need to research the latest findings on climate change impacts for my thesis." },
        { sender: 'ai', content: "Let\'s examine the most recent IPCC reports and peer-reviewed studies on climate impacts." }
      ],
      hasVoice: false,
      hasFiles: true,
      isShared: true,
      isBreakthrough: false,
      hasInsights: true
    },
    {
      id: 6,
      title: "Creative Writing: Poetry Workshop Session",
      lastActivity: new Date('2024-12-08T19:45:00'),
      messageCount: 23,
      duration: "1h 15m",
      tags: ['creative', 'personal'],
      aiSummary: `Explored various poetry forms including haiku, sonnets, and free verse. Discussed metaphor usage, rhythm, and emotional expression techniques. Workshopped several original poems focusing on themes of nature, memory, and human connection. Provided feedback on imagery, word choice, and structural improvements.`,
      preview: [
        { sender: 'user', content: "I want to improve my poetry writing. Can you help me workshop some pieces?" },
        { sender: 'ai', content: "I\'d be delighted to help! Poetry is about capturing emotion and imagery. Let\'s start with your latest work." }
      ],
      hasVoice: true,
      hasFiles: false,
      isShared: false,
      isBreakthrough: true,
      hasInsights: false
    }
  ];

  // Mock stats data
  const mockStats = {
    totalConversations: 156,
    conversationsGrowth: 23,
    voiceInteractions: 89,
    voiceGrowth: 45,
    totalMessages: 3247,
    messagesGrowth: 18,
    avgSessionTime: "1h 47m",
    sessionTimeGrowth: 12,
    breakthroughMoments: 34,
    breakthroughGrowth: 67,
    sharedConversations: 28,
    sharedGrowth: 34
  };

  const [filteredConversations, setFilteredConversations] = useState(mockConversations);

  // Filter conversations based on search and filters
  useEffect(() => {
    let filtered = [...mockConversations];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(conv =>
        conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        conv?.aiSummary?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        conv?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Date range filter
    if (filters?.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          break;
      }
      
      filtered = filtered?.filter(conv => new Date(conv.lastActivity) >= filterDate);
    }

    // Feature filters
    if (filters?.hasVoice) {
      filtered = filtered?.filter(conv => conv?.hasVoice);
    }
    if (filters?.hasFiles) {
      filtered = filtered?.filter(conv => conv?.hasFiles);
    }
    if (filters?.isShared) {
      filtered = filtered?.filter(conv => conv?.isShared);
    }
    if (filters?.hasInsights) {
      filtered = filtered?.filter(conv => conv?.hasInsights);
    }
    if (filters?.hasBreakthroughs) {
      filtered = filtered?.filter(conv => conv?.isBreakthrough);
    }

    // Tag filter
    if (filters?.tags?.length > 0) {
      filtered = filtered?.filter(conv =>
        filters?.tags?.some(tag => conv?.tags?.includes(tag))
      );
    }

    // Message count filters
    if (filters?.minMessages) {
      filtered = filtered?.filter(conv => conv?.messageCount >= parseInt(filters?.minMessages));
    }
    if (filters?.maxMessages) {
      filtered = filtered?.filter(conv => conv?.messageCount <= parseInt(filters?.maxMessages));
    }

    // Sort
    switch (filters?.sortBy) {
      case 'recent':
        filtered?.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.lastActivity) - new Date(b.lastActivity));
        break;
      case 'longest':
        filtered?.sort((a, b) => {
          const getDurationMinutes = (duration) => {
            const parts = duration?.split(' ');
            let minutes = 0;
            parts?.forEach(part => {
              if (part?.includes('h')) minutes += parseInt(part) * 60;
              if (part?.includes('m')) minutes += parseInt(part);
            });
            return minutes;
          };
          return getDurationMinutes(b?.duration) - getDurationMinutes(a?.duration);
        });
        break;
      case 'shortest':
        filtered?.sort((a, b) => {
          const getDurationMinutes = (duration) => {
            const parts = duration?.split(' ');
            let minutes = 0;
            parts?.forEach(part => {
              if (part?.includes('h')) minutes += parseInt(part) * 60;
              if (part?.includes('m')) minutes += parseInt(part);
            });
            return minutes;
          };
          return getDurationMinutes(a?.duration) - getDurationMinutes(b?.duration);
        });
        break;
      case 'mostMessages':
        filtered?.sort((a, b) => b?.messageCount - a?.messageCount);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
    }

    setFilteredConversations(filtered);
  }, [searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: 'all',
      sortBy: 'recent',
      tags: [],
      hasVoice: false,
      hasFiles: false,
      isShared: false,
      includeArchived: false,
      hasInsights: false,
      hasBreakthroughs: false,
      isCollaborative: false,
      minMessages: '',
      maxMessages: '',
      minDuration: ''
    });
    setSearchQuery('');
  };

  const handleViewConversation = (conversationId) => {
    // Navigate to conversation view
    console.log('Viewing conversation:', conversationId);
  };

  const handleShareConversation = (conversationId) => {
    const conversation = mockConversations?.find(c => c?.id === conversationId);
    setSelectedConversation(conversation);
    setShowShareModal(true);
  };

  const handleDeleteConversation = (conversationId) => {
    // Handle delete with confirmation
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      console.log('Deleting conversation:', conversationId);
    }
  };

  const handleExportConversation = (conversationId) => {
    const conversation = mockConversations?.find(c => c?.id === conversationId);
    setSelectedConversation(conversation);
    setShowExportModal(true);
  };

  const handleExport = async (conversationId, options) => {
    // Mock export functionality
    console.log('Exporting conversation:', conversationId, options);
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleShare = async (conversationId, options) => {
    // Mock share functionality
    console.log('Sharing conversation:', conversationId, options);
    // Simulate share delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                  <Icon name="History" size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Conversation History</h1>
                  <p className="text-muted-foreground">
                    Your AI collaboration journey • {filteredConversations?.length} conversations
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-card border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="Grid3X3"
                    onClick={() => setViewMode('grid')}
                  />
                  <Button
                    variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="Timeline"
                    onClick={() => setViewMode('timeline')}
                  />
                </div>
                
                <Link to="/chat-interface-immersive-ai-experience">
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
                  >
                    New Chat
                  </Button>
                </Link>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/homepage-ai-conversational-platform" className="hover:text-foreground">
                Home
              </Link>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">Conversation History</span>
            </nav>
          </div>

          {/* Stats Overview */}
          <StatsOverview stats={mockStats} />

          {/* Search and Filters */}
          <SearchFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            filters={filters}
            onClearFilters={handleClearFilters}
          />

          {/* Content */}
          {viewMode === 'grid' ? (
            <div className="space-y-6">
              {filteredConversations?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredConversations?.map((conversation) => (
                    <ConversationCard
                      key={conversation?.id}
                      conversation={conversation}
                      onView={handleViewConversation}
                      onShare={handleShareConversation}
                      onDelete={handleDeleteConversation}
                      onExport={handleExportConversation}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No conversations found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <TimelineView
              conversations={filteredConversations}
              onSelectConversation={handleViewConversation}
            />
          )}

          {/* Quick Actions */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                className="justify-start hover-lift"
              >
                Export All Conversations
              </Button>
              <Button
                variant="outline"
                iconName="Archive"
                iconPosition="left"
                className="justify-start hover-lift"
              >
                Archive Old Conversations
              </Button>
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
                className="justify-start hover-lift"
              >
                Privacy Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        conversation={selectedConversation}
        onExport={handleExport}
      />
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        conversation={selectedConversation}
        onShare={handleShare}
      />
    </div>
  );
};

export default ConversationHistoryDashboard;