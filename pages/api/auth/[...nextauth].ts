import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
	providers: [
		Credentials({
			name: 'Custom Login',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'johndoe@email.com' },
				password: { label: 'Password', type: 'password', placeholder: 'Password' },
			},
			async authorize(credentials, req) {
				const user = { email: credentials?.email, password: credentials?.password, role: 'admin' };

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;

				switch (account.type) {
					case 'oauth':
						//TODO: Create user or verify if it exists.
						break;
					case 'credentials':
						token.user = user;
						break;
					default:
						break;
				}
			}

			console.log({ token });

			return token;
		},
		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;

			console.log({ session });
			return session;
		},
	},
};

export default NextAuth(authOptions);
