"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { 
  User, Briefcase, History, Save, ArrowLeft, Loader2,
  Info, ShieldCheck, MapPin, Activity, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function StaffProfileSetup() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const user = api.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Load teacher/staff profile
    api.getTeacherProfile(user.username)
      .then(profile => {
        setFormData(profile);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load staff profile");
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
      await api.saveStaffProfile(formData);
      toast.success("Staff profile updated successfully!");
      router.push('/dashboard/teacher');
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
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'professional', label: 'Professional Details', icon: Briefcase },
    { id: 'service', label: 'Service History', icon: History },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard/teacher')} className="rounded-full w-12 h-12 p-0">
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-xl font-black text-slate-800">Staff Profile Completion</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {formData.username || formData.nic}</p>
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
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-500">
              
              {activeTab === 'personal' && (
                <div className="space-y-10">
                  <SectionTitle title="Personal Info" icon={User} color="text-primary" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <InputField label="Name with Initials" name="nameWithInitials" value={formData.nameWithInitials} onChange={handleChange} />
                    <InputField label="NIC Number" name="nic" value={formData.nic} onChange={handleChange} />
                    <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                    <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['MALE', 'FEMALE', 'OTHER']} />
                    <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                    <InputField label="Race" name="race" value={formData.race} onChange={handleChange} />
                    <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'professional' && (
                <div className="space-y-10">
                  <SectionTitle title="Professional Details" icon={Briefcase} color="text-orange-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Current Designation" name="designation" value={formData.designation} onChange={handleChange} />
                    <TextAreaField label="Current Address" name="address" value={formData.address} onChange={handleChange} />
                    <TextAreaField label="Mailing Address" name="mailingAddress" value={formData.mailingAddress} onChange={handleChange} />
                    <InputField label="Mobile Number" name="contactMobile" value={formData.contactMobile} onChange={handleChange} />
                    <InputField label="Home Number" name="contactHome" value={formData.contactHome} onChange={handleChange} />
                    <InputField label="Official Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                  </div>
                </div>
              )}

              {activeTab === 'service' && (
                <div className="space-y-10">
                  <SectionTitle title="Service & History" icon={History} color="text-emerald-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Date of First Appointment" name="firstAppointmentDate" type="date" value={formData.firstAppointmentDate} onChange={handleChange} />
                    <InputField label="Appointment Letter No" name="appointmentLetterNumber" value={formData.appointmentLetterNumber} onChange={handleChange} />
                    <InputField label="Service Grade" name="grade" value={formData.grade} onChange={handleChange} />
                    <InputField label="Carder" name="carder" value={formData.carder} onChange={handleChange} />
                    <InputField label="Joined Date" name="joinedDate" type="date" value={formData.joinedDate} onChange={handleChange} />
                    <TextAreaField label="Qualifications" name="qualifications" value={formData.qualifications} onChange={handleChange} />
                    <TextAreaField label="Subjects Taught" name="subjects" value={formData.subjects} onChange={handleChange} />
                    <InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
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
