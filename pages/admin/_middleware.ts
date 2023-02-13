import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const validRoles = ['admin', 'super-user', 'SEO'];

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
	const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!session) {
		const path = new URL('/auth/login', req.url);
		return NextResponse.redirect(path);
	}

	if (!validRoles.includes(session.user.role)) {
		return NextResponse.redirect(new URL('/', req.url));
	}
	return NextResponse.next();
}
