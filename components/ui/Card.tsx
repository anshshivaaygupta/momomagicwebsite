import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
}) => {
  const baseStyles = 'bg-deep-space border-2 border-charcoal rounded-xl p-6 transition-all duration-300';
  const hoverStyles = hover ? 'hover:border-premium-orange hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,194,65,0.3)]' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};
