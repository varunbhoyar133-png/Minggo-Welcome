import React from 'react';
import { TvWelcomeScreen } from './components/TvWelcomeScreen';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
      {/* Top Studio Brand Header */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xs">
              <img 
                src="/minggo-logo-tight.png" 
                alt="MinGGo" 
                className="h-7 w-auto object-contain" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  MinGGo
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-600">
                  TV Welcome Screen Studio
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 tracking-wider border border-brand-200">
                  16:9 DISPLAY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Making Every Celebration Special • In-Store TV Displays & Play Zones
              </p>
            </div>
          </div>

          {/* Quick Info Pill */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Full HD 1080p & 4K Ultra HD</span>
          </div>
        </div>
      </header>

      {/* Main TV Screen Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <TvWelcomeScreen />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-400">
        <p>MinGGo TV Welcome Screen Studio © 2026 • Powered by MinGGo Toys & Gifts</p>
      </footer>
    </div>
  );
};

export default App;
