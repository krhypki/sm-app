import AccountNav from '@/components/app/account/AccountNav';
import Container from '@/components/ui/container';
import Heading from '@/components/ui/heading';

type AccountLayoutProps = {
  children: React.ReactNode;
};

export default async function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <main>
      <Container>
        <Heading tag="h1" className="text-center capitalize">
          manage your account
        </Heading>

        <AccountNav />

        {children}
      </Container>
    </main>
  );
}
