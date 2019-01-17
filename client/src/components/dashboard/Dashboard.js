import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';
import { getBooks } from '../../actions/bookActions';

class Books extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { books, loading } = this.props.book;
    let bookItems;

    if (books === null || loading) {
      bookItems = <tr><td><Spinner /></td></tr>;
    } else {
      if (books.length > 0) {
        bookItems = books.map(book => (
          <BookItem key={book._id} book={book} />
        ));
      } else {
        bookItems = <tr><td>No books found...</td></tr>;
      }
    }

    return (
      <div className="books">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-left">Developer Books</h1>
              <Link to={`/create-book/`} className="btn btn-info">
                Add new Book
              </Link>
              <table className="table mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Pages</th>
                    <th scope="col">Published Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookItems}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Books.propTypes = {
  getBooks: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  book: state.book
});

export default connect(mapStateToProps, { getBooks })(Books);
