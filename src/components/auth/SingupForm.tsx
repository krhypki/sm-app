import { signup } from '@/actions/user';
import { userSignupSchema } from '@/lib/validators/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FormSubmitButton from '../general/FormSubmitButton';
import InputWLabel from '../ui/InputWLabel';

type TSignupForm = z.infer<typeof userSignupSchema>;
type FormField = {
  label: string;
  name: keyof TSignupForm;
  type?: string;
};

export default function SignupForm() {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TSignupForm>({ resolver: zodResolver(userSignupSchema) });

  const fields: FormField[] = [
    { label: 'Email', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
  ];

  const onSubmit = async () => {
    const result = await trigger();

    if (!result) {
      return;
    }

    const formData = getValues();
    const response = await signup(formData);

    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <form
      action={onSubmit}
      className="flex flex-col items-stretch gap-y-6 lg:min-w-[250px]"
    >
      {fields.map(({ label, name, type }) => (
        <InputWLabel
          key={name}
          label={label}
          type={type}
          error={errors[name]?.message}
          {...register(name)}
        />
      ))}
      <FormSubmitButton size="lg">Sign Up</FormSubmitButton>
    </form>
  );
}
