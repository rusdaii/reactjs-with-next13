import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/generateToken';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    const token = await generateToken(user.id);
    const seralized = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'strict',
      path: '/',
    });

    const response = NextResponse.json({ token });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Set-Cookie': seralized },
    });
  } catch (error) {
    console.log(error);
  }
}
