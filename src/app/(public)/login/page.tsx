import AuthForm from '@/components/auth/AuthForm';
import InputWLabel from '@/components/ui/input-w-label';

export default function LoginPage() {
  return (
    <AuthForm actionType="login">
      <InputWLabel label="Email" />
      <InputWLabel label="Password" />
    </AuthForm>
  );
}
