const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 10, max: 300 })) {
    errors.title = 'Book Title must be between 10 and 150 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
