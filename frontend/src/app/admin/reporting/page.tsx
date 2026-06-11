"use client";

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import { 
  FileSpreadsheet, Users, HeartHandshake, Activity, 
  Award, Phone, FileCheck, Layers, BookCheck, 
  GraduationCap, Heart, Landmark, Users2, 
  UserCheck, ShieldCheck, BookOpen, Contact, 
  Briefcase, Calendar, ArrowRight, ArrowLeft,
  Search, Edit, Eye, Trash2, Mail
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api, StudentProfile, Grade, Teacher } from '@/lib/api';

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
          title="All School" 
          color="#17a2b8"
          items={[
            { name: 'All List', icon: Users, href: '/admin/reporting?report=students' },
            { name: 'Welfair paid/not paid List', icon: HeartHandshake, href: '#' },
            { name: 'Health Report', icon: Activity, href: '#' },
            { name: 'Skill Report', icon: Award, href: '#' },
            { name: 'Contact Report', icon: Phone, href: '#' },
            { name: 'Exam Report', icon: FileCheck, href: '#' },
          ]} 
        />

        <ReportSection 
          title="Student List" 
          color="#d97706"
          items={[
            { name: 'Section Based All Student', icon: Layers, href: '#' },
            { name: 'Sport Based  All Student', icon: Award, href: '#' },
            { name: 'Scholarship Based  All Student', icon: GraduationCap, href: '#' },
            { name: 'Religeon Based  All Student', icon: Heart, href: '#' },
            { name: 'Nationality Based  All Student', icon: Landmark, href: '#' },
            { name: 'Gender Based  All Student', icon: Users2, href: '#' },
            { name: 'Exam Wise Report', icon: FileCheck, href: '#' },
            { name: 'Subject Wise Report', icon: BookCheck, href: '#' },
            { name: 'Mask Wise Report', icon: FileSpreadsheet, href: '#' },
            { name: 'Grade Wise Report', icon: Users, href: '#' },
            { name: 'Sport Wise Report', icon: Award, href: '#' },
          ]} 
        />

        <ReportSection 
          title="Teacher" 
          color="#6f42c1"
          items={[
            { name: 'Class Teacher List', icon: UserCheck, href: '/admin/reporting?report=teachers' },
            { name: 'Teacher Incharge List', icon: ShieldCheck, href: '#' },
            { name: 'Subject Wise List', icon: BookOpen, href: '#' },
          ]} 
        />

        <ReportSection 
          title="Individual" 
          color="#343a40"
          items={[
            { name: 'Student CV', icon: Contact, href: '#' },
            { name: 'Teacher CV', icon: Briefcase, href: '#' },
            { name: 'Guardian CV', icon: Heart, href: '#' },
            { name: 'All Guardian List', icon: Users, href: '/admin/reporting?report=guardians' },
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
                    <Link href={`/admin/institutional?student=${st.username}`} className="font-black text-slate-700 font-mono tracking-tighter text-xs truncate hover:text-primary transition-colors cursor-pointer block">
                      {st.username}
                    </Link>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex flex-col text-left">
                      <Link href={`/admin/institutional?student=${st.username}`} className="text-xs font-black text-black truncate hover:text-primary transition-colors cursor-pointer block">
                        {st.fullName || <span className="text-rose-500 italic font-bold">Incomplete</span>}
                      </Link>
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

function TeacherListReport() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const res = await api.getTeacherOverview();
      setTeachers(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t =>
      (t.name || t.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teachers, searchTerm]);

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 border border-slate-200/60">
      <div className="flex-none p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/reporting" 
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-black hover:border-black transition-all shadow-sm animate-in fade-in"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
            </Link>
            <div>
              <h2 className="text-sm font-black text-black uppercase tracking-tight flex items-center gap-2">
                <Briefcase size={16} className="text-[#6f42c1]" />
                Class Teacher List
              </h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{filteredTeachers.length} Records Found</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm text-slate-600 border-collapse">
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '35%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>
          <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
            <tr>
              <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black">Teacher ID</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black">Name & Designation</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center">Grade Focus</th>
              <th className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black">Class Assignments</th>
              <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={`sk-${i}`} className="border-b border-slate-100">
                <td colSpan={5} className="px-4 py-3 animate-pulse"><div className="h-3 bg-slate-100 rounded-full w-full" /></td>
              </tr>
            ))}

            {!isLoading && filteredTeachers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center opacity-20"><Search size={20} /></div>
                    <p className="text-black font-black italic opacity-40 uppercase tracking-widest text-[10px]">No Records Found</p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && filteredTeachers.map(staff => (
              <tr key={staff.id || staff.username} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/admin/staff?username=${staff.username}`} className="font-black text-indigo-600 font-mono tracking-tighter text-xs truncate hover:text-primary transition-colors cursor-pointer block">
                    {staff.username}
                  </Link>
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-col text-left">
                    <Link href={`/admin/staff?username=${staff.username}`} className="text-xs font-black text-black truncate hover:text-primary transition-colors cursor-pointer block">
                      {staff.name || staff.fullName || <span className="text-rose-500 italic font-bold">Incomplete</span>}
                    </Link>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">{staff.designation || 'Class Teacher'}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-black text-[10px] font-black uppercase tracking-widest border border-slate-200">
                    {staff.gradeName || 'General'}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-wrap gap-1">
                    {staff.classes && staff.classes.length > 0 ? (
                      staff.classes.map((cls: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px]">
                          <span className="font-black uppercase tracking-tighter">{cls.className}</span>
                          <div className="h-2 w-px bg-indigo-200 mx-1" />
                          <span className="font-bold opacity-70">{cls.studentCount} St.</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-[9px] font-black text-black italic uppercase tracking-widest">Unassigned</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <Link
                      href={`/admin/staff?username=${staff.username}`}
                      title="View Profile"
                      className="p-1.5 border rounded-xl bg-white border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all text-slate-600 hover:bg-slate-50 active:scale-95 shadow-sm inline-flex items-center justify-center"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      href={`/admin/staff?username=${staff.username}&edit=true`}
                      title="Edit Profile"
                      className="p-1.5 border rounded-xl bg-white border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all text-slate-600 hover:bg-slate-50 active:scale-95 shadow-sm inline-flex items-center justify-center"
                    >
                      <Edit size={14} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GuardianListReport() {
  const [studentsList, setStudentsList] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const data = await api.getStudents();
      setStudentsList(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const guardiansList = useMemo(() => {
    return studentsList
      .filter(st => st.guardianName || st.guardianIdRef || st.guardianNic)
      .map(st => {
        let extra: any = {};
        if (st.additionalData) {
          try {
            extra = JSON.parse(st.additionalData);
          } catch (e) {}
        }
        const isDummy = st.username.startsWith('GDN-HOST-');
        return {
          id: st.id,
          guardianId: st.guardianIdRef || `GDN-${st.username}`,
          guardianName: st.guardianName || extra.guardianName || '',
          guardianNic: st.guardianNic || extra.guardianNic || '',
          guardianContact: st.guardianContact || extra.guardianContact || '',
          guardianEmail: extra.guardianEmail || '',
          studentUsername: isDummy ? 'Unlinked' : st.username,
          studentName: isDummy ? 'Unlinked' : st.fullName,
          studentGrade: isDummy ? '—' : (st.gradeName || 'N/A'),
          studentClass: isDummy ? '—' : (st.className || 'N/A'),
        };
      });
  }, [studentsList]);

  const filteredGuardians = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return guardiansList.filter(g =>
      (g.guardianName || '').toLowerCase().includes(term) ||
      (g.guardianId || '').toLowerCase().includes(term) ||
      (g.guardianNic || '').toLowerCase().includes(term) ||
      (g.studentName || '').toLowerCase().includes(term) ||
      (g.studentUsername || '').toLowerCase().includes(term)
    );
  }, [guardiansList, searchTerm]);

  const handleDelete = async (studentUsername: string) => {
    if (!confirm('Are you sure you want to remove this guardian? This will clear all guardian data linked to the student.')) return;
    try {
      const studentProfile = await api.getStudentProfile(studentUsername);
      if (!studentProfile) throw new Error('Student profile not found.');

      studentProfile.guardianName = '';
      studentProfile.guardianNic = '';
      studentProfile.guardianContact = '';
      studentProfile.guardianIdRef = '';

      let additional: any = {};
      if (studentProfile.additionalData) {
        try { additional = JSON.parse(studentProfile.additionalData); } catch (e) {}
      }

      const guardianKeys = [
        'guardianName', 'guardianNameSinhala', 'guardianNameWithInitials', 'guardianNameWithInitialSinhala',
        'guardianDob', 'guardianNic', 'guardianBirthCertificateNo', 'guardianDistrict', 'guardianReligion',
        'guardianGender', 'guardianAge', 'guardianCivilState', 'guardianWorkingAddress', 'guardianWorkingTempAddress',
        'guardianOfficeContact', 'guardianEmergencyContactName', 'guardianEmergencyEmail', 'guardianWorkingCompany',
        'guardianDesignation', 'guardianAddressPermanent', 'guardianAddressTemporary', 'guardianEmergencyContactNo',
        'guardianWhatsappNo', 'guardianHomeNo', 'guardianContact', 'guardianEmail', 'guardianDistanceToSchool'
      ];
      guardianKeys.forEach(k => delete additional[k]);
      studentProfile.additionalData = JSON.stringify(additional);

      await api.saveStudentProfile(studentUsername, studentProfile);
      alert('Guardian profile deleted successfully!');
      fetchStudents();
    } catch (error: any) {
      alert(error.message || 'Failed to delete guardian record');
    }
  };

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
                <Users size={16} className="text-[#343a40]" />
                Registered Guardians
              </h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Directory of parents/guardians with linked student records</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 text-xs font-bold text-black shadow-sm">
            Total Guardians: <span className="text-emerald-600 font-black">{filteredGuardians.length}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search by ID, Name or Linked Student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm text-slate-600 border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
            <tr>
              <th className="px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-black w-48">Guardian ID</th>
              <th className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Name</th>
              <th className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black w-32">NIC</th>
              <th className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Linked Student</th>
              <th className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Contact</th>
              <th className="px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-black text-right w-32">Manage</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={`sk-${i}`} className="border-b border-slate-100">
                <td colSpan={6} className="px-8 py-4 animate-pulse"><div className="h-3 bg-slate-100 rounded-full w-full" /></td>
              </tr>
            ))}
            {!isLoading && filteredGuardians.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm font-bold text-slate-500">
                  {searchTerm ? 'No guardians matched your search.' : 'No guardians registered yet.'}
                </td>
              </tr>
            )}
            {!isLoading && filteredGuardians.map((g) => (
              <tr key={`${g.guardianId}-${g.studentUsername}`} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
                <td className="px-8 py-4 font-black text-black">{g.guardianId}</td>
                <td className="py-4 font-bold text-black">{g.guardianName}</td>
                <td className="py-4 font-bold text-slate-600">{g.guardianNic || '—'}</td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="font-black text-emerald-600 uppercase text-[12px]">{g.studentName}</span>
                    <span className="text-[10px] text-slate-400 font-bold">ID: {g.studentUsername} | {g.studentGrade} - {g.studentClass}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-col space-y-1 text-black font-black text-[12px]">
                    {g.guardianEmail && (
                      <span className="flex items-center uppercase tracking-tighter">
                        <Mail size={12} className="mr-1 text-emerald-600" /> {g.guardianEmail}
                      </span>
                    )}
                    {g.guardianContact && (
                      <span className="flex items-center uppercase tracking-tighter">
                        <Phone size={12} className="mr-1 text-emerald-600" /> {g.guardianContact}
                      </span>
                    )}
                    {!g.guardianEmail && !g.guardianContact && <span className="text-slate-400 font-normal">—</span>}
                  </div>
                </td>
                <td className="px-8 py-4 text-right space-x-2">
                  <Link
                    href={`/admin/parents?guardianId=${g.guardianId}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                  >
                    <Eye size={16} />
                  </Link>
                  <Link
                    href={`/admin/parents?guardianId=${g.guardianId}&edit=true`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(g.studentUsername)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
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

  if (report === 'teachers') {
    return <TeacherListReport />;
  }

  if (report === 'guardians') {
    return <GuardianListReport />;
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
