import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class BookItem extends Component {
  render() {
    const { book } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={book.coverUrl} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{book.title}</h3>
            <p>
              {isEmpty(book.author) ? null : (
                <span>at {book.author}</span>
              )}
            </p>
            <p>
              {isEmpty(book.published_date) ? null : (
                <span>{book.published_date}</span>
              )}
            </p>
            <p>
              {isEmpty(book.pages) ? null : (
                <span>{book.pages}</span>
              )}
            </p>
            <Link to={`/book/${book._id}`} className="btn btn-info">
              View Book
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Available</h4>
            <span>{book.available}</span>
          </div>
        </div>
      </div>
    );
  }
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookItem;
