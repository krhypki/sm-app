'use client';

import { login } from '@/actions/user';
import { toast } from 'react-toastify';
import FormSubmitButton from '../general/form-submit-button';
import InputWLabel from '../ui/input-w-label';

export default function LoginForm() {
  const onSubmit = async (formData: FormData) => {
    const response = await login(formData);

    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <form action={onSubmit} className="flex flex-col gap-y-5">
      <InputWLabel label="Email" name="email" />
      <InputWLabel label="Password" name="password" type="password" />
      <FormSubmitButton size="lg">Sign Up</FormSubmitButton>
    </form>
  );
}
