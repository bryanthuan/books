import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { addBook } from '../../actions/bookActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      published_date: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    // Add success
    if (nextProps.book) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const bookData = {
      title: this.state.title,
      author: this.state.author,
      pages: this.state.pages,
      available: this.state.available,
      published_date: this.state.published_date || new Date()
    };

    this.props.addBook(bookData, this.props.history);
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
              <h1 className="display-4 text-center">Add new book</h1>
              <p className="lead text-center">
                Define book information for publish on our store
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Book tilte"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="A good book title with promote better view"
                />
                <TextFieldGroup
                  placeholder="author"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  error={errors.author}
                  info="Book's author"
                />
                <TextFieldGroup
                  placeholder="pages"
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

CreateProfile.propTypes = {
  book: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  book: state.book,
  errors: state.errors
});

export default connect(mapStateToProps, { addBook })(
  withRouter(CreateProfile)
);
