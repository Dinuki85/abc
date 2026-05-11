'use client';

import { AlertCircle, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await api.login(username, password);

      if (user) {
        // Handle redirection based on role and status
        if (user.role === 'ROLE_STUDENT') {
          if (user.firstLogin) {
            router.push('/change-password');
            return;
          }
          const profile = await api.getStudentProfile(username);
          if (!profile || !profile.profileCompleted) {
            router.push('/dashboard/student/profile-setup');
          } else {
            router.push('/dashboard/student');
          }
        } else if (user.role === 'ROLE_TEACHER' || user.role === 'ROLE_STAFF') {
          // Staff workflow: Profile Setup -> Then Password Change
          const profile = await api.getTeacherProfile(user.username);
          if (!profile || !profile.profileCompleted) {
            router.push('/dashboard/teacher/profile-setup');
          } else if (user.firstLogin) {
            router.push('/change-password');
          } else {
            router.push(user.role === 'ROLE_TEACHER' ? '/teacher' : '/staff');
          }
        } else if (user.role === 'ROLE_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('User Name or Password Incorrect');
      }
    } catch (err) {
      setError('User Name or Password Incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden font-inter">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl mix-blend-multiply" />
      
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-medium group z-50 scale-90"
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-50 transition-colors border border-slate-100">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="hidden sm:inline">Back to Home</span>
      </Link>
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 flex flex-col items-center">
        <div className="text-center mb-4">
          <Link href="/" className="inline-block mb-2">
            <div className="relative p-1 bg-white rounded-2xl border-2 border-blue-100 shadow-sm">
              <img src="/img/favicon.png" alt="AMV Logo" className="w-16 h-16 object-contain" />
            </div>
          </Link>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase max-w-[320px] mx-auto">
            Andiambalama Maha Vidhyalaya
          </h1>
          <h2 className="mt-1 text-sm font-bold text-blue-600 tracking-[0.2em] uppercase">
            Portal Access
          </h2>
          
          <div className="mt-4" />
        </div>

        <div className="bg-white/70 backdrop-blur-2xl py-8 px-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] sm:rounded-[2.5rem] border border-white/60 w-full relative overflow-hidden group/card">
          {/* Subtle accent light */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
          
          <form className="space-y-5 relative z-10" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}


            <div className="space-y-3">
              <div className="relative group">
                <label htmlFor="username" className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1 ml-1">
                  User Name
                </label>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Index No / NIC" 
                    id="username" 
                    className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-sm font-bold"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="password" className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    id="password" 
                    className="pl-10 pr-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-sm font-bold [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[11px] font-bold text-slate-500 uppercase cursor-pointer">
                  Remember
                </label>
              </div>

              <button 
                type="button"
                onClick={() => alert("Please contact your school office for password support.")}
                className="text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider"
              >
                Help?
              </button>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full h-12 text-sm shadow-xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:shadow-blue-200/50 transition-all active:scale-[0.98] rounded-2xl border-none"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] opacity-80">
              Institutional Security Protocol
            </p>
          </div>
        </div>
      </div>
    </div>


  );
}

