'use client';

import { Bell, Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 px-6 bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-sm flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center flex-1">
        <button className="md:hidden mr-4 text-slate-500 hover:text-slate-700">
          <Menu size={24} />
        </button>
        
        <div className="relative max-w-md w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors shadow-inner"
            placeholder="Search across modules..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-slate-400 hover:text-blue-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold">3</span>
          </span>
        </button>

        <div className="flex items-center">
          <img
            className="h-9 w-9 rounded-full border-2 border-slate-200 object-cover"
            src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
            alt="Admin User"
          />
          <span className="ml-3 font-medium text-sm text-slate-700 hidden sm:block">Admin User</span>
        </div>
      </div>
    </header>
  );
}
