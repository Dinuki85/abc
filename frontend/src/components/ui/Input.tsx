import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            block w-full px-4 py-2 bg-white/50 border rounded-xl 
            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
            transition-all duration-200 outline-none
            disabled:opacity-50 disabled:bg-slate-50
            ${error ? 'border-rose-300 focus:ring-rose-500/50 focus:border-rose-500' : 'border-slate-200'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-rose-500">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
