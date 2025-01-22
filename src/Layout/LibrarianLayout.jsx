import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Menu } from 'lucide-react'

const LibrarianLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Layout */}
      <div className="flex"> 
        {/* Sidebar */}
        <div className={`
          fixed left-0 top-16 bottom-0
          transition-all duration-300 ease-in-out
          bg-[#1a365d]
          ${sidebarOpen 
            ? 'w-[280px] translate-x-0' 
            : 'w-0 md:w-20 -translate-x-full md:translate-x-0'
          }
          z-30
        `}>
          <Sidebar collapsed={!sidebarOpen} />
        </div>

        {/* Main Content */}
        <div className={`
          flex-1
          transition-all duration-300 ease-in-out
          p-4 md:p-8
          ${sidebarOpen 
            ? 'md:ml-[280px]' 
            : 'md:ml-20'
          }
        `}>
          <div className="bg-white rounded-lg shadow-sm p-6 overflow-auto">
            <Outlet />
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default LibrarianLayout