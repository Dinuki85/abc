export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back, here is what's happening today.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder cards for dashboard metrics */}
        {[
          { label: 'Total Students', value: '1,245', color: 'from-blue-500 to-cyan-400' },
          { label: 'Total Staff', value: '142', color: 'from-indigo-500 to-purple-400' },
          { label: 'Classes', value: '38', color: 'from-rose-500 to-orange-400' },
          { label: 'Revenue', value: '$45,231', color: 'from-emerald-500 to-teal-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/60 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
            <p className="text-sm font-medium text-slate-500 relative z-10">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-800 mt-2 relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
