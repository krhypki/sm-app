'use client';

import { login } from '@/actions/user';
import { toast } from 'react-toastify';
import Button from '../ui/button';
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
      <InputWLabel label="Email" />
      <InputWLabel label="Password" />
      <Button size="lg">Sign Up</Button>
    </form>
  );
}
