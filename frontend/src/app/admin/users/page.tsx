'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, ShieldCog, Search, UserPlus, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const users = [
    { id: 'USR-001', username: 'admin', role: 'Super Admin', email: 'admin@educonnect.edu', lastLogin: '10 mins ago', status: 'Active' },
    { id: 'USR-002', username: 's.jenkins', role: 'Principal', email: 's.jenkins@educonnect.edu', lastLogin: '2 hours ago', status: 'Active' },
    { id: 'USR-003', username: 'm.chang', role: 'Teacher', email: 'm.chang@educonnect.edu', lastLogin: '1 day ago', status: 'Active' },
    { id: 'USR-004', username: 'temp_staff', role: 'Staff', email: 'temp@educonnect.edu', lastLogin: '1 month ago', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      {/* Premium Compact Header - Snap-to-Top Perfection */}
      <div className="sticky top-0 z-40 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-4 bg-slate-50/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm mb-8">
        <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-6 bg-white p-5 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50">
          
          <div className="flex items-center gap-5 px-3">
            <div className="w-14 h-14 bg-teal-500/10 rounded-[1.5rem] flex items-center justify-center text-teal-600 shadow-inner">
              <ShieldCog size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tighter leading-none">
                User Access
              </h1>
              <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
                System Role & Permission Engine
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            <div className="relative flex-1 lg:min-w-[400px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Search username or email..." 
                className="pl-14 h-14 w-full rounded-2xl border-gray-100 bg-slate-50/50 focus:bg-white focus:ring-teal-500/20 focus:border-teal-600 shadow-inner transition-all text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button 
              className="h-14 px-8 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 group active:scale-95 transition-all text-xs"
            >
              <UserPlus size={20} className="mr-3 group-hover:scale-110 transition-transform" />
              Create User
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>System Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium text-slate-700">{u.id}</TableCell>
                  <TableCell className="font-mono text-slate-800">{u.username}</TableCell>
                  <TableCell>
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${u.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 
                        u.role === 'Principal' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500">{u.email}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{u.lastLogin}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                      ${u.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <span className={`h-2 w-2 rounded-full mr-1.5 ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {u.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-teal-600">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
