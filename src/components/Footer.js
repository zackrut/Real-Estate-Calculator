import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const calculators = [
    { path: '/rental-roi-calculator', name: 'Rental Property ROI' },
    { path: '/brrrr-calculator', name: 'BRRRR Strategy' },
    { path: '/fix-flip-calculator', name: 'Fix & Flip Profit' }
  ];

  const resources = [
    { href: '#guides', name: 'Investment Guides' },
    { href: '#tutorials', name: 'Calculator Tutorials' },
    { href: '#strategies', name: 'Investment Strategies' },
    { href: '#market-analysis', name: 'Market Analysis' },
    { href: '#faq', name: 'FAQ' }
  ];

  const legal = [
    { href: '#privacy', name: 'Privacy Policy' },
    { href: '#terms', name: 'Terms of Service' },
    { href: '#disclaimer', name: 'Disclaimer' },
    { href: '#contact', name: 'Contact Us' },
    { href: '#about', name: 'About' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
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
              <li>
                <span className="text-gray-500 text-sm">
                  Wholesale Calculator <span className="text-xs">(Coming Soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.href}>
                  <a 
                    href={resource.href} 
                    className="hover:text-white transition-colors"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
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