import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pitch-black';
  
  const variantStyles = {
    primary: 'bg-premium-orange text-pitch-black hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,194,65,0.3)] focus:ring-premium-orange',
    secondary: 'bg-gradient-to-br from-premium-orange to-golden-glow text-pitch-black hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,194,65,0.4)] focus:ring-golden-glow',
    outline: 'bg-transparent border-2 border-premium-orange text-premium-orange hover:-translate-y-1 hover:bg-premium-orange/10 hover:shadow-[0_10px_25px_rgba(255,194,65,0.2)] focus:ring-premium-orange',
  };
  
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-base',
    md: 'px-8 py-4 text-lg',
    lg: 'px-8 py-4 text-xl',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
