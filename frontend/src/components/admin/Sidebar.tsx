'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  UserSquare2, 
  BookOpen, 
  Users2, 
  Trophy, 
  FileCheck, 
  Settings,
  LogOut,
  Award
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Staff', href: '/admin/staff', icon: UserSquare2 },
  { name: 'Classes', href: '/admin/classes', icon: BookOpen },
  { name: 'Parents', href: '/admin/parents', icon: Users2 },
  { name: 'Sports', href: '/admin/sports', icon: Trophy },
  { name: 'Cocircular', href: '/admin/cocircular', icon: Award },
  { name: 'Exams', href: '/admin/exams', icon: FileCheck },
  { name: 'Users', href: '/admin/users', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform translate-x-0 bg-white/40 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-white/20">
        <Link href="/admin" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          EduAdmin
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
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                  : 'text-slate-600 hover:bg-white/60 hover:text-blue-600'
              }`}
            >
              <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/20">
        <Link
          href="/"
          className="flex items-center px-3 py-3 rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors group"
        >
          <LogOut size={20} className="mr-3 text-slate-400 group-hover:text-rose-600 transition-colors" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
