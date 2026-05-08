import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Mail, Phone, Users } from 'lucide-react';

export default function ParentsPage() {
  const parents = [
    { id: 'PAR-492', name: 'Robert Smith', relation: 'Father', students: 'Alice Smith (10-A)', email: 'robert.s@example.com', phone: '+1(555)111-2222' },
    { id: 'PAR-493', name: 'Mary Jones', relation: 'Mother', students: 'Bobby Jones (10-B)', email: 'mary.j@example.com', phone: '+1(555)333-4444' },
    { id: 'PAR-494', name: 'David Lee', relation: 'Father', students: 'Charlie Lee (11-A)', email: 'david.lee@example.com', phone: '+1(555)555-6666' },
  ];

  return (
      <div className="max-w-[1600px] mx-auto bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col xl:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-600">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-black tracking-tighter leading-none">
              Parents Directory
            </h1>
            <p className="text-[12px] text-black font-black uppercase tracking-[0.15em] mt-1">
              Guardian Contact & Student Links
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <Button 
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest active:scale-95 transition-all text-xs"
          >
            <Plus size={16} className="mr-2" />
            Add Guardian
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-black font-black">Registered Guardians</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 shadow-sm">
              <TableRow className="border-none">
                <TableHead className="px-8 py-4 text-xs font-black uppercase tracking-[0.15em] text-black">Parent ID</TableHead>
                <TableHead className="py-4 text-xs font-black uppercase tracking-[0.15em] text-black">Name</TableHead>
                <TableHead className="py-4 text-xs font-black uppercase tracking-[0.15em] text-black">Relation</TableHead>
                <TableHead className="py-4 text-xs font-black uppercase tracking-[0.15em] text-black">Linked Students</TableHead>
                <TableHead className="py-4 text-xs font-black uppercase tracking-[0.15em] text-black">Contact</TableHead>
                <TableHead className="px-8 py-4 text-xs font-black uppercase tracking-[0.15em] text-black text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parents.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="px-8 font-black text-black">{p.id}</TableCell>
                  <TableCell className="font-bold text-black">{p.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-black font-black rounded-lg text-[11px] border border-slate-200 uppercase tracking-widest">
                      {p.relation}
                    </span>
                  </TableCell>
                  <TableCell className="font-black text-primary uppercase text-[12px]">{p.students}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1 text-black font-black text-[11px]">
                      <span className="flex items-center uppercase tracking-tighter"><Mail size={12} className="mr-1 text-primary"/> {p.email}</span>
                      <span className="flex items-center uppercase tracking-tighter"><Phone size={12} className="mr-1 text-primary"/> {p.phone}</span>
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
