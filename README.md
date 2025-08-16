# REI Calculator Pro - React Application

A professional React application for real estate investment calculators including Rental Property ROI, BRRRR Strategy, and Fix & Flip Profit analysis.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to Netlify
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── InputField.js         # Reusable input component
│   │   ├── ResultCard.js         # Result display components
│   │   └── ActionButtons.js      # Share/Print/Reset buttons
│   ├── Header.js                 # Site navigation
│   ├── Footer.js                 # Site footer
│   ├── AdBox.js                  # AdSense container
│   ├── LoadingSpinner.js         # Loading state
│   └── ErrorBoundary.js          # Error handling
├── pages/
│   ├── HomePage.js               # Landing page
│   ├── RentalROICalculator.js    # Rental property calculator
│   ├── BRRRRCalculator.js        # BRRRR strategy calculator
│   ├── FixFlipCalculator.js      # Fix & flip calculator
│   └── NotFound.js               # 404 page
├── utils/
│   ├── analytics.js              # Google Analytics tracking
│   ├── formatters.js             # Currency/number formatting
│   ├── seo.js                    # SEO utilities
│   └── urlParams.js              # URL state management
├── styles/
│   └── index.css                 # Global styles with Tailwind
├── App.js                        # Main app component
└── index.js                      # Application entry point
```

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Interactive charts and graphs
- **React Helmet Async** - SEO meta tag management
- **Font Awesome** - Icon library

## 🎯 Features

### Core Functionality
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized with meta tags
- ✅ Google Analytics 4 integration
- ✅ Google AdSense ready
- ✅ Error boundaries and loading states
- ✅ URL state persistence
- ✅ Print/PDF export functionality
- ✅ Social sharing capabilities

### Calculator Features
- ✅ Real-time calculations
- ✅ Input validation
- ✅ Professional result displays
- ✅ Interactive charts and graphs
- ✅ Tooltips and help text
- ✅ Example data loading
- ✅ Reset functionality

### Performance
- ✅ Code splitting with React.lazy()
- ✅ Optimized bundle size
- ✅ Fast loading with resource hints
- ✅ Lazy loading for non-critical content

## 🚢 Deployment

### Netlify Deployment

1. **Connect Repository**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   build
   ```

2. **Environment Variables**
   Set these in Netlify dashboard:
   ```
   GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
   ```

3. **Domain Configuration**
   - Set custom domain: `reicalculator.pro`
   - Enable HTTPS (automatic with Netlify)
   - Configure DNS with your registrar

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the 'build' folder to your web server
# Ensure _redirects file is in the root for SPA routing
```

## ⚙️ Configuration

### Google Analytics Setup

1. Create GA4 property
2. Replace `GA_MEASUREMENT_ID` in:
   - `public/index.html`
   - `src/utils/analytics.js`

### Google AdSense Setup

1. Apply for AdSense approval
2. Replace `ca-pub-XXXXXXXXXX` with your publisher ID
3. Update ad slot IDs in `AdBox.js` component

### SEO Configuration

Update the following files:
- `public/manifest.json` - PWA settings
- `public/robots.txt` - Search engine directives
- `src/utils/seo.js` - Structured data

## 🧪 Testing

```bash
# Run tests
npm test

# Test build locally
npm run build
npx serve -s build

# Analyze bundle size
npm run analyze
```

## 📊 Analytics Events

The application tracks these events:

- `calculator_used` - When a calculator loads
- `calculation_performed` - When inputs change
- `pdf_download` - When print/PDF is used
- `share` - When share button is clicked
- `time_on_calculator` - Time spent on each calculator

## 🎨 Customization

### Styling
- Edit `src/styles/index.css` for global styles
- Tailwind classes are used throughout components
- Custom CSS variables in `:root` for consistent theming

### Adding New Calculators
1. Create new page component in `src/pages/`
2. Add route in `src/App.js`
3. Update navigation in `src/components/Header.js`
4. Add to calculator list in `src/pages/HomePage.js`

### Modifying Calculations
- All calculation logic is in individual calculator components
- Utility functions in `src/utils/formatters.js`
- Input validation helpers available

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Routing Issues**
- Ensure `_redirects` file exists in `public/`
- Check Netlify deployment settings

**Analytics Not Working**
- Verify GA4 measurement ID
- Check browser console for errors
- Ensure gtag is loaded

### Performance Optimization

**Bundle Size**
```bash
# Analyze what's in your bundle
npm run analyze
```

**Loading Speed**
- Images should be optimized (WebP format)
- Enable gzip compression on server
- Use Netlify's built-in CDN

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-calculator`)
3. Commit changes (`git commit -am 'Add new calculator'`)
4. Push to branch (`git push origin feature/new-calculator`)
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- 📧 Email: support@reicalculator.pro
- 📚 Documentation: [docs.reicalculator.pro](https://docs.reicalculator.pro)
- 🐛 Issues: [GitHub Issues](https://github.com/reicalculatorpro/calculator-app/issues)

---

Built with ❤️ for real estate investors worldwide.