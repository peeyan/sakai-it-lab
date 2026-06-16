import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false
}) => {
  // disabled:opacity-50 disabled:cursor-not-allowed を追加して、無効時の見た目を整えました
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 focus:ring-indigo-500",
    accent: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30 focus:ring-orange-500",
    secondary: "bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-indigo-100 shadow-sm focus:ring-indigo-500",
    outline: "bg-transparent text-white border-2 border-white/30 hover:bg-white/10 focus:ring-white"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};