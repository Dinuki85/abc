"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Search, X, GraduationCap, Filter,
  CheckCircle2, AlertCircle, UserPlus,
  Save, User, HeartPulse, Star, MapPin, FileCheck, RotateCcw, Edit, Eye, Users
} from 'lucide-react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { BreadcrumbContext } from '@/app/admin/layout';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { GceOlResultModal } from '@/components/GceOlResultModal';

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
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
      {active ? 'Active' : 'Inactive'}
    </div>
  );
}

// ─── Shared Context for Form Inputs ───────────────────────────────────────────
const FormContext = React.createContext<unknown>(null);

// ── Inline FormInput: editable in enrollMode or editMode, read-only when viewing student ─
function FormInput({ label, name, type = 'text', options = null, disabled = false, placeholder = '', required = false }: {
  key?: React.Key;
  label: string; name: string; type?: string;
  options?: { label: string; value: any }[] | null;
  disabled?: boolean; placeholder?: string; required?: boolean;
}) {
  const ctx = React.useContext(FormContext) as {
    formData: Record<string, unknown>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    isEnrollMode: boolean;
    isEditMode: boolean;
    selectedStudent: StudentProfile | null;
    formErrors: Record<string, string>;
  };
  const { formData, handleChange, isEnrollMode, isEditMode, selectedStudent, formErrors } = ctx;
  const hasError = !!(formErrors && formErrors[name]);

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

  const isDisabled = disabled || (!isEnrollMode && !isEditMode) || (name === 'username' && !isEnrollMode);
  const borderCls = hasError ? 'border-rose-400 focus:ring-rose-400/20' : 'border-slate-200 focus:ring-primary/10';

  if ((name === 'username' || name === 'guardianId') && isEnrollMode) {
    const valStr = String(formData[name] || '');
    const prefix = valStr.length >= 10 ? valStr.slice(0, 10) : valStr;
    return (
      <div className="space-y-1 text-left">
        <label className="text-xs font-semibold text-slate-500 ml-1">
          {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
        <Input type="text" maxLength={15} value={valStr} 
          onChange={(e) => {
             const v = e.target.value.replace(/\D/g, '');
             if (!v.startsWith(prefix)) return;
             handleChange({ target: { name, value: v, type: 'text' } } as any);
          }}
          className={`h-10 rounded-xl border ${borderCls} bg-white font-bold text-black text-xs focus:ring-2`}
        />
        {hasError && <p className="text-xs text-rose-500 ml-1 mt-0.5">{formErrors[name]}</p>}
      </div>
    );
  }

  if (options) return (
    <div className="space-y-1 text-left">
      <label className="text-xs font-semibold text-slate-500 ml-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <select name={name} value={String(formData[name] || '')} onChange={handleChange} disabled={isDisabled} title={label} required={required}
        className={`w-full h-10 bg-white border ${borderCls} rounded-xl px-3 focus:outline-none focus:ring-2 text-sm font-bold text-black disabled:opacity-50`}>
        <option value="">Choose {label}</option>
        {options.map((o: { label: string; value: unknown }) => <option key={String(o.value)} value={String(o.value)}>{o.label}</option>)}
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
        className={`w-full p-3 rounded-xl border ${borderCls} bg-white font-bold text-black text-xs focus:outline-none focus:ring-2 custom-scrollbar disabled:opacity-50`} />
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
        className={`h-10 rounded-xl border ${borderCls} bg-white font-bold text-black text-xs focus:ring-2 disabled:opacity-50`} />
      {hasError && <p className="text-xs text-rose-500 ml-1 mt-0.5">{formErrors[name]}</p>}
    </div>
  );
}

function StudentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setDynamicSuffix } = React.useContext(BreadcrumbContext);
  const initialSearch = searchParams.get('search') || '';

  const workspaceRef = useRef<HTMLDivElement>(null);

  // ── Directory state ────────────────────────────────────────────────────────
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [allStudentsRaw, setAllStudentsRaw] = useState<StudentProfile[]>([]);
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
  const [isViewOneMode, setIsViewOneMode] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [showGuardianDropdown, setShowGuardianDropdown] = useState(false);
  const [guardianSearchTerm, setGuardianSearchTerm] = useState('');
  const [isOlPopupOpen, setIsOlPopupOpen] = useState(false);
  const guardianDropdownRef = useRef<HTMLDivElement>(null);

  // ── Data fetchers ──────────────────────────────────────────────────────────
  const fetchGrades = async () => {
    try { setGrades(await api.getGrades()); } catch { }
  };

  const fetchStudents = async (page = 0, silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await api.getPaginatedStudents(page, pageSize, searchTerm, filterGradeId, filterClassId);
      setAllStudentsRaw(res.content);
      const filtered = res.content.filter((st: any) => !st.username.startsWith('GDN-HOST-'));
      setStudents(filtered);
      setTotalElements(filtered.length);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (guardianDropdownRef.current && !guardianDropdownRef.current.contains(event.target as Node)) {
        setShowGuardianDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onReset = () => {
      setSelectedStudent(null);
      setIsEnrollMode(false);
      setIsEditMode(false);
      setIsLoadedExistingStudent(false);
      setEnrollSearchId('');
      setFormData({ ...BLANK_FORM });
      setSearchTerm('');
      setIsViewOneMode(false);
      setFormErrors({});
      router.replace('/admin/students');
    };
    window.addEventListener('resetDirectoryView', onReset);
    return () => window.removeEventListener('resetDirectoryView', onReset);
  }, [router]);

  useEffect(() => {
    if (isEnrollMode) {
      setDynamicSuffix('New Student Enrollment');
    } else if (isViewOneMode || selectedStudent) {
      setDynamicSuffix('Search student');
    } else {
      setDynamicSuffix('');
    }
  }, [isEnrollMode, isViewOneMode, selectedStudent, setDynamicSuffix]);

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

  const guardiansList = React.useMemo(() => {
    const list = allStudentsRaw
      .filter(st => st.guardianName || st.guardianIdRef || st.guardianNic)
      .map(st => {
        let extra: any = {};
        if (st.additionalData) {
          try { extra = JSON.parse(st.additionalData); } catch (e) {}
        }
        return {
          guardianId: st.guardianIdRef || `GDN-${st.username}`,
          guardianName: st.guardianName || extra.guardianName || '',
        };
      });
    const unique = [];
    const ids = new Set();
    for (const g of list) {
      if (g.guardianId && !ids.has(g.guardianId)) {
        ids.add(g.guardianId);
        unique.push(g);
      }
    }
    return unique;
  }, [allStudentsRaw]);

  const filteredGuardians = React.useMemo(() => {
    if (!guardianSearchTerm) return guardiansList;
    const term = guardianSearchTerm.toLowerCase();
    return guardiansList.filter(g => 
      g.guardianId.toLowerCase().includes(term) || 
      g.guardianName.toLowerCase().includes(term)
    );
  }, [guardiansList, guardianSearchTerm]);

  // Auto-fill guardian details if a valid guardianIdRef is entered or changed
  useEffect(() => {
    const gid = String(formData.guardianIdRef || '').trim();
    if (gid && (isEnrollMode || isEditMode)) {
      // Find a student profile that has this guardianIdRef and has details
      const match = allStudentsRaw.find(s => (s.guardianIdRef === gid || `GDN-${s.username}` === gid) && s.guardianName);
      if (match) {
        let extra: any = {};
        if (match.additionalData) {
          try { extra = JSON.parse(match.additionalData); } catch {}
        }
        setFormData((p: any) => {
          if (
            p.guardianName === match.guardianName &&
            p.guardianNic === (match.guardianNic || extra.guardianNic) &&
            p.guardianContact === (match.guardianContact || extra.guardianContact)
          ) {
            return p;
          }
          return {
            ...p,
            guardianName: match.guardianName || '',
            guardianNic: match.guardianNic || extra.guardianNic || '',
            guardianContact: match.guardianContact || extra.guardianContact || '',
          };
        });
      }
    }
  }, [formData.guardianIdRef, allStudentsRaw, isEnrollMode, isEditMode]);

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
      setFormData({ ...BLANK_FORM });
    }
  }, [searchTerm]);

  // ── Workspace handlers ─────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let val: any = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    // Telephone number validation: allow only digits
    const phoneFields = ['contactEmergency', 'contactWhatsapp', 'contactHome', 'contactMobile'];
    if (phoneFields.includes(name) && typeof val === 'string') {
      val = val.replace(/\D/g, '');
    }

    // Sinhala text validation: allow only Sinhala characters and spaces
    const sinhalaFields = ['nameSinhala', 'nameWithInitialSinhala'];
    if (sinhalaFields.includes(name) && typeof val === 'string') {
      val = val.replace(/[^\u0D80-\u0DFF\s]/g, '');
    }

    setFormData((p: Record<string, unknown>) => ({ ...p, [name]: val }));
    // Clear validation error when user types
    if (formErrors[name]) setFormErrors(p => { const n = { ...p }; delete n[name]; return n; });
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
    setIsViewOneMode(false);
    setFormErrors({});
    router.replace('/admin/students');
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const REQUIRED_FIELDS_BY_TAB: Record<string, { key: string; label: string }[]> = {
    basic: [
      { key: 'username', label: 'Index No' },
      { key: 'fullName', label: 'Full Name' },
      { key: 'nic', label: 'NIC' },
      { key: 'dob', label: 'Date of Birth' },
      { key: 'religion', label: 'Religion' },
      { key: 'fatherName', label: 'Father Name' },
      { key: 'gender', label: 'Gender' },
    ],
    health: [],
    skills: [],
    contact: [
      { key: 'addressPermanent', label: 'Permanent Address' },
      { key: 'contactEmergency', label: 'Emergency Contact' },
      { key: 'contactWhatsapp', label: 'WhatsApp' },
    ],
    exams: [],
    visibility: [],
  };

  const REQUIRED_FIELDS = [
    ...REQUIRED_FIELDS_BY_TAB.basic,
    ...REQUIRED_FIELDS_BY_TAB.health,
    ...REQUIRED_FIELDS_BY_TAB.skills,
    ...REQUIRED_FIELDS_BY_TAB.contact,
    ...REQUIRED_FIELDS_BY_TAB.exams,
    ...REQUIRED_FIELDS_BY_TAB.visibility,
  ];

  const TAB_ORDER = ['basic', 'health', 'skills', 'contact', 'exams', 'visibility'];

  const handleTabChange = (targetTabId: string) => {
    if (!isEnrollMode && !isEditMode) {
      setActiveTab(targetTabId);
      return;
    }

    const currentIndex = TAB_ORDER.indexOf(activeTab);
    const targetIndex = TAB_ORDER.indexOf(targetTabId);

    if (targetIndex > currentIndex) {
      // Trigger native HTML5 validation for the current tab's DOM
      const form = document.querySelector('form');
      if (form && !form.reportValidity()) {
        return;
      }

      // Validate all tabs from basic up to current activeTab
      const errors: Record<string, string> = { ...formErrors };
      let firstTabWithErrors = '';

      for (let i = 0; i <= currentIndex; i++) {
        const tabId = TAB_ORDER[i];
        const fields = REQUIRED_FIELDS_BY_TAB[tabId] || [];
        fields.forEach(({ key, label }) => {
          if (!formData[key] || String(formData[key]).trim() === '') {
            errors[key] = `${label} is required`;
            if (!firstTabWithErrors) {
              firstTabWithErrors = tabId;
            }
          } else {
            delete errors[key];
          }
        });
      }

      if (Object.keys(errors).some(k => REQUIRED_FIELDS.some(rf => rf.key === k))) {
        setFormErrors(errors);
        if (firstTabWithErrors) {
          setActiveTab(firstTabWithErrors);
        }
        setMessage({ type: 'error', text: 'Please fill in all required fields marked with *' });
        return;
      }
    }

    setActiveTab(targetTabId);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    REQUIRED_FIELDS.forEach(({ key, label }) => {
      if (!formData[key] || String(formData[key]).trim() === '') {
        errors[key] = `${label} is required`;
      }
    });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Find the first tab with errors and switch to it
      for (const tabId of TAB_ORDER) {
        const fields = REQUIRED_FIELDS_BY_TAB[tabId] || [];
        const hasTabError = fields.some(({ key }) => errors[key]);
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
    if (!validateForm()) return;
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
          await api.enrollStudent(
            username,
            '',
            selectedGradeId ? Number(selectedGradeId) : undefined as any,
            selectedClassId ? Number(selectedClassId) : undefined as any
          );
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
    <FormContext.Provider value={{ formData, handleChange, isEnrollMode, isEditMode, selectedStudent, formErrors }}>
      <div className="flex flex-col space-y-3 animate-in fade-in duration-700 pb-6">

        {/* ── Header Banner — only on landing, hidden in viewOneMode & enrollMode ── */}
        {!isViewOneMode && !isEnrollMode && (
          <div className="flex flex-col items-center text-center bg-white py-10 px-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent pointer-events-none" />
            <GraduationCap className="text-primary mb-3 relative z-10" size={40} />
            <h1 className="text-3xl font-semibold text-slate-800 tracking-tight relative z-10">Student Registration</h1>
            <p className="text-sm font-medium text-slate-500 mt-1 mb-6 relative z-10">Add and manage student information securely and efficiently.</p>

            {/* Quick Actions — shown only on landing */}
            {!selectedStudent && !isEnrollMode && (
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                <Button type="button" onClick={handleStartEnrollmentInline}
                  className="h-10 px-5 rounded-xl bg-white border-2 border-slate-200 hover:border-primary hover:bg-primary/5 text-slate-700 font-semibold text-xs shadow-sm transition-all !normal-case">
                  <UserPlus size={15} className="mr-2 text-primary" /> Enroll New Student
                </Button>
                <Button type="button" onClick={() => setIsViewOneMode(true)}
                  className="h-10 px-5 rounded-xl bg-white border-2 border-slate-200 hover:border-primary hover:bg-primary/5 text-slate-700 font-semibold text-xs shadow-sm transition-all !normal-case">
                  <Search size={15} className="mr-2 text-primary" /> View One Student
                </Button>
                <Link href="/admin/reporting?report=students"
                  className="h-10 px-5 flex items-center justify-center rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs shadow-md shadow-primary/20 active:scale-95 transition-all !normal-case">
                  <Users size={15} className="mr-2" /> View All Students
                </Link>
              </div>
            )}

            {/* Back button when in enroll / selectedStudent mode */}
            {(selectedStudent || isEnrollMode) && (
              <Button type="button" onClick={handleReset}
                className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs shadow-sm transition-all relative z-10">
                <RotateCcw size={13} className="mr-2" /> Back to Directory
              </Button>
            )}
          </div>
        )}




        {/* ── Page notification ───────────────────────────────────────────────── */}
        {message && (
          <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-500 shadow-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            </div>
            <div className="text-left">
              <p className="font-bold text-xs tracking-wide">Notification</p>
              <p className="text-xs font-semibold opacity-90 leading-tight">{message.text}</p>
            </div>
            <button onClick={() => setMessage(null)} className="ml-auto p-1.5 hover:bg-black/5 rounded-md transition-colors" title="Close notification"><X size={14} /></button>
          </div>
        )}



        {/* ── Workspace card — visible when student selected, in enroll mode, or in viewOne mode ── */}
        {(selectedStudent || isEnrollMode || isViewOneMode) && (
          <>
          <div ref={workspaceRef} />
          <form onSubmit={handleSaveWorkspace}>
          <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative animate-in fade-in slide-in-from-top-3 duration-500">
            <CardHeader className="px-5 py-3 border-b border-slate-100 flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                <CardTitle className="text-sm font-semibold text-black">
                  {isEnrollMode
                    ? isLoadedExistingStudent ? `Editing: ${formData.username}` : 'New Student Enrollment'
                    : isEditMode ? `Editing: ${formData.username}`
                    : selectedStudent ? 'Student Profile' : 'Search student details'}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {isViewOneMode && (
                  <div className="relative mr-2">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <Input
                      id="student-search-input"
                      autoFocus
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={e => { setSearchTerm(e.target.value); setShowSearchDropdown(true); }}
                      onFocus={() => setShowSearchDropdown(true)}
                      onBlur={() => setTimeout(() => setShowSearchDropdown(false), 150)}
                      className="pl-9 h-8 w-48 md:w-64 border-slate-200 rounded-lg text-xs font-semibold bg-slate-50 focus:bg-white"
                    />
                    {showSearchDropdown && searchTerm.length > 0 && (() => {
                      const suggestions = students.filter(s =>
                        (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (s.nic || '').toLowerCase().includes(searchTerm.toLowerCase())
                      ).slice(0, 8);
                      return suggestions.length > 0 ? (
                        <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                          {suggestions.map(s => (
                            <button
                              key={s.username}
                              type="button"
                              onMouseDown={() => {
                                setSelectedStudent(s);
                                setIsEnrollMode(false);
                                setIsEditMode(false);
                                setSearchTerm(s.fullName || s.username);
                                setShowSearchDropdown(false);
                                setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors border-b border-slate-100 last:border-0"
                            >
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-black text-primary">{(s.fullName || s.username || '?')[0].toUpperCase()}</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{s.fullName || s.username}</p>
                                <p className="text-[10px] text-slate-400 font-semibold">{s.username}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
                <ActiveBadge value={formData.isActive} />
                <div className="px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary">
                  ID: {String(isEnrollMode ? (formData.username || 'Generating...') : (selectedStudent?.username || '—'))}
                </div>
                {selectedStudent && !isEnrollMode && (
                  <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-200">
                    {!isEditMode ? (
                      <>
                        <button
                          type="button"
                          className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer select-none"
                          onMouseDown={(e) => { e.preventDefault(); setIsEditMode(true); }}>
                          <Edit size={12} /> Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <Button type="submit"
                          className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold active:scale-95 transition-all text-xs"
                          isLoading={isSubmitting}>
                          <Save size={12} className="mr-1" /> Save
                        </Button>
                        <Button type="button"
                          className="h-8 px-3 rounded-lg bg-slate-500 hover:bg-slate-600 text-white font-semibold active:scale-95 transition-all text-xs"
                          onClick={handleCancelEdit}>
                          <X size={12} className="mr-1" /> Cancel
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>

            {/* ── No result hint in viewOneMode ── */}
            {isViewOneMode && !selectedStudent && searchTerm && students.length === 0 && (
              <div className="px-5 py-3 bg-rose-50 border-b border-rose-100 text-rose-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={14} /> No student found for "{searchTerm}". Try a different index or name.
              </div>
            )}

            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <div className="w-full lg:w-60 bg-slate-50/50 border-r border-slate-100 p-3 flex lg:flex-col gap-1 overflow-x-auto whitespace-nowrap lg:whitespace-normal custom-scrollbar shrink-0">
                  {TABS.filter(tab => tab.id !== 'visibility' || !isEnrollMode).map(tab => (
                    <button key={tab.id} type="button" onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-bold text-xs text-left ${activeTab === tab.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-white hover:text-primary'}`}>
                      <tab.icon size={14} />{tab.name}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 p-5 lg:p-8 bg-white relative">
                  <div className="space-y-6 max-w-4xl">

                    {activeTab === 'basic' && (
                      <div className="space-y-4 animate-in fade-in duration-300">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                          <FormInput label="Index No" name="username" disabled={!isEnrollMode} required />
                          <FormInput label="Full Name" name="fullName" required />
                          <FormInput label="Name in Sinhala as Birth Certificate" name="nameSinhala" />
                          <FormInput label="Name with Initial" name="nameWithInitials" />
                          <FormInput label="Name with Initial Sinhala" name="nameWithInitialSinhala" />
                          <FormInput label="Date Of Birth" name="dob" type="date" required />
                          <FormInput label="NIC" name="nic" required />
                          <FormInput label="Birth Certificate No" name="birthCertificateNumber" />
                          <FormInput label="District" name="district" />
                          <FormInput label="Religion" name="religion" required />
                          <FormInput label="Gender" name="gender" options={GENDER_OPTIONS} required />
                          <FormInput label="Mother Name" name="motherName" />
                          <FormInput label="Father Name" name="fatherName" required />
                          {/* Guardian ID Link to Parent Directory */}
                          <div className="space-y-1 text-left">
                            <label className="text-xs font-semibold text-slate-500 ml-1">Guardian ID</label>
                            <div className="flex gap-2">
                              <div className="flex-1 relative" ref={guardianDropdownRef}>
                                {(!isEnrollMode && !isEditMode && selectedStudent) ? (
                                  <div className="bg-slate-50/70 p-2.5 px-3.5 rounded-xl border border-slate-100/85 text-left h-full flex flex-col justify-center">
                                    <span className="block text-sm font-semibold text-black leading-tight wrap-break-word">
                                      {String(formData.guardianIdRef || '—')}
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <Input 
                                      type="text" 
                                      name="guardianIdRef" 
                                      value={showGuardianDropdown ? guardianSearchTerm : String(formData.guardianIdRef || '')} 
                                      onChange={(e) => {
                                        handleChange(e);
                                        setGuardianSearchTerm(e.target.value);
                                        setShowGuardianDropdown(true);
                                      }}
                                      onFocus={() => {
                                        setGuardianSearchTerm(String(formData.guardianIdRef || ''));
                                        setShowGuardianDropdown(true);
                                      }}
                                      disabled={!isEnrollMode && !isEditMode} 
                                      placeholder="e.g. GDN-..."
                                      className="h-10 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:ring-2 focus:ring-primary/10 disabled:opacity-50 w-full" 
                                    />
                                    {showGuardianDropdown && (isEnrollMode || isEditMode) && (
                                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                                        {filteredGuardians.length === 0 ? (
                                          <div className="p-3 text-xs text-slate-500 font-bold text-center">
                                            No guardians found
                                          </div>
                                        ) : (
                                          filteredGuardians.map((g) => (
                                            <button
                                              key={g.guardianId}
                                              type="button"
                                              className="w-full text-left px-4 py-2.5 text-xs font-bold text-black hover:bg-emerald-50 hover:text-emerald-700 transition-colors border-b border-slate-100 last:border-none cursor-pointer"
                                              onClick={() => {
                                                setFormData((p: any) => ({ ...p, guardianIdRef: g.guardianId }));
                                                setGuardianSearchTerm('');
                                                setShowGuardianDropdown(false);
                                              }}
                                            >
                                              <div className="font-black text-black">{g.guardianId}</div>
                                              {g.guardianName && <div className="text-[10px] text-slate-400 font-semibold">{g.guardianName}</div>}
                                            </button>
                                          ))
                                        )}
                                      </div>
                                    )}
                                  </>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
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
                          <h4 className="text-xs font-semibold text-primary">Achievements</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 lg:gap-6">
                            {ACHIEVEMENT_FIELDS.map(a => <FormInput key={a.name} label={a.label} name={a.name} options={ACHIEVEMENT_OPTIONS} />)}
                          </div>
                          <FormInput label="Achievements Description" name="talentDescription" type="textarea" />
                        </div>
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                          <h4 className="text-xs font-semibold text-slate-500">Additional Talent Areas</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-4">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <FormInput label="Permanent Address" name="addressPermanent" type="textarea" required />
                          <FormInput label="Temporary Address" name="addressTemporary" type="textarea" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 lg:gap-6">
                          <FormInput label="Emergency Contact" name="contactEmergency" required />
                          <FormInput label="Whatsapp No" name="contactWhatsapp" required />
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
                              <h4 className="text-xs font-semibold text-blue-700">Student Status</h4>
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
                              <p className={`text-sm font-semibold ${formData.isActive === true || formData.isActive === 'true' ? 'text-emerald-700' : 'text-rose-700'}`}>
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
                            <Button type="submit" className="h-10 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs active:scale-95 transition-all shadow-md shadow-emerald-600/20" isLoading={isSubmitting}>
                              <Save size={14} className="mr-2" />Save Changes
                            </Button>
                            {isEditMode && (
                              <Button type="button" className="h-10 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-semibold text-xs active:scale-95 transition-all" onClick={handleCancelEdit}>
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
                          <div className="space-y-1 text-left flex flex-col h-full">
                            <label className="text-xs font-semibold text-slate-500 ml-1 shrink-0">GCE OL Exam Result</label>
                            <div className="flex-1 relative">
                              <Button 
                                type="button" 
                                onClick={() => setIsOlPopupOpen(true)}
                                className="w-full h-10 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 transition-colors flex justify-between items-center px-3 !normal-case"
                              >
                                <span>{formData.resultGceOl && formData.resultGceOl !== '{}' ? 'View/Edit Results' : 'Add Results'}</span>
                                <Edit size={14} className="text-slate-400" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        {(isEnrollMode || isEditMode) && (
                          <div className="mt-4 flex justify-end border-t border-slate-100 pt-4 gap-2">
                            {isEnrollMode && (
                              <Button type="submit" className="h-10 px-8 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs active:scale-95 transition-all shadow-md shadow-primary/20" isLoading={isSubmitting}>
                                Save &amp; Enroll Student
                              </Button>
                            )}
                            {isEditMode && (
                              <>
                                <Button type="submit" className="h-10 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs active:scale-95 transition-all shadow-md shadow-emerald-600/20" isLoading={isSubmitting}>
                                  <Save size={14} className="mr-2" />Save Changes
                                </Button>
                                <Button type="button" className="h-10 px-8 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-semibold text-xs active:scale-95 transition-all" onClick={handleCancelEdit}>
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
          </>
        )}

        <GceOlResultModal
          isOpen={isOlPopupOpen}
          onClose={() => setIsOlPopupOpen(false)}
          initialData={String(formData.resultGceOl || '')}
          onSave={(data) => setFormData((p: any) => ({ ...p, resultGceOl: data }))}
          readOnly={!isEnrollMode && !isEditMode}
        />
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
      <span className="block text-xs font-semibold text-slate-400 leading-none mb-1.5">{label}</span>
      <span className="block text-sm font-semibold text-black leading-tight wrap-break-word">
        {value === true || value === 'true' ? 'Active' : value === false || value === 'false' ? 'Inactive' : String(value || '—')}
      </span>
    </div>
  );
}
