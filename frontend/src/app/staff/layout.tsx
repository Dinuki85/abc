import StaffSidebar from "@/components/staff/Sidebar";
import Header from "@/components/admin/Header";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      {/* Background Orbs */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="fixed top-40 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="fixed -bottom-40 left-60 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />

      <div className="hidden md:block w-64 flex-shrink-0 z-40">
        <StaffSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 transition-all z-10">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/40 p-6 rounded-[2.5rem] shadow-sm border border-white/40">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
