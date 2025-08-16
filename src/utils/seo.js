// SEO utilities and meta tag management

export const updatePageMeta = (metaData) => {
  const {
    title,
    description,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage
  } = metaData;

  // Update page title
  if (title) {
    document.title = title;
  }

  // Update meta tags
  const metaTags = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    
    // Open Graph
    { property: 'og:title', content: ogTitle || title },
    { property: 'og:description', content: ogDescription || description },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: canonical || window.location.href },
    
    // Twitter
    { name: 'twitter:title', content: twitterTitle || ogTitle || title },
    { name: 'twitter:description', content: twitterDescription || ogDescription || description },
    { name: 'twitter:image', content: twitterImage || ogImage }
  ];

  metaTags.forEach(({ name, property, content }) => {
    if (content) {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (name) element.name = name;
        if (property) element.property = property;
        document.head.appendChild(element);
      }
      
      element.content = content;
    }
  });

  // Update canonical URL
  if (canonical) {
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = canonical;
  }
};

export const generateStructuredData = (data) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  
  // Remove existing structured data for this type
  const existing = document.querySelector(`script[type="application/ld+json"][data-type="${data['@type']}"]`);
  if (existing) {
    existing.remove();
  }
  
  script.setAttribute('data-type', data['@type']);
  document.head.appendChild(script);
};

export const createCalculatorStructuredData = (calculatorName, description, url) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculatorName,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "description": description,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": "REI Calculator Pro",
      "url": "https://reicalculator.pro"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2500"
    }
  };
};