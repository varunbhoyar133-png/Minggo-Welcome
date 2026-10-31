import React from 'react';
import { Template } from '../types';
import { allTemplates } from '../templates';
import { TemplateCard } from './TemplateCard';
import { Heart, Sparkles, LayoutTemplate } from 'lucide-react';

interface FavoritesPageProps {
  favoriteIds: string[];
  activeTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
  onNavigateToTemplates: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favoriteIds,
  activeTemplate,
  onSelectTemplate,
  onToggleFavorite,
  onNavigateToTemplates,
}) => {
  const favoriteTemplates = allTemplates.filter((t) => favoriteIds.includes(t.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Favorite Templates</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
              {favoriteTemplates.length} Saved
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Your quick-access collection of go-to templates for fast order fulfillment.
          </p>
        </div>

        <button
          onClick={onNavigateToTemplates}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
        >
          <LayoutTemplate className="w-4 h-4 text-slate-500" />
          <span>Browse All 50+</span>
        </button>
      </div>

      {favoriteTemplates.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favoriteTemplates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              isSelected={activeTemplate.id === tmpl.id}
              isFavorite={true}
              onSelect={onSelectTemplate}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">No favorites saved yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click the heart icon on any template in the gallery to add it to your quick-access favorites list.
          </p>
          <button
            onClick={onNavigateToTemplates}
            className="mt-4 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-medium transition-all"
          >
            Explore Template Library
          </button>
        </div>
      )}
    </div>
  );
};
