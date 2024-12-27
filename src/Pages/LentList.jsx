import React, { useState, useEffect } from 'react';
import { Search, Loader2, CheckCircle, BookOpen, Calendar, AlertCircle } from 'lucide-react';

// Mock data - replace with actual API call
const mockData = [
  {
    id: 1,
    studentName: "Abebe Kebede",
    studentId: "ETS0123/12",
    bookName: "Introduction to Computing",
    bookId: "CS101",
    lentTime: "2024-01-15T10:30",
    dueDate: "2024-01-29T10:30",
    type: "short"
  },
  {
    id: 2,
    studentName: "Tigist Alemu",
    studentId: "ETS0124/12",
    bookName: "Advanced Database Systems",
    bookId: "CS405",
    lentTime: "2024-01-10T14:20",
    dueDate: "2024-03-10T14:20",
    type: "long"
  },
  // Add more mock data as needed
];

const LentList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, short, long
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnForm, setReturnForm] = useState({
    returnTime: '',
    condition: '',
    status: '',
    remarks: ''
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setBooks(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReturn = (book) => {
    setSelectedBook(book);
    setShowReturnForm(true);
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBooks(books.filter(book => book.id !== selectedBook.id));
      setShowReturnForm(false);
      // Add success notification here
    } catch (error) {
      console.error('Error returning book:', error);
      // Add error notification here
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && book.type === filter;
  });

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#1a365d] mb-6">Lent Books List</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name, ID, or book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
        >
          <option value="all">All Books</option>
          <option value="short">Short Term</option>
          <option value="long">Long Term</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">Student Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Student ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Book Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Book ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Lent Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-[#1a365d]" />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr 
                  key={book.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm">{book.studentName}</td>
                  <td className="px-6 py-4 text-sm">{book.studentId}</td>
                  <td className="px-6 py-4 text-sm">{book.bookName}</td>
                  <td className="px-6 py-4 text-sm">{book.bookId}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(book.lentTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(book.dueDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      book.type === 'short' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {book.type === 'short' ? 'Short Term' : 'Long Term'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {isOverdue(book.dueDate) ? (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>Overdue</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-green-600">
                        <Calendar className="h-4 w-4" />
                        <span>On Time</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleReturn(book)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1a365d] text-white hover:bg-[#234678] transition-colors duration-200"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Return</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Return Book Form */}
      {showReturnForm && selectedBook && (
        <div className="fixed lg:mt-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">Return Book</h2>
            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Student Name</label>
                <input type="text" value={selectedBook.studentName} readOnly className="mt-1 block w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                <input type="text" value={selectedBook.studentId} readOnly className="mt-1 block w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Book Name</label>
                <input type="text" value={selectedBook.bookName} readOnly className="mt-1 block w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Book ID</label>
                <input type="text" value={selectedBook.bookId} readOnly className="mt-1 block w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Return Time</label>
                <input
                  type="datetime-local"
                  value={returnForm.returnTime}
                  onChange={(e) => setReturnForm({ ...returnForm, returnTime: e.target.value })}
                  className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Condition</label>
                <select
                  value={returnForm.condition}
                  onChange={(e) => setReturnForm({ ...returnForm, condition: e.target.value })}
                  className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={returnForm.status}
                  onChange={(e) => setReturnForm({ ...returnForm, status: e.target.value })}
                  className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select status</option>
                  <option value="returned">Returned</option>
                  <option value="damaged">Damaged</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea
                  value={returnForm.remarks}
                  onChange={(e) => setReturnForm({ ...returnForm, remarks: e.target.value })}
                  className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows="2"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 sticky bottom-0 bg-white pt-2">
                <button
                  type="button"
                  onClick={() => setShowReturnForm(false)}
                  className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LentList;

