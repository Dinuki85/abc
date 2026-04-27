"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { 
  User, Briefcase, Save, ArrowLeft, Loader2, HeartPulse, MapPin, Award, Users, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function StaffProfileSetup() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
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
        setFormData(profile || { username: user.username });
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load staff profile");
        setLoading(false);
      });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateMyStaffProfile({ ...formData, profileCompleted: true });
      toast.success("Profile saved! Please login with your NIC now.");
      
      // Logout and redirect to login
      api.logout();
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? '' : age.toString();
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'service', label: 'Service History', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: MapPin },
    { id: 'qualification', label: 'Qualification', icon: Award },
    { id: 'spouse', label: 'Spouse & Children', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/teacher')} className="rounded-full w-12 h-12 p-0">
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Staff Registration</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Complete Profile Data</p>
            </div>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 h-12 font-bold shadow-lg shadow-black/20 flex items-center gap-2 transition-all active:scale-95"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Submit Details
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-primary' : 'text-slate-400'} />
                    {tab.label}
                    {isActive && <CheckCircle size={14} className="ml-auto opacity-50" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Tab 1: Basic Information */}
              {activeTab === 'basic' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Basic Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Teacher ID (Auto)" name="username" value={formData.username || formData.nic} readOnly />
                    <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <FormInput label="Name in Sinhala (as birth certificate)" name="nameSinhala" value={formData.nameSinhala} onChange={handleChange} />
                    <FormInput label="Name with Initial" name="nameWithInitials" value={formData.nameWithInitials} onChange={handleChange} />
                    <FormInput label="Name with Initial Sinhala" name="nameWithInitialSinhala" value={formData.nameWithInitialSinhala} onChange={handleChange} />
                    <FormInput label="NIC" name="nic" value={formData.nic} onChange={handleChange} />
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date Of Birth</label>
                      <Input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className="h-14 rounded-2xl bg-slate-50" />
                    </div>
                    
                    <FormInput label="Age (Auto Calculate)" name="age" value={calculateAge(formData.dob)} readOnly className="bg-slate-100/50" />
                    <FormInput label="Birth Certificate No" name="birthCertificateNo" value={formData.birthCertificateNo} onChange={handleChange} />
                    <FormInput label="District" name="district" value={formData.district} onChange={handleChange} />
                    <FormInput label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                    <FormSelect label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female']} />
                    
                    <FormInput label="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                    <FormInput label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                    <FormInput label="Guardian ID" name="guardianId" value={formData.guardianId} onChange={handleChange} />
                    <FormInput label="Civil State" name="civilState" value={formData.civilState} onChange={handleChange} />
                    <FormSelect label="Marital State" name="maritalState" value={formData.maritalState} onChange={handleChange} options={['Single', 'Married', 'Widowed', 'Separate', 'Divorce']} />
                  </div>
                </div>
              )}

              {/* Tab 2: Health */}
              {activeTab === 'health' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                      <HeartPulse size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Health Data</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Height (cm)" name="height" value={formData.height} onChange={handleChange} type="number" />
                    <FormInput label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} type="number" />
                    <FormSelect label="Blood Type" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} />
                    <FormInput label="Special Physical Condition" name="specialPhysicalCondition" value={formData.specialPhysicalCondition} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Long term disease description</label>
                    <textarea 
                      name="healthDescription" 
                      value={formData.healthDescription || ''} 
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-2xl border-gray-200 bg-slate-50 p-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Service History */}
              {activeTab === 'service' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
                      <Briefcase size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Service History</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">1st Appointment Date</label>
                      <Input type="date" name="firstAppointmentDate" value={formData.firstAppointmentDate || ''} onChange={handleChange} className="h-14 rounded-2xl bg-slate-50" />
                    </div>
                    <FormInput label="1st Appointment District" name="firstAppointmentDistrict" value={formData.firstAppointmentDistrict} onChange={handleChange} />
                    <FormInput label="1st Appointment Institute" name="firstAppointmentInstitute" value={formData.firstAppointmentInstitute} onChange={handleChange} />
                    
                    <FormSelect 
                      label="Hierarchy Carder" 
                      name="hierarchyCarder" 
                      value={formData.hierarchyCarder} 
                      onChange={handleChange} 
                      options={['Academic', 'Non Academic', 'DO', 'Coaches', 'Volantiers']} 
                    />
                    <FormInput label="Position" name="position" value={formData.position} onChange={handleChange} />
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Increment Date</label>
                      <Input type="date" name="incrementDate" value={formData.incrementDate || ''} onChange={handleChange} className="h-14 rounded-2xl bg-slate-50" />
                    </div>
                    
                    <FormInput label="Service Period" name="servicePeriod" value={formData.servicePeriod} onChange={handleChange} />
                    <FormInput label="Salary Code (As per Pay sheet)" name="salaryCode" value={formData.salaryCode} onChange={handleChange} />
                    
                    <FormSelect 
                      label="Holding Position at school" 
                      name="holdingPosition" 
                      value={formData.holdingPosition} 
                      onChange={handleChange} 
                      options={['Principle', 'Vise Principle', 'Asistant Principle', 'Section Head', 'Sector Head', 'Class Teacher']} 
                    />
                    
                    <FormInput label="Grade" name="grade" value={formData.grade} onChange={handleChange} />
                    <FormInput label="Appointment Medium" name="appointmentMedium" value={formData.appointmentMedium} onChange={handleChange} />
                  </div>
                </div>
              )}

              {/* Tab 4: Contact Information */}
              {activeTab === 'contact' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Contact Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Permanent Address</label>
                      <textarea name="address" value={formData.address || ''} onChange={handleChange} rows={2} className="w-full rounded-2xl border-gray-200 bg-slate-50 p-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporary Address</label>
                      <textarea name="temporaryAddress" value={formData.temporaryAddress || ''} onChange={handleChange} rows={2} className="w-full rounded-2xl border-gray-200 bg-slate-50 p-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none" />
                    </div>
                    
                    <FormInput label="Emergency Contact No" name="emergencyContactNo" value={formData.emergencyContactNo} onChange={handleChange} />
                    <FormInput label="Whatsapp No" name="whatsappNo" value={formData.whatsappNo} onChange={handleChange} />
                    <FormInput label="Home No" name="contactHome" value={formData.contactHome} onChange={handleChange} />
                    <FormInput label="Mobile No" name="contactMobile" value={formData.contactMobile} onChange={handleChange} />
                    <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                    <FormInput label="Distance to school" name="distanceToSchool" value={formData.distanceToSchool} onChange={handleChange} />
                  </div>
                </div>
              )}

              {/* Tab 5: Qualification */}
              {activeTab === 'qualification' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                      <Award size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Qualifications</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h3 className="text-sm font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-lg inline-block">Education</h3>
                      <div className="space-y-4">
                        <FormInput label="GCE OL" name="gceOl" value={formData.gceOl} onChange={handleChange} />
                        <FormInput label="GCE AL" name="gceAl" value={formData.gceAl} onChange={handleChange} />
                        <FormInput label="Diploma" name="diploma" value={formData.diploma} onChange={handleChange} />
                        <FormInput label="Degree" name="degree" value={formData.degree} onChange={handleChange} />
                        <FormInput label="Post Graduate" name="postGraduate" value={formData.postGraduate} onChange={handleChange} />
                        <FormInput label="Master" name="master" value={formData.master} onChange={handleChange} />
                        <FormInput label="PHD" name="phd" value={formData.phd} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-4 py-2 rounded-lg inline-block">Other</h3>
                      <div className="space-y-4">
                        <FormInput label="Other Qualification 1" name="otherQual1" value={formData.otherQual1} onChange={handleChange} />
                        <FormInput label="Other Qualification 2" name="otherQual2" value={formData.otherQual2} onChange={handleChange} />
                        <FormInput label="Other Qualification 3" name="otherQual3" value={formData.otherQual3} onChange={handleChange} />
                        <FormInput label="Other Qualification 4" name="otherQual4" value={formData.otherQual4} onChange={handleChange} />
                        <FormInput label="Other Qualification 5" name="otherQual5" value={formData.otherQual5} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: Spouse & Children */}
              {activeTab === 'spouse' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <Users size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Spouse & Children</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Spouse Name" name="spouseName" value={formData.spouseName} onChange={handleChange} />
                    <FormInput label="Designation" name="spouseDesignation" value={formData.spouseDesignation} onChange={handleChange} />
                    <FormInput label="Working Address" name="spouseWorkingAddress" value={formData.spouseWorkingAddress} onChange={handleChange} />
                    <FormInput label="Temporary Address" name="spouseTempAddress" value={formData.spouseTempAddress} onChange={handleChange} />
                    <FormInput label="Office Contact No" name="spouseOfficeContact" value={formData.spouseOfficeContact} onChange={handleChange} />
                    <FormInput label="Emergency Contact" name="spouseEmergencyContact" value={formData.spouseEmergencyContact} onChange={handleChange} />
                    <FormInput label="Emergency Email" name="spouseEmergencyEmail" value={formData.spouseEmergencyEmail} onChange={handleChange} />
                    <FormInput label="Working Company" name="spouseWorkingCompany" value={formData.spouseWorkingCompany} onChange={handleChange} />
                    
                    <div className="space-y-2 md:col-span-2 pt-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Children (Name & Age)</label>
                      <textarea 
                        name="childrenDetails" 
                        value={formData.childrenDetails || ''} 
                        onChange={handleChange}
                        placeholder="e.g. John Doe - 12 years old&#10;Jane Doe - 8 years old"
                        rows={4} 
                        className="w-full rounded-2xl border-gray-200 bg-slate-50 p-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Footer for Mobile / Bottom view */}
            <div className="mt-8 flex justify-end">
               <Button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-10 h-14 text-lg font-black tracking-wide shadow-xl shadow-black/20 flex items-center gap-2 transition-all active:scale-95 w-full md:w-auto"
              >
                {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                {saving ? 'Saving Records...' : 'Save Profile & Continue'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Components for Form Fields
function FormInput({ label, name, value, onChange, type = "text", readOnly = false, className = "" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <Input 
        type={type} 
        name={name} 
        value={value || ''} 
        onChange={onChange} 
        readOnly={readOnly}
        className={`h-14 rounded-2xl border-gray-200 focus:bg-white transition-all ${readOnly ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-slate-50'} ${className}`} 
      />
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <select 
        name={name} 
        value={value || ''} 
        onChange={onChange}
        className="w-full h-14 bg-slate-50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm text-slate-800 shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
      >
        <option value="">Select option</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
