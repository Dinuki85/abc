'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  FileCheck, 
  Settings,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function StaffSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.getStaffProfile().then(setProfile);
  }, []);

  const handleLogout = () => {
    api.logout();
    router.push('/login');
  };

  const designations = profile?.staff?.designations || [];
  const isClassTeacher = designations.includes('CLASS_TEACHER');
  const isSectionHead = designations.includes('SECTION_HEAD');

  const menuItems = [
    { name: 'Dashboard', href: '/staff', icon: LayoutDashboard },
  ];

  if (isClassTeacher) {
    menuItems.push({ name: 'My Class', href: '/staff/my-class', icon: Users });
    menuItems.push({ name: 'Verification', href: '/staff/verify', icon: FileCheck });
  }

  if (isSectionHead) {
    menuItems.push({ name: 'Section Audit', href: '/staff/section', icon: ShieldCheck });
  }

  menuItems.push({ name: 'Settings', href: '/staff/settings', icon: Settings });

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform translate-x-0 bg-white/40 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col font-nunito">
      <div className="h-20 flex flex-col justify-center px-6 border-b border-white/20">
        <Link href="/staff" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Andiambalama MV
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Staff Portal</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/staff' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold' 
                  : 'text-slate-600 hover:bg-white/60 hover:text-blue-600'
              }`}
            >
              <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {profile && (
        <div className="p-4 mx-4 mb-4 rounded-3xl bg-white/50 border border-white/40 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold">
              {profile.staff.name[0]}
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-xs font-bold text-slate-800 truncate">{profile.staff.name}</p>
               <p className="text-[10px] text-slate-400 truncate">{designations[0]}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all text-xs font-bold border border-transparent hover:border-rose-100"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}
