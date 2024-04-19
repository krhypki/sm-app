import { AuthActionType } from '@/lib/types';
import Link from 'next/link';

type AuthFormQuestionProps = {
  type: AuthActionType;
};

export default function AuthFormQuestion({ type }: AuthFormQuestionProps) {
  const reverseType = type === 'login' ? 'signup' : 'login';

  const text =
    type === 'login'
      ? "Don't have an account yet? "
      : 'Already have an account? ';
  return (
    <p>
      {text}
      <Link className="font-bold capitalize" href={`/${reverseType}`}>
        {reverseType}
      </Link>
    </p>
  );
}
