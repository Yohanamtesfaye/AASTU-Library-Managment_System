import React, { useState } from 'react'
import { BookOpen, Users, Calendar, BookmarkCheck, X } from 'lucide-react'

const LendForm = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    bookName: '',
    bookId: '',
    lendTime: '',
    dueDate: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/lend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          lendType: type
        })
      })
      if (response.ok) {
        onClose()
        // Add success notification here
      }
    } catch (error) {
      console.error('Error:', error)
      // Add error notification here
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="sticky top-0 right-4 text-gray-500 hover:text-gray-700 float-right"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-2xl font-semibold text-[#1a365d] mb-6">
          {type === 'short' ? 'Short Term Lending' : 'Long Term Lending'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 pb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                value={formData.studentName}
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                value={formData.bookName}
                onChange={(e) => setFormData({...formData, bookName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book ID
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                value={formData.bookId}
                onChange={(e) => setFormData({...formData, bookId: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lend Time
              </label>
              <input
                type="datetime-local"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                value={formData.lendTime}
                onChange={(e) => setFormData({...formData, lendTime: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="datetime-local"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>
          <div className="sticky bottom-0 bg-white pt-4">
            <button
              type="submit"
              className="w-full bg-[#1a365d] text-white py-2 rounded-lg hover:bg-[#234678] transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const LendOption = ({ title, description, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex-1 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group m-4"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-[#1a365d] rounded-full group-hover:scale-110 transition-transform duration-200">
        <Icon className="h-8 w-8 text-[#c5a02f]" />
      </div>
      <h3 className="text-xl font-semibold text-[#1a365d]">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </button>
)

const Lend = () => {
  const [isShortTermOpen, setIsShortTermOpen] = useState(false)
  const [isLongTermOpen, setIsLongTermOpen] = useState(false)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#1a365d] mb-6">Lend a Book</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <LendOption
          title="Short Term Lending"
          description="For undergraduate students only."
          icon={BookOpen}
          onClick={() => setIsShortTermOpen(true)}
        />
        
        <LendOption
          title="Long Term Lending"
          description="For masters students and staff members. Extended lending period available."
          icon={Calendar}
          onClick={() => setIsLongTermOpen(true)}
        />
      </div>

      <LendForm 
        isOpen={isShortTermOpen} 
        onClose={() => setIsShortTermOpen(false)}
        type="short"
      />
      
      <LendForm 
        isOpen={isLongTermOpen} 
        onClose={() => setIsLongTermOpen(false)}
        type="long"
      />
    </div>
  )
}

export default Lend