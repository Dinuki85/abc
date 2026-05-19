'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, Landmark, ShieldCheck, Activity, FileSpreadsheet } from 'lucide-react';

const routeLabels: Record<string, { label: string; icon?: React.ComponentType<any> }> = {
  admin: { label: 'Dashboard', icon: Home },
  institutional: { label: 'Institutional Administration', icon: Landmark },
  registration: { label: 'Registration', icon: ShieldCheck },
  performance: { label: 'Performance', icon: Activity },
  reporting: { label: 'Reporting & Display', icon: FileSpreadsheet },
  students: { label: 'Student Management' },
  staff: { label: 'Staff Management' },
  parents: { label: 'Guardian Management' },
  grades: { label: 'Section Management' },
  subjects: { label: 'Subject Management' },
  classes: { label: 'Class Management' },
};

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/admin') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-1 select-none">
      <div className="flex items-center flex-wrap gap-1.5 md:gap-2">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const config = routeLabels[segment] || { label: segment.charAt(0).toUpperCase() + segment.slice(1) };
          const Icon = config.icon;

          return (
            <div key={href} className="flex items-center gap-1.5 md:gap-2">
              {index > 0 && (
                <ChevronRight size={14} className="text-slate-400 stroke-[3]" />
              )}
              {isLast ? (
                <span className="flex items-center gap-1.5 text-xs md:text-sm font-black text-black tracking-tight bg-slate-200/60 px-2.5 py-1 rounded-lg border border-slate-300/40">
                  {Icon && <Icon size={14} className="text-black stroke-[2.5]" />}
                  {config.label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-500 hover:text-black hover:bg-slate-200/30 px-2 py-1 rounded-lg transition-all duration-200 active:scale-95 tracking-tight"
                >
                  {Icon && <Icon size={14} className="text-slate-500 stroke-[2.2] group-hover:text-black" />}
                  {config.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
