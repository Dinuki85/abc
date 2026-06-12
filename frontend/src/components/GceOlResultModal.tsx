import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface GceOlResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: string;
  onSave: (data: string) => void;
  readOnly?: boolean;
}

const SUBJECT_CATEGORIES = [
  {
    category: "Core Subjects",
    subjects: [
      "Sinhala",
      "Religion (Buddhism / Roman Catholic)",
      "Mathematics",
      "Science",
      "English",
      "History"
    ]
  },
  {
    category: "Group I",
    subjects: [
      "Geography",
      "Accounting",
      "Civic Edu."
    ]
  },
  {
    category: "Group II",
    subjects: [
      "Art",
      "Dancing",
      "Music",
      "Drama & Thea."
    ]
  },
  {
    category: "Group III",
    subjects: [
      "ICT",
      "Media & com.",
      "Agriculture",
      "Health & P.S",
      "Home Sci."
    ]
  }
];

const GRADES = ["", "A", "B", "C", "S", "W", "F"];

export function GceOlResultModal({ isOpen, onClose, initialData, onSave, readOnly = false }: GceOlResultModalProps) {
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      try {
        const parsed = initialData ? JSON.parse(initialData) : {};
        setResults(parsed);
      } catch (e) {
        setResults({});
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (subject: string, grade: string) => {
    setResults(prev => ({ ...prev, [subject]: grade }));
  };

  const handleSave = () => {
    onSave(JSON.stringify(results));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">GCE O/L Exam Results</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">Select the grade obtained for each subject</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="space-y-8">
            {SUBJECT_CATEGORIES.map((cat) => (
              <div key={cat.category} className="space-y-4">
                <h3 className="text-sm font-black text-emerald-600 uppercase tracking-wider border-b border-emerald-100 pb-2">
                  {cat.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.subjects.map(subject => (
                    <div key={subject} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-bold text-slate-700">{subject}</span>
                      <select
                        value={results[subject] || ""}
                        onChange={(e) => handleChange(subject, e.target.value)}
                        disabled={readOnly}
                        className="h-8 w-20 px-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                      >
                        {GRADES.map(g => (
                          <option key={g} value={g}>{g || "-"}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-slate-100 shrink-0 flex justify-end gap-3 bg-slate-50/50">
          <Button type="button" onClick={onClose} className="h-10 px-6 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors">
            {readOnly ? 'Close' : 'Cancel'}
          </Button>
          {!readOnly && (
            <Button type="button" onClick={handleSave} className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all">
              <Save size={14} className="mr-2" />
              Save Results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
