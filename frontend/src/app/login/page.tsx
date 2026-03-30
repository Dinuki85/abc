import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl mix-blend-multiply" />
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            EduConnect
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-slate-900 tracking-tight">
            Sign in to your account
          </h2>
          <p className="max-w-xl mt-2 text-sm text-slate-500">
            Enter your credentials to access the administrative portal
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-white/50">
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="admin@educonnect.edu" 
                  id="email" 
                  className="pl-10" 
                />
                <div className="absolute inset-y-0 left-0 pl-3 top-[28px] flex items-center pt-1 pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div className="relative">
                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  id="password" 
                  className="pl-10" 
                />
                <div className="absolute inset-y-0 left-0 pl-3 top-[28px] flex items-center pt-1 pointer-events-none">
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
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <Link href="/admin">
                <Button type="button" className="w-full h-11 text-base shadow-md">
                  Sign in to Portal
                </Button>
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-50 text-slate-500 rounded-full">Secure Staff Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
