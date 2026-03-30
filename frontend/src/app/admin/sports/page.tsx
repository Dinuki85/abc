import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Award } from 'lucide-react';

export default function SportsPage() {
  const sports = [
    { id: 'SPT-01', name: 'Basketball', coach: 'Coach Carter', schedule: 'Mon, Wed 4:00 PM', location: 'Main Gymnasium', activeStudents: '24' },
    { id: 'SPT-02', name: 'Soccer', coach: 'Mike Johnson', schedule: 'Tue, Thu 4:00 PM', location: 'Outdoor Field', activeStudents: '35' },
    { id: 'SPT-03', name: 'Swimming', coach: 'Sarah Phelps', schedule: 'Mon, Fri 3:30 PM', location: 'Aquatics Center', activeStudents: '18' },
    { id: 'SPT-04', name: 'Track & Field', coach: 'Usain Bolt', schedule: 'Wed, Fri 4:00 PM', location: 'Running Track', activeStudents: '42' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 items-center flex gap-3">
            <Award className="text-blue-600" size={32} /> Sports Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Athletic programs, scheduling, and teams management
          </p>
        </div>
        <Button className="shrink-0 group">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Add Program
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Athletics Roster</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sport ID</TableHead>
                <TableHead>Sport Name</TableHead>
                <TableHead>Lead Coach</TableHead>
                <TableHead>Practice Schedule</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Athletes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sports.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-slate-700">{p.id}</TableCell>
                  <TableCell className="font-bold text-slate-800">{p.name}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{p.coach}</TableCell>
                  <TableCell className="text-slate-500 text-sm whitespace-pre-wrap">{p.schedule}</TableCell>
                  <TableCell>{p.location}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                      {p.activeStudents}
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
