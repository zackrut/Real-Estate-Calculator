import React from 'react';

const ResultCard = ({ 
  title, 
  children, 
  className = '',
  gradient = false,
  icon 
}) => {
  return (
    <div className={`
      bg-white rounded-lg shadow-md overflow-hidden print-break
      ${gradient ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}
      ${className}
    `}>
      {title && (
        <div className={`
          p-4 border-b border-gray-200
          ${gradient ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none' : ''}
        `}>
          <h3 className={`
            text-lg font-semibold flex items-center
            ${gradient ? 'text-white' : 'text-gray-800'}
          `}>
            {icon && (
              <i className={`${icon} mr-2 ${gradient ? 'text-white' : 'text-blue-600'}`}></i>
            )}
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Metric display component for consistent formatting
export const MetricDisplay = ({ 
  label, 
  value, 
  type = 'currency', 
  positive = null,
  tooltip,
  className = '' 
}) => {
  const getValueColor = () => {
    if (positive === null) return 'text-gray-800';
    return positive ? 'text-green-600' : 'text-red-600';
  };

  const formatValue = () => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      
      case 'percentage':
        return `${typeof value === 'number' ? value.toFixed(2) : value}%`;
      
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      
      default:
        return value;
    }
  };

  return (
    <div className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 ${className}`}>
      <span className="text-gray-600 flex items-center">
        {label}
        {tooltip && (
          <span className="tooltip ml-1">
            <span className="text-gray-400 cursor-help text-xs">ⓘ</span>
            <span className="tooltiptext">{tooltip}</span>
          </span>
        )}
      </span>
      <span className={`font-semibold ${getValueColor()}`}>
        {formatValue()}
      </span>
    </div>
  );
};

// Badge component for deal ratings
export const DealBadge = ({ rating, className = '' }) => {
  const getBadgeColor = (rating) => {
    const colors = {
      'A+': 'bg-green-600',
      'A': 'bg-green-500',
      'B': 'bg-blue-500',
      'C': 'bg-yellow-500',
      'D': 'bg-orange-500',
      'F': 'bg-red-500',
      'Excellent': 'bg-green-600',
      'Great': 'bg-blue-500',
      'Good': 'bg-indigo-500',
      'Fair': 'bg-yellow-500',
      'Poor': 'bg-red-500'
    };
    return colors[rating] || 'bg-gray-500';
  };

  return (
    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-white font-bold ${getBadgeColor(rating)} ${className}`}>
      {rating}
    </div>
  );
};

export default ResultCard;