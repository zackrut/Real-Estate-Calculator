import React, { useEffect } from 'react';

const AdBox = ({ 
  size = 'horizontal', 
  className = '', 
  adClient = 'ca-pub-XXXXXXXXXX',
  adSlot = 'XXXXXXXXXX'
}) => {
  const sizeClasses = {
    horizontal: 'adsense-header min-h-[90px]',
    rectangle: 'adsense-sidebar min-h-[250px]',
    footer: 'adsense-footer min-h-[90px]',
    mobile: 'adsense-header min-h-[50px] md:min-h-[90px]'
  };

  const adFormats = {
    horizontal: 'horizontal',
    rectangle: 'rectangle',
    footer: 'horizontal',
    mobile: 'horizontal'
  };

  useEffect(() => {
    // Initialize AdSense when component mounts
    try {
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense not loaded yet');
    }
  }, []);

  // If AdSense is not available, show placeholder
  const showPlaceholder = !window.adsbygoogle || process.env.NODE_ENV === 'development';

  if (showPlaceholder) {
    return (
      <div className={`adsense-container ${sizeClasses[size]} no-print ${className}`}>
        <div className="text-gray-500 text-sm">
          Advertisement Space ({size})
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${sizeClasses[size]} no-print ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormats[size]}
        data-full-width-responsive={size === 'horizontal' || size === 'footer' ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdBox;