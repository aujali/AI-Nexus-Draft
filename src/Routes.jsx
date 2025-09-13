import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ChatInterface from './pages/chat-interface-immersive-ai-experience';
import AICapabilitiesShowcase from './pages/ai-capabilities-showcase';
import ConversationHistoryDashboard from './pages/conversation-history-dashboard';
import Homepage from './pages/homepage-ai-conversational-platform';
import VoiceExperienceCenter from './pages/voice-experience-center';
import PersonalizationHub from './pages/personalization-hub-ai-avatar-customization';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AICapabilitiesShowcase />} />
        <Route path="/chat-interface-immersive-ai-experience" element={<ChatInterface />} />
        <Route path="/ai-capabilities-showcase" element={<AICapabilitiesShowcase />} />
        <Route path="/conversation-history-dashboard" element={<ConversationHistoryDashboard />} />
        <Route path="/homepage-ai-conversational-platform" element={<Homepage />} />
        <Route path="/voice-experience-center" element={<VoiceExperienceCenter />} />
        <Route path="/personalization-hub-ai-avatar-customization" element={<PersonalizationHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
