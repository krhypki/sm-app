import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes } from 'react';
import Input from './input';

type InputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
};

export default function InputWLabel({
  label,
  className,
  ...props
}: InputWLabelProps) {
  return (
    <label className={cn('text-slate-900 text-sm', className)}>
      {label}
      <Input {...props} className="mt-1" />
    </label>
  );
}
