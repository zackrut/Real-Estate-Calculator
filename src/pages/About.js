import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About REI Calculator Pro - Professional Real Estate Investment Tools</title>
        <meta name="description" content="Learn about REI Calculator Pro's mission to provide free, professional-grade real estate investment calculators for rental properties, BRRRR strategies, and fix & flip analysis." />
        <meta name="keywords" content="about rei calculator pro, real estate investment tools, free calculators, property analysis" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                About REI Calculator Pro
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                Professional tools for smart real estate investors
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Mission Statement */}
              <div className="bg-white rounded-lg p-8 shadow-md mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  REI Calculator Pro provides free, professional-grade calculators for real estate investors. 
                  Our tools help you make data-driven investment decisions by quickly analyzing rental properties, 
                  BRRRR strategies, and fix-and-flip opportunities.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We built these calculators because most real estate analysis tools are either too expensive 
                  or too complicated. Our goal is to make professional REI analysis accessible to everyone, 
                  from beginners to experienced investors.
                </p>
              </div>

              {/* Why Use Our Calculators */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Use Our Calculators?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-chart-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Accuracy</h3>
                      <p className="text-gray-600">
                        Built with industry-standard formulas and validated by real estate professionals. 
                        Get the same level of analysis as expensive commercial tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-mouse-pointer text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Easy to Use</h3>
                      <p className="text-gray-600">
                        Intuitive interface designed for speed and clarity. Get comprehensive analysis 
                        in minutes, not hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-user-slash text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">No Sign-Up Required</h3>
                      <p className="text-gray-600">
                        Start calculating immediately. No accounts, no passwords, no personal information 
                        required. Your privacy is protected.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Completely Free</h3>
                      <p className="text-gray-600">
                        All calculators are 100% free, forever. No hidden fees, no premium tiers, 
                        no limitations on usage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;