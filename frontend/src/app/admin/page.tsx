"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
  Users, Briefcase, Layers, Landmark, GraduationCap,
  Settings, UserPlus, Activity, FileSpreadsheet, ArrowRight, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const user = api.getCurrentUser();
    setCurrentUser(user);

    if (user && (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF')) {
      api.getStaffProfile()
        .then(p => { if (p?.name) setCurrentUser((prev: any) => ({ ...prev, fullName: p.name })); })
        .catch(() => {});
    }

    api.getAdminStats().then(setStats);
  }, []);

  if (!mounted) return null;

  const statItems = [
    { label: 'Students',       value: stats?.totalStudents ?? 0,      icon: GraduationCap, bg: '#e6f7f9', color: '#17a2b8' },
    { label: 'Academic Staff', value: stats?.academicStaffCount ?? 0, icon: Briefcase,     bg: '#fff9e6', color: '#d49e00' },
    { label: 'Non-Academic',   value: 0,                              icon: Users,         bg: '#e9eaeb', color: '#343a40' },
    { label: 'Sections',       value: stats?.totalSections ?? 0,      icon: Landmark,      bg: '#e6f7f9', color: '#138496' },
    { label: 'Class Rooms',    value: stats?.totalClassRooms ?? 0,    icon: Layers,        bg: '#fff9e6', color: '#d49e00' },
  ];

  const modules = [
    { title: 'Administration', sub: 'Create Your School Basic Profile', href: '/admin/institutional', icon: Settings,        variant: 'indigo'  },
    { title: 'Registration',   sub: 'Add Students and Staff',           href: '/admin/registration',  icon: UserPlus,        variant: 'emerald' },
    { title: 'Performance',    sub: 'Enter Performance',                href: '/admin/performance',   icon: Activity,        variant: 'amber'   },
    { title: 'Display',        sub: 'Reports and Analytics',            href: '/admin/reporting',     icon: FileSpreadsheet, variant: 'rose'    },
  ];

  return (
    /*
     * Layout contract:
     *   Viewport height  = 588px
     *   Shared navbar    =  80px  (h-20, rendered by AdminLayout)
     *   Remaining height = 508px  ← this div must fit exactly here
     *
     * Internal budget (px, approximate):
     *   top padding      =  16
     *   Welcome section  = 100
     *   gap              =  12
     *   Stats row        =  92
     *   gap              =  12
     *   Buttons          = 236  (flex-1)
     *   footer           =  18
     *   bottom padding   =  16
     *                    = 502  ✓ (6px breathing room)
     */
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: '#ffffff' }}
    >



      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <main
        className="flex-1 flex flex-col overflow-hidden relative z-10"
        style={{ padding: '12px 32px 12px', gap: 12 }}
      >

        {/* ── 1. WELCOME & STATS ──────────────────────────────── */}
        <div
          className="amv-fadeup flex-shrink-0 flex flex-col justify-center gap-4 relative overflow-hidden group/banner"
          style={{
            background: 'linear-gradient(to right, #111424, #1a1f35)',
            borderRadius: 20,
            padding: '20px 24px',
            boxShadow: '0 12px 30px -8px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Subtle Background Glows for premium feel */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl opacity-50 group-hover/banner:opacity-70 transition-opacity duration-700"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50 group-hover/banner:opacity-70 transition-opacity duration-700"></div>
          </div>

          {/* Greeting */}
          <div className="relative z-10 flex items-center gap-4 pl-2">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-xl p-2 shrink-0">
              <img src="/img/favicon.png" alt="AMV Logo" className="w-full h-full object-contain filter drop-shadow-lg amv-logo-float" />
            </div>
            <div className="flex flex-col">
              <h2 className="tracking-wide" style={{ 
                fontSize: 'clamp(20px, 2.2vw, 28px)', 
                fontWeight: 800, 
                color: '#f8fafc',
                lineHeight: 1.1,
                margin: 0,
              }}>
                Welcome To{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900,
                  textShadow: '0 2px 10px rgba(129, 140, 248, 0.2)'
                }}>
                  Andiambalama
                </span>{' '}
                Maha Vidhyalaya
              </h2>
            </div>
          </div>

          {/* Stats Cards Inside Banner */}
          <div className="flex w-full gap-4 relative z-10 mt-0">
            {statItems.map((s, i) => (
              <div 
                key={i} 
                className="amv-fadeup-1 flex flex-col items-center flex-1 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group/card cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: '12px 10px',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div 
                  className="transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6"
                  style={{
                    background: s.color === '#343a40' ? 'rgba(255,255,255,0.12)' : `${s.color}35`,
                    borderRadius: 14,
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}
                >
                  <s.icon size={22} color={s.color === '#343a40' ? '#cbd5e1' : s.color} strokeWidth={2.5} className="group-hover/card:animate-pulse" />
                </div>
                <div style={{ 
                  color: '#ffffff', 
                  fontSize: 'clamp(22px, 2.2vw, 28px)', 
                  fontWeight: 900, 
                  lineHeight: 1, 
                  marginBottom: 6,
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  {s.value.toLocaleString()}
                </div>
                <div style={{ 
                  color: '#94a3b8', 
                  fontSize: 10, 
                  fontWeight: 700, 
                  letterSpacing: '0.12em', 
                  textTransform: 'uppercase',
                  textAlign: 'center'
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. MODULE BUTTONS ────────────────────────────── */}
        <div
          className="amv-fadeup-2 grid flex-1 min-h-0"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}
        >
          {modules.map((m, i) => (
            <Link key={i} href={m.href} className={`amv-btn amv-btn-${m.variant}`} style={{ padding: '12px 12px' }}>
              <span className="amv-btn-arrow"><ArrowRight size={14} /></span>
              <div className="amv-btn-icon" style={{ width: 48, height: 48, borderRadius: 14, marginBottom: 4 }}>
                <m.icon size={24} strokeWidth={2} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="amv-btn-title" style={{ fontSize: 'clamp(13px, 1.4vw, 18px)', letterSpacing: '0.02em' }}>{m.title}</span>
                <span className="amv-btn-sub" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>({m.sub})</span>
              </div>
            </Link>
          ))}
        </div>


      </main>
    </div>
  );
}
