// Utility functions for formatting currency, percentages, and numbers

export const formatCurrency = (amount, options = {}) => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    currency = 'USD',
    locale = 'en-US'
  } = options;

  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'N/A';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `$${amount.toLocaleString()}`;
  }
};

export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  if (value === Infinity) {
    return '∞';
  }

  return `${Number(value).toFixed(decimals)}%`;
};

export const formatNumber = (value, options = {}) => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    locale = 'en-US'
  } = options;

  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  if (value === Infinity) {
    return '∞';
  }

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits
    }).format(value);
  } catch (error) {
    console.error('Error formatting number:', error);
    return value.toLocaleString();
  }
};

export const formatLargeNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return formatNumber(value);
};

// Parse and clean numeric input values
export const parseNumericInput = (value) => {
  if (value === '' || value === null || value === undefined) {
    return 0;
  }

  // Remove any non-numeric characters except decimal point and negative sign
  const cleaned = value.toString().replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
};

// Validate numeric input
export const validateNumericInput = (value, min = null, max = null) => {
  const num = parseNumericInput(value);
  
  if (min !== null && num < min) {
    return { isValid: false, error: `Value must be at least ${min}` };
  }
  
  if (max !== null && num > max) {
    return { isValid: false, error: `Value must be at most ${max}` };
  }
  
  return { isValid: true, value: num };
};

// Format time duration (for break-even calculations)
export const formatDuration = (months) => {
  if (months === null || months === undefined || isNaN(months) || months <= 0) {
    return 'N/A';
  }

  if (months < 12) {
    return `${Math.round(months)} month${months !== 1 ? 's' : ''}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = Math.round(months % 12);

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }

  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

// Calculate monthly payment for loan
export const calculateMonthlyPayment = (principal, annualRate, termInYears) => {
  if (principal <= 0 || termInYears <= 0) {
    return 0;
  }

  if (annualRate === 0) {
    return principal / (termInYears * 12);
  }

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termInYears * 12;
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment;
};

// Validate percentage input (0-100)
export const validatePercentage = (value, allowZero = true) => {
  const num = parseNumericInput(value);
  
  if (!allowZero && num === 0) {
    return { isValid: false, error: 'Percentage must be greater than 0' };
  }
  
  if (num < 0) {
    return { isValid: false, error: 'Percentage cannot be negative' };
  }
  
  if (num > 100) {
    return { isValid: false, error: 'Percentage cannot exceed 100%' };
  }
  
  return { isValid: true, value: num };
};

// Format for display in input fields
export const formatInputValue = (value, type = 'number') => {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  switch (type) {
    case 'currency':
      return parseNumericInput(value).toString();
    case 'percentage':
      return parseNumericInput(value).toString();
    default:
      return value.toString();
  }
};