import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'split';
  splitContent?: React.ReactNode;
  theme?: 'dark' | 'light';
  className?: string;
  animate?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  splitContent,
  theme = 'dark',
  className = '',
  animate = true,
}: SectionHeadingProps) {
  const isDark = theme === 'dark';

  const content = (
    <>
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest-arch text-[#C5A880] mb-3 font-mono">
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif leading-[1.1] ${isDark ? 'text-[#F3F3F1]' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </>
  );

  if (align === 'split') {
    return (
      <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b ${isDark ? 'border-[#262626]' : 'border-gray-200'} ${className}`}>
        <div className="max-w-2xl">
          {animate ? <Reveal delay={50}>{content}</Reveal> : content}
        </div>
        {splitContent && (
          <div className="flex-shrink-0 lg:pb-2">
            {animate ? <Reveal delay={150}>{splitContent}</Reveal> : splitContent}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {animate ? <Reveal delay={50}>{content}</Reveal> : content}
    </div>
  );
}
