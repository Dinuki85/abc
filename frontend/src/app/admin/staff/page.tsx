import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function StaffPage() {
  const staffMembers = [
    { id: 'STF-001', name: 'Dr. Sarah Jenkins', role: 'Principal', department: 'Administration', email: 's.jenkins@educonnect.edu' },
    { id: 'STF-002', name: 'Michael Chang', role: 'Senior Teacher', department: 'Science', email: 'm.chang@educonnect.edu' },
    { id: 'STF-003', name: 'Elena Rodriguez', role: 'Teacher', department: 'Mathematics', email: 'e.rodriguez@educonnect.edu' },
    { id: 'STF-004', name: 'James Wilson', role: 'Counselor', department: 'Student Welfare', email: 'j.wilson@educonnect.edu' },
    { id: 'STF-005', name: 'Anita Desai', role: 'Librarian', department: 'Resources', email: 'a.desai@educonnect.edu' },
  ];

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
        <Button className="shrink-0 group">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Add New Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium text-slate-700">{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {staff.role}
                    </span>
                  </TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell className="text-slate-500">{staff.email}</TableCell>
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
