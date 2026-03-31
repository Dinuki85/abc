import TeacherSidebar from "@/components/teacher/Sidebar";
import Header from "@/components/admin/Header"; // Reusing the header component

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden relative selection:bg-emerald-100 selection:text-emerald-900">
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="fixed top-40 -left-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="fixed -bottom-40 left-60 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />

      <div className="hidden md:block w-64 flex-shrink-0 z-40">
        <TeacherSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 transition-all z-10">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/40 p-6 rounded-2xl shadow-sm border border-white/40">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
