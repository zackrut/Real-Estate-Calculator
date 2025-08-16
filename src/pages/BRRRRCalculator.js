import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import InputField from '../components/common/InputField';
import ResultCard, { MetricDisplay, DealBadge } from '../components/common/ResultCard';
import ActionButtons from '../components/common/ActionButtons';
import AdBox from '../components/AdBox';
import { formatCurrency, formatPercentage, calculateMonthlyPayment } from '../utils/formatters';
import { trackCalculatorUsage, trackCalculation, useTimeTracking } from '../utils/analytics';
import { loadFromURL, saveToURL } from '../utils/urlParams';

const BRRRRCalculator = () => {
  useTimeTracking('BRRRR Strategy');

  const defaultInputs = {
    purchasePrice: 150000,
    downPaymentPercent: 25,
    closingCostsPercent: 2,
    initialInterestRate: 8,
    initialLoanTerm: 30,
    renovationBudget: 30000,
    renovationTimeline: 4,
    monthlyHoldingCosts: 500,
    monthlyRent: 1800,
    propertyTaxes: 2400,
    insurance: 1200,
    hoaFees: 0,
    propertyManagementPercent: 10,
    maintenancePercent: 5,
    vacancyRatePercent: 5,
    utilities: 0,
    afterRepairValue: 220000,
    refinanceLTV: 75,
    newInterestRate: 7,
    newLoanTerm: 30,
    refinanceClosingCosts: 3000
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const [results, setResults] = useState({});
  const [refinanceScenario, setRefinanceScenario] = useState(75);

  useEffect(() => {
    const { inputs: urlInputs, hasParams } = loadFromURL(defaultInputs);
    if (hasParams) {
      setInputs(urlInputs);
    }
    trackCalculatorUsage('BRRRR Strategy');
  }, []);

  const calculateResults = () => {
    try {
      const downPayment = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
      const closingCosts = inputs.purchasePrice * (inputs.closingCostsPercent / 100);
      const loanAmount = inputs.purchasePrice - downPayment;
      
      const monthlyPayment = calculateMonthlyPayment(
        loanAmount,
        inputs.initialInterestRate,
        inputs.initialLoanTerm
      );

      const holdingCostsDuringRehab = inputs.monthlyHoldingCosts * inputs.renovationTimeline;
      const financingCostsDuringRehab = monthlyPayment * inputs.renovationTimeline;
      
      const totalCashInvested = downPayment + closingCosts + inputs.renovationBudget + 
        holdingCostsDuringRehab + financingCostsDuringRehab;
      
      const refinanceLTV = refinanceScenario / 100;
      const newLoanAmount = inputs.afterRepairValue * refinanceLTV;
      const cashOutAmount = newLoanAmount - loanAmount;
      const cashRecovered = cashOutAmount - inputs.refinanceClosingCosts;
      const cashLeftInDeal = totalCashInvested - cashRecovered;
      
      const monthlyPaymentNew = calculateMonthlyPayment(
        newLoanAmount,
        inputs.newInterestRate,
        inputs.newLoanTerm
      );
      
      const grossMonthlyIncome = inputs.monthlyRent;
      const effectiveMonthlyIncome = grossMonthlyIncome * (1 - inputs.vacancyRatePercent / 100);
      
      const monthlyPropertyTaxes = inputs.propertyTaxes / 12;
      const monthlyInsurance = inputs.insurance / 12;
      const monthlyPropertyManagement = effectiveMonthlyIncome * (inputs.propertyManagementPercent / 100);
      const monthlyMaintenance = effectiveMonthlyIncome * (inputs.maintenancePercent / 100);
      
      const totalMonthlyExpenses = monthlyPaymentNew + monthlyPropertyTaxes + monthlyInsurance + 
        inputs.hoaFees + monthlyPropertyManagement + monthlyMaintenance + inputs.utilities;
      
      const monthlyCashFlow = effectiveMonthlyIncome - totalMonthlyExpenses;
      const annualCashFlow = monthlyCashFlow * 12;
      
      const cashOnCashReturn = cashLeftInDeal > 0 
        ? (annualCashFlow / cashLeftInDeal) * 100 
        : Infinity;
      
      const capitalRecoveryPercent = (cashRecovered / totalCashInvested) * 100;
      const infiniteReturn = cashLeftInDeal <= 0;
      
      const breakEvenMonths = cashLeftInDeal > 0 && monthlyCashFlow > 0
        ? Math.ceil(cashLeftInDeal / monthlyCashFlow)
        : 0;

      let dealRating = 'Poor';
      if (capitalRecoveryPercent >= 100) dealRating = 'Excellent';
      else if (capitalRecoveryPercent >= 80) dealRating = 'Great';
      else if (capitalRecoveryPercent >= 60) dealRating = 'Good';
      else if (capitalRecoveryPercent >= 40) dealRating = 'Fair';

      setResults({
        totalCashInvested,
        cashRecovered,
        cashLeftInDeal,
        monthlyPaymentNew,
        monthlyCashFlow,
        cashOnCashReturn,
        capitalRecoveryPercent,
        dealRating,
        infiniteReturn,
        breakEvenMonths,
        effectiveMonthlyIncome,
        totalMonthlyExpenses
      });

      trackCalculation('BRRRR Strategy');
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  useEffect(() => {
    calculateResults();
    saveToURL({ ...inputs, refinanceScenario }, true);
  }, [inputs, refinanceScenario]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value === '' ? 0 : parseFloat(value) || 0
    }));
  };

  const loadExample = () => {
    setInputs({
      purchasePrice: 120000,
      downPaymentPercent: 25,
      closingCostsPercent: 2,
      initialInterestRate: 8,
      initialLoanTerm: 30,
      renovationBudget: 35000,
      renovationTimeline: 3,
      monthlyHoldingCosts: 400,
      monthlyRent: 1600,
      propertyTaxes: 2000,
      insurance: 1000,
      hoaFees: 0,
      propertyManagementPercent: 8,
      maintenancePercent: 5,
      vacancyRatePercent: 5,
      utilities: 0,
      afterRepairValue: 200000,
      refinanceLTV: 75,
      newInterestRate: 6.5,
      newLoanTerm: 30,
      refinanceClosingCosts: 2500
    });
    setRefinanceScenario(75);
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setRefinanceScenario(75);
  };

  return (
    <>
      <Helmet>
        <title>BRRRR Strategy Calculator - Analyze Your Deal | REI Calculator Pro</title>
        <meta name="description" content="Free BRRRR calculator for Buy, Rehab, Rent, Refinance, Repeat strategy. Calculate capital recovery, infinite returns & cash-on-cash ROI for real estate deals." />
        <link rel="canonical" href="https://reicalculator.pro/brrrr-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <AdBox size="mobile" className="mb-4" />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                BRRRR Strategy Calculator
              </h1>
              <p className="text-gray-600">Buy, Rehab, Rent, Refinance, Repeat</p>
              <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                Calculate capital recovery and infinite returns for the BRRRR real estate investment strategy.
              </p>
            </div>

            <ActionButtons 
              inputs={inputs}
              onLoadExample={loadExample}
              onReset={handleReset}
              calculatorName="BRRRR Strategy"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Buy Phase */}
                <ResultCard title="Buy Phase" icon="fas fa-home">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Purchase Price"
                      value={inputs.purchasePrice}
                      onChange={(value) => handleInputChange('purchasePrice', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Down Payment (%)"
                      value={inputs.downPaymentPercent}
                      onChange={(value) => handleInputChange('downPaymentPercent', value)}
                      suffix="%"
                    />
                    <InputField
                      label="Closing Costs (%)"
                      value={inputs.closingCostsPercent}
                      onChange={(value) => handleInputChange('closingCostsPercent', value)}
                      suffix="%"
                    />
                    <InputField
                      label="Initial Interest Rate (%)"
                      value={inputs.initialInterestRate}
                      onChange={(value) => handleInputChange('initialInterestRate', value)}
                      suffix="%"
                      step="0.1"
                    />
                  </div>
                </ResultCard>

                {/* Rehab Phase */}
                <ResultCard title="Rehab Phase" icon="fas fa-tools">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Renovation Budget"
                      value={inputs.renovationBudget}
                      onChange={(value) => handleInputChange('renovationBudget', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Renovation Timeline (Months)"
                      value={inputs.renovationTimeline}
                      onChange={(value) => handleInputChange('renovationTimeline', value)}
                    />
                    <InputField
                      label="Monthly Holding Costs"
                      value={inputs.monthlyHoldingCosts}
                      onChange={(value) => handleInputChange('monthlyHoldingCosts', value)}
                      prefix="$"
                      tooltip="Utilities, insurance, and other costs during renovation"
                    />
                  </div>
                </ResultCard>

                {/* Rent Phase */}
                <ResultCard title="Rent Phase" icon="fas fa-key">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Expected Monthly Rent"
                      value={inputs.monthlyRent}
                      onChange={(value) => handleInputChange('monthlyRent', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Property Taxes (Annual)"
                      value={inputs.propertyTaxes}
                      onChange={(value) => handleInputChange('propertyTaxes', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Insurance (Annual)"
                      value={inputs.insurance}
                      onChange={(value) => handleInputChange('insurance', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Property Management (%)"
                      value={inputs.propertyManagementPercent}
                      onChange={(value) => handleInputChange('propertyManagementPercent', value)}
                      suffix="%"
                      step="0.1"
                    />
                    <InputField
                      label="Maintenance Reserve (%)"
                      value={inputs.maintenancePercent}
                      onChange={(value) => handleInputChange('maintenancePercent', value)}
                      suffix="%"
                      step="0.1"
                    />
                    <InputField
                      label="Vacancy Rate (%)"
                      value={inputs.vacancyRatePercent}
                      onChange={(value) => handleInputChange('vacancyRatePercent', value)}
                      suffix="%"
                      step="0.1"
                    />
                  </div>
                </ResultCard>

                {/* Refinance Phase */}
                <ResultCard title="Refinance Phase" icon="fas fa-sync">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="After Repair Value (ARV)"
                      value={inputs.afterRepairValue}
                      onChange={(value) => handleInputChange('afterRepairValue', value)}
                      prefix="$"
                      tooltip="Expected value after renovations"
                    />
                    <InputField
                      label="New Interest Rate (%)"
                      value={inputs.newInterestRate}
                      onChange={(value) => handleInputChange('newInterestRate', value)}
                      suffix="%"
                      step="0.1"
                    />
                    <InputField
                      label="Refinance Closing Costs"
                      value={inputs.refinanceClosingCosts}
                      onChange={(value) => handleInputChange('refinanceClosingCosts', value)}
                      prefix="$"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What-If Refinance Scenarios
                    </label>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <button
                        onClick={() => setRefinanceScenario(70)}
                        className={`px-4 py-2 rounded-lg transition ${refinanceScenario === 70 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
                      >
                        70% LTV
                      </button>
                      <button
                        onClick={() => setRefinanceScenario(75)}
                        className={`px-4 py-2 rounded-lg transition ${refinanceScenario === 75 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
                      >
                        75% LTV
                      </button>
                      <button
                        onClick={() => setRefinanceScenario(80)}
                        className={`px-4 py-2 rounded-lg transition ${refinanceScenario === 80 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
                      >
                        80% LTV
                      </button>
                    </div>
                  </div>
                </ResultCard>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <AdBox size="rectangle" />

                {/* Deal Score */}
                <ResultCard title="Deal Analysis" gradient>
                  <div className="text-center mb-6">
                    <DealBadge rating={results.dealRating} className="mb-4" />
                    
                    <div className="w-32 h-32 mx-auto mb-4 relative">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          className="text-gray-300"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                        <circle
                          className={results.capitalRecoveryPercent >= 100 ? 'text-green-500' : 'text-blue-500'}
                          strokeWidth="8"
                          strokeDasharray={Math.PI * 2 * 56}
                          strokeDashoffset={Math.PI * 2 * 56 * (1 - Math.min(results.capitalRecoveryPercent, 100) / 100)}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{Math.round(results.capitalRecoveryPercent)}%</div>
                          <div className="text-xs text-gray-600">Capital Recovered</div>
                        </div>
                      </div>
                    </div>

                    {results.infiniteReturn && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                        <p className="text-green-800 font-semibold">🎉 Infinite Return Achieved!</p>
                        <p className="text-sm text-green-700 mt-1">You've recovered all your capital</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <MetricDisplay
                      label="Total Cash Invested"
                      value={results.totalCashInvested}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Cash Recovered"
                      value={results.cashRecovered}
                      type="currency"
                      positive={results.cashRecovered > 0}
                    />
                    <MetricDisplay
                      label="Cash Left in Deal"
                      value={results.cashLeftInDeal}
                      type="currency"
                      positive={results.cashLeftInDeal <= 0}
                    />
                    <MetricDisplay
                      label="Monthly Cash Flow"
                      value={results.monthlyCashFlow}
                      type="currency"
                      positive={results.monthlyCashFlow >= 0}
                    />
                    <MetricDisplay
                      label="Cash-on-Cash Return"
                      value={results.infiniteReturn ? '∞' : formatPercentage(results.cashOnCashReturn)}
                      type="number"
                    />
                  </div>
                </ResultCard>

                {/* BRRRR vs Traditional */}
                <ResultCard title="BRRRR vs Traditional" icon="fas fa-balance-scale">
                  <div className="space-y-3">
                    <MetricDisplay
                      label="BRRRR Cash Left"
                      value={results.cashLeftInDeal}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Traditional (No Refi)"
                      value={results.totalCashInvested}
                      type="currency"
                    />
                    <div className="border-t pt-3">
                      <MetricDisplay
                        label="Capital Freed Up"
                        value={results.totalCashInvested - results.cashLeftInDeal}
                        type="currency"
                        positive={true}
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

export default BRRRRCalculator;