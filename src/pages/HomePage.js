import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AdBox from '../components/AdBox';

const HomePage = () => {
  const calculators = [
    {
      id: 'rental-roi',
      title: 'Rental Property ROI',
      description: 'Analyze rental property investments with comprehensive cash flow, cap rate, and return calculations.',
      icon: 'fas fa-home',
      badge: 'Popular',
      badgeColor: 'bg-green-500',
      path: '/rental-roi-calculator'
    },
    {
      id: 'brrrr',
      title: 'BRRRR Strategy',
      description: 'Calculate capital recovery and infinite returns for Buy, Rehab, Rent, Refinance, Repeat strategy.',
      icon: 'fas fa-sync',
      badge: 'Advanced',
      badgeColor: 'bg-blue-500',
      path: '/brrrr-calculator'
    },
    {
      id: 'fix-flip',
      title: 'Fix & Flip Profit',
      description: 'Determine profitability of house flipping projects with detailed cost breakdowns and timeline analysis.',
      icon: 'fas fa-hammer',
      badge: 'Popular',
      badgeColor: 'bg-green-500',
      path: '/fix-flip-calculator'
    },
    {
      id: 'airbnb-vs-rental',
      title: 'Airbnb vs Rental',
      description: 'Compare short-term vacation rentals with traditional long-term rentals to find your optimal strategy.',
      icon: 'fas fa-bed',
      badge: 'New',
      badgeColor: 'bg-purple-500',
      path: '/airbnb-vs-rental-calculator'
    }
  ];

  return (
    <>
      <Helmet>
        <title>REI Calculator Pro - Professional Real Estate Investment Calculators</title>
        <meta name="description" content="Free professional real estate investment calculators including rental property ROI, BRRRR strategy, and fix & flip profit analysis. Make data-driven investment decisions." />
        <meta name="keywords" content="real estate calculator, investment property calculator, rental ROI, BRRRR calculator, fix and flip calculator" />
        <link rel="canonical" href="https://reicalculator.pro/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="REI Calculator Pro - Professional Real Estate Investment Calculators" />
        <meta property="og:description" content="Free professional real estate investment calculators including rental property ROI, BRRRR strategy, and fix & flip profit analysis." />
        <meta property="og:url" content="https://reicalculator.pro/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <AdBox size="mobile" className="mb-4" />

        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 min-h-[600px] flex items-center">
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight min-h-[120px] md:min-h-[180px] flex items-center justify-center flex-col">
                <span>Professional Real Estate</span>
                <span className="block text-green-400">Investment Calculators</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Make Data-Driven Property Investment Decisions
              </p>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-green-500 bg-opacity-20 backdrop-filter backdrop-blur-lg border border-green-400 border-opacity-30 px-4 py-2 rounded-full">
                  <i className="fas fa-check text-green-400 mr-2"></i>
                  <span className="font-semibold">100% Free</span>
                </div>
                <div className="bg-blue-500 bg-opacity-20 backdrop-filter backdrop-blur-lg border border-blue-400 border-opacity-30 px-4 py-2 rounded-full">
                  <i className="fas fa-user-slash text-blue-400 mr-2"></i>
                  <span className="font-semibold">No Sign-up Required</span>
                </div>
                <div className="bg-purple-500 bg-opacity-20 backdrop-filter backdrop-blur-lg border border-purple-400 border-opacity-30 px-4 py-2 rounded-full">
                  <i className="fas fa-bolt text-purple-400 mr-2"></i>
                  <span className="font-semibold">Instant Results</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#calculators" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl pulse-glow cursor-pointer"
                >
                  Start Calculating
                </a>
                <a 
                  href="#learn-more" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 cursor-pointer"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Cards */}
        <section id="calculators" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Professional Investment Calculators
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive suite of real estate investment calculators, 
                designed by professionals for serious investors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {calculators.map((calc) => (
                <div 
                  key={calc.id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 ${calc.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {calc.badge}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i className={`${calc.icon} text-white text-2xl`}></i>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {calc.title}
                  </h3>
                  <p className="text-gray-600 mb-8 text-center leading-relaxed">
                    {calc.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      to={calc.path}
                      className="flex-1 text-center py-3 px-6 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      Calculate Now
                    </Link>
                    <button 
                      onClick={() => window.scrollTo({ top: document.getElementById('learn-more').offsetTop - 80, behavior: 'smooth' })}
                      className="flex-1 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="learn-more" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Why Choose Our Calculators?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built by real estate professionals for serious investors who need accurate, 
                comprehensive analysis tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-chart-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get detailed insights with multiple metrics including cash flow, ROI, cap rates, and break-even analysis.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-share-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Save & Share Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  Export calculations to PDF, print professional reports, and share results via shareable URLs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-mobile-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mobile Friendly</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access all calculators from any device. Fully responsive design works perfectly on phones and tablets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdBox size="footer" className="mt-8" />
      </div>
    </>
  );
};

export default HomePage;