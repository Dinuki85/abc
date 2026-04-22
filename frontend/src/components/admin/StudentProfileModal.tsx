"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, User, Home, Users, BookOpen, ShieldCheck, HeartPulse, MapPin, Phone, GraduationCap, Calendar, Briefcase, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api, StudentProfile } from '@/lib/api';

interface StudentProfileModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: StudentProfile) => void;
}

export default function StudentProfileModal({ student, isOpen, onClose, onSave }: StudentProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'family' | 'contact' | 'institutional'>('general');
  const [formData, setFormData] = useState<StudentProfile>(student);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    { id: 'general', name: 'General Details', icon: User },
    { id: 'family', name: 'Family Info', icon: Users },
    { id: 'contact', name: 'Contact & Address', icon: Home },
    { id: 'institutional', name: 'Institutional', icon: ShieldCheck },
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
      <div className="flex min-h-full items-center justify-center">
        <div className="bg-white rounded-[3rem] w-full max-w-5xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500">
          {/* Modal Header */}
          <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-slate-50/30">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30">
                <GraduationCap size={40} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-800 font-handlee">
                  Student Profile Registry
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    {formData.username}
                  </span>
                  <span className="text-slate-400 font-medium text-sm">
                    {formData.fullName || 'New Profile Creation'}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all border border-gray-100 shadow-sm">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row h-[700px]">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-72 bg-slate-50/50 border-r border-gray-100 p-6 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm tracking-tight ${
                    activeTab === tab.id 
                      ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                      : 'text-slate-500 hover:bg-white hover:text-primary hover:shadow-sm'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.name}
                </button>
              ))}
              
              <div className="pt-10 px-4">
                <div className="p-5 bg-secondary/5 rounded-3xl border border-secondary/10">
                  <div className="flex items-center gap-2 text-secondary-hover mb-2">
                    <Info size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Audit Info</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Changes to institutional data are logged and require administrative verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-white p-10 custom-scrollbar">
              <form onSubmit={handleSave} className="space-y-10">
                {activeTab === 'general' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Basic Identification" icon={User} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Field label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per Birth Certificate" />
                      <Field label="Name with Initials" name="nameWithInitials" value={formData.nameWithInitials} onChange={handleChange} placeholder="e.g. A.B.C. Perera" />
                      <Field label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                      <SelectField 
                        label="Gender" 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        options={[{label: 'Male', value: 'MALE'}, {label: 'Female', value: 'FEMALE'}]} 
                      />
                      <SelectField 
                        label="Religion" 
                        name="religion" 
                        value={formData.religion} 
                        onChange={handleChange} 
                        options={[
                          {label: 'Buddhist', value: 'BUDDHIST'}, 
                          {label: 'Christian', value: 'CHRISTIAN'},
                          {label: 'Hindu', value: 'HINDU'},
                          {label: 'Islam', value: 'ISLAM'}
                        ]} 
                      />
                      <Field label="Race / Ethnicity" name="race" value={formData.race} onChange={handleChange} placeholder="e.g. Sinhalese" />
                      <Field label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="e.g. Sri Lankan" />
                      <Field label="Birth Certificate No." name="birthCertificateNumber" value={formData.birthCertificateNumber} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'family' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-8">
                      <SectionHeader title="Father's Details" icon={Users} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Field label="Full Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                        <Field label="NIC Number" name="fatherNic" value={formData.fatherNic} onChange={handleChange} />
                        <Field label="Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
                        <Field label="Contact Number" name="fatherContact" value={formData.fatherContact} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-8">
                      <SectionHeader title="Mother's Details" icon={Users} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Field label="Full Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                        <Field label="NIC Number" name="motherNic" value={formData.motherNic} onChange={handleChange} />
                        <Field label="Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
                        <Field label="Contact Number" name="motherContact" value={formData.motherContact} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-8">
                      <SectionHeader title="Guardian Details (If Applicable)" icon={ShieldCheck} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Field label="Guardian Name" name="guardianName" value={formData.guardianName} onChange={handleChange} />
                        <Field label="Relation to Student" name="guardianRelation" value={formData.guardianRelation} onChange={handleChange} />
                        <Field label="Guardian Contact" name="guardianContact" value={formData.guardianContact} onChange={handleChange} />
                        <Field label="Guardian Occupation" name="guardianOccupation" value={formData.guardianOccupation} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Address & Communication" icon={MapPin} />
                    <div className="grid grid-cols-1 gap-8">
                      <TextAreaField label="Permanent Address" name="address" value={formData.address} onChange={handleChange} />
                      <TextAreaField label="Mailing Address" name="mailingAddress" value={formData.mailingAddress} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <Field label="Home Phone" name="contactHome" value={formData.contactHome} onChange={handleChange} />
                      <Field label="Mobile Phone" name="contactMobile" value={formData.contactMobile} onChange={handleChange} />
                      <Field label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'institutional' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Institutional Metadata" icon={BookOpen} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Field label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} />
                      <Field label="Distance to School (km)" name="distanceToSchool" value={formData.distanceToSchool} onChange={handleChange} />
                      <Field label="Mode of Transport" name="transportMode" value={formData.transportMode} onChange={handleChange} />
                      <SelectField 
                        label="Blood Group" 
                        name="bloodGroup" 
                        value={formData.bloodGroup} 
                        onChange={handleChange} 
                        options={[
                          {label: 'A+', value: 'A+'}, {label: 'A-', value: 'A-'},
                          {label: 'B+', value: 'B+'}, {label: 'B-', value: 'B-'},
                          {label: 'O+', value: 'O+'}, {label: 'O-', value: 'O-'},
                          {label: 'AB+', value: 'AB+'}, {label: 'AB-', value: 'AB-'}
                        ]} 
                      />
                    </div>
                    <TextAreaField label="Medical History / Allergies" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />
                  </div>
                )}

                <div className="pt-10 border-t border-gray-100 flex justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={onClose} className="h-14 px-10 rounded-2xl font-bold">
                    Cancel Changes
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold shadow-2xl shadow-primary/30 flex items-center gap-3"
                    isLoading={isSaving}
                  >
                    <Save size={20} />
                    Save Full Profile
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon: Icon }: { title: string, icon: any }) {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
      <div className="p-3 bg-primary/5 text-primary rounded-xl">
        <Icon size={24} />
      </div>
      <h4 className="text-xl font-bold text-slate-800 tracking-tight font-handlee">{title}</h4>
    </div>
  );
}

function Field({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
      <Input 
        {...props} 
        className="h-14 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner font-bold text-slate-700" 
      />
    </div>
  );
}

function TextAreaField({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
      <textarea 
        {...props} 
        rows={3}
        className="w-full p-4 rounded-2xl border border-gray-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-inner font-bold text-slate-700 text-sm"
      />
    </div>
  );
}

function SelectField({ label, options, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
      <select 
        {...props} 
        className="w-full h-14 bg-slate-50/50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-bold text-slate-700 shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
      >
        <option value="">Select {label}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
