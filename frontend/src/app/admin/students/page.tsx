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

  // If search matches exactly one student, load them automatically
  useEffect(() => {
    if (searchTerm !== '' && students.length === 1) {
      setSelectedStudent(students[0]);
    }
  }, [students, searchTerm]);

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

  // Reset/Clear workspace form fields to empty state
  const handleReset = () => {
    setSelectedStudent(null);
    setMessage({ type: 'success', text: 'Form fields cleared. Ready for new input!' });
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

          <Button 
            className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider active:scale-95 transition-all text-xs"
            onClick={handleReset}
          >
            <RotateCcw size={13} className="mr-1.5" />
            New / Clear
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
      <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-lg border border-slate-100 shadow-sm w-fit">
        <span className={`w-2 h-2 rounded-full ${selectedStudent ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
          {selectedStudent ? `Workspace Mode: Edit Student: ${selectedStudent.username}` : 'Workspace Mode: New Registration / Standby'}
        </span>
      </div>

      {/* Main tabbed registration form card */}
      <Card className="rounded-2xl border-slate-200/60 shadow-xl overflow-hidden bg-white relative">
        <CardHeader className="px-5 py-3.5 border-b border-slate-100 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary" size={20} />
            <CardTitle className="text-sm font-black text-black">Student Registration Command Center</CardTitle>
          </div>
          {selectedStudent && (
            <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
              ID: {selectedStudent.username}
            </div>
          )}
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
              <form onSubmit={handleSave} className="space-y-4">
                
                {activeTab === 'basic' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <FormField label="Index No" name="username" value={formData.username || ''} onChange={handleChange} disabled={!!selectedStudent} placeholder="STU-2026-0001" />
                      <FormField label="Full Name" name="fullName" value={formData.fullName || ''} onChange={handleChange} placeholder="Firstname Lastname" />
                      <FormField label="Name in Sinhala as Birth Certificate" name="nameSinhala" value={formData.nameSinhala || ''} onChange={handleChange} placeholder="සිංහල නම" />
                      <FormField label="Name with Initial" name="nameWithInitials" value={formData.nameWithInitials || ''} onChange={handleChange} placeholder="A.B.C. Name" />
                      <FormField label="Name with Initial Sinhala" name="nameWithInitialSinhala" value={formData.nameWithInitialSinhala || ''} onChange={handleChange} placeholder="A.B.C. සිංහල නම" />
                      <FormField label="Date Of Birth" name="dob" type="date" value={formData.dob || ''} onChange={handleChange} />
                      <FormField label="NIC" name="nic" value={formData.nic || ''} onChange={handleChange} placeholder="National ID Card No" />
                      <FormField label="Birth Certificate No" name="birthCertificateNumber" value={formData.birthCertificateNumber || ''} onChange={handleChange} placeholder="BC-12345" />
                      <FormField label="District" name="district" value={formData.district || ''} onChange={handleChange} placeholder="Home District" />
                      <FormField label="Religion" name="religion" value={formData.religion || ''} onChange={handleChange} placeholder="e.g. Buddhist" />
                      <SelectField 
                        label="Gender" 
                        name="gender" 
                        value={formData.gender || ''} 
                        onChange={handleChange} 
                        options={[{label: 'Male', value: 'MALE'}, {label: 'Female', value: 'FEMALE'}]} 
                      />
                      <FormField label="Mother Name" name="motherName" value={formData.motherName || ''} onChange={handleChange} placeholder="Mother's Full Name" />
                      <FormField label="Father Name" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} placeholder="Father's Full Name" />
                      <FormField label="Guardian ID" name="guardianIdRef" value={formData.guardianIdRef || ''} onChange={handleChange} placeholder="e.g. GUA-1234" />
                      <FormField label="Age - Auto Calculate" name="age" type="number" value={formData.age || ''} onChange={handleChange} disabled placeholder="Auto-calculated" />
                      <FormField label="Inter School House" name="interSchoolHouse" value={formData.interSchoolHouse || ''} onChange={handleChange} placeholder="House Name" />
                      <FormField label="Siblings" name="siblings" type="number" value={formData.siblings || ''} onChange={handleChange} placeholder="No of siblings" />
                    </div>
                  </div>
                )}

                {activeTab === 'health' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <FormField label="Height" name="height" value={formData.height || ''} onChange={handleChange} placeholder="e.g. 150 cm" />
                      <FormField label="Weight" name="weight" value={formData.weight || ''} onChange={handleChange} placeholder="e.g. 45 kg" />
                      <SelectField 
                        label="Blood Type" 
                        name="bloodGroup" 
                        value={formData.bloodGroup || ''} 
                        onChange={handleChange} 
                        options={[
                          {label: 'A+', value: 'A+'}, {label: 'A-', value: 'A-'},
                          {label: 'B+', value: 'B+'}, {label: 'B-', value: 'B-'},
                          {label: 'O+', value: 'O+'}, {label: 'O-', value: 'O-'},
                          {label: 'AB+', value: 'AB+'}, {label: 'AB-', value: 'AB-'}
                        ]} 
                      />
                      <FormField label="Special Physical Condition" name="specialPhysicalCondition" value={formData.specialPhysicalCondition || ''} onChange={handleChange} placeholder="e.g. None" />
                      <FormField label="Special Illness" name="specialIllness" value={formData.specialIllness || ''} onChange={handleChange} placeholder="Special illnesses" />
                      <FormField label="Long Term Diseases" name="longTermDiseases" value={formData.longTermDiseases || ''} onChange={handleChange} placeholder="e.g. Asthma" />
                      <FormField label="Special Need" name="specialNeed" value={formData.specialNeed || ''} onChange={handleChange} placeholder="Special needs" />
                    </div>
                    <TextAreaField label="Medical Description" name="medicalDescription" value={formData.medicalDescription || ''} onChange={handleChange} placeholder="Provide details here..." />
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Achievements (3* Combo Box)</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {[
                          {id: 'intl', label: 'International', name: 'achievementInternational'},
                          {id: 'nat', label: 'National', name: 'achievementNational'},
                          {id: 'prov', label: 'Provincial', name: 'achievementProvincial'},
                          {id: 'zonal', label: 'Zonal', name: 'achievementZonal'},
                          {id: 'div', label: 'Divisional', name: 'achievementDivisional'},
                          {id: 'sch', label: 'School', name: 'achievementSchool'}
                        ].map((lvl) => (
                          <div key={lvl.id} className="space-y-1 text-left">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider ml-1">{lvl.label}</label>
                            <select 
                              name={lvl.name}
                              value={formData[lvl.name] || ''}
                              onChange={handleChange}
                              className="w-full h-8 bg-white border border-slate-200 rounded-lg px-2 text-xs font-bold text-black"
                            >
                              <option value="">None</option>
                              <option value="1st">1st Place</option>
                              <option value="2nd">2nd Place</option>
                              <option value="3rd">3rd Place</option>
                              <option value="participant">Participant</option>
                            </select>
                          </div>
                        ))}
                      </div>
                      <TextAreaField label="Description * 3" name="talentDescription" value={formData.talentDescription || ''} onChange={handleChange} placeholder="Outline top achievements here..." />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600">Additional Talent Areas (Check Box)</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {[
                          {label: 'Agriculture', name: 'talentAgri'},
                          {label: 'ICT', name: 'talentIct'},
                          {label: 'Aesthetic', name: 'talentAesthetic'},
                          {label: 'Media & Announcing', name: 'talentMedia'},
                          {label: 'Sport & Athletic', name: 'talentSport'},
                          {label: 'Innovation', name: 'talentInnovation'},
                          {label: 'Cinematography', name: 'talentCinematography'}
                        ].map((t) => (
                          <label key={t.name} className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-primary transition-all text-left">
                            <input 
                              type="checkbox" 
                              name={t.name}
                              checked={!!formData[t.name]}
                              onChange={(e) => setFormData((prev: any) => ({ ...prev, [t.name]: e.target.checked }))}
                              className="w-3.5 h-3.5 text-primary rounded border-slate-300 focus:ring-primary"
                            />
                            <span className="text-[11px] font-black text-black">{t.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <TextAreaField label="Permanent Address" name="addressPermanent" value={formData.addressPermanent || ''} onChange={handleChange} placeholder="Street, City, Postal Code" />
                      <TextAreaField label="Temporary Address" name="addressTemporary" value={formData.addressTemporary || ''} onChange={handleChange} placeholder="Address details..." />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      <FormField label="Emergency Contact" name="contactEmergency" value={formData.contactEmergency || ''} onChange={handleChange} placeholder="Contact No" />
                      <FormField label="Whatsapp No" name="contactWhatsapp" value={formData.contactWhatsapp || ''} onChange={handleChange} placeholder="Whatsapp No" />
                      <FormField label="Home No" name="contactHome" value={formData.contactHome || ''} onChange={handleChange} placeholder="Home Line" />
                      <FormField label="Mobile No" name="contactMobile" value={formData.contactMobile || ''} onChange={handleChange} placeholder="Mobile Line" />
                      <FormField label="Email Address" name="contactEmail" type="email" value={formData.contactEmail || ''} onChange={handleChange} placeholder="name@email.com" />
                      <FormField label="Distance to School" name="distanceToSchool" value={formData.distanceToSchool || ''} onChange={handleChange} placeholder="e.g. 2 km" />
                    </div>
                  </div>
                )}

                {activeTab === 'exams' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Grade 05 Exam Result" name="resultGrade05" value={formData.resultGrade05 || ''} onChange={handleChange} placeholder="Grade 5 Scholarship Score" />
                      <FormField label="GCE OL Exam Result" name="resultGceOl" value={formData.resultGceOl || ''} onChange={handleChange} placeholder="O/L Summary, e.g. 9As" />
                    </div>
                  </div>
                )}

                {activeTab === 'visibility' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-6 justify-start w-fit">
                      <span className="text-[10px] font-black text-black uppercase tracking-widest">Profile Visibility Status</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="isActive" 
                          value="true" 
                          checked={formData.isActive === true || formData.isActive === 'true'} 
                          onChange={() => setFormData((prev: any) => ({ ...prev, isActive: true }))}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" 
                        />
                        <span className="text-xs font-black text-emerald-700">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="isActive" 
                          value="false" 
                          checked={formData.isActive === false || formData.isActive === 'false'} 
                          onChange={() => setFormData((prev: any) => ({ ...prev, isActive: false }))}
                          className="w-4 h-4 text-rose-600 focus:ring-rose-500" 
                        />
                        <span className="text-xs font-black text-rose-700">Inactive</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Save details button */}
                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <Button 
                    type="submit" 
                    className="h-10 px-6 rounded-lg bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest shadow-md active:scale-95 transition-all text-xs" 
                    isLoading={isSubmitting}
                  >
                    <Save size={14} className="mr-1.5" />
                    Save Details
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}

function FormField({ label, name, value, onChange, disabled, type = 'text', placeholder }: any) {
  return (
    <div className="space-y-1 text-left">
      <label className="text-[9px] font-black text-black uppercase tracking-[0.12em] ml-1">{label}</label>
      <Input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="h-8 rounded-lg border-slate-200 bg-slate-50 focus:bg-white text-black font-bold text-xs" 
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, disabled, options }: any) {
  return (
    <div className="space-y-1 text-left">
      <label className="text-[9px] font-black text-black uppercase tracking-[0.12em] ml-1">{label}</label>
      <select 
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg px-2 focus:outline-none focus:bg-white transition-all text-xs font-bold text-black cursor-pointer"
      >
        <option value="">Choose Options</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, disabled, placeholder }: any) {
  return (
    <div className="space-y-1 text-left">
      <label className="text-[9px] font-black text-black uppercase tracking-[0.12em] ml-1">{label}</label>
      <textarea 
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        rows={2}
        className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none transition-all text-xs font-bold text-black custom-scrollbar resize-none"
      />
    </div>
  );
}
