import Link from 'next/link';
import Button from '../ui/button';

type AuthFormProps = {
  actionType: 'login' | 'signup';
  children: React.ReactNode;
};

export default function AuthForm({ actionType, children }: AuthFormProps) {
  return (
    <form className="flex flex-col items-stretch gap-y-6 lg:min-w-[250px]">
      {children}

      <Button size="lg">{actionType === 'login' ? 'Login' : 'Sign Up'}</Button>

      {actionType === 'signup' && (
        <p>
          Already have an account?{' '}
          <Link className="font-bold" href="/login">
            Login
          </Link>
        </p>
      )}

      {actionType === 'login' && (
        <p>
          Don&apos;t have an account yet?{' '}
          <Link className="font-bold" href="/signup">
            Signup
          </Link>
        </p>
      )}

      <Link href="/" className="hover:underline self-center">
        Return <span className="font-bold">Home</span>
      </Link>
    </form>
  );
}
