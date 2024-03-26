'use client';

import SignupForm from '@/components/auth/signup-form';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <section>
      <SignupForm />
      <p className="mt-3 text-center">
        Already have an account?{' '}
        <Link className="font-bold capitalize" href="/login">
          Login
        </Link>
      </p>
    </section>
  );
}
