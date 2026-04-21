'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, Clock, ShieldCheck, School } from 'lucide-react';
import { api } from '@/lib/api';

export default function DashboardNavbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      
      if (currentUser.role === 'ROLE_TEACHER' || currentUser.role === 'ROLE_STAFF' || currentUser.role === 'ROLE_ADMIN') {
        api.getStaffProfile().then(profile => {
          if (profile && profile.name) {
            setUser((prev: any) => ({ ...prev, fullName: profile.name }));
          }
        });
      }
    }

    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    api.logout();
    router.push('/login');
  };

  const displayName = user?.fullName || user?.username || 'Administrator';

  return (
    <header className="h-20 bg-[#1e3a8a] border-b-4 border-amber-500 shadow-xl flex items-center justify-between px-8 relative z-[60] text-white w-full">
      {/* Branding */}
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="lg:hidden flex items-center justify-center p-2 text-white hover:bg-white/10 rounded-lg transition-colors mr-2"
          >
            <Menu size={24} />
          </button>
        )}
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1e3a8a] shadow-inner border border-white">
          <School size={28} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white leading-none tracking-tight uppercase italic">AMV Portal</span>
          <span className="text-[9px] font-bold text-blue-200 uppercase tracking-[0.2em] mt-1">
            Andiambalama Maha Vidhyalaya
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-8">
        {/* Server Time */}
        <div className="hidden lg:flex flex-col items-end border-r border-blue-700/50 pr-8">
          <span className="text-[9px] font-black text-blue-300 uppercase tracking-[0.2em]">Real-time Status</span>
          <div className="flex items-center gap-2 text-base font-black tabular-nums">
            <Clock size={14} className="text-amber-500" />
            {time || '--:--:--'}
          </div>
        </div>

        {/* User Identity */}
        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-[#1e3a8a] font-black shadow-lg ring-2 ring-white/20 group-hover:ring-amber-500/50 transition-all">
            {displayName[0].toUpperCase()}
          </div>
          <div className="hidden md:flex flex-col">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={10} className="text-amber-500" />
              <span className="text-[9px] font-bold text-blue-200 uppercase tracking-widest leading-none">
                {user?.role?.replace('ROLE_', '') || 'ADMIN'}
              </span>
            </div>
            <span className="text-sm font-black mt-1 leading-none">{displayName}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-black text-xs transition-all active:scale-95 shadow-lg shadow-rose-900/20 uppercase tracking-widest"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

