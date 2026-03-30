import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function StudentsPage() {
  const students = [
    { id: '10432', name: 'Alice Smith', grade: '10th', section: 'A', parentName: 'Robert Smith', status: 'Active' },
    { id: '10433', name: 'Bobby Jones', grade: '10th', section: 'B', parentName: 'Mary Jones', status: 'Active' },
    { id: '10434', name: 'Charlie Lee', grade: '11th', section: 'A', parentName: 'David Lee', status: 'Suspended' },
    { id: '10435', name: 'Diana Prince', grade: '9th', section: 'C', parentName: 'Hippolyta Prince', status: 'Active' },
    { id: '10436', name: 'Evan Baxter', grade: '12th', section: 'A', parentName: 'Joan Baxter', status: 'Graduated' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Student Register
          </h1>
          <p className="text-slate-500 mt-1">
            Search, filter, and manage student enrollments
          </p>
        </div>
        <Button className="shrink-0 group">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Enroll New Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Students</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Parent/Guardian</TableHead>
                <TableHead>State</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((st) => (
                <TableRow key={st.id}>
                  <TableCell className="font-medium text-slate-700">{st.id}</TableCell>
                  <TableCell>{st.name}</TableCell>
                  <TableCell>{st.grade}</TableCell>
                  <TableCell>{st.section}</TableCell>
                  <TableCell className="text-slate-500">{st.parentName}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${st.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                        st.status === 'Graduated' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                      {st.status}
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
