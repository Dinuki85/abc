'use client';

import DashboardNavbar from "@/components/DashboardNavbar";
import { useState } from "react";
import MobileSidebar from "@/components/admin/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-shrink-0 z-50 sticky top-0">
        <DashboardNavbar 
          onMenuToggle={() => setIsMobileMenuOpen(true)} 
          brandName="AMV PORTAL"
        />
      </div>

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={[]} // General dashboard might not have a fixed sidebar yet
        brandName="AMV PORTAL"
      />

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
