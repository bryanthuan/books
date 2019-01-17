import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import BookItem from './BookItem';
import { getBooks } from '../../actions/bookActions';

class Books extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { books, loading } = this.props.book;
    let bookItems;

    if (books === null || loading) {
      bookItems = <Spinner />;
    } else {
      if (books.length > 0) {
        bookItems = books.map(book => (
          <BookItem key={book._id} book={book} />
        ));
      } else {
        bookItems = <h4>No books found...</h4>;
      }
    }

    return (
      <div className="books">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Books</h1>
              <p className="lead text-center">
                Browse all developer books
              </p>
              {bookItems}
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
