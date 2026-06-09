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
import { BreadcrumbContext } from '@/app/admin/layout';

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
  { id: 'basic', name: 'Basic Information', icon: User },
  { id: 'occupation', name: 'Occupation', icon: Briefcase },
  { id: 'contact', name: 'Contact Information', icon: MapPin },
];

const FormContext = React.createContext<any>(null);

function FormInput({ label, name, type = 'text', options = null, disabled = false, placeholder = '', required = false }: {
  label: string; name: string; type?: string;
  options?: { label: string; value: any }[] | null;
  disabled?: boolean; placeholder?: string; required?: boolean;
}) {
  const ctx = React.useContext(FormContext);
  const { formData, handleChange, isEnrollMode, isEditMode, selectedGuardian, formErrors } = ctx;
  const hasError = !!(formErrors && formErrors[name]);

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
  const borderCls = hasError ? 'border-rose-400 focus:ring-rose-400/20' : 'border-slate-200 focus:ring-emerald-500/10';

  if (options) return (
    <div className="space-y-1 text-left">
      <label className="text-xs font-semibold text-slate-500 ml-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <select name={name} value={String(formData[name] || '')} onChange={handleChange} disabled={isDisabled} title={label} required={required}
        className={`w-full h-10 bg-white border ${borderCls} rounded-xl px-3 focus:outline-none focus:ring-2 text-sm font-bold text-black disabled:opacity-50`}>
        <option value="">Choose {label}</option>
        {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hasError && <p className="text-xs text-rose-500 ml-1 mt-0.5">{formErrors[name]}</p>}
    </div>
  );
  if (type === 'textarea') return (
    <div className="space-y-1 text-left w-full sm:col-span-2 md:col-span-3">
      <label className="text-xs font-semibold text-slate-500 ml-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <textarea name={name} value={String(formData[name] || '')} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder} rows={3} required={required}
        className={`w-full p-3 rounded-xl border ${borderCls} bg-white font-bold text-black text-sm focus:outline-none focus:ring-2 custom-scrollbar disabled:opacity-50`} />
      {hasError && <p className="text-xs text-rose-500 ml-1 mt-0.5">{formErrors[name]}</p>}
    </div>
  );
  return (
    <div className="space-y-1 text-left">
      <label className="text-xs font-semibold text-slate-500 ml-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <Input type={type} name={name} value={String(formData[name] || '')} onChange={handleChange}
        disabled={isDisabled} placeholder={placeholder} required={required}
        className={`h-10 rounded-xl border ${borderCls} bg-white font-bold text-black text-sm focus:ring-2 disabled:opacity-50`} />
      {hasError && <p className="text-xs text-rose-500 ml-1 mt-0.5">{formErrors[name]}</p>}
    </div>
  );
}

function FormField({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100/85 text-left hover:bg-slate-100 hover:border-slate-200/60 transition-all">
      <span className="block text-xs font-semibold text-slate-400 leading-none mb-1.5">{label}</span>
      <span className="block text-sm font-semibold text-black leading-tight wrap-break-word">
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
  const { setDynamicSuffix } = React.useContext(BreadcrumbContext);

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
  const [isViewOneMode, setIsViewOneMode] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Search and select student state
  const [studentSearch, setStudentSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Guardian search dropdown state
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close searchable dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, searchDropdownRef]);

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

  useEffect(() => {
    if (isEnrollMode) {
      setDynamicSuffix('New Guardian Registration');
    } else if (isViewOneMode && selectedGuardian) {
      setDynamicSuffix(`${selectedGuardian.guardianName || 'Guardian'}`);
    } else {
      setDynamicSuffix('');
    }
  }, [isEnrollMode, isViewOneMode, selectedGuardian, setDynamicSuffix]);

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
    const term = searchTerm.toLowerCase();
    return guardiansList.filter(g =>
      (g.guardianName || '').toLowerCase().includes(term) ||
      (g.guardianId || '').toLowerCase().includes(term) ||
      (g.guardianNic || '').toLowerCase().includes(term) ||
      (g.studentName || '').toLowerCase().includes(term) ||
      (g.studentUsername || '').toLowerCase().includes(term)
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
    let val: any = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    // Telephone number validation: allow only digits
    const phoneFields = ['guardianOfficeContact', 'guardianEmergencyContactNo', 'guardianWhatsappNo', 'guardianHomeNo', 'guardianContact'];
    if (phoneFields.includes(name) && typeof val === 'string') {
      val = val.replace(/\D/g, '');
    }

    // Sinhala text validation: allow only Sinhala characters and spaces
    const sinhalaFields = ['guardianNameSinhala', 'guardianNameWithInitialSinhala'];
    if (sinhalaFields.includes(name) && typeof val === 'string') {
      val = val.replace(/[^\u0D80-\u0DFF\s]/g, '');
    }

    setFormData((p: any) => {
      const updated = { ...p, [name]: val };
      // Auto-generate Guardian ID when student is selected in enroll mode
      if (name === 'studentUsername' && isEnrollMode && val) {
        updated.guardianId = `GDN-${val}`;
      }
      return updated;
    });
    if (formErrors[name]) setFormErrors(p => { const n = { ...p }; delete n[name]; return n; });
  };

  const handleStartEnrollmentInline = () => {
    setSearchTerm('');
    setSelectedGuardian(null);
    setIsEnrollMode(true);
    setIsViewOneMode(false);
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
    setIsViewOneMode(false);
    setIsEditMode(false);
    setFormData({ ...BLANK_FORM });
    setStudentSearch('');
    setIsDropdownOpen(false);
    setMessage(null);
    setFormErrors({});
    router.push('/admin/parents');
  };

  // ── Validation ───────────────────────────────────────────────────────────
  const REQUIRED_FIELDS_BY_TAB: Record<string, { key: string; label: string }[]> = {
    basic: [
      { key: 'guardianName', label: 'Full Name' },
      { key: 'guardianGender', label: 'Gender' },
      { key: 'guardianDob', label: 'Date of Birth' },
      { key: 'guardianNic', label: 'NIC' },
      { key: 'guardianReligion', label: 'Religion' },
    ],
    occupation: [
      { key: 'guardianWorkingCompany', label: 'Working Company' },
      { key: 'guardianDesignation', label: 'Designation' },
      { key: 'guardianOfficeContact', label: 'Office Contact No' },
      { key: 'guardianWorkingAddress', label: 'Working Address' },
      { key: 'guardianEmergencyContactName', label: 'Emergency Contact Name' },
    ],
    contact: [
      { key: 'guardianContact', label: 'Mobile No' },
      { key: 'guardianAddressPermanent', label: 'Permanent Address' },
      { key: 'guardianEmergencyContactNo', label: 'Emergency Contact No' },
      { key: 'guardianWhatsappNo', label: 'Whatsapp No' },
    ]
  };

  const REQUIRED_FIELDS = [
    ...REQUIRED_FIELDS_BY_TAB.basic,
    ...REQUIRED_FIELDS_BY_TAB.occupation,
    ...REQUIRED_FIELDS_BY_TAB.contact,
  ];

  const TAB_ORDER = ['basic', 'occupation', 'contact'];

  const handleTabChange = (targetTabId: string) => {
    if (!isEnrollMode && !isEditMode) {
      setActiveTab(targetTabId);
      return;
    }

    const currentIndex = TAB_ORDER.indexOf(activeTab);
    const targetIndex = TAB_ORDER.indexOf(targetTabId);

    if (targetIndex > currentIndex) {
      const form = document.querySelector('form');
      if (form && !form.reportValidity()) {
        return;
      }
    }
    setActiveTab(targetTabId);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.studentUsername) {
      errors['studentUsername'] = 'Linked Student is required';
    }
    REQUIRED_FIELDS.forEach(({ key, label }) => {
      if (!formData[key] || String(formData[key]).trim() === '') {
        errors[key] = `${label} is required`;
      }
    });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      for (const tabId of TAB_ORDER) {
        const fields = REQUIRED_FIELDS_BY_TAB[tabId] || [];
        const hasTabError = fields.some(({ key }) => errors[key]) || (tabId === 'basic' && errors['studentUsername']);
        if (hasTabError) {
          setActiveTab(tabId);
          setTimeout(() => {
            const form = document.querySelector('form');
            if (form) form.reportValidity();
          }, 0);
          break;
        }
      }
      setMessage({ type: 'error', text: 'Please fill in all required fields marked with *' });
      return false;
    }
    return true;
  };

  const handleSelectGuardian = (g: any, editOnLoad = false) => {
    setSelectedGuardian(g);
    setIsEnrollMode(false);
    setIsViewOneMode(true);
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
    if (!validateForm()) return;
    const studentUsername = formData.studentUsername;

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
    <FormContext.Provider value={{ formData, handleChange, isEnrollMode, isEditMode, selectedGuardian, formErrors }}>
      <div className="flex flex-col space-y-6 animate-in fade-in duration-700 pb-20">
        
        {/* ── Header Banner — only on landing, hidden in viewOneMode & enrollMode ── */}
        {!isViewOneMode && !isEnrollMode && (
          <div className="flex flex-col items-center text-center bg-white py-10 px-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/3 to-transparent pointer-events-none" />
            <Users className="text-emerald-600 mb-3 relative z-10" size={40} />
            <h1 className="text-3xl font-semibold text-slate-800 tracking-tight relative z-10">Parents & Guardians</h1>
            <p className="text-sm font-medium text-slate-500 mt-1 mb-6 relative z-10">Guardian Directory & Student Links.</p>

            {/* Quick Actions — shown only on landing */}
            {!selectedGuardian && !isEnrollMode && (
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                <Button type="button" onClick={handleStartEnrollmentInline}
                  className="h-10 px-5 rounded-xl bg-white border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-600/5 text-slate-700 font-semibold text-xs shadow-sm transition-all">
                  <UserPlus size={15} className="mr-2 text-emerald-600" /> Add Guardian
                </Button>
                <Button type="button" onClick={() => setIsViewOneMode(true)}
                  className="h-10 px-5 rounded-xl bg-white border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-600/5 text-slate-700 font-semibold text-xs shadow-sm transition-all">
                  <Search size={15} className="mr-2 text-emerald-600" /> View Guardian Profile
                </Button>
              </div>
            )}

            {/* Back button when in enroll / selected mode */}
            {(selectedGuardian || isEnrollMode) && (
              <Button type="button" onClick={handleReset}
                className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs shadow-sm transition-all relative z-10">
                <RotateCcw size={13} className="mr-2" /> Back to Directory
              </Button>
            )}
          </div>
        )}

        {/* ── Toolbar — shown in viewOneMode AND enrollMode (Image-2 style) ── */}
        {(isViewOneMode || isEnrollMode) && (
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200/60 shadow-sm">

            {/* Left side: search (viewOne) OR enrollment label (enroll) */}
            {isViewOneMode ? (
              <div className="relative" ref={searchDropdownRef}>
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  id="guardian-search-input"
                  autoFocus
                  placeholder="Search by guardian name, ID, NIC..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsSearchDropdownOpen(true);
                  }}
                  onFocus={() => setIsSearchDropdownOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && filteredGuardians.length > 0) {
                      handleSelectGuardian(filteredGuardians[0], false);
                      setSearchTerm('');
                      setIsSearchDropdownOpen(false);
                    }
                  }}
                  className="pl-9 h-9 w-64 md:w-80 border-slate-200 rounded-lg text-xs font-semibold bg-slate-50 focus:bg-white"
                />
                {isSearchDropdownOpen && searchTerm && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-80 overflow-y-auto custom-scrollbar">
                    {filteredGuardians.length === 0 ? (
                      <div className="p-4 text-xs text-slate-500 font-bold text-center">
                        No guardians found
                      </div>
                    ) : (
                      filteredGuardians.map((g) => (
                        <button
                          key={g.guardianId}
                          type="button"
                          className="w-full text-left px-5 py-3 text-xs font-bold text-black hover:bg-emerald-50 hover:text-emerald-700 transition-colors border-b border-slate-100 last:border-none cursor-pointer flex flex-col gap-1"
                          onClick={() => {
                            handleSelectGuardian(g, false);
                            setSearchTerm('');
                            setIsSearchDropdownOpen(false);
                          }}
                        >
                          <div className="font-black text-black text-sm">{g.guardianName}</div>
                          <div className="text-[11px] text-slate-500 font-bold">
                            ID: {g.guardianId} {g.guardianNic && `| NIC: ${g.guardianNic}`}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-black uppercase tracking-wider mt-1">
                            Linked Student: {g.studentName} ({g.studentUsername})
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserPlus size={15} className="text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700 tracking-tight">
                  New Guardian Registration
                </span>
              </div>
            )}

            <div className="flex-1" />

            {/* Guardian ID badge */}
            <div className="flex items-center h-9 px-3 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white shrink-0">
              Guardian ID: {selectedGuardian?.guardianId || formData.guardianId || 'Not Assigned'}
            </div>

            {/* Back to directory */}
            <button type="button" onClick={handleReset}
              className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors shrink-0">
              <RotateCcw size={12} /> Back
            </button>
          </div>
        )}

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

        {/* ── Workspace Mode Indicator ── */}
        {(selectedGuardian || isEnrollMode) && (
          <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-lg border border-slate-100 shadow-sm w-fit animate-in fade-in slide-in-from-top-2 duration-300 shrink-0">
            <span className={`w-2 h-2 rounded-full ${isEnrollMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
            <span className="text-xs font-semibold text-slate-600">
              {isEnrollMode
                ? `Workspace Mode: New Guardian Registration`
                : isEditMode
                  ? `Workspace Mode: Editing Guardian — ${selectedGuardian?.guardianId}`
                  : `Workspace Mode: Viewing Guardian — ${selectedGuardian?.guardianId} (Read-Only)`}
            </span>
          </div>
        )}

        {/* ── Workspace card (view / edit / enroll) ─────────────────────── */}
        {(selectedGuardian || isEnrollMode || isViewOneMode) && (
          <>
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
                <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  ID: {String(isEnrollMode ? (formData.guardianId || 'Select student...') : (selectedGuardian?.guardianId || '—'))}
                </div>

                {selectedGuardian && !isEnrollMode && (
                  <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-200">
                    {!isEditMode ? (
                      <>
                        <button
                          type="button"
                          className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer select-none"
                          onMouseDown={(e) => { e.preventDefault(); handleStartEdit(); }}
                        >
                          <Edit size={12} className="mr-1" /> Edit
                        </button>
                        <Button
                          type="button"
                          className="h-8 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer select-none"
                          onClick={() => handleDelete(selectedGuardian.studentUsername)}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="submit"
                          className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold active:scale-95 transition-all text-xs"
                          isLoading={isSubmitting}
                        >
                          <Save size={12} className="mr-1" /> Save
                        </Button>
                        <Button
                          type="button"
                          className="h-8 px-3 rounded-lg bg-slate-500 hover:bg-slate-600 text-white font-semibold active:scale-95 transition-all text-xs"
                          onClick={handleCancelEdit}
                        >
                          <X size={12} className="mr-1" /> Cancel
                        </Button>
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
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-xs text-left ${
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
                          <h4 className="text-xs font-semibold text-emerald-700">Linked Student Account</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500 ml-1">Select Student</label>
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
                                    className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:ring-2 focus:ring-emerald-500/10 text-sm font-bold text-black"
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
                                <div className="p-3 bg-white border border-slate-200 rounded-xl font-bold text-black text-sm">
                                  {formData.studentUsername} - {selectedGuardian?.studentName} ({selectedGuardian?.studentGrade} - {selectedGuardian?.studentClass})
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500 ml-1">Generated Guardian ID</label>
                              <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-600 text-sm">
                                {formData.guardianId || 'Select a student to generate ID'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <FormInput label="Full Name" name="guardianName" required />
                          <FormInput label="Name in Sinhala as Birth Certificate" name="guardianNameSinhala" />
                          <FormInput label="Name with Initial" name="guardianNameWithInitials" />
                          <FormInput label="Name with Initial Sinhala" name="guardianNameWithInitialSinhala" />
                          <FormInput label="Date Of Birth" name="guardianDob" type="date" required />
                          <FormInput label="NIC" name="guardianNic" required />
                          <FormInput label="Birth Certificate No" name="guardianBirthCertificateNo" />
                          <FormInput label="District" name="guardianDistrict" />
                          <FormInput label="Religion" name="guardianReligion" required />
                          <FormInput label="Gender" name="guardianGender" options={GENDER_OPTIONS} required />
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
                          <FormInput label="Working Company" name="guardianWorkingCompany" required />
                          <FormInput label="Designation" name="guardianDesignation" required />
                          <FormInput label="Office Contact No" name="guardianOfficeContact" required />
                          <FormInput label="Emergency Contact Name" name="guardianEmergencyContactName" required />
                          <FormInput label="Emergency Email" name="guardianEmergencyEmail" type="email" />
                          <FormInput label="Working Address" name="guardianWorkingAddress" type="textarea" required />
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
                          <FormInput label="Permanent Address" name="guardianAddressPermanent" type="textarea" required />
                          <FormInput label="Temporary Address" name="guardianAddressTemporary" type="textarea" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <FormInput label="Emergency Contact No" name="guardianEmergencyContactNo" required />
                          <FormInput label="Whatsapp No" name="guardianWhatsappNo" required />
                          <FormInput label="Home No" name="guardianHomeNo" />
                          <FormInput label="Mobile No" name="guardianContact" required />
                          <FormInput label="Email Address" name="guardianEmail" type="email" />
                          <FormInput label="Distance to School" name="guardianDistanceToSchool" />
                        </div>

                        {/* Inline Save / Action buttons inside form workspace for easy reach */}
                        {(isEnrollMode || isEditMode) && (
                          <div className="mt-4 flex justify-end border-t border-slate-100 pt-6 gap-2">
                            <Button
                              type="submit"
                              className="h-10 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs active:scale-95 transition-all shadow-md shadow-emerald-600/20"
                              isLoading={isSubmitting}
                            >
                              <Save size={14} className="mr-2" />
                              {isEnrollMode ? 'Save & Register Guardian' : 'Save Changes'}
                            </Button>
                            <Button
                              type="button"
                              className="h-10 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-semibold text-xs active:scale-95 transition-all"
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
        </>
      )}

        {/* ── Registered Guardians Table ────────────────────────────────────── */}
        {!isEnrollMode && !isEditMode && !isViewOneMode && (
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
