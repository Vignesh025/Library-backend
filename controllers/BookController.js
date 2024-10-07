const Book = require('../models/Book');

// Add a new book (Librarian only)
exports.addBook = async (req, res) => {
  const { title, author, isbn } = req.body;

  if (!title || !author || !isbn) {
    return res.status(400).json({ message: "All fields (title, author, isbn) are required" });
  }

  try {
    const book = new Book({
      title,
      author,
      isbn,
      status: 'AVAILABLE'
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update book details (Librarian only)
exports.updateBook = async (req, res) => {
  const { title, author } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Remove a book (Librarian only)
exports.removeBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.remove();
    res.json({ message: 'Book removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// View available books (Member can view, Librarian can view all)
exports.viewBooks = async (req, res) => {
  try {
    const books = req.user.role === 'LIBRARIAN' 
      ? await Book.find() // Librarian can view all books
      : await Book.find({ status: 'AVAILABLE' }); // Members can view available books only

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
