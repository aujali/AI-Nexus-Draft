import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Creative Director",
      company: "Design Studio Pro",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `AI Nexus transformed how I approach creative projects. The AI doesn't just follow instructions—it collaborates, suggests improvements, and helps me push creative boundaries I never thought possible.`,
      achievement: "Increased creative output by 300%",
      rating: 5,
      category: "Creative Professional"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `The business strategy conversations with AI Nexus helped me identify market opportunities I completely missed. It's like having a brilliant consultant available 24/7 who actually understands my industry.`,
      achievement: "Secured $1.2M in funding",
      rating: 5,
      category: "Digital Innovator"
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "BioTech Innovations",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      content: `As someone who works with complex data daily, AI Nexus's analytical capabilities are extraordinary. It helps me spot patterns and generate hypotheses that accelerate my research significantly.`,
      achievement: "Published 3 breakthrough papers",
      rating: 5,
      category: "AI Enthusiast"
    },
    {
      id: 4,
      name: "James Park",
      role: "Content Creator",
      company: "Digital Media Co.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The voice features are game-changing for content creation. I can brainstorm ideas while walking, get instant feedback on concepts, and maintain creative flow without breaking to type.`,
      achievement: "Grew audience to 500K followers",
      rating: 5,
      category: "Creative Professional"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Product Manager",
      company: "Innovation Labs",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `AI Nexus helps me make better product decisions by analyzing user feedback, market trends, and competitive landscapes. It's like having an entire research team in my pocket.`,
      achievement: "Launched 5 successful products",
      rating: 5,
      category: "Digital Innovator"
    },
    {
      id: 6,
      name: "Alex Kumar",
      role: "Software Engineer",
      company: "CloudTech Systems",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      content: `The technical problem-solving capabilities are incredible. AI Nexus helps me architect solutions, debug complex issues, and learn new technologies faster than any resource I've used.`,
      achievement: "Reduced development time by 40%",
      rating: 5,
      category: "AI Enthusiast"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-card via-secondary/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-success/20 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Users" size={16} />
            <span>User Stories</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by innovators
            <span className="block text-transparent bg-gradient-to-r from-success via-secondary to-primary bg-clip-text">
              worldwide
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how professionals across industries are achieving breakthrough results 
            with AI Nexus's intelligent conversation platform.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-elevated animate-fade-in">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Quote" size={24} className="text-primary" />
            </div>

            {/* Testimonial Content */}
            <div className="pt-8">
              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                "{testimonials?.[currentTestimonial]?.content}"
              </blockquote>

              {/* Achievement Badge */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={20} className="text-success" />
                  <span className="font-semibold text-success">Achievement</span>
                </div>
                <p className="text-foreground mt-1">
                  {testimonials?.[currentTestimonial]?.achievement}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonials?.[currentTestimonial]?.avatar}
                      alt={testimonials?.[currentTestimonial]?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonials?.[currentTestimonial]?.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonials?.[currentTestimonial]?.role}
                    </p>
                    <p className="text-primary text-sm font-medium">
                      {testimonials?.[currentTestimonial]?.company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 hover-lift"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 hover-lift"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { category: 'Creative Professional', count: 2, icon: 'Palette', color: 'accent' },
            { category: 'Digital Innovator', count: 2, icon: 'Zap', color: 'primary' },
            { category: 'AI Enthusiast', count: 2, icon: 'Brain', color: 'secondary' }
          ]?.map((stat) => (
            <div
              key={stat?.category}
              className="text-center p-6 bg-card border border-border rounded-xl shadow-soft hover-lift"
            >
              <div className={`w-12 h-12 bg-${stat?.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon name={stat?.icon} size={24} className={`text-${stat?.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{stat?.category}</h3>
              <p className="text-2xl font-bold text-primary mb-1">{stat?.count}</p>
              <p className="text-sm text-muted-foreground">Success Stories</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;