import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, CalendarDays } from 'lucide-react';

export default function ExamsPage() {
  const exams = [
    { id: 'EX-23-01', name: 'Midterm Science (10th)', date: 'Nov 12, 2023', duration: '120 mins', maxMarks: '100', status: 'Upcoming' },
    { id: 'EX-23-02', name: 'Final Math (11th)', date: 'Dec 05, 2023', duration: '180 mins', maxMarks: '100', status: 'Draft' },
    { id: 'EX-23-03', name: 'Quarterly History (9th)', date: 'Sep 15, 2023', duration: '90 mins', maxMarks: '50', status: 'Completed' },
    { id: 'EX-23-04', name: 'AP Physics Mock', date: 'Oct 20, 2023', duration: '180 mins', maxMarks: '120', status: 'Grading' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 flex items-center gap-3">
            <CalendarDays className="text-rose-600" size={32} /> Examination Schedule
          </h1>
          <p className="text-slate-500 mt-1">
            Plan, monitor, and manage school-wide assessments
          </p>
        </div>
        <Button className="shrink-0 group bg-rose-600 hover:bg-rose-700">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Schedule Exam
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Max Marks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium text-slate-700">{exam.id}</TableCell>
                  <TableCell className="font-semibold text-slate-800">{exam.name}</TableCell>
                  <TableCell className="text-slate-600">{exam.date}</TableCell>
                  <TableCell className="text-slate-500">{exam.duration}</TableCell>
                  <TableCell>{exam.maxMarks}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                      ${exam.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                        exam.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 
                        exam.status === 'Grading' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {exam.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
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
