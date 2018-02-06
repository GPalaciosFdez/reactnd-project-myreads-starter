import React, {Component} from 'react'
import Book from './Book'

class Bookshelf extends Component{
  render(){
    return(
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map(book => (
                <Book book={book} key={book.id} onUpdateBook={this.props.onUpdateBook}/>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelf
