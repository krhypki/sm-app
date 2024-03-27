import { Footer } from '@/components/app/footer';
import AppHeader from '@/components/app/header/app-header';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="py-10">{children}</div>
      <Footer />
    </div>
  );
}
