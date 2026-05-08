"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Home } from 'lucide-react';
import { api } from '@/lib/api';

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [gradeId, setGradeId] = useState<number | ''>('');
  const [className, setClassName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchClasses();
    api.getGrades().then(setGrades);
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const data = await api.getClasses();
      setClasses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeId || !className) return;

    setIsSubmitting(true);
    try {
      await api.createClass(Number(gradeId), className);
      setShowModal(false);
      setGradeId('');
      setClassName('');
      fetchClasses();
    } catch (error) {
      console.error(error);
      alert("Failed to create class");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-[1600px] mx-auto bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col xl:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
            <Home size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-black tracking-tighter leading-none">
              Classes Directory
            </h1>
            <p className="text-[13px] text-black font-black uppercase tracking-[0.15em] mt-1">
              Academic Structure Management
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <Button 
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest active:scale-95 transition-all text-xs"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} className="mr-2" />
            Create Class
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-black font-black">Academic Sections</CardTitle>
          <span className="text-sm font-black bg-slate-100 text-black px-3 py-1 rounded-full uppercase tracking-widest">
            {classes.length} Classes
          </span>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 shadow-sm">
              <TableRow className="border-none">
                <TableHead className="px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Class Index</TableHead>
                <TableHead className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Grade & Section</TableHead>
                <TableHead className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Homeroom Teacher</TableHead>
                <TableHead className="py-4 text-sm font-black uppercase tracking-[0.15em] text-black">Status</TableHead>
                <TableHead className="px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-black text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5} className="h-16 animate-pulse bg-slate-50/50">&nbsp;</TableCell>
                  </TableRow>
                ))
              ) : classes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-slate-400 italic">No classes have been defined in the system yet.</TableCell>
                </TableRow>
              ) : classes.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-black text-black">ID: {c.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Home size={14} />
                       </div>
                       <span className="font-black text-black">{c.grade?.name}</span> - <span className="font-bold text-black">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className={c.classTeacher ? "text-indigo-600 font-black" : "text-black italic font-bold text-sm"}>
                    {c.classTeacher?.name || 'Unassigned'}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider
                      ${c.classTeacher ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                      {c.classTeacher ? 'Active' : 'Missing Staff'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
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

      {/* Create Class Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6">
            <Card className="w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300">
              <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex justify-between items-center">
                <span>Define New Class</span>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <Plus size={20} className="rotate-45" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Grade</label>
                  <select 
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={gradeId}
                    onChange={(e) => setGradeId(Number(e.target.value))}
                    required
                  >
                    <option value="">Choose Grade...</option>
                    {grades.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section / Class Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. 6-A, 8-B, Arts, or Mathematics"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 mt-4 font-bold" isLoading={isSubmitting}>
                  Create Academic Section
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      )}
    </div>
  );
}

