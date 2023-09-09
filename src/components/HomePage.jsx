'use client';
import Books from '@/components/Books';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-modern-modal';
import useAuthStore from '@/lib/authStore';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const { push } = useRouter();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleDeleteAlert = () => setDeleteAlert(true);
  const handleCloseDeleteAlert = () => setDeleteAlert(false);

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await axios.get('/api/books');

      setBooks(books.data);
    };
    fetchBooks();
  }, []);

  const handleEditBook = async (editedBookData) => {
    try {
      const updatedBooks = await axios.putForm(
        `/api/books/${selectedBook.id}`,
        editedBookData
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBook = async () => {
    try {
      const updatedBooks = await axios.delete(`/api/books/${selectedBook.id}`);
      setBooks(updatedBooks);
      handleClose();
      handleCloseDeleteAlert();
      push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto  px-6 columns-3">
      {books && books.length > 0 ? (
        books.map((book) => (
          <div
            key={`${book.id} ${book.title}`}
            onClick={() => {
              setSelectedBook(book);
              handleOpen();
            }}
            style={{ cursor: 'pointer' }}
          >
            <Books {...book} />
          </div>
        ))
      ) : (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      {selectedBook && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalHeader>Details</ModalHeader>
          <ModalBody className="container flex flex-col">
            {isEditMode ? (
              <form
                onSubmit={(e) => {
                  const editedBookData = {
                    title: e.target.title.value,
                    author: e.target.author.value,
                    publisher: e.target.publisher.value,
                    year: +e.target.year.value,
                    pages: +e.target.pages.value,
                  };

                  handleEditBook(editedBookData);
                }}
              >
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
                      defaultValue={selectedBook?.title}
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
                      defaultValue={selectedBook?.author}
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
                      defaultValue={selectedBook?.publisher}
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
                      defaultValue={selectedBook?.year}
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
                      defaultValue={selectedBook?.pages}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-5 mr-2">
                  Save
                </button>
                <button
                  type="submit"
                  className="btn btn-primary mt-5 mb-2"
                  onClick={disableEditMode}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button
                  className="btn btn-secondary mb-3"
                  onClick={() => push(`/book/${selectedBook?.id}`)}
                >
                  Detail
                </button>

                {isLoggedIn ? (
                  <>
                    <button
                      className="btn  btn-primary mb-3"
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-warning mb-3"
                      onClick={handleDeleteAlert}
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </>
            )}
          </ModalBody>
        </Modal>
      )}

      {selectedBook && (
        <Modal isOpen={deleteAlert} onClose={handleCloseDeleteAlert}>
          <ModalHeader>Alert</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this book?</p>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-warning mb-3" onClick={handleDeleteBook}>
              Yes
            </button>
            <button
              className="btn btn-warning mb-3"
              onClick={handleCloseDeleteAlert}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
