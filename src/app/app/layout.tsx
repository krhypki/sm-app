import { Footer } from '@/components/app/footer';
import AppHeader from '@/components/app/header/app-header';
import CurrentUserContextProvider from '@/contexts/current-user-context-provider';
import { getCurrentUser } from '@/lib/db/user';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <CurrentUserContextProvider user={currentUser}>
        <div className="py-20">{children}</div>
      </CurrentUserContextProvider>

      <Footer />
    </div>
  );
}
