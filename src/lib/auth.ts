import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { findOneByEmail } from './db/user';
import { userLoginSchema } from './utils/validation-schemas';

const config = {
  pages: {
    signIn: '/login',
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedCredentials = userLoginSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          console.log('Invalid data');
          return null;
        }

        const { email, password } = validatedCredentials.data;
        const user = await findOneByEmail(email);

        if (!user) {
          console.log('User not found');
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          console.log('invalid');
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ request }) => {
      return true;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.email = user.email || '';
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email!;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
