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
  Contact,
  AlertCircle
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
  const [classes, setClasses] = useState<any[]>([]);
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
    gradeId: undefined,
    classId: undefined,
  });
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || currentUser.role !== 'ROLE_STUDENT') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    
    api.getStudentProfile(currentUser.username).then(profile => {
      if (profile) {
        // Sanitize incoming profile to convert nulls to empty strings for controlled components
        const sanitized: any = { ...profile };
        Object.keys(sanitized).forEach(key => {
          if (sanitized[key] === null) sanitized[key] = '';
        });
        setFormData(prev => ({
          ...prev,
          ...sanitized,
          classId: profile.classId ? profile.classId.toString() : ''
        }));
        if (profile.gradeId) {
          setSelectedGradeId(profile.gradeId.toString());
        }
      }
    });

    // Fetch classes for selection so students can pick their exact classroom
    api.getClasses().then(setClasses);
  }, [router]);

  const filteredClasses = selectedGradeId 
    ? classes.filter(c => c.grade?.id?.toString() === selectedGradeId)
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.initials && formData.nameWithInitials && formData.dob && formData.gender && formData.classId;
      case 2:
        return formData.birthCertificateNumber && formData.religion && formData.nationality;
      case 3:
        return formData.address && formData.guardianName && formData.guardianNic && formData.guardianContact;
      case 4:
        return formData.bloodGroup && formData.medicalHistory;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (isStepValid()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      alert("Please fill in all required fields in this section.");
    }
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const profileToSave: StudentProfile = {
        ...formData as StudentProfile,
        username: user.username,
        // Ensure numeric IDs are sent correctly to avoid 400 Bad Request
        gradeId: selectedGradeId ? parseInt(selectedGradeId) : undefined,
        classId: formData.classId ? parseInt(formData.classId as any) : undefined
      };
      await api.saveStudentProfile(user.username, profileToSave);
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
                value={formData.fullName || ''}
                onChange={handleInputChange}
                placeholder="e.g. Pathirage Don Kamal Perera"
                required
              />
              <Input 
                label="Initials" 
                name="initials"
                value={formData.initials || ''}
                onChange={handleInputChange}
                placeholder="e.g. P.D.K."
                required
              />
              <Input 
                label="Name with Initials" 
                name="nameWithInitials"
                value={formData.nameWithInitials || ''}
                onChange={handleInputChange}
                placeholder="e.g. P.D.K. Perera"
                required
              />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Gender</label>
                <select 
                  name="gender"
                  className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  value={formData.gender || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <Input 
                label="Date of Birth" 
                type="date"
                name="dob"
                value={formData.dob || ''}
                onChange={handleInputChange}
                required
              />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 font-bold uppercase tracking-tight text-[10px]">Applying Grade</label>
                <select 
                  className={`w-full h-11 px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-medium text-slate-600 ${formData.gradeId ? 'bg-slate-50 cursor-not-allowed opacity-80' : ''}`}
                  value={selectedGradeId || ''}
                  onChange={(e) => {
                    setSelectedGradeId(e.target.value);
                    setFormData(prev => ({ ...prev, classId: undefined }));
                  }}
                  disabled={!!formData.gradeId}
                  required
                >
                  <option value="">Select Grade (1-13)</option>
                  {Array.from(new Set(classes.map(c => c.grade).filter(Boolean).map(g => JSON.stringify(g))))
                    .map(gStr => JSON.parse(gStr))
                    .sort((a, b) => (a.id || 0) - (b.id || 0))
                    .map(grade => (
                      <option key={grade.id} value={grade.id}>{grade.name}</option>
                    ))
                  }
                </select>
                {formData.gradeId && (
                  <p className="text-[10px] text-indigo-500 font-bold mt-1 uppercase tracking-tight"> Officially assigned by admin</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 font-bold uppercase tracking-tight text-[10px]">Specific Class</label>
                <select 
                  name="classId"
                  className={`w-full h-11 px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-medium text-slate-600 ${formData.classId ? 'bg-slate-50 cursor-not-allowed opacity-80' : ''}`}
                  value={formData.classId || ''}
                  onChange={handleInputChange}
                  disabled={!selectedGradeId || !!formData.classId}
                  required
                >
                  <option value="">Select Class (A, B, C...)</option>
                  {filteredClasses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {formData.classId && (
                  <p className="text-[10px] text-indigo-500 font-bold mt-1 uppercase tracking-tight"> Officially assigned by admin</p>
                )}
              </div>
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
                value={formData.birthCertificateNumber || ''}
                onChange={handleInputChange}
                required
              />
              <Input 
                label="NIC Number (Optional for under 16)" 
                name="nic"
                value={formData.nic || ''}
                onChange={handleInputChange}
                placeholder="e.g. 200512345678"
              />
              <Input 
                label="Religion" 
                name="religion"
                value={formData.religion || ''}
                onChange={handleInputChange}
                placeholder="e.g. Buddhist"
                required
              />
              <Input 
                label="Nationality" 
                name="nationality"
                value={formData.nationality || ''}
                onChange={handleInputChange}
                required
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
                value={formData.address || ''}
                onChange={handleInputChange}
                placeholder="Full residential address"
                required
              />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Guardian Full Name" 
                name="guardianName"
                value={formData.guardianName || ''}
                onChange={handleInputChange}
                required
              />
              <Input 
                label="Guardian NIC" 
                name="guardianNic"
                value={formData.guardianNic || ''}
                onChange={handleInputChange}
                required
              />
              <Input 
                label="Guardian Contact Number" 
                name="guardianContact"
                value={formData.guardianContact || ''}
                onChange={handleInputChange}
                required
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
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  required
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
                <label className="block text-sm font-medium text-slate-700">Special Medical History / Allergies (Enter 'None' if not applicable)</label>
                <textarea 
                  name="medicalHistory"
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all min-h-[120px]"
                  value={formData.medicalHistory || ''}
                  onChange={handleInputChange}
                  placeholder="Mention any chronic illnesses, regular medications or severe allergies..."
                  required
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
        <h1 className="text-3xl font-bold text-slate-900 font-handlee">
          {formData.profileCompleted ? 'Update Your Student Profile' : 'Complete Your Student Profile'}
        </h1>
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

      {formData.verificationStatus === 'NEEDS_CORRECTION' && (
        <div className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-6 flex flex-col gap-3 shadow-lg shadow-rose-100/50 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3 text-rose-600 font-black uppercase tracking-widest text-xs">
            <AlertCircle size={18} />
            Teacher's Correction Needed
          </div>
          <p className="text-rose-800 font-medium italic">
            "{formData.verificationComment || 'Please review your details and correct any errors identified by your teacher.'}"
          </p>
        </div>
      )}

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
              disabled={!isStepValid()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 group"
            >
              <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
              {formData.profileCompleted ? 'Update My Profile' : 'Complete Registration'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
