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
      {/* Background school-colored decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#17a2b8]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-[#ffc107]/10 blur-[100px] pointer-events-none" />
      
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-black hover:text-[#17a2b8] transition-all font-black group z-50 scale-90"
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[#17a2b8]/5 transition-colors border-2 border-black">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform stroke-[3]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em]">Return Home</span>
      </Link>

      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 flex flex-col items-center">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-3">
            <div className="relative p-2 bg-white rounded-[2rem] border-2 border-[#17a2b8] shadow-[0_8px_20px_-10px_rgba(23,162,184,0.3)] group transition-transform hover:scale-105 duration-500">
              {/* Inner amber glow */}
              <div className="absolute inset-0 rounded-[2rem] border-4 border-[#ffc107]/20 pointer-events-none" />
              <img src="/img/favicon.png" alt="AMV Logo" className="w-20 h-20 object-contain relative z-10" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-[#343a40] tracking-tight leading-tight uppercase max-w-[360px] mx-auto">
            Andiambalama <span className="text-[#17a2b8]">Maha</span> Vidhyalaya
          </h1>
          <h2 className="mt-2 text-[10px] font-black text-[#ffc107] tracking-[0.4em] uppercase opacity-0 h-0 overflow-hidden">
            Portal Access
          </h2>
        </div>

        <div className="bg-white/70 backdrop-blur-3xl py-10 px-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] sm:rounded-[3rem] border border-white/60 w-full relative overflow-hidden">
          {/* Subtle school-colored accent light */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#17a2b8]/5 rounded-full blur-3xl" />
          
          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <label htmlFor="username" className="block text-[11px] font-black text-black uppercase tracking-[0.15em] mb-2 ml-1">
                  Credentials ID
                </label>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Index Number / NIC" 
                    id="username" 
                    className="pl-12 h-12 border-slate-300 bg-white/50 focus:bg-white focus:border-[#17a2b8] focus:ring-0 transition-all text-sm font-black text-black rounded-2xl shadow-sm placeholder:text-slate-400"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-black group-focus-within:text-[#17a2b8] transition-colors" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="password" title="Secure Encryption Active" className="block text-[11px] font-black text-black uppercase tracking-[0.15em] mb-2 ml-1 flex items-center gap-1.5">
                  Secure Password
                </label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    id="password" 
                    className="pl-12 pr-12 h-12 border-slate-300 bg-white/50 focus:bg-white focus:border-[#17a2b8] focus:ring-0 transition-all text-sm font-black text-black rounded-2xl shadow-sm [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden placeholder:text-slate-400"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-black group-focus-within:text-[#17a2b8] transition-colors" />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-black hover:text-[#17a2b8] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center group/check cursor-pointer">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#17a2b8] focus:ring-[#17a2b8] border-black rounded-lg cursor-pointer transition-all"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[11px] font-black text-black uppercase tracking-widest cursor-pointer group-hover/check:opacity-70">
                  Stay Signed In
                </label>
              </div>


              <button 
                type="button"
                onClick={() => alert("Please contact your school office for password support.")}
                className="text-[11px] font-black text-[#17a2b8] hover:text-[#138496] uppercase tracking-widest transition-colors"
              >
                Access Support?
              </button>
            </div>


            <div>
              <Button 
                type="submit" 
                className="w-full h-12 text-sm shadow-[0_10px_25px_-5px_rgba(23,162,184,0.4)] font-black uppercase tracking-[0.3em] bg-gradient-to-r from-[#17a2b8] to-[#138496] hover:scale-[1.02] transition-all active:scale-[0.98] rounded-2xl border-none text-white"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


