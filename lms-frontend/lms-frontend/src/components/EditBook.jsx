import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./AdminDashboard.css"


function EditBook({book, onClose}) {
  const [bookData, setBookData] = useState({
    bookId: 0,
    bookTitle: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    genre: "",
    callNumber: "",
    bookCoverUrl: "",
  });

  useEffect(() => {
    setBookData({
      bookId: book?.bookId || 0,
      bookTitle: book?.bookTitle || "",
      author: book?.author || "",
      isbn: book?.isbn || "",
      category: book?.category || "",
      publisher: book?.publisher || "",
      genre: book?.genre || "",
      callNumber: book?.callNumber || "",
      bookCoverUrl: book?.bookCoverUrl || "",
    });
  }, [book]);
    const navigate = useNavigate();

    const handleBack = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    }
  const handleChange = (e) => {
    const { name, value } = e.target
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    // Check if the user confirmed the deletion
    if (!confirmDelete) {
      return; // Exit the function if the user cancels
  }
    try {
        const response = await axios.delete(`http://localhost:8080/api/books/${bookData.bookId}`);
        
        if (response.status === 204) {
            alert('Book deleted successfully');
            if (onClose) {
                onClose();
            } else {
                navigate(-1);
            }
        }
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    alert('Unauthorized - Please log in again');
                    break;
                case 403:
                    alert('Forbidden - You do not have permission to delete this book');
                    break;
                case 404:
                    alert('Book not found');
                    break;
                default:
                    alert('Error deleting book: ' + (error.response.data.message || 'Unknown error'));
            }
        } else {
            alert('Network error occurred while deleting user');
        }
        console.error('Delete error:', error);
    }
};
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.put(`http://localhost:8080/api/books/${bookData.bookId}`, bookData, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          // Implement update functionality
          console.log("Updating user with data:", bookData)
          console.log(response.status)
      
          if (response.status === 200) {
              console.log("Book updated successfully:", response.data);
              alert("Book updated successfully!");
          }
      } catch (error) {
          if (error.response) {
              console.error("Update failed", error.response.data.message || error.response.data);
              switch (error.response.status) {
                case 401:
                    console.error('Unauthorized - Invalid token');
                    break;
                case 403:
                    console.error('Forbidden - Insufficient permissions');
                    break;
                case 404:
                    console.error('User not found');
                    break;
                default:
                    console.error('Server error:', error.response.status);
              }
          } else if (error.request) {
              console.error("No response from server");
          } else {
              console.error("Request error", error.message)
          }
      }
  }

  return (
    <div className="content-area">
      <div className="header-container">
        <h1>Edit Book</h1>
        <button className="logout-button" onClick={handleBack}>Back</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="bookId">Book ID</label>
          <input
            type="integer"
            id="bookId"
            name="bookId"
            placeholder="Enter / Scan Book ID"
            value={bookData.bookId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booktitle">Book Title</label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            placeholder="Enter Book titlee"
            value={bookData.bookTitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter Author"
            value={bookData.author}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            placeholder="Enter or scan 13 digit ISBN number"
            value={bookData.isbn}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={bookData.category} onChange={handleChange}>
            <option value="" disabled>
              Select Category
            </option>
                      <option value="reference">Reference Books</option>
                      <option value="fiction">Fiction</option>
                <option value="magazine">Magazine</option>
                <option value="newsPaper">News Paper</option>
                <option value="journal">Journal</option>
                <option value="textBook">Text Book</option>
                <option value="attachment">Attachment</option>

          </select>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select id="genre" name="genre" value={bookData.genre} onChange={handleChange}>
            <option value="" disabled>
              Select Genre
            </option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
                <option value="thriller">Thriller</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="arts">Arts</option>

          </select>
              </div>
              
        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Enter Book Publisher"
            value={bookData.publisher}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="callNumber">Call Number</label>
                  <input
                      type = "text"
                      id="callNumber"
                      name="callNumber"
                      value={bookData.callNumber}
                      onChange={handleChange}
                  />
              </div>
              <div className="form-group">
          <label htmlFor="bookCoverUrl">Book Cover URL</label>
                  <input
                      type = "text"
                      id="bookCoverUrl"
                      name="bookCoverUrl"
                      value={bookData.bookCoverUrl}
                      onChange={handleChange}
                  />
                  </div>

        <div className="form-actions">
          <button type="submit" className="update-button">
            Update
                  </button>                                    
            <button type="button" className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBook

