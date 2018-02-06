import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.props.onSearchBooks(query)
    this.setState({query: query.trim()})
  }

  render() {

    const {query} = this.state
    const searchResults = this.props.searchResults

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */
          }
          <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateQuery(e.target.value)}/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            searchResults.length > 0
              ? (searchResults.map(book => <Book book={book} key={book.id} onUpdateBook={this.props.onUpdateBook}/>))
              : (<h1>No books found for this search</h1>)
          }
        </ol>
      </div>
    </div>)
  }
}

export default SearchBooks
