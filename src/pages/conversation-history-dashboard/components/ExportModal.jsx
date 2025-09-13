import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const ExportModal = ({ isOpen, onClose, conversation, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeAISummary, setIncludeAISummary] = useState(true);
  const [customTitle, setCustomTitle] = useState(conversation?.title || '');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', description: 'Professional formatted document' },
    { value: 'docx', label: 'Word Document', description: 'Editable Microsoft Word format' },
    { value: 'txt', label: 'Plain Text', description: 'Simple text file' },
    { value: 'json', label: 'JSON Data', description: 'Structured data format' },
    { value: 'html', label: 'HTML Page', description: 'Web page format' },
    { value: 'markdown', label: 'Markdown', description: 'Markdown formatted text' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportOptions = {
      format: exportFormat,
      includeMetadata,
      includeTimestamps,
      includeAISummary,
      customTitle: customTitle || conversation?.title
    };

    try {
      await onExport(conversation?.id, exportOptions);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
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
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-md w-full mx-4 animate-bounce-gentle">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="bg-accent/10 text-accent p-2 rounded-lg">
              <Icon name="Download" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Export Conversation</h2>
              <p className="text-sm text-muted-foreground">Choose your export preferences</p>
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
                <Icon name="Timer" size={14} />
                <span>{conversation?.duration}</span>
              </span>
            </div>
          </div>

          {/* Custom Title */}
          <div>
            <Input
              label="Export Title"
              value={customTitle}
              onChange={(e) => setCustomTitle(e?.target?.value)}
              placeholder="Enter custom title for export"
            />
          </div>

          {/* Format Selection */}
          <div>
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Include in Export</h4>
            
            <Checkbox
              label="Metadata (date, duration, tags)"
              checked={includeMetadata}
              onChange={(e) => setIncludeMetadata(e?.target?.checked)}
            />
            
            <Checkbox
              label="Message timestamps"
              checked={includeTimestamps}
              onChange={(e) => setIncludeTimestamps(e?.target?.checked)}
            />
            
            <Checkbox
              label="AI-generated summary"
              checked={includeAISummary}
              onChange={(e) => setIncludeAISummary(e?.target?.checked)}
            />
          </div>

          {/* Preview */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Eye" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Export Preview</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Format: {formatOptions?.find(f => f?.value === exportFormat)?.label}</p>
              <p>• Size: ~{Math.ceil(conversation?.messageCount * 0.5)}KB estimated</p>
              <p>• Includes: {[
                includeMetadata && 'metadata',
                includeTimestamps && 'timestamps', 
                includeAISummary && 'AI summary'
              ]?.filter(Boolean)?.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
            loading={isExporting}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;