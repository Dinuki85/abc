'use client';

import DashboardNavbar from "@/components/DashboardNavbar";

export default function ChangePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-shrink-0 z-50 sticky top-0">
        <DashboardNavbar brandName="AMV SECURITY" />
      </div>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
