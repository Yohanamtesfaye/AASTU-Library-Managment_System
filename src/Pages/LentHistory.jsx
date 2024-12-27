import React, { useState, useEffect } from 'react'
import { Search, Loader2, Calendar, Clock, FileCheck } from 'lucide-react'

// Mock data - replace with actual API call
const mockHistory = [
  {
    id: 1,
    studentName: "Abebe Kebede",
    studentId: "ETS0123/12",
    bookName: "Introduction to Computing",
    bookId: "CS101",
    lentTime: "2023-12-15T10:30",
    returnTime: "2023-12-29T14:20",
    onTime: true,
    type: "short"
  },
  {
    id: 2,
    studentName: "Tigist Alemu",
    studentId: "ETS0124/12",
    bookName: "Advanced Database Systems",
    bookId: "CS405",
    lentTime: "2023-11-10T14:20",
    returnTime: "2024-01-15T09:30",
    onTime: false,
    type: "long"
  },
  // Add more mock data here
]

const LentHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, onTime, late

  useEffect(() => {
    // Simulate API call
    const fetchHistory = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setHistory(mockHistory)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching history:', error)
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const filteredHistory = history.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'onTime') return matchesSearch && record.onTime
    if (filter === 'late') return matchesSearch && !record.onTime
    return matchesSearch
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a365d]">Lending History</h1>
        <p className="text-gray-600 mt-2">Complete record of all book lendings and returns</p>
      </div>

      {/* Search and Filter Controls */}
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
          <option value="all">All Returns</option>
          <option value="onTime">On Time</option>
          <option value="late">Late Returns</option>
        </select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 text-[#1a365d]">
            <FileCheck className="h-5 w-5" />
            <h3 className="font-semibold">Total Records</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{history.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 text-green-600">
            <Clock className="h-5 w-5" />
            <h3 className="font-semibold">On Time Returns</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {history.filter(record => record.onTime).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 text-red-600">
            <Calendar className="h-5 w-5" />
            <h3 className="font-semibold">Late Returns</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {history.filter(record => !record.onTime).length}
          </p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">Student Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Student ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Book Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Lent Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Return Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-[#1a365d]" />
                    <span>Loading history...</span>
                  </div>
                </td>
              </tr>
            ) : filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              filteredHistory.map((record) => (
                <tr 
                  key={record.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm">{record.studentName}</td>
                  <td className="px-6 py-4 text-sm">{record.studentId}</td>
                  <td className="px-6 py-4 text-sm">{record.bookName}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.type === 'short' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {record.type === 'short' ? 'Short Term' : 'Long Term'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(record.lentTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(record.returnTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.onTime 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.onTime ? 'On Time' : 'Late'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LentHistory