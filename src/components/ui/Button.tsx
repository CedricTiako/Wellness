import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    icon,
    iconPosition = 'left',
    children, 
    disabled,
    ...props 
  }, ref) => {
    const variantStyles = {
      primary: 'bg-primary-400 text-white hover:bg-primary-500 active:bg-primary-600',
      secondary: 'bg-secondary-700 text-white hover:bg-secondary-800 active:bg-secondary-900',
      outline: 'border border-primary-400 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
      ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700',
      link: 'bg-transparent text-primary-500 hover:underline p-0 h-auto'
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          variant !== 'link' && sizeStyles[size],
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : icon && iconPosition === 'left' ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        
        {children}
        
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';