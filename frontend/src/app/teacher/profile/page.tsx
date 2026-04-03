'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { ShieldCheck, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

export default function TeacherProfilePage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-200">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Security</h1>
          <p className="text-slate-500 font-medium text-sm">Manage your teacher portal credentials and password.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
            : 'bg-rose-50 text-rose-700 border-rose-100'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="font-bold text-sm">{message.text}</p>
        </div>
      )}

      <Card className="border-none shadow-2xl shadow-slate-200/60 overflow-hidden rounded-[2rem]">
        <div className="bg-slate-50/50 p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest text-xs">
            <Lock size={16} className="text-cyan-500" />
            Update Portal Password
          </h3>
        </div>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Secure Password</label>
              <Input 
                type="password"
                placeholder="Enter at least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-14 font-bold rounded-2xl bg-slate-50 border-none pl-6 shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
              <Input 
                type="password"
                placeholder="Repeat your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-14 font-bold rounded-2xl bg-slate-50 border-none pl-6 shadow-inner"
              />
            </div>
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl font-black uppercase tracking-wider bg-cyan-600 hover:bg-cyan-700 text-white shadow-xl shadow-cyan-100 transition-all active:scale-[0.98]" 
                isLoading={isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
        <AlertCircle className="text-amber-600 shrink-0" size={24} />
        <div className="space-y-1">
          <p className="font-bold text-amber-900 text-sm tracking-tight">Protect Your Account</p>
          <p className="text-amber-700 text-[11px] leading-relaxed font-medium">
            Your teacher portal has access to sensitive student data. 
            Always use a unique password and never share your credentials with others.
          </p>
        </div>
      </div>
    </div>
  );
}
