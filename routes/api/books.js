const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Book model
const Book = require('../../models/Book');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateBookInput = require('../../validation/book');

// @route   GET api/books/test
// @desc    Tests book route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'books Works' }));

// @route   GET api/books
// @desc    Get books
// @access  Public
router.get('/', (req, res) => {
  Book.find()
    .sort({ date: -1 })
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No books found' }));
});

// @route   GET api/books/:id
// @desc    Get book by id
// @access  Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err =>
      res.status(404).json({ nobookfound: 'No book found with that ID' })
    );
});

// @route   POST api/books
// @desc    Create book
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      available: req.body.available,
      published_date: req.body.published_date,
      user: req.user.id
    });

    newBook.save().then(book => res.json(book));
  }
);
// @route   POST api/books
// @desc    Update book
// @access  Private
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const updatedBook={
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      available: req.body.available,
    };

    Book.findOneAndUpdate({
      _id: req.params.id,
    }, { $set: updatedBook }, { new: true })
      .then(book => {
        if (!book) {
          return res.status(404).send();
        }
        return res.json(book)

      }).catch(e => res.status(404).send());
  }
);

// @route   DELETE api/books/:id
// @desc    Delete book
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Book.findById(req.params.id)
        .then(book => {
          // Check for book owner
          if (book.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          book.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ booknotfound: 'No book found' }));
    });
  }
);

module.exports = router;
