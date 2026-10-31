import React, { useState } from 'react';
import { SavedProject } from '../types';
import { 
  FolderClock, 
  Search, 
  PlusCircle, 
  Trash2, 
  Copy, 
  Edit3, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Check,
  X
} from 'lucide-react';

interface RecentProjectsProps {
  projects: SavedProject[];
  onOpenProject: (project: SavedProject) => void;
  onDuplicateProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newName: string) => void;
  onNavigateToEditor: () => void;
}

export const RecentProjects: React.FC<RecentProjectsProps> = ({
  projects,
  onOpenProject,
  onDuplicateProject,
  onDeleteProject,
  onRenameProject,
  onNavigateToEditor,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState<string>('');

  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      p.projectName.toLowerCase().includes(q) ||
      p.data.birthdayName.toLowerCase().includes(q) ||
      (p.data.venueName && p.data.venueName.toLowerCase().includes(q))
    );
  });

  const startRename = (project: SavedProject) => {
    setEditingId(project.id);
    setEditNameValue(project.projectName);
  };

  const saveRename = (id: string) => {
    if (editNameValue.trim()) {
      onRenameProject(id, editNameValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Recent Projects</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {projects.length} Saved
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Saved customer invitations stored locally on this computer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm"
            />
          </div>

          <button
            onClick={onNavigateToEditor}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all shadow-brand-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Invitation</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const isEditing = editingId === project.id;
            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-brand-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Title & Rename input */}
                  {isEditing ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={editNameValue}
                        onChange={(e) => setEditNameValue(e.target.value)}
                        autoFocus
                        className="flex-1 px-2 py-1 text-xs font-bold border border-brand-500 rounded-lg focus:outline-none"
                      />
                      <button
                        onClick={() => saveRename(project.id)}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-slate-900 truncate">
                        {project.projectName}
                      </h3>
                      <button
                        onClick={() => startRename(project)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded"
                        title="Rename Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Customer Info */}
                  <div className="space-y-1.5 mt-2 text-xs text-slate-600">
                    <p className="font-medium text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-500" />
                      <span>{project.data.birthdayName}</span>
                      {project.data.age && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-50 text-brand-700 font-semibold">
                          Turning {project.data.age}
                        </span>
                      )}
                    </p>

                    <p className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.data.birthDate || 'No date set'}</span>
                      {project.data.eventTime && <span>• {project.data.eventTime}</span>}
                    </p>

                    {project.data.venueName && (
                      <p className="flex items-center gap-1.5 text-slate-500 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{project.data.venueName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDuplicateProject(project.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${project.projectName}"?`)) {
                          onDeleteProject(project.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenProject(project)}
                      className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-all"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <FolderClock className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">
            {searchQuery ? 'No matching projects found' : 'No saved invitations yet'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'Try searching with a different name or keyword.'
              : 'Create an invitation in the editor and click "Save Project" to store it for future editing and reprints.'}
          </p>
          <button
            onClick={onNavigateToEditor}
            className="mt-4 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-medium transition-all"
          >
            Create Your First Invitation
          </button>
        </div>
      )}
    </div>
  );
};
