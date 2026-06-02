"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Search, X, Briefcase, CheckCircle2, AlertCircle, UserPlus,
  FileSpreadsheet, Save, User, HeartPulse, MapPin, GraduationCap,
  Users, RotateCcw, Edit, Eye, Lock
} from 'lucide-react';
import { api, Teacher } from '@/lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// ─── Blank form template for staff ───────────────────────────────────────────
const BLANK_FORM = {
  username: '',
  fullName: '',
  nameSinhala: '',
  nameWithInitials: '',
  nameWithInitialSinhala: '',
  dob: '',
  nic: '',
  birthCertificateNo: '',
  district: '',
  religion: '',
  gender: '',
  motherName: '',
  fatherName: '',
  guardianId: '',
  age: '',
  civilState: '',
  maritalState: '',
  height: '',
  weight: '',
  bloodGroup: '',
  specialPhysicalCondition: '',
  longTermDiseases: '',
  healthDescription: '',
  firstAppointmentDate: '',
  firstAppointmentDistrict: '',
  firstAppointmentInstitute: '',
  hierarchyCarder: '',
  position: '',
  incrementDate: '',
  servicePeriod: '',
  salaryCode: '',
  holdingPosition: '',
  grade: '',
  appointmentMedium: '',
  temporaryAddress: '',
  emergencyContactNo: '',
  whatsappNo: '',
  homeNo: '',
  contactMobile: '',
  email: '',
  distanceToSchool: '',
  gceOl: '',
  gceAl: '',
  diploma: '',
  degree: '',
  postGraduate: '',
  master: '',
  phd: '',
  otherQual1: '',
  otherQual2: '',
  otherQual3: '',
  otherQual4: '',
  otherQual5: '',
  spouseName: '',
  spouseDesignation: '',
  spouseWorkingAddress: '',
  spouseTempAddress: '',
  spouseOfficeContact: '',
  spouseEmergencyContact: '',
  spouseEmergencyEmail: '',
  spouseWorkingCompany: '',
  children: [
    { name: '', age: '' },
    { name: '', age: '' },
    { name: '', age: '' }
  ],
  isActive: true,
  tempPassword: '',
  designation: 'CLASS_TEACHER'
};

const BASE_KEYS = [
  'id', 'username', 'fullName', 'gender', 'dob', 'isActive', 'isActiveStaff',
  'profileCompleted', 'designation', 'user'
];

function buildPayload(data: Record<string, any>) {
  const payload = { ...data };

  // Serialize children details as a JSON string
  if (Array.isArray(data.children)) {
    const validChildren = data.children.filter((c: any) => c.name && c.name.trim() !== '');
    payload.childrenDetails = JSON.stringify(validChildren);
  } else {
    payload.childrenDetails = '[]';
  }

  // Map frontend isActive -> isActiveStaff for backend
  const activeVal = data.isActive === true || data.isActive === 'true';
  payload.isActiveStaff = activeVal;

  // Ensure name/fullName are consistent
  if (payload.fullName) payload.name = payload.fullName;

  return payload as unknown as Teacher;
}

function mergeAdditional(t: Teacher) {
  let data: Record<string, any> = { ...t };

  // Parse childrenDetails string
  let children = [
    { name: '', age: '' },
    { name: '', age: '' },
    { name: '', age: '' }
  ];
  if (t.childrenDetails) {
    try {
      const parsed = JSON.parse(t.childrenDetails);
      if (Array.isArray(parsed)) {
        children = parsed.map(c => ({
          name: c.name || '',
          age: c.age !== undefined ? String(c.age) : ''
        }));
        while (children.length < 3) {
          children.push({ name: '', age: '' });
        }
      }
    } catch (e) {
      console.error("Failed to parse childrenDetails", e);
    }
  }
  data.children = children;

  // Map backend isActiveStaff to frontend isActive
  const activeVal = t.isActiveStaff !== undefined ? t.isActiveStaff : (t as any).activeStaff;
  data.isActive = activeVal !== false;

  // The full Staff entity nests username inside user.username —
  // fall back to it so the Teacher ID field always shows a value
  if (!data.username && (t as any).user?.username) {
    data.username = (t as any).user.username;
  }

  // Ensure fullName is populated (entity may only have 'name')
  if (!data.fullName && data.name) {
    data.fullName = data.name;
  }

  return data;
}

function ensureUsername(t: Teacher | null): Teacher | null {
  if (!t) return null;
  const copy = { ...t };
  if (!copy.username && (copy as any).user?.username) {
    copy.username = (copy as any).user.username;
  }
  if (!copy.fullName && copy.name) {
    copy.fullName = copy.name;
  }
  if (!copy.name && copy.fullName) {
    copy.name = copy.fullName;
  }
  return copy;
}


const TABS = [
  { id: 'basic', name: 'Tab 1 - Basic Information', icon: User },
  { id: 'health', name: 'Tab 2 - Health', icon: HeartPulse },
  { id: 'service', name: 'Tab 3 - Service History', icon: Briefcase },
  { id: 'contact', name: 'Tab 4 - Contact Information', icon: MapPin },
  { id: 'qualification', name: 'Tab 5 - Qualification', icon: GraduationCap },
  { id: 'family', name: 'Tab 6 - Spouse & Children', icon: Users },
  { id: 'visibility', name: 'Tab 7 - Visibility', icon: Eye },
];

const FormContext = React.createContext<any>(null);

function FormInput({ label, name, type = 'text', options = null, disabled = false, placeholder = '' }: {
  label: string; name: string; type?: string;
  options?: { label: string; value: any }[] | null;
  disabled?: boolean; placeholder?: string;
}) {
  const ctx = React.useContext(FormContext);
  const { formData, handleChange, isEnrollMode, isEditMode, selectedStaff } = ctx;

  if (!isEnrollMode && !isEditMode && selectedStaff) {
    let displayVal = formData[name];
    if (options && displayVal) {
      const m = options.find((o: any) => o.value === displayVal);
      if (m) displayVal = m.label;
    }
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
        className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 text-xs font-bold text-black disabled:opacity-50">
        <option value="">Choose {label}</option>
        {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
  if (type === 'textarea') return (
    <div className="space-y-1 text-left w-full sm:col-span-2 md:col-span-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <textarea name={name} value={String(formData[name] || '')} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder} rows={3}
        className="w-full p-3 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 custom-scrollbar disabled:opacity-50" />
    </div>
  );
  return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <Input type={type} name={name} value={String(formData[name] || '')} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder}
        className="h-10 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:ring-2 focus:ring-indigo-500/10 disabled:opacity-50" />
    </div>
  );
}

function FormField({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100/85 text-left hover:bg-slate-100 hover:border-slate-200/60 transition-all">
      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
      <span className="block text-xs font-black text-black leading-tight wrap-break-word">
        {value === true || value === 'true' ? 'Active' : value === false || value === 'false' ? 'Inactive' : String(value || '—')}
      </span>
    </div>
  );
}

function ActiveBadge({ value }: { value: any }) {
  const active = value === true || value === 'true';
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
      active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      {active ? 'Active' : 'Inactive'}
    </div>
  );
}

function StaffPageContent() {
  const workspaceRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryUsername = searchParams.get('username');
  const queryEdit = searchParams.get('edit');

  // ── Directory state ────────────────────────────────────────────────────────
  const [staffMembers, setStaffMembers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ── Workspace state ────────────────────────────────────────────────────────
  const [selectedStaff, setSelectedStaff] = useState<Teacher | null>(null);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [formData, setFormData] = useState<Record<string, any>>({ ...BLANK_FORM });
  const [isEnrollMode, setIsEnrollMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredStaff = useMemo(() => {
    return staffMembers.filter(s =>
      (s.name || s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staffMembers, searchTerm]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTeacherOverview();
      setStaffMembers(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load staff profile if query parameter is set
  useEffect(() => {
    if (queryUsername && staffMembers.length > 0) {
      const matched = staffMembers.find(s => s.username === queryUsername);
      if (matched) {
        if (!selectedStaff || selectedStaff.username !== queryUsername || isEditMode !== (queryEdit === 'true')) {
          handleSelectStaff(matched, queryEdit === 'true', false);
        }
      }
    }
  }, [queryUsername, queryEdit, staffMembers, selectedStaff, isEditMode]);

  // Auto-calculate age from DOB
  useEffect(() => {
    if (formData.dob) {
      const d = new Date(String(formData.dob));
      if (!isNaN(d.getTime())) {
        const age = Math.abs(new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970);
        setFormData((p: any) => ({ ...p, age }));
      }
    }
  }, [formData.dob]);

  // Reset form when going into enroll mode or clearing selection
  useEffect(() => {
    if (!selectedStaff && !isEnrollMode) {
      setFormData({ ...BLANK_FORM });
    }
  }, [selectedStaff, isEnrollMode]);

  // Auto-select when search yields exactly 1 result (no scroll - user didn't click)
  useEffect(() => {
    if (!isEnrollMode && !isEditMode && searchTerm !== '' && filteredStaff.length === 1) {
      const target = filteredStaff[0];
      if (!selectedStaff || selectedStaff.username !== target.username) {
        handleSelectStaff(target, false, false);
      }
    }
  }, [filteredStaff, searchTerm, isEnrollMode, isEditMode, selectedStaff]);

  // Clear selection when search is cleared
  const prevSearchTermRef = useRef(searchTerm);
  useEffect(() => {
    if (searchTerm === '' && prevSearchTermRef.current !== '') {
      setSelectedStaff(null);
      setIsEditMode(false);
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((p: any) => ({ ...p, [name]: val }));
  };

  const handleStartEnrollmentInline = async () => {
    setSearchTerm('');
    setSelectedStaff(null);
    setIsEnrollMode(true);
    setIsEditMode(false);
    setActiveTab('basic');
    setFormData({ ...BLANK_FORM, username: 'Generating...', tempPassword: 'temp' + Math.floor(100 + Math.random() * 900) });
    setMessage(null);
    router.push('/admin/staff');
    try {
      const idx = await api.getNextTeacherIndex();
      setFormData((p: any) => ({ ...p, username: idx }));
    } catch {
      setFormData((p: any) => ({ ...p, username: '' }));
    }
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleReset = () => {
    setSelectedStaff(null);
    setIsEnrollMode(false);
    setIsEditMode(false);
    setFormData({ ...BLANK_FORM });
    setSearchTerm('');
    setMessage(null);
    router.push('/admin/staff');
  };

  const handleSelectStaff = async (t: Teacher, editOnLoad = false, scrollToWorkspace = true) => {
    // Show skeleton immediately with overview data
    setSelectedStaff(ensureUsername(t));
    setIsEnrollMode(false);
    setIsEditMode(editOnLoad);
    setFormData(mergeAdditional(t));
    // Only scroll when user explicitly clicked a row or button
    if (scrollToWorkspace) {
      setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
    // Then fetch full profile in background and re-populate
    try {
      const full = await api.getFullStaffProfile(t.username);
      if (full) {
        const mappedFull = ensureUsername(full as Teacher) as Teacher;
        setSelectedStaff(mappedFull);
        setFormData((currentForm) => {
          if (currentForm.username === mappedFull.username) {
            const merged = mergeAdditional(mappedFull);
            // If the user hasn't started editing, use merged directly
            if (!editOnLoad) {
              return merged;
            }
            // If editing, merge keys but do not let blank values from currentForm overwrite populated merged values
            const result = { ...merged };
            Object.keys(currentForm).forEach(key => {
              if (currentForm[key] !== '' && currentForm[key] !== null && currentForm[key] !== undefined) {
                if (key === 'children') {
                  const hasInput = currentForm.children?.some((c: any) => c.name || c.age);
                  if (hasInput) result.children = currentForm.children;
                } else {
                  result[key] = currentForm[key];
                }
              }
            });
            return result;
          }
          return currentForm;
        });
      }
    } catch (err) {
      console.warn('Could not load full staff profile, using overview data.', err);
    }
  };

  const handleStartEdit = () => {
    setIsEditMode(true);
    if (selectedStaff) {
      router.push(`/admin/staff?username=${selectedStaff.username}&edit=true`);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    if (selectedStaff) {
      setFormData(mergeAdditional(selectedStaff));
      router.push(`/admin/staff?username=${selectedStaff.username}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff member? This will also remove their institutional access.')) return;
    try {
      await api.deleteTeacher(id);
      setMessage({ type: 'success', text: 'Staff member removed successfully!' });
      handleReset();
      fetchStaff();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete record' });
    }
  };

  const handleSaveWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = String(formData.username || '');
    if (!username || username === 'Generating...') {
      setMessage({ type: 'error', text: 'Teacher ID is required.' });
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      if (isEnrollMode) {
        // 1. Create teacher account
        await api.createTeacher(
          formData.fullName || username,
          username,
          formData.tempPassword || 'temp123',
          formData.designation || 'CLASS_TEACHER'
        );
        // 2. Save profile details
        await api.saveStaffProfile(username, buildPayload(formData));
        setMessage({ type: 'success', text: `Staff enrolled successfully: ${username}` });
        setIsEnrollMode(false);
        // Fetch fresh full profile
        const fresh = await api.getFullStaffProfile(username);
        if (fresh) {
          const mappedFresh = ensureUsername(fresh as Teacher) as Teacher;
          setSelectedStaff(mappedFresh);
          setFormData(mergeAdditional(mappedFresh));
        }
        router.push(`/admin/staff?username=${username}`);
      } else if (selectedStaff) {
        // Update teacher profile
        await api.saveStaffProfile(username, buildPayload(formData));
        setMessage({ type: 'success', text: 'Staff profile updated successfully.' });
        setIsEditMode(false);
        // Fetch fresh full profile
        const fresh = await api.getFullStaffProfile(username);
        if (fresh) {
          const mappedFresh = ensureUsername(fresh as Teacher) as Teacher;
          setSelectedStaff(mappedFresh);
          setFormData(mergeAdditional(mappedFresh));
        }
        router.push(`/admin/staff?username=${username}`);
      }
      fetchStaff();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Save failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Option Constants ──────────────────────────────────────────────────────
  const GENDER_OPTIONS = [{ label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' }];
  const CIVIL_OPTIONS = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Widowed', value: 'Widowed' },
    { label: 'Separate', value: 'Separate' },
    { label: 'Divorce', value: 'Divorce' }
  ];
  const BLOOD_OPTIONS = [
    { label: 'A+', value: 'A+' }, { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' }, { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' }, { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' }, { label: 'AB-', value: 'AB-' }
  ];
  const CARDER_OPTIONS = [
    { label: 'Academic', value: 'Academic' },
    { label: 'Non Academic', value: 'Non Academic' },
    { label: 'DO', value: 'DO' },
    { label: 'Coaches', value: 'Coaches' },
    { label: 'Volunteers', value: 'Volunteers' }
  ];
  const HOLDING_POSITION_OPTIONS = [
    { label: 'Principle', value: 'Principle' },
    { label: 'Vice Principle', value: 'Vice Principle' },
    { label: 'Assistant Principle', value: 'Assistant Principle' },
    { label: 'Section Head', value: 'Section Head' },
    { label: 'Sector Head', value: 'Sector Head' },
    { label: 'Class Teacher', value: 'Class Teacher' }
  ];
  const DESIGNATION_OPTIONS = [
    { label: 'Class Teacher', value: 'CLASS_TEACHER' },
    { label: 'Subject Teacher', value: 'SUBJECT_TEACHER' },
    { label: 'Section Head', value: 'SECTION_HEAD' },
    { label: 'IT Teacher', value: 'IT_TEACHER' },
    { label: 'Sport Coach', value: 'SPORT_COACH' },
    { label: 'Office Staff', value: 'OFFICE_STAFF' },
    { label: 'Principal', value: 'PRINCIPAL' }
  ];

  return (
    <FormContext.Provider value={{ formData, handleChange, isEnrollMode, isEditMode, selectedStaff }}>
      <div className="flex flex-col space-y-6 animate-in fade-in duration-700 pb-20">
        
        {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
        <div className="max-w-[1600px] mx-auto w-full bg-white p-3 px-4 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 px-2 w-full xl:w-auto">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600">
              <Briefcase size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-black tracking-tighter leading-none">
                Staff Registry
              </h1>
              <p className="text-[13px] text-black font-black uppercase tracking-[0.15em] mt-1">
                Institutional Personnel Management
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-end">
            <div className="relative flex-1 lg:min-w-[350px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search staff by name or ID..."
                className="pl-12 h-12 w-full rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all text-sm font-bold text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {(selectedStaff || isEnrollMode) && (
              <Button
                className="h-12 px-6 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-sm"
                onClick={handleReset}
              >
                <RotateCcw size={16} className="mr-2" />
                {isEnrollMode ? 'Back' : 'Clear Selection'}
              </Button>
            )}

            <Button
              className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-sm shadow-md shadow-indigo-600/20"
              onClick={handleStartEnrollmentInline}
            >
              <UserPlus size={16} className="mr-2" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* ── Page Notification ───────────────────────────────────────────────── */}
        {message && (
          <div className={`p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 shadow-md ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-wide">System Notification</p>
              <p className="text-sm font-medium opacity-90">{message.text}</p>
            </div>
            <button onClick={() => setMessage(null)} className="ml-auto p-2 hover:bg-black/5 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </div>
        )}

        {/* ── Workspace Mode Indicator ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 bg-indigo-50 p-2.5 px-4 rounded-xl border border-indigo-100/50 shadow-sm w-fit animate-in fade-in slide-in-from-top-2 duration-300">
          <span className={`w-2.5 h-2.5 rounded-full ${isEnrollMode ? 'bg-amber-500' : selectedStaff ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
          <span className="text-[11px] font-black uppercase tracking-widest text-indigo-950">
            {isEnrollMode
              ? 'Workspace Mode: New Staff Registration'
              : isEditMode
              ? `Workspace Mode: Editing Staff — ${selectedStaff?.username}`
              : selectedStaff
              ? `Workspace Mode: Viewing Staff — ${selectedStaff.username} (Read-Only)`
              : 'Workspace Mode: Standby — Select a staff member below or click Add Staff'}
          </span>
        </div>

        {/* ── Workspace card (view / edit / enroll) ─────────────────────── */}
        <div ref={workspaceRef} />
        <form onSubmit={handleSaveWorkspace} className="animate-in fade-in slide-in-from-top-3 duration-500">
          <Card className="rounded-[2.5rem] border-slate-200/60 shadow-2xl overflow-hidden bg-white relative">
              <CardHeader className="px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-indigo-600" size={24} />
                  <CardTitle className="text-lg font-black text-black">
                    {isEnrollMode
                      ? 'New Staff Registration'
                      : isEditMode
                      ? `Editing: ${formData.username || selectedStaff?.username}`
                      : selectedStaff
                      ? `${selectedStaff.name || selectedStaff.fullName || selectedStaff.username}`
                      : 'Search or Select a Staff Member'}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-3">
                  <ActiveBadge value={formData.isActive} />
                  <div className="px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest rounded-full">
                    ID: {String(isEnrollMode ? (formData.username || 'Generating...') : (selectedStaff?.username || '—'))}
                  </div>
                  <Link
                    href="/admin/reporting?report=teachers"
                    className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-wider flex items-center gap-1.5 transition-colors border-l border-slate-200 pl-4 ml-1"
                  >
                    <Users size={14} />
                    Visit Directory List
                  </Link>
                  {!isEnrollMode && !selectedStaff && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Search size={16} />
                      <span className="text-xs font-bold">Search below to load a profile</span>
                    </div>
                  )}
                  {selectedStaff && !isEnrollMode && (
                    <div className="flex items-center gap-2 ml-2 pl-4 border-l border-slate-200">
                      {!isEditMode ? (
                        <>
                          <button
                            type="button"
                            className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md shadow-indigo-600/10"
                            onMouseDown={(e) => { e.preventDefault(); handleStartEdit(); }}
                          >
                            <Edit size={14} className="mr-1.5" /> Edit
                          </button>
                          <Button
                            type="button"
                            className="h-10 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md shadow-rose-600/10"
                            onClick={() => handleDelete(selectedStaff.id)}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            type="submit"
                            className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs shadow-md shadow-emerald-600/10"
                            isLoading={isSubmitting}
                          >
                            <Save size={14} className="mr-1.5" /> Save
                          </Button>
                          <button
                            type="button"
                            className="h-10 px-5 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                            onMouseDown={(e) => { e.preventDefault(); handleCancelEdit(); }}
                          >
                            <X size={14} className="mr-1.5" /> Cancel
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row min-h-[500px]">
                  {/* Sidebar Tabs */}
                  <div className="w-full lg:w-72 bg-slate-50/50 border-r border-slate-100 p-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto whitespace-nowrap lg:whitespace-normal custom-scrollbar shrink-0">
                    {TABS.filter(t => t.id !== 'visibility' || !isEnrollMode).map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-wider text-left ${
                          activeTab === tab.id
                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30'
                            : 'text-slate-500 hover:bg-white hover:text-indigo-600'
                        }`}
                      >
                        <tab.icon size={16} />
                        {tab.name}
                      </button>
                    ))}
                  </div>

                  {/* Tab Panes */}
                  <div className="flex-1 p-6 sm:p-10 bg-white relative">
                    <div className="space-y-8 max-w-4xl">
                      
                      {/* Tab 1: Basic Information */}
                      {activeTab === 'basic' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <User className="text-indigo-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-800">Basic Information</h3>
                          </div>
                          
                          {isEnrollMode && (
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-4 text-left">
                              <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-700">Account Authorization Details</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporary Password</label>
                                  <div className="relative">
                                    <Input
                                      type="text"
                                      name="tempPassword"
                                      value={formData.tempPassword || ''}
                                      onChange={handleChange}
                                      placeholder="Temporary Password"
                                      required
                                      className="pl-9 h-10 rounded-xl border border-slate-200 font-bold text-xs"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Role / Designation</label>
                                  <select
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 text-xs font-bold text-black"
                                  >
                                    {DESIGNATION_OPTIONS.map(opt => (
                                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <FormInput label="Teacher ID - Auto" name="username" disabled />
                            <FormInput label="Full Name" name="fullName" />
                            <FormInput label="Name in Sinhala as Birth Certificate" name="nameSinhala" />
                            <FormInput label="Name with Initial" name="nameWithInitials" />
                            <FormInput label="Name with Initial Sinhala" name="nameWithInitialSinhala" />
                            <FormInput label="Date Of Birth" name="dob" type="date" />
                            <FormInput label="NIC" name="nic" />
                            <FormInput label="Birth Certificate No" name="birthCertificateNo" />
                            <FormInput label="District" name="district" />
                            <FormInput label="Religion" name="religion" />
                            <FormInput label="Gender" name="gender" options={GENDER_OPTIONS} />
                            <FormInput label="Mother Name" name="motherName" />
                            <FormInput label="Father Name" name="fatherName" />
                            <FormInput label="Guardian ID" name="guardianId" />
                            <FormInput label="Age - Auto Calculate" name="age" disabled placeholder="Auto-calculated" />
                            <FormInput label="Civil State" name="civilState" />
                            <FormInput label="Marital State" name="maritalState" options={CIVIL_OPTIONS} />
                          </div>
                        </div>
                      )}

                      {/* Tab 2: Health */}
                      {activeTab === 'health' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <HeartPulse className="text-rose-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-800">Health Information</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <FormInput label="Height" name="height" />
                            <FormInput label="Weight" name="weight" />
                            <FormInput label="Blood Type" name="bloodGroup" options={BLOOD_OPTIONS} />
                            <FormInput label="Special Physical Condition" name="specialPhysicalCondition" />
                            <FormInput label="Long Term Diseases" name="longTermDiseases" />
                          </div>
                          <FormInput label="Description" name="healthDescription" type="textarea" />
                        </div>
                      )}

                      {/* Tab 3: Service History */}
                      {activeTab === 'service' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <Briefcase className="text-amber-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-800">Service History</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <FormInput label="1st Appointment Date" name="firstAppointmentDate" type="date" />
                            <FormInput label="1st Appointment District" name="firstAppointmentDistrict" />
                            <FormInput label="1st Appointment Institute" name="firstAppointmentInstitute" />
                            <FormInput label="Hierarchy Carder (Combo Box)" name="hierarchyCarder" options={CARDER_OPTIONS} />
                            <FormInput label="Position" name="position" />
                            <FormInput label="Increment Date" name="incrementDate" type="date" />
                            <FormInput label="Service Period" name="servicePeriod" />
                            <FormInput label="Salary Code (As per Pay sheet)" name="salaryCode" />
                            <FormInput label="Holding Position at School" name="holdingPosition" options={HOLDING_POSITION_OPTIONS} />
                            <FormInput label="Grade" name="grade" />
                            <FormInput label="Appointment Medium" name="appointmentMedium" />
                          </div>
                        </div>
                      )}

                      {/* Tab 4: Contact Information */}
                      {activeTab === 'contact' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <MapPin className="text-indigo-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-800">Contact Information</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput label="Permanent Address" name="address" type="textarea" />
                            <FormInput label="Temporary Address" name="temporaryAddress" type="textarea" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <FormInput label="Emergency Contact No" name="emergencyContactNo" />
                            <FormInput label="Whatsapp No" name="whatsappNo" />
                            <FormInput label="Home No" name="homeNo" />
                            <FormInput label="Mobile No" name="contactMobile" />
                            <FormInput label="Email" name="email" type="email" />
                            <FormInput label="Distance to School" name="distanceToSchool" />
                          </div>
                        </div>
                      )}

                      {/* Tab 5: Qualification */}
                      {activeTab === 'qualification' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <GraduationCap className="text-emerald-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-800">Qualifications</h3>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest">Education</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-4 border-l-2 border-rose-100">
                              <FormInput label="GCE OL" name="gceOl" />
                              <FormInput label="GCE AL" name="gceAl" />
                              <FormInput label="Diploma" name="diploma" />
                              <FormInput label="Degree" name="degree" />
                              <FormInput label="Post Graduate" name="postGraduate" />
                              <FormInput label="Master" name="master" />
                              <FormInput label="PhD" name="phd" />
                            </div>
                          </div>

                          <div className="space-y-4 pt-4">
                            <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest">Other</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-4 border-l-2 border-rose-100">
                              <FormInput label="1" name="otherQual1" />
                              <FormInput label="2" name="otherQual2" />
                              <FormInput label="3" name="otherQual3" />
                              <FormInput label="4" name="otherQual4" />
                              <FormInput label="5" name="otherQual5" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 6: Spouse & Children */}
                      {activeTab === 'family' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <Users className="text-slate-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-800">Spouse & Children</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <FormInput label="Spouse Name" name="spouseName" />
                            <FormInput label="Designation" name="spouseDesignation" />
                            <FormInput label="Working Company" name="spouseWorkingCompany" />
                            <FormInput label="Office Contact No" name="spouseOfficeContact" />
                            <FormInput label="Emergency Contact" name="spouseEmergencyContact" />
                            <FormInput label="Emergency Email" name="spouseEmergencyEmail" type="email" />
                            <FormInput label="Working Address" name="spouseWorkingAddress" type="textarea" />
                            <FormInput label="Temporary Address" name="spouseTempAddress" type="textarea" />
                          </div>

                          <div className="space-y-4 pt-6 text-left">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Children Details</h4>
                            <div className="p-6 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <span className="text-xs font-black text-slate-600 uppercase tracking-wider">Child Name</span>
                                <span className="text-xs font-black text-slate-600 uppercase tracking-wider">Age</span>
                              </div>
                              <div className="space-y-3">
                                {[0, 1, 2].map((i) => {
                                  const showEditable = isEnrollMode || isEditMode;
                                  if (!showEditable) {
                                    return (
                                      <div key={i} className="grid grid-cols-2 gap-4">
                                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-black">
                                          {formData.children?.[i]?.name || '—'}
                                        </div>
                                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-black">
                                          {formData.children?.[i]?.age || '—'}
                                        </div>
                                      </div>
                                    );
                                  }
                                  return (
                                    <div key={i} className="grid grid-cols-2 gap-4">
                                      <Input
                                        placeholder="Child Name"
                                        value={formData.children?.[i]?.name || ''}
                                        onChange={(e) => {
                                          const children = [...(formData.children || [{}, {}, {}])];
                                          children[i] = { ...children[i], name: e.target.value };
                                          setFormData({ ...formData, children });
                                        }}
                                        className="h-10 bg-white border-slate-200 font-bold text-xs"
                                      />
                                      <Input
                                        placeholder="Age"
                                        type="number"
                                        value={formData.children?.[i]?.age || ''}
                                        onChange={(e) => {
                                          const children = [...(formData.children || [{}, {}, {}])];
                                          children[i] = { ...children[i], age: e.target.value };
                                          setFormData({ ...formData, children });
                                        }}
                                        className="h-10 bg-white border-slate-200 font-bold text-xs"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 7: Visibility */}
                      {activeTab === 'visibility' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <Eye className="text-indigo-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-800">System Visibility</h3>
                          </div>
                          
                          <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/60 space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Eye className="text-indigo-600" size={20} />
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Account Access</h4>
                            </div>

                            <div className="flex flex-col gap-3 text-left">
                              <label className={`flex items-center gap-4 p-4 rounded-xl transition-all border-2 cursor-pointer ${
                                formData.isActive === true || formData.isActive === 'true'
                                  ? 'bg-emerald-50 border-emerald-300'
                                  : 'bg-rose-50 border-rose-300'
                              }`}>
                                <input
                                  type="checkbox"
                                  name="isActive"
                                  checked={formData.isActive === true || formData.isActive === 'true'}
                                  onChange={handleChange}
                                  disabled={!isEnrollMode && !isEditMode}
                                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 rounded border-slate-300"
                                />
                                <div>
                                  <p className={`text-sm font-black uppercase tracking-widest ${
                                    formData.isActive === true || formData.isActive === 'true' ? 'text-emerald-700' : 'text-rose-700'
                                  }`}>
                                    {formData.isActive === true || formData.isActive === 'true' ? 'Active' : 'Inactive'}
                                  </p>
                                  <p className="text-xs font-bold text-slate-500 leading-tight mt-0.5">
                                    Determines whether this personnel record is active in school services.
                                  </p>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Workspace Controls */}
                      {isEnrollMode && (
                        <div className="pt-6 border-t border-slate-100 flex justify-end gap-2">
                          <Button
                            type="submit"
                            className="h-10 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-wider text-xs shadow-md shadow-indigo-600/20"
                            isLoading={isSubmitting}
                          >
                            Save &amp; Register Staff
                          </Button>
                          <button
                            type="button"
                            className="h-10 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer"
                            onMouseDown={(e) => { e.preventDefault(); handleReset(); }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {isEditMode && (
                        <div className="pt-6 border-t border-slate-100 flex justify-end gap-2">
                          <Button
                            type="submit"
                            className="h-10 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-xs shadow-md shadow-emerald-600/20"
                            isLoading={isSubmitting}
                          >
                            Save Changes
                          </Button>
                          <button
                            type="button"
                            className="h-10 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer"
                            onMouseDown={(e) => { e.preventDefault(); handleCancelEdit(); }}
                          >
                            Cancel
                          </button>
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

export default function StaffPage() {
  return (
    <Suspense fallback={<div className="p-8 flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <StaffPageContent />
    </Suspense>
  );
}

function DeleteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
