'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu } from 'lucide-react';
import { api } from '@/lib/api';

export default function DashboardNavbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      
      // Fetch full name for staff/teachers if not present
      if (currentUser.role === 'ROLE_TEACHER' || currentUser.role === 'ROLE_STAFF' || currentUser.role === 'ROLE_ADMIN') {
        api.getStaffProfile().then(profile => {
          if (profile && profile.name) {
            setUser((prev: any) => ({ ...prev, fullName: profile.name }));
          }
        });
      }
    }
  }, []);

  const handleLogout = () => {
    api.logout();
    router.push('/login');
  };

  const displayName = user?.fullName || user?.username || 'User';

  return (
    <header className="h-20 bg-[#e1f5f8] border-b border-cyan-100 shadow-sm flex items-center justify-between px-8 relative z-10">
      {/* Left: Branding */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-12 h-12 flex-shrink-0">
          <img src="/img/favicon.png" alt="AMV Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-[#2ab0c5] leading-none tracking-tight uppercase">AMV</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mt-1">
            Andiambalama MV
          </span>
        </div>
      </Link>

      {/* Hamburger Menu for Mobile */}
      {onMenuToggle && (
        <button 
          onClick={onMenuToggle}
          className="md:hidden flex items-center justify-center p-2 text-[#2ab0c5] hover:bg-cyan-50 rounded-lg transition-colors"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Right: User Identity & Action */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex flex-col items-end border-r border-cyan-200 pr-8">
          <span className="text-base font-black text-slate-800 leading-none">{displayName}</span>
          <span className="text-[11px] font-bold text-[#2ab0c5] uppercase tracking-[0.2em] mt-1.5">
            Index: {user?.username}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-[#2ab0c5] hover:bg-[#239fb4] text-white px-8 py-3 rounded-full font-black text-sm transition-all active:scale-95 shadow-lg shadow-cyan-200"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </header>
  );
}
