"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, Save, User, HeartPulse, MapPin, Briefcase, 
  GraduationCap, Users, Info, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Teacher } from '@/lib/api';

interface StaffProfileModalProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Teacher) => void;
}

export default function StaffProfileModal({ teacher, isOpen, onClose, onSave }: StaffProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'health' | 'service' | 'contact' | 'qualification' | 'family'>('basic');
  const [formData, setFormData] = useState<any>(teacher);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Parse additionalData if it exists
    let data = { ...teacher };
    if ((teacher as any).additionalData) {
      try {
        const extra = JSON.parse((teacher as any).additionalData);
        data = { ...data, ...extra };
      } catch (e) {
        console.error("Failed to parse additionalData", e);
      }
    }
    setFormData(data);
  }, [teacher]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (category: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [field]: value
      }
    }));
  };

  const handleEducationChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      qualifications: {
        ...(prev.qualifications || {}),
        education: {
          ...(prev.qualifications?.education || {}),
          [field]: value
        }
      }
    }));
  };

  const handleOtherQualificationChange = (index: number, value: string) => {
    setFormData((prev: any) => {
      const others = prev.qualifications?.others ? [...prev.qualifications.others] : ['', '', '', '', ''];
      others[index] = value;
      return {
        ...prev,
        qualifications: {
          ...(prev.qualifications || {}),
          others
        }
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Package all extra fields into additionalData before saving
    const baseKeys = ['id', 'username', 'fullName', 'nameWithInitials', 'dob', 'nic', 'gender', 'religion', 'nationality', 'address', 'bloodGroup', 'medicalHistory', 'designation', 'contactHome', 'contactMobile', 'email', 'joinedDate', 'subjects', 'qualifications'];
    
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
    { id: 'health', name: 'Tab 2 - Health', icon: HeartPulse },
    { id: 'service', name: 'Tab 3 - Service History', icon: Briefcase },
    { id: 'contact', name: 'Tab 4 - Contact Information', icon: MapPin },
    { id: 'qualification', name: 'Tab 5 - Qualification', icon: GraduationCap },
    { id: 'family', name: 'Tab 6 - Spouse & Children', icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
      <div className="flex min-h-full items-center justify-center">
        <div className="bg-white rounded-[3rem] w-full max-w-6xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col h-[85vh]">
          
          {/* Modal Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/30 flex-shrink-0">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-500/20">
                <Briefcase size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 font-handlee flex items-center gap-4">
                  Staff Registration <span className="text-rose-500 text-sm italic">New</span>
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-indigo-100">
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
                      ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/30' 
                      : 'text-slate-500 hover:bg-white hover:text-indigo-500 hover:shadow-sm border border-transparent'
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
              <form id="staff-profile-form" onSubmit={handleSave} className="space-y-10 max-w-4xl">
                
                {activeTab === 'basic' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Basic Information" icon={User} color="indigo" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <Field label="Teacher ID - Auto" name="username" value={formData.username || ''} onChange={handleChange} disabled />
                      <Field label="Full Name" name="fullName" value={formData.fullName || ''} onChange={handleChange} />
                      <Field label="Name in Sinhala as birth certificate" name="nameInSinhala" value={formData.nameInSinhala || ''} onChange={handleChange} />
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
                      <Field label="Mother Name" name="motherName" value={formData.motherName || ''} onChange={handleChange} />
                      <Field label="Father Name" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} />
                      <Field label="Guardian ID" name="guardianId" value={formData.guardianId || ''} onChange={handleChange} />
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
                      <Field label="Long term diseases" name="longTermDiseases" value={formData.longTermDiseases || ''} onChange={handleChange} />
                    </div>
                    <TextAreaField label="Description" name="medicalDescription" value={formData.medicalDescription || ''} onChange={handleChange} />
                  </div>
                )}

                {activeTab === 'service' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Service History" icon={Briefcase} color="amber" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <Field label="1st Appointment Date" name="firstAppointmentDate" type="date" value={formData.firstAppointmentDate || ''} onChange={handleChange} />
                      <Field label="1st Appointment District" name="firstAppointmentDistrict" value={formData.firstAppointmentDistrict || ''} onChange={handleChange} />
                      <Field label="1st Appointment Institute" name="firstAppointmentInstitute" value={formData.firstAppointmentInstitute || ''} onChange={handleChange} />
                      
                      <SelectField 
                        label="Hrachy Carder (Combo Box)" 
                        name="hrachyCarder" 
                        value={formData.hrachyCarder || ''} 
                        onChange={handleChange} 
                        options={[
                          {label: 'Academic', value: 'Academic'},
                          {label: 'Non Academic', value: 'Non Academic'},
                          {label: 'DO', value: 'DO'},
                          {label: 'Coaches', value: 'Coaches'},
                          {label: 'Volunteers', value: 'Volunteers'}
                        ]} 
                      />
                      
                      <Field label="Position" name="position" value={formData.position || ''} onChange={handleChange} />
                      <Field label="Increment Date" name="incrementDate" type="date" value={formData.incrementDate || ''} onChange={handleChange} />
                      <Field label="Service Period" name="servicePeriod" value={formData.servicePeriod || ''} onChange={handleChange} />
                      <Field label="Salary Code (As per Pay sheet)" name="salaryCode" value={formData.salaryCode || ''} onChange={handleChange} />
                      
                      <SelectField 
                        label="Holding Position at school" 
                        name="holdingPosition" 
                        value={formData.holdingPosition || ''} 
                        onChange={handleChange} 
                        options={[
                          {label: 'Principle', value: 'Principle'},
                          {label: 'Vise Principle', value: 'Vise Principle'},
                          {label: 'Asistant Principle', value: 'Asistant Principle'},
                          {label: 'Section Head', value: 'Section Head'},
                          {label: 'Sector Head', value: 'Sector Head'},
                          {label: 'Class Teacher', value: 'Class Teacher'}
                        ]} 
                      />
                      
                      <Field label="Grade" name="gradeName" value={formData.gradeName || ''} onChange={handleChange} />
                      <Field label="Apoinment Mediam" name="appointmentMedium" value={formData.appointmentMedium || ''} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Contact Information" icon={MapPin} color="indigo" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <TextAreaField label="Permanent Address" name="address" value={formData.address || ''} onChange={handleChange} />
                      <TextAreaField label="Tempory Address" name="temporaryAddress" value={formData.temporaryAddress || ''} onChange={handleChange} />
                      <Field label="Emergency Contact No" name="emergencyContact" value={formData.emergencyContact || ''} onChange={handleChange} />
                      <Field label="Whatsapp No" name="whatsappNo" value={formData.whatsappNo || ''} onChange={handleChange} />
                      <Field label="Home No" name="contactHome" value={formData.contactHome || ''} onChange={handleChange} />
                      <Field label="Mobile No" name="contactMobile" value={formData.contactMobile || ''} onChange={handleChange} />
                      <Field label="Email" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
                      <Field label="Distance to school" name="distanceToSchool" value={formData.distanceToSchool || ''} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'qualification' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Qualification" icon={GraduationCap} color="emerald" />
                    
                    <div className="space-y-6">
                       <h4 className="text-sm font-bold text-rose-500">Education</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-2 border-rose-100">
                         <Field label="GCE OL" value={formData.qualifications?.education?.ol || ''} onChange={(e:any) => handleEducationChange('ol', e.target.value)} />
                         <Field label="GCE AL" value={formData.qualifications?.education?.al || ''} onChange={(e:any) => handleEducationChange('al', e.target.value)} />
                         <Field label="Diploma" value={formData.qualifications?.education?.diploma || ''} onChange={(e:any) => handleEducationChange('diploma', e.target.value)} />
                         <Field label="Degree" value={formData.qualifications?.education?.degree || ''} onChange={(e:any) => handleEducationChange('degree', e.target.value)} />
                         <Field label="Post Gradguate" value={formData.qualifications?.education?.postGrad || ''} onChange={(e:any) => handleEducationChange('postGrad', e.target.value)} />
                         <Field label="Master" value={formData.qualifications?.education?.master || ''} onChange={(e:any) => handleEducationChange('master', e.target.value)} />
                         <Field label="PHD" value={formData.qualifications?.education?.phd || ''} onChange={(e:any) => handleEducationChange('phd', e.target.value)} />
                       </div>
                    </div>

                    <div className="space-y-6 pt-6">
                       <h4 className="text-sm font-bold text-rose-500">Other</h4>
                       <div className="grid grid-cols-1 gap-4 pl-4 border-l-2 border-rose-100">
                         {[0, 1, 2, 3, 4].map((i) => (
                           <Field key={i} label={`${i + 1}`} value={formData.qualifications?.others?.[i] || ''} onChange={(e:any) => handleOtherQualificationChange(i, e.target.value)} />
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'family' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <SectionHeader title="Spouse & Children" icon={Users} color="slate" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <Field label="Spouse Name" value={formData.spouse?.name || ''} onChange={(e:any) => handleNestedChange('spouse', 'name', e.target.value)} />
                      <Field label="Designation" value={formData.spouse?.designation || ''} onChange={(e:any) => handleNestedChange('spouse', 'designation', e.target.value)} />
                      <TextAreaField label="Working Address" value={formData.spouse?.workingAddress || ''} onChange={(e:any) => handleNestedChange('spouse', 'workingAddress', e.target.value)} />
                      <TextAreaField label="Tempory Address" value={formData.spouse?.temporaryAddress || ''} onChange={(e:any) => handleNestedChange('spouse', 'temporaryAddress', e.target.value)} />
                      <Field label="Office Contact No" value={formData.spouse?.officeContact || ''} onChange={(e:any) => handleNestedChange('spouse', 'officeContact', e.target.value)} />
                      <Field label="Emergency Contact" value={formData.spouse?.emergencyContact || ''} onChange={(e:any) => handleNestedChange('spouse', 'emergencyContact', e.target.value)} />
                      <Field label="Emergency Email" type="email" value={formData.spouse?.email || ''} onChange={(e:any) => handleNestedChange('spouse', 'email', e.target.value)} />
                      <Field label="Working Company" value={formData.spouse?.workingCompany || ''} onChange={(e:any) => handleNestedChange('spouse', 'workingCompany', e.target.value)} />
                    </div>

                    <div className="space-y-4 pt-6">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Children Name</h4>
                       <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                         <div className="grid grid-cols-2 gap-4 mb-4">
                           <span className="text-xs font-bold text-slate-600">Child Name</span>
                           <span className="text-xs font-bold text-slate-600">Age</span>
                         </div>
                         <div className="space-y-3">
                           {[0, 1, 2].map((i) => (
                             <div key={i} className="grid grid-cols-2 gap-4">
                               <Input 
                                 placeholder="Name" 
                                 value={formData.children?.[i]?.name || ''} 
                                 onChange={(e) => {
                                   const children = formData.children ? [...formData.children] : [{}, {}, {}];
                                   children[i] = { ...children[i], name: e.target.value };
                                   setFormData({...formData, children});
                                 }}
                                 className="h-10 bg-white border-gray-200" 
                               />
                               <Input 
                                 placeholder="Age" 
                                 type="number"
                                 value={formData.children?.[i]?.age || ''} 
                                 onChange={(e) => {
                                   const children = formData.children ? [...formData.children] : [{}, {}, {}];
                                   children[i] = { ...children[i], age: parseInt(e.target.value) || 0 };
                                   setFormData({...formData, children});
                                 }}
                                 className="h-10 bg-white border-gray-200" 
                               />
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
          
          {/* Footer Save Area */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-slate-50/50 flex-shrink-0">
             <Button type="button" variant="ghost" onClick={onClose} className="h-12 px-8 rounded-xl font-bold text-slate-500 hover:text-slate-700">
               Cancel
             </Button>
             <Button 
               type="submit" 
               form="staff-profile-form"
               className="h-12 px-12 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-500/30 flex items-center gap-2"
               isLoading={isSaving}
             >
               <Save size={18} />
               Save Profile
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon: Icon, color = "indigo" }: { title: string, icon: any, color?: string }) {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-100 text-indigo-600',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-600',
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
        className="h-12 rounded-xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner font-bold text-slate-700 text-sm" 
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
        className="w-full p-4 rounded-xl border border-gray-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner font-bold text-slate-700 text-sm custom-scrollbar"
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
        className="w-full h-12 bg-slate-50/50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat"
      >
        <option value="">Select {label}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
