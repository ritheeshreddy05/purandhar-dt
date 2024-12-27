import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, BarChart2, Cloud, Leaf, Menu, X, Settings, Bell } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2 hover:text-green-200 transition duration-150">
                <Leaf className="h-8 w-8" />
                <span className="font-bold text-xl">AgriAssist</span>
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="flex items-center space-x-2 hover:text-green-200 transition duration-150 px-3 py-2 rounded-md hover:bg-green-700">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/monitoring" className="flex items-center space-x-2 hover:text-green-200 transition duration-150 px-3 py-2 rounded-md hover:bg-green-700">
                  <BarChart2 className="h-5 w-5" />
                  <span>Monitoring</span>
                </Link>
                <Link to="/weather" className="flex items-center space-x-2 hover:text-green-200 transition duration-150 px-3 py-2 rounded-md hover:bg-green-700">
                  <Cloud className="h-5 w-5" />
                  <span>Weather</span>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-green-700 transition duration-150">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-green-700 transition duration-150">
                <Settings className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-green-700 transition duration-150"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-3 space-y-2">
              <Link to="/" className="block px-3 py-2 rounded-md hover:bg-green-700 transition duration-150">
                <div className="flex items-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link to="/monitoring" className="block px-3 py-2 rounded-md hover:bg-green-700 transition duration-150">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-5 w-5" />
                  <span>Monitoring</span>
                </div>
              </Link>
              <Link to="/weather" className="block px-3 py-2 rounded-md hover:bg-green-700 transition duration-150">
                <div className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5" />
                  <span>Weather</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2023 AgriAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;