import React, { useState, useEffect } from 'react';
import bookService from '../services/bookService';

const MemberPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await bookService.getBooks({ search });
      setBooks(data);
    };
    fetchBooks();
  }, [search]);

  return (
    <div>
      <h2>Browse Books</h2>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books" />
      <ul>
        {books.map((book) => (
          <li key={book.bookId}>{book.bookTitle} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberPage;