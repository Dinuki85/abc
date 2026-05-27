"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import {
  Search, X, ShieldCheck, GraduationCap,
  CheckCircle2, AlertCircle, Lock, UserPlus, Eye, FileSpreadsheet,
  Save, User, HeartPulse, Star, MapPin, FileCheck, RotateCcw, Loader2
} from 'lucide-react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { Input } from '@/components/ui/Input';

// ─── Blank form template (reused for reset & new enrollment) ─────────────────
const BLANK_FORM = {
  username: '',
  fullName: '',
  nameSinhala: '',
  nameWithInitials: '',
  nameWithInitialSinhala: '',
  dob: '',
  nic: '',
  birthCertificateNumber: '',
  district: '',
  religion: '',
  gender: '',
  motherName: '',
  fatherName: '',
  guardianIdRef: '',
  age: '',
  interSchoolHouse: '',
  siblings: '',
  height: '',
  weight: '',
  bloodGroup: '',
  specialPhysicalCondition: '',
  specialIllness: '',
  longTermDiseases: '',
  specialNeed: '',
  medicalDescription: '',
  achievementInternational: '',
  achievementNational: '',
  achievementProvincial: '',
  achievementZonal: '',
  achievementDivisional: '',
  achievementSchool: '',
  talentDescription: '',
  talentAgri: false,
  talentIct: false,
  talentAesthetic: false,
  talentMedia: false,
  talentSport: false,
  talentInnovation: false,
  talentCinematography: false,
  addressPermanent: '',
  addressTemporary: '',
  contactEmergency: '',
  contactWhatsapp: '',
  contactHome: '',
  contactMobile: '',
  contactEmail: '',
  distanceToSchool: '',
  resultGrade05: '',
  resultGceOl: '',
  isActive: true,
};

const BASE_KEYS = [
  'id', 'username', 'fullName', 'gender', 'dob', 'isActive', 'isActiveStudent',
  'gradeId', 'classId', 'verificationStatus', 'verifiedByName',
  'verifiedAt', 'verificationComment', 'profileCompleted',
];

function buildPayload(data: any) {
  const extraData: Record<string, any> = {};
  Object.keys(data).forEach(key => {
    if (!BASE_KEYS.includes(key) && !key.startsWith('additionalData')) {
      extraData[key] = data[key];
    }
  });
  // Map frontend isActive to backend isActiveStudent
  const activeVal = data.isActive === true || data.isActive === 'true';
  return { ...data, isActiveStudent: activeVal, additionalData: JSON.stringify(extraData) };
}

function mergeAdditional(st: any) {
  let data: any = { ...st };
  if (st.additionalData) {
    try { data = { ...data, ...JSON.parse(st.additionalData) }; } catch {}
  }
  // Map backend isActiveStudent to frontend isActive
  const backendActive = st.isActiveStudent !== undefined ? st.isActiveStudent : st.isActive;
  data.isActive = backendActive === true || backendActive === 'true';
  return data;
}

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'basic',      name: 'Basic Information',    icon: User },
  { id: 'health',     name: 'Health',               icon: HeartPulse },
  { id: 'skills',     name: 'Skills',               icon: Star },
  { id: 'contact',    name: 'Contact Information',  icon: MapPin },
  { id: 'exams',      name: 'Exam Result',          icon: FileCheck },
  { id: 'visibility', name: 'Visibility',           icon: Eye },
];

// ─── Active badge helper ──────────────────────────────────────────────────────
function ActiveBadge({ value }: { value: any }) {
  const active = value === true || value === 'true';
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
      active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
      {active ? 'Active' : 'Inactive'}
    </div>
  );
}

// ─── Shared Context for Form Inputs ───────────────────────────────────────────
const FormContext = React.createContext<any>(null);

// ── Inline FormInput: editable in enrollMode, read-only when viewing student ─
function FormInput({ label, name, type = 'text', options = null, disabled = false, placeholder = '' }: {
  label: string; name: string; type?: string;
  options?: { label: string; value: any }[] | null;
  disabled?: boolean; placeholder?: string;
}) {
  const { formData, handleChange, isEnrollMode, selectedStudent } = React.useContext(FormContext);

  // Read-only view when student is selected but not in edit/enroll mode
  if (!isEnrollMode && selectedStudent) {
    let displayVal = formData[name];
    if (options && displayVal) { const m = options.find((o: any) => o.value === displayVal); if (m) displayVal = m.label; }
    if (type === 'textarea') return (
      <div className="w-full sm:col-span-2 md:col-span-3">
        <FormField label={label} value={displayVal} />
      </div>
    );
    return <FormField label={label} value={displayVal} />;
  }

  const isDisabled = disabled || (!isEnrollMode) || (name === 'username');

  if (options) return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <select name={name} value={formData[name] || ''} onChange={handleChange} disabled={isDisabled}
        className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black disabled:opacity-50">
        <option value="">Choose {label}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
  if (type === 'textarea') return (
    <div className="space-y-1 text-left w-full sm:col-span-2 md:col-span-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <textarea name={name} value={formData[name] || ''} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder} rows={3}
        className="w-full p-3 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 custom-scrollbar disabled:opacity-50" />
    </div>
  );
  return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <Input type={type} name={name} value={formData[name] || ''} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder}
        className="h-10 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:ring-2 focus:ring-primary/10 disabled:opacity-50" />
    </div>
  );
}



export default function StudentsPage() {
  const workspaceRef = useRef<HTMLDivElement>(null);

  // ── Directory state ────────────────────────────────────────────────────────
  const [students,      setStudents]      = useState<StudentProfile[]>([]);
  const [isLoading,     setIsLoading]     = useState(true);
  const [searchTerm,    setSearchTerm]    = useState('');
  const [grades,        setGrades]        = useState<Grade[]>([]);
  const [filterGradeId, setFilterGradeId] = useState<number | ''>('');
  const [filterClassId, setFilterClassId] = useState<number | ''>('');
  const [filterClasses, setFilterClasses] = useState<any[]>([]);
  const [currentPage,   setCurrentPage]   = useState(0);
  const [pageSize]                        = useState(10000);
  const [totalElements, setTotalElements] = useState(0);
  const [message,       setMessage]       = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ── Workspace state ────────────────────────────────────────────────────────
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [activeTab,       setActiveTab]       = useState<string>('basic');
  const [formData,        setFormData]        = useState<any>({ ...BLANK_FORM });
  const [isEnrollMode,            setIsEnrollMode]            = useState(false);
  const [isLoadedExistingStudent, setIsLoadedExistingStudent] = useState(false);
  const [enrollSearchId,          setEnrollSearchId]          = useState('');
  const [enrollSearching,         setEnrollSearching]         = useState(false);
  const [password,                setPassword]                = useState('');
  const [selectedGradeId,         setSelectedGradeId]         = useState<number | ''>('');
  const [selectedClassId,         setSelectedClassId]         = useState<number | ''>('');
  const [classes,                 setClasses]                 = useState<any[]>([]);
  const [isSubmitting,            setIsSubmitting]            = useState(false);

  // ── Data fetchers ──────────────────────────────────────────────────────────
  const fetchGrades = async () => {
    try { setGrades(await api.getGrades()); } catch {}
  };

  const fetchStudents = async (page = 0, silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await api.getPaginatedStudents(page, pageSize, searchTerm, filterGradeId, filterClassId);
      setStudents(res.content);
      setTotalElements(res.totalElements);
      setCurrentPage(page);
    } catch {}
    finally { if (!silent) setIsLoading(false); }
  };

  const fetchClassesForGrade = async (gradeId: number, isFilter = false) => {
    try {
      const data = await api.getClassesByGrade(gradeId);
      isFilter ? setFilterClasses(data) : setClasses(data);
    } catch {}
  };

  // ── Side-effects ───────────────────────────────────────────────────────────
  useEffect(() => { fetchGrades(); }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchStudents(currentPage, currentPage !== 0), 300);
    const i = setInterval(() => fetchStudents(currentPage, true), 10000);
    return () => { clearTimeout(t); clearInterval(i); };
  }, [currentPage, searchTerm, filterGradeId, filterClassId]);

  // Auto-calculate age
  useEffect(() => {
    if (formData.dob) {
      const d = new Date(formData.dob);
      if (!isNaN(d.getTime())) {
        const age = Math.abs(new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970);
        setFormData((p: any) => ({ ...p, age }));
      }
    }
  }, [formData.dob]);

  // Load selected student into workspace
  useEffect(() => {
    if (selectedStudent) {
      setIsEnrollMode(false);
      setFormData(mergeAdditional(selectedStudent));
    } else if (!isEnrollMode) {
      setFormData({ ...BLANK_FORM });
    }
  }, [selectedStudent, isEnrollMode]);



  // Auto-select when search yields exactly 1 result
  useEffect(() => {
    if (!isEnrollMode && searchTerm !== '' && students.length === 1) {
      setSelectedStudent(students[0]);
    }
  }, [students, searchTerm, isEnrollMode]);

  // Clear selection when search is cleared
  useEffect(() => {
    if (searchTerm === '') setSelectedStudent(null);
  }, [searchTerm]);

  // ── Workspace handlers ─────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((p: any) => ({ ...p, [name]: val }));
  };

  const handleStartEnrollmentInline = async () => {
    setSearchTerm('');
    setSelectedStudent(null);
    setIsEnrollMode(true);
    setIsLoadedExistingStudent(false);
    setEnrollSearchId('');
    setActiveTab('basic');
    setPassword('');
    setSelectedGradeId('');
    setSelectedClassId('');
    setClasses([]);
    setFormData({ ...BLANK_FORM, username: 'Generating...' });
    setMessage(null);
    try {
      const idx = await api.getNextStudentIndex();
      setFormData((p: any) => ({ ...p, username: idx }));
    } catch {
      setFormData((p: any) => ({ ...p, username: '' }));
    }
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setIsEnrollMode(false);
    setIsLoadedExistingStudent(false);
    setEnrollSearchId('');
    setFormData({ ...BLANK_FORM });
  };

  const handleSelectStudent = (st: StudentProfile) => {
    setSelectedStudent(st);
    setIsEnrollMode(false);
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  // Inline search within enrollment form — load an existing student for editing
  const handleEnrollSearch = async () => {
    if (!enrollSearchId.trim()) return;
    setEnrollSearching(true);
    setMessage(null);
    try {
      const res = await api.getPaginatedStudents(0, 5, enrollSearchId.trim(), '', '');
      if (res.content && res.content.length > 0) {
        const st = res.content[0];
        const data = mergeAdditional(st);
        setFormData(data);
        setSelectedGradeId(st.gradeId || '');
        setSelectedClassId(st.classId || '');
        if (st.gradeId) {
          try { setClasses(await api.getClassesByGrade(st.gradeId)); } catch {}
        }
        setIsLoadedExistingStudent(true);
        setMessage({ type: 'success', text: `Loaded: ${st.fullName || st.username}` });
      } else {
        setMessage({ type: 'error', text: 'No student found with that Index No.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Search failed. Try again.' });
    } finally { setEnrollSearching(false); }
  };

  // Workspace enrollment and edit save handler
  const handleSaveWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || formData.username === 'Generating...') {
      setMessage({ type: 'error', text: 'Index No is required.' }); return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      if (isEnrollMode) {
        if (isLoadedExistingStudent) {
          // Editing an existing student loaded via inline search — no re-enrollment needed
          const savedProfile = await api.saveStudentProfile(formData.username, buildPayload(formData));
          setMessage({ type: 'success', text: `Profile updated: ${formData.username}` });
          setIsEnrollMode(false);
          setIsLoadedExistingStudent(false);
          setEnrollSearchId('');
          if (savedProfile) {
            const gradeObj = grades.find(g => g.id === savedProfile.gradeId);
            const classObj = classes.find(c => c.id === savedProfile.classId);
            setSelectedStudent({
              ...savedProfile,
              gradeName: savedProfile.gradeName || (gradeObj ? gradeObj.name : undefined),
              className: savedProfile.className || (classObj ? classObj.name : undefined)
            });
          }
        } else {
          // New student enrollment
          if (!password) {
            setMessage({ type: 'error', text: 'Secure passcode is required.' });
            setIsSubmitting(false);
            return;
          }
          if (!selectedGradeId || !selectedClassId) {
            setMessage({ type: 'error', text: 'Primary Grade and Class Section are required.' });
            setIsSubmitting(false);
            return;
          }
          await api.enrollStudent(formData.username, password, selectedGradeId as number, selectedClassId as number);
          const savedProfile = await api.saveStudentProfile(formData.username, buildPayload(formData));
          setMessage({ type: 'success', text: `Student enrolled: ${formData.username}` });
          setIsEnrollMode(false);
          if (savedProfile) {
            const gradeObj = grades.find(g => g.id === (savedProfile.gradeId || selectedGradeId));
            const classObj = classes.find(c => c.id === (savedProfile.classId || selectedClassId));
            setSelectedStudent({
              ...savedProfile,
              gradeName: savedProfile.gradeName || (gradeObj ? gradeObj.name : undefined),
              className: savedProfile.className || (classObj ? classObj.name : undefined)
            });
          }
        }
      } else if (selectedStudent) {
        const savedProfile = await api.saveStudentProfile(formData.username, buildPayload(formData));
        setMessage({ type: 'success', text: 'Student profile updated successfully.' });

        // Update selectedStudent in workspace with enriched names
        if (savedProfile) {
          const enrichedProfile = {
            ...savedProfile,
            gradeName: selectedStudent?.gradeName,
            className: selectedStudent?.className
          };
          setSelectedStudent(enrichedProfile);
        }
      }
      fetchStudents(currentPage, true);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Save failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };



  // ── Shared Talent Checkboxes renderer ─────────────────────────────────────
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

  const ACHIEVEMENT_OPTIONS = [
    { label: '1st Place', value: '1st' },
    { label: '2nd Place', value: '2nd' },
    { label: '3rd Place', value: '3rd' },
    { label: 'Participant', value: 'participant' },
  ];

  const BLOOD_OPTIONS = [
    { label: 'A+', value: 'A+' }, { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' }, { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' }, { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' }, { label: 'AB-', value: 'AB-' },
  ];

  const GENDER_OPTIONS = [{ label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' }];

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <FormContext.Provider value={{ formData, handleChange, isEnrollMode, selectedStudent }}>
      <div className="space-y-4 animate-in fade-in duration-700 pb-10">

      {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white p-2 px-3 rounded-xl border border-slate-100 shadow-md flex flex-col sm:flex-row items-center gap-2 justify-between">
        <div className="relative flex-1 w-full sm:max-w-[380px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <Input placeholder="Search index or name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 h-9 w-full rounded-lg border-slate-200 bg-slate-50 focus:bg-white transition-all text-xs font-bold text-black" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <select value={filterGradeId} onChange={e => {
            const g = e.target.value === '' ? '' : parseInt(e.target.value);
            setFilterGradeId(g); setFilterClassId('');
            if (g !== '') fetchClassesForGrade(g as number, true); else setFilterClasses([]);
          }} className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-black text-black min-w-[110px] cursor-pointer hover:bg-slate-50 transition-colors">
            <option value="">All Grades</option>
            {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>

          <select value={filterClassId} onChange={e => setFilterClassId(e.target.value === '' ? '' : parseInt(e.target.value))}
            disabled={filterGradeId === ''}
            className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-black text-black min-w-[110px] disabled:opacity-50 cursor-pointer hover:bg-slate-50 transition-colors">
            <option value="">All Classes</option>
            {filterClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          {(selectedStudent || isEnrollMode) && (
            <Button className="h-9 px-3 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs"
              onClick={handleReset}>
              <RotateCcw size={13} className="mr-1.5" />Clear Selection
            </Button>
          )}

          <Button
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs shadow-md shadow-primary/20"
            onClick={handleStartEnrollmentInline}>
            <UserPlus size={13} className="mr-1.5" />Enroll Student
          </Button>
        </div>
      </div>

      {/* ── Page notification ───────────────────────────────────────────────── */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-500 shadow-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          </div>
          <div className="text-left">
            <p className="font-bold text-xs uppercase tracking-wide">Notification</p>
            <p className="text-xs font-semibold opacity-90 leading-tight">{message.text}</p>
          </div>
          <button onClick={() => setMessage(null)} className="ml-auto p-1.5 hover:bg-black/5 rounded-md transition-colors"><X size={14} /></button>
        </div>
      )}

      {/* ── Workspace mode indicator ────────────────────────────────────────── */}
      <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-lg border border-slate-100 shadow-sm w-fit animate-in fade-in slide-in-from-top-2 duration-300">
        <span className={`w-2 h-2 rounded-full ${isEnrollMode ? 'bg-amber-500 animate-pulse' : selectedStudent ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
          {isEnrollMode
            ? isLoadedExistingStudent
              ? `Workspace Mode: Editing Existing Student — ${formData.username}`
              : 'Workspace Mode: New Student Enrollment'
            : selectedStudent
              ? `Workspace Mode: Viewing Student — ${selectedStudent.username} (Read-Only)`
              : 'Workspace Mode: Standby — Select a student or click Enroll Student'}
        </span>
      </div>

      {/* ── Workspace card (view / legacy inline enroll) ─────────────────── */}
      <div ref={workspaceRef} />
      <form onSubmit={handleSaveWorkspace}>
        <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative animate-in fade-in slide-in-from-top-3 duration-500">
          <CardHeader className="px-5 py-3.5 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} />
              <CardTitle className="text-sm font-black text-black">
                {isEnrollMode
                  ? isLoadedExistingStudent ? `Editing: ${formData.username}` : 'New Student Enrollment'
                  : selectedStudent ? 'Student Profile' : 'Student Registration Command Center'}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <ActiveBadge value={formData.isActive} />
              <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                ID: {isEnrollMode ? (formData.username || 'Generating...') : (selectedStudent?.username || '—')}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row min-h-[360px]">
              {/* Sidebar */}
              <div className="w-full lg:w-60 bg-slate-50/50 border-r border-slate-100 p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto whitespace-nowrap lg:whitespace-normal">
                {TABS.map(tab => (
                  <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-bold text-[10px] uppercase tracking-wider text-left ${activeTab === tab.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-white hover:text-primary'}`}>
                    <tab.icon size={14} />{tab.name}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="flex-1 p-5 bg-white relative">
                <div className="space-y-4">

                  {activeTab === 'basic' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {isEnrollMode && (
                        <div className="space-y-3">
                          {/* ── Inline Search Bar ── */}
                          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 space-y-2">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
                              <Search size={11} /> Load Existing Student by Index No
                            </h4>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Type student index number or name and press Load..."
                                value={enrollSearchId}
                                onChange={e => setEnrollSearchId(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleEnrollSearch()}
                                className="flex-1 h-9 rounded-lg text-xs font-bold text-black border-blue-200 bg-white focus:ring-2 focus:ring-blue-200"
                              />
                              <button type="button" onClick={handleEnrollSearch} disabled={enrollSearching || !enrollSearchId.trim()}
                                className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider disabled:opacity-50 transition-colors flex items-center gap-1.5">
                                {enrollSearching ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}
                                {enrollSearching ? 'Searching...' : 'Load'}
                              </button>
                              {isLoadedExistingStudent && (
                                <button type="button" onClick={() => {
                                  setIsLoadedExistingStudent(false);
                                  setEnrollSearchId('');
                                  setFormData({ ...BLANK_FORM, username: formData.username });
                                }} className="h-9 px-3 bg-slate-200 hover:bg-slate-300 text-black rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5">
                                  <RotateCcw size={11} /> Clear
                                </button>
                              )}
                            </div>
                            {isLoadedExistingStudent && (
                              <p className="text-[10px] font-black text-blue-700 flex items-center gap-1">
                                <CheckCircle2 size={11} /> Student loaded in editable mode. Modify fields and click Save Changes.
                              </p>
                            )}
                          </div>

                          {/* ── Academic Cell (new students only) ── */}
                          {!isLoadedExistingStudent && (
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Academic Cell &amp; Credentials</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Passcode</label>
                                  <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
                                    className="h-10 rounded-xl border-slate-200 bg-white text-xs font-bold text-black focus:ring-2 focus:ring-primary/10" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Primary Grade</label>
                                  <select value={selectedGradeId} onChange={e => { const g = parseInt(e.target.value); setSelectedGradeId(g); setSelectedClassId(''); fetchClassesForGrade(g); }} required
                                    className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black">
                                    <option value="">Choose Grade</option>
                                    {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Class Section</label>
                                  <select value={selectedClassId} onChange={e => setSelectedClassId(parseInt(e.target.value))} required disabled={!selectedGradeId}
                                    className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black disabled:opacity-50">
                                    <option value="">Choose Class</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <FormInput label="Index No" name="username" disabled />
                        <FormInput label="Full Name" name="fullName" />
                        <FormInput label="Name in Sinhala as Birth Certificate" name="nameSinhala" />
                        <FormInput label="Name with Initial" name="nameWithInitials" />
                        <FormInput label="Name with Initial Sinhala" name="nameWithInitialSinhala" />
                        <FormInput label="Date Of Birth" name="dob" type="date" />
                        <FormInput label="NIC" name="nic" />
                        <FormInput label="Birth Certificate No" name="birthCertificateNumber" />
                        <FormInput label="District" name="district" />
                        <FormInput label="Religion" name="religion" />
                        <FormInput label="Gender" name="gender" options={GENDER_OPTIONS} />
                        <FormInput label="Mother Name" name="motherName" />
                        <FormInput label="Father Name" name="fatherName" />
                        <FormInput label="Guardian ID" name="guardianIdRef" />
                        <FormInput label="Age - Auto Calculate" name="age" disabled placeholder="Auto-calculated" />
                        <FormInput label="Inter School House" name="interSchoolHouse" />
                        <FormInput label="Siblings" name="siblings" type="number" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'health' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <FormInput label="Height" name="height" />
                        <FormInput label="Weight" name="weight" />
                        <FormInput label="Blood Type" name="bloodGroup" options={BLOOD_OPTIONS} />
                        <FormInput label="Special Physical Condition" name="specialPhysicalCondition" />
                        <FormInput label="Special Illness" name="specialIllness" />
                        <FormInput label="Long Term Diseases" name="longTermDiseases" />
                        <FormInput label="Special Need" name="specialNeed" />
                      </div>
                      <FormInput label="Medical Description" name="medicalDescription" type="textarea" />
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Achievements</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                          {ACHIEVEMENT_FIELDS.map(a => <FormInput key={a.name} label={a.label} name={a.name} options={ACHIEVEMENT_OPTIONS} />)}
                        </div>
                        <FormInput label="Achievements Description" name="talentDescription" type="textarea" />
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Additional Talent Areas</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {TALENT_FIELDS.map(t => (
                            <label key={t.name} className={`flex items-center gap-3 p-2 px-3 bg-white border border-slate-200 rounded-xl transition-all ${isEnrollMode ? 'cursor-pointer hover:border-primary' : 'cursor-default opacity-80'}`}>
                              <input type="checkbox" name={t.name} checked={formData[t.name] === true || formData[t.name] === 'true'} onChange={handleChange}
                                disabled={!isEnrollMode}
                                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary disabled:opacity-60" />
                              <span className="text-xs font-bold text-slate-700">{t.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'contact' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormInput label="Permanent Address" name="addressPermanent" type="textarea" />
                        <FormInput label="Temporary Address" name="addressTemporary" type="textarea" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        <FormInput label="Emergency Contact" name="contactEmergency" />
                        <FormInput label="Whatsapp No" name="contactWhatsapp" />
                        <FormInput label="Home No" name="contactHome" />
                        <FormInput label="Mobile No" name="contactMobile" />
                        <FormInput label="Email Address" name="contactEmail" type="email" />
                        <FormInput label="Distance to School" name="distanceToSchool" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'exams' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput label="Grade 05 Exam Result" name="resultGrade05" />
                        <FormInput label="GCE OL Exam Result" name="resultGceOl" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'visibility' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100/80 space-y-4 max-w-md">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                            {isEnrollMode ? 'Set Profile Visibility' : 'Profile Visibility Status'}
                          </span>
                        </div>
                        {isEnrollMode ? (
                          <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-4 cursor-pointer p-3 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-50 transition-colors">
                              <input type="radio" name="isActive" value="true" checked={formData.isActive === true || formData.isActive === 'true'} onChange={() => setFormData((p: any) => ({ ...p, isActive: true }))} className="w-4 h-4 text-emerald-500 focus:ring-emerald-500" />
                              <div>
                                <span className="text-xs font-black text-emerald-800 block">Active</span>
                                <span className="text-[10px] text-slate-400 font-bold">Student can log in and access the system</span>
                              </div>
                            </label>
                            <label className="flex items-center gap-4 cursor-pointer p-3 bg-white border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors">
                              <input type="radio" name="isActive" value="false" checked={formData.isActive === false || formData.isActive === 'false'} onChange={() => setFormData((p: any) => ({ ...p, isActive: false }))} className="w-4 h-4 text-rose-500 focus:ring-rose-500" />
                              <div>
                                <span className="text-xs font-black text-rose-800 block">Inactive</span>
                                <span className="text-[10px] text-slate-400 font-bold">Record preserved. Student cannot log in.</span>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                            formData.isActive === true || formData.isActive === 'true'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-rose-50 border-rose-200 text-rose-800'
                          }`}>
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                              formData.isActive === true || formData.isActive === 'true' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                            }`} />
                            <div>
                              <span className="text-xs font-black block uppercase tracking-wider">
                                {formData.isActive === true || formData.isActive === 'true' ? 'Active' : 'Inactive'}
                              </span>
                              <span className="text-[10px] font-bold opacity-70">
                                {formData.isActive === true || formData.isActive === 'true'
                                  ? 'Student can log in and access the system'
                                  : 'Record preserved. Student cannot log in.'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(isEnrollMode || selectedStudent) && (
                    <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                      <Button type="button" onClick={() => {
                        if (isEnrollMode) {
                          handleReset();
                        } else {
                          if (selectedStudent) setFormData(mergeAdditional(selectedStudent));
                        }
                      }} className="h-10 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-black uppercase tracking-wider text-xs active:scale-95 transition-all">
                        {isEnrollMode ? 'Cancel Enrollment' : 'Revert Changes'}
                      </Button>
                      {isEnrollMode && (
                        <Button type="submit" className="h-10 px-8 rounded-xl bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all shadow-md shadow-primary/20" isLoading={isSubmitting}>
                          {isLoadedExistingStudent ? 'Save Changes' : 'Save & Enroll Student'}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* ── Student Directory ───────────────────────────────────────────────── */}
      <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative">
        <CardHeader className="px-5 py-3 border-b border-slate-100 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-secondary rounded-full" />
            <CardTitle className="text-xs font-black text-black">Student Directory</CardTitle>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shadow-sm">
            <FileSpreadsheet size={13} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-wider text-black">{totalElements} Institutional Records</span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
              <TableRow className="border-none">
                <TableHead className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black w-[150px]">Admission</TableHead>
                <TableHead className="py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black">Student Name</TableHead>
                <TableHead className="hidden md:table-cell py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center w-[150px]">Academic Cell</TableHead>
                <TableHead className="hidden sm:table-cell py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center w-[90px]">Active</TableHead>
                <TableHead className="hidden sm:table-cell py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center w-[130px]">Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={`sk-${i}`}>
                  <TableCell colSpan={5} className="px-4 py-3 animate-pulse"><div className="h-3 bg-slate-100 rounded-full w-full" /></TableCell>
                </TableRow>
              ))}

              {!isLoading && students.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center opacity-20"><Search size={20} /></div>
                      <p className="text-black font-black italic opacity-40 uppercase tracking-widest text-[10px]">No Records Found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && students.map(st => {
                const isActive = st.isActiveStudent === true || (st as any).isActive === true || (st as any).isActive === 'true';
                return (
                  <TableRow key={st.id || st.username} onClick={() => handleSelectStudent(st)}
                    className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${selectedStudent?.username === st.username ? 'bg-primary/5 hover:bg-primary/5' : ''}`}>
                    <TableCell className="px-4 py-2">
                      <button type="button" onClick={e => { e.stopPropagation(); handleSelectStudent(st); }}
                        className="font-black text-primary font-mono tracking-tighter text-xs hover:underline cursor-pointer focus:outline-none transition-all active:scale-95 bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg border border-primary/20">
                        {st.username}
                      </button>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black text-black group-hover:text-primary transition-colors line-clamp-1">
                          {st.fullName || <span className="text-rose-500 italic font-bold">Incomplete Profile</span>}
                        </span>
                        <span className="text-[9px] font-black text-black uppercase opacity-60 md:hidden">{st.gradeName} {st.className}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell py-2 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[9px] font-black text-black uppercase tracking-widest">{st.gradeName || 'N/A'}</span>
                        <span className="text-[9px] font-black text-primary uppercase opacity-70">Class {st.className || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell py-2 text-center">
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        {isActive ? 'Active' : 'Inactive'}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell py-2 text-center">
                      <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${st.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : st.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {st.verificationStatus || 'PENDING'}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
    </FormContext.Provider>
  );
}

function FormField({ label, value }: any) {
  return (
    <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100/85 text-left hover:bg-slate-100 hover:border-slate-200/60 transition-all">
      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
      <span className="block text-xs font-black text-black leading-tight break-words">
        {value === true || value === 'true' ? 'Active' : value === false || value === 'false' ? 'Inactive' : value || '—'}
      </span>
    </div>
  );
}
