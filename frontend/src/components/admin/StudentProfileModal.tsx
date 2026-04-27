"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, Save, User, HeartPulse, Star, MapPin, 
  FileCheck, Eye, Info, GraduationCap, ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StudentProfile } from '@/lib/api';

interface StudentProfileModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: StudentProfile) => void;
}

export default function StudentProfileModal({ student, isOpen, onClose, onSave }: StudentProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'health' | 'skills' | 'contact' | 'exams' | 'verification' | 'visibility'>('basic');
  const [formData, setFormData] = useState<any>(student);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Parse additionalData if it exists
    let data = { ...student };
    if (student.additionalData) {
      try {
        const extra = JSON.parse(student.additionalData);
        data = { ...data, ...extra };
      } catch (e) {
        console.error("Failed to parse additionalData", e);
      }
    }
    setFormData(data);
  }, [student]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: any) => {
        const talents = prev.talents || [];
        if (checked) {
          return { ...prev, talents: [...talents, name] };
        } else {
          return { ...prev, talents: talents.filter((t: string) => t !== name) };
        }
      });
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleAchievementChange = (level: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      achievements: {
        ...(prev.achievements || {}),
        [level]: value
      }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', name: 'Tab 1 - Basic Information', icon: User },
    { id: 'health', name: 'Tab 2 - Health', icon: HeartPulse },
    { id: 'skills', name: 'Tab 3 - Skills', icon: Star },
    { id: 'contact', name: 'Tab 4 - Contact Information', icon: MapPin },
    { id: 'exams', name: 'Tab 5 - Exam Result', icon: FileCheck },
    { id: 'verification', name: 'Tab 6 - Verification Audit', icon: ShieldCheck },
    { id: 'visibility', name: 'Tab 7 - Visibility', icon: Eye },
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
      <div className="flex min-h-full items-center justify-center">
        <div className="bg-white rounded-[3rem] w-full max-w-6xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col h-[85vh]">
          
          {/* Modal Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/30 flex-shrink-0">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 font-handlee flex items-center gap-4">
                  Student Registration <span className="text-rose-500 text-sm italic">New</span>
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    {formData.username || 'Pending ID'}
                  </span>
                  <span className="text-slate-400 font-medium text-sm">
                    {formData.fullName || 'New Profile Creation'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative">
                 <Input className="h-12 w-64 rounded-xl border-gray-200" placeholder=": Search" />
               </div>
               <span className="text-emerald-500 font-bold text-sm">All List</span>
               <button onClick={onClose} className="w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all border border-gray-100 shadow-sm ml-4">
                 <X size={24} />
               </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-72 bg-slate-50/50 border-r border-gray-100 p-6 space-y-2 overflow-y-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-wider ${
                    activeTab === tab.id 
                      ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                      : 'text-slate-500 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.name}
                </button>
              ))}
              
              <div className="pt-10 px-4">
                <div className="p-5 bg-secondary/5 rounded-3xl border border-secondary/10">
                  <div className="flex items-center gap-2 text-secondary-hover mb-2">
                    <Info size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">System Info</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Data structure aligned with AMV institutional XLSX standard.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-white p-10 custom-scrollbar">
              <form id="student-profile-form" onSubmit={handleSave} className="space-y-10 max-w-4xl">
                
                {activeTab === 'basic' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Basic Information" icon={User} color="primary" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <Field label="Index No" name="username" value={formData.username || ''} onChange={handleChange} disabled />
                      <Field label="Full Name" name="fullName" value={formData.fullName || ''} onChange={handleChange} />
                      <Field label="Name in Sinhala as birth certificate" name="nameSinhala" value={formData.nameSinhala || ''} onChange={handleChange} />
                      <Field label="Name with Initial" name="nameWithInitials" value={formData.nameWithInitials || ''} onChange={handleChange} />
                      <Field label="Name with Initial Sinhala" name="nameWithInitialSinhala" value={formData.nameWithInitialSinhala || ''} onChange={handleChange} />
                      <Field label="Date Of Birth" name="dob" type="date" value={formData.dob || ''} onChange={handleChange} />
                      <Field label="NIC" name="nic" value={formData.nic || ''} onChange={handleChange} />
                      <Field label="Birth Certificate No" name="birthCertificateNumber" value={formData.birthCertificateNumber || ''} onChange={handleChange} />
                      <Field label="District" name="district" value={formData.district || ''} onChange={handleChange} />
                      <Field label="Religion" name="religion" value={formData.religion || ''} onChange={handleChange} />
                      <SelectField 
                        label="Gender" 
                        name="gender" 
                        value={formData.gender || ''} 
                        onChange={handleChange} 
                        options={[{label: 'Male', value: 'MALE'}, {label: 'Female', value: 'FEMALE'}]} 
                      />
                      <Field label="Mother Name" name="motherName" value={formData.motherName || ''} onChange={handleChange} />
                      <Field label="Father Name" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} />
                      <Field label="Guardian ID" name="guardianIdRef" value={formData.guardianIdRef || ''} onChange={handleChange} />
                      <Field label="Age - Auto Calculate" name="age" type="number" value={formData.age || ''} onChange={handleChange} disabled placeholder="Auto-calculated" />
                      <Field label="Inter School House" name="interSchoolHouse" value={formData.interSchoolHouse || ''} onChange={handleChange} />
                      <Field label="Siblings" name="siblings" type="number" value={formData.siblings || ''} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'health' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Health Details" icon={HeartPulse} color="rose" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <Field label="Height" name="height" value={formData.height || ''} onChange={handleChange} />
                      <Field label="Weight" name="weight" value={formData.weight || ''} onChange={handleChange} />
                      <SelectField 
                        label="Blood type" 
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
                      <Field label="Special physical condition" name="specialPhysicalCondition" value={formData.specialPhysicalCondition || ''} onChange={handleChange} />
                      <Field label="Special Illness" name="specialIllness" value={formData.specialIllness || ''} onChange={handleChange} />
                      <Field label="Long term diseases" name="longTermDiseases" value={formData.longTermDiseases || ''} onChange={handleChange} />
                      <Field label="Special need" name="specialNeed" value={formData.specialNeed || ''} onChange={handleChange} />
                    </div>
                    <TextAreaField label="Description" name="medicalDescription" value={formData.medicalDescription || ''} onChange={handleChange} />
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Achievements & Skills" icon={Star} color="amber" />
                    
                    <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 space-y-6">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-amber-700">Achievements (3" Combo Box)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {id: 'international', name: 'achievementInternational'},
                          {id: 'national', name: 'achievementNational'},
                          {id: 'provincial', name: 'achievementProvincial'},
                          {id: 'zonal', name: 'achievementZonal'},
                          {id: 'divisional', name: 'achievementDivisional'},
                          {id: 'school', name: 'achievementSchool'}
                        ].map((level) => (
                          <div key={level.id} className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{level.id} Level</label>
                             <select 
                               name={level.name}
                               value={formData[level.name] || ''}
                               onChange={handleChange}
                               className="w-full h-12 bg-white border border-amber-200 rounded-xl px-4 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold text-slate-700"
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
                      <TextAreaField label="Description * 3" name="talentDescription" value={formData.talentDescription || ''} onChange={handleChange} />
                    </div>

                    <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-4">Additional Talent Areas (Check Box)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          {label: 'Agree culture', name: 'talentAgri'},
                          {label: 'ICT', name: 'talentIct'},
                          {label: 'Aesthetic', name: 'talentAesthetic'},
                          {label: 'Media & Announcing', name: 'talentMedia'},
                          {label: 'Sport & Athletic', name: 'talentSport'},
                          {label: 'Innovation', name: 'talentInnovation'},
                          {label: 'Cinematography', name: 'talentCinematography'}
                        ].map((talent) => (
                          <label key={talent.name} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-primary transition-all">
                            <input 
                              type="checkbox" 
                              name={talent.name}
                              checked={formData[talent.name] === 'true' || formData[talent.name] === true}
                              onChange={(e) => setFormData((prev:any) => ({...prev, [talent.name]: e.target.checked}))}
                              className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                            />
                            <span className="text-xs font-bold text-slate-600">{talent.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Contact Information" icon={MapPin} color="indigo" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <TextAreaField label="Permanent Address" name="addressPermanent" value={formData.addressPermanent || ''} onChange={handleChange} />
                      <TextAreaField label="Temporary Address" name="addressTemporary" value={formData.addressTemporary || ''} onChange={handleChange} />
                      <Field label="Emergency Contact No" name="contactEmergency" value={formData.contactEmergency || ''} onChange={handleChange} />
                      <Field label="Whatsapp No" name="contactWhatsapp" value={formData.contactWhatsapp || ''} onChange={handleChange} />
                      <Field label="Home No" name="contactHome" value={formData.contactHome || ''} onChange={handleChange} />
                      <Field label="Mobile No" name="contactMobile" value={formData.contactMobile || ''} onChange={handleChange} />
                      <Field label="Email" name="contactEmail" type="email" value={formData.contactEmail || ''} onChange={handleChange} />
                      <Field label="Distance to school" name="distanceToSchool" value={formData.distanceToSchool || ''} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'exams' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Exam Results" icon={FileCheck} color="emerald" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Field label="Grade 05" name="resultGrade05" value={formData.resultGrade05 || ''} onChange={handleChange} placeholder="Score / Result" />
                      <Field label="GCE OL" name="resultGceOl" value={formData.resultGceOl || ''} onChange={handleChange} placeholder="Summary of results" />
                    </div>
                  </div>
                )}

                {activeTab === 'verification' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Teacher Verification Audit" icon={ShieldCheck} color="emerald" />
                    <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</span>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            formData.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                            formData.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                            'bg-blue-100 text-primary border-blue-200'
                          }`}>
                            {formData.verificationStatus || 'PENDING'}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Audited By</span>
                           <span className="text-sm font-bold text-slate-700">{formData.verifiedByName || 'Class Teacher'}</span>
                           {formData.verifiedAt && (
                             <span className="text-[9px] text-slate-400 font-medium mt-0.5">{new Date(formData.verifiedAt).toLocaleString()}</span>
                           )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Teacher's Comment / Audit Note</label>
                        <div className="w-full p-6 bg-white border border-slate-200 rounded-2xl min-h-[120px] shadow-inner">
                          <p className="text-slate-600 font-bold italic leading-relaxed">
                            {formData.verificationComment ? `"${formData.verificationComment}"` : "No audit notes available yet."}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Profile Integrity</p>
                          <p className="text-sm font-bold text-slate-700">{formData.profileCompleted ? 'COMPLETED' : 'INCOMPLETE'}</p>
                        </div>
                        <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Audit Sync</p>
                          <p className="text-sm font-bold text-slate-700">Live DB Stream</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-amber-500 rounded-xl text-white">
                        <Info size={20} />
                      </div>
                      <div>
                        <h5 className="text-sm font-black text-amber-900 uppercase tracking-widest mb-1">Administrative Note</h5>
                        <p className="text-xs font-medium text-amber-800 leading-relaxed">
                          Verification is primarily handled by Class Teachers. Administrators can override status during exceptional cases by updating the base profile.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'visibility' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="System Visibility" icon={Eye} color="slate" />
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col gap-4">
                      <label className="flex items-center gap-4 cursor-pointer">
                        <input 
                          type="radio" 
                          name="isActive" 
                          value="true" 
                          checked={formData.isActive === true || formData.isActive === 'true'} 
                          onChange={(e) => setFormData((prev:any) => ({...prev, isActive: true}))}
                          className="w-5 h-5 text-emerald-500 focus:ring-emerald-500" 
                        />
                        <span className="text-sm font-bold text-emerald-700">Active</span>
                      </label>
                      <label className="flex items-center gap-4 cursor-pointer">
                        <input 
                          type="radio" 
                          name="isActive" 
                          value="false" 
                          checked={formData.isActive === false || formData.isActive === 'false'} 
                          onChange={(e) => setFormData((prev:any) => ({...prev, isActive: false}))}
                          className="w-5 h-5 text-rose-500 focus:ring-rose-500" 
                        />
                        <span className="text-sm font-bold text-rose-700">Inactive</span>
                      </label>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
          
          {/* Footer Area - Read Only View */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-slate-50/50 flex-shrink-0">
             <Button type="button" variant="ghost" onClick={onClose} className="h-12 px-8 rounded-xl font-bold text-slate-500 hover:text-slate-700">
               Close Profile
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon: Icon, color = "primary" }: { title: string, icon: any, color?: string }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    slate: 'bg-slate-200 text-slate-700',
  };

  return (
    <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <h4 className="text-xl font-bold text-slate-800 tracking-tight font-handlee">{title}</h4>
    </div>
  );
}

function Field({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{label}</label>
      <Input 
        {...props} 
        disabled
        readOnly
        className="h-12 rounded-xl border-gray-200 bg-slate-50/50 cursor-not-allowed font-bold text-slate-700 text-sm" 
      />
    </div>
  );
}

function TextAreaField({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{label}</label>
      <textarea 
        {...props} 
        rows={3}
        disabled
        readOnly
        className="w-full p-4 rounded-xl border border-gray-200 bg-slate-50/50 cursor-not-allowed focus:outline-none transition-all shadow-inner font-bold text-slate-700 text-sm custom-scrollbar"
      />
    </div>
  );
}

function SelectField({ label, options, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{label}</label>
      <select 
        {...props} 
        disabled
        className="w-full h-12 bg-slate-50/50 border border-gray-200 rounded-xl px-4 focus:outline-none transition-all text-sm font-bold text-slate-700 shadow-inner appearance-none cursor-not-allowed"
      >
        <option value="">{props.value || 'Not Set'}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
