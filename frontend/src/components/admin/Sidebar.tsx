'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon, LogOut } from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname === href;
  };

  return (
    <aside className="h-full w-64 bg-white/40 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl flex flex-col pt-4">
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                active 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                  : 'text-slate-600 hover:bg-white/60 hover:text-blue-600'
              }`}
            >
              <Icon size={20} className={`mr-3 ${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`} />
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
// Step 8-3 - Add group-hover animations to Sidebar icons
// Step 8-6 - Add registration tab to adminMenuItems in layout.tsx
// Step 8-9 - Refine Sidebar width and padding for better readability
// Step 8-12 - Add showSaveButton state to AdminLayout
// Step 8-15 - Implement logic to show/hide buttons based on pathname
