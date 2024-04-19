import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section>
      <LoginForm />
      <p className="mt-3 text-center">
        Don&apos;t have an account yet?{' '}
        <Link className="font-bold capitalize" href="/signup">
          Sign Up
        </Link>
      </p>
    </section>
  );
}
