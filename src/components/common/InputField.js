import React from 'react';

const InputField = ({
  label,
  type = 'number',
  value,
  onChange,
  placeholder,
  tooltip,
  step,
  min,
  max,
  prefix,
  suffix,
  className = '',
  disabled = false,
  required = false,
  error
}) => {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {tooltip && (
          <span className="tooltip ml-1">
            <span className="text-gray-600 cursor-help">ⓘ</span>
            <span className="tooltiptext">{tooltip}</span>
          </span>
        )}
      </label>
      
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-700 text-sm font-semibold">{prefix}</span>
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          className={`form-input ${prefix ? 'pl-12' : ''} ${suffix ? 'pr-12' : ''} ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-600 text-sm">{suffix}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;