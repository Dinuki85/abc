'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  User, 
  Heart, 
  Briefcase, 
  Phone, 
  GraduationCap, 
  Users, 
  Save, 
  ChevronRight,
  Info,
  Activity,
  History,
  Contact,
  Award,
  Baby
} from 'lucide-react';

interface StaffProfileFormProps {
  initialData: any;
  onSave: (data: any) => Promise<void>;
}

export default function StaffProfileForm({ initialData, onSave }: StaffProfileFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(initialData || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User, color: 'indigo' },
    { id: 'health', label: 'Health', icon: Heart, color: 'rose' },
    { id: 'service', label: 'Service History', icon: Briefcase, color: 'blue' },
    { id: 'contact', label: 'Contact', icon: Phone, color: 'emerald' },
    { id: 'quals', label: 'Qualifications', icon: GraduationCap, color: 'amber' },
    { id: 'spouse', label: 'Spouse & Children', icon: Users, color: 'purple' },
  ];

  const Field = ({ label, name, type = 'text', placeholder = '', options = null }: { label: string, name: string, type?: string, placeholder?: string, options?: string[] | null }) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      {options ? (
        <select 
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
        >
          <option value="">Select {label}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <Input 
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name] || ''}
          onChange={handleChange}
          className="h-12 font-bold rounded-xl bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20"
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 p-2 bg-slate-100 rounded-[2rem] sticky top-0 z-10 shadow-sm border border-white">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-[1.5rem] transition-all duration-300 font-bold text-xs uppercase tracking-widest ${
                isActive 
                  ? `bg-white text-${tab.color}-600 shadow-lg shadow-${tab.color}-100 border border-${tab.color}-100` 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {activeTab === 'basic' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Info size={20}/></div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Field label="Full Name" name="fullName" placeholder="As per documents" />
              <Field label="Name in Sinhala" name="nameSinhala" />
              <Field label="Name With Initials" name="nameWithInitials" />
              <Field label="Name with Initials Sinhala" name="nameWithInitialSinhala" />
              <Field label="Date of Birth" name="dob" type="date" />
              <Field label="NIC" name="nic" />
              <Field label="Birth Certificate No" name="birthCertificateNo" />
              <Field label="District" name="district" />
              <Field label="Religion" name="religion" options={['Buddhist', 'Hindu', 'Christian', 'Muslim', 'Other']} />
              <Field label="Gender" name="gender" options={['Male', 'Female']} />
              <Field label="Mother's Name" name="motherName" />
              <Field label="Father's Name" name="fatherName" />
              <Field label="Guardian ID" name="guardianId" />
              <Field label="Civil State" name="civilState" options={['Single', 'Married', 'Widowed', 'Separate', 'Divorce']} />
              <Field label="Marital State" name="maritalState" options={['Single', 'Married', 'Widowed', 'Separate', 'Divorce']} />
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Activity size={20}/></div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Health Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Field label="Height (cm)" name="height" />
              <Field label="Weight (kg)" name="weight" />
              <Field label="Blood Type" name="bloodGroup" options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} />
              <Field label="Special Physical Condition" name="specialPhysicalCondition" />
              <Field label="Long Term Diseases" name="longTermDiseases" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Health Description / Notes</label>
               <textarea 
                  name="healthDescription"
                  value={formData.healthDescription || ''}
                  onChange={handleChange}
                  className="w-full min-h-[120px] bg-white border border-slate-200 rounded-[1.5rem] p-6 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                  placeholder="Provide additional health details here..."
               />
            </div>
          </div>
        )}

        {activeTab === 'service' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><History size={20}/></div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Service History</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Field label="1st Appointment Date" name="firstAppointmentDate" type="date" />
              <Field label="1st Appointment District" name="firstAppointmentDistrict" />
              <Field label="1st Appointment Institute" name="firstAppointmentInstitute" />
              <Field label="Hierarchy Carder" name="hierarchyCarder" options={['Academic', 'Non Academic', 'DO', 'Coaches', 'Volantiers']} />
              <Field label="Current Position" name="position" />
              <Field label="Increment Date" name="incrementDate" type="date" />
              <Field label="Service Period" name="servicePeriod" />
              <Field label="Salary Code" name="salaryCode" />
              <Field label="Holding Position at School" name="holdingPosition" options={['Principle', 'Vice Principle', 'Assistant Principle', 'Section Head', 'Sector Head', 'Class Teacher']} />
              <Field label="Grade" name="grade" />
              <Field label="Appointment Medium" name="appointmentMedium" />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Contact size={20}/></div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 col-span-full">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Permanent Address</label>
                  <textarea 
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="w-full h-24 bg-white border border-slate-200 rounded-xl p-4 text-sm font-bold"
                  />
               </div>
               <div className="space-y-2 col-span-full">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporary Address</label>
                  <textarea 
                    name="temporaryAddress"
                    value={formData.temporaryAddress || ''}
                    onChange={handleChange}
                    className="w-full h-24 bg-white border border-slate-200 rounded-xl p-4 text-sm font-bold"
                  />
               </div>
               <Field label="Emergency Contact No" name="emergencyContactNo" />
               <Field label="Whatsapp No" name="whatsappNo" />
               <Field label="Home No" name="homeNo" />
               <Field label="Mobile No" name="contactMobile" />
               <Field label="Email" name="email" type="email" />
               <Field label="Distance to School (km)" name="distanceToSchool" />
            </div>
          </div>
        )}

        {activeTab === 'quals' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Award size={20}/></div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Qualifications</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <h4 className="font-bold text-amber-600 uppercase tracking-widest text-[10px] pb-2 border-b border-amber-100">Academic Education</h4>
                  <div className="space-y-4">
                     <Field label="GCE OL" name="gceOl" />
                     <Field label="GCE AL" name="gceAl" />
                     <Field label="Diploma" name="diploma" />
                     <Field label="Degree" name="degree" />
                     <Field label="Post Graduate" name="postGraduate" />
                     <Field label="Master" name="master" />
                     <Field label="PhD" name="phd" />
                  </div>
               </div>
               <div className="space-y-6">
                  <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] pb-2 border-b border-slate-100">Other Qualifications</h4>
                  <div className="space-y-4">
                     <Field label="Qualification 01" name="otherQual1" />
                     <Field label="Qualification 02" name="otherQual2" />
                     <Field label="Qualification 03" name="otherQual3" />
                     <Field label="Qualification 04" name="otherQual4" />
                     <Field label="Qualification 05" name="otherQual5" />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'spouse' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Baby size={20}/></div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Spouse & Children</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Field label="Spouse Name" name="spouseName" />
               <Field label="Designation" name="spouseDesignation" />
               <Field label="Working Address" name="spouseWorkingAddress" />
               <Field label="Temporary Address" name="spouseTempAddress" />
               <Field label="Office Contact No" name="spouseOfficeContact" />
               <Field label="Emergency Contact" name="spouseEmergencyContact" />
               <Field label="Emergency Email" name="spouseEmergencyEmail" />
               <Field label="Working Company" name="spouseWorkingCompany" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Children Details (Name & Age)</label>
               <textarea 
                  name="childrenDetails"
                  value={formData.childrenDetails || ''}
                  onChange={handleChange}
                  className="w-full min-h-[120px] bg-white border border-slate-200 rounded-[1.5rem] p-6 text-sm font-bold focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  placeholder="e.g. Namal (12), Kasun (8)..."
               />
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-end gap-4 border-t border-slate-100 pt-10">
           <Button 
            type="submit"
            className="h-16 px-12 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 active:scale-95 transition-all flex items-center gap-3"
            isLoading={isSubmitting}
           >
             <Save size={20} />
             Save Profile Details
           </Button>
        </div>
      </div>
    </form>
  );
}
