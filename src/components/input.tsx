import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  name: string;
  className?: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  mask?: string;
  formatValue?: (value: string) => string; // Função de formatação opcional
};

export function Input({
  placeholder,
  className,
  register,
  rules,
  error,
  name,
  mask,
  formatValue,
  ...props
}: InputProps) {
  const InputComponent = mask ? InputMask : 'input';

  return (
    <div className="">
      <InputComponent
        placeholder={placeholder}
        className={twMerge(
          'h-12 w-full rounded-lg border border-gray-400 px-4 outline-none focus:border-red-500/50',
          className,
        )}
        {...register(name, rules)}
        id={name}
        mask={mask || ''}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error || 'Error'}</p>}
    </div>
  );
}
