'use client';

import Sidebar from "@/components/admin/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { BarChart3, Users, UserSquare2, Award, BookOpen, Users2, FileCheck, Settings, ShieldCheck } from "lucide-react";

const adminMenuItems = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Staff', href: '/admin/staff', icon: UserSquare2 },
  { name: 'Staff Assignment', href: '/admin/assignment', icon: Award },
  { name: 'Classes', href: '/admin/classes', icon: BookOpen },
  { name: 'Parents', href: '/admin/parents', icon: Users2 },
  { name: 'Exams', href: '/admin/exams', icon: FileCheck },
  { name: 'Users', href: '/admin/users', icon: Settings },
  { name: 'Security', href: '/admin/profile', icon: ShieldCheck },
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
    <div className="h-[100dvh] bg-slate-50 flex flex-col font-sans text-slate-900 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 left-60 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />

      {/* Top Navbar */}
      <div className="flex-shrink-0 z-50">
        <DashboardNavbar onMenuToggle={() => setIsMobileMenuOpen(true)} />
      </div>

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={adminMenuItems}
      />

      {/* Bottom Area: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden z-20 w-full relative min-h-0">
        <div className="hidden md:block flex-shrink-0 z-30 h-full border-r border-slate-200/50">
          <Sidebar menuItems={adminMenuItems} />
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 bg-transparent scroll-smooth custom-scrollbar relative">
          <div className="max-w-7xl mx-auto bg-white/40 p-6 rounded-2xl shadow-sm border border-white/40 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
