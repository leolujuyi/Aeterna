import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm tracking-wide flex items-center gap-2 justify-center relative overflow-hidden";
  
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200 border border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group",
    secondary: "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800",
    outline: "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {/* Shine Effect for Primary Button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10 pointer-events-none skew-x-[-20deg]" />
      )}
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </button>
  );
};