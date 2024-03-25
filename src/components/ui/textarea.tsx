import { cn } from '@/lib/utils/cn';
import { TextareaHTMLAttributes, forwardRef } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-20 w-full px-3 py-2 rounded-md border border-slate-300 text-slate-900 text-sm placeholder:text-slate-500 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-700',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
