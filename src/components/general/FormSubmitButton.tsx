'use client';

import { ButtonProps } from '@/lib/types';
import { useFormStatus } from 'react-dom';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

type FormSubmitButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export default function FormSubmitButton({
  children,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} {...props}>
      {children}
      {pending && <Spinner className="h-6 w-6 ml-4" />}
    </Button>
  );
}
