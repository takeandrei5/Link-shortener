import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Link } from '@prisma/client';

export async function middleware(request: NextRequest) {
	const PUBLIC_FILE = /\.(.*)$/;

	if (
		request.nextUrl.pathname === '/' ||
		request.nextUrl.pathname.startsWith('/_next') || // exclude Next.js internals
		request.nextUrl.pathname.startsWith('/api') || //  exclude all API routes
		request.nextUrl.pathname.startsWith('/static') || // exclude static files
		PUBLIC_FILE.test(request.nextUrl.pathname) // exclude all files in the public folder
	) {
		return NextResponse.next();
	}

	const slug: string | undefined = request.nextUrl.pathname.split('/').pop();
	const getUrlResponse: Response = await fetch(`${request.nextUrl.origin}/api/get-link/${slug}`);

	if (getUrlResponse.status === 404) {
		return NextResponse.redirect(request.nextUrl.origin);
	}

	const link: Link | null = await getUrlResponse.json();

	if (!link) {
		return NextResponse.redirect(request.nextUrl.origin);
	}

	return NextResponse.redirect(link.actualUrl);
}

export const config = {
	matcher: '/:slug*'
};
