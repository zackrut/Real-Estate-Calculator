import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const calculators = [
    { path: '/rental-roi-calculator', name: 'Rental Property ROI', icon: 'fas fa-home' },
    { path: '/brrrr-calculator', name: 'BRRRR Strategy', icon: 'fas fa-sync' },
    { path: '/fix-flip-calculator', name: 'Fix & Flip Profit', icon: 'fas fa-hammer' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <i className="fas fa-calculator text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold text-gray-800">REI Calculator Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 hover:text-blue-900 font-medium flex items-center transition-colors duration-200"
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
              >
                Calculators <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 ${isDropdownOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'} transition-all duration-200`}>
                <div className="py-2">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.path}
                      to={calc.path}
                      className={`block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                        isActive(calc.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <i className={`${calc.icon} w-5 mr-2`}></i>
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link to="/about" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4 border-t border-gray-100`}>
          <div className="space-y-2 pt-4">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 pb-2">
              Calculators
            </div>
            {calculators.map((calc) => (
              <Link
                key={calc.path}
                to={calc.path}
                className={`block py-3 px-4 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  isActive(calc.path) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className={`${calc.icon} w-5 mr-3`}></i>
                {calc.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 mt-4 pt-4">
              <Link to="/about" className="block py-2 px-4 text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="block py-2 px-4 text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;