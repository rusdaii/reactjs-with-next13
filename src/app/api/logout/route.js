import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  const seralized = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  const response = NextResponse.json({ token });
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': seralized },
  });
}
