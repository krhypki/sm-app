import AppLogout from '@/components/AppLogout';
import { Footer } from '@/components/footer';
import AppHeader from '@/components/header/AppHeader';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <AppLogout />

      <div className="py-10 lg:py-20">{children}</div>

      <Footer />
    </div>
  );
}
