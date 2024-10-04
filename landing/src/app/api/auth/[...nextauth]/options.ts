import { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
const options: AuthOptions = {
  //SIGN IN CHAY TRUOC JWT, TRONG SIGNIN SE RETURN 1 THANG USER, JWT CHAY TRUOC SESSION
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
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
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: email,
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

        if (!user) throw new Error('Email or password is incorrect');
        if (user.password !== password)
          throw new Error('Email or password is incorrect');

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id,
          avatar: user.avatar,
          isVerified: user.isEmailVerified,
        };
      },
    }),

    // ...add more providers here
  ],

  callbacks: {
    async signIn(params) {
      console.log('paramssssssssssssssssssssssssssssssssssssssssssssss: ');
      console.log(params);
      if (!params?.user?.id || parseInt(params?.user?.id) === -1) {
        const payload = jwt.sign(
          { email: params?.user?.email, name: params?.user?.name },
          process.env.NEXT_PUBLIC_JWT_SECRET,
          { expiresIn: '1h' }
        );
        return `/auth/register/?payload=${payload}`;
      }

      return true;
    },
    //first it run the jwt function, the jwt function will return the token , then in the session function we can access the token
    async jwt({ token, user, trigger, session }) {
      console.log('🚀 ~ file: options.ts:154 ~ jwt ~ user:', user);
      console.log('🚀 ~ file: options.ts:154 ~ jwt ~ token:', token);
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.avatar = user.avatar;
        token.name = user.name;
        token.email = user.email;
        token.isEmailVerified = user.isVerified;
      }
      //user is from the oauth config or in the credentials setting options

      //return final token
      return token;
    },
    async session({ token, session }) {
      // if (!userFind) {
      //   return {
      //     redirectTo: `/auth/login?email=${session?.user.email}&name=${session?.user.name}`,
      //   };
      // }
      console.log('token in sessionnnnnnnnnnnnnnnnn: ', token);
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { name: string }).name = token.name as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { avatar: string }).avatar = token.avatar as string;
        (session.user as { email: string }).email = token.email as string;
        (session.user as { isEmailVerified: boolean }).isEmailVerified =
          token.isEmailVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};
export default options;
