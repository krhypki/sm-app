import Logo from '@/components/general/Logo';
import Container from '@/components/ui/Container';
import Link from 'next/link';

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-accent flex flex-col">
      <header className="fixed left-0 top-0 p-5">
        <Link href="/">
          <Logo />
        </Link>
      </header>
      <main className="flex flex-1">
        <Container className="flex flex-col gap-y-10 items-center justify-center">
          {children}
        </Container>
      </main>
    </div>
  );
}
