'use client';

import Sidebar from "@/components/admin/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { BarChart3, Users, UserSquare2, Award, BookOpen, Users2, FileCheck, Settings, ShieldCheck, UserCheck, Landmark, UserPlus, Activity, FileSpreadsheet } from "lucide-react";

const adminMenuItems = [
  { name: 'Control Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Institutional Admin', href: '/admin/institutional', icon: Landmark },
  { name: 'Enrollment & Registration', href: '/admin/registration', icon: UserPlus },
  { name: 'Performance Analytics', href: '/admin/performance', icon: Activity },
  { name: 'Reporting Engine', href: '/admin/reporting', icon: FileSpreadsheet },
  { name: 'User Management', href: '/admin/users', icon: Settings },
  { name: 'Security & Profile', href: '/admin/profile', icon: ShieldCheck },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || currentUser.role !== 'ROLE_ADMIN') {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Keep the shell visible while checking auth so it never flashes blank
  if (!isAuthorized) {
    return (
      <div className="h-[100dvh] bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-[#f8fafc] flex flex-col font-sans text-slate-900 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      {/* Background decoration - Subtle and professional */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-700/5 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-72 h-72 bg-amber-500/5 rounded-full filter blur-[128px] pointer-events-none" />

      {/* Top Navbar */}
      <div className="flex-shrink-0 z-50 h-20 bg-white border-b border-gray-100">
        <DashboardNavbar onMenuToggle={() => setIsMobileMenuOpen(true)} />
      </div>

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={adminMenuItems}
      />

      {/* Bottom Area: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden z-20 w-full relative min-h-0">
        <div className="hidden md:block flex-shrink-0 z-30 h-full border-r border-slate-200 shadow-sm">
          <Sidebar menuItems={adminMenuItems} />
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 bg-transparent scroll-smooth custom-scrollbar relative">
          <div className="max-w-[1600px] mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
// Step 8-1 - Refine Sidebar styling with HSL colors
// Step 8-4 - Implement tab-specific icon highlights in Sidebar
// Step 8-7 - Add performance tab to adminMenuItems in layout.tsx
// Step 8-10 - Add active indicator line to Sidebar items
// Step 8-13 - Add showNewButton state to AdminLayout
// Step 8-16 - Add custom scrollbar styles to globals.css
// Step 8-19 - Add responsive toggle logic for sidebar
