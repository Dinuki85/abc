'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, StudentProfile, User } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  User as UserIcon, 
  MapPin, 
  ShieldCheck, 
  HeartPulse, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Contact
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Basic Info', icon: UserIcon },
  { id: 2, title: 'Identification', icon: ShieldCheck },
  { id: 3, title: 'Guardian & Contact', icon: MapPin },
  { id: 4, title: 'Medical Details', icon: HeartPulse },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentProfile>>({
    fullName: '',
    initials: '',
    nameWithInitials: '',
    dob: '',
    gender: 'MALE',
    religion: '',
    nationality: 'Sri Lankan',
    birthCertificateNumber: '',
    nic: '',
    address: '',
    guardianName: '',
    guardianNic: '',
    guardianContact: '',
    bloodGroup: '',
    medicalHistory: '',
  });

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || currentUser.role !== 'STUDENT') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    
    // Check if profile is already completed
    api.getStudentProfile(currentUser.username).then(profile => {
      if (profile?.profileCompleted) {
        router.push('/dashboard/student');
      }
    });
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await api.saveStudentProfile(user.username, formData);
      // Update local user state
      const updatedUser = { ...user, firstLogin: false };
      localStorage.setItem('school_user', JSON.stringify(updatedUser));
      router.push('/dashboard/student?success=profile_completed');
    } catch (error) {
      console.error(error);
      alert('Failed to save profile. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Full Name (As per Birth Certificate)" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Pathirage Don Kamal Perera"
              />
              <Input 
                label="Initials" 
                name="initials"
                value={formData.initials}
                onChange={handleInputChange}
                placeholder="e.g. P.D.K."
              />
              <Input 
                label="Name with Initials" 
                name="nameWithInitials"
                value={formData.nameWithInitials}
                onChange={handleInputChange}
                placeholder="e.g. P.D.K. Perera"
              />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Gender</label>
                <select 
                  name="gender"
                  className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <Input 
                label="Date of Birth" 
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Birth Certificate Number" 
                name="birthCertificateNumber"
                value={formData.birthCertificateNumber}
                onChange={handleInputChange}
              />
              <Input 
                label="NIC Number (Optional for under 16)" 
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                placeholder="e.g. 200512345678"
              />
              <Input 
                label="Religion" 
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                placeholder="e.g. Buddhist"
              />
              <Input 
                label="Nationality" 
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <Input 
                label="Permanent Address" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Full residential address"
              />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Guardian Full Name" 
                name="guardianName"
                value={formData.guardianName}
                onChange={handleInputChange}
              />
              <Input 
                label="Guardian NIC" 
                name="guardianNic"
                value={formData.guardianNic}
                onChange={handleInputChange}
              />
              <Input 
                label="Guardian Contact Number" 
                name="guardianContact"
                value={formData.guardianContact}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Blood Group</label>
                <select 
                  name="bloodGroup"
                  className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Special Medical History / Allergies</label>
                <textarea 
                  name="medicalHistory"
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all min-h-[120px]"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  placeholder="Mention any chronic illnesses, regular medications or severe allergies..."
                />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 font-handlee">Complete Your Student Profile</h1>
        <p className="text-slate-500">Please provide accurate information as per your official documents.</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative z-10">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}
                  ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}
                `}>
                  <Icon size={20} />
                </div>
                <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 -mt-6 transition-all duration-500 ${currentStep > step.id ? 'bg-blue-600' : 'bg-slate-100'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <Card className="p-8 border-none shadow-xl bg-white/70 backdrop-blur-md">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <span className="font-bold text-lg">{currentStep}</span>
          </div>
          <div>
            <h2 className="font-bold text-xl text-slate-800">{steps[currentStep-1].title}</h2>
            <p className="text-sm text-slate-500">Step {currentStep} of {steps.length}</p>
          </div>
        </div>

        {renderStepContent()}

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1 || isLoading}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next Step
              <ArrowRight size={18} />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              isLoading={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 group"
            >
              <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
              Complete Registration
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
