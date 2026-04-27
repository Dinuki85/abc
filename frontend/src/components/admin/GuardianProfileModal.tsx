"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, Save, User, MapPin, Briefcase, Info, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Guardian } from '@/lib/api';

interface GuardianProfileModalProps {
  guardian: Guardian;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Guardian) => void;
}

export default function GuardianProfileModal({ guardian, isOpen, onClose, onSave }: GuardianProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'occupation' | 'contact'>('basic');
  const [formData, setFormData] = useState<any>(guardian || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Parse additionalData if it exists
    let data = { ...guardian };
    if ((guardian as any)?.additionalData) {
      try {
        const extra = JSON.parse((guardian as any).additionalData);
        data = { ...data, ...extra };
      } catch (e) {
        console.error("Failed to parse additionalData", e);
      }
    }
    setFormData(data || {});
  }, [guardian]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Package all extra fields into additionalData before saving
    const baseKeys = ['id', 'fullName', 'nameWithInitials', 'dob', 'nic', 'gender', 'religion', 'district', 'address', 'designation', 'homePhone', 'mobilePhone', 'personalEmail'];
    
    const extraData: any = {};
    for (const key in formData) {
      if (!baseKeys.includes(key)) {
        extraData[key] = formData[key];
      }
    }

    const payload = {
      ...formData,
      additionalData: JSON.stringify(extraData)
    };

    try {
      await onSave(payload);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', name: 'Tab 1 - Basic Information', icon: User },
    { id: 'occupation', name: 'Tab 2 - Occupation', icon: Briefcase },
    { id: 'contact', name: 'Tab 3 - Contact Information', icon: MapPin },
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
      <div className="flex min-h-full items-center justify-center">
        <div className="bg-white rounded-[3rem] w-full max-w-6xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col h-[80vh]">
          
          {/* Modal Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/30 flex-shrink-0">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-pink-500 text-white flex items-center justify-center shadow-xl shadow-pink-500/20">
                <Heart size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 font-handlee flex items-center gap-4">
                  Guardian Registration <span className="text-rose-500 text-sm italic">New</span>
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-3 py-1 bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-pink-100">
                    {formData.nic || 'Pending NIC'}
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
                      ? 'bg-pink-500 text-white shadow-xl shadow-pink-500/30' 
                      : 'text-slate-500 hover:bg-white hover:text-pink-500 hover:shadow-sm border border-transparent'
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
              <form id="guardian-profile-form" onSubmit={handleSave} className="space-y-10 max-w-4xl">
                
                {activeTab === 'basic' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Basic Information" icon={User} color="pink" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <Field label="Full Name" name="fullName" value={formData.fullName || ''} onChange={handleChange} />
                      <Field label="Name in sinhala as birth certificate" name="nameInSinhala" value={formData.nameInSinhala || ''} onChange={handleChange} />
                      <Field label="Name with Initial" name="nameWithInitials" value={formData.nameWithInitials || ''} onChange={handleChange} />
                      <Field label="Name with Initial Sinhala" name="nameWithInitialsSinhala" value={formData.nameWithInitialsSinhala || ''} onChange={handleChange} />
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
                      <Field label="Age - Auto Calculate" name="age" type="number" value={formData.age || ''} onChange={handleChange} disabled placeholder="Auto-calculated" />
                      <SelectField 
                        label="Civil State" 
                        name="civilState" 
                        value={formData.civilState || ''} 
                        onChange={handleChange} 
                        options={[
                          {label: 'Single', value: 'Single'}, 
                          {label: 'Married', value: 'Married'},
                          {label: 'Widowed', value: 'Widowed'},
                          {label: 'Separate', value: 'Separate'},
                          {label: 'Divorce', value: 'Divorce'}
                        ]} 
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'occupation' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Occupation Details" icon={Briefcase} color="amber" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <TextAreaField label="Working Address" name="workingAddress" value={formData.workingAddress || ''} onChange={handleChange} />
                      <TextAreaField label="Tempory Address" name="temporaryWorkingAddress" value={formData.temporaryWorkingAddress || ''} onChange={handleChange} />
                      <Field label="Office Contact No" name="officeContact" value={formData.officeContact || ''} onChange={handleChange} />
                      <Field label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact || ''} onChange={handleChange} />
                      <Field label="Emergency Email" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
                      <Field label="Working Company" name="workingCompany" value={formData.workingCompany || ''} onChange={handleChange} />
                      <Field label="Designation" name="designation" value={formData.designation || ''} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Contact Information" icon={MapPin} color="indigo" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <TextAreaField label="Permanent Address" name="address" value={formData.address || ''} onChange={handleChange} />
                      <TextAreaField label="Tempory Address" name="temporaryAddress" value={formData.temporaryAddress || ''} onChange={handleChange} />
                      <Field label="Emergency Contact No" name="emergencyContactPersonal" value={formData.emergencyContactPersonal || ''} onChange={handleChange} />
                      <Field label="Whatsapp No" name="whatsappNo" value={formData.whatsappNo || ''} onChange={handleChange} />
                      <Field label="Home No" name="homePhone" value={formData.homePhone || ''} onChange={handleChange} />
                      <Field label="Mobile No" name="mobilePhone" value={formData.mobilePhone || ''} onChange={handleChange} />
                      <Field label="Email" name="personalEmail" type="email" value={formData.personalEmail || ''} onChange={handleChange} />
                      <Field label="Distance to school" name="distanceToSchool" value={formData.distanceToSchool || ''} onChange={handleChange} />
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

function SectionHeader({ title, icon: Icon, color = "indigo" }: { title: string, icon: any, color?: string }) {
  const colorMap: Record<string, string> = {
    pink: 'bg-pink-100 text-pink-600',
    amber: 'bg-amber-100 text-amber-600',
    indigo: 'bg-indigo-100 text-indigo-600',
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
