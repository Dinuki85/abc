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
    <aside className="h-full w-64 bg-white/40 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl flex flex-col pt-8">
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems
          .map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-xl transition-all duration-300 group relative ${
                  active 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 font-bold' 
                    : 'text-slate-700 hover:bg-white/80 hover:text-blue-600 hover:font-bold'
                }`}
              >
                {active && (
                  <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                )}
                <Icon size={20} className={`mr-3 ${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'} transition-all duration-300 group-hover:scale-110`} />
                <span className="text-[15px] font-medium tracking-tight">{item.name}</span>
              </Link>
            );
          })}
      </div>
    </aside>
  );
}
// Step 8-3 - Add group-hover animations to Sidebar icons
// Step 8-6 - Add registration tab to adminMenuItems in layout.tsx
// Step 8-9 - Refine Sidebar width and padding for better readability
// Step 8-12 - Add showSaveButton state to AdminLayout
// Step 8-15 - Implement logic to show/hide buttons based on pathname
// Step 8-18 - Add tooltips placeholder for sidebar collapsed state
// Step 8-21 - Add micro-animations for button transitions
// Step 8-24 - Implement hover-dependent shadow on sidebar items
// Step 8-27 - Refine border colors for dark mode compatibility
// Step 8-30 - Final cleanup of Frontend Layout & Sidebar for Step 8
