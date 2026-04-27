"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { 
  User, Heart, Award, MapPin, ShieldCheck, 
  Save, ArrowLeft, Loader2, CheckCircle2,
  Users, Activity, Trophy, Phone, Info, BookOpen, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function StudentProfileSetup() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('identity');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const user = api.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }

    api.getStudentProfile(user.username)
      .then(profile => {
        setFormData(profile);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (redirect = true) => {
    setSaving(true);
    try {
      const user = api.getCurrentUser();
      const targetUsername = user?.username || formData.username;
      
      await api.saveStudentProfile(targetUsername, formData);
      toast.success("Profile updated successfully!");
      // If profile is now complete, we might want to redirect
      if (formData.verificationStatus === 'NEEDS_CORRECTION') {
         toast.success("Status reset to PENDING for re-verification");
      }
      
      if (redirect) {
        router.push('/dashboard/student');
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndNext = async () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      await handleSave(false);
      if (!saving) { // Only advance if save initiated successfully
        setActiveTab(tabs[currentIndex + 1].id);
      }
    } else {
      await handleSave(true); // Last tab finishes and redirects
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: User },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'skills', label: 'Skills', icon: Trophy },
    { id: 'contact', label: 'Contact Information', icon: MapPin },
    { id: 'exam', label: 'Exam Result', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard/student')} className="rounded-full w-12 h-12 p-0">
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-xl font-black text-slate-800">Complete Your Profile</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Index: {formData.username}</p>
            </div>
          </div>
          <Button 
            onClick={() => handleSave(false)} 
            disabled={saving}
            className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 h-12 font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Profile
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' 
                    : 'bg-white text-slate-500 hover:bg-slate-100'
                }`}
              >
                <tab.icon size={22} />
                <span>{tab.label}</span>
              </button>
            ))}
            
            {/* Verification Status Card */}
            <div className="mt-10 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Verification Status</h4>
              <div className={`flex items-center gap-3 p-4 rounded-2xl ${
                formData.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' :
                formData.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-50 text-rose-600' :
                'bg-blue-50 text-primary'
              }`}>
                {formData.verificationStatus === 'VERIFIED' ? <ShieldCheck size={20} /> : <Info size={20} />}
                <span className="font-black italic">{formData.verificationStatus || 'PENDING'}</span>
              </div>
              {formData.verificationComment && (
                <p className="mt-4 text-xs font-medium text-slate-500 italic">"{formData.verificationComment}"</p>
              )}
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-500">
              
              {activeTab === 'basic' && (
                <div className="space-y-10">
                  <SectionTitle title="Basic Information" icon={User} color="text-primary" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Index No" name="username" value={formData.username} onChange={() => {}} type="text" readonly />
                    <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <InputField label="Name in Sinhala as Birth Certificate" name="nameSinhala" value={formData.nameSinhala} onChange={handleChange} />
                    <InputField label="Name with Initial" name="nameWithInitials" value={formData.nameWithInitials} onChange={handleChange} />
                    <InputField label="Name with Initial Sinhala" name="nameWithInitialSinhala" value={formData.nameWithInitialSinhala} onChange={handleChange} />
                    <InputField label="Date Of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                    <InputField label="NIC" name="nic" value={formData.nic} onChange={handleChange} />
                    <InputField label="Birth Certificate No" name="birthCertificateNumber" value={formData.birthCertificateNumber} onChange={handleChange} />
                    <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
                    <SelectField label="Religion" name="religion" value={formData.religion} onChange={handleChange} options={['Buddhist', 'Hindu', 'Christian', 'Muslim', 'Other']} />
                    <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['MALE', 'FEMALE', 'OTHER']} />
                    <InputField label="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                    <InputField label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                    <InputField label="Guardian ID" name="guardianIdRef" value={formData.guardianIdRef} onChange={handleChange} />
                    <InputField label="Inter School House" name="interSchoolHouse" value={formData.interSchoolHouse} onChange={handleChange} />
                    <InputField label="Siblings" name="siblings" value={formData.siblings} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="space-y-10">
                  <SectionTitle title="Health Profile" icon={Activity} color="text-rose-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
                    <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
                    <SelectField label="Blood type" name="bloodType" value={formData.bloodType || formData.bloodGroup} onChange={handleChange} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} />
                    <InputField label="Special physical condition" name="specialPhysicalCondition" value={formData.specialPhysicalCondition} onChange={handleChange} />
                    <InputField label="Special Illness" name="specialIllness" value={formData.specialIllness} onChange={handleChange} />
                    <InputField label="Long term disease" name="longTermDisease" value={formData.longTermDisease} onChange={handleChange} />
                    <InputField label="Special need" name="specialNeed" value={formData.specialNeed} onChange={handleChange} />
                    <TextAreaField label="Description" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-10">
                  <SectionTitle title="Skills & Achievements" icon={Trophy} color="text-amber-500" />
                  <div className="space-y-8">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="International Level" name="achievementInternational" value={formData.achievementInternational} onChange={handleChange} />
                      <InputField label="National Level" name="achievementNational" value={formData.achievementNational} onChange={handleChange} />
                      <InputField label="Provincial Level" name="achievementProvincial" value={formData.achievementProvincial} onChange={handleChange} />
                      <InputField label="Zonal Level" name="achievementZonal" value={formData.achievementZonal} onChange={handleChange} />
                      <InputField label="Divisional Level" name="achievementDivisional" value={formData.achievementDivisional} onChange={handleChange} />
                      <InputField label="School Level" name="achievementSchool" value={formData.achievementSchool} onChange={handleChange} />
                    </div>
                    
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest pt-6 border-t border-slate-100">Additional Talent Areas</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <CheckboxField label="Agri culture" name="talentAgri" checked={formData.talentAgri} onChange={handleChange} />
                      <CheckboxField label="ICT" name="talentIct" checked={formData.talentIct} onChange={handleChange} />
                      <CheckboxField label="Aesthetic" name="talentAesthetic" checked={formData.talentAesthetic} onChange={handleChange} />
                      <CheckboxField label="Media & Announcing" name="talentMedia" checked={formData.talentMedia} onChange={handleChange} />
                      <CheckboxField label="Sport & Athletic" name="talentSport" checked={formData.talentSport} onChange={handleChange} />
                      <CheckboxField label="Innovation" name="talentInnovation" checked={formData.talentInnovation} onChange={handleChange} />
                      <CheckboxField label="Cinematography" name="talentCinematography" checked={formData.talentCinematography} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-10">
                  <SectionTitle title="Contact Information" icon={MapPin} color="text-indigo-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TextAreaField label="Permanent Address" name="addressPermanent" value={formData.addressPermanent || formData.address} onChange={handleChange} />
                    <TextAreaField label="Temporary Address" name="addressTemporary" value={formData.addressTemporary} onChange={handleChange} />
                    <InputField label="Emergency Contact No" name="contactEmergency" value={formData.contactEmergency} onChange={handleChange} />
                    <InputField label="Whatsapp No" name="contactWhatsapp" value={formData.contactWhatsapp} onChange={handleChange} />
                    <InputField label="Home No" name="contactHome" value={formData.contactHome} onChange={handleChange} />
                    <InputField label="Mobile No" name="contactMobile" value={formData.contactMobile} onChange={handleChange} />
                    <InputField label="Email" name="contactEmail" value={formData.contactEmail || formData.email} onChange={handleChange} />
                    <InputField label="Distance to school" name="distanceToSchool" value={formData.distanceToSchool} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'exam' && (
                <div className="space-y-10">
                  <SectionTitle title="Exam Result" icon={FileText} color="text-blue-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Grade 05" name="resultGrade05" value={formData.resultGrade05} onChange={handleChange} />
                    <InputField label="GCE OL" name="resultGceOl" value={formData.resultGceOl} onChange={handleChange} />
                  </div>
                </div>
              )}

              {/* Form Footer */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end gap-4">
                <Button 
                  onClick={() => handleSave(true)} 
                  variant="outline"
                  disabled={saving}
                  className="rounded-2xl px-8 h-12 font-bold border-2 border-slate-200 hover:bg-slate-50 text-slate-600"
                >
                  Save & Exit
                </Button>
                <Button 
                  onClick={handleSaveAndNext} 
                  disabled={saving}
                  className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 h-12 font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {activeTab === tabs[tabs.length - 1].id ? 'Save & Finish' : 'Save & Next'}
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, icon: Icon, color }: any) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
      <div className={`p-4 bg-slate-50 rounded-2xl ${color}`}>
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 font-handlee">{title}</h2>
    </div>
  );
}

function InputField({ label, name, type = 'text', value, onChange, readonly }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        readOnly={readonly}
        className={`w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:border-primary focus:bg-white transition-all shadow-inner ${readonly ? 'opacity-70 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:border-primary focus:bg-white transition-all shadow-inner appearance-none"
      >
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <textarea
        name={name}
        value={value || ''}
        onChange={onChange}
        rows={3}
        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
      />
    </div>
  );
}

function CheckboxField({ label, name, checked, onChange }: any) {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl transition-all shadow-inner hover:bg-slate-100 cursor-pointer" onClick={() => onChange({ target: { name, value: !checked } })}>
      <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${checked ? 'bg-primary text-white' : 'bg-white border-2 border-slate-200'}`}>
        {checked && <CheckCircle2 size={16} />}
      </div>
      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
        className="hidden"
      />
      <label className="text-xs font-black text-slate-600 uppercase tracking-widest cursor-pointer">{label}</label>
    </div>
  );
}
// Step 9-1 - Implement Tab 1 UI for Student Profile

// Step 9-2 - Implement Tab 2 UI for Student Profile

// Step 9-3 - Implement Tab 3 UI for Student Profile

// Step 9-4 - Implement Tab 4 UI for Student Profile

// Step 9-5 - Implement Tab 5 UI for Student Profile

// Step 9-6 - Add verification status badge to Student Dashboard

// Step 9-7 - Refine Student Profile save logic with toast notifications

// Step 9-8 - Add auto-calculate age logic to Student Profile

// Step 9-9 - Implement Tab 1 UI for Staff Profile

// Step 9-10 - Implement Tab 2 UI for Staff Profile

// Step 9-11 - Implement Tab 3 UI for Staff Profile

// Step 9-12 - Add NIC-based login support for Staff

// Step 9-13 - Refine Staff Profile save logic with DTO mapping

// Step 9-14 - Add teacher-specific stats to Teacher Dashboard

// Step 9-15 - Implement 'My Classes' view for Teacher Portal

// Step 9-16 - Implement 'Student Verification' workflow for Teachers

// Step 9-17 - Add Audit Profile button to Teacher student list

// Step 9-18 - Implement dynamic tabs in Admin Dashboard

// Step 9-19 - Add personalized welcome message to Admin Portal

// Step 9-20 - Update Admin sidebar with new Institutional categories

// Step 9-21 - Implement Verification Audit tab in Admin student view

// Step 9-22 - Refine StudentProfileModal with 7-tab structure

// Step 9-23 - Add teacher audit notes visibility for Admin

// Step 9-24 - Implement search in Admin Student Directory

// Step 9-25 - Refine enrollment modal with Grade/Class pre-selection

// Step 9-26 - Add loading states to all profile forms

// Step 9-27 - Implement responsive layout for mobile profile editing

// Step 9-28 - Add glassmorphism effects to dashboard navigation

// Step 9-29 - Final integration of Student/Staff/Admin portals

// Step 9-30 - Final cleanup of Step 9 Role Specific Logic

