import { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import apiAuthSignIn from '@/utils/auth';
const options: AuthOptions = {
  //SIGN IN CHAY TRUOC JWT, TRONG SIGNIN SE RETURN 1 THANG USER, JWT CHAY TRUOC SESSION
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      async profile(profile) {
        console.log('profile in discord: ', profile);
        //cai profile nay se truyen xuong jwt function
        const user = {
          id: -1,
          name: '',
          email: '',
          role: '',
          avatar: '',
          isEmailVerified: false,
        };
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: profile.email,
        //   },
        // });
        if (!user)
          return {
            name: profile.username,
            email: profile.email,
            id: -1,
          };
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          isVerified: user.isEmailVerified,
        };
      },
    }),

    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
      async profile(profile) {
        console.log('inside prfileeeeeeeeeeeeeee');
        //cai profile nay se truyen xuong jwt function
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: profile.email,
        //   },
        // });
        const user = {
          id: -1,
          name: '',
          email: '',
          role: '',
          avatar: '',
          isEmailVerified: false,
        };
        if (!user)
          return {
            name: profile.name,
            email: profile.email,
            id: -1,
          };
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          isVerified: user.isEmailVerified,
        };
      },
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      async profile(profile) {
        console.log('inside prfileeeeeeeeeeeeeee');
        //cai profile nay se truyen xuong jwt function
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: profile.email,
        //   },
        // });
        const user = {
          id: -1,
          name: '',
          email: '',
          role: '',
          avatar: '',
          isEmailVerified: false,
        };
        if (!user)
          return {
            name: profile.name,
            email: profile.email,
            id: -1,
          };
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          isVerified: user.isEmailVerified,
        };
      },
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('credentials in credentials: ', credentials);
        if (!credentials) {
          return { error: 'Invalid credentials' };
        }
        const user = await apiAuthSignIn(credentials);
        console.log('🚀 ~ authorize ~ user:', user);
        if (!user) return { redirect: '/auth/login' };
        return user;
      },
    }),

    // ...add more providers here
  ],

  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET, // Replace with your JWT secret
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ token, session }) {
      console.log('token in sessionnnnnnnnnnnnnnnnn: ', token);
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { username: string }).username =
          token.username as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { display_name: string }).display_name =
          token.display_name as string;
        (session.user as { access_token: string }).access_token =
          token.access_token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};
export default options;
