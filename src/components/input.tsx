import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  type: string;
  className?: string;
};

export function Input({ placeholder, type, className, ...props }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={twMerge(
        'h-12 w-full rounded-lg border border-gray-400 px-4 outline-none',
        className,
      )}
      {...props}
    />
  );
}
