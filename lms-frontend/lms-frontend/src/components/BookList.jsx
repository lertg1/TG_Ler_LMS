function BookList({ books }) {
    const handleEdit = (id) => {
      // Implement edit functionality
      console.log("Edit book with id:", id)
    }
  
    return (
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <div className="book-info">
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
            </div>
            <button className="edit-button" onClick={() => handleEdit(book.id)}>
              EDIT
            </button>
          </div>
        ))}
      </div>
    )
  }
  
  export default BookList
  
  