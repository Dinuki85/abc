'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
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
      // In the backend, we use Student ID. Let's make sure we have it.
      // Based on our Student entity, we might need to find the student ID from the username if not provided.
      // Actually, my api.verifyStudent takes studentId (number).
      // I'll assume the student object passed has an 'id'.
      await api.verifyStudent(student.id, status, comment);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to update verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-500" />
            Verify Student: {student.user?.username || student.username}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-medium border border-rose-100 flex items-center gap-2">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Verification Status
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStatus('VERIFIED')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  status === 'VERIFIED' 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                    : 'border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <CheckCircle2 size={24} />
                <span className="font-bold text-sm">Verified</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus('NEEDS_CORRECTION')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  status === 'NEEDS_CORRECTION' 
                    ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm' 
                    : 'border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <AlertCircle size={24} />
                <span className="font-bold text-sm">Action Needed</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Comments / Feedback
            </label>
            <textarea
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm min-h-[120px]"
              placeholder="Provide feedback to the student..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-4">
          <Button variant="ghost" className="flex-1" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-emerald-600 hover:bg-emerald-500" 
            isLoading={isSubmitting} 
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
