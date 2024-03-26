import Container from '@/components/ui/container';
import Heading from '@/components/ui/heading';

export default function AccountPage() {
  return (
    <main>
      <Container>
        <Heading tag="h1" className="text-center capitalize">
          manage your account
        </Heading>

        <ul className="flex" role="navigation">
          <li>
            <button>Profile</button>
          </li>

          <li>
            <button>Settings</button>
          </li>
        </ul>
      </Container>
    </main>
  );
}
