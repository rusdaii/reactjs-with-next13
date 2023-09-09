'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
export default function BookForm(bookData) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await axios.postForm('/api/books', {
        title: formData.get('title'),
        author: formData.get('author'),
        publisher: formData.get('publisher'),
        year: parseInt(formData.get('year')),
        pages: parseInt(formData.get('pages')),
        image: selectedImage,
      });

      push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create New Book
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                required
                defaultValue={bookData?.title}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Author
            </label>
            <div className="mt-2">
              <input
                id="author"
                name="author"
                type="text"
                autoComplete="author"
                required
                defaultValue={bookData?.author}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="publisher"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Publisher
              </label>
            </div>
            <div className="mt-2">
              <input
                id="publisher"
                name="publisher"
                type="text"
                autoComplete="publisher"
                required
                defaultValue={bookData?.publisher}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>
            </div>
            <div className="mt-2">
              <input
                id="year"
                name="year"
                type="number"
                autoComplete="year"
                required
                defaultValue={bookData?.publisher}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="pages"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pages
            </label>
            <div className="mt-2">
              <input
                id="pages"
                name="pages"
                type="number"
                autoComplete="pages"
                required
                defaultValue={bookData?.pages}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <div className="mt-2">
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImage(file);
                  }}
                  className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-violet-700
                          hover:file:bg-violet-100"
                />
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
