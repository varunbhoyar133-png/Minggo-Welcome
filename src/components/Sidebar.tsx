import React from 'react';
import { 
  PlusCircle, 
  LayoutTemplate, 
  FolderClock, 
  Heart, 
  Settings, 
  Home, 
  Store,
  ChevronRight,
  X,
  Tv
} from 'lucide-react';
import { ShopSettings } from '../types';

export type NavTab = 'dashboard' | 'editor' | 'tv_screen' | 'templates' | 'projects' | 'favorites' | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  savedCount: number;
  favoritesCount: number;
  shopSettings: ShopSettings;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  favoritesCount,
  shopSettings,
  isOpen,
  onCloseMobile,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'editor', label: 'Create Invitation', icon: PlusCircle },
    { id: 'tv_screen', label: 'TV Welcome Screen', icon: Tv, badge: 'NEW' },
    { id: 'templates', label: 'All Templates', icon: LayoutTemplate, badge: '50+' },
    { id: 'projects', label: 'Recent Projects', icon: FolderClock, badge: savedCount > 0 ? savedCount : undefined },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: favoritesCount > 0 ? favoritesCount : undefined },
    { id: 'settings', label: 'Shop Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-warm-50/60">
          <div className="flex items-center gap-3">
            <div className="h-11 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
              <img 
                src="/minggo-logo-tight.png" 
                alt="MINGGO" 
                className="h-8 w-auto object-contain" 
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">MINGGO</span>
                <span className="text-xs font-semibold text-brand-600">Studio</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-brand-100 text-brand-700 tracking-wider">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                Making Every Celebration Special
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-4">
          <button
            onClick={() => {
              onSelectTab('editor');
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-medium text-sm shadow-md shadow-brand-500/25 transition-all duration-150"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Invitation</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isActive
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-brand-500" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Shop Info Footer Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              <Store className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {shopSettings.shopName || 'Printing Studio'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {shopSettings.shopPhone || 'Ready for Print & Export'}
              </p>
              <span className="inline-block mt-1 text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                ● 100% Client-Side Ready
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
