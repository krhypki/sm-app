'use client';

import FormSubmitButton from '@/components/general/form-submit-button';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { cn } from '@/lib/utils/cn';
import { useRef } from 'react';
import { toast } from 'react-toastify';

type AccountFormProps = {
  children: React.ReactNode;
  heading: string;
  className?: string;
  successMsg: string;
  buttonText?: string;
  resetAfterSubmission?: boolean;
  formAction: (formData: FormData) => Promise<{ error: string } | void>;
};

export default function AccountForm({
  children,
  heading,
  className,
  formAction,
  successMsg,
  resetAfterSubmission,
  buttonText = 'update',
}: AccountFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <ContentBlock className={cn('flex flex-col gap-y-6', className)}>
      <Heading className="text-center capitalize" tag="h2">
        {heading}
      </Heading>
      <form
        ref={formRef}
        className="flex-1 flex gap-y-6 flex-col items-center"
        action={async (formData: FormData) => {
          const result = await formAction(formData);

          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(successMsg);
          }

          if (resetAfterSubmission) {
            formRef.current?.reset();
          }
        }}
      >
        {children}

        <FormSubmitButton className="capitalize mt-2" size="lg">
          {buttonText}
        </FormSubmitButton>
      </form>
    </ContentBlock>
  );
}
