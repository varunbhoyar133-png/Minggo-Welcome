import React, { useMemo, useState } from 'react';
import { Template, TemplateCategory } from '../types';
import { allTemplates, templateCategories } from '../templates';
import { TemplateCard } from './TemplateCard';
import { 
  Search, 
  Heart, 
  Filter, 
  Sparkles, 
  Smile, 
  PartyPopper, 
  Flower2, 
  LayoutGrid, 
  Crown, 
  Flame, 
  X 
} from 'lucide-react';

interface TemplateGalleryProps {
  activeTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  favoriteIds: string[];
  onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
  filterFavoritesOnly?: boolean;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  activeTemplate,
  onSelectTemplate,
  favoriteIds,
  onToggleFavorite,
  filterFavoritesOnly = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'name'>('recommended');
  const [showOnlyFavs, setShowOnlyFavs] = useState<boolean>(filterFavoritesOnly);

  // Icon mapping for categories
  const categoryIcons: Record<string, React.ElementType> = {
    all: Sparkles,
    kids: Smile,
    pastel_teddy: Heart,
    balloons: PartyPopper,
    floral: Flower2,
    modern_minimal: LayoutGrid,
    luxury_gold: Crown,
    party: Flame,
  };

  // Filtered and sorted templates
  const filteredTemplates = useMemo(() => {
    let result = [...allTemplates];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Favorites filter
    if (showOnlyFavs) {
      result = result.filter((t) => favoriteIds.includes(t.id));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, showOnlyFavs, searchQuery, sortBy, favoriteIds]);

  return (
    <div className="space-y-6">
      {/* Top Gallery Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Template Library</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-700">
              {allTemplates.length} Unique Designs
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose from 50+ professionally designed, vector-rendered invitation templates.
          </p>
        </div>

        {/* Search & Favorites Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by theme, color..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Favorites Only Toggle */}
          <button
            onClick={() => setShowOnlyFavs(!showOnlyFavs)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              showOnlyFavs
                ? 'bg-rose-50 text-rose-700 border-rose-300 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showOnlyFavs ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Favorites</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 ml-0.5">
              {favoriteIds.length}
            </span>
          </button>
        </div>
      </div>

      {/* Category Pills Slider / Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {templateCategories.map((cat) => {
          const Icon = categoryIcons[cat.id] || Sparkles;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-sm font-semibold shadow-brand-500/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredTemplates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              isSelected={activeTemplate.id === tmpl.id}
              isFavorite={favoriteIds.includes(tmpl.id)}
              onSelect={onSelectTemplate}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">No templates matched your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try clearing the search query or selecting a different category to view all 50 designs.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setShowOnlyFavs(false);
            }}
            className="mt-4 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-medium transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
