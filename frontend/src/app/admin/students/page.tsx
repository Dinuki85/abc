"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { 
  Plus, Edit2, Trash2, Search, X, ShieldCheck, GraduationCap, School, 
  CheckCircle2, AlertCircle, Lock, Filter, UserPlus, Eye, FileSpreadsheet, 
  ChevronRight, Save, User, HeartPulse, Star, MapPin, FileCheck, Info, RotateCcw 
} from 'lucide-react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { Input } from '@/components/ui/Input';

export default function StudentsPage() {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // New Enrollment / Edit Mode states inside workspace
  const [isEnrollMode, setIsEnrollMode] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState<number | ''>('');
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');

  // Directory Filters
  const [filterGradeId, setFilterGradeId] = useState<number | ''>('');
  const [filterClassId, setFilterClassId] = useState<number | ''>('');
  const [filterClasses, setFilterClasses] = useState<any[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  // Selected Student & Tab Workspace State
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'health' | 'skills' | 'contact' | 'exams' | 'visibility'>('basic');
  
  // High-Density Pagination State (All items)
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10000);
  const [totalElements, setTotalElements] = useState(0);

  // 6-Tab Form Data State (Aligned with hand-drawn wireframe)
  const [formData, setFormData] = useState<any>({
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
    
    // Tab 2 - Health
    height: '',
    weight: '',
    bloodGroup: '',
    specialPhysicalCondition: '',
    specialIllness: '',
    longTermDiseases: '',
    specialNeed: '',
    medicalDescription: '',

    // Tab 3 - Skills & Achievements
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

    // Tab 4 - Contact Info
    addressPermanent: '',
    addressTemporary: '',
    contactEmergency: '',
    contactWhatsapp: '',
    contactHome: '',
    contactMobile: '',
    contactEmail: '',
    distanceToSchool: '',

    // Tab 5 - Exam Results
    resultGrade05: '',
    resultGceOl: '',

    // Tab 6 - Visibility
    isActive: true,
  });

  const fetchGrades = async () => {
    try {
      const data = await api.getGrades();
      setGrades(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async (page = 0, hideLoadingState = false) => {
    if (!hideLoadingState) setIsLoading(true);
    try {
      const response = await api.getPaginatedStudents(page, pageSize, searchTerm, filterGradeId, filterClassId);
      setStudents(response.content);
      setTotalElements(response.totalElements);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      if (!hideLoadingState) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(currentPage, currentPage !== 0);
    }, 300);

    const interval = setInterval(() => {
      fetchStudents(currentPage, true);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentPage, searchTerm, filterGradeId, filterClassId]);

  const fetchClassesForGrade = async (gradeId: number, isFilter = false) => {
    try {
      const data = await api.getClassesByGrade(gradeId);
      if (isFilter) {
        setFilterClasses(data);
      } else {
        setClasses(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Auto-calculated age effect from Date of Birth
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      if (!isNaN(birthDate.getTime())) {
        const difference = Date.now() - birthDate.getTime();
        const ageDate = new Date(difference);
        const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        setFormData((prev: any) => ({ ...prev, age: calculatedAge }));
      }
    }
  }, [formData.dob]);

  // Load clicked student details into 6 tabs
  useEffect(() => {
    if (selectedStudent) {
      setIsEnrollMode(false);
      let data = { ...selectedStudent };
      if (selectedStudent.additionalData) {
        try {
          const extra = JSON.parse(selectedStudent.additionalData);
          data = { ...data, ...extra };
        } catch (e) {
          console.error("Failed to parse additionalData", e);
        }
      }
      setFormData(data);
    } else if (!isEnrollMode) {
      // Set to blank empty fields by default (showing — for FormField)
      setFormData({
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
      });
    }
  }, [selectedStudent]);

  // Auto-select when a typed search yields exactly 1 result.
  useEffect(() => {
    if (searchTerm !== '' && students.length === 1) {
      setSelectedStudent(students[0]);
    }
  }, [students, searchTerm]);

  // Only clear the selection when the user EXPLICITLY empties the search bar.
  useEffect(() => {
    if (searchTerm === '') {
      setSelectedStudent(null);
    }
  }, [searchTerm]);

  // Handle input binding
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: any) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  // Reset/Clear workspace selection
  const handleReset = () => {
    setSelectedStudent(null);
    setIsEnrollMode(false);
  };

  // Select a student from the table and scroll to workspace
  const handleSelectStudent = (st: StudentProfile) => {
    setSelectedStudent(st);
    setIsEnrollMode(false);
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // Start Enrollment Mode: Sets index number auto-generation
  const handleStartEnrollment = async () => {
    setSelectedStudent(null);
    setIsEnrollMode(true);
    setSelectedGradeId('');
    setSelectedClassId('');
    setPassword('');
    setClasses([]);
    
    setFormData({
      username: 'Generating...',
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
    });

    try {
      const nextIndex = await api.getNextStudentIndex();
      setFormData((prev: any) => ({ ...prev, username: nextIndex }));
    } catch (error) {
      console.error("Failed to generate next index", error);
      setFormData((prev: any) => ({ ...prev, username: '' }));
    }
  };

  // Submit and Enroll Student (saving passcode and grade/class, and profile details)
  const handleSaveEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || formData.username === 'Generating...') {
      setMessage({ type: 'error', text: 'Auto-generated Index No is required.' });
      return;
    }
    if (!password) {
      setMessage({ type: 'error', text: 'Secure passcode is required for enrollment.' });
      return;
    }
    if (!selectedGradeId || !selectedClassId) {
      setMessage({ type: 'error', text: 'Primary Grade and Class Section are required.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Step 1: Enroll (Create user login)
      await api.enrollStudent(formData.username, password, selectedGradeId as number, selectedClassId as number);

      // Step 2: Save registration profile details
      const baseKeys = ['id', 'username', 'fullName', 'gender', 'dob', 'isActive', 'gradeId', 'classId', 'verificationStatus', 'verifiedByName', 'verifiedAt', 'verificationComment', 'profileCompleted'];
      const extraData: Record<string, any> = {};
      Object.keys(formData).forEach(key => {
        if (!baseKeys.includes(key) && !key.startsWith('additionalData')) {
          extraData[key] = formData[key];
        }
      });
      
      const payload = {
        ...formData,
        additionalData: JSON.stringify(extraData)
      };
      
      await api.saveStudentProfile(formData.username, payload);

      setMessage({ type: 'success', text: `Student successfully enrolled under Admission No: ${formData.username}` });
      setIsEnrollMode(false);
      fetchStudents(currentPage);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Enrollment failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', name: 'Basic Information', icon: User },
    { id: 'health', name: 'Health', icon: HeartPulse },
    { id: 'skills', name: 'Skills', icon: Star },
    { id: 'contact', name: 'Contact Information', icon: MapPin },
    { id: 'exams', name: 'Exam Result', icon: FileCheck },
    { id: 'visibility', name: 'Visibility', icon: Eye },
  ];

  // Helper Input Renderer that switches between editable and non-editable view
  function FormInput({ 
    label, 
    name, 
    type = "text", 
    options = null, 
    disabled = false, 
    placeholder = "" 
  }: { 
    label: string, 
    name: string, 
    type?: string, 
    options?: { label: string, value: any }[] | null, 
    disabled?: boolean, 
    placeholder?: string 
  }) {
    if (isEnrollMode) {
      if (options) {
        return (
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
            <select
              name={name}
              value={formData[name] || ''}
              onChange={handleChange}
              disabled={disabled}
              className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black"
            >
              <option value="">Choose {label}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      }
      if (type === "textarea") {
        return (
          <div className="space-y-1 text-left w-full sm:col-span-2 md:col-span-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
            <textarea
              name={name}
              value={formData[name] || ''}
              onChange={handleChange}
              disabled={disabled}
              placeholder={placeholder}
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 custom-scrollbar"
            />
          </div>
        );
      }
      return (
        <div className="space-y-1 text-left">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
          <Input
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            className="h-10 rounded-xl border border-slate-200 bg-white font-bold text-black text-xs focus:ring-2 focus:ring-primary/10"
          />
        </div>
      );
    } else {
      // Read Only Mode
      let displayVal = formData[name];
      if (options && displayVal) {
        const matched = options.find(o => o.value === displayVal);
        if (matched) displayVal = matched.label;
      }
      return <FormField label={label} value={displayVal} />;
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-700 pb-10">
      
      {/* Institutional Compact Toolbar - Dynamic & High-Density */}
      <div className="w-full bg-white p-2 px-3 rounded-xl border border-slate-100 shadow-md flex flex-col sm:flex-row items-center gap-2 justify-between">
        <div className="relative flex-1 w-full sm:max-w-[380px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <Input 
            placeholder="Search index or name..." 
            className="pl-9 h-9 w-full rounded-lg border-slate-200 bg-slate-50 focus:bg-white transition-all text-xs font-bold text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <select 
            value={filterGradeId} 
            onChange={(e) => {
              const gId = e.target.value === '' ? '' : parseInt(e.target.value);
              setFilterGradeId(gId);
              setFilterClassId('');
              if (gId !== '') fetchClassesForGrade(gId, true);
              else setFilterClasses([]);
            }}
            className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-black text-black min-w-[110px] cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <option value="">All Grades</option>
            {grades.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          <select 
            value={filterClassId} 
            onChange={(e) => setFilterClassId(e.target.value === '' ? '' : parseInt(e.target.value))}
            disabled={filterGradeId === ''}
            className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-black text-black min-w-[110px] disabled:opacity-50 cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <option value="">All Classes</option>
            {filterClasses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {(selectedStudent || isEnrollMode) && (
            <Button 
              className="h-9 px-3 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs"
              onClick={handleReset}
            >
              <RotateCcw size={13} className="mr-1.5" />
              Clear Selection
            </Button>
          )}

          <Button 
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs shadow-md shadow-primary/20"
            onClick={handleStartEnrollment}
          >
            <UserPlus size={13} className="mr-1.5" />
            Enroll Student
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-500 shadow-sm ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          </div>
          <div className="text-left">
            <p className="font-bold text-xs uppercase tracking-wide">Notification</p>
            <p className="text-xs font-semibold opacity-90 leading-tight">{message.text}</p>
          </div>
          <button onClick={() => setMessage(null)} className="ml-auto p-1.5 hover:bg-black/5 rounded-md transition-colors">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Dynamic Workspace State Indicator */}
      <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-lg border border-slate-100 shadow-sm w-fit animate-in fade-in slide-in-from-top-2 duration-300">
        <span className={`w-2 h-2 rounded-full ${isEnrollMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
          {isEnrollMode 
            ? "Workspace Mode: New Student Enrollment (Edit Mode)" 
            : selectedStudent 
              ? `Workspace Mode: View Student: ${selectedStudent.username}` 
              : "Workspace Mode: Standby (Select a student to view details)"}
        </span>
      </div>

      {/* Main tabbed registration form card - Renders unconditionally */}
      <div ref={workspaceRef} />
      <form onSubmit={handleSaveEnrollment}>
        <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative animate-in fade-in slide-in-from-top-3 duration-500">
          <CardHeader className="px-5 py-3.5 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} />
              <CardTitle className="text-sm font-black text-black">
                {isEnrollMode ? "Student Enrollment Command Center" : "Student Registration Command Center"}
              </CardTitle>
            </div>
            <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
              ID: {isEnrollMode ? (formData.username || 'Generating...') : (selectedStudent?.username || '—')}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row min-h-[360px]">
              
              {/* Left sidebar tab selector */}
              <div className="w-full lg:w-60 bg-slate-50/50 border-r border-slate-100 p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto whitespace-nowrap lg:whitespace-normal">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-bold text-[10px] uppercase tracking-wider text-left ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                        : 'text-slate-500 hover:bg-white hover:text-primary'
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Right workspace form input fields */}
              <div className="flex-1 p-5 bg-white relative">
                <div className="space-y-4">
                  
                  {activeTab === 'basic' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {/* Passcode and Class Credentials - Edit Mode Only */}
                      {isEnrollMode && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 mb-2 space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Academic Cell &amp; Credentials</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Passcode</label>
                              <Input 
                                type="password"
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="h-10 rounded-xl border-slate-200 bg-white text-xs font-bold text-black focus:ring-2 focus:ring-primary/10"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Primary Grade</label>
                              <select 
                                value={selectedGradeId} 
                                onChange={(e) => {
                                  const gId = parseInt(e.target.value);
                                  setSelectedGradeId(gId);
                                  setSelectedClassId('');
                                  fetchClassesForGrade(gId);
                                }} 
                                required 
                                className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black"
                              >
                                <option value="">Choose Grade</option>
                                {grades.map(g => (
                                  <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Class Section</label>
                              <select 
                                value={selectedClassId} 
                                onChange={(e) => setSelectedClassId(parseInt(e.target.value))} 
                                required 
                                disabled={!selectedGradeId}
                                className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-black disabled:opacity-50"
                              >
                                <option value="">Choose Class</option>
                                {classes.map(c => (
                                  <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
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
                        <FormInput 
                          label="Gender" 
                          name="gender" 
                          options={[{label: 'Male', value: 'MALE'}, {label: 'Female', value: 'FEMALE'}]} 
                        />
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
                        <FormInput 
                          label="Blood Type" 
                          name="bloodGroup" 
                          options={[
                            {label: 'A+', value: 'A+'}, {label: 'A-', value: 'A-'},
                            {label: 'B+', value: 'B+'}, {label: 'B-', value: 'B-'},
                            {label: 'O+', value: 'O+'}, {label: 'O-', value: 'O-'},
                            {label: 'AB+', value: 'AB+'}, {label: 'AB-', value: 'AB-'}
                          ]} 
                        />
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
                          {[
                            { label: "International", name: "achievementInternational" },
                            { label: "National", name: "achievementNational" },
                            { label: "Provincial", name: "achievementProvincial" },
                            { label: "Zonal", name: "achievementZonal" },
                            { label: "Divisional", name: "achievementDivisional" },
                            { label: "School", name: "achievementSchool" }
                          ].map(ach => (
                            <FormInput 
                              key={ach.name}
                              label={ach.label} 
                              name={ach.name} 
                              options={[
                                { label: '1st Place', value: '1st' },
                                { label: '2nd Place', value: '2nd' },
                                { label: '3rd Place', value: '3rd' },
                                { label: 'Participant', value: 'participant' }
                              ]}
                            />
                          ))}
                        </div>
                        <FormInput label="Achievements Description" name="talentDescription" type="textarea" />
                      </div>

                      <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Additional Talent Areas</h4>
                        
                        {isEnrollMode ? (
                          // Edit Mode: Checkbox select
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {[
                              { label: 'Agriculture', name: 'talentAgri' },
                              { label: 'ICT', name: 'talentIct' },
                              { label: 'Aesthetic', name: 'talentAesthetic' },
                              { label: 'Media & Announcing', name: 'talentMedia' },
                              { label: 'Sport & Athletic', name: 'talentSport' },
                              { label: 'Innovation', name: 'talentInnovation' },
                              { label: 'Cinematography', name: 'talentCinematography' }
                            ].map((t) => (
                              <label key={t.name} className="flex items-center gap-3 p-2 px-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-primary transition-all">
                                <input 
                                  type="checkbox" 
                                  name={t.name}
                                  checked={formData[t.name] === true || formData[t.name] === 'true'}
                                  onChange={handleChange}
                                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                />
                                <span className="text-xs font-bold text-slate-700">{t.label}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          // Read Only View Badges
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {[
                              {label: 'Agriculture', val: formData.talentAgri},
                              {label: 'ICT', val: formData.talentIct},
                              {label: 'Aesthetic', val: formData.talentAesthetic},
                              {label: 'Media & Announcing', val: formData.talentMedia},
                              {label: 'Sport & Athletic', val: formData.talentSport},
                              {label: 'Innovation', val: formData.talentInnovation},
                              {label: 'Cinematography', val: formData.talentCinematography}
                            ].map((t) => (
                              <div key={t.label} className={`flex items-center gap-2 p-2 px-3 border rounded-xl transition-all ${
                                t.val ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800 font-bold' : 'bg-slate-50/30 border-slate-100 text-slate-400'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${t.val ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                <span className="text-[10px] font-black uppercase tracking-wider">{t.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
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
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Modify Profile Visibility</span>
                        </div>

                        {isEnrollMode ? (
                          // Edit Mode: Visibility selectors
                          <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-4 cursor-pointer p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-55 transition-colors">
                              <input 
                                type="radio" 
                                name="isActive" 
                                value="true" 
                                checked={formData.isActive === true || formData.isActive === 'true'} 
                                onChange={() => setFormData((prev:any) => ({...prev, isActive: true}))}
                                className="w-4 h-4 text-emerald-500 focus:ring-emerald-500" 
                              />
                              <span className="text-xs font-bold text-emerald-800">Active</span>
                            </label>
                            <label className="flex items-center gap-4 cursor-pointer p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                              <input 
                                type="radio" 
                                name="isActive" 
                                value="false" 
                                checked={formData.isActive === false || formData.isActive === 'false'} 
                                onChange={() => setFormData((prev:any) => ({...prev, isActive: false}))}
                                className="w-4 h-4 text-rose-500 focus:ring-rose-500" 
                              />
                              <span className="text-xs font-bold text-rose-800">Inactive</span>
                            </label>
                          </div>
                        ) : (
                          // Read Only View
                          <div className="flex flex-col gap-3">
                            <div className={`flex items-center justify-between p-3 rounded-xl border ${
                              formData.isActive === true || formData.isActive === 'true'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                                : 'bg-rose-50 border-rose-200 text-rose-800 font-bold'
                            }`}>
                              <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${formData.isActive === true || formData.isActive === 'true' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                <span className="text-xs font-black uppercase tracking-wider">
                                  {formData.isActive === true || formData.isActive === 'true' ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <span className="text-[9px] bg-slate-500/20 text-slate-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Read-Only</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit / Action buttons inside workspace in Edit Mode */}
                  {isEnrollMode && (
                    <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                      <Button 
                        type="button" 
                        onClick={() => setIsEnrollMode(false)}
                        className="h-10 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-black uppercase tracking-wider text-xs active:scale-95 transition-all"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="h-10 px-8 rounded-xl bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-wider text-xs active:scale-95 transition-all shadow-md shadow-primary/20"
                        isLoading={isSubmitting}
                      >
                        Save &amp; Enroll Student
                      </Button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Main Student Directory List - Positioned below the Workspace */}
      <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative">
        <CardHeader className="px-5 py-3 border-b border-slate-100 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-secondary rounded-full" />
            <CardTitle className="text-xs font-black text-black">Student Directory</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shadow-sm">
              <FileSpreadsheet size={13} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-wider text-black">
                {totalElements} Institutional Records
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="w-full">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
                <TableRow className="border-none">
                  <TableHead className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black w-[150px]">Admission</TableHead>
                  <TableHead className="py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black">Student Name</TableHead>
                  <TableHead className="hidden md:table-cell py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center w-[150px]">Academic Cell</TableHead>
                  <TableHead className="hidden sm:table-cell py-2 text-[10px] font-black uppercase tracking-[0.1em] text-black text-center w-[130px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={`loading-${i}`}>
                    <TableCell colSpan={4} className="px-4 py-3 animate-pulse">
                      <div className="h-3 bg-slate-100 rounded-full w-full" />
                    </TableCell>
                  </TableRow>
                ))}

                {!isLoading && students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-black opacity-20">
                          <Search size={20} />
                        </div>
                        <p className="text-black font-black italic opacity-40 uppercase tracking-widest text-[10px]">No Records Found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && students.map((st) => (
                  <TableRow 
                    key={st.id || st.username} 
                    onClick={() => handleSelectStudent(st)}
                    className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${
                      selectedStudent && selectedStudent.username === st.username ? 'bg-primary/5 hover:bg-primary/5' : ''
                    }`}
                  >
                    <TableCell className="px-4 py-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudent(st);
                        }}
                        className="font-black text-primary font-mono tracking-tighter text-xs hover:underline cursor-pointer focus:outline-none transition-all active:scale-95 bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg border border-primary/20"
                      >
                        {st.username}
                      </button>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black text-black group-hover:text-primary transition-colors line-clamp-1">
                          {st.fullName || <span className="text-rose-500 italic font-bold">Incomplete Profile</span>}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5 md:hidden">
                           <span className="text-[9px] font-black text-black uppercase opacity-60">
                             {st.gradeName} {st.className}
                           </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell py-2 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[9px] font-black text-black uppercase tracking-widest">
                          {st.gradeName || 'N/A'}
                        </span>
                        <span className="text-[9px] font-black text-primary uppercase opacity-70">
                          Class {st.className || 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell py-2 text-center">
                      <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border
                        ${st.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          st.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {st.verificationStatus || 'PENDING'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
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
