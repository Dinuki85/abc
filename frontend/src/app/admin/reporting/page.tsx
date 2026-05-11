"use client";

import { 
  FileSpreadsheet, Users, HeartHandshake, Activity, 
  Award, Phone, FileCheck, Layers, BookCheck, 
  GraduationCap, Heart, Landmark, Users2, 
  UserCheck, ShieldCheck, BookOpen, Contact, 
  Briefcase, Calendar, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const reports = [
  // All School Data
  { name: 'All Student List', icon: Users, desc: 'Complete registry', color: '#17a2b8' },
  { name: 'Welfare Payment', icon: HeartHandshake, desc: 'Financial status', color: '#17a2b8' },
  { name: 'Health Report', icon: Activity, desc: 'Medical records', color: '#17a2b8' },
  { name: 'Skill Matrix', icon: Award, desc: 'Competency tracking', color: '#17a2b8' },
  { name: 'Contact Directory', icon: Phone, desc: 'Guardian contacts', color: '#17a2b8' },
  
  // Categorization
  { name: 'Section List', icon: Layers, desc: 'Grade distribution', color: '#d97706' },
  { name: 'Subject List', icon: BookCheck, desc: 'Enrollment stats', color: '#d97706' },
  { name: 'Scholarship Roll', icon: GraduationCap, desc: 'Merit recipients', color: '#d97706' },
  { name: 'Religion List', icon: Heart, desc: 'Demographic data', color: '#d97706' },
  { name: 'Nationality List', icon: Landmark, desc: 'Origin tracking', color: '#d97706' },
  
  // Categorization Cont. + Teachers
  { name: 'Gender List', icon: Users2, desc: 'Diversity metrics', color: '#d97706' },
  { name: 'Exam Report', icon: FileCheck, desc: 'Academic results', color: '#6f42c1' },
  { name: 'Class Teachers', icon: UserCheck, desc: 'Assignment records', color: '#6f42c1' },
  { name: 'Teacher Incharge', icon: ShieldCheck, desc: 'Lead roles list', color: '#6f42c1' },
  { name: 'Subject Wise List', icon: BookOpen, desc: 'Teacher expertise', color: '#6f42c1' },

  // CVs & Files
  { name: 'Student CV', icon: Contact, desc: 'Personal portfolio', color: '#343a40' },
  { name: 'Teacher CV', icon: Briefcase, desc: 'Professional record', color: '#343a40' },
  { name: 'Guardian CV', icon: Heart, desc: 'Profile details', color: '#343a40' },
  { name: 'Teacher Timetable', icon: Calendar, desc: 'Period schedule', color: '#343a40' },
];

export default function ReportingPage() {
  return (
    <div className="h-full grid grid-cols-5 grid-rows-4 gap-3 p-0.5 animate-in fade-in duration-700">
      {reports.map((report, i) => {
        const Icon = report.icon;
        return (
          <Link key={i} href="#" className="block group">
            <div
              className="h-full bg-white rounded-2xl p-3.5 flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden cursor-pointer"
              style={{ borderColor: `${report.color}25` }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = report.color;
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = `0 8px 25px -8px ${report.color}35`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${report.color}25`;
                el.style.transform = '';
                el.style.boxShadow = '';
              }}
            >
              {/* Ghost watermark icon */}
              <Icon
                className="absolute -bottom-3 -right-3 pointer-events-none transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.08]"
                style={{ width: 64, height: 64, color: report.color }}
              />

              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${report.color}15`, color: report.color }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${report.color}15`, color: report.color }}
                >
                  <ArrowRight size={12} strokeWidth={3} />
                </div>
              </div>

              <div className="mt-1">
                <h3 className="text-[14px] font-black tracking-tight leading-tight text-black uppercase transition-colors duration-200">
                  {report.name}
                </h3>
                <p className="text-[10px] font-black text-black mt-0.5 leading-snug opacity-70 line-clamp-1">
                  {report.desc}
                </p>
              </div>

              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ backgroundColor: report.color }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
