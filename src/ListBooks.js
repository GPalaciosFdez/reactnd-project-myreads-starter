import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {

  render() {
    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {this.props.bookshelves.map(bookshelf => (<Bookshelf bookShelfTitle={bookshelf.title} key={bookshelf.value} books={this.props.books.filter(book => book.shelf === bookshelf.value)} onUpdateBook={this.props.onUpdateBook}/>))}
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>)
  }
}

export default ListBooks
