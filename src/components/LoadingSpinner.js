import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 border-solid rounded-full animate-spin"></div>
        </div>
        
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-green-200 border-solid rounded-full animate-spin animate-reverse">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-green-500 border-solid rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;