import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative bg-primary pt-32 pb-20 mb-16 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-handlee mb-4 shadow-sm pb-2">
          {title}
        </h1>
        
        {description && (
          <p className="max-w-2xl mx-auto text-white/90 text-lg md:text-xl font-medium mb-8">
            {description}
          </p>
        )}
        

      </div>
    </div>
  );
}
