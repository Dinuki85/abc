'use client';

import { AlertCircle, Lock, User, ArrowLeft } from 'lucide-react';
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await api.login(username, password);

      if (user) {
        // Handle redirection based on role and status
        if (user.firstLogin) {
          router.push('/change-password');
          return;
        }

        if (user.role === 'ROLE_STUDENT') {
          const profile = await api.getStudentProfile(username);
          if (!profile || !profile.profileCompleted) {
            router.push('/dashboard/student/profile-setup');
          } else {
            router.push('/dashboard/student');
          }
        } else if (user.role === 'ROLE_TEACHER') {
          router.push('/teacher');
        } else if (user.role === 'ROLE_ADMIN') {
          router.push('/admin');
        } else if (user.role === 'ROLE_STAFF') {
          router.push('/staff');
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden font-inter">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl mix-blend-multiply" />
      
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-medium group z-50"
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-50 transition-colors border border-slate-100">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="hidden sm:inline">Back to Home</span>
      </Link>
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img src="/img/favicon.png" alt="AMV Logo" className="w-24 h-24 object-contain mx-auto" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            Welcome Andiambalama Maha Vidhyalaya - Negombo
          </h1>
          <h2 className="mt-2 text-lg font-bold text-blue-600 tracking-widest uppercase">
            LOGIN TO AMV
          </h2>
          
          <div className="mt-6 space-y-1">
            <p className="text-xs font-semibold text-slate-600 bg-slate-200/50 py-1.5 px-4 rounded-full inline-block">
              Student: Use Your Index No as User Name
            </p>
            <br />
            <p className="text-xs font-semibold text-slate-600 bg-slate-200/50 py-1.5 px-4 rounded-full inline-block">
              Staff: Use Your NIC No Without English Letter as User Name
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-2xl sm:rounded-3xl border border-white/50">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div className="relative group">
                <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
                  User Name (Index No)
                </label>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Enter Index No / NIC" 
                    id="username" 
                    className="pl-11 h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-base font-medium"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    id="password" 
                    className="pl-11 h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-base font-medium"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button 
                  type="button"
                  onClick={() => alert("Please contact your school office for password support.")}
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Need Help?
                </button>
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full h-14 text-lg shadow-lg font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
                isLoading={isLoading}
              >
                Login
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-slate-500">
              Do Not Have Password ? Contact Your School Office
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

