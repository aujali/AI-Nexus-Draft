import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ShareModal = ({ isOpen, onClose, conversation, onShare }) => {
  const [shareMethod, setShareMethod] = useState('link');
  const [shareLink, setShareLink] = useState('');
  const [emailRecipients, setEmailRecipients] = useState('');
  const [includeAISummary, setIncludeAISummary] = useState(true);
  const [allowComments, setAllowComments] = useState(false);
  const [expirationTime, setExpirationTime] = useState('never');
  const [isSharing, setIsSharing] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareMethodOptions = [
    { value: 'link', label: 'Shareable Link', description: 'Generate a secure link' },
    { value: 'email', label: 'Email Invitation', description: 'Send via email' },
    { value: 'team', label: 'Team Workspace', description: 'Share with team members' }
  ];

  const expirationOptions = [
    { value: 'never', label: 'Never expires' },
    { value: '1hour', label: '1 hour' },
    { value: '24hours', label: '24 hours' },
    { value: '7days', label: '7 days' },
    { value: '30days', label: '30 days' }
  ];

  const generateShareLink = () => {
    const baseUrl = window.location?.origin;
    const shareId = `${conversation?.id}-${Date.now()}`;
    return `${baseUrl}/shared/conversation/${shareId}`;
  };

  const handleGenerateLink = () => {
    const link = generateShareLink();
    setShareLink(link);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareOptions = {
      method: shareMethod,
      link: shareLink,
      recipients: emailRecipients?.split(',')?.map(email => email?.trim()),
      includeAISummary,
      allowComments,
      expirationTime
    };

    try {
      await onShare(conversation?.id, shareOptions);
      onClose();
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-lg w-full mx-4 animate-bounce-gentle">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="bg-secondary/10 text-secondary p-2 rounded-lg">
              <Icon name="Share2" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Share Conversation</h2>
              <p className="text-sm text-muted-foreground">Collaborate with others securely</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="hover:bg-destructive/10 hover:text-destructive"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Conversation Info */}
          <div className="bg-background rounded-lg p-4 border border-border">
            <h3 className="font-medium text-foreground mb-2">{conversation?.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={14} />
                <span>{conversation?.messageCount} messages</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Lock" size={14} />
                <span>Private conversation</span>
              </span>
            </div>
          </div>

          {/* Share Method */}
          <div>
            <Select
              label="Share Method"
              options={shareMethodOptions}
              value={shareMethod}
              onChange={setShareMethod}
            />
          </div>

          {/* Share Link */}
          {shareMethod === 'link' && (
            <div className="space-y-3">
              {!shareLink ? (
                <Button
                  variant="outline"
                  iconName="Link"
                  iconPosition="left"
                  onClick={handleGenerateLink}
                  fullWidth
                >
                  Generate Shareable Link
                </Button>
              ) : (
                <div>
                  <Input
                    label="Shareable Link"
                    value={shareLink}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName={linkCopied ? "Check" : "Copy"}
                    iconPosition="left"
                    onClick={handleCopyLink}
                    className={`mt-2 ${linkCopied ? 'text-success border-success' : ''}`}
                  >
                    {linkCopied ? 'Copied!' : 'Copy Link'}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Email Recipients */}
          {shareMethod === 'email' && (
            <div>
              <Input
                label="Email Recipients"
                type="email"
                placeholder="Enter email addresses separated by commas"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e?.target?.value)}
                description="Recipients will receive an invitation to view this conversation"
              />
            </div>
          )}

          {/* Team Workspace */}
          {shareMethod === 'team' && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Team Workspace</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This conversation will be shared with all members of your team workspace.
              </p>
            </div>
          )}

          {/* Share Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Share Options</h4>
            
            <Checkbox
              label="Include AI-generated summary"
              description="Share the AI summary along with the conversation"
              checked={includeAISummary}
              onChange={(e) => setIncludeAISummary(e?.target?.checked)}
            />
            
            <Checkbox
              label="Allow comments"
              description="Recipients can add comments to the shared conversation"
              checked={allowComments}
              onChange={(e) => setAllowComments(e?.target?.checked)}
            />
          </div>

          {/* Expiration */}
          <div>
            <Select
              label="Link Expiration"
              options={expirationOptions}
              value={expirationTime}
              onChange={setExpirationTime}
            />
          </div>

          {/* Privacy Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-warning mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-warning mb-1">Privacy & Security</p>
                <p className="text-muted-foreground">
                  Shared conversations are encrypted and only accessible to recipients. 
                  You can revoke access at any time from your sharing dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSharing}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Share2"
            iconPosition="left"
            onClick={handleShare}
            loading={isSharing}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            {isSharing ? 'Sharing...' : 'Share Conversation'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;