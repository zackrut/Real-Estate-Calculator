// URL parameter utilities for saving and loading calculator state

export const saveToURL = (inputs, replaceState = false) => {
  const params = new URLSearchParams();
  
  Object.entries(inputs).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '' && value !== 0) {
      params.append(key, value.toString());
    }
  });

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  
  if (replaceState) {
    window.history.replaceState({}, '', newUrl);
  } else {
    window.history.pushState({}, '', newUrl);
  }
};

export const loadFromURL = (defaultInputs) => {
  const params = new URLSearchParams(window.location.search);
  const inputs = { ...defaultInputs };
  let hasParams = false;

  params.forEach((value, key) => {
    if (key in inputs) {
      const numericValue = parseFloat(value);
      inputs[key] = !isNaN(numericValue) ? numericValue : value;
      hasParams = true;
    }
  });

  return { inputs, hasParams };
};

export const clearURL = () => {
  window.history.replaceState({}, '', window.location.pathname);
};

export const generateShareableURL = (inputs) => {
  const params = new URLSearchParams();
  
  Object.entries(inputs).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '' && value !== 0) {
      params.append(key, value.toString());
    }
  });

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};