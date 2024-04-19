'use client';

import { logout } from '@/actions/user';
import Button from './ui/Button';
import Container from './ui/Container';

export default function AppLogout() {
  return (
    <Container className="pt-8">
      <Button
        onClick={async () => await logout()}
        size="lg"
        className="float-right"
      >
        Logout
      </Button>
    </Container>
  );
}
