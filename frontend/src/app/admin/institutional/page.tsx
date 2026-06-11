"use client";

import {
  Layers, BookCheck, Briefcase, Heart, Trophy,
  UserPlus, Presentation, ClipboardList, Award,
  Calendar, Medal, ArrowLeft, GraduationCap,
  User, HeartPulse, Star as StarIcon, MapPin, FileCheck, Eye,
  Phone, CheckCircle2, XCircle
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { api, StudentProfile } from '@/lib/api';

// ─── Modules grid (shown on default institutional page) ────────────────────
const modules = [
  { name: 'Student',        href: '/admin/students',    icon: UserPlus,       desc: 'Records & Enrollment',     color: '#17a2b8' },
  { name: 'Staff',          href: '/admin/staff',       icon: Briefcase,      desc: 'Teaching & Academic',       color: '#17a2b8' },
  { name: 'Guardian',       href: '/admin/parents',     icon: Heart,          desc: 'Parent & Contacts',         color: '#17a2b8' },
  { name: 'Section',        href: '/admin/grades',      icon: Layers,         desc: 'Primary & Secondary',       color: '#d97706' },
  { name: 'Subject',        href: '/admin/subjects',    icon: BookCheck,      desc: 'Curriculum Mapping',        color: '#d97706' },
  { name: 'Class',          href: '/admin/classes',     icon: Presentation,   desc: 'Room Assignments',          color: '#d97706' },
  { name: 'Assessment',     href: '#',                  icon: ClipboardList,  desc: 'Exams & Evaluations',       color: '#6f42c1' },
  { name: 'Co-Curricular',  href: '#',                  icon: StarSvg,        desc: 'Societies & Clubs',         color: '#6f42c1' },
  { name: 'Sport',          href: '#',                  icon: Trophy,         desc: 'Athletics & Teams',         color: '#6f42c1' },
  { name: 'Scholarship',    href: '#',                  icon: Award,          desc: 'Bursaries & Awards',        color: '#343a40' },
  { name: 'Sportmeet',      href: '#',                  icon: Medal,          desc: 'Meets & Championships',     color: '#343a40' },
  { name: 'Event',          href: '#',                  icon: Calendar,       desc: 'School Events & Calendar',  color: '#343a40' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function mergeAdditional(st: StudentProfile): Record<string, unknown> {
  let data: Record<string, unknown> = { ...st };
  if (st.additionalData) {
    try { data = { ...data, ...JSON.parse(st.additionalData) }; } catch { }
  }
  if (!data.username && (st as any).user?.username) {
    data.username = (st as any).user.username;
  }
  const activeStudentVal = (st as any).activeStudent;
  const backendActive = st.isActiveStudent !== undefined ? st.isActiveStudent : (activeStudentVal !== undefined ? activeStudentVal : true);
  data.isActive = backendActive === true || String(backendActive) === 'true';
  return data;
}

function Field({ label, value }: { label: string; value: unknown }) {
  const display = value === true || value === 'true' ? '✓ Yes'
    : value === false || value === 'false' ? '✗ No'
    : String(value || '—');
  return (
    <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100 text-left hover:bg-slate-100 transition-all">
      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
      <span className="block text-xs font-black text-black leading-tight break-words">{display}</span>
    </div>
  );
}

function SectionHeading({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
        <Icon size={14} />
      </div>
      <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{label}</h3>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

// ─── Student Profile Viewer ──────────────────────────────────────────────────
function StudentProfileViewer({ username }: { username: string }) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await api.getPaginatedStudents(0, 1, username, '', '');
        if (res.content && res.content.length > 0) {
          setData(mergeAdditional(res.content[0]));
        } else {
          setError('Student not found.');
        }
      } catch {
        setError('Failed to load student profile.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [username]);

  const TABS = [
    { id: 'basic',   label: 'Basic Info',   icon: User },
    { id: 'health',  label: 'Health',       icon: HeartPulse },
    { id: 'skills',  label: 'Skills',       icon: StarIcon },
    { id: 'contact', label: 'Contact',      icon: MapPin },
    { id: 'exams',   label: 'Exams',        icon: FileCheck },
    { id: 'status',  label: 'Status',       icon: Eye },
  ];

  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Profile...</p>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-2">
        <XCircle size={36} className="text-rose-400 mx-auto" />
        <p className="text-sm font-black text-slate-600">{error || 'Student not found'}</p>
        <Link href="/admin/reporting?report=students" className="text-xs font-black text-primary hover:underline">
          ← Back to Student List
        </Link>
      </div>
    </div>
  );

  const isActive = data.isActive === true || data.isActive === 'true';
  const verStatus = String(data.verificationStatus || 'PENDING');

  const TALENT_FIELDS = [
    { label: 'Agriculture', name: 'talentAgri' },
    { label: 'ICT', name: 'talentIct' },
    { label: 'Aesthetic', name: 'talentAesthetic' },
    { label: 'Media & Announcing', name: 'talentMedia' },
    { label: 'Sport & Athletic', name: 'talentSport' },
    { label: 'Innovation', name: 'talentInnovation' },
    { label: 'Cinematography', name: 'talentCinematography' },
  ];
  const ACHIEVEMENT_FIELDS = [
    { label: 'International', name: 'achievementInternational' },
    { label: 'National', name: 'achievementNational' },
    { label: 'Provincial', name: 'achievementProvincial' },
    { label: 'Zonal', name: 'achievementZonal' },
    { label: 'Divisional', name: 'achievementDivisional' },
    { label: 'School', name: 'achievementSchool' },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="shrink-0 px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reporting?report=students"
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm"
          >
            <ArrowLeft size={15} strokeWidth={2.5} />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GraduationCap size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-black text-black uppercase tracking-tight leading-none">
              {String(data.fullName || 'Unnamed Student')}
            </h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">
              Index No: {String(data.username || '—')} &nbsp;·&nbsp; {String(data.gradeName || '—')} {String(data.className || '')}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            {isActive ? 'Active' : 'Inactive'}
          </div>
          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${verStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : verStatus === 'NEEDS_CORRECTION' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
            {verStatus === 'VERIFIED' ? <CheckCircle2 size={10} /> : null}
            {verStatus}
          </div>
          <Link
            href={`/admin/students?search=${username}`}
            className="h-7 px-3 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:bg-primary/90 transition-all"
          >
            <User size={11} /> Edit Profile
          </Link>
        </div>
      </div>

      {/* Tab bar */}
      <div className="shrink-0 flex gap-1 px-4 pt-2 border-b border-slate-100 bg-white overflow-x-auto custom-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'text-primary border-primary bg-primary/5' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
          >
            <tab.icon size={11} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">

        {activeTab === 'basic' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <SectionHeading icon={User} label="Personal Information" color="#17a2b8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <Field label="Index No" value={data.username} />
              <Field label="Full Name" value={data.fullName} />
              <Field label="Name in Sinhala" value={data.nameSinhala} />
              <Field label="Name with Initials" value={data.nameWithInitials} />
              <Field label="Name with Initials (Sinhala)" value={data.nameWithInitialSinhala} />
              <Field label="Date of Birth" value={data.dob} />
              <Field label="Age" value={data.age} />
              <Field label="Gender" value={data.gender} />
              <Field label="NIC" value={data.nic} />
              <Field label="Birth Certificate No" value={data.birthCertificateNumber} />
              <Field label="District" value={data.district} />
              <Field label="Religion" value={data.religion} />
              <Field label="Mother's Name" value={data.motherName} />
              <Field label="Father's Name" value={data.fatherName} />
              <Field label="Guardian ID" value={data.guardianIdRef} />
              <Field label="Inter School House" value={data.interSchoolHouse} />
              <Field label="Siblings" value={data.siblings} />
            </div>
            <SectionHeading icon={GraduationCap} label="Academic Cell" color="#d97706" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Field label="Grade" value={data.gradeName} />
              <Field label="Class" value={data.className} />
              <Field label="Profile Completed" value={data.profileCompleted} />
              <Field label="Verified By" value={data.verifiedByName} />
              <Field label="Verified At" value={data.verifiedAt} />
              <Field label="Verification Comment" value={data.verificationComment} />
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <SectionHeading icon={HeartPulse} label="Health Information" color="#ef4444" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <Field label="Height" value={data.height} />
              <Field label="Weight" value={data.weight} />
              <Field label="Blood Group" value={data.bloodGroup} />
              <Field label="Special Physical Condition" value={data.specialPhysicalCondition} />
              <Field label="Special Illness" value={data.specialIllness} />
              <Field label="Long Term Diseases" value={data.longTermDiseases} />
              <Field label="Special Need" value={data.specialNeed} />
            </div>
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Medical Description</span>
              <p className="text-xs font-bold text-black whitespace-pre-wrap">{String(data.medicalDescription || '—')}</p>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <SectionHeading icon={StarIcon} label="Achievements" color="#6f42c1" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {ACHIEVEMENT_FIELDS.map(a => <Field key={a.name} label={a.label} value={data[a.name]} />)}
            </div>
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Achievement Description</span>
              <p className="text-xs font-bold text-black whitespace-pre-wrap">{String(data.talentDescription || '—')}</p>
            </div>
            <SectionHeading icon={StarIcon} label="Talent Areas" color="#d97706" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {TALENT_FIELDS.map(t => {
                const active = data[t.name] === true || data[t.name] === 'true';
                return (
                  <div key={t.name} className={`flex items-center gap-2 p-2 px-3 rounded-xl border text-xs font-bold ${active ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${active ? 'bg-primary' : 'bg-slate-300'}`} />
                    {t.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <SectionHeading icon={MapPin} label="Address" color="#17a2b8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Permanent Address</span>
                <p className="text-xs font-bold text-black whitespace-pre-wrap">{String(data.addressPermanent || '—')}</p>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Temporary Address</span>
                <p className="text-xs font-bold text-black whitespace-pre-wrap">{String(data.addressTemporary || '—')}</p>
              </div>
            </div>
            <SectionHeading icon={Phone} label="Contact Numbers" color="#17a2b8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <Field label="Emergency Contact" value={data.contactEmergency} />
              <Field label="WhatsApp No" value={data.contactWhatsapp} />
              <Field label="Home No" value={data.contactHome} />
              <Field label="Mobile No" value={data.contactMobile} />
              <Field label="Email Address" value={data.contactEmail} />
              <Field label="Distance to School" value={data.distanceToSchool} />
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <SectionHeading icon={FileCheck} label="Exam Results" color="#6f42c1" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Grade 05 Exam Result" value={data.resultGrade05} />
              <Field label="GCE O/L Exam Result" value={data.resultGceOl} />
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <SectionHeading icon={Eye} label="Student Status" color="#343a40" />
            <div className={`p-5 rounded-xl border-2 flex items-center gap-5 ${isActive ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {isActive
                  ? <CheckCircle2 size={28} className="text-emerald-600" />
                  : <XCircle size={28} className="text-rose-600" />}
              </div>
              <div>
                <p className={`text-lg font-black uppercase tracking-widest ${isActive ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isActive ? 'Active' : 'Inactive'}
                </p>
                <p className={`text-xs font-bold mt-0.5 ${isActive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isActive ? 'Student is currently active in the school system.' : 'Student has left or is no longer active.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Default grid page ───────────────────────────────────────────────────────
function InstitutionalGrid() {
  return (
    <div className="min-h-full md:h-full flex flex-col gap-2 animate-in fade-in duration-700 overflow-y-auto md:overflow-hidden">
      <div className="flex items-center gap-3 px-2 py-0.5">
        <Link
          href="/admin"
          className="w-8 h-8 rounded-lg bg-white border-2 border-slate-100 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={3} />
        </Link>
        <div>
          <h1 className="text-base font-black text-black uppercase tracking-tight leading-none">Registration</h1>
          <p className="text-[9px] font-black text-black/50 uppercase tracking-[0.2em] mt-0.5">Command Center / Registration</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3 p-0.5 overflow-y-auto md:overflow-visible">
        {modules.map((mod, i) => {
          const Icon = mod.icon as any;
          return (
            <Link key={i} href={mod.href} className="group block h-full">
              <div
                className="h-full bg-white rounded-xl p-2 px-3 flex flex-col items-center justify-center text-center border-2 transition-all duration-300 relative overflow-hidden cursor-pointer"
                style={{ borderColor: `${mod.color}25` }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = mod.color;
                  el.style.transform = 'translateY(-1px)';
                  el.style.boxShadow = `0 6px 20px -8px ${mod.color}35`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${mod.color}25`;
                  el.style.transform = '';
                  el.style.boxShadow = '';
                }}
              >
                <Icon
                  className="absolute -bottom-2 -right-2 pointer-events-none transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.08]"
                  style={{ width: 50, height: 50, color: mod.color }}
                />
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-1"
                  style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <div className="z-10">
                  <h3 className="text-[16px] font-black tracking-tight leading-tight transition-colors duration-200 text-black uppercase">
                    {mod.name}
                  </h3>
                  <p className="text-[11px] font-black text-black mt-0.5 leading-snug line-clamp-1 opacity-80">
                    {mod.desc}
                  </p>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-xl"
                  style={{ backgroundColor: mod.color }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Inner content (reads search params) ────────────────────────────────────
function InstitutionalContent() {
  const searchParams = useSearchParams();
  const studentUsername = searchParams.get('student');

  if (studentUsername) {
    return (
      <div className="h-[calc(100dvh-136px)] md:h-[calc(100dvh-156px)] flex flex-col animate-in fade-in duration-700">
        <StudentProfileViewer username={studentUsername} />
      </div>
    );
  }

  return <InstitutionalGrid />;
}

// ─── Page export ─────────────────────────────────────────────────────────────
export default function InstitutionalAdminPage() {
  return (
    <Suspense fallback={
      <div className="p-8 flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InstitutionalContent />
    </Suspense>
  );
}

// ─── Star SVG fallback ───────────────────────────────────────────────────────
function StarSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
