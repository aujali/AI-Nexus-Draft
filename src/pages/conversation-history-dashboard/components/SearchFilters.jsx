import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ onSearch, onFilter, filters, onClearFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'longest', label: 'Longest Conversations' },
    { value: 'shortest', label: 'Shortest Conversations' },
    { value: 'mostMessages', label: 'Most Messages' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const tagOptions = [
    { value: 'creative', label: 'Creative Writing' },
    { value: 'business', label: 'Business Strategy' },
    { value: 'technical', label: 'Technical Help' },
    { value: 'personal', label: 'Personal Assistant' },
    { value: 'research', label: 'Research & Analysis' },
    { value: 'planning', label: 'Project Planning' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key, value) => {
    onFilter({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search conversations... Try 'creative writing from last month' or 'project planning discussions'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-12 pr-20"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            Search
          </Button>
        </div>
      </form>
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm font-medium text-foreground">Quick Filters:</span>
        <Button
          variant={filters?.dateRange === 'today' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('dateRange', 'today')}
        >
          Today
        </Button>
        <Button
          variant={filters?.dateRange === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('dateRange', 'week')}
        >
          This Week
        </Button>
        <Button
          variant={filters?.hasVoice ? 'default' : 'outline'}
          size="sm"
          iconName="Mic"
          iconPosition="left"
          onClick={() => handleFilterChange('hasVoice', !filters?.hasVoice)}
        >
          Voice Chats
        </Button>
        <Button
          variant={filters?.hasFiles ? 'default' : 'outline'}
          size="sm"
          iconName="Paperclip"
          iconPosition="left"
          onClick={() => handleFilterChange('hasFiles', !filters?.hasFiles)}
        >
          With Files
        </Button>
        <Button
          variant={filters?.isShared ? 'default' : 'outline'}
          size="sm"
          iconName="Users"
          iconPosition="left"
          onClick={() => handleFilterChange('isShared', !filters?.isShared)}
        >
          Shared
        </Button>
      </div>
      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
          iconPosition="left"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        >
          Advanced Filters
        </Button>
        
        {(filters?.dateRange !== 'all' || filters?.sortBy !== 'recent' || filters?.tags?.length > 0) && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Advanced Filters Panel */}
      {isAdvancedOpen && (
        <div className="mt-6 pt-6 border-t border-border animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Date Range */}
            <div>
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={filters?.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
              />
            </div>

            {/* Sort By */}
            <div>
              <Select
                label="Sort By"
                options={sortOptions}
                value={filters?.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
            </div>

            {/* Tags */}
            <div>
              <Select
                label="Filter by Tags"
                options={tagOptions}
                value={filters?.tags}
                onChange={(value) => handleFilterChange('tags', value)}
                multiple
                searchable
                placeholder="Select tags..."
              />
            </div>

            {/* Message Count Range */}
            <div>
              <Input
                label="Min Messages"
                type="number"
                placeholder="0"
                value={filters?.minMessages}
                onChange={(e) => handleFilterChange('minMessages', e?.target?.value)}
              />
            </div>

            <div>
              <Input
                label="Max Messages"
                type="number"
                placeholder="1000"
                value={filters?.maxMessages}
                onChange={(e) => handleFilterChange('maxMessages', e?.target?.value)}
              />
            </div>

            {/* Duration Range */}
            <div>
              <Input
                label="Min Duration (minutes)"
                type="number"
                placeholder="0"
                value={filters?.minDuration}
                onChange={(e) => handleFilterChange('minDuration', e?.target?.value)}
              />
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">Additional Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Include archived conversations"
                checked={filters?.includeArchived}
                onChange={(e) => handleFilterChange('includeArchived', e?.target?.checked)}
              />
              <Checkbox
                label="Only conversations with AI insights"
                checked={filters?.hasInsights}
                onChange={(e) => handleFilterChange('hasInsights', e?.target?.checked)}
              />
              <Checkbox
                label="Only breakthrough moments"
                checked={filters?.hasBreakthroughs}
                onChange={(e) => handleFilterChange('hasBreakthroughs', e?.target?.checked)}
              />
              <Checkbox
                label="Only collaborative sessions"
                checked={filters?.isCollaborative}
                onChange={(e) => handleFilterChange('isCollaborative', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;