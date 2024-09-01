import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useHookFormMask } from 'use-mask-input';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  name: string;
  className?: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  mask?: string;
};

export function Input({
  placeholder,
  className,
  register,
  rules,
  error,
  name,
  mask,
  ...props
}: InputProps) {
  const registerWithMask = useHookFormMask(register);
  const maskSelected = mask || '';

  const registerOptions = mask
    ? {
        ...registerWithMask(name, maskSelected, {
          required: true,
        }),
      }
    : { ...register(name, rules) };

  return (
    <div className="">
      <input
        id={name}
        placeholder={placeholder}
        className={twMerge(
          'h-12 w-full rounded-lg border border-gray-400 px-4 outline-none focus:border-red-500/50',
          className,
        )}
        {...registerOptions}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error || 'Error'}</p>}
    </div>
  );
}
