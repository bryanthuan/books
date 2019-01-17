import {
  ADD_BOOK,
  GET_BOOKS,
  GET_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  BOOK_LOADING
} from '../actions/types';

const initialState = {
  books: [],
  book: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOK_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case GET_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload)
      };
    case UPDATE_BOOK:
      return {
        ...state,
        book: action.payload,
      };
    default:
      return state;
  }
}
