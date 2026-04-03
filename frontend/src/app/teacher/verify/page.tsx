'use client';

import React, { useEffect, useState } from 'react';
import { api, StudentProfile } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import { User as UserIcon, HeartPulse, CheckCircle2, FileCheck, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function VerifiedStudentsPage() {
  const [myGrade, setMyGrade] = useState<any>(null);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const gradeData = await api.getMyGrade();
      setMyGrade(gradeData);
      
      if (gradeData && gradeData.id) {
        const studentData = await api.getStudentsByGrade(gradeData.id);
        const verifiedOnly = studentData.filter((s: StudentProfile) => s.verificationStatus === 'VERIFIED');
        setStudents(verifiedOnly);
      }
    } catch (error) {
      console.error('Error fetching verified students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
      <PageHeader 
        title="Verified Students Archive" 
        description="A complete record of all fully verified students within your assigned grade."
      />

      <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <FileCheck size={28} className="text-emerald-500" />
            <h2 className="text-2xl font-black text-slate-800 tracking-tight font-fredoka">
              Completed Audits
            </h2>
          </div>
          <div className="relative w-full md:w-96">
            <Input 
              placeholder="Search by name or index..." 
              className="h-12 w-full bg-slate-50 border-slate-100 rounded-xl pl-12 text-sm font-bold placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="py-24 text-center text-slate-400 font-bold">Loading records...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="py-24 text-center text-slate-400 font-bold flex flex-col items-center justify-center">
            <CheckCircle2 size={48} className="text-slate-200 mb-4" />
            No verified records found matching your search.
        </div>
      ) : (
        <div className="space-y-8 mt-8">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
              
              {/* Header inside loop */}
              <div className="p-6 md:p-8 bg-emerald-50/30 border-b border-emerald-50 flex flex-col justify-between items-start gap-4 relative">
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 size={12} /> VERIFIED
                  </div>
                  <div className="flex items-center gap-4 relative z-10 w-full pr-24">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-200 shrink-0">
                       {student.fullName.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 font-fredoka leading-tight mb-2">{student.fullName}</h3>
                       <div className="flex flex-wrap gap-2">
                           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                               {student.username}
                           </span>
                           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-200 bg-white shadow-sm">
                               Class {student.className || 'N/A'}
                           </span>
                       </div>
                    </div>
                  </div>
              </div>

              {/* Data Tables */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                  {/* Identity Data Table */}
                  <div className="w-full overflow-hidden border border-slate-200 rounded-xl">
                    <Table className="bg-white">
                      <TableBody>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                          <TableCell colSpan={2} className="py-3 px-4 border-b border-slate-200">
                             <div className="flex items-center gap-2 text-slate-800">
                                 <UserIcon size={14} className="text-slate-500" />
                                 <h4 className="font-black text-xs uppercase tracking-widest font-fredoka">Essential Identity</h4>
                             </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">Date of Birth</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.dob || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">Gender</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.gender || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">Religion</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.religion || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">NIC Number</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.nic || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">Birth Certificate</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.birthCertificateNumber || 'Not provided'}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Health & Contact Data Table */}
                  <div className="w-full overflow-hidden border border-rose-100 rounded-xl">
                    <Table className="bg-white">
                      <TableBody>
                        <TableRow className="bg-rose-50/50 hover:bg-rose-50/50">
                          <TableCell colSpan={2} className="py-3 px-4 border-b border-rose-100/50">
                             <div className="flex items-center gap-2 text-rose-800">
                                 <HeartPulse size={14} className="text-rose-500" />
                                 <h4 className="font-black text-xs uppercase tracking-widest font-fredoka">Health & Contact</h4>
                             </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-rose-400 uppercase tracking-widest bg-rose-50/30">Medical Profile</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-rose-900">{student.medicalHistory || 'None reported.'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-rose-400 uppercase tracking-widest bg-rose-50/30">Blood Group</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-rose-900">{student.bloodGroup || 'Unknown'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">Guardian Name</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.guardianName || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">Contact Info</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.guardianContact || 'No contact'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-3 px-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">Address</TableCell>
                          <TableCell className="py-3 px-4 font-bold text-xs text-slate-800">{student.address || 'Not provided'}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
