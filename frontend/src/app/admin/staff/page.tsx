"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Edit2, Trash2, X, CheckCircle2, AlertCircle, ShieldUser, User, Search, UserPlus, Eye, Briefcase, GraduationCap, ChevronRight, Filter, FileSpreadsheet } from 'lucide-react';
import { api } from '@/lib/api';

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('CLASS_TEACHER');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTeacherOverview();
      setStaffMembers(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.createTeacher(name, username, password, designation);
      setMessage({ type: 'success', text: 'Staff account created successfully!' });
      setName('');
      setUsername('');
      setPassword('');
      setDesignation('CLASS_TEACHER');
      setShowModal(false);
      fetchStaff();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create staff member' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;
    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.updateTeacher(editingStaff.id, name, designation);
      setMessage({ type: 'success', text: 'Staff profile updated successfully!' });
      setShowEditModal(false);
      setName('');
      setDesignation('CLASS_TEACHER');
      setEditingStaff(null);
      fetchStaff();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff member? This will also remove their institutional access.')) return;
    try {
      await api.deleteTeacher(id);
      setMessage({ type: 'success', text: 'Staff member removed successfully!' });
      fetchStaff();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete record' });
    }
  };

  const openEditModal = (staff: any) => {
    setEditingStaff(staff);
    setName(staff.name);
    setDesignation(staff.designation || 'CLASS_TEACHER'); 
    setShowEditModal(true);
  };

  const filteredStaff = staffMembers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Briefcase size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight font-handlee">
              Staff Registry
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-15">
            Institutional personnel and faculty management hub
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search by name or ID..." 
              className="pl-12 h-14 w-full lg:w-72 rounded-2xl border-gray-200 focus:ring-primary/20 focus:border-primary shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button 
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 group active:scale-95 transition-all"
            onClick={() => setShowModal(true)}
          >
            <UserPlus size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            Add New Staff
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 shadow-md ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          </div>
          <div>
            <p className="font-bold text-sm uppercase tracking-wide">System Notification</p>
            <p className="text-sm font-medium opacity-90">{message.text}</p>
          </div>
          <button onClick={() => setMessage(null)} className="ml-auto p-2 hover:bg-black/5 rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Content Table */}
      <Card className="rounded-[2.5rem] border-gray-100 shadow-xl overflow-hidden bg-white">
        <CardHeader className="px-8 py-6 flex flex-row items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-secondary rounded-full" />
            <CardTitle className="text-xl font-bold text-slate-800">Faculty & Personnel Directory</CardTitle>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-gray-100">
            <FileSpreadsheet size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {filteredStaff.length} Records Total
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Teacher ID</TableHead>
                  <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Name & Designation</TableHead>
                  <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Grade Focus</TableHead>
                  <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class Assignments</TableHead>
                  <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`loading-${i}`}>
                    <TableCell colSpan={5} className="px-8 py-8 animate-pulse">
                      <div className="h-4 bg-slate-100 rounded-full w-full" />
                    </TableCell>
                  </TableRow>
                ))}

                {!isLoading && filteredStaff.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                          <Search size={40} />
                        </div>
                        <p className="text-slate-400 font-medium italic">No personnel records found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && filteredStaff.map((staff) => (
                  <TableRow key={staff.id} className="hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="px-8 py-5 font-black text-primary font-mono tracking-tighter text-base">
                      {staff.username}
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{staff.name}</span>
                        <span className="text-[10px] font-black text-secondary-hover uppercase tracking-widest mt-0.5">
                          {staff.designation || 'Class Teacher'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest border border-slate-200">
                        {staff.gradeName || 'General'}
                      </span>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex flex-wrap gap-2">
                        {staff.classes && staff.classes.length > 0 ? (
                          staff.classes.map((cls: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/5 text-primary border border-primary/10 transition-all hover:bg-primary/10">
                              <span className="text-[9px] font-black uppercase tracking-tighter">{cls.className}</span>
                              <div className="h-3 w-px bg-primary/20" />
                              <span className="text-[9px] font-bold opacity-70">{cls.studentCount} St.</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-[9px] font-bold text-slate-300 italic uppercase tracking-widest">Unassigned</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm active:scale-90">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => openEditModal(staff)}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm active:scale-90"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(staff.id)}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm active:scale-90"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
          <div className="flex min-h-full items-center justify-center">
            <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30">
                    <UserPlus size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 font-handlee">Register Staff Member</h3>
                    <p className="text-sm text-slate-400 font-medium tracking-tight">Create faculty credentials and set institutional role</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreate} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Personnel Name</label>
                  <div className="relative">
                    <Input 
                      placeholder="e.g. Mr. Saman Kumara" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      className="h-14 pl-12 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Username / Index ID</label>
                    <Input 
                      placeholder="TEA-2024-001" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      required 
                      className="h-14 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner font-mono"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Temporary Password</label>
                    <div className="relative">
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="h-14 pl-12 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Institutional Designation</label>
                  <select 
                    value={designation} 
                    onChange={(e) => setDesignation(e.target.value)} 
                    required 
                    className="w-full h-14 bg-slate-50/50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-bold text-slate-700 shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                  >
                    <option value="CLASS_TEACHER">Class Teacher</option>
                    <option value="SUBJECT_TEACHER">Subject Teacher</option>
                    <option value="SECTION_HEAD">Section Head</option>
                    <option value="IT_TEACHER">IT Teacher</option>
                    <option value="SPORT_COACH">Sport Coach</option>
                    <option value="OFFICE_STAFF">Office Staff</option>
                    <option value="PRINCIPAL">Principal</option>
                  </select>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-16 rounded-3xl font-bold text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 bg-primary hover:bg-primary-hover text-white active:scale-95 transition-all" 
                    isLoading={isSubmitting}
                  >
                    Authorize & Create Account
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
          <div className="flex min-h-full items-center justify-center">
            <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                    <Edit2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 font-handlee">Modify Staff Profile</h3>
                    <p className="text-sm text-slate-400 font-medium tracking-tight">Update institutional information for faculty member</p>
                  </div>
                </div>
                <button onClick={() => setShowEditModal(false)} className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Update Full Name</label>
                  <div className="relative">
                    <Input 
                      placeholder="e.g. Mr. Saman Kumara" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      className="h-14 pl-12 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" size={20} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Update Designation</label>
                  <select 
                    value={designation} 
                    onChange={(e) => setDesignation(e.target.value)} 
                    required 
                    className="w-full h-14 bg-slate-50/50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                  >
                    <option value="CLASS_TEACHER">Class Teacher</option>
                    <option value="SUBJECT_TEACHER">Subject Teacher</option>
                    <option value="SECTION_HEAD">Section Head</option>
                    <option value="IT_TEACHER">IT Teacher</option>
                    <option value="SPORT_COACH">Sport Coach</option>
                    <option value="OFFICE_STAFF">Office Staff</option>
                    <option value="PRINCIPAL">Principal</option>
                  </select>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-16 rounded-3xl font-bold text-lg uppercase tracking-widest shadow-2xl shadow-indigo-500/30 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all" 
                    isLoading={isSubmitting}
                  >
                    Persist Profile Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
