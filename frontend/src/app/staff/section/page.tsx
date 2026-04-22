'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { ShieldCheck, Users, FileCheck, CheckCircle2, Clock, MoreVertical, LayoutGrid, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SectionHeadPage() {
  const [profile, setProfile] = useState<any>(null);
  const [gradeData, setGradeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const staffProfile = await api.getStaffProfile();
      setProfile(staffProfile);
      
      const section = staffProfile?.assignedSection;
      if (section) {
        // Find all classes for this grade
        const allClasses = await api.getClasses();
        const sectionClasses = allClasses.filter((c: any) => c.grade?.id === section.id);
        
        setGradeData({
          ...section,
          classes: sectionClasses
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400 font-bold animate-pulse">Loading Section Data...</div>;
  }

  const sectionClasses = gradeData?.classes || [];

  return (
    <div className="space-y-8 font-nunito animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <PageHeader 
             title={`${gradeData?.name || 'Section'} Audit Console`} 
             description="Management overview for all classes within your designated section."
           />
        </div>
        <div className="flex items-center gap-2 px-6 py-3 rounded-3xl bg-emerald-50 border border-emerald-100 shadow-sm shadow-emerald-500/10">
           <ShieldCheck className="text-emerald-500" size={20} />
           <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Section Authority</p>
              <p className="text-xs font-bold text-slate-700">{profile?.staff?.name}</p>
           </div>
        </div>
      </div>

      {/* Section Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none bg-blue-600 text-white shadow-xl shadow-blue-500/20 group relative overflow-hidden">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
           <Users size={24} className="mb-4 text-blue-100" />
           <p className="text-3xl font-black mb-1">{sectionClasses.length}</p>
           <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Active Classes</p>
        </Card>
        
        <Card className="p-6 border-none bg-slate-900 text-white shadow-xl shadow-slate-900/20 group relative overflow-hidden">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
           <Clock size={24} className="mb-4 text-slate-400" />
           <p className="text-3xl font-black mb-1">94%</p>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overall Completion</p>
        </Card>

        <Card className="p-6 border-none bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 group relative overflow-hidden">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
           <FileCheck size={24} className="mb-4 text-emerald-100" />
           <p className="text-3xl font-black mb-1">0</p>
           <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Discrepancies</p>
        </Card>
      </div>

      {/* Class List Table */}
      <Card className="p-0 border-none bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
           <h3 className="font-bold text-slate-800 flex items-center gap-3">
              <LayoutGrid size={20} className="text-blue-600" />
              Classes in Section
           </h3>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-50">
              <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] pl-8">Class Token</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Head Teacher</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Registration Progress</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] text-right pr-8">Audit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {sectionClasses.map((item: any) => (
                <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                   <TableCell className="pl-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {item.name}
                         </div>
                         <div>
                            <p className="font-bold text-slate-800">Grade {item.grade?.name} - {item.name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Token ID: #{item.id}</p>
                         </div>
                      </div>
                   </TableCell>
                   <TableCell>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                         <p className="font-bold text-slate-700 text-sm">{item.classTeacher?.name || 'Unassigned'}</p>
                      </div>
                   </TableCell>
                   <TableCell>
                      <div className="space-y-1.5 w-32">
                         <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <span>Progress</span>
                            <span>100%</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-full shadow-sm shadow-emerald-500/20" />
                         </div>
                      </div>
                   </TableCell>
                   <TableCell className="text-right pr-8">
                      <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all active:scale-95 group/btn">
                         <ChevronRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                   </TableCell>
                </TableRow>
             ))}
          </TableBody>
        </Table>
      </Card>
      
      <div className="p-8 rounded-[3rem] bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
         <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
               <ShieldCheck className="text-blue-400" />
               Section Audit Protocol
            </h3>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              As Section Head, you are responsible for the final audit of all student data within this grade level. Once each Class Teacher completes their verification, the status will appear here for your oversight. Ensure all enrollment metrics align with the government standards.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Grade 6 Section is fully verified
               </div>
               <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2">
                  <Clock size={16} className="text-amber-400" />
                  Upcoming: Intake Report Phase
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
