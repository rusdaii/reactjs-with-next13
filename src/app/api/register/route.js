import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export async function POST(req, res) {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: 'Register Successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }
}
