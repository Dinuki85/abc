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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Classes Directory
          </h1>
          <p className="text-slate-500 mt-1">
            Organize grades, sections, and assigned teachers
          </p>
        </div>
        <Button className="shrink-0 group" onClick={() => setShowModal(true)}>
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Create Class
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Academic Sections</CardTitle>
          <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">
            {classes.length} Classes
          </span>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Index</TableHead>
                <TableHead>Grade & Section</TableHead>
                <TableHead>Homeroom Teacher</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="font-bold text-slate-700">ID: {c.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Home size={14} />
                       </div>
                       <span className="font-bold text-slate-800">{c.grade?.name}</span> - {c.name}
                    </div>
                  </TableCell>
                  <TableCell className={c.classTeacher ? "text-indigo-600 font-bold" : "text-slate-400 italic text-sm"}>
                    {c.classTeacher?.name || 'Unassigned'}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
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
      )}
    </div>
  );
}
