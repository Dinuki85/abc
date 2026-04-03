import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative bg-primary pt-32 pb-20 mb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white font-handlee mb-6 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
             {description}
          </p>
        )}

      </div>
    </div>
  );
}
