import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  bookIDs = []

  componentDidMount() {
    this.getBooksInShelves()
  }

  clearSearchResults = () => {
    this.setState({searchResults: []})
  }

  getBooksInShelves = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
      this.createBookIDs(books)
    })
  }

  createBookIDs = (books) => {
    this.bookIDs = books.map(book => book.id)
  }

  updateBook = (bookToUpdate, newShelf) => {
    bookToUpdate.shelf = newShelf
    this.setState(state => {
      this.bookIDs = this.bookIDs.filter(b => b.id !== bookToUpdate.id)
      this.bookIDs.push(bookToUpdate.id)
      return {books: [...state.books.filter(b => b.id !== bookToUpdate.id), bookToUpdate]}
    })
    BooksAPI.update(bookToUpdate, newShelf)
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchResults) => {
        this.getBooksInShelves()
        if (searchResults) {
          const filteredResults = searchResults.map((result) => {
            let pos = this.bookIDs.indexOf(result.id)
            if (pos !== -1) {
              return this.state.books[pos]
            } else {
              result.shelf = "none"
              return result
            }
          })
          this.setState({searchResults: filteredResults})
        }
      }, this.clearSearchResults())
    } else {
      this.setState({searchResults: []})
    }
  }

  render() {

    const bookshelves = [
      {
        title: "Currently Reading",
        value: "currentlyReading"
      }, {
        title: "Want to read",
        value: "wantToRead"
      }, {
        title: "Read",
        value: "read"
      }
    ]

    return (<div className="app">
      <Route exact path='/' render={() => (<ListBooks books={this.state.books} bookshelves={bookshelves} onUpdateBook={this.updateBook}/>)}/>
      <Route path="/search" render={() => (<SearchBooks onUpdateBook={this.updateBook} onSearchBooks={this.searchBooks} searchResults={this.state.searchResults} onBack={this.clearSearchResults}/>)}/>
    </div>)
  }
}

export default BooksApp
