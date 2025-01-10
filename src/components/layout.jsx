import React from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import Breadcrumb from './breadcrumb'

const Layout = ({ children }) => {
  const location = useLocation()

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Desktop Navigation */}
      <Navigation />

      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Main Content */}
      <main className='pt-16 pb-20 md:pb-8'>
        <div className=' max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Breadcrumb - Show only if not on home page */}
          {location.pathname !== '/' && <Breadcrumb />}

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
