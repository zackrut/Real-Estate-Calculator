import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - REI Calculator Pro</title>
        <meta name="description" content="Privacy Policy for REI Calculator Pro - Learn how we protect your privacy and handle data on our real estate investment calculators." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Privacy Policy
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                Your privacy matters to us
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-md">
              <p className="text-sm text-gray-500 mb-8">Last updated: December 2024</p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                  <p className="text-gray-600 leading-relaxed">
                    REI Calculator Pro ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
                    This Privacy Policy explains how we collect, use, and safeguard information when you use our website and calculators.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Don't Collect</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    <strong>Calculator Data:</strong> We do not collect, store, or have access to any data you enter into our calculators. 
                    All calculations are performed locally in your browser, and your financial information remains completely private.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>Personal Information:</strong> We do not require account registration or collect personal information 
                    to use our calculators. You can use all our tools completely anonymously.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Do Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics Data</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We use Google Analytics to understand how visitors use our site. This includes anonymous data such as:
                      </p>
                      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                        <li>Pages visited and time spent on site</li>
                        <li>General geographic location (country/state level)</li>
                        <li>Device type and browser information</li>
                        <li>How you found our website (referral sources)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Form Data</h3>
                      <p className="text-gray-600 leading-relaxed">
                        When you submit our contact form, we collect only the information you provide (name, email, message) 
                        to respond to your inquiry. This data is stored securely and used solely for communication purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Information</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Analytics data helps us improve our calculators and website experience</li>
                    <li>Contact form submissions are used only to respond to your questions or feedback</li>
                    <li>We never sell, rent, or share your information with third parties for marketing purposes</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We use cookies only for Google Analytics to track website usage. These cookies do not store personal information 
                    and help us understand how to improve our site. You can disable cookies in your browser settings if preferred.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We implement appropriate security measures to protect any information we collect. Our website uses HTTPS encryption, 
                    and contact form data is processed through secure channels.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Services</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We use Google Analytics for website analytics. Google's privacy policy governs their data collection practices. 
                    We do not integrate with any other third-party services that collect personal data.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Since we don't collect personal data through our calculators, there's no personal data to access or delete. 
                    If you've contacted us via our contact form and wish to have that data removed, please contact us.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us through our contact form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;