import AccountNav from '@/components/account/AccountNav';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import { Suspense } from 'react';
import Loading from '../loading';

type AccountLayoutProps = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <main>
      <Container>
        <Heading tag="h1" className="text-center capitalize">
          manage your account
        </Heading>

        <AccountNav />

        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Container>
    </main>
  );
}
