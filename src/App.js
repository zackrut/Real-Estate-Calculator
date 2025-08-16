import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { trackPageView } from './utils/analytics';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const RentalROICalculator = React.lazy(() => import('./pages/RentalROICalculator'));
const BRRRRCalculator = React.lazy(() => import('./pages/BRRRRCalculator'));
const FixFlipCalculator = React.lazy(() => import('./pages/FixFlipCalculator'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  React.useEffect(() => {
    // Track initial page view
    trackPageView();
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col" style={{backgroundColor: '#f8fafc'}}>
        <Header />
        
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rental-roi-calculator" element={<RentalROICalculator />} />
              <Route path="/brrrr-calculator" element={<BRRRRCalculator />} />
              <Route path="/fix-flip-calculator" element={<FixFlipCalculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;