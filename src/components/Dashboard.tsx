import React from 'react';
import { 
  Template, 
  SavedProject, 
  ShopSettings 
} from '../types';
import { allTemplates } from '../templates';
import { NavTab } from './Sidebar';
import { 
  PlusCircle, 
  LayoutTemplate, 
  Sparkles, 
  Heart, 
  Printer, 
  FolderClock, 
  ArrowRight,
  Trash2,
  Copy,
  Tv,
  Maximize2
} from 'lucide-react';
import { TemplateCard } from './TemplateCard';

interface DashboardProps {
  onNavigate: (tab: NavTab) => void;
  savedProjects: SavedProject[];
  favoriteIds: string[];
  shopSettings: ShopSettings;
  activeTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
  onOpenProject: (project: SavedProject) => void;
  onDuplicateProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onApplyPreset: (presetId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  savedProjects,
  favoriteIds,
  shopSettings,
  activeTemplate,
  onSelectTemplate,
  onToggleFavorite,
  onOpenProject,
  onDuplicateProject,
  onDeleteProject,
  onApplyPreset,
}) => {
  // Featured templates: select one from each major category
  const featuredTemplates = allTemplates.filter((t) =>
    ['kids-dino', 'balloons-rosegold', 'floral-eucalyptus', 'luxury-artdeco', 'pastel-baby-dream'].includes(t.id)
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 p-6 md:p-8 text-white shadow-xl shadow-black/20 border border-slate-800">
        {/* Background glow patterns */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="h-12 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-md">
              <img src="/minggo-logo-tight.png" alt="MINGGO" className="h-9 w-auto object-contain" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 backdrop-blur-md border border-brand-500/30 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Making Every Celebration Special</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            MINGGO Invitation Studio
          </h1>
          <p className="mt-1 text-sm font-medium text-brand-400">
            Professional Birthday Invitation Maker for Indian Photo Studios, Printing Shops & Cyber Cafes
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Create high-resolution, print-ready birthday invitation cards and WhatsApp invitations in seconds. Handcrafted Canva Pro-grade artwork, dynamic typography, customer photo cropping, and 300 DPI exports.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('tv_screen')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-brand-500 text-slate-950 hover:brightness-105 active:scale-95 text-xs font-bold shadow-lg shadow-brand-500/20 transition-all"
            >
              <Tv className="w-4 h-4 text-slate-950" />
              <span>TV Welcome Screen (16:9)</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-black text-amber-300">NEW</span>
            </button>

            <button
              onClick={() => onNavigate('editor')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 active:scale-95 text-xs font-bold shadow-lg shadow-black/10 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-brand-700" />
              <span>Create New Invitation</span>
            </button>

            <button
              onClick={() => onNavigate('templates')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold border border-white/20 transition-all"
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>Explore 50+ Templates</span>
            </button>

            <button
              onClick={() => onApplyPreset('aarav-5')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-400/30 transition-all"
              title="Loads instant sample for fast preview"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>1-Click Indian Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{allTemplates.length}</p>
            <p className="text-xs text-slate-500 font-medium">Unique Templates</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <FolderClock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{savedProjects.length}</p>
            <p className="text-xs text-slate-500 font-medium">Saved Projects</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{favoriteIds.length}</p>
            <p className="text-xs text-slate-500 font-medium">Favorites</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">300 DPI</p>
            <p className="text-xs text-slate-500 font-medium">Studio Print Ready</p>
          </div>
        </div>
      </div>

      {/* TV Welcome Screen Spotlight Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 border border-brand-500/30 p-5 md:p-6 text-white shadow-xl shadow-black/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-xs font-bold text-amber-300">
            <Tv className="w-3.5 h-3.5" />
            <span>MinGGo Play Zone & Store Displays</span>
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
            TV Digital Welcome Screen Studio (16:9 Display)
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Instantly generate full-screen TV welcome displays like <em>&quot;Welcome to KAVYA&apos;s 7th Birthday Party!&quot;</em> with festive 3D balloons, confetti, and zone badges. Enter the child&apos;s name and present in Fullscreen on your TV!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => onNavigate('tv_screen')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Maximize2 className="w-4 h-4 text-slate-950" />
            <span>Launch TV Studio</span>
          </button>
        </div>
      </div>

      {/* Featured Templates Carousel/Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Trending & Popular Templates</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Top-selling styles preferred by customers</p>
          </div>

          <button
            onClick={() => onNavigate('templates')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 transition-colors"
          >
            <span>View All 50+</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredTemplates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              isSelected={activeTemplate.id === tmpl.id}
              isFavorite={favoriteIds.includes(tmpl.id)}
              onSelect={(t) => {
                onSelectTemplate(t);
                onNavigate('editor');
              }}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FolderClock className="w-4 h-4 text-emerald-600" />
              <span>Recent Invitations</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Quickly reopen, edit, or reprint previous orders</p>
          </div>

          {savedProjects.length > 0 && (
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 transition-colors"
            >
              <span>Manage Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {savedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {project.projectName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {project.data.birthdayName} {project.data.age ? `• Turning ${project.data.age}` : ''}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-1">
                    📍 {project.data.venueName || 'Venue not specified'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="flex-1 py-1.5 px-3 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold rounded-lg text-center transition-all"
                  >
                    Open & Edit
                  </button>

                  <button
                    onClick={() => onDuplicateProject(project.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Duplicate Project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200">
            <FolderClock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">No saved invitations yet</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Invitations you save in the editor will appear here for fast re-opening and printing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
