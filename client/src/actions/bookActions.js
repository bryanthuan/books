import axios from 'axios';

import {
  ADD_BOOK,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_BOOKS,
  GET_BOOK,
  BOOK_LOADING,
  DELETE_BOOK
} from './types';

// Add Book
export const addBook = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/books', postData)
    .then(res =>
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all Books
export const getBooks = () => dispatch => {
  dispatch(setBookLoading());
  axios
    .get('/api/books')
    .then(res =>
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOKS,
        payload: null
      })
    );
};

// Get a Book
export const getBook = id => dispatch => {
  dispatch(setBookLoading());
  axios
    .get(`/api/books/${id}`)
    .then(res =>
      dispatch({
        type: GET_BOOK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOK,
        payload: null
      })
    );
};

// Patch Book
export const updateBook = id => dispatch => {
  axios
    .patch(`/api/books/${id}`)
    .then(res =>
      dispatch({
        type: UPDATE_BOOK,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Delete Book
export const deleteBook = id => dispatch => {
  axios
    .delete(`/api/books/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_BOOK,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setBookLoading = () => {
  return {
    type: BOOK_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
