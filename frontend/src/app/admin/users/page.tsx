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
      <div className="max-w-[1600px] mx-auto bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col xl:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600">
            <ShieldCog size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-black tracking-tighter leading-none">
              User Access
            </h1>
            <p className="text-[9px] text-black font-black uppercase tracking-[0.2em] mt-1">
              System Role & Permission Engine
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 lg:min-w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Search user or email..." 
              className="pl-12 h-12 w-full rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all text-xs font-bold text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button 
            className="h-12 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black uppercase tracking-widest active:scale-95 transition-all text-[10px]"
          >
            <UserPlus size={16} className="mr-2" />
            Create User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-black font-black">System Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 shadow-sm">
              <TableRow className="border-none">
                <TableHead className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black">User ID</TableHead>
                <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black">Username</TableHead>
                <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black">System Role</TableHead>
                <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black">Email</TableHead>
                <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black">Last Activity</TableHead>
                <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black">Status</TableHead>
                <TableHead className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-black text-black">{u.id}</TableCell>
                  <TableCell className="font-mono font-bold text-black">{u.username}</TableCell>
                  <TableCell>
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${u.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 
                        u.role === 'Principal' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-black font-bold">{u.email}</TableCell>
                  <TableCell className="text-black font-bold text-[10px] uppercase">{u.lastLogin}</TableCell>
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
