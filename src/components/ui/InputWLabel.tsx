import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';
import Input from './input';

type InputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
  error?: string;
  children?: React.ReactNode;
};

const InputWLabel = forwardRef<HTMLInputElement, InputWLabelProps>(
  ({ label, error, children, className, ...props }, ref) => {
    return (
      <label className={cn('text-slate-900 relative text-sm', className)}>
        {label}
        <Input ref={ref} {...props} className="mt-1 pr-8" invalid={!!error} />
        {children}
        {error && <p className="text-red-700 mt-1 ml-2">{error}</p>}
      </label>
    );
  },
);

InputWLabel.displayName = 'InputWLabel';
export default InputWLabel;
