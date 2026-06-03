"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Search, X, Briefcase, CheckCircle2, AlertCircle, UserPlus,
  Save, User, MapPin, Users, RotateCcw, Edit, Eye, Trash2, Mail, Phone
} from 'lucide-react';
import { api, StudentProfile } from '@/lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// ─── Blank form template for guardian ───────────────────────────────────────
const BLANK_FORM = {
  guardianId: '', // generated as GDN-STUXXXXXX
  studentUsername: '', // The linked student's username (admission number)
  
  // Tab 1: Basic Information
  guardianName: '',
  guardianNameSinhala: '',
  guardianNameWithInitials: '',
  guardianNameWithInitialSinhala: '',
  guardianDob: '',
  guardianNic: '',
  guardianBirthCertificateNo: '',
  guardianDistrict: '',
  guardianReligion: '',
  guardianGender: '',
  guardianAge: '',
  guardianCivilState: '',

  // Tab 2: Occupation
  guardianWorkingAddress: '',
  guardianWorkingTempAddress: '',
  guardianOfficeContact: '',
  guardianEmergencyContactName: '',
  guardianEmergencyEmail: '',
  guardianWorkingCompany: '',
  guardianDesignation: '',

  // Tab 3: Contact Information
  guardianAddressPermanent: '',
  guardianAddressTemporary: '',
  guardianEmergencyContactNo: '',
  guardianWhatsappNo: '',
  guardianHomeNo: '',
  guardianContact: '', // Maps to student.guardianContact (mobile)
  guardianEmail: '',
  guardianDistanceToSchool: '',
};

const TABS = [
  { id: 'basic', name: 'Tab 1 - Basic Information', icon: User },
  { id: 'occupation', name: 'Tab 2 - Occupation', icon: Briefcase },
  { id: 'contact', name: 'Tab 3 - Contact Information', icon: MapPin },
];

const FormContext = React.createContext<any>(null);

function FormInput({ label, name, type = 'text', options = null, disabled = false, placeholder = '' }: {
  label: string; name: string; type?: string;
  options?: { label: string; value: any }[] | null;
  disabled?: boolean; placeholder?: string;
}) {
  const ctx = React.useContext(FormContext);
  const { formData, handleChange, isEnrollMode, isEditMode, selectedGuardian } = ctx;

  if (!isEnrollMode && !isEditMode && selectedGuardian) {
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

  const isDisabled = disabled || (!isEnrollMode && !isEditMode) || (name === 'guardianId');

  if (options) return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <select name={name} value={String(formData[name] || '')} onChange={handleChange} disabled={isDisabled} title={label}
        className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 text-xs font-bold text-black disabled:opacity-50">
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
        className="w-full p-3 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/10 custom-scrollbar disabled:opacity-50" />
    </div>
  );
  return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <Input type={type} name={name} value={String(formData[name] || '')} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder}
        className="h-10 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-50" />
    </div>
  );
}

function FormField({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100/85 text-left hover:bg-slate-100 hover:border-slate-200/60 transition-all">
      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
      <span className="block text-xs font-black text-black leading-tight wrap-break-word">
        {String(value || '—')}
      </span>
    </div>
  );
}

export default function ParentsPage() {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryGuardianId = searchParams.get('guardianId');
  const queryEdit = searchParams.get('edit');

  // ── Directory state ────────────────────────────────────────────────────────
  const [studentsList, setStudentsList] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ── Workspace state ────────────────────────────────────────────────────────
  const [selectedGuardian, setSelectedGuardian] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [formData, setFormData] = useState<Record<string, any>>({ ...BLANK_FORM });
  const [isEnrollMode, setIsEnrollMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search and select student state
  const [studentSearch, setStudentSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close searchable dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // List of students that do NOT currently have a guardian assigned
  const unassignedStudents = useMemo(() => {
    return studentsList.filter(st => !st.guardianName && !st.guardianIdRef && !st.guardianNic);
  }, [studentsList]);

  // Filtered unassigned students list for dropdown search
  const filteredUnassignedStudents = useMemo(() => {
    if (!studentSearch.trim()) return unassignedStudents;
    const term = studentSearch.toLowerCase();
    return unassignedStudents.filter(st =>
      st.username.toLowerCase().includes(term) ||
      (st.fullName || '').toLowerCase().includes(term)
    );
  }, [unassignedStudents, studentSearch]);

  // Fetch all students to map the guardians
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

  // Compute guardian records from student profiles
  const guardiansList = useMemo(() => {
    return studentsList
      .filter(st => st.guardianName || st.guardianIdRef || st.guardianNic)
      .map(st => {
        let extra: any = {};
        if (st.additionalData) {
          try {
            extra = JSON.parse(st.additionalData);
          } catch (e) {
            console.error("Failed to parse student additional data", e);
          }
        }
        return {
          id: st.id,
          guardianId: st.guardianIdRef || `GDN-${st.username}`,
          guardianName: st.guardianName || extra.guardianName || '',
          guardianNic: st.guardianNic || extra.guardianNic || '',
          guardianContact: st.guardianContact || extra.guardianContact || '',
          studentUsername: st.username,
          studentName: st.fullName,
          studentGrade: st.gradeName || 'N/A',
          studentClass: st.className || 'N/A',
          
          // Detailed fields
          guardianNameSinhala: extra.guardianNameSinhala || '',
          guardianNameWithInitials: extra.guardianNameWithInitials || '',
          guardianNameWithInitialSinhala: extra.guardianNameWithInitialSinhala || '',
          guardianDob: extra.guardianDob || '',
          guardianBirthCertificateNo: extra.guardianBirthCertificateNo || '',
          guardianDistrict: extra.guardianDistrict || '',
          guardianReligion: extra.guardianReligion || '',
          guardianGender: extra.guardianGender || '',
          guardianAge: extra.guardianAge || '',
          guardianCivilState: extra.guardianCivilState || '',
          guardianWorkingAddress: extra.guardianWorkingAddress || '',
          guardianWorkingTempAddress: extra.guardianWorkingTempAddress || '',
          guardianOfficeContact: extra.guardianOfficeContact || '',
          guardianEmergencyContactName: extra.guardianEmergencyContactName || '',
          guardianEmergencyEmail: extra.guardianEmergencyEmail || '',
          guardianWorkingCompany: extra.guardianWorkingCompany || '',
          guardianDesignation: extra.guardianDesignation || '',
          guardianAddressPermanent: extra.guardianAddressPermanent || '',
          guardianAddressTemporary: extra.guardianAddressTemporary || '',
          guardianEmergencyContactNo: extra.guardianEmergencyContactNo || '',
          guardianWhatsappNo: extra.guardianWhatsappNo || '',
          guardianHomeNo: extra.guardianHomeNo || '',
          guardianEmail: extra.guardianEmail || '',
          guardianDistanceToSchool: extra.guardianDistanceToSchool || '',
        };
      });
  }, [studentsList]);



  // Handle URL query matching
  useEffect(() => {
    if (queryGuardianId && guardiansList.length > 0) {
      const matched = guardiansList.find(g => g.guardianId === queryGuardianId);
      if (matched) {
        if (!selectedGuardian || selectedGuardian.guardianId !== queryGuardianId || isEditMode !== (queryEdit === 'true')) {
          setSelectedGuardian(matched);
          setFormData(matched);
          setIsEnrollMode(false);
          setIsEditMode(queryEdit === 'true');
        }
      }
    }
  }, [queryGuardianId, queryEdit, guardiansList, selectedGuardian, isEditMode]);

  // Filter list by search term
  const filteredGuardians = useMemo(() => {
    return guardiansList.filter(g =>
      g.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.guardianId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.guardianNic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.studentUsername.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [guardiansList, searchTerm]);

  // Auto-calculate age from DOB
  useEffect(() => {
    if (formData.guardianDob) {
      const d = new Date(String(formData.guardianDob));
      if (!isNaN(d.getTime())) {
        const age = Math.abs(new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970);
        setFormData((p: any) => ({ ...p, guardianAge: age }));
      }
    }
  }, [formData.guardianDob]);

  // Reset form when clearing workspace selection
  useEffect(() => {
    if (!selectedGuardian && !isEnrollMode) {
      setFormData({ ...BLANK_FORM });
    }
  }, [selectedGuardian, isEnrollMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((p: any) => {
      const updated = { ...p, [name]: val };
      // Auto-generate Guardian ID when student is selected in enroll mode
      if (name === 'studentUsername' && isEnrollMode && val) {
        updated.guardianId = `GDN-${val}`;
      }
      return updated;
    });
  };

  const handleStartEnrollmentInline = () => {
    setSearchTerm('');
    setSelectedGuardian(null);
    setIsEnrollMode(true);
    setIsEditMode(false);
    setActiveTab('basic');
    setFormData({ ...BLANK_FORM, guardianId: 'Select student...' });
    setMessage(null);
    setStudentSearch('');
    setIsDropdownOpen(false);
    router.push('/admin/parents');
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleReset = () => {
    setSelectedGuardian(null);
    setIsEnrollMode(false);
    setIsEditMode(false);
    setFormData({ ...BLANK_FORM });
    setSearchTerm('');
    setStudentSearch('');
    setIsDropdownOpen(false);
    setMessage(null);
    router.push('/admin/parents');
  };

  const handleSelectGuardian = (g: any, editOnLoad = false) => {
    setSelectedGuardian(g);
    setIsEnrollMode(false);
    setIsEditMode(editOnLoad);
    setFormData(g);
    setStudentSearch(`${g.studentUsername} - ${g.studentName}`);
    setIsDropdownOpen(false);
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleStartEdit = () => {
    setIsEditMode(true);
    if (selectedGuardian) {
      router.push(`/admin/parents?guardianId=${selectedGuardian.guardianId}&edit=true`);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    if (selectedGuardian) {
      setFormData(selectedGuardian);
      router.push(`/admin/parents?guardianId=${selectedGuardian.guardianId}`);
    }
  };

  const handleDelete = async (studentUsername: string) => {
    if (!confirm('Are you sure you want to remove this guardian? This will clear all guardian data linked to the student.')) return;
    setIsSubmitting(true);
    setMessage(null);
    try {
      // 1. Get the current full student profile
      const studentProfile = await api.getStudentProfile(studentUsername);
      if (!studentProfile) {
        throw new Error('Student profile not found.');
      }

      // 2. Clear all guardian details from student profile
      studentProfile.guardianName = '';
      studentProfile.guardianNic = '';
      studentProfile.guardianContact = '';
      studentProfile.guardianIdRef = '';

      let additional: any = {};
      if (studentProfile.additionalData) {
        try {
          additional = JSON.parse(studentProfile.additionalData);
        } catch (e) {}
      }

      // Delete all extra guardian fields
      const guardianKeys = Object.keys(BLANK_FORM);
      guardianKeys.forEach(k => {
        delete additional[k];
      });
      studentProfile.additionalData = JSON.stringify(additional);

      // 3. Save student profile
      await api.saveStudentProfile(studentUsername, studentProfile);
      setMessage({ type: 'success', text: 'Guardian profile deleted successfully!' });
      handleReset();
      fetchStudents();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete guardian record' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    const studentUsername = formData.studentUsername;
    if (!studentUsername) {
      setMessage({ type: 'error', text: 'Linked Student selection is required.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // 1. Fetch full student profile to preserve existing fields
      const studentProfile = await api.getStudentProfile(studentUsername);
      if (!studentProfile) {
        throw new Error('Linked Student not found.');
      }

      const generatedId = formData.guardianId || `GDN-${studentUsername}`;

      // 2. Update guardian details
      studentProfile.guardianName = formData.guardianName;
      studentProfile.guardianNic = formData.guardianNic;
      studentProfile.guardianContact = formData.guardianContact;
      studentProfile.guardianIdRef = generatedId;

      // 3. Merge extra guardian fields into student's additionalData
      let additional: any = {};
      if (studentProfile.additionalData) {
        try {
          additional = JSON.parse(studentProfile.additionalData);
        } catch (e) {}
      }

      const guardianKeys = Object.keys(BLANK_FORM);
      guardianKeys.forEach(key => {
        additional[key] = formData[key];
      });
      // Override ID if it was generated
      additional.guardianId = generatedId;

      studentProfile.additionalData = JSON.stringify(additional);

      // 4. Save student profile
      const savedStudent = await api.saveStudentProfile(studentUsername, studentProfile);
      setMessage({ type: 'success', text: isEnrollMode ? 'Guardian registered successfully!' : 'Guardian profile updated.' });
      setIsEnrollMode(false);
      setIsEditMode(false);

      // Reload students
      await fetchStudents();

      // Set selection
      router.push(`/admin/parents?guardianId=${generatedId}`);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Save failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Option lists
  const GENDER_OPTIONS = [{ label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' }];
  const CIVIL_OPTIONS = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Widowed', value: 'Widowed' },
    { label: 'Separate', value: 'Separate' },
    { label: 'Divorce', value: 'Divorce' }
  ];

  return (
    <FormContext.Provider value={{ formData, handleChange, isEnrollMode, isEditMode, selectedGuardian }}>
      <div className="flex flex-col space-y-6 animate-in fade-in duration-700 pb-20">
        
        {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
        <div className="max-w-[1600px] mx-auto w-full bg-white p-3 px-4 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 px-2 w-full xl:w-auto">
            <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-600">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-black tracking-tighter leading-none">
                Parents & Guardians
              </h1>
              <p className="text-[13px] text-black font-black uppercase tracking-[0.15em] mt-1">
                Guardian Directory & Student Links
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-end">
            <div className="relative flex-1 lg:min-w-[350px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search by guardian name, ID, NIC or student..."
                className="pl-12 h-12 w-full rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all text-sm font-bold text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {(selectedGuardian || isEnrollMode) && (
              <Button
                className="h-12 px-6 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-sm"
                onClick={handleReset}
              >
                <RotateCcw size={16} className="mr-2" />
                {isEnrollMode ? 'Back' : 'Clear Selection'}
              </Button>
            )}

            <Button
              className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-sm shadow-md shadow-emerald-600/20"
              onClick={handleStartEnrollmentInline}
            >
              <UserPlus size={16} className="mr-2" />
              Add Guardian
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
        <div className="flex items-center gap-2 bg-emerald-50 p-2.5 px-4 rounded-xl border border-emerald-100/50 shadow-sm w-fit animate-in fade-in slide-in-from-top-2 duration-300">
          <span className={`w-2.5 h-2.5 rounded-full ${isEnrollMode ? 'bg-amber-500' : selectedGuardian ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-950">
            {isEnrollMode
              ? 'Workspace Mode: New Guardian Registration'
              : isEditMode
              ? `Workspace Mode: Editing Guardian — ${selectedGuardian?.guardianId}`
              : selectedGuardian
              ? `Workspace Mode: Viewing Guardian — ${selectedGuardian.guardianId} (Read-Only)`
              : 'Workspace Mode: Standby — Select a guardian below or click Add Guardian'}
          </span>
        </div>

        {/* ── Workspace card (view / edit / enroll) ─────────────────────── */}
        <div ref={workspaceRef} />
        <form onSubmit={handleSaveWorkspace} className="animate-in fade-in slide-in-from-top-3 duration-500">
          <Card className="rounded-[2.5rem] border-slate-200/60 shadow-2xl overflow-hidden bg-white relative">
            <CardHeader className="px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="text-emerald-600" size={24} />
                <CardTitle className="text-lg font-black text-black">
                  {isEnrollMode
                    ? 'New Guardian Registration'
                    : isEditMode
                    ? `Editing: ${formData.guardianName || selectedGuardian?.guardianName}`
                    : selectedGuardian
                    ? `${selectedGuardian.guardianName}`
                    : 'Search or Select a Guardian'}
                </CardTitle>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full">
                  ID: {String(isEnrollMode ? (formData.guardianId || 'Select student...') : (selectedGuardian?.guardianId || '—'))}
                </div>

                {selectedGuardian && !isEnrollMode && (
                  <div className="flex items-center gap-2 ml-2 pl-4 border-l border-slate-200">
                    {!isEditMode ? (
                      <>
                        <button
                          type="button"
                          className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md shadow-emerald-600/10"
                          onMouseDown={(e) => { e.preventDefault(); handleStartEdit(); }}
                        >
                          <Edit size={14} className="mr-1.5" /> Edit
                        </button>
                        <Button
                          type="button"
                          className="h-10 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md shadow-rose-600/10"
                          onClick={() => handleDelete(selectedGuardian.studentUsername)}
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
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-wider text-left ${
                        activeTab === tab.id
                          ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/30'
                          : 'text-slate-500 hover:bg-white hover:text-emerald-600'
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
                          <User className="text-emerald-600" size={20} />
                          <h3 className="text-lg font-bold text-slate-800">Basic Information</h3>
                        </div>

                        {/* Student Connection Field */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-4 text-left">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-700">Linked Student Account</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Select Student</label>
                              {isEnrollMode ? (
                                <div className="relative" ref={dropdownRef}>
                                  <Input
                                    type="text"
                                    placeholder="Search by Index No or Name..."
                                    value={studentSearch}
                                    onChange={(e) => {
                                      setStudentSearch(e.target.value);
                                      setIsDropdownOpen(true);
                                      if (formData.studentUsername) {
                                        setFormData((p: any) => ({ ...p, studentUsername: '', guardianId: 'Select student...' }));
                                      }
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:ring-2 focus:ring-emerald-500/10 text-xs font-bold text-black"
                                  />
                                  {isDropdownOpen && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                                      {filteredUnassignedStudents.length === 0 ? (
                                        <div className="p-3 text-xs text-slate-500 font-bold text-center">
                                          No unassigned students found
                                        </div>
                                      ) : (
                                        filteredUnassignedStudents.map((st) => (
                                          <button
                                            key={st.username}
                                            type="button"
                                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-black hover:bg-emerald-50 hover:text-emerald-700 transition-colors border-b border-slate-100 last:border-none cursor-pointer"
                                            onClick={() => {
                                              setFormData((p: any) => ({
                                                ...p,
                                                studentUsername: st.username,
                                                guardianId: `GDN-${st.username}`
                                              }));
                                              setStudentSearch(`${st.username} - ${st.fullName}`);
                                              setIsDropdownOpen(false);
                                            }}
                                          >
                                            <div className="font-black text-black">{st.username} - {st.fullName}</div>
                                            <div className="text-[10px] text-slate-400 font-semibold">{st.gradeName || 'N/A'} - {st.className || 'N/A'}</div>
                                          </button>
                                        ))
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="p-3 bg-white border border-slate-200 rounded-xl font-bold text-black text-xs">
                                  {formData.studentUsername} - {selectedGuardian?.studentName} ({selectedGuardian?.studentGrade} - {selectedGuardian?.studentClass})
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Generated Guardian ID</label>
                              <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-600 text-xs">
                                {formData.guardianId || 'Select a student to generate ID'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <FormInput label="Full Name" name="guardianName" />
                          <FormInput label="Name in Sinhala as Birth Certificate" name="guardianNameSinhala" />
                          <FormInput label="Name with Initial" name="guardianNameWithInitials" />
                          <FormInput label="Name with Initial Sinhala" name="guardianNameWithInitialSinhala" />
                          <FormInput label="Date Of Birth" name="guardianDob" type="date" />
                          <FormInput label="NIC" name="guardianNic" />
                          <FormInput label="Birth Certificate No" name="guardianBirthCertificateNo" />
                          <FormInput label="District" name="guardianDistrict" />
                          <FormInput label="Religion" name="guardianReligion" />
                          <FormInput label="Gender" name="guardianGender" options={GENDER_OPTIONS} />
                          <FormInput label="Age - Auto Calculate" name="guardianAge" disabled placeholder="Auto-calculated" />
                          <FormInput label="Civil State" name="guardianCivilState" options={CIVIL_OPTIONS} />
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Occupation */}
                    {activeTab === 'occupation' && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                          <Briefcase className="text-emerald-600" size={20} />
                          <h3 className="text-lg font-bold text-slate-800">Occupation Details</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <FormInput label="Working Company" name="guardianWorkingCompany" />
                          <FormInput label="Designation" name="guardianDesignation" />
                          <FormInput label="Office Contact No" name="guardianOfficeContact" />
                          <FormInput label="Emergency Contact Name" name="guardianEmergencyContactName" />
                          <FormInput label="Emergency Email" name="guardianEmergencyEmail" type="email" />
                          <FormInput label="Working Address" name="guardianWorkingAddress" type="textarea" />
                          <FormInput label="Temporary Address" name="guardianWorkingTempAddress" type="textarea" />
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Contact Information */}
                    {activeTab === 'contact' && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                          <MapPin className="text-emerald-600" size={20} />
                          <h3 className="text-lg font-bold text-slate-800">Contact Information</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormInput label="Permanent Address" name="guardianAddressPermanent" type="textarea" />
                          <FormInput label="Temporary Address" name="guardianAddressTemporary" type="textarea" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <FormInput label="Emergency Contact No" name="guardianEmergencyContactNo" />
                          <FormInput label="Whatsapp No" name="guardianWhatsappNo" />
                          <FormInput label="Home No" name="guardianHomeNo" />
                          <FormInput label="Mobile No" name="guardianContact" />
                          <FormInput label="Email Address" name="guardianEmail" type="email" />
                          <FormInput label="Distance to School" name="guardianDistanceToSchool" />
                        </div>

                        {/* Inline Save / Action buttons inside form workspace for easy reach */}
                        {(isEnrollMode || isEditMode) && (
                          <div className="mt-4 flex justify-end border-t border-slate-100 pt-6 gap-2">
                            <Button
                              type="submit"
                              className="h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all shadow-md shadow-emerald-600/20"
                              isLoading={isSubmitting}
                            >
                              <Save size={14} className="mr-2" />
                              {isEnrollMode ? 'Save & Register Guardian' : 'Save Changes'}
                            </Button>
                            <Button
                              type="button"
                              className="h-12 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all"
                              onClick={isEnrollMode ? handleReset : handleCancelEdit}
                            >
                              <X size={14} className="mr-2" />
                              Cancel
                            </Button>
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

        {/* ── Registered Guardians Table ────────────────────────────────────── */}
        {!isEnrollMode && !isEditMode && (
          <Card className="rounded-[2.5rem] border-slate-200/60 shadow-2xl overflow-hidden bg-white">
            <CardHeader className="px-8 py-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-black text-black">Registered Guardians</CardTitle>
                <p className="text-xs text-slate-500 font-bold mt-1">Directory of parents/guardians with linked student records</p>
              </div>
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-black">
                Total Guardians: <span className="text-emerald-600 font-black">{filteredGuardians.length}</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-12 text-center text-sm font-bold text-slate-500">
                  Loading guardian directory...
                </div>
              ) : filteredGuardians.length === 0 ? (
                <div className="p-12 text-center text-sm font-bold text-slate-500">
                  {searchTerm ? 'No guardians matched your search.' : 'No guardians registered yet.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 shadow-sm">
                      <TableRow className="border-none">
                        <TableHead className="px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Guardian ID</TableHead>
                        <TableHead className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Name</TableHead>
                        <TableHead className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">NIC</TableHead>
                        <TableHead className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Linked Student</TableHead>
                        <TableHead className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Contact</TableHead>
                        <TableHead className="px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-black text-right">Manage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuardians.map((g) => (
                        <TableRow key={g.guardianId} className="hover:bg-slate-50/80 transition-colors">
                          <TableCell className="px-8 font-black text-black">{g.guardianId}</TableCell>
                          <TableCell className="font-bold text-black">{g.guardianName}</TableCell>
                          <TableCell className="font-bold text-slate-600">{g.guardianNic || '—'}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-black text-emerald-600 uppercase text-[12px]">{g.studentName}</span>
                              <span className="text-[10px] text-slate-400 font-bold">ID: {g.studentUsername} | {g.studentGrade} - {g.studentClass}</span>
                            </div>
                          </TableCell>
                          <TableCell>
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
                          </TableCell>
                          <TableCell className="px-8 text-right space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600"
                              onClick={() => handleSelectGuardian(g, false)}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600"
                              onClick={() => handleSelectGuardian(g, true)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600"
                              onClick={() => handleDelete(g.studentUsername)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </FormContext.Provider>
  );
}
