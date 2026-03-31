'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, MapPin, Phone, UserRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { mockApi } from '@/lib/mock-api';

export default function ProfileSetupPage() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = mockApi.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else if (currentUser.profileCompleted && currentUser.verificationStatus !== 'NEEDS_CORRECTION') {
      router.push('/dashboard/student');
    } else {
      setUser(currentUser);
      if (currentUser.profileData) {
        setAddress(currentUser.profileData.address);
        setParentName(currentUser.profileData.parentName);
        setParentContact(currentUser.profileData.parentContact);
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!address || !parentName || !parentContact) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const success = mockApi.updateProfile(user.username, {
        address,
        parentName,
        parentContact
      });
      if (success) {
        router.push('/dashboard/student');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-[2rem] overflow-hidden border border-slate-100">
          <div className="bg-primary p-8 text-white">
            <h2 className="text-3xl font-bold font-handlee">Complete Your Profile</h2>
            <p className="mt-2 text-white/80"> Please provide your accurate personal details for school verification.</p>
          </div>

          <div className="p-8 sm:p-10">
            {user.verificationStatus === 'NEEDS_CORRECTION' && (
              <div className="mb-8 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Correction Required</p>
                  <p className="text-sm opacity-90">{user.verificationComment || 'Please review and update your information as requested by the staff.'}</p>
                </div>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Input 
                      label="Full Name" 
                      value={user.fullName} 
                      disabled 
                      className="bg-slate-50 font-medium"
                    />
                     <Input 
                      label="Index Number" 
                      value={user.username} 
                      disabled 
                      className="bg-slate-50 font-medium"
                    />
                  </div>

                  <div className="relative">
                    <Input 
                      label="Permanent Address" 
                      placeholder="Enter your full home address" 
                      id="address" 
                      className="pl-10 h-12"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 top-[34px] flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                    <UserRound className="h-5 w-5 text-primary" />
                    Parent / Guardian Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <Input 
                        label="Parent Name" 
                        placeholder="Father or Mother's Name" 
                        id="parentName" 
                        className="pl-10 h-12"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        disabled={isLoading}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 top-[34px] flex items-center pointer-events-none">
                        <UserRound className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>

                    <div className="relative">
                      <Input 
                        label="Contact Number" 
                        placeholder="07XXXXXXXX" 
                        id="parentContact" 
                        className="pl-10 h-12"
                        required
                        value={parentContact}
                        onChange={(e) => setParentContact(e.target.value)}
                        disabled={isLoading}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 top-[34px] flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg shadow-lg font-bold uppercase tracking-widest rounded-2xl"
                  isLoading={isLoading}
                >
                  Submit Details for Verification
                </Button>
                <p className="text-center text-slate-400 text-xs mt-4 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Your information is secured and only visible to authorized staff.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
