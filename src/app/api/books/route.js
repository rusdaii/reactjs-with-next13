import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req, res) {
  const data = await req.formData();
  const file = data.get('image');

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const imagePath = path.join('images', file.name);
  const storeImage = path.join(process.cwd(), 'public', imagePath);

  await writeFile(storeImage, buffer);

  try {
    const book = await prisma.book.create({
      data: {
        title: data.get('title'),
        author: data.get('author'),
        publisher: data.get('publisher'),
        year: parseInt(data.get('year')),
        pages: parseInt(data.get('pages')),
        image: imagePath,
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.log(error);
  }
}
