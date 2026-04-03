'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Edit2, Trash2, X, CheckCircle2, AlertCircle, ShieldUser, User } from 'lucide-react';
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
      setMessage({ type: 'success', text: 'Teacher account created successfully!' });
      setName('');
      setUsername('');
      setPassword('');
      setDesignation('CLASS_TEACHER');
      setShowModal(false);
      fetchStaff();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create teacher' });
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
      setMessage({ type: 'success', text: 'Teacher updated successfully!' });
      setShowEditModal(false);
      setName('');
      setDesignation('CLASS_TEACHER');
      setEditingStaff(null);
      fetchStaff();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update teacher' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this teacher? This will also delete their login account.')) return;
    try {
      await api.deleteTeacher(id);
      setMessage({ type: 'success', text: 'Teacher deleted successfully!' });
      fetchStaff();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete teacher' });
    }
  };

  const openEditModal = (staff: any) => {
    setEditingStaff(staff);
    setName(staff.name);
    // Determine designation from current data if possible, or default
    setDesignation('CLASS_TEACHER'); 
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Staff Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage teaching and administrative staff members
          </p>
        </div>
        <Button className="shrink-0 group" onClick={() => setShowModal(true)}>
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Add New Teacher
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory & Assignments</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher ID (Index)</TableHead>
                <TableHead>Teacher Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Assigned Classes (Students)</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5} className="h-16 animate-pulse bg-slate-50/50">&nbsp;</TableCell>
                  </TableRow>
                ))
              ) : staffMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-400 italic">No staff members found.</TableCell>
                </TableRow>
              ) : staffMembers.map((staff) => (
                <TableRow key={staff.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-bold text-indigo-600">{staff.username}</TableCell>
                  <TableCell className="font-medium text-slate-900">{staff.name}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                      {staff.gradeName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {staff.classes && staff.classes.length > 0 ? (
                        staff.classes.map((cls: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-tighter">{cls.className}</span>
                            <div className="h-3 w-px bg-indigo-200" />
                            <span className="text-[10px] font-bold">{cls.studentCount} students</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 italic uppercase">No classes assigned</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 group text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                      onClick={() => openEditModal(staff)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 group text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      onClick={() => handleDelete(staff.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ShieldUser className="text-primary" />
                Register New Teacher
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                   <Input 
                    placeholder="e.g. Mr. Saman Kumara" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="h-12 pl-10 rounded-xl"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username (Index)</label>
                <Input 
                  placeholder="e.g. TEA2024001" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  className="h-12 rounded-xl"
                />
                <p className="text-[10px] text-slate-400 ml-1">Recommend using TEA prefix for differentiation</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Designation</label>
                <select 
                  value={designation} 
                  onChange={(e) => setDesignation(e.target.value)} 
                  required 
                  className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat"
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
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Temporary Password</label>
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="h-12 rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full h-12 mt-6 rounded-xl font-bold uppercase tracking-wider" isLoading={isSubmitting}>
                Create Account
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Edit2 className="text-indigo-600" />
                Edit Teacher Details
              </h3>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingStaff(null);
                  setName('');
                }} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                   <Input 
                    placeholder="e.g. Mr. Saman Kumara" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="h-12 pl-10 rounded-xl"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Designation</label>
                <select 
                  value={designation} 
                  onChange={(e) => setDesignation(e.target.value)} 
                  required 
                  className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat"
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
              <Button type="submit" className="w-full h-12 mt-6 rounded-xl font-bold uppercase tracking-wider" isLoading={isSubmitting}>
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
