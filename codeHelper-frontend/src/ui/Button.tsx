import React from 'react';

type ButtonVariant = 'primary' | 'pos-cta' | 'neg-cta' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  'primary': 'bg-primary-900 text-secondary-800 hover:bg-primary-800 focus:bg-primary-800 justify-center',
  'pos-cta': 'bg-secondary-900 text-primary-900 hover:bg-secondary-800 focus:bg-secondary-800 justify-center',
  'neg-cta': 'bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 justify-center',
  'secondary': 'bg-primary-600 text-primary-800 hover:text-secondary-900 justify-between ',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 py-2 text-xs rounded-sm',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-8 py-3 text-xl rounded-lg',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  type = 'button',
  disabled = false,
  className = '',
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center gap-2 font-semibold font-sans transition-colors duration-200
      outline-none focus:ring-secondary-800 
      ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}
    `}
  >
    {startIcon && <span className="mr-1 flex items-center">{startIcon}</span>}
    <span>{children}</span>
    {endIcon && <span className="ml-1 flex items-center">{endIcon}</span>}
  </button>
);
