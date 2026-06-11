'use client';

import Sidebar from "@/components/admin/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import React, { createContext } from "react";
import { api } from "@/lib/api";
import { BarChart3, Users, UserSquare2, Award, BookOpen, Users2, FileCheck, Settings, ShieldCheck, UserCheck, Landmark, UserPlus, Activity, FileSpreadsheet, GraduationCap, LayoutDashboard, Presentation, PanelLeftOpen, PanelLeftClose } from "lucide-react";

const adminMenuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Registration', href: '/admin/institutional', icon: Landmark },
  { name: 'Enrollment', href: '/admin/registration', icon: ShieldCheck },
  { name: 'Performance', href: '/admin/performance', icon: Activity },
  { name: 'Display', href: '/admin/reporting', icon: Presentation },
];

export const BreadcrumbContext = createContext({
  dynamicSuffix: '',
  setDynamicSuffix: (s: string) => {}
});


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dynamicSuffix, setDynamicSuffix] = useState('');

  // Clear the breadcrumb suffix whenever the page changes so stale labels never bleed across pages
  useEffect(() => {
    setDynamicSuffix('');
  }, [pathname]);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || currentUser.role !== 'ROLE_ADMIN') {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const isNoScrollPage = ['/admin', '/admin/institutional', '/admin/registration', '/admin/performance'].includes(pathname);



  // Keep the shell visible while checking auth so it never flashes blank
  if (!isAuthorized) {
    return (
      <div className="h-[100dvh] bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <BreadcrumbContext.Provider value={{ dynamicSuffix, setDynamicSuffix }}>
    <div className="h-[100dvh] overflow-hidden bg-[#f8fafc] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col admin-layout-container">
      {/* Background decoration */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-indigo-700/5 rounded-full filter blur-[128px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 -left-20 w-72 h-72 bg-amber-500/5 rounded-full filter blur-[128px] pointer-events-none z-0" />

      {/* Top Navbar - Fixed - shown on ALL admin pages */}
      <header className="h-16 bg-white border-b border-gray-100 flex-shrink-0 relative z-50">
        <DashboardNavbar 
          onMenuToggle={() => setIsMobileMenuOpen(true)} 
          brandName="AMV ADMIN"
        />
      </header>

      {/* Dynamic Breadcrumbs Directory Bar */}
      {pathname !== '/admin' && (
        <div className="bg-white border-b border-slate-200/80 px-4 md:px-8 py-2 flex-shrink-0 relative z-40 shadow-sm flex items-center gap-3">
          <AdminBreadcrumbs />
          {/* Sidebar toggle — only on pages that hide the sidebar */}
          {['/admin/students', '/admin/staff', '/admin/parents'].includes(pathname) && (
            <button
              type="button"
              onClick={() => setSidebarVisible(v => !v)}
              title={sidebarVisible ? 'Hide Navigation' : 'Show Navigation'}
              className="ml-auto flex items-center gap-1.5 h-7 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest transition-all shrink-0"
            >
              {sidebarVisible
                ? <><PanelLeftClose size={13} className="text-primary" /> Hide Nav</>
                : <><PanelLeftOpen size={13} className="text-primary" /> Show Nav</>}
            </button>
          )}
        </div>
      )}

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={adminMenuItems}
        brandName="AMV ADMIN"
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Fixed/Static Column */}
        {(!['/admin', '/admin/students', '/admin/staff', '/admin/parents'].includes(pathname)) || (['/admin/students', '/admin/staff', '/admin/parents'].includes(pathname) && sidebarVisible) ? (
          <aside className="hidden md:block w-64 border-r border-slate-200 bg-white z-30 overflow-y-auto custom-scrollbar flex-shrink-0">
            <Sidebar menuItems={adminMenuItems} />
          </aside>
        ) : null}

        {/* Main Content - Conditional Scroll */}
        <main className={`flex-1 ${isNoScrollPage ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'} ${pathname === '/admin' ? 'p-0' : 'p-4 md:p-6'} relative`}>
          <div className={`max-w-none mx-auto ${isNoScrollPage ? 'h-full overflow-hidden' : ''}`}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 px-4 md:px-8 py-3 flex-shrink-0 relative z-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          © 2026 WP/NG ANDIAMBALAMA MAHA VIDHYALAYA. ALL RIGHTS RESERVED.
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
          POWERED BY <span className="text-indigo-600 font-black tracking-widest ml-1">ITMIND</span>
        </div>
      </footer>
    </div>
    </BreadcrumbContext.Provider>
  );
}
// Step 8-1 - Refine Sidebar styling with HSL colors
// Step 8-4 - Implement tab-specific icon highlights in Sidebar
// Step 8-7 - Add performance tab to adminMenuItems in layout.tsx
// Step 8-10 - Add active indicator line to Sidebar items
// Step 8-13 - Add showNewButton state to AdminLayout
// Step 8-16 - Add custom scrollbar styles to globals.css
// Step 8-19 - Add responsive toggle logic for sidebar
// Step 8-22 - Refine welcome message typography in dashboard
// Step 8-25 - Add font-outfit family support to globals.css
// Step 8-28 - Add subtle noise texture to sidebar background
