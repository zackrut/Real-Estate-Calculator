import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import InputField from '../components/common/InputField';
import ResultCard, { MetricDisplay } from '../components/common/ResultCard';
import ActionButtons from '../components/common/ActionButtons';
import AdBox from '../components/AdBox';
import { formatCurrency, formatPercentage, calculateMonthlyPayment } from '../utils/formatters';
import { trackCalculatorUsage, trackCalculation, useTimeTracking } from '../utils/analytics';
import { loadFromURL, saveToURL } from '../utils/urlParams';

const AirbnbVsRentalCalculator = () => {
  // Track time on page
  useTimeTracking('Airbnb vs Rental Comparison');

  // City presets
  const cityPresets = {
    nashville: { 
      name: 'Nashville', 
      monthlyRent: 2500, 
      nightlyRate: 150, 
      airbnbOccupancy: 70,
      seasonalHigh: 180,
      seasonalLow: 120
    },
    orlando: { 
      name: 'Orlando', 
      monthlyRent: 2200, 
      nightlyRate: 125, 
      airbnbOccupancy: 75,
      seasonalHigh: 175,
      seasonalLow: 95
    },
    denver: { 
      name: 'Denver', 
      monthlyRent: 2800, 
      nightlyRate: 140, 
      airbnbOccupancy: 65,
      seasonalHigh: 200,
      seasonalLow: 100
    },
    austin: { 
      name: 'Austin', 
      monthlyRent: 2600, 
      nightlyRate: 135, 
      airbnbOccupancy: 68,
      seasonalHigh: 160,
      seasonalLow: 110
    },
    sandiego: { 
      name: 'San Diego', 
      monthlyRent: 3200, 
      nightlyRate: 175, 
      airbnbOccupancy: 72,
      seasonalHigh: 225,
      seasonalLow: 140
    },
    mountain: { 
      name: 'Mountain Town', 
      monthlyRent: 2000, 
      nightlyRate: 200, 
      airbnbOccupancy: 60,
      seasonalHigh: 350,
      seasonalLow: 120
    },
    beach: { 
      name: 'Beach Town', 
      monthlyRent: 2400, 
      nightlyRate: 180, 
      airbnbOccupancy: 70,
      seasonalHigh: 250,
      seasonalLow: 130
    }
  };

  const defaultInputs = {
    // Shared inputs
    purchasePrice: 400000,
    downPaymentPercent: 20,
    interestRate: 7,
    loanTermYears: 30,
    propertyTaxes: 4800,
    baseInsurance: 1800,
    hoaFees: 0,
    maintenanceReservePercent: 5,
    
    // Long-term rental specific
    monthlyRent: 2500,
    vacancyRatePercent: 5,
    propertyManagementPercent: 8,
    annualRentIncreasePercent: 3,
    tenantTurnoverCosts: 1500,
    ownerPaidUtilities: 0,
    
    // Airbnb specific
    nightlyRate: 150,
    occupancyRatePercent: 65,
    cleaningFee: 75,
    cleaningCost: 50,
    averageStayLength: 3,
    seasonalToggle: false,
    highSeasonRate: 200,
    highSeasonOccupancy: 80,
    lowSeasonRate: 100,
    lowSeasonOccupancy: 50,
    platformFeePercent: 3,
    airbnbInsuranceMultiplier: 1.25,
    airbnbUtilities: 200,
    internetCable: 100,
    suppliesConsumables: 50,
    furnitureSetup: 15000,
    airbnbManagementPercent: 25,
    airbnbMaintenanceMultiplier: 1.5,
    
    // Selected preset
    selectedPreset: 'none'
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const [results, setResults] = useState({});
  const [showComparison, setShowComparison] = useState(true);
  const [showAirbnb, setShowAirbnb] = useState(true);
  const [showRental, setShowRental] = useState(true);

  // Load from URL on component mount
  useEffect(() => {
    const { inputs: urlInputs, hasParams } = loadFromURL(defaultInputs);
    if (hasParams) {
      setInputs(urlInputs);
    }
    trackCalculatorUsage('Airbnb vs Rental Comparison');
  }, []);

  // Calculate results whenever inputs change
  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handlePresetChange = (preset) => {
    if (preset === 'none') {
      setInputs(prev => ({ ...prev, selectedPreset: preset }));
      return;
    }
    
    const presetData = cityPresets[preset];
    setInputs(prev => ({
      ...prev,
      selectedPreset: preset,
      monthlyRent: presetData.monthlyRent,
      nightlyRate: presetData.nightlyRate,
      occupancyRatePercent: presetData.airbnbOccupancy,
      highSeasonRate: presetData.seasonalHigh,
      lowSeasonRate: presetData.seasonalLow
    }));
  };

  const calculateResults = () => {
    // Shared calculations
    const downPayment = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
    const loanAmount = inputs.purchasePrice - downPayment;
    const monthlyPayment = calculateMonthlyPayment(
      loanAmount,
      inputs.interestRate,
      inputs.loanTermYears
    );
    
    const monthlyPropertyTaxes = inputs.propertyTaxes / 12;
    const monthlyHOA = inputs.hoaFees || 0;
    
    // Long-term rental calculations
    const effectiveRent = inputs.monthlyRent * (1 - inputs.vacancyRatePercent / 100);
    const monthlyRentalInsurance = inputs.baseInsurance / 12;
    const rentalManagementFee = effectiveRent * (inputs.propertyManagementPercent / 100);
    const rentalMaintenance = effectiveRent * (inputs.maintenanceReservePercent / 100);
    const rentalTurnoverMonthly = inputs.tenantTurnoverCosts / 24; // Assume 2-year average tenancy
    
    const rentalExpenses = monthlyPayment + monthlyPropertyTaxes + monthlyRentalInsurance + 
                          monthlyHOA + rentalManagementFee + rentalMaintenance + 
                          rentalTurnoverMonthly + inputs.ownerPaidUtilities;
    
    const rentalCashFlow = effectiveRent - rentalExpenses;
    const rentalAnnualIncome = rentalCashFlow * 12;
    
    // Airbnb calculations
    let airbnbMonthlyRevenue;
    
    if (inputs.seasonalToggle) {
      // Calculate seasonal revenue
      const highSeasonMonths = 4;
      const lowSeasonMonths = 4;
      const regularMonths = 4;
      
      const highRevenue = inputs.highSeasonRate * 30 * (inputs.highSeasonOccupancy / 100) * highSeasonMonths;
      const lowRevenue = inputs.lowSeasonRate * 30 * (inputs.lowSeasonOccupancy / 100) * lowSeasonMonths;
      const regularRevenue = inputs.nightlyRate * 30 * (inputs.occupancyRatePercent / 100) * regularMonths;
      
      airbnbMonthlyRevenue = (highRevenue + lowRevenue + regularRevenue) / 12;
    } else {
      airbnbMonthlyRevenue = inputs.nightlyRate * 30 * (inputs.occupancyRatePercent / 100);
    }
    
    // Add cleaning fees
    const staysPerMonth = (30 * (inputs.occupancyRatePercent / 100)) / inputs.averageStayLength;
    const cleaningRevenue = inputs.cleaningFee * staysPerMonth;
    const cleaningExpense = inputs.cleaningCost * staysPerMonth;
    
    const totalAirbnbRevenue = airbnbMonthlyRevenue + cleaningRevenue;
    const platformFees = totalAirbnbRevenue * (inputs.platformFeePercent / 100);
    
    // Airbnb expenses
    const monthlyAirbnbInsurance = (inputs.baseInsurance * inputs.airbnbInsuranceMultiplier) / 12;
    const airbnbManagementFee = totalAirbnbRevenue * (inputs.airbnbManagementPercent / 100);
    const airbnbMaintenance = totalAirbnbRevenue * (inputs.maintenanceReservePercent / 100) * inputs.airbnbMaintenanceMultiplier;
    const furnishingMonthly = inputs.furnitureSetup / 60; // Amortize over 5 years
    
    const airbnbExpenses = monthlyPayment + monthlyPropertyTaxes + monthlyAirbnbInsurance + 
                          monthlyHOA + airbnbManagementFee + airbnbMaintenance + 
                          cleaningExpense + platformFees + inputs.airbnbUtilities + 
                          inputs.internetCable + inputs.suppliesConsumables + furnishingMonthly;
    
    const airbnbCashFlow = totalAirbnbRevenue - airbnbExpenses;
    const airbnbAnnualIncome = airbnbCashFlow * 12;
    
    // Comparison calculations
    const cashFlowDifference = airbnbCashFlow - rentalCashFlow;
    const winner = cashFlowDifference > 0 ? 'Airbnb' : 'Long-Term Rental';
    const winnerMargin = Math.abs(cashFlowDifference);
    
    // Break-even occupancy for Airbnb
    const airbnbFixedCosts = monthlyPayment + monthlyPropertyTaxes + monthlyAirbnbInsurance + 
                            monthlyHOA + inputs.airbnbUtilities + inputs.internetCable + 
                            inputs.suppliesConsumables + furnishingMonthly;
    const airbnbVariableCostRate = (inputs.airbnbManagementPercent + inputs.platformFeePercent + 
                                   inputs.maintenanceReservePercent * inputs.airbnbMaintenanceMultiplier) / 100;
    
    const netRevenuePerNight = inputs.nightlyRate * (1 - airbnbVariableCostRate) + 
                              (inputs.cleaningFee - inputs.cleaningCost) / inputs.averageStayLength;
    
    const breakEvenNights = (rentalCashFlow + airbnbFixedCosts) / netRevenuePerNight;
    const breakEvenOccupancy = (breakEvenNights / 30) * 100;
    
    // 5-year projections
    const rental5Year = rentalAnnualIncome * 5 * Math.pow(1 + inputs.annualRentIncreasePercent / 100, 2.5);
    const airbnb5Year = airbnbAnnualIncome * 5; // Assume stable Airbnb income
    
    // Cash-on-cash returns
    const rentalCashOnCash = (rentalAnnualIncome / downPayment) * 100;
    const airbnbCashOnCash = (airbnbAnnualIncome / downPayment) * 100;
    
    // Cap rates
    const rentalNOI = effectiveRent * 12 - (monthlyPropertyTaxes * 12 + inputs.baseInsurance + 
                     rentalMaintenance * 12 + monthlyHOA * 12);
    const airbnbNOI = totalAirbnbRevenue * 12 - (monthlyPropertyTaxes * 12 + 
                     inputs.baseInsurance * inputs.airbnbInsuranceMultiplier + 
                     airbnbMaintenance * 12 + monthlyHOA * 12);
    
    const rentalCapRate = (rentalNOI / inputs.purchasePrice) * 100;
    const airbnbCapRate = (airbnbNOI / inputs.purchasePrice) * 100;
    
    setResults({
      // Rental results
      rentalMonthlyRevenue: effectiveRent,
      rentalMonthlyExpenses: rentalExpenses,
      rentalCashFlow,
      rentalAnnualIncome,
      rental5Year,
      rentalCashOnCash,
      rentalCapRate,
      rentalEffortLevel: 'Low',
      rentalRiskLevel: 'Low',
      rentalHoursPerMonth: 2,
      
      // Airbnb results
      airbnbMonthlyRevenue: totalAirbnbRevenue,
      airbnbMonthlyExpenses: airbnbExpenses,
      airbnbCashFlow,
      airbnbAnnualIncome,
      airbnb5Year,
      airbnbCashOnCash,
      airbnbCapRate,
      airbnbEffortLevel: 'High',
      airbnbRiskLevel: 'Medium',
      airbnbHoursPerMonth: 20,
      
      // Comparison
      winner,
      winnerMargin,
      cashFlowDifference,
      breakEvenOccupancy,
      recommendation: breakEvenOccupancy < 50 ? 'Strong Airbnb' : 
                     breakEvenOccupancy < 70 ? 'Lean Airbnb' :
                     breakEvenOccupancy < 85 ? 'Consider Both' : 'Long-Term Rental'
    });
    
    trackCalculation('Airbnb vs Rental Comparison');
  };

  const handleCalculate = () => {
    calculateResults();
    saveToURL(inputs);
  };

  return (
    <>
      <Helmet>
        <title>Airbnb vs Long-Term Rental Calculator | REI Calculator Pro</title>
        <meta name="description" content="Compare Airbnb vs traditional rental income. Calculate which strategy is more profitable with our comprehensive comparison calculator." />
        <meta name="keywords" content="airbnb calculator, rental comparison, short term vs long term rental, airbnb profitability, rental property calculator" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Airbnb vs Long-Term Rental Calculator
              </h1>
              <p className="text-gray-600 text-lg">
                Compare short-term vacation rentals with traditional long-term rentals to find your optimal strategy.
              </p>
              
              {/* City Preset Selector */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load City Preset (Optional)
                </label>
                <select
                  value={inputs.selectedPreset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="form-input max-w-xs"
                >
                  <option value="none">-- Select a City --</option>
                  <option value="nashville">Nashville, TN</option>
                  <option value="orlando">Orlando, FL</option>
                  <option value="denver">Denver, CO</option>
                  <option value="austin">Austin, TX</option>
                  <option value="sandiego">San Diego, CA</option>
                  <option value="mountain">Generic Mountain Town</option>
                  <option value="beach">Generic Beach Town</option>
                </select>
              </div>
              
              {/* View Toggle Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showComparison ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <i className="fas fa-chart-bar mr-2"></i>
                  Comparison View
                </button>
                <button
                  onClick={() => setShowRental(!showRental)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showRental ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <i className="fas fa-home mr-2"></i>
                  Long-Term Rental
                </button>
                <button
                  onClick={() => setShowAirbnb(!showAirbnb)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showAirbnb ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <i className="fas fa-bed mr-2"></i>
                  Airbnb
                </button>
              </div>
            </div>

            {/* Shared Inputs Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                <i className="fas fa-building mr-2 text-blue-600"></i>
                Property Details (Shared)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InputField
                  label="Purchase Price"
                  type="number"
                  value={inputs.purchasePrice}
                  onChange={(value) => handleInputChange('purchasePrice', value)}
                  prefix="$"
                  tooltip="Total purchase price of the property"
                />
                <InputField
                  label="Down Payment"
                  type="number"
                  value={inputs.downPaymentPercent}
                  onChange={(value) => handleInputChange('downPaymentPercent', value)}
                  suffix="%"
                  min="0"
                  max="100"
                  tooltip="Percentage of purchase price paid upfront"
                />
                <InputField
                  label="Interest Rate"
                  type="number"
                  value={inputs.interestRate}
                  onChange={(value) => handleInputChange('interestRate', value)}
                  suffix="%"
                  step="0.1"
                  tooltip="Annual mortgage interest rate"
                />
                <InputField
                  label="Loan Term"
                  type="number"
                  value={inputs.loanTermYears}
                  onChange={(value) => handleInputChange('loanTermYears', value)}
                  suffix="years"
                  tooltip="Length of mortgage in years"
                />
                <InputField
                  label="Property Taxes"
                  type="number"
                  value={inputs.propertyTaxes}
                  onChange={(value) => handleInputChange('propertyTaxes', value)}
                  prefix="$"
                  suffix="/year"
                  tooltip="Annual property tax amount"
                />
                <InputField
                  label="Base Insurance"
                  type="number"
                  value={inputs.baseInsurance}
                  onChange={(value) => handleInputChange('baseInsurance', value)}
                  prefix="$"
                  suffix="/year"
                  tooltip="Annual homeowners insurance"
                />
                <InputField
                  label="HOA Fees"
                  type="number"
                  value={inputs.hoaFees}
                  onChange={(value) => handleInputChange('hoaFees', value)}
                  prefix="$"
                  suffix="/month"
                  tooltip="Monthly HOA fees (if applicable)"
                />
                <InputField
                  label="Maintenance Reserve"
                  type="number"
                  value={inputs.maintenanceReservePercent}
                  onChange={(value) => handleInputChange('maintenanceReservePercent', value)}
                  suffix="%"
                  tooltip="Percentage of rent/revenue for maintenance"
                />
              </div>
            </div>

            <AdBox size="mobile" />

            {/* Strategy-Specific Inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Long-Term Rental Column */}
              {showRental && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    <i className="fas fa-home mr-2 text-green-600"></i>
                    Long-Term Rental Details
                  </h3>
                  
                  <div className="space-y-4">
                    <InputField
                      label="Monthly Rent"
                      type="number"
                      value={inputs.monthlyRent}
                      onChange={(value) => handleInputChange('monthlyRent', value)}
                      prefix="$"
                      tooltip="Expected monthly rental income"
                    />
                    <InputField
                      label="Vacancy Rate"
                      type="number"
                      value={inputs.vacancyRatePercent}
                      onChange={(value) => handleInputChange('vacancyRatePercent', value)}
                      suffix="%"
                      tooltip="Expected vacancy percentage"
                    />
                    <InputField
                      label="Property Management"
                      type="number"
                      value={inputs.propertyManagementPercent}
                      onChange={(value) => handleInputChange('propertyManagementPercent', value)}
                      suffix="%"
                      tooltip="Property management fee percentage"
                    />
                    <InputField
                      label="Annual Rent Increase"
                      type="number"
                      value={inputs.annualRentIncreasePercent}
                      onChange={(value) => handleInputChange('annualRentIncreasePercent', value)}
                      suffix="%"
                      tooltip="Expected yearly rent increase"
                    />
                    <InputField
                      label="Tenant Turnover Costs"
                      type="number"
                      value={inputs.tenantTurnoverCosts}
                      onChange={(value) => handleInputChange('tenantTurnoverCosts', value)}
                      prefix="$"
                      tooltip="Cost to prepare unit between tenants"
                    />
                    <InputField
                      label="Owner-Paid Utilities"
                      type="number"
                      value={inputs.ownerPaidUtilities}
                      onChange={(value) => handleInputChange('ownerPaidUtilities', value)}
                      prefix="$"
                      suffix="/month"
                      tooltip="Utilities paid by owner (if any)"
                    />
                  </div>
                </div>
              )}

              {/* Airbnb Column */}
              {showAirbnb && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    <i className="fas fa-bed mr-2 text-purple-600"></i>
                    Airbnb Details
                  </h3>
                  
                  <div className="space-y-4">
                    <InputField
                      label="Nightly Rate"
                      type="number"
                      value={inputs.nightlyRate}
                      onChange={(value) => handleInputChange('nightlyRate', value)}
                      prefix="$"
                      tooltip="Average nightly rate"
                    />
                    <InputField
                      label="Occupancy Rate"
                      type="number"
                      value={inputs.occupancyRatePercent}
                      onChange={(value) => handleInputChange('occupancyRatePercent', value)}
                      suffix="%"
                      tooltip="Expected occupancy percentage"
                    />
                    <InputField
                      label="Cleaning Fee (Charged)"
                      type="number"
                      value={inputs.cleaningFee}
                      onChange={(value) => handleInputChange('cleaningFee', value)}
                      prefix="$"
                      tooltip="Cleaning fee charged to guests"
                    />
                    <InputField
                      label="Cleaning Cost (Actual)"
                      type="number"
                      value={inputs.cleaningCost}
                      onChange={(value) => handleInputChange('cleaningCost', value)}
                      prefix="$"
                      tooltip="Amount paid to cleaner"
                    />
                    <InputField
                      label="Average Stay Length"
                      type="number"
                      value={inputs.averageStayLength}
                      onChange={(value) => handleInputChange('averageStayLength', value)}
                      suffix="nights"
                      tooltip="Average length of guest stays"
                    />
                    
                    {/* Seasonal Toggle */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="seasonalToggle"
                        checked={inputs.seasonalToggle}
                        onChange={(e) => handleInputChange('seasonalToggle', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="seasonalToggle" className="text-sm font-medium text-gray-700">
                        Enable Seasonal Pricing
                      </label>
                    </div>
                    
                    {inputs.seasonalToggle && (
                      <div className="pl-6 space-y-3 border-l-2 border-purple-200">
                        <InputField
                          label="High Season Rate"
                          type="number"
                          value={inputs.highSeasonRate}
                          onChange={(value) => handleInputChange('highSeasonRate', value)}
                          prefix="$"
                          tooltip="Nightly rate during peak season (4 months)"
                        />
                        <InputField
                          label="High Season Occupancy"
                          type="number"
                          value={inputs.highSeasonOccupancy}
                          onChange={(value) => handleInputChange('highSeasonOccupancy', value)}
                          suffix="%"
                          tooltip="Occupancy during peak season"
                        />
                        <InputField
                          label="Low Season Rate"
                          type="number"
                          value={inputs.lowSeasonRate}
                          onChange={(value) => handleInputChange('lowSeasonRate', value)}
                          prefix="$"
                          tooltip="Nightly rate during off-season (4 months)"
                        />
                        <InputField
                          label="Low Season Occupancy"
                          type="number"
                          value={inputs.lowSeasonOccupancy}
                          onChange={(value) => handleInputChange('lowSeasonOccupancy', value)}
                          suffix="%"
                          tooltip="Occupancy during off-season"
                        />
                      </div>
                    )}
                    
                    {/* Airbnb-Specific Costs */}
                    <h4 className="text-lg font-medium text-gray-700 mt-6 mb-3">
                      Airbnb-Specific Costs
                    </h4>
                    
                    <InputField
                      label="Property Management"
                      type="number"
                      value={inputs.airbnbManagementPercent}
                      onChange={(value) => handleInputChange('airbnbManagementPercent', value)}
                      suffix="%"
                      tooltip="Airbnb property management fee (typically higher)"
                    />
                    <InputField
                      label="Utilities"
                      type="number"
                      value={inputs.airbnbUtilities}
                      onChange={(value) => handleInputChange('airbnbUtilities', value)}
                      prefix="$"
                      suffix="/month"
                      tooltip="Monthly utilities (owner always pays)"
                    />
                    <InputField
                      label="Internet/Cable"
                      type="number"
                      value={inputs.internetCable}
                      onChange={(value) => handleInputChange('internetCable', value)}
                      prefix="$"
                      suffix="/month"
                      tooltip="Monthly internet and cable costs"
                    />
                    <InputField
                      label="Supplies/Consumables"
                      type="number"
                      value={inputs.suppliesConsumables}
                      onChange={(value) => handleInputChange('suppliesConsumables', value)}
                      prefix="$"
                      suffix="/month"
                      tooltip="Toiletries, coffee, etc."
                    />
                    <InputField
                      label="Furniture/Setup Cost"
                      type="number"
                      value={inputs.furnitureSetup}
                      onChange={(value) => handleInputChange('furnitureSetup', value)}
                      prefix="$"
                      tooltip="One-time furnishing cost (amortized over 5 years)"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            {showComparison && results.winner && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  <i className="fas fa-chart-line mr-2 text-blue-600"></i>
                  Comparison Results
                </h2>
                
                {/* Winner Declaration */}
                <div className={`text-center p-6 rounded-lg mb-6 ${
                  results.winner === 'Airbnb' ? 'bg-purple-50 border-2 border-purple-500' : 
                  'bg-green-50 border-2 border-green-500'
                }`}>
                  <h3 className="text-3xl font-bold mb-2">
                    {results.winner} Wins by {formatCurrency(results.winnerMargin)}/month
                  </h3>
                  <p className="text-lg text-gray-700">
                    Recommendation: <span className="font-semibold">{results.recommendation}</span>
                  </p>
                </div>
                
                {/* Side-by-Side Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Long-Term Rental Results */}
                  <div className="border rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-green-600 mb-4">
                      <i className="fas fa-home mr-2"></i>
                      Long-Term Rental
                    </h4>
                    <div className="space-y-3">
                      <MetricDisplay 
                        label="Monthly Revenue" 
                        value={formatCurrency(results.rentalMonthlyRevenue)} 
                      />
                      <MetricDisplay 
                        label="Monthly Expenses" 
                        value={formatCurrency(results.rentalMonthlyExpenses)} 
                        isNegative
                      />
                      <MetricDisplay 
                        label="Monthly Cash Flow" 
                        value={formatCurrency(results.rentalCashFlow)} 
                        highlight
                      />
                      <MetricDisplay 
                        label="Annual Net Income" 
                        value={formatCurrency(results.rentalAnnualIncome)} 
                      />
                      <MetricDisplay 
                        label="5-Year Total" 
                        value={formatCurrency(results.rental5Year)} 
                      />
                      <MetricDisplay 
                        label="Cash-on-Cash Return" 
                        value={formatPercentage(results.rentalCashOnCash)} 
                      />
                      <MetricDisplay 
                        label="Cap Rate" 
                        value={formatPercentage(results.rentalCapRate)} 
                      />
                      <div className="pt-3 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Effort Level:</span>
                          <span className="font-semibold text-green-600">{results.rentalEffortLevel}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Risk Level:</span>
                          <span className="font-semibold text-green-600">{results.rentalRiskLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Est. Hours/Month:</span>
                          <span className="font-semibold">{results.rentalHoursPerMonth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Airbnb Results */}
                  <div className="border rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-purple-600 mb-4">
                      <i className="fas fa-bed mr-2"></i>
                      Airbnb
                    </h4>
                    <div className="space-y-3">
                      <MetricDisplay 
                        label="Monthly Revenue" 
                        value={formatCurrency(results.airbnbMonthlyRevenue)} 
                      />
                      <MetricDisplay 
                        label="Monthly Expenses" 
                        value={formatCurrency(results.airbnbMonthlyExpenses)} 
                        isNegative
                      />
                      <MetricDisplay 
                        label="Monthly Cash Flow" 
                        value={formatCurrency(results.airbnbCashFlow)} 
                        highlight
                      />
                      <MetricDisplay 
                        label="Annual Net Income" 
                        value={formatCurrency(results.airbnbAnnualIncome)} 
                      />
                      <MetricDisplay 
                        label="5-Year Total" 
                        value={formatCurrency(results.airbnb5Year)} 
                      />
                      <MetricDisplay 
                        label="Cash-on-Cash Return" 
                        value={formatPercentage(results.airbnbCashOnCash)} 
                      />
                      <MetricDisplay 
                        label="Cap Rate" 
                        value={formatPercentage(results.airbnbCapRate)} 
                      />
                      <div className="pt-3 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Effort Level:</span>
                          <span className="font-semibold text-orange-600">{results.airbnbEffortLevel}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Risk Level:</span>
                          <span className="font-semibold text-yellow-600">{results.airbnbRiskLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Est. Hours/Month:</span>
                          <span className="font-semibold">{results.airbnbHoursPerMonth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Break-Even Analysis */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">
                    <i className="fas fa-balance-scale mr-2"></i>
                    Break-Even Analysis
                  </h4>
                  <p className="text-gray-700">
                    Airbnb needs <span className="font-bold text-blue-800">{results.breakEvenOccupancy.toFixed(1)}%</span> occupancy 
                    to match long-term rental income of {formatCurrency(results.rentalCashFlow)}/month.
                  </p>
                  {results.breakEvenOccupancy < inputs.occupancyRatePercent && (
                    <p className="text-green-600 mt-2">
                      <i className="fas fa-check-circle mr-1"></i>
                      Your projected occupancy exceeds break-even by {(inputs.occupancyRatePercent - results.breakEvenOccupancy).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <ActionButtons 
              onCalculate={handleCalculate}
              onPrint={() => window.print()}
              onShare={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Calculator link copied to clipboard!');
              }}
            />

            <AdBox size="desktop" className="mt-8" />

            {/* Educational Content */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Understanding the Results
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Factors Favoring Long-Term Rentals
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Stable, predictable income</li>
                    <li>Lower management requirements</li>
                    <li>Less wear and tear on property</li>
                    <li>Simpler tax reporting</li>
                    <li>Lower insurance costs</li>
                    <li>No furnishing expenses</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Factors Favoring Airbnb
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Higher income potential in tourist areas</li>
                    <li>Flexibility to use property personally</li>
                    <li>Ability to adjust pricing dynamically</li>
                    <li>Tax deductions for furnishing/supplies</li>
                    <li>Build hospitality business skills</li>
                    <li>Meet people from around the world</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Important Considerations Not Included in Calculations
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Local regulations and HOA restrictions on short-term rentals</li>
                  <li>Personal time investment and lifestyle preferences</li>
                  <li>Market saturation and competition</li>
                  <li>Seasonal market fluctuations</li>
                  <li>Platform algorithm changes affecting visibility</li>
                  <li>Guest screening and property damage risks</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Related Calculators
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a href="/rental-roi-calculator" className="text-blue-600 hover:text-blue-800 underline">
                    Rental Property ROI Calculator
                  </a>
                  <a href="/brrrr-calculator" className="text-blue-600 hover:text-blue-800 underline">
                    BRRRR Strategy Calculator
                  </a>
                  <a href="/fix-flip-calculator" className="text-blue-600 hover:text-blue-800 underline">
                    Fix & Flip Calculator
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirbnbVsRentalCalculator;