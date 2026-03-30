import React from 'react';

export function Table({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm ${className}`}>
      <table className="w-full text-sm text-left text-slate-600">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-slate-50 border-b border-slate-200">
      {children}
    </thead>
  );
}

export function TableRow({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <tr className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${className}`}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <th className={`px-6 py-4 font-semibold text-slate-700 whitespace-nowrap ${className}`}>
      {children}
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody>
      {children}
    </tbody>
  );
}

export function TableCell({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
}
