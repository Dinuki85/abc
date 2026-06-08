"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Search, X, GraduationCap,
  CheckCircle2, AlertCircle, UserPlus, FileSpreadsheet,
  Save, User, HeartPulse, Star, MapPin, FileCheck, RotateCcw, ArrowRight, Edit, Eye, Users
} from 'lucide-react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

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
  'id', 'username', 'fullName', 'gender', 'dob', 'isActive', 'isActiveStudent', 'activeStudent',
  'gradeId', 'classId', 'verificationStatus', 'verifiedByName',
  'verifiedAt', 'verificationComment', 'profileCompleted',
];

function buildPayload(data: Record<string, unknown>) {
  const extraData: Record<string, unknown> = {};
  Object.keys(data).forEach(key => {
    if (!BASE_KEYS.includes(key) && !key.startsWith('additionalData')) {
      extraData[key] = data[key];
    }
  });
  // Map frontend isActive to backend activeStudent and isActiveStudent
  const activeVal = data.isActive === true || data.isActive === 'true';
  return { ...data, isActiveStudent: activeVal, activeStudent: activeVal, additionalData: JSON.stringify(extraData) } as unknown as StudentProfile;
}

function mergeAdditional(st: StudentProfile) {
  let data: Record<string, unknown> = { ...st };
  if (st.additionalData) {
    try { data = { ...data, ...JSON.parse(st.additionalData) }; } catch { }
  }
  if (!data.username && (st as any).user?.username) {
    data.username = (st as any).user.username;
  }
  // Map backend activeStudent or isActiveStudent to frontend isActive
  const activeStudentVal = (st as any).activeStudent;
  const backendActive = st.isActiveStudent !== undefined ? st.isActiveStudent : (activeStudentVal !== undefined ? activeStudentVal : true);
  data.isActive = backendActive === true || String(backendActive) === 'true';
  return data;
}

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'basic', name: 'Basic Information', icon: User },
  { id: 'health', name: 'Health', icon: HeartPulse },
  { id: 'skills', name: 'Skills', icon: Star },
  { id: 'contact', name: 'Contact Information', icon: MapPin },
  { id: 'exams', name: 'Exam Result', icon: FileCheck },
  { id: 'visibility', name: 'Visibility', icon: Eye },
];

// ─── Active badge helper ──────────────────────────────────────────────────────
function ActiveBadge({ value }: { value: unknown }) {
  const active = value === true || value === 'true';
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
      {active ? 'Active' : 'Inactive'}
    </div>
  );
}

// ─── Shared Context for Form Inputs ───────────────────────────────────────────
const FormContext = React.createContext<unknown>(null);

// ── Inline FormInput: editable in enrollMode or editMode, read-only when viewing student ─
function FormInput({ label, name, type = 'text', options = null, disabled = false, placeholder = '' }: {
  key?: React.Key;
  label: string; name: string; type?: string;
  options?: { label: string; value: any }[] | null;
  disabled?: boolean; placeholder?: string;
}) {
  const ctx = React.useContext(FormContext) as {
    formData: Record<string, unknown>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    isEnrollMode: boolean;
    isEditMode: boolean;
    selectedStudent: StudentProfile | null;
  };
  const { formData, handleChange, isEnrollMode, isEditMode, selectedStudent } = ctx;

  // Read-only view when student is selected but not in edit/enroll mode
  if (!isEnrollMode && !isEditMode && selectedStudent) {
    let displayVal = formData[name];
    if (options && displayVal) { const m = options.find((o: { label: string; value: unknown }) => o.value === displayVal); if (m) displayVal = m.label; }
    if (type === 'textarea') return (
      <div className="w-full sm:col-span-2 md:col-span-3">
        <FormField label={label} value={displayVal} />
      </div>
    );
    return <FormField label={label} value={displayVal} />;
  }

  const isDisabled = disabled || (!isEnrollMode && !isEditMode) || (name === 'username');

  if (options) return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <select name={name} value={String(formData[name] || '')} onChange={handleChange} disabled={isDisabled} title={label}
        className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black disabled:opacity-50">
        <option value="">Choose {label}</option>
        {options.map((o: { label: string; value: unknown }) => <option key={String(o.value)} value={String(o.value)}>{o.label}</option>)}
      </select>
    </div>
  );
  if (type === 'textarea') return (
    <div className="space-y-1 text-left w-full sm:col-span-2 md:col-span-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <textarea name={name} value={String(formData[name] || '')} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder} rows={3}
        className="w-full p-3 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 custom-scrollbar disabled:opacity-50" />
    </div>
  );
  return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <Input type={type} name={name} value={String(formData[name] || '')} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder}
        className="h-10 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:ring-2 focus:ring-primary/10 disabled:opacity-50" />
    </div>
  );
}



function StudentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const workspaceRef = useRef<HTMLDivElement>(null);

  // ── Directory state ────────────────────────────────────────────────────────
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [_isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [filterGradeId] = useState<number | ''>('');
  const [filterClassId] = useState<number | ''>('');
  const [filterClasses] = useState<{ id: number; name: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10000);
  const [_totalElements, setTotalElements] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ── Workspace state ────────────────────────────────────────────────────────
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [formData, setFormData] = useState<Record<string, unknown>>({ ...BLANK_FORM });
  const [isEnrollMode, setIsEnrollMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadedExistingStudent, setIsLoadedExistingStudent] = useState(false);
  const [enrollSearchId, setEnrollSearchId] = useState('');
  const [enrollSearching, setEnrollSearching] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState<number | ''>('');
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Data fetchers ──────────────────────────────────────────────────────────
  const fetchGrades = async () => {
    try { setGrades(await api.getGrades()); } catch { }
  };

  const fetchStudents = async (page = 0, silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await api.getPaginatedStudents(page, pageSize, searchTerm, filterGradeId, filterClassId);
      setStudents(res.content);
      setTotalElements(res.totalElements);
      setCurrentPage(page);
    } catch { }
    finally { if (!silent) setIsLoading(false); }
  };

  const fetchClassesForGrade = async (gradeId: number) => {
    try {
      const data = await api.getClassesByGrade(gradeId);
      setClasses(data);
    } catch { }
  };

  // ── Side-effects ───────────────────────────────────────────────────────────
  useEffect(() => { fetchGrades(); }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchStudents(currentPage, currentPage !== 0), 300);
    const i = setInterval(() => fetchStudents(currentPage, true), 10000);
    return () => { clearTimeout(t); clearInterval(i); };
  }, [currentPage, searchTerm]);

  // Auto-calculate age
  useEffect(() => {
    if (formData.dob) {
      const d = new Date(String(formData.dob));
      if (!isNaN(d.getTime())) {
        const age = Math.abs(new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970);
        setFormData((p: Record<string, unknown>) => ({ ...p, age }));
      }
    }
  }, [formData.dob]);

  // Load selected student into workspace
  // isEditMode is in deps so formData is NOT overwritten while user is editing
  useEffect(() => {
    if (selectedStudent) {
      setIsEnrollMode(false);
      if (!isEditMode) {
        setFormData(mergeAdditional(selectedStudent));
      }
    } else if (!isEnrollMode) {
      setFormData({ ...BLANK_FORM });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent, isEnrollMode, isEditMode]);



  // Auto-select when search yields exactly 1 result
  // Use stable reference check to avoid resetting formData on every poll
  useEffect(() => {
    if (!isEnrollMode && searchTerm !== '' && students.length === 1) {
      setSelectedStudent(prev => {
        // If it's the same student by ID, keep the existing reference
        // so the selectedStudent effect doesn't fire and reset formData
        if (prev && (prev as any).id === (students[0] as any).id) return prev;
        return students[0];
      });
    }
  }, [students, searchTerm, isEnrollMode]);

  // Clear selection when search is cleared
  useEffect(() => {
    if (searchTerm === '') {
      setSelectedStudent(null);
      setIsEditMode(false);
    }
  }, [searchTerm]);

  // ── Workspace handlers ─────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((p: Record<string, unknown>) => ({ ...p, [name]: val }));
  };

  const handleStartEnrollmentInline = async () => {
    setSearchTerm('');
    setSelectedStudent(null);
    setIsEnrollMode(true);
    setIsLoadedExistingStudent(false);
    setEnrollSearchId('');
    setActiveTab('basic');
    setSelectedGradeId('');
    setSelectedClassId('');
    setClasses([]);
    setFormData({ ...BLANK_FORM, username: 'Generating...' });
    setMessage(null);
    try {
      const idx = await api.getNextStudentIndex();
      setFormData((p: Record<string, unknown>) => ({ ...p, username: idx }));
    } catch {
      setFormData((p: Record<string, unknown>) => ({ ...p, username: '' }));
    }
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setIsEnrollMode(false);
    setIsEditMode(false);
    setIsLoadedExistingStudent(false);
    setEnrollSearchId('');
    setFormData({ ...BLANK_FORM });
    setSearchTerm('');
    router.replace('/admin/students');
  };

  const _handleSelectStudent = (st: StudentProfile) => {
    setSelectedStudent(st);
    setIsEnrollMode(false);
    setIsEditMode(false);
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  // Start editing the selected student
  const handleStartEdit = () => {
    setIsEditMode(true);
  };

  // Cancel edit mode — setting isEditMode=false will trigger the selectedStudent
  // useEffect which reloads the original formData automatically
  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  // Inline search within enrollment form — load an existing student for editing
  const _handleEnrollSearch = async () => {
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
          try { setClasses(await api.getClassesByGrade(st.gradeId)); } catch { }
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
    const username = String(formData.username || '');
    if (!username || username === 'Generating...') {
      setMessage({ type: 'error', text: 'Index No is required.' }); return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      if (isEnrollMode) {
        if (isLoadedExistingStudent) {
          // Editing an existing student loaded via inline search — no re-enrollment needed
          const savedProfile = await api.saveStudentProfile(username, buildPayload(formData));
          setMessage({ type: 'success', text: `Profile updated: ${username}` });
          setIsEnrollMode(false);
          setIsLoadedExistingStudent(false);
          setEnrollSearchId('');
          if (savedProfile) {
            const gradeObj = grades.find(g => g.id === savedProfile.gradeId);
            const classObj = classes.find(c => c.id === savedProfile.classId);
            setSelectedStudent({
              ...savedProfile,
              username: savedProfile.username || savedProfile.user?.username || username,
              gradeName: savedProfile.gradeName || (gradeObj ? gradeObj.name : undefined),
              className: savedProfile.className || (classObj ? classObj.name : undefined)
            });
          }
        } else {
          // New student enrollment
          if (!selectedGradeId || !selectedClassId) {
            setMessage({ type: 'error', text: 'Primary Grade and Class Section are required.' });
            setIsSubmitting(false);
            return;
          }
          await api.enrollStudent(username, '', selectedGradeId as number, selectedClassId as number);
          const savedProfile = await api.saveStudentProfile(username, buildPayload(formData));
          setMessage({ type: 'success', text: `Student enrolled: ${username}` });
          setIsEnrollMode(false);
          if (savedProfile) {
            const gradeObj = grades.find(g => g.id === (savedProfile.gradeId || selectedGradeId));
            const classObj = classes.find(c => c.id === (savedProfile.classId || selectedClassId));
            setSelectedStudent({
              ...savedProfile,
              username: savedProfile.username || savedProfile.user?.username || username,
              gradeName: savedProfile.gradeName || (gradeObj ? gradeObj.name : undefined),
              className: savedProfile.className || (classObj ? classObj.name : undefined)
            });
          }
        }
      } else if (selectedStudent) {
        const savedProfile = await api.saveStudentProfile(username, buildPayload(formData));
        setMessage({ type: 'success', text: 'Student profile updated successfully.' });
        setIsEditMode(false);

        // Update selectedStudent in workspace with enriched names
        if (savedProfile) {
          const enrichedProfile = {
            ...savedProfile,
            username: savedProfile.username || savedProfile.user?.username || username,
            gradeName: selectedStudent?.gradeName,
            className: selectedStudent?.className
          };
          setSelectedStudent(enrichedProfile);
        }
      }
      fetchStudents(currentPage, true);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Save failed.';
      setMessage({ type: 'error', text: errMsg });
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
    <FormContext.Provider value={{ formData, handleChange, isEnrollMode, isEditMode, selectedStudent }}>
      <div className="flex flex-col space-y-3 animate-in fade-in duration-700 pb-6">

        {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
        <div className="w-full bg-white p-2 px-3 rounded-xl border border-slate-100 shadow-md flex flex-col sm:flex-row items-center gap-2 justify-between shrink-0">
          <div className="flex items-center gap-2 flex-1 w-full sm:max-w-[480px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <Input placeholder="Search index or name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 h-9 w-full rounded-lg border-slate-200 bg-slate-50 focus:bg-white transition-all text-xs font-bold text-black" />
            </div>
            <Link href="/admin/reporting?report=students" className="shrink-0 flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-black uppercase tracking-wider text-[10px] transition-all duration-200 active:scale-95">
              <FileSpreadsheet size={13} /> View All Student List
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">

            {(selectedStudent || isEnrollMode) && (
              <Button className="h-9 px-3 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs"
                onClick={handleReset}>
                <RotateCcw size={13} className="mr-1.5" />{isEnrollMode ? 'Back' : 'Clear Selection'}
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
            <button onClick={() => setMessage(null)} className="ml-auto p-1.5 hover:bg-black/5 rounded-md transition-colors" title="Close notification"><X size={14} /></button>
          </div>
        )}

        {/* ── Workspace mode indicator ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-lg border border-slate-100 shadow-sm w-fit animate-in fade-in slide-in-from-top-2 duration-300 shrink-0">
          <span className={`w-2 h-2 rounded-full ${isEnrollMode ? 'bg-amber-500 animate-pulse' : selectedStudent ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            {isEnrollMode
              ? isLoadedExistingStudent
                ? `Workspace Mode: Editing Existing Student — ${formData.username}`
                : 'Workspace Mode: New Student Enrollment'
              : isEditMode
                ? `Workspace Mode: Editing Student — ${selectedStudent?.username}`
                : selectedStudent
                ? `Workspace Mode: Viewing Student — ${selectedStudent.username} (Read-Only)`
                : 'Workspace Mode: Standby — Select a student or click Enroll Student'}
          </span>
        </div>

        {/* ── Workspace card (view / legacy inline enroll) ─────────────────── */}
        <div ref={workspaceRef} />
        <form onSubmit={handleSaveWorkspace}>
          <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative animate-in fade-in slide-in-from-top-3 duration-500">
            <CardHeader className="px-5 py-3 border-b border-slate-100 flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                <CardTitle className="text-sm font-black text-black">
                  {isEnrollMode
                    ? isLoadedExistingStudent ? `Editing: ${formData.username}` : 'New Student Enrollment'
                    : isEditMode ? `Editing: ${formData.username}`
                    : selectedStudent ? 'Student Profile' : 'Student Registration Command Center'}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <ActiveBadge value={formData.isActive} />
                <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                  ID: {String(isEnrollMode ? (formData.username || 'Generating...') : (selectedStudent?.username || '—'))}
                </div>
                {selectedStudent && !isEnrollMode && (
                  <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-200">
                    {!isEditMode ? (
                      <>
                        <button
                          type="button"
                          className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1 cursor-pointer select-none"
                          onMouseDown={(e) => { e.preventDefault(); setIsEditMode(true); }}>
                          <Edit size={12} /> Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <Button type="submit"
                          className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs"
                          isLoading={isSubmitting}>
                          <Save size={12} className="mr-1" /> Save
                        </Button>
                        <Button type="button"
                          className="h-8 px-3 rounded-lg bg-slate-500 hover:bg-slate-600 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs"
                          onClick={handleCancelEdit}>
                          <X size={12} className="mr-1" /> Cancel
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <div className="w-full lg:w-60 bg-slate-50/50 border-r border-slate-100 p-3 flex lg:flex-col gap-1 overflow-x-auto whitespace-nowrap lg:whitespace-normal custom-scrollbar shrink-0">
                  {TABS.filter(tab => tab.id !== 'visibility' || !isEnrollMode).map(tab => (
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
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Academic Cell</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Primary Grade</label>
                                <select value={selectedGradeId} onChange={e => { const g = parseInt(e.target.value); setSelectedGradeId(g); setSelectedClassId(''); fetchClassesForGrade(g); }} required title="Select Primary Grade"
                                  className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black">
                                  <option value="">Choose Grade</option>
                                  {grades.map((g: Grade) => <option key={g.id} value={g.id}>{g.name}</option>)}
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Class Section</label>
                                <select value={selectedClassId} onChange={e => setSelectedClassId(parseInt(e.target.value))} required disabled={!selectedGradeId} title="Select Class Section"
                                  className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black disabled:opacity-50">
                                  <option value="">Choose Class</option>
                                  {classes.map((c: { id: number; name: string }) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                              </div>
                            </div>
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
                          {/* Guardian ID Link to Parent Directory */}
                          <div className="space-y-1 text-left">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Guardian ID</label>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                {(!isEnrollMode && !isEditMode && selectedStudent) ? (
                                  <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100/85 text-left h-full flex flex-col justify-center">
                                    <span className="block text-xs font-black text-black leading-tight wrap-break-word">
                                      {String(formData.guardianIdRef || '—')}
                                    </span>
                                  </div>
                                ) : (
                                  <Input type="text" name="guardianIdRef" value={String(formData.guardianIdRef || '')} onChange={handleChange}
                                    disabled={!isEnrollMode && !isEditMode} placeholder="e.g. GDN-..."
                                    className="h-10 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:ring-2 focus:ring-primary/10 disabled:opacity-50 w-full" />
                                )}
                              </div>
                              {Boolean(formData.guardianIdRef) && (
                                <Link href={`/admin/parents?guardianId=${String(formData.guardianIdRef)}`} className="h-10 px-3 flex items-center justify-center rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20 shrink-0" title="View Guardian Profile">
                                  <Users size={16} />
                                </Link>
                              )}
                            </div>
                          </div>
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
                              <label key={t.name} className={`flex items-center gap-3 p-2 px-3 bg-white border border-slate-200 rounded-xl transition-all ${(isEnrollMode || isEditMode) ? 'cursor-pointer hover:border-primary' : 'cursor-default opacity-80'}`}>
                                <input type="checkbox" name={t.name} checked={formData[t.name] === true || formData[t.name] === 'true'} onChange={handleChange}
                                  disabled={!isEnrollMode && !isEditMode}
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

                    {activeTab === 'visibility' && (
                      <div className="space-y-4 animate-in fade-in duration-300">
    <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/60 space-y-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Eye className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-700">Student Status</h4>
                              <p className="text-[9px] text-blue-600 font-semibold">Manage student visibility and enrollment status</p>
                            </div>
                          </div>

                          <label className={`flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer border-2 ${formData.isActive === true || formData.isActive === 'true' ? 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100' : 'bg-rose-50 border-rose-300 hover:bg-rose-100'}`}>
                            <div className="shrink-0">
                              <div className={`relative inline-flex h-14 w-24 items-center rounded-full transition-colors shadow-sm ${formData.isActive === true || formData.isActive === 'true' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                <span className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-md transition-transform ${formData.isActive === true || formData.isActive === 'true' ? 'translate-x-12' : 'translate-x-1'}`} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-black uppercase tracking-widest ${formData.isActive === true || formData.isActive === 'true' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                {formData.isActive === true || formData.isActive === 'true' ? 'Active' : 'Inactive'}
                              </p>
                              <p className={`text-xs font-bold leading-tight mt-0.5 ${formData.isActive === true || formData.isActive === 'true' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {formData.isActive === true || formData.isActive === 'true' ? 'Student is currently active in the school' : 'Student has left the school'}
                              </p>
                            </div>
                            <input type="checkbox" name="isActive" checked={formData.isActive === true || formData.isActive === 'true'} onChange={handleChange}
                              disabled={!selectedStudent && !isEnrollMode}
                              className="sr-only" />
                          </label>

                          <div className={`p-3 rounded-lg text-xs font-semibold ${formData.isActive === true || formData.isActive === 'true' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            <p>{formData.isActive === true || formData.isActive === 'true' 
                              ? '✓ This student is active and their records are fully accessible.' 
                              : '✓ This student is marked as inactive. Their records remain in the system for historical reference.'}</p>
                          </div>
                        </div>
                        {selectedStudent && (
                          <div className="mt-4 flex justify-end border-t border-slate-100 pt-4 gap-2">
                            <Button type="submit" className="h-10 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all shadow-md shadow-emerald-600/20" isLoading={isSubmitting}>
                              <Save size={14} className="mr-2" />Save Changes
                            </Button>
                            {isEditMode && (
                              <Button type="button" className="h-10 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all" onClick={handleCancelEdit}>
                                <X size={14} className="mr-2" />Cancel
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'exams' && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormInput label="Grade 05 Exam Result" name="resultGrade05" />
                          <FormInput label="GCE OL Exam Result" name="resultGceOl" />
                        </div>
                        {(isEnrollMode || isEditMode) && (
                          <div className="mt-4 flex justify-end border-t border-slate-100 pt-4 gap-2">
                            {isEnrollMode && (
                              <Button type="submit" className="h-10 px-8 rounded-xl bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all shadow-md shadow-primary/20" isLoading={isSubmitting}>
                                Save &amp; Enroll Student
                              </Button>
                            )}
                            {isEditMode && (
                              <>
                                <Button type="submit" className="h-10 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all shadow-md shadow-emerald-600/20" isLoading={isSubmitting}>
                                  <Save size={14} className="mr-2" />Save Changes
                                </Button>
                                <Button type="button" className="h-10 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all" onClick={handleCancelEdit}>
                                  <X size={14} className="mr-2" />Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}


                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>


      </div>
    </FormContext.Provider>
  );
}

export default function StudentsPage() {
  return (
    <Suspense fallback={<div className="p-8 flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <StudentsPageContent />
    </Suspense>
  );
}

function FormField({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100/85 text-left hover:bg-slate-100 hover:border-slate-200/60 transition-all">
      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
      <span className="block text-xs font-black text-black leading-tight wrap-break-word">
        {value === true || value === 'true' ? 'Active' : value === false || value === 'false' ? 'Inactive' : String(value || '—')}
      </span>
    </div>
  );
}
