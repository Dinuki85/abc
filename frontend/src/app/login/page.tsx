'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, User, AlertCircle } from 'lucide-react';
import { mockApi } from '@/lib/mock-api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = mockApi.login(username, password);

      if (user) {
        // Redirection logic based on user status
        if (user.role === 'STUDENT') {
          if (user.isFirstLogin) {
            router.push('/change-password');
          } else if (!user.profileCompleted) {
            router.push('/dashboard/student/profile-setup');
          } else {
            router.push('/dashboard/student');
          }
        } else if (user.role === 'TEACHER') {
          router.push('/dashboard/teacher/students');
        } else {
          router.push('/admin');
        }
      } else {
        setError('Invalid index number or password. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl mix-blend-multiply" />
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Andiambalama MV
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-slate-900 tracking-tight">
            Sign in to your account
          </h2>
          <p className="max-w-xl mt-2 text-sm text-slate-500">
            Enter your credentials to access the student or staff portal
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-white/50">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Input 
                  label="Index Number" 
                  type="text" 
                  placeholder="e.g. STU2024001" 
                  id="username" 
                  className="pl-10 h-11"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 left-0 pl-3 top-[32px] flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div className="relative">
                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  id="password" 
                  className="pl-10 h-11"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 left-0 pl-3 top-[32px] flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Need Help?
                </Link>
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base shadow-md font-bold uppercase tracking-wider"
                isLoading={isLoading}
              >
                Sign in to Portal
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-50 text-slate-500 rounded-full">Secure Student & Staff Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

