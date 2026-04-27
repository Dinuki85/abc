'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { api, User as ApiUser } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Lock, ShieldCheck, AlertCircle, User as UserIcon } from 'lucide-react';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<ApiUser | null>(null);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || !currentUser.firstLogin) {
      router.push('/login');
    } else {
      setUser(currentUser);
      if (currentUser.role === 'ROLE_TEACHER' || currentUser.role === 'ROLE_STAFF') {
        setNewUsername(currentUser.username);
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if ((user.role === 'ROLE_TEACHER' || user.role === 'ROLE_STAFF') && !newUsername && !user.username) {
      setError('NIC Number is required for staff account activation.');
      setIsLoading(false);
      return;
    }

    try {
      if (!user) throw new Error('User not found');
      // If newUsername is empty, use the current username
      const finalUsername = newUsername || user.username;
      const success = await api.changePassword(user.username, newPassword, finalUsername);
      if (success) {
        // Redirect based on role
        if (user.role === 'ROLE_STUDENT') {
          router.push('/dashboard/student/profile-setup');
        } else if (user.role === 'ROLE_TEACHER') {
          router.push('/teacher');
        } else if (user.role === 'ROLE_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('Failed to update password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="text-center mb-8">
          <ShieldCheck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Secure Your Account
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            For your security, you must change your temporary password before continuing.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-white/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {(user.role === 'ROLE_TEACHER' || user.role === 'ROLE_STAFF') && (
                <div className="relative">
                  <Input 
                    label="New Username (NIC Number)" 
                    type="text" 
                    placeholder="Enter your NIC" 
                    id="new-username" 
                    className="pl-10 h-11"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 top-[32px] flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-slate-400" />
                  </div>
                </div>
              )}

              <div className="relative">
                <Input 
                  label="New Password" 
                  type="password" 
                  placeholder="••••••••" 
                  id="new-password" 
                  className="pl-10 h-11"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 left-0 pl-3 top-[32px] flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div className="relative">
                <Input 
                  label="Confirm New Password" 
                  type="password" 
                  placeholder="••••••••" 
                  id="confirm-password" 
                  className="pl-10 h-11"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 left-0 pl-3 top-[32px] flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base shadow-md font-bold uppercase tracking-wider"
                isLoading={isLoading}
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
