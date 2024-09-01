declare module 'react-input-mask' {
  import { InputHTMLAttributes } from 'react';

  interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
  }

  export default function InputMask(props: InputMaskProps): JSX.Element;
}
