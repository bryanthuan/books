import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { updateBook, getBook } from '../../actions/bookActions';
import isEmpty from '../../validation/is-empty';

class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      pages: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getBook(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.book.book) {
      const book = nextProps.book.book;

      // If book field doesnt exist, make empty string
      book.title = !isEmpty(book.title) ? book.title : '';
      book.author = !isEmpty(book.author) ? book.author : '';
      book.pages = !isEmpty(book.pages) ? book.pages : '';

      // Set component fields state
      this.setState({
        title: book.title,
        author: book.author,
        pages: book.pages,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const bookData = {
      title: this.state.title,
      author: this.state.author,
      pages: this.state.pages,
    };

    this.props.updateBook(bookData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-book">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Book</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Book Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="A good book title with promote better view"
                />
                <TextFieldGroup
                  placeholder="Author"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  error={errors.author}
                  info="Book's author"
                />
                <TextFieldGroup
                  placeholder="Pages"
                  name="pages"
                  value={this.state.pages}
                  onChange={this.onChange}
                  error={errors.pages}
                  info="Book's pages"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateBook.propTypes = {
  updateBook: PropTypes.func.isRequired,
  getBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  book: state.book,
  errors: state.errors
});

export default connect(mapStateToProps, { updateBook, getBook })(
  withRouter(CreateBook)
);
