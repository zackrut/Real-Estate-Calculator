# Quick Start Guide - REI Calculator Pro

Get your React application running in minutes!

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ ([Download here](https://nodejs.org/))
- Git ([Download here](https://git-scm.com/))
- Code editor (VS Code recommended)

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd calc-site

# Install all dependencies
npm install
```

### Step 2: Start Development Server

```bash
# Start the development server
npm start

# Your app will open at http://localhost:3000
```

## 📁 Project Overview

```
calc-site/
├── public/                    # Static files
│   ├── index.html            # Main HTML template
│   ├── manifest.json         # PWA configuration
│   ├── _redirects           # Netlify routing
│   └── robots.txt           # SEO directives
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Shared UI components
│   │   ├── Header.js       # Site navigation
│   │   ├── Footer.js       # Site footer
│   │   └── AdBox.js        # Advertisement container
│   ├── pages/              # Route components
│   │   ├── HomePage.js     # Landing page
│   │   ├── RentalROICalculator.js
│   │   ├── BRRRRCalculator.js
│   │   └── FixFlipCalculator.js
│   ├── utils/              # Helper functions
│   │   ├── analytics.js    # Google Analytics
│   │   ├── formatters.js   # Number/currency formatting
│   │   ├── seo.js         # SEO utilities
│   │   └── urlParams.js   # URL state management
│   └── styles/
│       └── index.css       # Global styles + Tailwind
└── netlify.toml            # Deployment configuration
```

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Analyze bundle size
npm run analyze

# Deploy to Netlify (after setup)
npm run deploy
```

## 🎯 Key Features

### ✅ What's Already Built
- **3 Professional Calculators:**
  - Rental Property ROI Calculator
  - BRRRR Strategy Calculator  
  - Fix & Flip Profit Calculator

- **Responsive Design:**
  - Mobile-first approach
  - Works on all device sizes
  - Touch-friendly interface

- **SEO Optimized:**
  - Dynamic meta tags
  - Structured data markup
  - Sitemap generation
  - Social sharing

- **Performance:**
  - Code splitting
  - Lazy loading
  - Optimized assets
  - Fast loading times

- **Analytics Ready:**
  - Google Analytics 4 integration
  - Event tracking
  - User behavior monitoring

## 🔧 Customization

### Changing Colors/Branding

Edit `src/styles/index.css`:

```css
:root {
  --primary-blue: #3b82f6;    /* Main blue color */
  --primary-green: #10b981;   /* Accent green */
  --secondary-navy: #1e3a8a;  /* Dark blue */
}
```

### Adding New Calculators

1. Create new page in `src/pages/NewCalculator.js`
2. Add route in `src/App.js`
3. Update navigation in `src/components/Header.js`
4. Add to calculator list in `src/pages/HomePage.js`

### Modifying Calculations

Each calculator has its own calculation logic in the component file:
- Look for `calculateResults()` function
- Modify formulas as needed
- Update result displays accordingly

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
```bash
# Connect your Git repository to Netlify
# Build command: npm run build
# Publish directory: build
# Auto-deploys on Git push
```

### Option 2: Vercel
```bash
npm install -g vercel
vercel --prod
```

### Option 3: Traditional Web Hosting
```bash
npm run build
# Upload 'build' folder contents to your web server
```

## 🔑 Required Configuration

### Before Going Live:

1. **Google Analytics Setup:**
   - Replace `GA_MEASUREMENT_ID` in `public/index.html`
   - Get ID from [Google Analytics](https://analytics.google.com)

2. **Google AdSense Setup:**
   - Replace `ca-pub-XXXXXXXXXX` in `src/components/AdBox.js`
   - Apply at [Google AdSense](https://www.google.com/adsense/)

3. **Domain Configuration:**
   - Update canonical URLs in SEO components
   - Configure DNS settings
   - Enable HTTPS

## 🧪 Testing Your Setup

### Local Testing Checklist:
- [ ] Homepage loads correctly
- [ ] All 3 calculators function properly
- [ ] Navigation works on mobile and desktop
- [ ] Print functionality works
- [ ] Share buttons generate URLs
- [ ] Form inputs validate correctly

### Production Testing Checklist:
- [ ] All pages load quickly (< 3 seconds)
- [ ] Google Analytics tracking works
- [ ] SEO meta tags are correct
- [ ] Mobile responsiveness verified
- [ ] All links work correctly

## 💡 Common Issues & Solutions

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling Issues
- Check Tailwind CSS classes are loading
- Verify custom CSS in `src/styles/index.css`
- Use browser dev tools to debug

### Calculator Not Working
- Check console for JavaScript errors
- Verify all required props are passed
- Test with simple input values

### Deployment Issues
- Ensure `_redirects` file exists in `public/` folder
- Check Netlify build logs for errors
- Verify environment variables are set

## 📞 Getting Help

- 📖 Check the full README.md for detailed documentation
- 🚀 Review DEPLOYMENT_GUIDE.md for production setup
- 🐛 Create GitHub issue for bugs
- 💬 Join our community Discord

## ⚡ Quick Deploy to Netlify

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Deploy!

3. **Your site will be live in minutes!**

---

**🎉 Congratulations! You now have a professional real estate calculator website ready to deploy.**