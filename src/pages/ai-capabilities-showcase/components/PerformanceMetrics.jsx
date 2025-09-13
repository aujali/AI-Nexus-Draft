import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = () => {
  const metrics = [
    {
      label: "Response Accuracy",
      value: 96.8,
      comparison: "+12% vs industry",
      icon: "Target",
      color: "text-success"
    },
    {
      label: "Processing Speed",
      value: 1.2,
      unit: "seconds",
      comparison: "3x faster",
      icon: "Zap",
      color: "text-accent"
    },
    {
      label: "Context Retention",
      value: 94.5,
      comparison: "+8% improvement",
      icon: "Brain",
      color: "text-primary"
    },
    {
      label: "User Satisfaction",
      value: 98.2,
      comparison: "Top 5% globally",
      icon: "Heart",
      color: "text-secondary"
    }
  ];

  const ProgressBar = ({ value, color }) => (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r from-${color?.replace('text-', '')}/60 to-${color?.replace('text-', '')} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
          <p className="text-sm text-muted-foreground">Real-time AI capability measurements</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics?.map((metric, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={metric?.icon} size={16} className={metric?.color} />
                <span className="text-sm font-medium text-foreground">{metric?.label}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">
                  {metric?.value}{metric?.unit ? ` ${metric?.unit}` : '%'}
                </div>
                <div className="text-xs text-muted-foreground">{metric?.comparison}</div>
              </div>
            </div>
            <ProgressBar value={metric?.unit ? Math.min(metric?.value * 20, 100) : metric?.value} color={metric?.color} />
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last updated: December 12, 2025 at 12:09 PM</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
            <span className="text-success font-medium">Live Data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;