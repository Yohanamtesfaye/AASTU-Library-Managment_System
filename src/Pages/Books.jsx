import React, { useState, useEffect } from "react";
import { Search, Plus, Minus, X } from "lucide-react";

const dummyBooks = [
  {
    id: 1,
    name: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    courseType: "Software Engineering",
    publicationYear: 2009,
    image:
      "https://m.media-amazon.com/images/I/41T0iBxY8FL._SX440_BO1,204,203,200_.jpg",
    copies: 5,
    availability: "available",
  },
  {
    id: 2,
    name: "Clean Code",
    author: "Robert C. Martin",
    courseType: "Software Engineering",
    publicationYear: 2008,
    image:
      "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
    copies: 2,
    availability: "lent",
  },
  {
    id: 3,
    name: "Design Patterns",
    author: "Erich Gamma",
    courseType: "Software Engineering",
    publicationYear: 1994,
    image:
      "https://m.media-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg",
    copies: 0,
    availability: "out of circulation",
  },
  {
    id: 4,
    name: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    courseType: "Software Engineering",
    publicationYear: 1999,
    image:
      "https://m.media-amazon.com/images/I/51cUVaBWZzL._SX380_BO1,204,203,200_.jpg",
    copies: 3,
    availability: "available",
  },
  {
    id: 5,
    name: "Code Complete",
    author: "Steve McConnell",
    courseType: "Software Engineering",
    publicationYear: 2004,
    image:
      "https://m.media-amazon.com/images/I/41JOmGowq-L._SX408_BO1,204,203,200_.jpg",
    copies: 1,
    availability: "lent",
  },
  {
    id: 6,
    name: "Refactoring",
    author: "Martin Fowler",
    courseType: "Software Engineering",
    publicationYear: 1999,
    image:
      "https://m.media-amazon.com/images/I/41LBzpPXCOL._SX260_BO1,204,203,200_.jpg",
    copies: 4,
    availability: "available",
  },
  {
    id: 7,
    name: "Head First Design Patterns",
    author: "Eric Freeman",
    courseType: "Software Engineering",
    publicationYear: 2004,
    image:
      "https://m.media-amazon.com/images/I/61APhXCksuL._SX430_BO1,204,203,200_.jpg",
    copies: 2,
    availability: "available",
  },
  {
    id: 8,
    name: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    courseType: "Software Engineering",
    publicationYear: 1975,
    image:
      "https://m.media-amazon.com/images/I/51WIpM70FBL._SX334_BO1,204,203,200_.jpg",
    copies: 1,
    availability: "lent",
  },
  {
    id: 9,
    name: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    courseType: "Software Engineering",
    publicationYear: 2015,
    image:
      "https://m.media-amazon.com/images/I/41oYsXjLvZL._SX348_BO1,204,203,200_.jpg",
    copies: 5,
    availability: "available",
  },
  {
    id: 10,
    name: "The Clean Coder",
    author: "Robert C. Martin",
    courseType: "Software Engineering",
    publicationYear: 2011,
    image:
      "https://m.media-amazon.com/images/I/51W1sBPO7tL._SX382_BO1,204,203,200_.jpg",
    copies: 3,
    availability: "available",
  },
  {
    id: 11,
    name: "Software Engineering: A Practitioner's Approach",
    author: "Roger S. Pressman",
    courseType: "Software Engineering",
    publicationYear: 2014,
    image:
      "https://m.media-amazon.com/images/I/51G2oJKgJgL._SX258_BO1,204,203,200_.jpg",
    copies: 2,
    availability: "available",
  },
  {
    id: 12,
    name: "Agile Software Development: Principles, Patterns, and Practices",
    author: "Robert C. Martin",
    courseType: "Software Engineering",
    publicationYear: 2002,
    image:
      "https://m.media-amazon.com/images/I/51J4JJoVCzL._SX376_BO1,204,203,200_.jpg",
    copies: 3,
    availability: "lent",
  },
];

const Books = () => {
  const [books, setBooks] = useState(dummyBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    author: "",
    name: "",
    courseType: "",
    publicationYear: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    courseType: "",
    publicationYear: "",
    image: "",
    copies: 0,
    availability: "available",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddBook = () => {
    setBooks([...books, { ...newBook, id: books.length + 1 }]);
    setModalOpen(false);
    setNewBook({
      name: "",
      author: "",
      courseType: "",
      publicationYear: "",
      image: "",
      copies: 0,
      availability: "available",
    });
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (filters.author
        ? book.author.toLowerCase().includes(filters.author.toLowerCase())
        : true) &&
      (filters.name
        ? book.name.toLowerCase().includes(filters.name.toLowerCase())
        : true) &&
      (filters.courseType
        ? book.courseType
            .toLowerCase()
            .includes(filters.courseType.toLowerCase())
        : true) &&
      (filters.publicationYear
        ? book.publicationYear.toString().includes(filters.publicationYear)
        : true);

    return matchesSearch && matchesFilters;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCopyChange = (id, change) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, copies: Math.max(0, book.copies + change) }
          : book
      )
    );
  };

  return (
    <div className="p-6 h-[100vh] overflow-y-auto scrollbar-hide">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Book Catalog</h1>
        <p className="text-gray-600 mt-2">
          Browse and manage books available in the library
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name or author..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Filter by Author"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Filter by Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Filter by Course Type"
          name="courseType"
          value={filters.courseType}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Filter by Year"
          name="publicationYear"
          value={filters.publicationYear}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add Book Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-2 mb-2 bg-[#1a365d] text-white py-2 rounded-lg hover:bg-[#234678] transition-colors duration-200"
      >
        + Add New Book
      </button>

      {/* Add Book Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add New Book</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Name"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Course Type"
              value={newBook.courseType}
              onChange={(e) =>
                setNewBook({ ...newBook, courseType: e.target.value })
              }
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Publication Year"
              value={newBook.publicationYear}
              onChange={(e) =>
                setNewBook({ ...newBook, publicationYear: e.target.value })
              }
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newBook.image}
              onChange={(e) =>
                setNewBook({ ...newBook, image: e.target.value })
              }
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Copies"
              value={newBook.copies}
              onChange={(e) =>
                setNewBook({ ...newBook, copies: parseInt(e.target.value) })
              }
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newBook.availability}
              onChange={(e) =>
                setNewBook({ ...newBook, availability: e.target.value })
              }
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="lent">Lent</option>
              <option value="out of circulation">Out of Circulation</option>
            </select>
            <button
              onClick={handleAddBook}
              className="w-full bg-[#1a365d] text-white py-2 rounded-lg hover:bg-[#234678] transition-colors duration-200"
            >
              Add Book
            </button>
          </div>
        </div>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {currentBooks.map((book) => (
          <div key={book.id} className="border border-gray-300 rounded-lg p-4">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{book.name}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">
              Course Type: {book.courseType}
            </p>
            <p className="text-sm text-gray-600">
              Publication Year: {book.publicationYear}
            </p>
            <p className="text-sm text-gray-600">
              Copies: {book.copies} ({book.availability})
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mb-6">
        {Array.from(
          { length: Math.ceil(filteredBooks.length / booksPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#1a365d] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {/* Total Physical Copies and Copy Management */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Physical Copy Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Adjust Copy Count</h3>
            <ul className="space-y-2">
              {books.map((book) => (
                <li key={book.id} className="flex justify-between items-center">
                  <span>{book.name}:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyChange(book.id, -1)}
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{book.copies}</span>
                    <button
                      onClick={() => handleCopyChange(book.id, 1)}
                      className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
