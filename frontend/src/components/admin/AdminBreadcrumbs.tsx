'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BreadcrumbContext } from '@/app/admin/layout';
import { ChevronRight, Home, Landmark, ShieldCheck, Activity, FileSpreadsheet } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string | null;
  icon?: React.ComponentType<any>;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/admin', icon: Home }
  ];

  if (pathname === '/admin') {
    return [];
  }

  // Institutional Administration sub-pages
  if (pathname === '/admin/institutional') {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
  } else if (pathname.startsWith('/admin/students')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Student Management', href: '/admin/students' });
  } else if (pathname === '/admin/staff/assignment') {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Staff Management', href: '/admin/staff' });
    items.push({ label: 'Teacher Grade Assignment', href: '/admin/staff/assignment' });
  } else if (pathname.startsWith('/admin/staff')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Staff Management', href: '/admin/staff' });
  } else if (pathname.startsWith('/admin/parents')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Guardian Management', href: '/admin/parents' });
  } else if (pathname.startsWith('/admin/grades')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Section Management', href: '/admin/grades' });
  } else if (pathname.startsWith('/admin/subjects')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Subject Management', href: '/admin/subjects' });
  } else if (pathname.startsWith('/admin/classes')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Class Management', href: '/admin/classes' });
  } else if (pathname.startsWith('/admin/sports')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Sport Management', href: '/admin/sports' });
  } else if (pathname.startsWith('/admin/cocircular')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Co-Curricular Management', href: '/admin/cocircular' });
  } else if (pathname.startsWith('/admin/exams')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Exam Management', href: '/admin/exams' });
  } else if (pathname.startsWith('/admin/assignment')) {
    items.push({ label: 'Institutional Administration', href: '/admin/institutional', icon: Landmark });
    items.push({ label: 'Assignment Management', href: '/admin/assignment' });
  }

  // Registration sub-pages
  else if (pathname === '/admin/registration') {
    items.push({ label: 'Registration', href: '/admin/registration', icon: ShieldCheck });
  } else if (pathname.startsWith('/admin/registration/add-to-class')) {
    items.push({ label: 'Registration', href: '/admin/registration', icon: ShieldCheck });
    items.push({ label: 'Add To Classes', href: '/admin/registration/add-to-class' });
  } else if (pathname.startsWith('/admin/registration')) {
    items.push({ label: 'Registration', href: '/admin/registration', icon: ShieldCheck });
    const sub = pathname.replace('/admin/registration/', '');
    if (sub) {
      items.push({ label: sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, ' '), href: pathname });
    }
  }

  // Performance sub-pages
  else if (pathname === '/admin/performance') {
    items.push({ label: 'Performance', href: '/admin/performance', icon: Activity });
  } else if (pathname.startsWith('/admin/performance')) {
    items.push({ label: 'Performance', href: '/admin/performance', icon: Activity });
    const sub = pathname.replace('/admin/performance/', '');
    if (sub) {
      items.push({ label: sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, ' '), href: pathname });
    }
  }

  // Reporting sub-pages
  else if (pathname === '/admin/reporting') {
    items.push({ label: 'Reporting & Display', href: '/admin/reporting', icon: FileSpreadsheet });
  } else if (pathname.startsWith('/admin/reporting')) {
    items.push({ label: 'Reporting & Display', href: '/admin/reporting', icon: FileSpreadsheet });
    const sub = pathname.replace('/admin/reporting/', '');
    if (sub) {
      items.push({ label: sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, ' '), href: pathname });
    }
  }

  // Fallback
  else {
    const segments = pathname.split('/').filter(Boolean).slice(1);
    let currentHref = '/admin';
    for (const segment of segments) {
      currentHref += `/${segment}`;
      items.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        href: currentHref
      });
    }
  }

  return items;
}

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  const { dynamicSuffix } = React.useContext(BreadcrumbContext);
  const breadcrumbs = generateBreadcrumbs(pathname);

  if (dynamicSuffix) {
    breadcrumbs.push({ label: dynamicSuffix, href: null });
  }

  if (breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-1 select-none">
      <div className="flex items-center flex-wrap gap-1.5 md:gap-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const Icon = item.icon;

          return (
            <div key={index} className="flex items-center gap-1.5 md:gap-2">
              {index > 0 && (
                <ChevronRight size={12} className="text-slate-400 stroke-[3]" />
              )}
              {isLast || !item.href ? (
                <span className="flex items-center gap-1 text-[11px] md:text-xs font-black text-black tracking-tight bg-slate-200/60 px-2 py-0.5 rounded-lg border border-slate-300/40">
                  {Icon && <Icon size={12} className="text-black stroke-[2.5]" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-[11px] md:text-xs font-bold text-slate-500 hover:text-black hover:bg-slate-200/30 px-1.5 py-0.5 rounded-lg transition-all duration-200 active:scale-95 tracking-tight"
                >
                  {Icon && <Icon size={12} className="text-slate-500 stroke-[2.2] group-hover:text-black" />}
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
