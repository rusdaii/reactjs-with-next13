import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = params;

  const data = await req.formData();

  try {
    const book = await prisma.book.update({
      where: { id: +id },
      data: {
        title: data.get('title'),
        author: data.get('author'),
        publisher: data.get('publisher'),
        year: parseInt(data.get('year')),
        pages: parseInt(data.get('pages')),
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const book = await prisma.book.delete({
      where: { id: +id },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.log(error);
  }
}
