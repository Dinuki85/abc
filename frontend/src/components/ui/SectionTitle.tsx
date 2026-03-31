import React from 'react';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  alignment?: 'center' | 'left' | 'right';
}

export function SectionTitle({ subtitle, title, alignment = 'center' }: SectionTitleProps) {
  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ms-auto',
  };

  return (
    <div className={`pb-8 ${alignmentClasses[alignment]} max-w-3xl`}>
      <p className={`section-title px-5 mb-4 inline-block font-bold text-primary tracking-widest uppercase text-sm bg-primary/10 rounded-full py-1.5`}>
        <span className="px-3">{subtitle}</span>
      </p>
      <h2 className="text-4xl md:text-5xl font-bold font-handlee text-dark mb-4 leading-tight">
        {title}
      </h2>
      <div className={`h-1.5 w-24 bg-primary rounded-full mt-4 ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
