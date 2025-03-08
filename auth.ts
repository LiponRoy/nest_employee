import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRATE,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		// credential providers ...
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', required: true },
				password: { label: 'Password', type: 'password', required: true },
			},
			async authorize(credentials) {
				// Express.js API থেকে ইউজার ডেটা ফেচ করা
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(credentials),
					}
				);

				const user = await res.json();

				if (!res.ok || !user)
					throw new Error(user.message || 'Invalid credentials');

				return user; // user object { id, email, name, token }
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.accessToken = user.token;
			return token;
		},
		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
	session: { strategy: 'jwt' },
});
