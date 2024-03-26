import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';
import Input from './input';

type InputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
  error?: string;
};

const InputWLabel = forwardRef<HTMLInputElement, InputWLabelProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className={cn('text-slate-900 text-sm', className)}>
        {label}
        <Input ref={ref} {...props} className="mt-1" invalid={!!error} />
        {error && <p className="text-red-700 mt-1 ml-2">{error}</p>}
      </label>
    );
  },
);

InputWLabel.displayName = 'InputWLabel';
export default InputWLabel;
