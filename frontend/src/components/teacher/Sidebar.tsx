'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  FileCheck, 
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  GraduationCap
} from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
  { name: 'My Class', href: '/teacher/students', icon: GraduationCap },
  { name: 'Verification', href: '/teacher/verify', icon: FileCheck },
  { name: 'Security', href: '/teacher/profile', icon: ShieldCheck },
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    api.logout();
    router.push('/login');
  };

  return (
    <aside className="h-full w-64 bg-white/40 backdrop-blur-xl border-r border-cyan-100 shadow-2xl flex flex-col pt-4">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = item.href === '/teacher' 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-200 translate-x-1' 
                  : 'text-slate-500 hover:bg-cyan-50 hover:text-cyan-600'
              }`}
            >
              <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-600'} transition-colors`} />
              <span className={`font-bold tracking-tight ${isActive ? 'translate-x-1' : ''} transition-transform`}>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-cyan-50 bg-slate-50/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-2xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all group text-left"
        >
          <LogOut size={20} className="mr-3 text-slate-300 group-hover:text-rose-600 transition-colors" />
          <span className="font-bold tracking-tight">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
