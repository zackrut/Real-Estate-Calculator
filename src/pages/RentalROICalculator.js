import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import InputField from '../components/common/InputField';
import ResultCard, { MetricDisplay, DealBadge } from '../components/common/ResultCard';
import ActionButtons from '../components/common/ActionButtons';
import AdBox from '../components/AdBox';
import { formatCurrency, formatPercentage, calculateMonthlyPayment } from '../utils/formatters';
import { trackCalculatorUsage, trackCalculation, useTimeTracking } from '../utils/analytics';
import { loadFromURL, saveToURL } from '../utils/urlParams';
import { updatePageMeta, generateStructuredData, createCalculatorStructuredData } from '../utils/seo';

const RentalROICalculator = () => {
  // Track time on page
  useTimeTracking('Rental Property ROI');

  const defaultInputs = {
    purchasePrice: 300000,
    downPaymentPercent: 20,
    closingCostsPercent: 2,
    renovationCosts: 0,
    interestRate: 7,
    loanTermYears: 30,
    monthlyRent: 2500,
    otherMonthlyIncome: 0,
    annualRentIncreasePercent: 3,
    propertyTaxes: 3600,
    insurance: 1200,
    hoaFees: 0,
    propertyManagementPercent: 10,
    maintenanceReservePercent: 5,
    vacancyRatePercent: 5,
    utilities: 0
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const [results, setResults] = useState({});

  // Load from URL on component mount
  useEffect(() => {
    const { inputs: urlInputs, hasParams } = loadFromURL(defaultInputs);
    if (hasParams) {
      setInputs(urlInputs);
    }
    trackCalculatorUsage('Rental Property ROI');
  }, []);

  // Update SEO meta tags
  useEffect(() => {
    updatePageMeta({
      title: 'Rental Property ROI Calculator | REI Calculator Pro',
      description: 'Free rental property ROI calculator. Analyze cash flow, cap rate, cash-on-cash return & total ROI for investment properties. Make smarter rental decisions.',
      keywords: 'rental property calculator, ROI calculator, cash flow calculator, cap rate calculator, real estate investment, property analysis',
      canonical: 'https://reicalculator.pro/rental-roi-calculator'
    });

    generateStructuredData(createCalculatorStructuredData(
      'Rental Property ROI Calculator',
      'Free online calculator for analyzing rental property investments including cash flow, cap rate, and ROI calculations.',
      'https://reicalculator.pro/rental-roi-calculator'
    ));
  }, []);

  const calculateResults = () => {
    try {
      const downPayment = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
      const closingCosts = inputs.purchasePrice * (inputs.closingCostsPercent / 100);
      const loanAmount = inputs.purchasePrice - downPayment;
      const totalCashInvested = downPayment + closingCosts + inputs.renovationCosts;
      
      const monthlyPayment = calculateMonthlyPayment(
        loanAmount,
        inputs.interestRate,
        inputs.loanTermYears
      );

      const grossMonthlyIncome = inputs.monthlyRent + inputs.otherMonthlyIncome;
      const effectiveMonthlyIncome = grossMonthlyIncome * (1 - inputs.vacancyRatePercent / 100);
      
      const monthlyPropertyTaxes = inputs.propertyTaxes / 12;
      const monthlyInsurance = inputs.insurance / 12;
      const monthlyPropertyManagement = effectiveMonthlyIncome * (inputs.propertyManagementPercent / 100);
      const monthlyMaintenance = effectiveMonthlyIncome * (inputs.maintenanceReservePercent / 100);
      
      const totalMonthlyExpenses = monthlyPayment + monthlyPropertyTaxes + monthlyInsurance + 
        inputs.hoaFees + monthlyPropertyManagement + monthlyMaintenance + inputs.utilities;
      
      const monthlyCashFlow = effectiveMonthlyIncome - totalMonthlyExpenses;
      
      const annualOperatingExpenses = (monthlyPropertyTaxes + monthlyInsurance + inputs.hoaFees + 
        monthlyPropertyManagement + monthlyMaintenance + inputs.utilities) * 12;
      const noi = (effectiveMonthlyIncome * 12) - annualOperatingExpenses;
      
      const capRate = (noi / inputs.purchasePrice) * 100;
      const annualCashFlow = monthlyCashFlow * 12;
      const cashOnCashReturn = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
      
      const appreciationRate = 3;
      const yearlyAppreciation = inputs.purchasePrice * (appreciationRate / 100);
      const totalAnnualReturn = annualCashFlow + yearlyAppreciation;
      const totalROI = totalCashInvested > 0 ? (totalAnnualReturn / totalCashInvested) * 100 : 0;
      
      const breakEvenMonths = totalCashInvested > 0 && monthlyCashFlow > 0 
        ? Math.ceil(totalCashInvested / monthlyCashFlow) 
        : 0;

      let dealRating = 'Poor';
      if (cashOnCashReturn >= 12) dealRating = 'Excellent';
      else if (cashOnCashReturn >= 8) dealRating = 'Good';
      else if (cashOnCashReturn >= 4) dealRating = 'Fair';

      setResults({
        totalCashInvested,
        monthlyPayment,
        effectiveMonthlyIncome,
        totalMonthlyExpenses,
        monthlyCashFlow,
        noi,
        capRate,
        cashOnCashReturn,
        totalROI,
        breakEvenMonths,
        dealRating
      });

      trackCalculation('Rental Property ROI');
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  useEffect(() => {
    calculateResults();
    saveToURL(inputs, true);
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value === '' ? 0 : parseFloat(value) || 0
    }));
  };

  const loadExample = () => {
    setInputs({
      purchasePrice: 350000,
      downPaymentPercent: 25,
      closingCostsPercent: 2,
      renovationCosts: 15000,
      interestRate: 6.5,
      loanTermYears: 30,
      monthlyRent: 2800,
      otherMonthlyIncome: 100,
      annualRentIncreasePercent: 3,
      propertyTaxes: 4200,
      insurance: 1500,
      hoaFees: 150,
      propertyManagementPercent: 8,
      maintenanceReservePercent: 5,
      vacancyRatePercent: 5,
      utilities: 200
    });
  };

  const handleReset = () => {
    setInputs(defaultInputs);
  };

  return (
    <>
      <Helmet>
        <title>Rental Property ROI Calculator | REI Calculator Pro</title>
        <meta name="description" content="Free rental property ROI calculator. Analyze cash flow, cap rate, cash-on-cash return & total ROI for investment properties. Make smarter rental decisions." />
        <link rel="canonical" href="https://reicalculator.pro/rental-roi-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <AdBox size="mobile" className="mb-4" />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Rental Property ROI Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Analyze rental property investments with comprehensive cash flow, cap rate, and return calculations.
              </p>
            </div>

            <ActionButtons 
              inputs={inputs}
              onLoadExample={loadExample}
              onReset={handleReset}
              calculatorName="Rental Property ROI"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Details */}
                <ResultCard title="Property Details" icon="fas fa-home">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Purchase Price"
                      value={inputs.purchasePrice}
                      onChange={(value) => handleInputChange('purchasePrice', value)}
                      prefix="$"
                      tooltip="The total cost to purchase the property"
                    />
                    <InputField
                      label="Down Payment (%)"
                      value={inputs.downPaymentPercent}
                      onChange={(value) => handleInputChange('downPaymentPercent', value)}
                      suffix="%"
                      tooltip="Percentage of purchase price paid upfront"
                    />
                    <InputField
                      label="Closing Costs (%)"
                      value={inputs.closingCostsPercent}
                      onChange={(value) => handleInputChange('closingCostsPercent', value)}
                      suffix="%"
                      tooltip="Closing costs as percentage of purchase price"
                    />
                    <InputField
                      label="Renovation Costs"
                      value={inputs.renovationCosts}
                      onChange={(value) => handleInputChange('renovationCosts', value)}
                      prefix="$"
                      tooltip="Upfront renovation and repair costs"
                    />
                  </div>
                </ResultCard>

                {/* Financing */}
                <ResultCard title="Financing" icon="fas fa-percentage">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Interest Rate (%)"
                      value={inputs.interestRate}
                      onChange={(value) => handleInputChange('interestRate', value)}
                      suffix="%"
                      step="0.1"
                      tooltip="Annual interest rate on your mortgage"
                    />
                    <InputField
                      label="Loan Term (Years)"
                      value={inputs.loanTermYears}
                      onChange={(value) => handleInputChange('loanTermYears', value)}
                      tooltip="Length of mortgage in years"
                    />
                  </div>
                </ResultCard>

                {/* Rental Income */}
                <ResultCard title="Rental Income" icon="fas fa-dollar-sign">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Monthly Rent"
                      value={inputs.monthlyRent}
                      onChange={(value) => handleInputChange('monthlyRent', value)}
                      prefix="$"
                      tooltip="Expected monthly rental income"
                    />
                    <InputField
                      label="Other Monthly Income"
                      value={inputs.otherMonthlyIncome}
                      onChange={(value) => handleInputChange('otherMonthlyIncome', value)}
                      prefix="$"
                      tooltip="Additional income (parking, laundry, etc.)"
                    />
                    <InputField
                      label="Annual Rent Increase (%)"
                      value={inputs.annualRentIncreasePercent}
                      onChange={(value) => handleInputChange('annualRentIncreasePercent', value)}
                      suffix="%"
                      step="0.1"
                      tooltip="Expected yearly rent increase percentage"
                    />
                  </div>
                </ResultCard>

                {/* Expenses */}
                <ResultCard title="Expenses" icon="fas fa-calculator">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Property Taxes (Annual)"
                      value={inputs.propertyTaxes}
                      onChange={(value) => handleInputChange('propertyTaxes', value)}
                      prefix="$"
                      tooltip="Annual property tax amount"
                    />
                    <InputField
                      label="Insurance (Annual)"
                      value={inputs.insurance}
                      onChange={(value) => handleInputChange('insurance', value)}
                      prefix="$"
                      tooltip="Annual property insurance cost"
                    />
                    <InputField
                      label="HOA Fees (Monthly)"
                      value={inputs.hoaFees}
                      onChange={(value) => handleInputChange('hoaFees', value)}
                      prefix="$"
                      tooltip="Monthly homeowners association fees"
                    />
                    <InputField
                      label="Property Management (%)"
                      value={inputs.propertyManagementPercent}
                      onChange={(value) => handleInputChange('propertyManagementPercent', value)}
                      suffix="%"
                      step="0.1"
                      tooltip="Property management fee as % of rent"
                    />
                    <InputField
                      label="Maintenance Reserve (%)"
                      value={inputs.maintenanceReservePercent}
                      onChange={(value) => handleInputChange('maintenanceReservePercent', value)}
                      suffix="%"
                      step="0.1"
                      tooltip="Maintenance reserve as % of rent"
                    />
                    <InputField
                      label="Vacancy Rate (%)"
                      value={inputs.vacancyRatePercent}
                      onChange={(value) => handleInputChange('vacancyRatePercent', value)}
                      suffix="%"
                      step="0.1"
                      tooltip="Expected vacancy rate percentage"
                    />
                    <InputField
                      label="Utilities (Monthly)"
                      value={inputs.utilities}
                      onChange={(value) => handleInputChange('utilities', value)}
                      prefix="$"
                      tooltip="Utilities paid by owner (if any)"
                    />
                  </div>
                </ResultCard>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <AdBox size="rectangle" />

                {/* Deal Analysis */}
                <ResultCard title="Investment Analysis" gradient>
                  <div className="text-center mb-6">
                    <DealBadge rating={results.dealRating} className="mb-4" />
                    <div className={`text-3xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.monthlyCashFlow)}
                      <div className="text-sm font-normal text-gray-600">Monthly Cash Flow</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <MetricDisplay
                      label="Total Cash Invested"
                      value={results.totalCashInvested}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Cap Rate"
                      value={results.capRate}
                      type="percentage"
                      tooltip="Net Operating Income divided by property value"
                    />
                    <MetricDisplay
                      label="Cash-on-Cash Return"
                      value={results.cashOnCashReturn}
                      type="percentage"
                      tooltip="Annual cash flow divided by cash invested"
                    />
                    <MetricDisplay
                      label="Total ROI"
                      value={results.totalROI}
                      type="percentage"
                      tooltip="Total return including appreciation"
                    />
                    {results.breakEvenMonths > 0 && (
                      <MetricDisplay
                        label="Break-even"
                        value={`${results.breakEvenMonths} months`}
                        type="number"
                      />
                    )}
                  </div>
                </ResultCard>

                {/* Monthly Breakdown */}
                <ResultCard title="Monthly Breakdown" icon="fas fa-chart-pie">
                  <div className="space-y-3">
                    <MetricDisplay
                      label="Effective Income"
                      value={results.effectiveMonthlyIncome}
                      type="currency"
                      positive={true}
                    />
                    <MetricDisplay
                      label="Mortgage Payment"
                      value={results.monthlyPayment}
                      type="currency"
                      positive={false}
                    />
                    <MetricDisplay
                      label="Total Expenses"
                      value={results.totalMonthlyExpenses}
                      type="currency"
                      positive={false}
                    />
                    <div className="border-t pt-3">
                      <MetricDisplay
                        label="Net Cash Flow"
                        value={results.monthlyCashFlow}
                        type="currency"
                        positive={results.monthlyCashFlow >= 0}
                        className="text-lg font-semibold"
                      />
                    </div>
                  </div>
                </ResultCard>
              </div>
            </div>

            <AdBox size="footer" className="mt-8" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalROICalculator;