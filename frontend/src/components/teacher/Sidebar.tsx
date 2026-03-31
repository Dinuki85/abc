'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  FileCheck, 
  Settings,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
  { name: 'My Students', href: '/teacher/students', icon: Users },
  { name: 'Verification', href: '/teacher/verify', icon: FileCheck },
  { name: 'Settings', href: '/teacher/settings', icon: Settings },
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    api.logout();
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform translate-x-0 bg-white/40 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-white/20">
        <Link href="/teacher" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
          EduTeacher
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30' 
                  : 'text-slate-600 hover:bg-white/60 hover:text-emerald-600'
              }`}
            >
              <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'} transition-colors`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-3 rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors group text-left"
        >
          <LogOut size={20} className="mr-3 text-slate-400 group-hover:text-rose-600 transition-colors" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
