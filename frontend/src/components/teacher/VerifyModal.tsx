'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { X, CheckCircle2, AlertCircle, MessageSquare, User, MapPin, ShieldCheck, HeartPulse } from 'lucide-react';
import { api } from '@/lib/api';

interface VerifyModalProps {
  student: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function VerifyModal({ student, onClose, onSuccess }: VerifyModalProps) {
  const [status, setStatus] = useState<'VERIFIED' | 'NEEDS_CORRECTION'>('VERIFIED');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.verifyStudent(student.id, status, comment);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to update verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const InfoBlock = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
    <div className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
        <Icon size={14} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
      <div className="my-auto bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight">Student Audit Portal</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Index: {student.username}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Student Profile Data */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <User size={14} className="text-blue-500" />
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoBlock label="Full Name" value={student.fullName} icon={User} />
                <InfoBlock label="Name with Initials" value={student.nameWithInitials} icon={User} />
                <InfoBlock label="Date of Birth" value={student.dob} icon={ShieldCheck} />
                <InfoBlock label="Gender" value={student.gender} icon={User} />
                <InfoBlock label="Nationality" value={student.nationality} icon={ShieldCheck} />
                <InfoBlock label="Religion" value={student.religion} icon={ShieldCheck} />
              </div>
            </section>

            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <MapPin size={14} className="text-blue-500" />
                Contact & Identification
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InfoBlock label="Permanent Address" value={student.address} icon={MapPin} />
                </div>
                <InfoBlock label="Birth Certificate No" value={student.birthCertificateNumber} icon={ShieldCheck} />
                <InfoBlock label="NIC" value={student.nic} icon={ShieldCheck} />
                <InfoBlock label="Guardian Name" value={student.guardianName} icon={User} />
                <InfoBlock label="Guardian Contact" value={student.guardianContact} icon={MapPin} />
              </div>
            </section>

            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <HeartPulse size={14} className="text-rose-500" />
                Medical Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoBlock label="Blood Group" value={student.bloodGroup} icon={HeartPulse} />
                <div className="md:col-span-2 p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                   <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Medical History / Allergies</p>
                   <p className="text-sm font-bold text-slate-700">{student.medicalHistory || 'No reported history'}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Verification Action */}
          <div className="lg:border-l lg:pl-8 space-y-6">
            <div className="p-4 rounded-3xl bg-blue-50 border border-blue-100 mb-6">
               <p className="text-xs font-bold text-blue-600 leading-relaxed">
                 Verify that all provided details match the physical documents submitted by the student.
               </p>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold border border-rose-100 flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">
                Decision
              </label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setStatus('VERIFIED')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    status === 'VERIFIED' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                      : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'VERIFIED' ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-black text-sm uppercase tracking-wider">Verified</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('NEEDS_CORRECTION')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    status === 'NEEDS_CORRECTION' 
                      ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm' 
                      : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'NEEDS_CORRECTION' ? 'bg-rose-500 text-white' : 'bg-slate-100'}`}>
                    <AlertCircle size={20} />
                  </div>
                  <span className="font-black text-sm uppercase tracking-wider">Reject</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">
                Auditor's Notes
              </label>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm min-h-[150px] font-bold"
                placeholder="Required if rejecting, optional if verifying..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-4">
          <Button variant="ghost" className="flex-1 rounded-2xl font-bold" onClick={onClose} disabled={isSubmitting}>
            Discard Audit
          </Button>
          <Button 
            className={`flex-1 rounded-2xl font-black uppercase tracking-widest shadow-lg ${status === 'VERIFIED' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'}`} 
            isLoading={isSubmitting} 
            onClick={handleSubmit}
          >
            {status === 'VERIFIED' ? 'Confirm Verification' : 'Issue Correction'}
          </Button>
        </div>
      </div>
    </div>
  );
}
