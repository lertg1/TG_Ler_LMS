import { useState } from "react"
import "../styles/BookSearch.css"

function BookSearch({ onSearch }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form className="book-search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, author, ISBN..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
      {query && (
        <button type="button" className="clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  )
}

export default BookSearch

