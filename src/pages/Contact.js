import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Let Netlify handle the form submission
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(() => {
      setSubmitted(true);
    })
    .catch(error => {
      console.error('Form submission error:', error);
      // Handle error state if needed
    });
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Contact Us - REI Calculator Pro</title>
          <meta name="description" content="Contact REI Calculator Pro with questions or suggestions about our real estate investment calculators." />
        </Helmet>

        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-green-600 text-2xl"></i>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Message Sent!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We typically respond within 48 hours.
            </p>
            
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - REI Calculator Pro</title>
        <meta name="description" content="Contact REI Calculator Pro with questions or suggestions about our real estate investment calculators." />
        <meta name="keywords" content="contact rei calculator pro, real estate calculator support, questions" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                Have questions or suggestions? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                      placeholder="Tell us what's on your mind..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                    <p className="text-sm text-blue-800">
                      <strong>Response Time:</strong> We typically respond within 48 hours during business days.
                    </p>
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

export default Contact;