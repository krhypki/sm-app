import { APP_NAME, GITHUB_REPO_URL } from '@/lib/constants';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Container from './ui/container';

export function Footer() {
  return (
    <footer className="mt-auto p-4 border-t border-slate-300">
      <Container className="flex justify-between">
        <small className="text-sm">
          © 2024 {APP_NAME}. All rights reserved.
        </small>
        <Link
          className="flex items-center gap-x-2 font-semibold"
          href={GITHUB_REPO_URL}
        >
          Github
          <GitHubLogoIcon className="h-6 w-6" />
        </Link>
      </Container>
    </footer>
  );
}
