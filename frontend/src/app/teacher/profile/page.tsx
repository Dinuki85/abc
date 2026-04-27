'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { ShieldCheck, CheckCircle2, AlertCircle, Lock, User } from 'lucide-react';

import StaffProfileForm from '@/components/teacher/StaffProfileForm';

export default function TeacherProfilePage() {
  const [pageTab, setPageTab] = useState<'security' | 'personal'>('personal');
  const [staffData, setStaffData] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const data = await api.getStaffProfile();
      if (data && data.staff) {
        setStaffData(data.staff);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSaveProfile = async (formData: any) => {
    try {
      await api.updateStaffProfile(formData);
      setMessage({ type: 'success', text: 'Profile details updated successfully!' });
      setStaffData(formData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const user = api.getCurrentUser();
      if (!user) throw new Error('Not logged in');
      
      const success = await api.changePassword(user.username, newPassword);
      if (success) {
        setMessage({ type: 'success', text: 'Password updated successfully! Please use your new password next time you log in.' });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Portal</h1>
            <p className="text-slate-500 font-medium tracking-tight">Manage your professional profile and account security.</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
           <button 
            onClick={() => setPageTab('personal')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              pageTab === 'personal' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
            }`}
           >
             Personal Details
           </button>
           <button 
            onClick={() => setPageTab('security')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              pageTab === 'security' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
            }`}
           >
             Security
           </button>
        </div>
      </div>

      {message && (
        <div className={`p-5 rounded-[1.5rem] flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 shadow-lg border ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
            : 'bg-rose-50 text-rose-700 border-rose-100'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          </div>
          <p className="font-black text-sm tracking-tight">{message.text}</p>
        </div>
      )}

      {pageTab === 'personal' && (
        isLoadingProfile ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-30">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-black text-xs uppercase tracking-[0.3em] text-indigo-900">Loading Profile Data</p>
          </div>
        ) : (
          <StaffProfileForm initialData={staffData} onSave={handleSaveProfile} />
        )
      )}

      {pageTab === 'security' && (
        <div className="max-w-2xl mx-auto py-10">
          <Card className="border-none shadow-2xl shadow-slate-200/60 overflow-hidden rounded-[3rem] bg-white">
            <div className="bg-slate-50/50 p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-800 flex items-center gap-3 uppercase tracking-[0.2em] text-xs">
                <Lock size={18} className="text-indigo-500" />
                Security Credentials
              </h3>
              <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Encrypted</div>
            </div>
            <CardContent className="p-10">
              <form onSubmit={handlePasswordSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">New Secure Password</label>
                  <Input 
                    type="password"
                    placeholder="Enter at least 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="h-14 font-bold rounded-2xl bg-slate-50 border-none pl-6 shadow-inner focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Confirm New Password</label>
                  <Input 
                    type="password"
                    placeholder="Repeat your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-14 font-bold rounded-2xl bg-slate-50 border-none pl-6 shadow-inner focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-100 transition-all active:scale-[0.98]" 
                    isLoading={isSubmitting}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-10 p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex gap-6 shadow-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0 shadow-inner">
              <AlertCircle size={24} />
            </div>
            <div className="space-y-2">
              <p className="font-black text-amber-900 text-sm tracking-tight uppercase">Data Privacy Notice</p>
              <p className="text-amber-700 text-[12px] leading-relaxed font-bold italic opacity-80">
                "Your teacher portal contains sensitive institutional and student data. 
                Frequent password updates and unique credentials ensure the integrity of the school system."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
