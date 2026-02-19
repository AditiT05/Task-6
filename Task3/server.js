const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

const PORT = 3000;

// In-memory array to store books
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" },
  { id: 3, title: "The Power of Now", author: "Eckhart Tolle" },
  { id: 4, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 5, title: "Think and Grow Rich", author: "Napoleon Hill" },
  { id: 6, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
  { id: 7, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey" },
  { id: 8, title: "Deep Work", author: "Cal Newport" },
  { id: 9, title: "The Four Agreements", author: "Don Miguel Ruiz" },
  { id: 10, title: "Start with Why", author: "Simon Sinek" }
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET single book by ID
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// POST - Add new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT - Update book by ID
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  books[bookIndex] = {
    id,
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author
  };
  res.json(books[bookIndex]);
});

// DELETE - Remove book by ID
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  const deletedBook = books.splice(bookIndex, 1);
  res.json({ message: "Book deleted", book: deletedBook[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
