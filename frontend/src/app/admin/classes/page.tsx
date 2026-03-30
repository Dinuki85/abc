import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ClassesPage() {
  const classes = [
    { classId: 'CLS-10A', grade: '10th', section: 'A', room: '104', teacher: 'Dr. Sarah Jenkins', capacity: '30', enrolled: '28' },
    { classId: 'CLS-10B', grade: '10th', section: 'B', room: '105', teacher: 'Michael Chang', capacity: '30', enrolled: '29' },
    { classId: 'CLS-11A', grade: '11th', section: 'A', room: '201', teacher: 'Elena Rodriguez', capacity: '25', enrolled: '25' },
    { classId: 'CLS-09C', grade: '9th', section: 'C', room: '043', teacher: 'James Wilson', capacity: '35', enrolled: '33' },
    { classId: 'CLS-12A', grade: '12th', section: 'A', room: '301', teacher: 'Anita Desai', capacity: '25', enrolled: '22' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Classes Directory
          </h1>
          <p className="text-slate-500 mt-1">
            Organize grades, sections, classrooms and assigned teachers
          </p>
        </div>
        <Button className="shrink-0 group">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Create Class
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Sections</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Grade & Section</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Homeroom Teacher</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((c) => (
                <TableRow key={c.classId}>
                  <TableCell className="font-medium text-slate-700">{c.classId}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-slate-800">{c.grade}</span> - Section {c.section}
                  </TableCell>
                  <TableCell>{c.room}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{c.teacher}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                      ${parseInt(c.enrolled) === parseInt(c.capacity) ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {c.enrolled} / {c.capacity}
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
    </div>
  );
}
