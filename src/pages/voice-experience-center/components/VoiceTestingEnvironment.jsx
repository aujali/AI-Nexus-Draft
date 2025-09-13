import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VoiceTestingEnvironment = ({ onEnvironmentChange }) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('quiet-office');
  const [noiseLevel, setNoiseLevel] = useState(0);

  const environments = [
    { value: 'quiet-office', label: 'Quiet Office', noise: 0, icon: 'Building' },
    { value: 'home-office', label: 'Home Office', noise: 15, icon: 'Home' },
    { value: 'coffee-shop', label: 'Coffee Shop', noise: 45, icon: 'Coffee' },
    { value: 'busy-street', label: 'Busy Street', noise: 70, icon: 'Car' },
    { value: 'airport', label: 'Airport Terminal', noise: 85, icon: 'Plane' },
    { value: 'custom', label: 'Custom Environment', noise: 0, icon: 'Settings' }
  ];

  const handleEnvironmentChange = (value) => {
    setSelectedEnvironment(value);
    const env = environments?.find(e => e?.value === value);
    if (env && env.value !== 'custom') {
      setNoiseLevel(env.noise);
      onEnvironmentChange({ environment: value, noiseLevel: env.noise });
    }
  };

  const handleNoiseChange = (level) => {
    setNoiseLevel(level);
    onEnvironmentChange({ environment: selectedEnvironment, noiseLevel: level });
  };

  const currentEnv = environments?.find(e => e?.value === selectedEnvironment);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Testing Environment</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Volume2" size={16} />
          <span>{noiseLevel}dB</span>
        </div>
      </div>
      {/* Environment Selection */}
      <div className="space-y-4">
        <Select
          label="Environment Type"
          options={environments}
          value={selectedEnvironment}
          onChange={handleEnvironmentChange}
          className="w-full"
        />

        {/* Environment Preview */}
        <div className="p-4 bg-card rounded-xl border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Icon name={currentEnv?.icon || 'Settings'} size={20} className="text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{currentEnv?.label}</h4>
              <p className="text-sm text-muted-foreground">
                {noiseLevel === 0 && "Perfect conditions for voice recognition"}
                {noiseLevel > 0 && noiseLevel <= 30 && "Minimal background noise"}
                {noiseLevel > 30 && noiseLevel <= 60 && "Moderate ambient sound"}
                {noiseLevel > 60 && "Challenging noise conditions"}
              </p>
            </div>
          </div>

          {/* Noise Level Slider */}
          {selectedEnvironment === 'custom' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Background Noise Level: {noiseLevel}dB
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noiseLevel}
                  onChange={(e) => handleNoiseChange(parseInt(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Silent</span>
                  <span>Moderate</span>
                  <span>Loud</span>
                </div>
              </div>
            </div>
          )}

          {/* Audio Processing Status */}
          <div className="flex items-center justify-between mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Noise Cancellation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                noiseLevel <= 30 ? 'bg-success' : 
                noiseLevel <= 60 ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="text-sm text-muted-foreground">
                {noiseLevel <= 30 ? 'Optimal' : 
                 noiseLevel <= 60 ? 'Good' : 'Active'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Environment Tests */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {environments?.slice(0, 4)?.map((env) => (
            <Button
              key={env.value}
              variant={selectedEnvironment === env.value ? "default" : "outline"}
              size="sm"
              iconName={env.icon}
              iconPosition="left"
              onClick={() => handleEnvironmentChange(env.value)}
              className="justify-start"
            >
              {env.label?.split(' ')?.[0]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceTestingEnvironment;