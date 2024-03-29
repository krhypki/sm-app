import AppLogout from '@/components/app/app-logout';
import { Footer } from '@/components/app/footer';
import AppHeader from '@/components/app/header/app-header';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <AppLogout />

      <div className="py-20">{children}</div>

      <Footer />
    </div>
  );
}
