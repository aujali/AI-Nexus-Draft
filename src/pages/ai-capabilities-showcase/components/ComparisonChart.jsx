import React from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonChart = () => {
  const comparisonData = [
    {
      feature: "Response Quality",
      aiNexus: 96,
      competitor1: 78,
      competitor2: 82,
      industry: 75
    },
    {
      feature: "Processing Speed",
      aiNexus: 94,
      competitor1: 65,
      competitor2: 71,
      industry: 68
    },
    {
      feature: "Context Understanding",
      aiNexus: 92,
      competitor1: 74,
      competitor2: 69,
      industry: 72
    },
    {
      feature: "Creative Output",
      aiNexus: 89,
      competitor1: 71,
      competitor2: 76,
      industry: 70
    },
    {
      feature: "Voice Recognition",
      aiNexus: 97,
      competitor1: 83,
      competitor2: 79,
      industry: 81
    }
  ];

  const BarChart = ({ data }) => (
    <div className="space-y-4">
      {data?.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{item?.feature}</span>
            <span className="text-sm text-muted-foreground">{item?.aiNexus}%</span>
          </div>
          <div className="space-y-1">
            {/* AI Nexus Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-primary font-medium w-16">AI Nexus</span>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item?.aiNexus}%` }}
                ></div>
              </div>
            </div>
            
            {/* Competitor 1 Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground w-16">Comp A</span>
              <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-muted-foreground/40 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item?.competitor1}%` }}
                ></div>
              </div>
            </div>
            
            {/* Competitor 2 Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground w-16">Comp B</span>
              <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-muted-foreground/40 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item?.competitor2}%` }}
                ></div>
              </div>
            </div>
            
            {/* Industry Average Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground w-16">Industry</span>
              <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-muted-foreground/30 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item?.industry}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
          <Icon name="TrendingUp" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Comparison</h3>
          <p className="text-sm text-muted-foreground">AI Nexus vs Industry Standards</p>
        </div>
      </div>

      <BarChart data={comparisonData} />

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">+18%</div>
            <div className="text-xs text-muted-foreground">Above Average</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">Top 3%</div>
            <div className="text-xs text-muted-foreground">Global Ranking</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">5 Stars</div>
            <div className="text-xs text-muted-foreground">User Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">99.9%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Data based on independent benchmarks and user feedback as of December 2025
        </p>
      </div>
    </div>
  );
};

export default ComparisonChart;