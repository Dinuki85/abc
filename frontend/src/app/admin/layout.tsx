'use client';

import Sidebar from "@/components/admin/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { BarChart3, Users, UserSquare2, Award, BookOpen, Users2, FileCheck, Settings, ShieldCheck, UserCheck, Landmark, UserPlus, Activity, FileSpreadsheet, GraduationCap } from "lucide-react";

const adminMenuItems = [
  { name: 'Dashboard', href: '/admin', icon: Landmark },
  { name: 'Registration', href: '/admin/registration', icon: UserPlus },
  { name: 'Performance', href: '/admin/performance', icon: Activity },
  { name: 'Display', href: '/admin/reporting', icon: FileSpreadsheet },
  { name: 'User Management', href: '/admin/users', icon: Settings },
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
    <div className="h-screen overflow-hidden bg-[#f8fafc] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Background decoration */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-indigo-700/5 rounded-full filter blur-[128px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 -left-20 w-72 h-72 bg-amber-500/5 rounded-full filter blur-[128px] pointer-events-none z-0" />

      {/* Top Navbar - Fixed */}
      <header className="h-20 bg-white border-b border-gray-100 flex-shrink-0">
        <DashboardNavbar 
          onMenuToggle={() => setIsMobileMenuOpen(true)} 
          brandName="AMV ADMIN"
        />
      </header>

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={adminMenuItems}
        brandName="AMV ADMIN"
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed/Static Column */}
        <aside className="hidden md:block w-64 border-r border-slate-200 bg-white z-30 overflow-y-auto custom-scrollbar flex-shrink-0">
          <Sidebar menuItems={adminMenuItems} />
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-hidden p-4 md:p-6 relative">
          <div className="max-w-[1600px] mx-auto h-full overflow-hidden">
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
// Step 8-22 - Refine welcome message typography in dashboard
// Step 8-25 - Add font-outfit family support to globals.css
// Step 8-28 - Add subtle noise texture to sidebar background
