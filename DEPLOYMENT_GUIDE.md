# Deployment Guide - REI Calculator Pro

This guide will walk you through deploying the REI Calculator Pro React application to production.

## 🎯 Prerequisites

- Node.js 16+ installed
- Git repository
- Netlify account (recommended) or web hosting service
- Google Analytics 4 property
- Google AdSense account (optional)

## 🚀 Netlify Deployment (Recommended)

### Step 1: Prepare Your Repository

```bash
# Clone or download the project
git clone <your-repo-url>
cd calc-site

# Install dependencies
npm install

# Test the build locally
npm run build
```

### Step 2: Connect to Netlify

1. **Via Netlify Dashboard:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your Git provider (GitHub, GitLab, Bitbucket)
   - Select your repository

2. **Via Netlify CLI:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Initialize site
   netlify init
   ```

### Step 3: Configure Build Settings

In Netlify dashboard or `netlify.toml`:

```toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"
```

### Step 4: Set Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables:

```
GA_MEASUREMENT_ID=G-XXXXXXXXXX
ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
NODE_ENV=production
```

### Step 5: Deploy

```bash
# For initial deployment
netlify deploy --prod

# For future deployments (if using CLI)
npm run deploy
```

## 🌐 Custom Domain Setup

### Step 1: Add Domain in Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain: `reicalculator.pro`
3. Netlify will provide DNS configuration

### Step 2: Configure DNS

Point your domain to Netlify:

```
Type: CNAME
Name: www
Value: <your-netlify-subdomain>.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

### Step 3: Enable HTTPS

- Netlify automatically provisions SSL certificates
- Force HTTPS in Site Settings → HTTPS

## 🔧 Google Services Configuration

### Google Analytics 4 Setup

1. **Create GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property
   - Copy Measurement ID (G-XXXXXXXXXX)

2. **Update Application:**
   Replace `GA_MEASUREMENT_ID` in:
   - `public/index.html` (line 70)
   - Environment variables

3. **Verify Tracking:**
   - Use GA4 Real-time reports
   - Check browser console for gtag events

### Google AdSense Setup

1. **Apply for AdSense:**
   - Visit [Google AdSense](https://www.google.com/adsense/)
   - Add your site for review
   - Wait for approval (1-14 days)

2. **Update Ad Units:**
   Replace placeholders in `src/components/AdBox.js`:
   ```javascript
   adClient = 'ca-pub-YOUR-PUBLISHER-ID'
   adSlot = 'YOUR-AD-SLOT-ID'
   ```

3. **Test Ad Display:**
   - Use AdSense sandbox mode during development
   - Verify ads appear in production

## 🔍 SEO Configuration

### Google Search Console

1. **Add Property:**
   - Go to [Google Search Console](https://search.google.com/search-console/)
   - Add your domain
   - Verify ownership via DNS

2. **Submit Sitemap:**
   - Upload `sitemap.xml` to your site root
   - Submit sitemap URL: `https://reicalculator.pro/sitemap.xml`

3. **Request Indexing:**
   Use URL Inspection tool for each page:
   - `/` (homepage)
   - `/rental-roi-calculator`
   - `/brrrr-calculator`
   - `/fix-flip-calculator`

### Schema Markup Validation

Test structured data:
- Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
- Validate each calculator page
- Fix any validation errors

## 📊 Performance Optimization

### Enable Compression

Add to `netlify.toml`:

```toml
[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Optimize Images

```bash
# Install image optimization tools
npm install -g imagemin-cli imagemin-webp

# Optimize images
imagemin public/images/* --out-dir=public/images --plugin=webp
```

### Monitor Performance

- Use [PageSpeed Insights](https://pagespeed.web.dev/)
- Target scores: 90+ mobile, 95+ desktop
- Monitor Core Web Vitals

## 🧪 Testing & Validation

### Pre-Deployment Checklist

```bash
# Build and test locally
npm run build
npx serve -s build

# Test all routes
# ✓ Homepage loads
# ✓ All calculator pages work
# ✓ Mobile responsiveness
# ✓ Print functionality
# ✓ Share buttons work
```

### Post-Deployment Validation

1. **Functionality Test:**
   - [ ] All calculators load and calculate correctly
   - [ ] Navigation works on all devices
   - [ ] Forms validate properly
   - [ ] Share/print functions work

2. **SEO Test:**
   - [ ] All meta tags present
   - [ ] Structured data validates
   - [ ] Sitemap accessible
   - [ ] Robots.txt correct

3. **Analytics Test:**
   - [ ] Page views tracked
   - [ ] Events firing correctly
   - [ ] Real-time data in GA4

4. **Performance Test:**
   - [ ] PageSpeed score 90+
   - [ ] Mobile performance good
   - [ ] Images optimized
   - [ ] Fonts loading correctly

## 🔒 Security Considerations

### Content Security Policy

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Environment Variables

Never commit sensitive data:
- Use environment variables for API keys
- Keep `.env` files out of version control
- Use Netlify's secure environment variables

## 📈 Monitoring & Maintenance

### Analytics Monitoring

Set up alerts for:
- Traffic drops
- Error rate increases
- Performance degradation

### Regular Updates

```bash
# Check for security updates
npm audit

# Update dependencies
npm update

# Test after updates
npm test && npm run build
```

### Backup Strategy

- Git repository serves as code backup
- Export Google Analytics data monthly
- Document any custom configurations

## 🆘 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version compatibility
node --version  # Should be 16+
```

**Routing Issues:**
- Verify `_redirects` file in public folder
- Check Netlify deployment logs
- Test SPA routing locally

**Analytics Not Working:**
- Check measurement ID is correct
- Verify no ad blockers interfering
- Test in incognito mode

**Performance Issues:**
- Optimize images to WebP format
- Enable gzip compression
- Use Netlify's CDN features

### Getting Help

- 📧 Technical Support: support@reicalculator.pro
- 📚 Documentation: Check README.md
- 🐛 Bug Reports: Create GitHub issue
- 💬 Community: Join our Discord server

---

## 🎉 Launch Checklist

Before going live:

- [ ] All environment variables set
- [ ] Google Analytics working
- [ ] SEO meta tags complete
- [ ] Mobile responsive tested
- [ ] All calculators functional
- [ ] Print/share features working
- [ ] Performance scores 90+
- [ ] Security headers configured
- [ ] Sitemap submitted to Google
- [ ] Custom domain configured
- [ ] SSL certificate active

**🚀 You're ready to launch!**