// Google Analytics 4 tracking utilities
import React from 'react';

export const trackPageView = (page_title = document.title, page_location = window.location.href) => {
  // Google Analytics integration disabled until proper GA ID is configured
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('config', 'YOUR_GA_ID_HERE', {
  //     page_title,
  //     page_location
  //   });
  // }
};

export const trackEvent = (action, category, label, value) => {
  // Google Analytics integration disabled until proper GA ID is configured
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', action, {
  //     event_category: category,
  //     event_label: label,
  //     value: value
  //   });
  // }
};

export const trackCalculatorUsage = (calculatorName) => {
  trackEvent('calculator_used', 'Calculator', calculatorName, 1);
};

export const trackCalculation = (calculatorName) => {
  trackEvent('calculation_performed', 'Engagement', `${calculatorName} Calculation`, 1);
};

export const trackPDFDownload = (calculatorName) => {
  trackEvent('pdf_download', 'Download', `${calculatorName} Report`, 1);
};

export const trackShare = (calculatorName) => {
  trackEvent('share', 'Social', `${calculatorName} Calculator`, 1);
};

export const trackTimeOnCalculator = (calculatorName, timeSpent) => {
  trackEvent('time_on_calculator', 'Engagement', calculatorName, timeSpent);
};

export const trackFormInteraction = (field, calculatorName) => {
  trackEvent('form_interaction', 'Engagement', `${calculatorName} - ${field}`, 1);
};

export const trackError = (error, calculatorName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `${calculatorName}: ${error.toString()}`,
      fatal: false
    });
  }
};

// Custom hook for tracking time on page
export const useTimeTracking = (calculatorName) => {
  React.useEffect(() => {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackTimeOnCalculator(calculatorName, timeSpent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) { // Only track if user spent more than 10 seconds
        trackTimeOnCalculator(calculatorName, timeSpent);
      }
    };
  }, [calculatorName]);
};