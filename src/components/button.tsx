import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  color?: 'red' | 'green' | 'black';
  size?: 'sm' | 'lg';
  fullWidth?: boolean;
  className?: string;
};

const button = tv({
  base: 'flex justify-center items-center font-bold rounded-lg py-2 text-white transition-all duration-300 px-4',
  variants: {
    color: {
      red: 'bg-red-500 hover:bg-red-600',
      green: 'bg-green-500 hover:bg-green-600',
      black: 'bg-zinc-900 hover:bg-zinc-950',
    },
    size: {
      sm: 'h-12 w-20 md:w-64',
      lg: 'h-16 w-auto',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'red',
    fullWidth: false,
  },
  compoundVariants: [
    {
      size: 'sm',
      fullWidth: true,
      class: 'w-full md:w-full',
    },
    {
      size: 'lg',
      fullWidth: true,
      class: 'w-full',
    },
  ],
});

export function Button({
  color,
  size,
  fullWidth,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(button({ color, size, fullWidth }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
