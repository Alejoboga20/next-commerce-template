import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export const authOptions = {
	providers: [
		Credentials({
			name: 'Custom Login',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'johndoe@email.com' },
				password: { label: 'Password', type: 'password', placeholder: 'Password' },
			},
			async authorize(credentials) {
				return await dbUsers.checkUserEmailPassword(credentials?.email, credentials?.password);
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register',
	},
	jwt: {},
	session: {
		maxAge: 2592000, //30d
		strategy: 'jwt',
		updateAge: 86400, //per day
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;

				switch (account.type) {
					case 'oauth':
						token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
						break;
					case 'credentials':
						token.user = user;
						break;
					default:
						break;
				}
			}

			return token;
		},
		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;

			return session;
		},
	},
};

export default NextAuth(authOptions);
