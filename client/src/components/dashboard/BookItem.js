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
        <td>View |
          <Link to={`/edit-book/`} className="btn btn-info">
            Update
              </Link> |
          Delete </td>
      </tr>
    );
  }
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookItem;
