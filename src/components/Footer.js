import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const calculators = [
    { path: '/rental-roi-calculator', name: 'Rental Property ROI' },
    { path: '/brrrr-calculator', name: 'BRRRR Strategy' },
    { path: '/fix-flip-calculator', name: 'Fix & Flip Profit' }
  ];

  const company = [
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' }
  ];

  const legal = [
    { path: '/privacy', name: 'Privacy Policy' },
    { path: '/terms', name: 'Terms of Service' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 min-h-[400px]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-[280px]">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-calculator text-white"></i>
              </div>
              <span className="text-xl font-bold text-white">REI Calculator Pro</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Professional real estate investment calculators trusted by thousands of investors worldwide.
            </p>
            
          </div>

          {/* Calculator Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2">
              {calculators.map((calc) => (
                <li key={calc.path}>
                  <Link 
                    to={calc.path} 
                    className="hover:text-white transition-colors"
                  >
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} REI Calculator Pro. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Not financial advice. Consult professionals for investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;