"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
  Users, Briefcase, Layers, Landmark, GraduationCap,
  Settings, UserPlus, Activity, FileSpreadsheet, ArrowRight
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
        style={{ padding: '16px 40px 14px', gap: 12 }}
      >

        {/* ── 1. WELCOME ───────────────────────────────────── */}
        <div
          className="amv-fadeup flex-shrink-0 flex items-center justify-center gap-8"
          style={{
            background: 'linear-gradient(135deg, #e8f8fb 0%, #fffef0 60%, #fff9e6 100%)',
            border: '2px solid #17a2b8',
            borderLeft: '6px solid #17a2b8',
            borderRadius: 20,
            padding: '14px 36px',
            boxShadow: '0 4px 20px rgba(23,162,184,0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background watermark */}
          <div style={{
            position: 'absolute', right: -20, top: -20,
            width: 120, height: 120,
            background: 'rgba(23,162,184,0.06)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 60, bottom: -30,
            width: 80, height: 80,
            background: 'rgba(255,193,7,0.08)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          {/* Floating Logo */}
          <div className="relative flex-shrink-0">
            <div
              className="amv-logo-float relative flex items-center justify-center bg-white"
              style={{ width: 84, height: 84, borderRadius: 24,
                border: '3px solid #17a2b8', boxShadow: '5px 5px 0px #17a2b8' }}
            >
              <img src="/img/favicon.png" alt="School Logo"
                style={{ width: 60, height: 60, objectFit: 'contain' }} />
            </div>
          </div>

          {/* School Name */}
          <div className="flex flex-col">
            <h2
              style={{ fontSize: 'clamp(20px, 3vw, 42px)', fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0, color: '#000' }}
            >
              Welcome To{' '}
              <span className="amv-gradient-text">Andiambalama</span>{' '}
              Maha Vidhyalaya
            </h2>
            <div style={{ height: 5, width: 80,
              background: 'linear-gradient(90deg,#17a2b8,#ffc107)',
              borderRadius: 3, marginTop: 10 }} />
          </div>
        </div>


        {/* ── 2. STATS ROW ─────────────────────────────────── */}
        <div
          className="amv-fadeup-1 flex-shrink-0 grid"
          style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}
        >
          {statItems.map((s, i) => (
            <div key={i} className="amv-stat-card" style={{ padding: '12px 8px', gap: 5 }}>
              <div className="amv-stat-icon" style={{ background: s.bg, color: s.color }}>
                <s.icon size={17} strokeWidth={2.5} />
              </div>
              <div className="amv-stat-val" style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}>
                {s.value.toLocaleString()}
              </div>
              <div className="amv-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── 3. MODULE BUTTONS ────────────────────────────── */}
        <div
          className="amv-fadeup-2 grid flex-1 min-h-0"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}
        >
          {modules.map((m, i) => (
            <Link key={i} href={m.href} className={`amv-btn amv-btn-${m.variant}`}>
              <span className="amv-btn-arrow"><ArrowRight size={14} /></span>
              <div className="amv-btn-icon" style={{ width: 44, height: 44, borderRadius: 13 }}>
                <m.icon size={22} strokeWidth={1.8} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="amv-btn-title">{m.title}</span>
                <span className="amv-btn-sub">({m.sub})</span>
              </div>
            </Link>
          ))}
        </div>


      </main>
    </div>
  );
}
