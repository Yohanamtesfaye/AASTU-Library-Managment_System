import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Menu } from 'lucide-react'

const LibrarianLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <div className={`
          fixed md:static 
          transition-all duration-300 ease-in-out
          min-h-[calc(100vh-4rem)] 
          bg-[#1a365d] 
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 md:w-20 -translate-x-full md:translate-x-0'}
          z-30
        `}>
          <Sidebar collapsed={!sidebarOpen} />
        </div>
        <div className={`
          flex-1 
          transition-all duration-300 ease-in-out
          p-4 md:p-8
          ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}
        `}>
          <div className="bg-white h-screen rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibrarianLayout