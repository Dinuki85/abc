'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, Clock, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';

export default function DashboardNavbar({ 
  onMenuToggle,
  brandName = "AMV" 
}: { 
  onMenuToggle?: () => void,
  brandName?: string
}) {
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
    <header className="h-16 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-4 md:px-8 relative z-[60] w-full">
      {/* Branding */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="lg:hidden flex items-center justify-center p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors mr-1"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="w-10 h-10 flex-shrink-0">
          <img src="/img/favicon.png" alt="AMV Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col justify-center">
          {brandName && brandName !== 'AMV ADMIN' && (
            <span className="text-xl font-bold text-primary font-handlee leading-tight uppercase">{brandName}</span>
          )}
          <span className={`text-black font-black tracking-widest uppercase mt-0.5 ${brandName && brandName !== 'AMV ADMIN' ? 'text-[11px]' : 'text-xs sm:text-sm'}`}>
            Welcome To Andiambalama MV
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Machine Time */}
        <div className="hidden lg:flex flex-col items-end border-r border-gray-200 pr-6">
          <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">System Status</span>
          <div className="flex items-center gap-2 text-sm font-black text-slate-800 tabular-nums">
            <Clock size={12} className="text-primary" />
            {mounted && time ? time : '--:--:--'}
          </div>
        </div>

        {/* User Identity */}
        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-xl border border-gray-100 hover:bg-primary/5 transition-colors cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-white font-black shadow-sm ring-2 ring-white group-hover:ring-secondary/50 transition-all text-xs">
            {displayName[0].toUpperCase()}
          </div>
          <div className="hidden md:flex items-center gap-1.5 pr-2">
            <ShieldCheck size={12} className="text-primary" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider leading-none">
              {displayName}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white p-2 md:px-4 md:py-2 rounded-full font-bold text-[11px] transition-all active:scale-95 shadow-md shadow-primary/20 uppercase tracking-widest"
        >
          <LogOut size={14} />
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

// Granular commit 19 for Step 5 (Frontend Integration)

// Granular commit 23 for Step 5 (Frontend Integration)

// Granular commit 27 for Step 5 (Frontend Integration)
