'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  Search, 
  GraduationCap, 
  ChevronRight,
  UserCheck2,
  CalendarDays,
  LayoutGrid,
  List,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { mockApi, MockStudent, Grade, Class } from '@/lib/mock-api';
import { Input } from '@/components/ui/Input';

export default function ClassesViewPage() {
  const router = useRouter();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [students, setStudents] = useState<MockStudent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState<MockStudent | null>(null);

  useEffect(() => {
    const currentUser = mockApi.getCurrentUser();
    if (!currentUser || currentUser.role !== 'TEACHER') {
      router.push('/login');
    } else {
      setStaff(currentUser);
      setGrades(mockApi.getGrades());
    }
  }, [router]);

  const onGradeChange = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    setSelectedClassId('');
    setStudents([]);
    if (gradeId) {
      setAvailableClasses(mockApi.getClassesByGrade(parseInt(gradeId)));
    } else {
      setAvailableClasses([]);
    }
  };

  const onClassChange = (classId: string) => {
    setSelectedClassId(classId);
    if (classId) {
      setStudents(mockApi.getStudentsByClass(parseInt(classId)));
    } else {
      setStudents([]);
    }
  };

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!staff) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Staff Header */}
       <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg rotate-3">
             <LayoutGrid size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Class Management Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2 text-right">
            <span className="text-sm font-bold text-slate-900 leading-none">{staff.fullName}</span>
            <span className="text-[11px] text-primary font-bold uppercase tracking-wider">Academic Staff</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Filter Controls */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
           <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="flex-grow space-y-4 w-full">
                 <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                    <Users className="text-primary w-8 h-8" />
                    Student Class Explorer
                 </h1>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Select Grade</label>
                       <div className="relative">
                          <select 
                            className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                            value={selectedGradeId}
                            onChange={(e) => onGradeChange(e.target.value)}
                          >
                            <option value="">Choose Grade...</option>
                            {grades.map(g => (
                              <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Select Class</label>
                       <div className="relative">
                          <select 
                            className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none disabled:opacity-50"
                            value={selectedClassId}
                            onChange={(e) => onClassChange(e.target.value)}
                            disabled={!selectedGradeId}
                          >
                            <option value="">Select Class...</option>
                            {availableClasses.map(c => (
                              <option key={c.id} value={c.id}>Class {c.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Quick Search</label>
                       <div className="relative">
                          <Input 
                             placeholder="Search in class..." 
                             className="h-14 pl-12 rounded-2xl"
                             value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}
                             disabled={!selectedClassId}
                          />
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Student Grid */}
        {!selectedClassId ? (
          <div className="h-[400px] bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-10">
             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 text-slate-200 shadow-sm">
                <LayoutGrid size={40} />
             </div>
             <h3 className="text-2xl font-bold text-slate-300">Choose a Grade and Class</h3>
             <p className="text-slate-400 font-medium mt-2 max-w-sm">Use the filters above to view and manage students assigned to specific classes.</p>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {filteredStudents.map((student) => (
                <div key={student.username} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[3rem] group-hover:bg-primary/10 transition-colors" />
                   
                   <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white text-xl font-bold font-handlee shadow-lg shadow-primary/20">
                         {student.fullName.charAt(0)}
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">{student.fullName}</h4>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{student.username}</p>
                      </div>
                   </div>

                   <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 p-2 rounded-xl">
                         <span>Verification</span>
                         <span className="text-emerald-500 flex items-center gap-1">
                            Verified <UserCheck2 size={12} />
                         </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 p-2 rounded-xl">
                         <span>Attendance</span>
                         <span className="text-slate-700">92%</span>
                      </div>
                   </div>

                   <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                       <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5 rounded-xl">
                         View Profile
                       </Button>
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                          <ExternalLink size={16} />
                       </div>
                   </div>
                </div>
             ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
             <div className="w-20 h-20 bg-rose-50 text-rose-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users size={40} />
             </div>
             <h3 className="text-2xl font-bold text-slate-800">No Students Found</h3>
             <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2">No students have been assigned to this class yet, or your search didn't match any records.</p>
             <Button 
               variant="outline" 
               className="mt-8 rounded-xl"
               onClick={() => router.push('/dashboard/teacher/assign-class')}
             >
               Assign Students Now
             </Button>
          </div>
        )}
      </main>
    </div>
  );
}
