import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
const prisma = new PrismaClient();

async function getData(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });
    return book;
  } catch (error) {
    console.log(error);
  }
}

export default async function BookPage({ params }) {
  const { id } = params;
  const data = await getData(+id);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            className="w-48 h-80"
            src={`http://localhost:3000/${data.image}`}
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title">
            {data.title} ({data.year})
          </h1>
          <div className="mb-24">
            <p>Author: {data.author}</p>
            <p>Publisher: {data.publisher}</p>
            <p>Pages: {data.pages}</p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link href={`/`}>Back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
