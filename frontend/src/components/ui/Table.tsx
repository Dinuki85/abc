import React from 'react';

export function Table({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div className="relative group/table">
      <div className={`w-full overflow-x-auto rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm custom-scrollbar ${className}`} {...props}>
        <table className="w-full text-sm text-left text-slate-600 border-collapse">
          {children}
        </table>
      </div>
      <div className="md:hidden absolute right-2 top-2 pointer-events-none animate-pulse bg-blue-600/10 text-blue-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-200 backdrop-blur-sm">
        Swipe →
      </div>
    </div>
  );
}

export function TableHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement> & { children: React.ReactNode }) {
  return (
    <thead className={`bg-slate-50 border-b border-slate-200 ${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TableRow({ children, className = '', ...props }: React.HTMLAttributes<HTMLTableRowElement> & { children: React.ReactNode }) {
  return (
    <tr className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '', ...props }: React.ThHTMLAttributes<HTMLTableCellElement> & { children: React.ReactNode }) {
  return (
    <th className={`px-6 py-4 font-semibold text-slate-700 whitespace-nowrap ${className}`} {...props}>
      {children}
    </th>
  );
}

export function TableBody({ children, className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement> & { children: React.ReactNode }) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableCell({ children, className = '', colSpan, ...props }: React.TdHTMLAttributes<HTMLTableCellElement> & { children: React.ReactNode }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`} colSpan={colSpan} {...props}>
      {children}
    </td>
  );
}
