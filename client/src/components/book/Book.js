import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getBook } from '../../actions/bookActions';
import isEmpty from '../../validation/is-empty';

class Book extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getBook(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.book.book === null && this.props.book.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { book, loading } = this.props.book;
    let bookContent;

    if (book === null || loading) {
      bookContent = <Spinner />;
    } else {
      bookContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/books" className="btn btn-light mb-3 float-left">
                Back To Books
              </Link>
            </div>

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
                </div>
                <div className="col-md-4 d-none d-md-block">
                  <h4>Available</h4>
                  <span>{book.available}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="book">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{bookContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  getBookByHandle: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  book: state.book
});

export default connect(mapStateToProps, { getBook })(Book);
