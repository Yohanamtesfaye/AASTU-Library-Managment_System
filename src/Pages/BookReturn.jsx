import React, { useState, useEffect } from 'react'
import { Search, Loader2, Calendar, AlertCircle, CheckCircle, Filter } from 'lucide-react'

// Mock data - replace with actual API call
const mockReturnHistory = [
  {
    id: 1,
    studentName: "Abebe Kebede",
    studentId: "ETS0123/12",
    bookName: "Introduction to Computing",
    bookId: "CS101",
    returnTime: "2024-01-15T10:30",
    condition: "good",
    onTime: true,
    remarks: "Book returned in perfect condition"
  },
  {
    id: 2,
    studentName: "Tigist Alemu",
    studentId: "ETS0124/12",
    bookName: "Advanced Database Systems",
    bookId: "CS405",
    returnTime: "2024-01-10T14:20",
    condition: "damaged",
    onTime: false,
    remarks: "Cover slightly damaged, pages intact"
  },
  {
    id: 3,
    studentName: "Mohammed Ahmed",
    studentId: "ETS0125/12",
    bookName: "Data Structures",
    bookId: "CS201",
    returnTime: "2024-01-12T09:15",
    condition: "lost",
    onTime: false,
    remarks: "Book reported as lost, fine applied"
  }
]

const ReturnHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    condition: 'all',
    returnStatus: 'all'
  })

  useEffect(() => {
    // Simulate API call
    const fetchHistory = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setHistory(mockReturnHistory)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching history:', error)
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const getConditionBadge = (condition) => {
    switch (condition) {
      case 'good':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Good
          </span>
        )
      case 'damaged':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Damaged
          </span>
        )
      case 'lost':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Lost
          </span>
        )
      default:
        return null
    }
  }

  const filteredHistory = history.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.bookId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCondition = filters.condition === 'all' || record.condition === filters.condition
    const matchesReturnStatus = filters.returnStatus === 'all' || 
      (filters.returnStatus === 'onTime' ? record.onTime : !record.onTime)
    
    return matchesSearch && matchesCondition && matchesReturnStatus
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a365d]">Return History</h1>
        <p className="text-gray-600 mt-2">Complete record of all returned books</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Total Returns</h3>
          <p className="text-2xl font-bold text-[#1a365d] mt-1">{history.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Good Condition</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {history.filter(r => r.condition === 'good').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Damaged</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {history.filter(r => r.condition === 'damaged').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Lost Books</h3>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {history.filter(r => r.condition === 'lost').length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
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
        
        <div className="flex gap-2">
          <select
            value={filters.condition}
            onChange={(e) => setFilters({...filters, condition: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
          >
            <option value="all">All Conditions</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="lost">Lost</option>
          </select>
          
          <select
            value={filters.returnStatus}
            onChange={(e) => setFilters({...filters, returnStatus: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
          >
            <option value="all">All Returns</option>
            <option value="onTime">On Time</option>
            <option value="late">Late Returns</option>
          </select>
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
              <th className="px-6 py-3 text-left text-sm font-semibold">Book ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Return Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Condition</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-[#1a365d]" />
                    <span>Loading history...</span>
                  </div>
                </td>
              </tr>
            ) : filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
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
                  <td className="px-6 py-4 text-sm">{record.bookId}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(record.returnTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getConditionBadge(record.condition)}
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
                  <td className="px-6 py-4 text-sm">
                    {record.remarks}
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

export default ReturnHistory