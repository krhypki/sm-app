import AuthForm from '@/components/auth/AuthForm';
import InputWLabel from '@/components/ui/input-w-label';

export default function LoginPage() {
  return (
    <AuthForm actionType="signup">
      <InputWLabel label="Email" />
      <InputWLabel label="Password" />

      <InputWLabel label="First Name" />
      <InputWLabel label="Last Name" />
    </AuthForm>
  );
}
