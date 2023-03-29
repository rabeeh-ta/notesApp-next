import { prisma } from '@/db/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // bellow func will return NULL or User Obj
        // authorize will return 401 for NULL and 200 for anything else
        return await authenticateUser(email, password);
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

async function authenticateUser(email, password) {
  // return user object or null if not existing.
  const user = await prisma.user.findUnique({ where: { email: email } });

  // email does not exist.
  if (!user) return null;

  // password check with hash and is correct
  const match = await bcrypt.compare(password, user.passwordHash);
  //  wrong password
  if (!match) return null;

  // password correct remove passwordHash data from object
  delete user.passwordHash;
  return user;
}

export default NextAuth(authOptions);
