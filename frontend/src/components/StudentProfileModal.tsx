import React, { useEffect, useState } from 'react';
import { X, User, MapPin, Phone, GraduationCap, Calendar, Shield, Activity, Star, Info } from 'lucide-react';
import { api } from '@/lib/api';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string; // The index number or username
}

export function StudentProfileModal({ isOpen, onClose, username }: StudentProfileModalProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && username) {
      setLoading(true);
      api.searchAdminStudent(username)
        .then(data => setProfile(data))
        .catch(err => console.error("Error fetching student details:", err))
        .finally(() => setLoading(false));
    } else {
      setProfile(null);
    }
  }, [isOpen, username]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Student Profile</h2>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                Index: <span className="font-mono bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">{username}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">Loading profile data...</p>
            </div>
          ) : profile ? (
            <div className="space-y-8">
              
              {/* Primary Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Info size={14} className="text-blue-500" /> General Details
                  </h3>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <DetailRow label="Full Name" value={profile.fullName} />
                    <DetailRow label="Name with Initials" value={profile.nameWithInitials} />
                    <DetailRow label="Date of Birth" value={profile.dob} />
                    <DetailRow label="Gender" value={profile.gender} />
                    <DetailRow label="Religion" value={profile.religion} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Shield size={14} className="text-emerald-500" /> Guardian Info
                  </h3>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <DetailRow label="Guardian Name" value={profile.guardianName} />
                    <DetailRow label="Relationship" value={profile.guardianRelationship} />
                    <DetailRow label="Occupation" value={profile.guardianOccupation} />
                    <DetailRow label="Emergency Contact" value={profile.contactEmergency || profile.guardianContact} />
                  </div>
                </div>
              </div>

              {/* Contact & Address */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <MapPin size={14} className="text-orange-500" /> Contact & Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="space-y-3">
                    <DetailRow label="Permanent Address" value={profile.addressPermanent} />
                    <DetailRow label="Home Phone" value={profile.contactHome} />
                  </div>
                  <div className="space-y-3">
                    <DetailRow label="Temporary Address" value={profile.addressTemporary} />
                    <DetailRow label="Mobile Phone" value={profile.contactMobile} />
                    <DetailRow label="Distance to School" value={profile.distanceToSchool} />
                  </div>
                </div>
              </div>

              {/* Physical & Health */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Activity size={14} className="text-rose-500" /> Health & Physical
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex flex-col items-center justify-center text-center">
                     <span className="text-[10px] uppercase font-black tracking-widest text-rose-400 mb-1">Blood Type</span>
                     <span className="text-xl font-bold text-rose-600">{profile.bloodType || 'N/A'}</span>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
                     <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Height</span>
                     <span className="text-xl font-bold text-slate-700">{profile.height || 'N/A'}</span>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
                     <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Weight</span>
                     <span className="text-xl font-bold text-slate-700">{profile.weight || 'N/A'}</span>
                   </div>
                </div>
                {(profile.specialPhysicalCondition || profile.specialIllness || profile.longTermDisease || profile.specialNeed) && (
                  <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200/50 space-y-2">
                     <DetailRow label="Special Condition" value={profile.specialPhysicalCondition} />
                     <DetailRow label="Special Illness" value={profile.specialIllness} />
                     <DetailRow label="Long Term Disease" value={profile.longTermDisease} />
                     <DetailRow label="Special Needs" value={profile.specialNeed} />
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-400">
              <User size={48} className="opacity-20" />
              <p className="font-medium">Student profile not found or incomplete.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: any }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
      <span className="text-xs font-bold text-slate-400 min-w-[140px] uppercase tracking-wider">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}
