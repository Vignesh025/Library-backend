const Book = require('../models/Book');
const History = require('../models/History');

// Borrow a book (Member only)
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.status !== 'AVAILABLE') {
      return res.status(400).json({ message: 'Book not available' });
    }

    book.status = 'BORROWED';
    await book.save();

    const history = new History({
      userId: req.user.userId,
      bookId: book._id,
      action: 'BORROWED'
    });
    await history.save();

    res.json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Return a book (Member only)
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.status !== 'BORROWED') {
      return res.status(400).json({ message: 'Book not currently borrowed' });
    }

    book.status = 'AVAILABLE';
    await book.save();

    const history = new History({
      userId: req.user.userId,
      bookId: book._id,
      action: 'RETURNED'
    });
    await history.save();

    res.json({ message: 'Book returned successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// View borrowing history (both Librarian and Member)
exports.viewHistory = async (req, res) => {
  try {
    const history = req.user.role === 'LIBRARIAN'
      ? await History.find().populate('bookId userId') // Librarian sees all history
      : await History.find({ userId: req.user.userId }).populate('bookId'); // Member sees only their own history

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
