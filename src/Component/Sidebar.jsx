import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookPlus, BookOpen, Users, Settings, Library, GraduationCap, BookCopy, History, ChevronRight } from 'lucide-react'
import { useTranslation } from "react-i18next";


const Sidebar = ({ collapsed }) => {
  const { t, i18n } = useTranslation();
  const menuItems = [
    {
      section: t('Main'),
      items: [
        { path: '/', icon: LayoutDashboard, label: t('Library Dashboard') },
        { path: '/books', icon: Library, label: t('Books') },
      ]
    },
    {
      section: t('Students'),
      items: [
        { path: '/student-list', icon: GraduationCap, label: t('Students') },
      ]
    },
    {
      section: t('Book Management'),
      items: [
        { path: '/lend', icon: BookPlus, label: t('Lend A Book') },
        { path: '/lent-list', icon: BookOpen, label: t('Lent Book List') },
        { path: '/history', icon: History, label: t('Lending History') },
        { path: '/returns', icon: BookCopy, label: t('Book Returns') },
      ]
    },
    {
      section: t('Settings'),
      items: [
        { path: '/setting', icon: Settings, label: t('Settings') },
      ]
    }
  ]
  
  const location = useLocation()

  return (
    <aside className="fixed top-0 left-0 h-screen w-[280px] bg-[#1a365d] text-white shrink-0 transition-all duration-300 ease-in-out z-50">
      <div className="relative h-full">
        <div className="flex flex-col gap-6 p-4 h-full overflow-y-auto custom-scrollbar">
          {menuItems.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {!collapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">
                  {section.section}
                </h3>
              )}
              
              {section.items.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    className={`
                      relative flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#234678] to-[#1a365d] text-[#c5a02f]' 
                        : 'text-gray-300 hover:bg-[#234678]/50 hover:text-[#c5a02f]'
                      }
                    `}
                  >
                    <div className={`
                      relative flex items-center
                      ${isActive ? 'text-[#c5a02f]' : 'text-gray-300 group-hover:text-[#c5a02f]'}
                    `}>
                      <Icon className="h-5 w-5" />
                      {isActive && (
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#c5a02f] rounded-full" />
                      )}
                    </div>
                    
                    {!collapsed && (
                      <>
                        <span className="font-medium whitespace-nowrap flex-1">
                          {item.label}
                        </span>
                        <ChevronRight className={`
                          h-4 w-4 opacity-0 -translate-x-2
                          transition-all duration-200
                          group-hover:opacity-100 group-hover:translate-x-0
                          ${isActive ? 'text-[#c5a02f]' : 'text-gray-300'}
                        `} />
                      </>
                    )}

                    {/* Hover effect */}
                    <div className={`
                      absolute inset-0 rounded-lg opacity-0 
                      group-hover:opacity-100 pointer-events-none
                      transition-opacity duration-200
                      ${isActive ? 'bg-white/5' : 'bg-white/2'}
                    `} />
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* Bottom gradient fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1a365d] to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </aside>
  )
}

export default Sidebar