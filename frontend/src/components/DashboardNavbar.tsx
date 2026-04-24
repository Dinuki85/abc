'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, Clock, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';

export default function DashboardNavbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [time, setTime] = useState<string>('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      
      if (currentUser.role === 'ROLE_TEACHER' || currentUser.role === 'ROLE_STAFF' || currentUser.role === 'ROLE_ADMIN') {
        api.getStaffProfile().then(profile => {
          if (profile && profile.name) {
            setUser((prev: any) => ({ ...prev, fullName: profile.name }));
          }
        }).catch(err => console.error("Could not fetch staff profile for navbar", err));
      }
    }

    const now = new Date();
    setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    const timer = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    api.logout();
    router.push('/login');
  };

  const displayName = user?.fullName || user?.username || 'Administrator';

  return (
    <header className="h-20 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 relative z-[60] w-full">
      {/* Branding */}
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="lg:hidden flex items-center justify-center p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors mr-2"
          >
            <Menu size={24} />
          </button>
        )}
        <div className="w-12 h-12 flex-shrink-0">
          <img src="/img/favicon.png" alt="AMV Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary font-handlee leading-tight uppercase">AMV</span>
          <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-0.5">
            Andiambalama MV
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-8">
        {/* Machine Time */}
        <div className="hidden lg:flex flex-col items-end border-r border-gray-200 pr-8">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">System Status</span>
          <div className="flex items-center gap-2 text-base font-black text-slate-800 tabular-nums">
            <Clock size={14} className="text-primary" />
            {mounted && time ? time : '--:--:--'}
          </div>
        </div>

        {/* User Identity */}
        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-gray-100 hover:bg-primary/5 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white font-black shadow-md ring-2 ring-white group-hover:ring-secondary/50 transition-all">
            {displayName[0].toUpperCase()}
          </div>
          <div className="hidden md:flex flex-col">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={10} className="text-primary" />
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                {user?.role?.replace('ROLE_', '') || 'ADMIN'}
              </span>
            </div>
            <span className="text-sm font-bold text-slate-800 mt-1 leading-none">{displayName}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all active:scale-95 shadow-md shadow-primary/20 uppercase tracking-widest"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
}



// Granular commit 3 for Step 5 (Frontend Integration)

// Granular commit 7 for Step 5 (Frontend Integration)

// Granular commit 11 for Step 5 (Frontend Integration)

// Granular commit 15 for Step 5 (Frontend Integration)
