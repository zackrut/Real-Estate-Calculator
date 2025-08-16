import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import InputField from '../components/common/InputField';
import ResultCard, { MetricDisplay, DealBadge } from '../components/common/ResultCard';
import ActionButtons from '../components/common/ActionButtons';
import AdBox from '../components/AdBox';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { trackCalculatorUsage, trackCalculation, useTimeTracking } from '../utils/analytics';
import { loadFromURL, saveToURL } from '../utils/urlParams';

const FixFlipCalculator = () => {
  useTimeTracking('Fix & Flip Profit');

  const defaultInputs = {
    purchasePrice: 200000,
    downPaymentPercent: 20,
    interestRate: 10,
    loanPoints: 2,
    purchaseClosingCosts: 3000,
    renovationBudget: 50000,
    contingencyPercent: 10,
    propertyTaxesMonthly: 300,
    insuranceMonthly: 150,
    utilitiesMonthly: 200,
    hoaFeesMonthly: 0,
    afterRepairValue: 325000,
    realtorCommissionPercent: 6,
    sellingClosingCostsPercent: 2,
    stagingCosts: 2000,
    preSaleRepairs: 1000
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const [results, setResults] = useState({});
  const [timeline, setTimeline] = useState(6);
  const [loanType, setLoanType] = useState('hard_money');

  useEffect(() => {
    const { inputs: urlInputs, hasParams } = loadFromURL(defaultInputs);
    if (hasParams) {
      setInputs(urlInputs);
    }
    trackCalculatorUsage('Fix & Flip Profit');
  }, []);

  const getLoanDefaults = (type) => {
    switch (type) {
      case 'hard_money':
        return { rate: 10, points: 2, downPayment: 20 };
      case 'conventional':
        return { rate: 7, points: 1, downPayment: 25 };
      case 'cash':
        return { rate: 0, points: 0, downPayment: 100 };
      default:
        return { rate: 10, points: 2, downPayment: 20 };
    }
  };

  const calculateDealGrade = (roi, annualizedROI) => {
    if (annualizedROI >= 50 && roi >= 25) return 'A+';
    if (annualizedROI >= 40 && roi >= 20) return 'A';
    if (annualizedROI >= 30 && roi >= 15) return 'B';
    if (annualizedROI >= 20 && roi >= 10) return 'C';
    if (annualizedROI >= 10 && roi >= 5) return 'D';
    return 'F';
  };

  const calculateResults = () => {
    try {
      const downPayment = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
      const loanAmount = inputs.purchasePrice - downPayment;
      const loanPointsCost = loanAmount * (inputs.loanPoints / 100);
      const totalPurchaseCosts = downPayment + loanPointsCost + inputs.purchaseClosingCosts;
      
      const contingencyAmount = inputs.renovationBudget * (inputs.contingencyPercent / 100);
      const totalRenovationCost = inputs.renovationBudget + contingencyAmount;
      
      const monthlyInterest = loanType !== 'cash' ? (loanAmount * (inputs.interestRate / 100)) / 12 : 0;
      const monthlyHoldingCosts = monthlyInterest + inputs.propertyTaxesMonthly + 
        inputs.insuranceMonthly + inputs.utilitiesMonthly + inputs.hoaFeesMonthly;
      const totalHoldingCosts = monthlyHoldingCosts * timeline;
      
      const realtorCommission = inputs.afterRepairValue * (inputs.realtorCommissionPercent / 100);
      const sellingClosingCosts = inputs.afterRepairValue * (inputs.sellingClosingCostsPercent / 100);
      const totalSellingCosts = realtorCommission + sellingClosingCosts + 
        inputs.stagingCosts + inputs.preSaleRepairs;
      
      const totalCosts = totalPurchaseCosts + totalRenovationCost + totalHoldingCosts + totalSellingCosts;
      
      const netProceeds = inputs.afterRepairValue - totalSellingCosts - loanAmount;
      const totalProfit = netProceeds - totalPurchaseCosts - totalRenovationCost - totalHoldingCosts;
      
      const totalInvestment = totalPurchaseCosts + totalRenovationCost;
      const roi = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
      const annualizedROI = timeline > 0 ? (roi / timeline) * 12 : 0;
      const profitPerMonth = timeline > 0 ? totalProfit / timeline : 0;
      
      const breakEvenPrice = totalCosts;
      
      const maxPurchaseFor70Rule = (inputs.afterRepairValue * 0.7) - totalRenovationCost;
      const passes70Rule = inputs.purchasePrice <= maxPurchaseFor70Rule;
      
      const dealGrade = calculateDealGrade(roi, annualizedROI);

      setResults({
        totalProfit,
        roi,
        annualizedROI,
        profitPerMonth,
        breakEvenPrice,
        dealGrade,
        totalInvestment,
        totalCosts,
        netProceeds,
        holdingCosts: totalHoldingCosts,
        purchaseCosts: totalPurchaseCosts,
        sellingCosts: totalSellingCosts,
        renovationCosts: totalRenovationCost,
        passes70Rule,
        maxPurchaseFor70Rule,
        loanAmount,
        monthlyPayment: monthlyInterest
      });

      trackCalculation('Fix & Flip Profit');
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  useEffect(() => {
    calculateResults();
    saveToURL({ ...inputs, timeline, loanType }, true);
  }, [inputs, timeline, loanType]);

  useEffect(() => {
    const defaults = getLoanDefaults(loanType);
    setInputs(prev => ({
      ...prev,
      interestRate: defaults.rate,
      loanPoints: defaults.points,
      downPaymentPercent: defaults.downPayment
    }));
  }, [loanType]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value === '' ? 0 : parseFloat(value) || 0
    }));
  };

  const loadExample = () => {
    setInputs({
      purchasePrice: 180000,
      downPaymentPercent: 20,
      interestRate: 10,
      loanPoints: 2,
      purchaseClosingCosts: 2500,
      renovationBudget: 45000,
      contingencyPercent: 10,
      propertyTaxesMonthly: 250,
      insuranceMonthly: 120,
      utilitiesMonthly: 180,
      hoaFeesMonthly: 0,
      afterRepairValue: 290000,
      realtorCommissionPercent: 6,
      sellingClosingCostsPercent: 2,
      stagingCosts: 1500,
      preSaleRepairs: 800
    });
    setTimeline(5);
    setLoanType('hard_money');
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setTimeline(6);
    setLoanType('hard_money');
  };

  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'bg-green-600',
      'A': 'bg-green-500',
      'B': 'bg-blue-500',
      'C': 'bg-yellow-500',
      'D': 'bg-orange-500',
      'F': 'bg-red-500'
    };
    return colors[grade] || 'bg-gray-500';
  };

  return (
    <>
      <Helmet>
        <title>Fix & Flip Profit Calculator | REI Calculator Pro</title>
        <meta name="description" content="Free fix & flip calculator for house flipping profits. Analyze renovation costs, holding costs, timeline impact & total ROI for flipping projects." />
        <link rel="canonical" href="https://reicalculator.pro/fix-flip-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <AdBox size="mobile" className="mb-4" />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Fix & Flip Profit Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate detailed profit/loss for house flipping projects with comprehensive cost analysis.
              </p>
            </div>

            <ActionButtons 
              inputs={inputs}
              onLoadExample={loadExample}
              onReset={handleReset}
              calculatorName="Fix & Flip Profit"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Purchase Details */}
                <ResultCard title="Purchase Details" icon="fas fa-home">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Purchase Price"
                      value={inputs.purchasePrice}
                      onChange={(value) => handleInputChange('purchasePrice', value)}
                      prefix="$"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Type
                      </label>
                      <select
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        className="form-input"
                      >
                        <option value="hard_money">Hard Money</option>
                        <option value="conventional">Conventional</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>
                    <InputField
                      label="Down Payment (%)"
                      value={inputs.downPaymentPercent}
                      onChange={(value) => handleInputChange('downPaymentPercent', value)}
                      suffix="%"
                      disabled={loanType === 'cash'}
                    />
                    <InputField
                      label="Interest Rate (%)"
                      value={inputs.interestRate}
                      onChange={(value) => handleInputChange('interestRate', value)}
                      suffix="%"
                      step="0.1"
                      disabled={loanType === 'cash'}
                    />
                    <InputField
                      label="Loan Points"
                      value={inputs.loanPoints}
                      onChange={(value) => handleInputChange('loanPoints', value)}
                      step="0.5"
                      disabled={loanType === 'cash'}
                      tooltip="Upfront fee charged by lender as percentage of loan amount"
                    />
                    <InputField
                      label="Closing Costs"
                      value={inputs.purchaseClosingCosts}
                      onChange={(value) => handleInputChange('purchaseClosingCosts', value)}
                      prefix="$"
                    />
                  </div>
                </ResultCard>

                {/* Renovation */}
                <ResultCard title="Renovation" icon="fas fa-tools">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Renovation Budget"
                      value={inputs.renovationBudget}
                      onChange={(value) => handleInputChange('renovationBudget', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Contingency (%)"
                      value={inputs.contingencyPercent}
                      onChange={(value) => handleInputChange('contingencyPercent', value)}
                      suffix="%"
                      tooltip="Buffer for unexpected costs"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline: {timeline} months
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      value={timeline}
                      onChange={(e) => setTimeline(parseInt(e.target.value))}
                      className="slider w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>3 months</span>
                      <span>12 months</span>
                    </div>
                  </div>
                </ResultCard>

                {/* Holding Costs */}
                <ResultCard title="Monthly Holding Costs" icon="fas fa-calendar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Property Taxes"
                      value={inputs.propertyTaxesMonthly}
                      onChange={(value) => handleInputChange('propertyTaxesMonthly', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Insurance"
                      value={inputs.insuranceMonthly}
                      onChange={(value) => handleInputChange('insuranceMonthly', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Utilities"
                      value={inputs.utilitiesMonthly}
                      onChange={(value) => handleInputChange('utilitiesMonthly', value)}
                      prefix="$"
                    />
                    <InputField
                      label="HOA Fees"
                      value={inputs.hoaFeesMonthly}
                      onChange={(value) => handleInputChange('hoaFeesMonthly', value)}
                      prefix="$"
                    />
                  </div>
                </ResultCard>

                {/* Selling Details */}
                <ResultCard title="Selling Details" icon="fas fa-dollar-sign">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="After Repair Value (ARV)"
                      value={inputs.afterRepairValue}
                      onChange={(value) => handleInputChange('afterRepairValue', value)}
                      prefix="$"
                      tooltip="Expected sale price after renovations"
                    />
                    <InputField
                      label="Realtor Commission (%)"
                      value={inputs.realtorCommissionPercent}
                      onChange={(value) => handleInputChange('realtorCommissionPercent', value)}
                      suffix="%"
                      step="0.5"
                    />
                    <InputField
                      label="Closing Costs (%)"
                      value={inputs.sellingClosingCostsPercent}
                      onChange={(value) => handleInputChange('sellingClosingCostsPercent', value)}
                      suffix="%"
                      step="0.5"
                    />
                    <InputField
                      label="Staging Costs"
                      value={inputs.stagingCosts}
                      onChange={(value) => handleInputChange('stagingCosts', value)}
                      prefix="$"
                    />
                    <InputField
                      label="Pre-Sale Repairs"
                      value={inputs.preSaleRepairs}
                      onChange={(value) => handleInputChange('preSaleRepairs', value)}
                      prefix="$"
                    />
                  </div>
                </ResultCard>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <AdBox size="rectangle" />

                {/* Deal Analysis */}
                <ResultCard title="Deal Analysis" gradient>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl ${getGradeColor(results.dealGrade)}`}>
                      {results.dealGrade}
                    </div>
                    
                    <div className={`text-3xl font-bold mb-2 ${results.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.totalProfit >= 0 ? 'Profit: ' : 'Loss: '}
                      {formatCurrency(Math.abs(results.totalProfit))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <MetricDisplay
                      label="ROI"
                      value={results.roi}
                      type="percentage"
                    />
                    <MetricDisplay
                      label="Annualized ROI"
                      value={results.annualizedROI}
                      type="percentage"
                    />
                    <MetricDisplay
                      label="Profit/Month"
                      value={results.profitPerMonth}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Break-even Price"
                      value={results.breakEvenPrice}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Total Investment"
                      value={results.totalInvestment}
                      type="currency"
                    />
                  </div>
                </ResultCard>

                {/* 70% Rule Validator */}
                <ResultCard title="70% Rule Validator" icon="fas fa-check-circle">
                  <div className="space-y-3">
                    <MetricDisplay
                      label="Max Purchase Price (70% Rule)"
                      value={results.maxPurchaseFor70Rule}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Your Purchase Price"
                      value={inputs.purchasePrice}
                      type="currency"
                    />
                    <div className={`p-3 rounded-lg text-center font-semibold ${
                      results.passes70Rule 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {results.passes70Rule ? '✓ Passes 70% Rule' : '✗ Fails 70% Rule'}
                    </div>
                    {!results.passes70Rule && (
                      <p className="text-sm text-red-600 text-center">
                        Overpaying by {formatCurrency(inputs.purchasePrice - results.maxPurchaseFor70Rule)}
                      </p>
                    )}
                  </div>
                </ResultCard>

                {/* Cost Breakdown */}
                <ResultCard title="Cost Breakdown" icon="fas fa-chart-pie">
                  <div className="space-y-3">
                    <MetricDisplay
                      label="Purchase Costs"
                      value={results.purchaseCosts}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Renovation Costs"
                      value={results.renovationCosts}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Holding Costs"
                      value={results.holdingCosts}
                      type="currency"
                    />
                    <MetricDisplay
                      label="Selling Costs"
                      value={results.sellingCosts}
                      type="currency"
                    />
                    <div className="border-t pt-3">
                      <MetricDisplay
                        label="Total Costs"
                        value={results.totalCosts}
                        type="currency"
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

export default FixFlipCalculator;