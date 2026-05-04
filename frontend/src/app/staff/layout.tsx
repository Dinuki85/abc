'use client';

import StaffSidebar from "@/components/staff/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { LayoutDashboard, Users, FileCheck, Settings, ShieldCheck } from "lucide-react";

const staffMenuItems = [
  { name: 'Dashboard', href: '/staff', icon: LayoutDashboard },
  { name: 'Settings', href: '/staff/settings', icon: Settings },
];

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || (currentUser.role !== 'ROLE_STAFF' && currentUser.role !== 'ROLE_ADMIN')) {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="h-[100dvh] bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-[#f8fafc] flex flex-col font-sans text-slate-900 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-700/5 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-72 h-72 bg-indigo-500/5 rounded-full filter blur-[128px] pointer-events-none" />

      {/* Top Navbar */}
      <div className="flex-shrink-0 z-50 h-20 bg-white border-b border-gray-100">
        <DashboardNavbar 
          onMenuToggle={() => setIsMobileMenuOpen(true)} 
          brandName="AMV STAFF"
        />
      </div>

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={staffMenuItems}
        brandName="AMV STAFF"
      />

      {/* Bottom Area: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden z-20 w-full relative min-h-0">
        <div className="hidden md:block flex-shrink-0 z-30 h-full border-r border-slate-200 shadow-sm">
          <StaffSidebar />
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 bg-transparent scroll-smooth custom-scrollbar relative">
          <div className="max-w-[1600px] mx-auto min-h-full">
            <div className="backdrop-blur-sm bg-white/40 p-0 md:p-6 rounded-[2.5rem] shadow-sm border border-white/40 overflow-hidden">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
