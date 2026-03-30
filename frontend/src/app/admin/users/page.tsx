import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, ShieldCog } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { id: 'USR-001', username: 'admin', role: 'Super Admin', email: 'admin@educonnect.edu', lastLogin: '10 mins ago', status: 'Active' },
    { id: 'USR-002', username: 's.jenkins', role: 'Principal', email: 's.jenkins@educonnect.edu', lastLogin: '2 hours ago', status: 'Active' },
    { id: 'USR-003', username: 'm.chang', role: 'Teacher', email: 'm.chang@educonnect.edu', lastLogin: '1 day ago', status: 'Active' },
    { id: 'USR-004', username: 'temp_staff', role: 'Staff', email: 'temp@educonnect.edu', lastLogin: '1 month ago', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 flex items-center gap-3">
            <ShieldCog className="text-teal-600" size={32} /> User Access
          </h1>
          <p className="text-slate-500 mt-1">
            Manage system roles, permissions, and accounts
          </p>
        </div>
        <Button className="shrink-0 group bg-teal-600 hover:bg-teal-700">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Create User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>System Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium text-slate-700">{u.id}</TableCell>
                  <TableCell className="font-mono text-slate-800">{u.username}</TableCell>
                  <TableCell>
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${u.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 
                        u.role === 'Principal' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500">{u.email}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{u.lastLogin}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                      ${u.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <span className={`h-2 w-2 rounded-full mr-1.5 ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {u.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-teal-600">
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
