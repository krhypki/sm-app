'use client';

import { login } from '@/actions/user';
import { toast } from 'react-toastify';
import FormSubmitButton from '../general/form-submit-button';
import InputWLabel from '../ui/input-w-label';
import PasswordInputPreview from '../ui/password-input-preview';

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
      <PasswordInputPreview label="Password" name="password" />
      <FormSubmitButton size="lg">Login</FormSubmitButton>
    </form>
  );
}
