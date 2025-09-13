import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CapabilityCard from './components/CapabilityCard';
import InteractiveDemo from './components/InteractiveDemo';
import PerformanceMetrics from './components/PerformanceMetrics';
import SuccessStories from './components/SuccessStories';
import ComparisonChart from './components/ComparisonChart';

const AICapabilitiesShowcase = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const capabilities = [
    {
      id: 'creative',
      type: 'creative',
      title: 'Creative Collaboration',
      description: 'Generate ideas, stories, and creative content',
      icon: 'Palette',
      category: 'creative',
      examples: [
        {
          input: "Write a short story about a time traveler who discovers they can only travel to moments of great kindness",
          output: `The Kindness Traveler\n\nMara discovered her gift on a Tuesday morning when her grandmother's smile transported her to 1943. She found herself watching a young soldier share his last piece of bread with a stray dog in war-torn London. The warmth of that moment pulled her forward through time—to a teacher staying late to help a struggling student, to strangers forming a human chain to rescue a family from flood waters, to a child offering their favorite toy to comfort a crying friend.\n\nShe realized she wasn't just witnessing kindness; she was collecting it, weaving these moments into a tapestry of human compassion that would guide her own journey through time.`
        },
        {
          input: "Help me brainstorm creative marketing ideas for a sustainable fashion brand",
          output: `Sustainable Fashion Marketing Ideas:\n\n1. "Wear Your Values" Campaign - Customers share stories of how their clothing choices reflect their environmental values\n\n2. "Thread Journey" - QR codes on garments that show the complete supply chain story from fiber to finished product\n\n3. "Closet Swap Society" - Community events where customers can trade, repair, and upcycle their existing clothes\n\n4. "Future Fashion Challenge" - Design contest where customers reimagine what sustainable fashion could look like in 2050\n\n5. "Impact Calculator" - Interactive tool showing environmental savings from choosing sustainable options\n\n6. "Artisan Spotlight Series" - Monthly features on the craftspeople behind the products, showing their techniques and stories`
        },
        {
          input: "Create a poem about artificial intelligence and human creativity working together",
          output: `Digital Dreams, Human Hearts\n\nIn circuits bright and neurons deep,\nTwo minds converge where ideas leap—\nOne born of silicon and code,\nOne carved from flesh on life's long road.\n\nThe AI weaves with perfect thread\nThe patterns dancing in its head,\nWhile human hands add warmth and soul,\nMaking the fractured pieces whole.\n\nTogether they paint tomorrow's sky\nWith colors neither could supply\nAlone—for in their strange embrace\nLies beauty's truest dwelling place.\n\nNot replacement, but expansion,\nNot competition, but compassion—\nTwo forms of thought in harmony,\nCreating what was meant to be.`
        }
      ],
      metrics: [
        { label: 'Creativity', value: '98%' },
        { label: 'Originality', value: '94%' },
        { label: 'Coherence', value: '96%' }
      ]
    },
    {
      id: 'analytical',type: 'analytical',title: 'Analytical Thinking',description: 'Process data, identify patterns, and provide insights',icon: 'BarChart3',category: 'analytical',
      examples: [
        {
          input: "Analyze the potential impact of remote work on urban development over the next decade",
          output: `Remote Work Impact Analysis:\n\n**Urban Core Changes:**\n- 25-30% reduction in commercial office demand\n- Conversion of office buildings to mixed-use residential\n- Decreased public transit ridership requiring infrastructure adaptation\n\n**Suburban Growth Patterns:**\n- 40% increase in home office renovations and additions\n- Rise of "15-minute neighborhoods" with local co-working spaces\n- Increased demand for high-speed internet infrastructure\n\n**Economic Implications:**\n- $2.3 trillion shift in real estate values globally\n- 15% reduction in urban tax revenue requiring policy adaptation\n- Growth in secondary cities as talent disperses\n\n**Social Infrastructure:**\n- Need for new community spaces to replace office social interactions\n- Evolution of local services to support home-based workers\n- Changes in school district preferences affecting family location choices`
        },
        {
          input: "What patterns can you identify in customer behavior data showing 40% increase in mobile purchases but 60% cart abandonment rate?",
          output: `Customer Behavior Pattern Analysis:\n\n**Key Insights:**\n1. **Mobile-First Browsing, Desktop Completion Gap** - Users research on mobile but struggle to complete purchases\n\n2. **Friction Points Identified:**\n   - Complex checkout processes not optimized for mobile\n   - Payment method limitations on mobile devices\n   - Form filling difficulties on smaller screens\n\n**Behavioral Patterns:**\n- Peak abandonment occurs at payment entry (73% of cases)\n- Users who abandon return within 24 hours on desktop (45%)\n- Cart value averages 23% higher on mobile vs desktop\n\n**Recommendations:**\n1. Implement one-click payment options (Apple Pay, Google Pay)\n2. Simplify mobile checkout to 2-step process\n3. Add cart recovery emails with mobile-optimized links\n4. A/B test guest checkout vs account creation\n\n**Projected Impact:** These changes could reduce abandonment by 35% and increase mobile conversion by 28%`
        }
      ],
      metrics: [
        { label: 'Accuracy', value: '96%' },
        { label: 'Depth', value: '92%' },
        { label: 'Insights', value: '89%' }
      ]
    },
    {
      id: 'problem',type: 'problem',title: 'Problem Solving',description: 'Break down complex challenges and find solutions',icon: 'Lightbulb',category: 'problem',
      examples: [
        {
          input: "Our team is struggling with communication across different time zones. How can we improve collaboration?",
          output: `Time Zone Collaboration Solution Framework:\n\n**Immediate Actions (Week 1):**\n1. Implement "overlap hours" - identify 2-3 hours when most team members are available\n2. Create shared calendar showing everyone's working hours and time zones\n3. Establish communication protocols for urgent vs non-urgent matters\n\n**Process Improvements (Week 2-4):**\n1. **Asynchronous Documentation**\n   - Daily written updates instead of live standups\n   - Decision logs with context and reasoning\n   - Video recordings of important discussions\n\n2. **Meeting Optimization**\n   - Rotate meeting times to share inconvenience fairly\n   - Record all meetings with searchable transcripts\n   - Use collaborative documents for real-time input\n\n3. **Communication Tools**\n   - Slack/Teams with clear channel purposes\n   - Project management tools with status visibility\n   - Time zone converter browser extensions for all team members\n\n**Long-term Strategy:**\n- Hire regional coordinators to bridge time gaps\n- Develop handoff protocols between regions\n- Create comprehensive knowledge base for self-service\n\n**Success Metrics:** Response time, project velocity, team satisfaction scores`
        },
        {
          input: "How can a small business compete with larger companies in their market?",
          output: `Small Business Competitive Strategy:\n\n**Core Advantages to Leverage:**\n1. **Agility & Speed**\n   - Faster decision-making without bureaucracy\n   - Quick pivots based on market feedback\n   - Rapid implementation of new ideas\n\n2. **Personal Relationships**\n   - Direct access to founders/decision makers\n   - Customized solutions for individual clients\n   - Community-based marketing and loyalty\n\n**Strategic Approaches:**\n\n**Niche Specialization**\n- Focus on underserved market segments\n- Become the expert in specific use cases\n- Develop deep domain knowledge\n\n**Superior Customer Experience**\n- White-glove onboarding and support\n- Flexible terms and personalized service\n- Faster response times and problem resolution\n\n**Innovation & Experimentation**\n- Test new features/services quickly\n- Partner with other small businesses\n- Use technology to automate and scale efficiently\n\n**Local Market Dominance**\n- Build strong local brand presence\n- Participate in community events\n- Leverage local partnerships and referrals\n\n**Implementation Timeline:** 90-day sprint focusing on one core advantage, then expand based on results`
        }
      ],
      metrics: [
        { label: 'Effectiveness', value: '91%' },
        { label: 'Practicality', value: '88%' },
        { label: 'Innovation', value: '85%' }
      ]
    },
    {
      id: 'learning',
      type: 'learning',
      title: 'Learning Assistance',
      description: 'Personalized education and skill development',
      icon: 'GraduationCap',
      category: 'learning',
      examples: [
        {
          input: "I want to learn Python programming but I\'m a complete beginner. Create a learning plan for me.",
          output: `Python Learning Journey - Beginner to Proficient\n\n**Phase 1: Foundations (Weeks 1-3)**\n\n*Week 1: Getting Started*\n- Install Python and VS Code\n- Learn basic syntax: variables, data types, operators\n- Practice: Simple calculator, name generator\n- Daily commitment: 1 hour\n\n*Week 2: Control Structures*\n- If/else statements, loops (for, while)\n- Functions and parameters\n- Practice: Number guessing game, simple menu system\n\n*Week 3: Data Structures*\n- Lists, dictionaries, tuples, sets\n- String manipulation and formatting\n- Practice: To-do list app, word counter\n\n**Phase 2: Practical Skills (Weeks 4-8)**\n\n*Weeks 4-5: File Handling & Error Management*\n- Reading/writing files, CSV handling\n- Try/except blocks, debugging techniques\n- Practice: Expense tracker, log file analyzer\n\n*Weeks 6-8: Libraries & APIs*\n- requests library for web APIs\n- pandas for data manipulation\n- matplotlib for basic visualization\n- Practice: Weather app, data analysis project\n\n**Phase 3: Real Projects (Weeks 9-12)**\n- Web scraping project\n- Personal finance dashboard\n- Simple web app with Flask\n\n**Learning Resources:**\n- Interactive: Codecademy Python course\n- Practice: HackerRank, LeetCode easy problems\n- Community: Python Discord, Stack Overflow\n\n**Success Milestones:**\n- Week 4: Build a functional calculator\n- Week 8: Complete a data analysis project\n- Week 12: Deploy a web application`
        },
        {
          input: "Explain quantum computing in simple terms that a high school student could understand",
          output: `Quantum Computing Explained Simply\n\n**Think of Regular Computers Like Light Switches**\nYour computer processes information using bits - like light switches that are either ON (1) or OFF (0). Everything your computer does is just millions of these switches flipping on and off really fast.\n\n**Quantum Computers Are Like Magic Coins**\nInstead of switches, quantum computers use quantum bits (qubits) that are like magic coins. While a regular coin shows either heads OR tails, a quantum coin can be heads AND tails at the same time until you look at it!\n\n**Why This Matters - The Maze Example**\nImagine you're trying to solve a giant maze:\n- Regular computer: Tries one path at a time, very systematically\n- Quantum computer: Tries ALL possible paths simultaneously, like having ghost versions of yourself exploring every route at once\n\n**Real-World Applications**\n1. **Drug Discovery**: Testing millions of molecular combinations simultaneously\n2. **Weather Prediction**: Processing countless atmospheric variables at once\n3. **Cryptography**: Breaking codes that would take regular computers thousands of years\n4. **Financial Modeling**: Analyzing all possible market scenarios instantly\n\n**The Catch**\nQuantum computers are extremely fragile - they need to be colder than outer space and isolated from any vibration. They're also not better at everything, just specific types of problems.\n\n**Current Status**\nWe're in the "early days" - like computers in the 1940s. They exist, they work, but they're not ready for everyday use yet.\n\n**Fun Fact**: If you tried to simulate what a 300-qubit quantum computer can do, you'd need a regular computer with more memory than there are atoms in the universe!`
        }
      ],
      metrics: [
        { label: 'Clarity', value: '93%' },
        { label: 'Engagement', value: '90%' },
        { label: 'Retention', value: '87%' }
      ]
    },
    {
      id: 'voice',type: 'voice',title: 'Voice Interaction',description: 'Natural speech recognition and conversation',icon: 'Mic',category: 'voice',
      examples: [
        {
          input: "Hey AI, can you help me practice for a job interview? I'm applying for a marketing manager position.",output: `🎤 Voice AI Response:\n\n"Absolutely! I'd be happy to help you practice for your marketing manager interview. Let me start with some common questions you're likely to encounter:\n\n1. First, tell me about a successful marketing campaign you've led. I'll listen for specific metrics and your role in the success.\n\n2. How do you measure the effectiveness of your marketing strategies? I want to hear about your analytical approach.\n\n3. Describe a time when a campaign didn't perform as expected. What did you learn?\n\nI'll provide feedback on your answers, including your confidence level, clarity of communication, and how well you demonstrate leadership qualities. \n\nWould you like to start with the first question, or do you have specific areas you'd like to focus on? I can also help you practice your elevator pitch or discuss current marketing trends that might come up."\n\n*Voice Recognition Accuracy: 97.3%*\n*Natural Language Processing: Advanced*\n*Emotional Intelligence: Supportive and encouraging tone detected*`
        },
        {
          input: "I\'m driving and need directions to the nearest coffee shop with good WiFi for working",
          output: `🗣️ Voice AI Navigation Response:\n\n"I understand you're looking for a coffee shop with reliable WiFi while driving. For your safety, I'll provide hands-free directions.\n\nBased on your current location, I found three excellent options:\n\n1. **Closest Option**: Brew & Bytes Café, 0.7 miles ahead on your right. They have high-speed WiFi, plenty of power outlets, and a quiet work area. Average rating: 4.8 stars.\n\n2. **Best for Working**: The Connected Grind, 1.2 miles away. Known for their 'work-friendly' atmosphere with dedicated quiet zones and excellent WiFi. They also have meeting rooms you can reserve.\n\n3. **Popular Choice**: Digital Roasters, 0.9 miles away. Great coffee, reliable internet, and they're open until 10 PM if you need to work late.\n\nWhich one would you prefer? I can start navigation immediately and let you know about parking availability and current wait times."\n\n*Processing Time: 0.8 seconds*\n*Context Understanding: Excellent (driving safety + work needs)*\n*Location Services: Integrated*`
        }
      ],
      metrics: [
        { label: 'Recognition', value: '97%' },
        { label: 'Understanding', value: '95%' },
        { label: 'Naturalness', value: '92%' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Capabilities', icon: 'Grid3X3' },
    { id: 'creative', name: 'Creative', icon: 'Palette' },
    { id: 'analytical', name: 'Analytical', icon: 'BarChart3' },
    { id: 'problem', name: 'Problem Solving', icon: 'Lightbulb' },
    { id: 'learning', name: 'Learning', icon: 'GraduationCap' },
    { id: 'voice', name: 'Voice', icon: 'Mic' }
  ];

  const filteredCapabilities = selectedCategory === 'all' 
    ? capabilities 
    : capabilities?.filter(cap => cap?.category === selectedCategory);

  const handleTryDemo = (demoType) => {
    const capability = capabilities?.find(cap => cap?.type === demoType);
    setActiveDemo(capability);
  };

  const closeDemo = () => {
    setActiveDemo(null);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-16 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-primary-foreground" />
            </div>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            AI Capabilities
            <span className="block text-primary">Showcase</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience the full spectrum of AI Nexus capabilities through interactive demonstrations. 
            From creative collaboration to analytical thinking, discover how AI can transform your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/chat-interface-immersive-ai-experience">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
              >
                Start Free Chat
              </Button>
            </Link>
            <Link to="/voice-experience-center">
              <Button
                variant="outline"
                size="lg"
                iconName="Mic"
                iconPosition="left"
                className="hover-lift"
              >
                Try Voice AI
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Category Filter */}
      <section className="py-8 px-4 lg:px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift ${
                  selectedCategory === category?.id
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span>{category?.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Capabilities Grid */}
      <section className="py-16 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCapabilities?.map((capability) => (
              <CapabilityCard
                key={capability?.id}
                title={capability?.title}
                description={capability?.description}
                icon={capability?.icon}
                demoType={capability?.type}
                examples={capability?.examples}
                metrics={capability?.metrics}
                onTryDemo={handleTryDemo}
                isActive={selectedCategory === capability?.category}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Performance & Comparison Section */}
      <section className="py-16 px-4 lg:px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Performance & Benchmarks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how AI Nexus compares to industry standards and competitors across key metrics
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PerformanceMetrics />
            <ComparisonChart />
          </div>
        </div>
      </section>
      {/* Success Stories */}
      <section className="py-16 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Real Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover how professionals are using AI Nexus to achieve remarkable results
            </p>
          </div>
          
          <SuccessStories />
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card rounded-2xl border border-border p-8 hover-lift">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/40 rounded-xl flex items-center justify-center">
                <Icon name="Sparkles" size={32} className="text-accent" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Experience AI Nexus?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already transforming their work with AI Nexus. 
              Start your journey with a free conversation today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/chat-interface-immersive-ai-experience">
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
                >
                  Start Free Chat
                </Button>
              </Link>
              <Link to="/personalization-hub-ai-avatar-customization">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Settings"
                  iconPosition="left"
                  className="hover-lift"
                >
                  Customize AI
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={16} className="text-secondary" />
                  <span>No Credit Card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Demo Modal */}
      {activeDemo && (
        <InteractiveDemo
          capability={activeDemo}
          onClose={closeDemo}
        />
      )}
    </div>
  );
};

export default AICapabilitiesShowcase;