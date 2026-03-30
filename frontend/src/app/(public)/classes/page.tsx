import { Button } from '@/components/ui/Button';

export default function ClassesPage() {
  const classes = [
    { title: "Early Childhood", age: "3-5 years", subjects: ["Basic Literacy", "Numeracy", "Social Skills"] },
    { title: "Primary Education", age: "6-11 years", subjects: ["Mathematics", "Science", "Language Arts"] },
    { title: "Middle School", age: "12-14 years", subjects: ["Advanced Math", "Social Studies", "STEM Labs"] },
    { title: "High School", age: "15-18 years", subjects: ["AP Support", "College Prep", "Vocational Training"] }
  ];

  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">Classes & Programs</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Our comprehensive programs are designed to inspire students at every stage of their academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((cls, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col h-full group">
              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{cls.age}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{cls.title}</h3>
              <ul className="mb-8 flex-1 space-y-2 text-slate-600">
                {cls.subjects.map((sub, sidx) => (
                  <li key={sidx} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {sub}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full mt-auto group-hover:bg-blue-600 group-hover:text-white">Learn More</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
