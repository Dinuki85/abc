import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Mail, Phone } from 'lucide-react';

export default function ParentsPage() {
  const parents = [
    { id: 'PAR-492', name: 'Robert Smith', relation: 'Father', students: 'Alice Smith (10-A)', email: 'robert.s@example.com', phone: '+1(555)111-2222' },
    { id: 'PAR-493', name: 'Mary Jones', relation: 'Mother', students: 'Bobby Jones (10-B)', email: 'mary.j@example.com', phone: '+1(555)333-4444' },
    { id: 'PAR-494', name: 'David Lee', relation: 'Father', students: 'Charlie Lee (11-A)', email: 'david.lee@example.com', phone: '+1(555)555-6666' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Parents Directory
          </h1>
          <p className="text-slate-500 mt-1">
            Guardian contact info and linked student accounts
          </p>
        </div>
        <Button className="shrink-0 group">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Add Guardian
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Guardians</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parent ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Relation</TableHead>
                <TableHead>Linked Students</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parents.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-slate-700">{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm border border-slate-200">
                      {p.relation}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-blue-600">{p.students}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1 text-sm text-slate-500 text-xs">
                      <span className="flex items-center"><Mail size={12} className="mr-1"/> {p.email}</span>
                      <span className="flex items-center"><Phone size={12} className="mr-1"/> {p.phone}</span>
                    </div>
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
