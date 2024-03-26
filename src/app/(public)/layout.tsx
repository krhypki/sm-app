import Logo from '@/components/general/logo';
import Container from '@/components/ui/container';

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-accent flex flex-col">
      <header className="p-5">
        <Logo />
      </header>
      <main className="flex flex-1">
        <Container className="flex flex-col gap-y-10 items-center justify-center">
          {children}
        </Container>
      </main>
    </div>
  );
}
