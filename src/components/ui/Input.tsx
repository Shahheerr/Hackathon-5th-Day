'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  error,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded py-2 px-3 bg-[#F5F5F5] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DB4444]',
        error && 'border-red-500 focus:ring-red-500',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
