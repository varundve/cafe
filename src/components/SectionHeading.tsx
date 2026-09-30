import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 md:mb-14 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-2.5 ${isCenter ? 'justify-center' : ''}`}>
          <span className="w-5 h-[1px] bg-amber-500/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            {eyebrow}
          </span>
          <span className="w-5 h-[1px] bg-amber-500/60" />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-cream-50 font-normal leading-[1.2] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-espresso-300 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};
