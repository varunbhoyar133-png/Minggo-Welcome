import { SavedProject, ShopSettings, InvitationData, StyleCustomization, Template } from '../types';
import { getTemplateById } from '../templates';
import { renderInvitationToCanvas } from './exportEngine';

const STORAGE_KEYS = {
  PROJECTS: 'invitestudio_saved_projects_v1',
  FAVORITES: 'invitestudio_favorite_templates_v1',
  SETTINGS: 'invitestudio_shop_settings_v1',
  ACTIVE_PROJECT_ID: 'invitestudio_active_project_id_v1',
};

export const defaultShopSettings: ShopSettings = {
  shopName: 'MINGGO Studio Partner',
  shopPhone: '+91 98765 43210',
  shopAddress: 'Civil Lines, Nagpur, Maharashtra',
  includeShopBranding: false,
  includeMinggoWatermark: false, // Disabled by default per user specification
  defaultExportSize: 'standard',
  autoSave: true,
};

// 1. Projects Management
export function getSavedProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse saved projects from localStorage', err);
    return [];
  }
}

export function saveProject(project: SavedProject): void {
  try {
    const projects = getSavedProjects();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    if (existingIndex >= 0) {
      projects[existingIndex] = { ...project, updatedAt: Date.now() };
    } else {
      projects.unshift({ ...project, updatedAt: Date.now() });
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save project to localStorage', err);
  }
}

export function deleteProject(id: string): void {
  try {
    const projects = getSavedProjects().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to delete project', err);
  }
}

export function duplicateProject(id: string): SavedProject | null {
  try {
    const projects = getSavedProjects();
    const found = projects.find((p) => p.id === id);
    if (!found) return null;

    const copy: SavedProject = {
      ...found,
      id: 'proj_' + Math.random().toString(36).substring(2, 9),
      projectName: `${found.projectName} (Copy)`,
      updatedAt: Date.now(),
    };
    projects.unshift(copy);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return copy;
  } catch (err) {
    console.error('Failed to duplicate project', err);
    return null;
  }
}

// 2. Favorites Management
export function getFavoriteTemplateIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!raw) return ['kids-dino', 'balloons-rosegold', 'floral-eucalyptus', 'luxury-artdeco', 'pastel-baby-dream'];
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function toggleFavoriteTemplate(templateId: string): boolean {
  try {
    const favs = getFavoriteTemplateIds();
    const idx = favs.indexOf(templateId);
    let isNowFavorite = false;
    if (idx >= 0) {
      favs.splice(idx, 1);
      isNowFavorite = false;
    } else {
      favs.push(templateId);
      isNowFavorite = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    return isNowFavorite;
  } catch (err) {
    console.error('Failed to toggle favorite', err);
    return false;
  }
}

export function isTemplateFavorite(templateId: string): boolean {
  return getFavoriteTemplateIds().includes(templateId);
}

// 3. Shop Settings Management
export function getShopSettings(): ShopSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return defaultShopSettings;
    return { ...defaultShopSettings, ...JSON.parse(raw) };
  } catch (err) {
    return defaultShopSettings;
  }
}

export function saveShopSettings(settings: ShopSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save shop settings', err);
  }
}

/**
 * Generate a fast thumbnail preview for saved projects
 */
export function generateProjectThumbnail(
  template: Template,
  data: InvitationData,
  styles: StyleCustomization,
  loadedPhoto: HTMLImageElement | null
): string {
  try {
    const thumbCanvas = document.createElement('canvas');
    renderInvitationToCanvas(
      thumbCanvas,
      template,
      data,
      styles,
      300,
      400,
      loadedPhoto,
      false
    );
    return thumbCanvas.toDataURL('image/jpeg', 0.8);
  } catch (err) {
    return '';
  }
}
