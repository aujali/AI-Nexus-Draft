import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const VoiceVisualization = ({ isListening, isAISpeaking, volume = 0 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [audioData, setAudioData] = useState(new Array(64)?.fill(0));

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const width = canvas?.width;
    const height = canvas?.height;

    const animate = () => {
      ctx?.clearRect(0, 0, width, height);

      // Create gradient
      const gradient = ctx?.createLinearGradient(0, 0, width, 0);
      if (isAISpeaking) {
        gradient?.addColorStop(0, '#F3D096');
        gradient?.addColorStop(0.5, '#96C8B7');
        gradient?.addColorStop(1, '#C0C0C0');
      } else if (isListening) {
        gradient?.addColorStop(0, '#96C8B7');
        gradient?.addColorStop(0.5, '#F3D096');
        gradient?.addColorStop(1, '#96C8B7');
      } else {
        gradient?.addColorStop(0, '#E2E8F0');
        gradient?.addColorStop(1, '#CBD5E0');
      }

      // Draw audio bars
      const barWidth = width / audioData?.length;
      audioData?.forEach((value, index) => {
        const barHeight = (value * height * 0.8) + (height * 0.1);
        const x = index * barWidth;
        const y = height - barHeight;

        ctx.fillStyle = gradient;
        ctx?.fillRect(x, y, barWidth - 2, barHeight);
      });

      // Update audio data with animation
      if (isListening || isAISpeaking) {
        setAudioData(prev => prev?.map((_, index) => {
          const baseValue = Math.sin((Date.now() * 0.005) + (index * 0.2)) * 0.3 + 0.4;
          const volumeMultiplier = volume * 0.5 + 0.5;
          return Math.max(0.1, baseValue * volumeMultiplier);
        }));
      } else {
        setAudioData(prev => prev?.map(value => Math.max(0.05, value * 0.95)));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [isListening, isAISpeaking, volume]);

  return (
    <div className="relative w-full h-32 bg-card rounded-xl border border-border overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={128}
        className="w-full h-full"
      />
      
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {isListening && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-secondary/20 rounded-full">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-secondary">Listening</span>
          </div>
        )}
        {isAISpeaking && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-accent/20 rounded-full">
            <Icon name="Volume2" size={12} className="text-accent" />
            <span className="text-xs font-medium text-accent">AI Speaking</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceVisualization;