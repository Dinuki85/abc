"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { 
  User, Heart, Award, MapPin, ShieldCheck, 
  Save, ArrowLeft, Loader2, CheckCircle2,
  Users, Activity, Trophy, Phone, Info
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.saveStudentProfile(formData);
      toast.success("Profile updated successfully!");
      // If profile is now complete, we might want to redirect
      if (formData.verificationStatus === 'NEEDS_CORRECTION') {
         toast.success("Status reset to PENDING for re-verification");
      }
      router.push('/dashboard/student');
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  const tabs = [
    { id: 'identity', label: 'Student Identity', icon: User },
    { id: 'family', label: 'Guardian & Family', icon: Users },
    { id: 'health', label: 'Health & Medical', icon: Activity },
    { id: 'skills', label: 'Skills & Achievements', icon: Trophy },
    { id: 'contact', label: 'Residential & Contact', icon: MapPin },
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
            onClick={handleSave} 
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
              
              {activeTab === 'identity' && (
                <div className="space-y-10">
                  <SectionTitle title="Core Identity" icon={User} color="text-primary" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Full Name (English)" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <InputField label="Name in Sinhala" name="nameSinhala" value={formData.nameSinhala} onChange={handleChange} />
                    <InputField label="Initials" name="initials" value={formData.initials} onChange={handleChange} />
                    <InputField label="Name with Initials (English)" name="nameWithInitials" value={formData.nameWithInitials} onChange={handleChange} />
                    <InputField label="Name with Initials (Sinhala)" name="nameWithInitialSinhala" value={formData.nameWithInitialSinhala} onChange={handleChange} />
                    <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                    <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['MALE', 'FEMALE', 'OTHER']} />
                    <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                    <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                    <InputField label="NIC Number" name="nic" value={formData.nic} onChange={handleChange} />
                    <InputField label="Birth Certificate No" name="birthCertificateNumber" value={formData.birthCertificateNumber} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'family' && (
                <div className="space-y-10">
                  <SectionTitle title="Family & Guardian" icon={Users} color="text-orange-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                    <InputField label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                    <InputField label="Guardian's Name" name="guardianName" value={formData.guardianName} onChange={handleChange} />
                    <InputField label="Guardian's NIC" name="guardianNic" value={formData.guardianNic} onChange={handleChange} />
                    <InputField label="Guardian's Contact" name="guardianContact" value={formData.guardianContact} onChange={handleChange} />
                    <InputField label="Guardian ID Reference" name="guardianIdRef" value={formData.guardianIdRef} onChange={handleChange} />
                    <InputField label="Siblings (if any)" name="siblings" value={formData.siblings} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="space-y-10">
                  <SectionTitle title="Health Profile" icon={Activity} color="text-rose-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
                    <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
                    <InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                    <TextAreaField label="Medical History" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />
                    <InputField label="Special Physical Condition" name="specialPhysicalCondition" value={formData.specialPhysicalCondition} onChange={handleChange} />
                    <InputField label="Special Illness" name="specialIllness" value={formData.specialIllness} onChange={handleChange} />
                    <InputField label="Long Term Disease" name="longTermDisease" value={formData.longTermDisease} onChange={handleChange} />
                    <InputField label="Special Need" name="specialNeed" value={formData.specialNeed} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-10">
                  <SectionTitle title="Achievements & Talents" icon={Trophy} color="text-amber-500" />
                  <div className="space-y-8">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="International" name="achievementInternational" value={formData.achievementInternational} onChange={handleChange} />
                      <InputField label="National" name="achievementNational" value={formData.achievementNational} onChange={handleChange} />
                      <InputField label="Provincial" name="achievementProvincial" value={formData.achievementProvincial} onChange={handleChange} />
                      <InputField label="Zonal" name="achievementZonal" value={formData.achievementZonal} onChange={handleChange} />
                      <InputField label="Divisional" name="achievementDivisional" value={formData.achievementDivisional} onChange={handleChange} />
                      <InputField label="School Level" name="achievementSchool" value={formData.achievementSchool} onChange={handleChange} />
                    </div>
                    
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest pt-6 border-t">Talents</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <InputField label="Agri" name="talentAgri" value={formData.talentAgri} onChange={handleChange} />
                      <InputField label="ICT" name="talentIct" value={formData.talentIct} onChange={handleChange} />
                      <InputField label="Aesthetic" name="talentAesthetic" value={formData.talentAesthetic} onChange={handleChange} />
                      <InputField label="Media" name="talentMedia" value={formData.talentMedia} onChange={handleChange} />
                      <InputField label="Sport" name="talentSport" value={formData.talentSport} onChange={handleChange} />
                      <InputField label="Innovation" name="talentInnovation" value={formData.talentInnovation} onChange={handleChange} />
                      <InputField label="Cinematography" name="talentCinematography" value={formData.talentCinematography} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-10">
                  <SectionTitle title="Contact & Residence" icon={MapPin} color="text-indigo-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TextAreaField label="Permanent Address" name="addressPermanent" value={formData.addressPermanent} onChange={handleChange} />
                    <TextAreaField label="Temporary Address" name="addressTemporary" value={formData.addressTemporary} onChange={handleChange} />
                    <InputField label="Mobile No" name="contactMobile" value={formData.contactMobile} onChange={handleChange} />
                    <InputField label="Home No" name="contactHome" value={formData.contactHome} onChange={handleChange} />
                    <InputField label="WhatsApp No" name="contactWhatsapp" value={formData.contactWhatsapp} onChange={handleChange} />
                    <InputField label="Email Address" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                    <InputField label="Emergency Contact" name="contactEmergency" value={formData.contactEmergency} onChange={handleChange} />
                    <InputField label="Distance to School (km)" name="distanceToSchool" value={formData.distanceToSchool} onChange={handleChange} />
                    <InputField label="Inter School House" name="interSchoolHouse" value={formData.interSchoolHouse} onChange={handleChange} />
                  </div>
                </div>
              )}

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

function InputField({ label, name, type = 'text', value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
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

