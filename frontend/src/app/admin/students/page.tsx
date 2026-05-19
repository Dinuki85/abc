"use client";

import React, { useEffect, useState } from 'react';
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
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Enrollment Modal State
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
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
    } else {
      // Set to blank empty registration fields
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
  // Depends on [students, searchTerm] but the clear path ONLY fires from the second effect below,
  // so polling-driven students updates will NOT close the workspace.
  useEffect(() => {
    if (searchTerm !== '' && students.length === 1) {
      setSelectedStudent(students[0]);
    }
  }, [students, searchTerm]);

  // Only clear the selection when the user EXPLICITLY empties the search bar.
  // By depending solely on [searchTerm] (not [students]), this effect does NOT
  // re-fire when the 10-second polling refresh updates the student list.
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
  };

  // Enrollment form submission
  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.enrollStudent(username, password, selectedGradeId as number, selectedClassId as number);
      setMessage({ type: 'success', text: `Student ${username} enrolled successfully!` });
      setShowModal(false);
      setUsername('');
      setPassword('');
      setSelectedGradeId('');
      setSelectedClassId('');
      setClasses([]);
      fetchStudents(currentPage);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Enrollment failed. Please check the details.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit and Save student registration
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username) {
      setMessage({ type: 'error', text: 'Index / Admission No is required to save details.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Base schema keys
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
      setMessage({ type: 'success', text: `Registration details for ${formData.username} saved successfully!` });
      fetchStudents(currentPage);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save registration' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', name: 'Tab 1 - Basic Information', icon: User },
    { id: 'health', name: 'Tab 2 - Health', icon: HeartPulse },
    { id: 'skills', name: 'Tab 3 - Skills', icon: Star },
    { id: 'contact', name: 'Tab 4 - Contact Information', icon: MapPin },
    { id: 'exams', name: 'Tab 5 - Exam Result', icon: FileCheck },
    { id: 'visibility', name: 'Tab 6 - Visibility', icon: Eye },
  ];

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

          {selectedStudent && (
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
            onClick={() => setShowModal(true)}
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

      {/* Dynamic Workspace State Indicator & Main tabbed registration form card - Visible only when a student is selected/filtered */}
      {selectedStudent && (
        <>
          <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-lg border border-slate-100 shadow-sm w-fit animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
              Workspace Mode: Edit Student: {selectedStudent.username}
            </span>
          </div>

          <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative animate-in fade-in slide-in-from-top-3 duration-500">
            <CardHeader className="px-5 py-3.5 border-b border-slate-100 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                <CardTitle className="text-sm font-black text-black">Student Registration Command Center</CardTitle>
              </div>
              <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                ID: {selectedStudent.username}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          <FormField label="Index No" value={formData.username} />
                          <FormField label="Full Name" value={formData.fullName} />
                          <FormField label="Name in Sinhala as Birth Certificate" value={formData.nameSinhala} />
                          <FormField label="Name with Initial" value={formData.nameWithInitials} />
                          <FormField label="Name with Initial Sinhala" value={formData.nameWithInitialSinhala} />
                          <FormField label="Date Of Birth" value={formData.dob} />
                          <FormField label="NIC" value={formData.nic} />
                          <FormField label="Birth Certificate No" value={formData.birthCertificateNumber} />
                          <FormField label="District" value={formData.district} />
                          <FormField label="Religion" value={formData.religion} />
                          <FormField label="Gender" value={formData.gender === 'MALE' ? 'Male' : formData.gender === 'FEMALE' ? 'Female' : formData.gender} />
                          <FormField label="Mother Name" value={formData.motherName} />
                          <FormField label="Father Name" value={formData.fatherName} />
                          <FormField label="Guardian ID" value={formData.guardianIdRef} />
                          <FormField label="Age - Auto Calculate" value={formData.age} />
                          <FormField label="Inter School House" value={formData.interSchoolHouse} />
                          <FormField label="Siblings" value={formData.siblings} />
                        </div>
                      </div>
                    )}

                    {activeTab === 'health' && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          <FormField label="Height" value={formData.height} />
                          <FormField label="Weight" value={formData.weight} />
                          <FormField label="Blood Type" value={formData.bloodGroup} />
                          <FormField label="Special Physical Condition" value={formData.specialPhysicalCondition} />
                          <FormField label="Special Illness" value={formData.specialIllness} />
                          <FormField label="Long Term Diseases" value={formData.longTermDiseases} />
                          <FormField label="Special Need" value={formData.specialNeed} />
                        </div>
                        <FormField label="Medical Description" value={formData.medicalDescription} />
                      </div>
                    )}

                    {activeTab === 'skills' && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Achievements</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            <FormField label="International" value={formData.achievementInternational} />
                            <FormField label="National" value={formData.achievementNational} />
                            <FormField label="Provincial" value={formData.achievementProvincial} />
                            <FormField label="Zonal" value={formData.achievementZonal} />
                            <FormField label="Divisional" value={formData.achievementDivisional} />
                            <FormField label="School" value={formData.achievementSchool} />
                          </div>
                          <FormField label="Achievements Description" value={formData.talentDescription} />
                        </div>

                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Additional Talent Areas</h4>
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
                        </div>
                      </div>
                    )}

                    {activeTab === 'contact' && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField label="Permanent Address" value={formData.addressPermanent} />
                          <FormField label="Temporary Address" value={formData.addressTemporary} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                          <FormField label="Emergency Contact" value={formData.contactEmergency} />
                          <FormField label="Whatsapp No" value={formData.contactWhatsapp} />
                          <FormField label="Home No" value={formData.contactHome} />
                          <FormField label="Mobile No" value={formData.contactMobile} />
                          <FormField label="Email Address" value={formData.contactEmail} />
                          <FormField label="Distance to School" value={formData.distanceToSchool} />
                        </div>
                      </div>
                    )}

                    {activeTab === 'exams' && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField label="Grade 05 Exam Result" value={formData.resultGrade05} />
                          <FormField label="GCE OL Exam Result" value={formData.resultGceOl} />
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

                          <div className="flex flex-col gap-3">
                            <button
                              type="button"
                              onClick={async () => {
                                if (formData.isActive !== true && formData.isActive !== 'true') {
                                  try {
                                    setIsSubmitting(true);
                                    // Update locally and in DB to active
                                    await api.saveStudentProfile(formData.username, { ...formData, isActive: true });
                                    setFormData((prev: any) => ({ ...prev, isActive: true }));
                                    setMessage({ type: 'success', text: `Student ${formData.username} is now Active.` });
                                    fetchStudents(currentPage);
                                  } catch (err: any) {
                                    setMessage({ type: 'error', text: err.message || 'Failed to update visibility.' });
                                  } finally {
                                    setIsSubmitting(false);
                                  }
                                }
                              }}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                                formData.isActive === true || formData.isActive === 'true'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                                  : 'bg-white border-slate-200/60 hover:bg-slate-50 text-slate-500'
                              }`}
                              disabled={isSubmitting}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${formData.isActive === true || formData.isActive === 'true' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                <span className="text-xs font-black uppercase tracking-wider">Active</span>
                              </div>
                              {formData.isActive === true || formData.isActive === 'true' ? (
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Current Status</span>
                              ) : (
                                <span className="text-[9px] text-slate-400 font-bold">Select to Activate</span>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={async () => {
                                if (confirm(`WARNING: Setting this student to Inactive will completely delete their profile and login account from the database. Are you sure you want to proceed?`)) {
                                  try {
                                    setIsSubmitting(true);
                                    await api.deleteStudent(formData.username);
                                    setMessage({ type: 'success', text: `Student ${formData.username} has been set to Inactive and completely removed from the database.` });
                                    setSelectedStudent(null);
                                    setSearchTerm('');
                                    fetchStudents(currentPage);
                                  } catch (err: any) {
                                    setMessage({ type: 'error', text: err.message || 'Failed to delete student.' });
                                  } finally {
                                    setIsSubmitting(false);
                                  }
                                }
                              }}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                                formData.isActive === false || formData.isActive === 'false'
                                  ? 'bg-rose-50 border-rose-200 text-rose-800 font-bold'
                                  : 'bg-white border-slate-200/60 hover:bg-rose-50/30 hover:border-rose-200 text-slate-500'
                              }`}
                              disabled={isSubmitting}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${formData.isActive === false || formData.isActive === 'false' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`} />
                                <span className="text-xs font-black uppercase tracking-wider">Inactive (Delete Profile)</span>
                              </div>
                              {formData.isActive === false || formData.isActive === 'false' ? (
                                <span className="text-[9px] bg-rose-500/20 text-rose-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Current Status</span>
                              ) : (
                                <span className="text-[9px] text-rose-500 font-bold">Click to Delete</span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

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
                    onClick={() => setSelectedStudent(st)}
                    className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${
                      selectedStudent && selectedStudent.username === st.username ? 'bg-primary/5 hover:bg-primary/5' : ''
                    }`}
                  >
                    <TableCell className="px-4 py-2 font-black text-primary font-mono tracking-tighter text-xs">
                      {st.username}
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

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
          <div className="flex min-h-full items-center justify-center">
            <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30">
                    <UserPlus size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black font-handlee">New Student Enrollment</h3>
                    <p className="text-sm text-black font-black tracking-tight">Generate access credentials and assign academic cell</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl flex items-center justify-center text-black hover:bg-slate-100 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleEnrollment} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-black uppercase tracking-[0.15em] ml-2">Admission / Index No</label>
                    <div className="relative">
                      <Input 
                        placeholder="STU-2024-0001" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        className="h-14 pl-12 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        <ShieldCheck size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-black uppercase tracking-[0.15em] ml-2">Secure Passcode</label>
                    <div className="relative">
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="h-14 pl-12 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        <Lock size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-black uppercase tracking-[0.15em] ml-2">Primary Academic Grade</label>
                    <select 
                      value={selectedGradeId} 
                      onChange={(e) => {
                        const gId = parseInt(e.target.value);
                        setSelectedGradeId(gId);
                        setSelectedClassId('');
                        fetchClassesForGrade(gId);
                      }} 
                      required 
                      className="w-full h-14 bg-slate-50/50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-bold text-slate-700 shadow-inner"
                    >
                      <option value="">Choose Grade</option>
                      {grades.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-black uppercase tracking-[0.15em] ml-2">Assigned Class Section</label>
                    <select 
                      value={selectedClassId} 
                      onChange={(e) => setSelectedClassId(parseInt(e.target.value))} 
                      required 
                      disabled={!selectedGradeId}
                      className="w-full h-14 bg-slate-50/50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-bold text-slate-700 shadow-inner disabled:opacity-50"
                    >
                      <option value="">Choose Class</option>
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-16 rounded-3xl font-bold text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 bg-primary hover:bg-primary-hover text-white active:scale-95 transition-all" 
                    isLoading={isSubmitting}
                  >
                    Authorize &amp; Enroll Student
                  </Button>
                  <p className="text-center text-xs text-black font-black uppercase tracking-[0.15em] mt-6">
                    Verified Administrative Action &bull; Security Logged
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
