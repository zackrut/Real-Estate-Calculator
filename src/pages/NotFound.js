import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | REI Calculator Pro</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our professional real estate investment calculators." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-exclamation-triangle text-white text-3xl"></i>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
            <p className="text-gray-500 mb-8">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              <i className="fas fa-home mr-2"></i>
              Go to Homepage
            </Link>

            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/rental-roi-calculator"
                className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
              >
                <i className="fas fa-home mr-2"></i>
                Rental ROI Calculator
              </Link>
              <Link
                to="/brrrr-calculator"
                className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
              >
                <i className="fas fa-sync mr-2"></i>
                BRRRR Calculator
              </Link>
              <Link
                to="/fix-flip-calculator"
                className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
              >
                <i className="fas fa-hammer mr-2"></i>
                Fix & Flip Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;