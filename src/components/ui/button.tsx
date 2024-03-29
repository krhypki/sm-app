import { ButtonProps } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import Slot from '../general/slot';

const buttonClassName = cva(
  `inline-flex items-center justify-center rounded-full whitespace-nowrap transition-colors text-sm outline-none disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-slate-100 hover-focus:bg-slate-900/80',
        secondary: 'bg-slate-300 text-slate-900 hover-focus:bg-slate-400/80',
      },
      size: {
        sm: 'h-7 px-4 py-1',
        default: 'h-8 px-5 py-2',
        lg: 'h-9 px-6 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant, size, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonClassName({ variant, className, size }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'button';
export default Button;
