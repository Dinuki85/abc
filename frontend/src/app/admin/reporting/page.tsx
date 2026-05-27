"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { 
  FileSpreadsheet, Users, HeartHandshake, Activity, 
  Award, Phone, FileCheck, Layers, BookCheck, 
  GraduationCap, Heart, Landmark, Users2, 
  UserCheck, ShieldCheck, BookOpen, Contact, 
  Briefcase, Calendar, ArrowRight, ArrowLeft,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api, StudentProfile, Grade } from '@/lib/api';

function ReportingDashboard() {
  return (
    <div className="min-h-full md:h-full flex flex-col gap-2 animate-in fade-in duration-700 overflow-y-auto md:overflow-hidden">
      {/* Back Header */}
      <div className="flex items-center gap-3 px-2 py-0.5">
        <Link 
          href="/admin" 
          className="w-8 h-8 rounded-lg bg-white border-2 border-slate-100 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={3} />
        </Link>
        <div>
          <h1 className="text-base font-black text-black uppercase tracking-tight leading-none">Institutional Reporting</h1>
          <p className="text-[9px] font-black text-black/50 uppercase tracking-[0.2em] mt-0.5">Command Center / Reporting</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 content-start overflow-y-auto md:overflow-visible">
        <ReportSection 
          title="All School Data" 
          color="#17a2b8"
          items={[
            { name: 'All Student List', icon: Users, href: '/admin/reporting?report=students' },
            { name: 'Welfare Paid/Not Paid', icon: HeartHandshake, href: '#' },
            { name: 'Health Report', icon: Activity, href: '#' },
            { name: 'Skill Matrix Report', icon: Award, href: '#' },
            { name: 'Contact Directory', icon: Phone, href: '#' },
            { name: 'School Exam Report', icon: FileCheck, href: '#' },
          ]} 
        />

        <ReportSection 
          title="Student Categorization" 
          color="#d97706"
          items={[
            { name: 'Section Based List', icon: Layers, href: '#' },
            { name: 'Subject Based List', icon: BookCheck, href: '#' },
            { name: 'Scholarship Roll', icon: GraduationCap, href: '#' },
            { name: 'Religion Based List', icon: Heart, href: '#' },
            { name: 'Nationality Based List', icon: Landmark, href: '#' },
            { name: 'Gender Based List', icon: Users2, href: '#' },
          ]} 
        />

        <ReportSection 
          title="Teacher Records" 
          color="#6f42c1"
          items={[
            { name: 'Class Teacher List', icon: UserCheck, href: '#' },
            { name: 'Teacher Incharge List', icon: ShieldCheck, href: '#' },
            { name: 'Subject Wise List', icon: BookOpen, href: '#' },
          ]} 
        />

        <ReportSection 
          title="Individual CV & Files" 
          color="#343a40"
          items={[
            { name: 'Student Curriculum Vitae', icon: Contact, href: '#' },
            { name: 'Teacher Curriculum Vitae', icon: Briefcase, href: '#' },
            { name: 'Guardian Curriculum Vitae', icon: Heart, href: '#' },
            { name: 'Teacher Timetable', icon: Calendar, href: '#' },
          ]} 
        />
      </div>
    </div>
  );
}

function ReportSection({ title, items, color }: any) {
  return (
    <div className="bg-white p-2 px-2.5 rounded-xl border-2 shadow-sm space-y-1.5 flex flex-col lg:h-full transition-all duration-300 hover:shadow-lg"
         style={{ borderColor: `${color}15` }}>

      <div className="flex flex-col gap-0.5 px-1">
        <h4 className="text-[12px] font-black text-black uppercase tracking-[0.1em]">{title}</h4>
        <div className="w-8 h-[3px] rounded-full" style={{ backgroundColor: color }} />
      </div>
      <div className="grid grid-cols-1 gap-1 flex-1">
        {items.map((item: any, i: number) => (
          <Link 
            key={i} 
            href={item.href} 
            className="flex items-center justify-between group p-1.5 px-2 rounded-lg border-2 border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-2">
              <div 
                className="p-1 rounded-md transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}10`, color: color }}
              >
                <item.icon size={14} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-black text-black uppercase tracking-tight">{item.name}</span>
            </div>
            <ArrowRight size={10} className="text-slate-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" strokeWidth={3} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function StudentListReport() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGradeId, setFilterGradeId] = useState<number | ''>('');
  const [filterClassId, setFilterClassId] = useState<number | ''>('');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [filterClasses, setFilterClasses] = useState<any[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const fetchGrades = async () => {
    try { setGrades(await api.getGrades()); } catch {}
  };

  const fetchClassesForGrade = async (gradeId: number) => {
    try { setFilterClasses(await api.getClassesByGrade(gradeId)); } catch {}
  };

  const fetchStudents = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await api.getPaginatedStudents(0, 10000, searchTerm, filterGradeId, filterClassId);
      setStudents(res.content);
      setTotalElements(res.totalElements);
    } catch {}
    finally { if (!silent) setIsLoading(false); }
  };

  useEffect(() => { fetchGrades(); }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchStudents(false), 300);
    return () => clearTimeout(t);
  }, [searchTerm, filterGradeId, filterClassId]);

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 border border-slate-200/60">
      <div className="flex-none p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/reporting" 
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-black hover:border-black transition-all shadow-sm"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
            </Link>
            <div>
              <h2 className="text-sm font-black text-black uppercase tracking-tight flex items-center gap-2">
                <Users size={16} className="text-primary" />
                All Student List
              </h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{totalElements} Records Found</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search by Admission No or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select 
            value={filterGradeId} 
            onChange={(e) => {
              const v = e.target.value ? Number(e.target.value) : '';
              setFilterGradeId(v);
              setFilterClassId('');
              if (v) fetchClassesForGrade(v);
              else setFilterClasses([]);
            }}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Grades</option>
            {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <select 
            value={filterClassId} 
            onChange={(e) => setFilterClassId(e.target.value ? Number(e.target.value) : '')}
            disabled={!filterGradeId}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          >
            <option value="">All Classes</option>
            {filterClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <table className="w-full table-fixed text-left text-sm text-slate-600 border-collapse">
          <colgroup>
            <col style={{ width: '12%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
            <tr>
              <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black">Admission</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black">Student Name</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center hidden md:table-cell">Academic Cell</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black hidden lg:table-cell">Permanent Address</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center hidden sm:table-cell">Active</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center hidden sm:table-cell">Verification</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={`sk-${i}`} className="border-b border-slate-100">
                <td colSpan={6} className="px-4 py-3 animate-pulse"><div className="h-3 bg-slate-100 rounded-full w-full" /></td>
              </tr>
            ))}

            {!isLoading && students.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center opacity-20"><Search size={20} /></div>
                    <p className="text-black font-black italic opacity-40 uppercase tracking-widest text-[10px]">No Records Found</p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && students.map(st => {
              const isActive = st.isActiveStudent === true || (st as any).activeStudent === true || (st as any).isActive === true || (st as any).isActive === 'true';
              let address = 'N/A';
              if ((st as any).additionalData) {
                try {
                  const ad = JSON.parse((st as any).additionalData);
                  address = ad.addressPermanent || ad.address || 'N/A';
                } catch {}
              }

              return (
                <tr key={st.id || st.username} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2">
                    <span className="font-black text-slate-700 font-mono tracking-tighter text-xs truncate block">{st.username}</span>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-black text-black truncate">
                        {st.fullName || <span className="text-rose-500 italic font-bold">Incomplete</span>}
                      </span>
                      <span className="text-[9px] font-black text-black uppercase opacity-60 md:hidden">{st.gradeName} {st.className}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] font-black text-black uppercase tracking-widest">{st.gradeName || 'N/A'}</span>
                      <span className="text-[9px] font-black text-slate-500 uppercase opacity-70">Class {st.className || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 hidden lg:table-cell">
                    <span className="text-[10px] font-bold text-slate-600 block truncate">{address}</span>
                  </td>
                  <td className="px-2 py-2 text-center hidden sm:table-cell">
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                      {isActive ? 'Active' : 'Inactive'}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center hidden sm:table-cell">
                    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${st.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : st.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      {st.verificationStatus || 'PENDING'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportingContent() {
  const searchParams = useSearchParams();
  const report = searchParams.get('report');

  if (report === 'students') {
    return <StudentListReport />;
  }

  return <ReportingDashboard />;
}

export default function ReportingPage() {
  return (
    <Suspense fallback={<div className="p-8 flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <ReportingContent />
    </Suspense>
  );
}
