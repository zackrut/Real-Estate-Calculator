import React from 'react';
import { trackPDFDownload, trackShare } from '../../utils/analytics';

const ActionButtons = ({ 
  inputs = {}, 
  onLoadExample, 
  onReset,
  calculatorName = 'Calculator'
}) => {
  const generateShareableUrl = () => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        alert('Shareable URL copied to clipboard!');
        trackShare(calculatorName);
      }).catch(() => {
        // Fallback for older browsers
        fallbackCopyToClipboard(url);
      });
    } else {
      fallbackCopyToClipboard(url);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('Shareable URL copied to clipboard!');
      trackShare(calculatorName);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      alert('Unable to copy URL. Please copy manually from address bar.');
    }
    
    document.body.removeChild(textArea);
  };

  const handlePrint = () => {
    window.print();
    trackPDFDownload(calculatorName);
  };

  const handleShare = () => {
    // Check if Web Share API is available (mainly on mobile)
    if (navigator.share) {
      const shareData = {
        title: `${calculatorName} Results - REI Calculator Pro`,
        text: `Check out my ${calculatorName.toLowerCase()} results from REI Calculator Pro`,
        url: window.location.href
      };

      navigator.share(shareData)
        .then(() => trackShare(calculatorName))
        .catch((error) => {
          console.log('Error sharing:', error);
          generateShareableUrl(); // Fallback to URL copy
        });
    } else {
      generateShareableUrl();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6 no-print">
      {onLoadExample && (
        <button 
          onClick={onLoadExample}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          title="Load example data to see how the calculator works"
        >
          <i className="fas fa-lightbulb mr-2"></i>
          Load Example
        </button>
      )}
      
      {onReset && (
        <button 
          onClick={onReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          title="Reset all inputs to default values"
        >
          <i className="fas fa-undo mr-2"></i>
          Reset
        </button>
      )}
      
      <button 
        onClick={handleShare}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        title="Share your calculation results"
      >
        <i className="fas fa-share-alt mr-2"></i>
        Share
      </button>
      
      <button 
        onClick={handlePrint}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        title="Print or save as PDF"
      >
        <i className="fas fa-print mr-2"></i>
        Print Report
      </button>
    </div>
  );
};

export default ActionButtons;