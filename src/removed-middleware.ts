import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Link } from '@prisma/client';

export async function middleware(request: NextRequest) {
	const slug: string | undefined = request.nextUrl.pathname.split('/').pop();

	if (!slug) {
		return NextResponse.next();
	}

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
	matcher: '/((?!api|_next/static|favicon.ico).*)'
};
