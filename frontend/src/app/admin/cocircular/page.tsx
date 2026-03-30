import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, LibraryBig } from 'lucide-react';

export default function CocircularPage() {
  const activities = [
    { id: 'ACT-01', name: 'Debate Club', advisor: 'Mr. John Adams', schedule: 'Thu 3:30 PM', meetingRoom: 'Rm 102', members: '15' },
    { id: 'ACT-02', name: 'Robotics Team', advisor: 'Dr. Sarah Jenkins', schedule: 'Tue, Thu 4:00 PM', meetingRoom: 'Science Lab', members: '22' },
    { id: 'ACT-03', name: 'Drama Society', advisor: 'Ms. Emily Blunt', schedule: 'Mon 3:30 PM', meetingRoom: 'Auditorium', members: '30' },
    { id: 'ACT-04', name: 'Chess Club', advisor: 'Mr. Kasparov', schedule: 'Wed 3:30 PM', meetingRoom: 'Library', members: '12' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 flex items-center gap-3">
            <LibraryBig className="text-indigo-600" size={32} /> Co-curricular Programs
          </h1>
          <p className="text-slate-500 mt-1">
            Manage student clubs, societies, and other non-academic activities
          </p>
        </div>
        <Button className="shrink-0 group bg-indigo-600 hover:bg-indigo-700">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Add Activity
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clubs & Societies Directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Advisor</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-slate-700">{a.id}</TableCell>
                  <TableCell className="font-bold text-slate-800">{a.name}</TableCell>
                  <TableCell className="text-slate-600 font-medium">{a.advisor}</TableCell>
                  <TableCell className="text-slate-500 text-sm">{a.schedule}</TableCell>
                  <TableCell>{a.meetingRoom}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      {a.members}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
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
