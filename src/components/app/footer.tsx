import { APP_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-auto p-4 border-t border-slate-300">
      <small className="text-sm">© 2024 {APP_NAME}. All rights reserved.</small>
    </footer>
  );
}
