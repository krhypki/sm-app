import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    email: string;
  }
}
