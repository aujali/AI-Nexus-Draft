import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, isAITyping, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea?.scrollHeight;
      const maxHeight = 120; // 5 lines approximately
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      setIsExpanded(scrollHeight > 48); // 2 lines
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || attachments?.length > 0) {
      onSendMessage({
        text: message?.trim(),
        attachments: attachments,
        timestamp: new Date()
      });
      setMessage('');
      setAttachments([]);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev?.filter(att => att?.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return 'Image';
    if (type?.startsWith('video/')) return 'Video';
    if (type?.startsWith('audio/')) return 'Music';
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('document') || type?.includes('word')) return 'FileText';
    if (type?.includes('spreadsheet') || type?.includes('excel')) return 'Table';
    return 'File';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-soft">
      {/* Attachments Preview */}
      {attachments?.length > 0 && (
        <div className="p-3 border-b border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Paperclip" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {attachments?.length} attachment{attachments?.length > 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {attachments?.map((attachment) => (
              <div
                key={attachment?.id}
                className="flex items-center space-x-2 bg-muted/50 rounded-lg p-2 group"
              >
                {attachment?.preview ? (
                  <img
                    src={attachment?.preview}
                    alt={attachment?.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <Icon name={getFileIcon(attachment?.type)} size={16} className="text-primary" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {attachment?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(attachment?.size)}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="X"
                  onClick={() => removeAttachment(attachment?.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          <div className="flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconName="Paperclip"
              onClick={() => fileInputRef?.current?.click()}
              className="opacity-70 hover:opacity-100"
            />
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isAITyping}
              className="w-full resize-none border-0 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0 text-sm leading-relaxed"
              style={{ minHeight: '48px' }}
            />
            
            {/* Character Count */}
            {message?.length > 100 && (
              <div className="absolute bottom-1 right-1 text-xs text-muted-foreground">
                {message?.length}/2000
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Voice Input Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconName="Mic"
              className="opacity-70 hover:opacity-100"
            />

            {/* Send Button */}
            <Button
              type="submit"
              variant="default"
              size="sm"
              iconName="Send"
              disabled={!message?.trim() && attachments?.length === 0}
              loading={isAITyping}
              className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Quick Actions */}
        {isExpanded && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border animate-fade-in">
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="xs"
                iconName="Smile"
                className="opacity-70 hover:opacity-100"
              />
              <Button
                type="button"
                variant="ghost"
                size="xs"
                iconName="AtSign"
                className="opacity-70 hover:opacity-100"
              />
              <Button
                type="button"
                variant="ghost"
                size="xs"
                iconName="Hash"
                className="opacity-70 hover:opacity-100"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
          </div>
        )}
      </form>
      {/* AI Status */}
      {isAITyping && (
        <div className="px-4 pb-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>AI is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;