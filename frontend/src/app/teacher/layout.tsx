'use client';

import TeacherSidebar from "@/components/teacher/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import { useState } from "react";
import { LayoutDashboard, GraduationCap, FileCheck, ShieldCheck } from "lucide-react";

const teacherMenuItems = [
  { name: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
  { name: 'My Class', href: '/teacher/students', icon: GraduationCap },
  { name: 'Verification', href: '/teacher/verify', icon: FileCheck },
  { name: 'Security', href: '/teacher/profile', icon: ShieldCheck },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative selection:bg-cyan-100 selection:text-cyan-900 flex flex-col">
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none z-0" />
      <div className="fixed top-40 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none z-0" />
      <div className="fixed -bottom-40 left-60 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none z-0" />

      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
        <DashboardNavbar onMenuToggle={() => setIsMobileMenuOpen(true)} />
      </div>

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={teacherMenuItems}
        brandName="AMV TEACHER"
      />

      <div className="flex flex-1 w-full relative z-10">
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
            <TeacherSidebar />
          </div>
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-transparent min-h-[calc(100vh-73px)]">
          <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/40 p-0 md:p-6 rounded-[2rem] shadow-sm border border-white/40 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
