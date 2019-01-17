import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import isEmpty from '../../validation/is-empty';

class BookItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <tr>
        <th scope="row">{book._id}</th>
        <td>{book.title}</td>
        <td>{book.author || 'not set'}</td>
        <td>{book.pages}</td>
        <td>{book.published_date}</td>
        <td>
          <Link to={`/edit-book/${book._id}`} className="btn btn-info">
            Update
              </Link> |
           <Link to={`/delete-book/${book._id}`} className="btn btn-danger">
            Delete
              </Link> </td>
      </tr>
    );
  }
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookItem;
