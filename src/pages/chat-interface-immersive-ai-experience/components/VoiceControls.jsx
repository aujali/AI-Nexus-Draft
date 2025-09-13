import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceControls = ({ onVoiceMessage, isListening, onToggleListening }) => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isListening) {
      startAudioVisualization();
    } else {
      stopAudioVisualization();
    }

    return () => stopAudioVisualization();
  }, [isListening]);

  const startAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef?.current?.createAnalyser();
      
      const source = audioContextRef?.current?.createMediaStreamSource(stream);
      source?.connect(analyserRef?.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef?.current?.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        analyserRef?.current?.getByteFrequencyData(dataArray);
        const average = dataArray?.reduce((a, b) => a + b) / bufferLength;
        setAudioLevel(average / 255);
        
        if (isListening) {
          animationRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioVisualization = () => {
    if (animationRef?.current) {
      cancelAnimationFrame(animationRef?.current);
    }
    if (audioContextRef?.current) {
      audioContextRef?.current?.close();
    }
    setAudioLevel(0);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    onToggleListening();
    
    // Mock speech recognition
    if (!isRecording) {
      setTranscript('');
      setConfidence(0);
      
      // Simulate speech recognition
      setTimeout(() => {
        setTranscript('Hello, I would like to know more about...');
        setConfidence(0.95);
      }, 2000);
    }
  };

  const handleSendVoiceMessage = () => {
    if (transcript?.trim()) {
      onVoiceMessage(transcript);
      setTranscript('');
      setConfidence(0);
      setIsRecording(false);
      onToggleListening();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
      {/* Voice Visualization */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          {/* Main Microphone Button */}
          <button
            onClick={handleVoiceToggle}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover-lift ${
              isListening 
                ? 'bg-error text-error-foreground shadow-lg animate-pulse' 
                : 'bg-accent text-accent-foreground hover:bg-accent/90'
            }`}
          >
            <Icon name={isListening ? "MicOff" : "Mic"} size={24} />
            
            {/* Audio Level Rings */}
            {isListening && (
              <>
                <div 
                  className="absolute inset-0 rounded-full border-2 border-error animate-ping"
                  style={{ 
                    transform: `scale(${1 + audioLevel * 0.5})`,
                    opacity: audioLevel * 0.7 
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full border border-error/50"
                  style={{ 
                    transform: `scale(${1.2 + audioLevel * 0.3})`,
                    opacity: audioLevel * 0.5 
                  }}
                />
              </>
            )}
          </button>

          {/* Status Indicator */}
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center ${
            isListening ? 'bg-error animate-pulse' : 'bg-success'
          }`}>
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>
      {/* Audio Level Bars */}
      {isListening && (
        <div className="flex items-center justify-center space-x-1 mb-4">
          {[...Array(20)]?.map((_, i) => (
            <div
              key={i}
              className="w-1 bg-accent rounded-full transition-all duration-100"
              style={{
                height: `${8 + (audioLevel * 40 * Math.random())}px`,
                opacity: audioLevel > 0.1 ? 1 : 0.3
              }}
            />
          ))}
        </div>
      )}
      {/* Transcript Display */}
      {transcript && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Transcript</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs text-success">{Math.round(confidence * 100)}% confident</span>
            </div>
          </div>
          <p className="text-sm text-foreground">{transcript}</p>
        </div>
      )}
      {/* Voice Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            className="opacity-70 hover:opacity-100"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Volume2"
            className="opacity-70 hover:opacity-100"
          />
        </div>

        <div className="flex items-center space-x-2">
          {transcript && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                onClick={() => {
                  setTranscript('');
                  setConfidence(0);
                }}
              />
              <Button
                variant="default"
                size="sm"
                iconName="Send"
                onClick={handleSendVoiceMessage}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              />
            </>
          )}
        </div>
      </div>
      {/* Voice Status */}
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">
          {isListening 
            ? 'Listening... Speak now' :'Click microphone to start voice input'
          }
        </p>
      </div>
    </div>
  );
};

export default VoiceControls;