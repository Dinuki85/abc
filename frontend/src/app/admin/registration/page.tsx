"use client";

import { 
  UserCheck, Trophy, Calendar, GraduationCap, 
  BookCheck, ClipboardList, PlusCircle, Star
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function RegistrationPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
              <PlusCircle size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight font-handlee">
              Enrollment & Registration
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-15">
            Student & Faculty Dynamic Assignments
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Add To Classes', href: '/admin/registration/add-to-class', icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-50', hover: 'hover:border-orange-600 hover:shadow-orange-600/20', group: 'group-hover:bg-orange-600', desc: "Assign students to classes and register class positions." },
          { name: 'Add To Sport', href: '#', icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50', hover: 'hover:border-orange-600 hover:shadow-orange-600/20', group: 'group-hover:bg-orange-600', desc: "Register students for specific sports teams." },
          { name: 'Co-Activities', href: '#', icon: Star, color: 'text-orange-600', bg: 'bg-orange-50', hover: 'hover:border-orange-600 hover:shadow-orange-600/20', group: 'group-hover:bg-orange-600', desc: "Enroll students in societies and extra-curricular clubs." },
          { name: 'Time Table', href: '#', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50', hover: 'hover:border-orange-600 hover:shadow-orange-600/20', group: 'group-hover:bg-orange-600', desc: "Manage and assign period timetables." },
          { name: 'Scholarship Enr.', href: '#', icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-50', hover: 'hover:border-orange-600 hover:shadow-orange-600/20', group: 'group-hover:bg-orange-600', desc: "Register students for specific scholarships." },
          { name: 'Event Registration', href: '#', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50', hover: 'hover:border-orange-600 hover:shadow-orange-600/20', group: 'group-hover:bg-orange-600', desc: "Manage participation in school events." },
        ].map((btn, i) => (
          <Link key={i} href={btn.href}>
            <Card className={`transition-all cursor-pointer group rounded-[2rem] border-slate-100 shadow-sm h-full ${btn.hover}`}>
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all group-hover:text-white ${btn.color} ${btn.bg} ${btn.group}`}>
                    <btn.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">{btn.name}</h3>
                </div>
                <p className="text-sm text-slate-500 font-medium">{btn.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
