import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Conversations', icon: 'Grid3X3' },
    { id: 'creative', name: 'Creative', icon: 'Palette' },
    { id: 'business', name: 'Business', icon: 'Briefcase' },
    { id: 'technical', name: 'Technical', icon: 'Code' },
    { id: 'learning', name: 'Learning', icon: 'GraduationCap' }
  ];

  const conversations = [
    {
      id: 1,
      category: 'creative',
      title: 'Novel Plot Development',
      preview: `"Help me develop a compelling antagonist for my sci-fi novel."\n\n"Let's create a morally complex character. What if your antagonist genuinely believes they're saving humanity, but their methods are questionable?"`,
      tags: ['Storytelling', 'Character Development', 'Creative Writing'],
      outcome: 'Completed 50,000-word novel',
      rating: 5,
      timeSpent: '2h 15m'
    },
    {
      id: 2,
      category: 'business',
      title: 'Marketing Strategy Optimization',
      preview: `"Our conversion rate dropped 15% last quarter. Help me analyze why."\n\n"Let's examine your funnel systematically. I notice three potential bottlenecks in your customer journey..."`,
      tags: ['Marketing', 'Analytics', 'Strategy'],
      outcome: 'Increased conversions by 23%',
      rating: 5,
      timeSpent: '1h 45m'
    },
    {
      id: 3,
      category: 'technical',
      title: 'API Architecture Design',
      preview: `"Design a scalable REST API for a social media platform."\n\n"Let's start with core entities and relationships. For scalability, I recommend a microservices approach with these key services..."`,
      tags: ['API Design', 'Architecture', 'Scalability'],
      outcome: 'Deployed production API',
      rating: 5,
      timeSpent: '3h 20m'
    },
    {
      id: 4,
      category: 'learning',
      title: 'Machine Learning Concepts',
      preview: `"Explain neural networks like I'm 12 years old."\n\n"Imagine your brain is like a huge network of friends passing messages. Each friend (neuron) listens to their friends and decides what message to pass along..."`,
      tags: ['Machine Learning', 'Education', 'Simplification'],
      outcome: 'Built first ML model',
      rating: 5,
      timeSpent: '1h 30m'
    },
    {
      id: 5,
      category: 'creative',
      title: 'Brand Identity Creation',
      preview: `"Create a brand identity for my sustainable fashion startup."\n\n"Let's build around authenticity and environmental consciousness. I suggest a name that reflects both style and sustainability..."`,
      tags: ['Branding', 'Design', 'Sustainability'],
      outcome: 'Launched successful brand',
      rating: 5,
      timeSpent: '2h 45m'
    },
    {
      id: 6,
      category: 'business',
      title: 'Investment Pitch Deck',
      preview: `"Help me create a compelling pitch deck for Series A funding."\n\n"Your story needs to show traction and vision. Let's structure this around the problem-solution fit you've already proven..."`,
      tags: ['Fundraising', 'Presentation', 'Strategy'],
      outcome: 'Raised $2.5M Series A',
      rating: 5,
      timeSpent: '4h 10m'
    }
  ];

  const filteredConversations = activeCategory === 'all' 
    ? conversations 
    : conversations?.filter(conv => conv?.category === activeCategory);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Gallery" size={16} />
            <span>Conversation Gallery</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Real conversations,
            <span className="block text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              remarkable results
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how AI Nexus has helped users achieve breakthrough results across creative projects, 
            business challenges, and learning goals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover-lift ${
                activeCategory === category?.id
                  ? 'bg-primary/20 text-primary border border-primary/30' :'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-muted-foreground/50'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Conversations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredConversations?.map((conversation, index) => (
            <div
              key={conversation?.id}
              className="bg-card border border-border rounded-xl p-6 shadow-soft hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {conversation?.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{conversation?.timeSpent}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(conversation?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                  ))}
                </div>
              </div>

              {/* Conversation Preview */}
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <div className="text-xs text-muted-foreground mb-2 font-mono">
                  Conversation Preview
                </div>
                <p className="text-sm text-foreground whitespace-pre-line line-clamp-4">
                  {conversation?.preview}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {conversation?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Outcome */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Result</span>
                </div>
                <p className="text-sm text-foreground mt-1">
                  {conversation?.outcome}
                </p>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                className="hover-lift"
              >
                Start Similar Chat
              </Button>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center">
          <Link to="/conversation-history-dashboard">
            <Button 
              variant="default" 
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
            >
              Explore More Conversations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConversationGallery;