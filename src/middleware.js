// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // Set limit (e.g., 1 MB)
        return new Response('Payload too large', { status: 413 });
    }
    return NextResponse.next();
}
