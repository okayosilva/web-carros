import { ButtonHTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  color?: 'red' | 'green' | 'black';
  size?: 'sm' | 'lg';
  fullWidth?: boolean;
};

const button = tv({
  base: 'flex justify-center items-center font-bold rounded py-2 text-white transition-all duration-300 px-4',
  variants: {
    color: {
      red: 'bg-red-500 hover:bg-red-600',
      green: 'bg-green-500 hover:bg-green-600',
      black: 'bg-zinc-900 hover:bg-zinc-950',
    },
    size: {
      sm: 'h-12 w-64',
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
});

export function Button({
  color,
  size,
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ color, size, fullWidth })} {...props}>
      Button
    </button>
  );
}
