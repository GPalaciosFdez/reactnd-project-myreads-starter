import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    bookIDs: [],
    bookshelves: [
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
    ],
    searchResults: []
  }

  componentDidMount() {
    this.getBooksInShelves()
  }

  getBooksInShelves = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
        bookIDs: books.map(book => book.id)
      })
    })
  }

  updateBook = (bookToUpdate, newShelf) => {
    let newBooks = this.state.books
    const pos = this.state.bookIDs.indexOf(bookToUpdate.id)
    if (pos !== -1)
      newBooks[pos].shelf = newShelf
    this.setState(state => ({books: newBooks}))

    BooksAPI.update(bookToUpdate, newShelf)
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchResults) => {
        this.getBooksInShelves()
        if (searchResults) {
          const filteredResults = searchResults.map((result) => {
            let pos = this.state.bookIDs.indexOf(result.id)
            if (pos !== -1) {
              return this.state.books[pos]
            } else {
              result.shelf = "none"
              return result
            }
          })
          this.setState({searchResults: filteredResults})
        }
      })
    } else {
      this.setState({searchResults: []})
    }
  }

  render() {
    return (<div className="app">
      <Route exact="exact" path='/' render={() => (<ListBooks books={this.state.books} bookshelves={this.state.bookshelves} onUpdateBook={this.updateBook}/>)}/>
      <Route path="/search" render={() => (<SearchBooks onUpdateBook={this.updateBook} onSearchBooks={this.searchBooks} searchResults={this.state.searchResults}/>)}/>
    </div>)
  }
}

export default BooksApp
