import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const validRoles = ['admin', 'super-user', 'SEO'];

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
	const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!session) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	if (!validRoles.includes(session.user.role)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
	return NextResponse.next();
}
