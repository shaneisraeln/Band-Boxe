# BandBoxe Dry Cleaners - Deployment Guide

## Vercel Deployment

### Prerequisites
1. Vercel account
2. Google Gemini API key
3. GitHub repository (recommended)

### Step-by-Step Deployment

#### 1. Prepare Environment Variables
In your Vercel dashboard, add these environment variables:

```
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
VITE_APP_ENV=production
VITE_API_BASE_URL=https://your-domain.vercel.app
```

#### 2. Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the Vite framework
5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

#### 3. Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add VITE_GEMINI_API_KEY
vercel env add VITE_APP_ENV
vercel env add VITE_API_BASE_URL

# Redeploy with new env vars
vercel --prod
```

### Security Features Implemented

#### 1. HTTP Security Headers
- Content Security Policy (CSP)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection
- Referrer Policy
- Permissions Policy

#### 2. Input Validation & Sanitization
- All user inputs are sanitized
- Email and phone validation
- Rate limiting on API calls
- Input length restrictions

#### 3. API Security
- Gemini API safety settings enabled
- Rate limiting (1 second between calls)
- Input/output sanitization
- Error handling without exposing sensitive info

#### 4. Data Protection
- LocalStorage data validation
- Storage limits to prevent abuse
- Secure ID generation
- No sensitive data in client-side storage

### Performance Optimizations

#### 1. Build Optimizations
- TypeScript compilation
- Vite bundling and minification
- Tree shaking for unused code
- Asset optimization

#### 2. Runtime Optimizations
- Lazy loading of components
- Image optimization
- Efficient re-renders
- Memory management

### Monitoring & Maintenance

#### 1. Error Tracking
- Console error logging
- Graceful error handling
- User-friendly error messages

#### 2. Security Monitoring
- Regular dependency updates
- Security audit scripts
- API usage monitoring

### Environment-Specific Configurations

#### Development
```bash
npm run dev
```

#### Production Build
```bash
npm run build-and-audit
npm run preview
```

### Troubleshooting

#### Common Issues

1. **White Screen on Deployment**
   - Check environment variables are set correctly
   - Verify build logs in Vercel dashboard
   - Check browser console for errors

2. **Chat Not Working**
   - Verify VITE_GEMINI_API_KEY is set
   - Check API key permissions
   - Review network requests in browser dev tools

3. **Build Failures**
   - Run `npm run type-check` locally
   - Fix TypeScript errors
   - Check dependency versions

#### Support
- Check Vercel deployment logs
- Review browser console errors
- Test locally with `npm run build && npm run preview`

### Security Checklist

- [ ] Environment variables set in Vercel dashboard
- [ ] API keys not exposed in client code
- [ ] CSP headers configured
- [ ] Input validation implemented
- [ ] Rate limiting active
- [ ] Error handling secure
- [ ] Dependencies up to date
- [ ] Security audit passed

### Post-Deployment

1. Test all functionality
2. Verify chat widget works
3. Test booking flow
4. Check contact form
5. Validate responsive design
6. Test performance with Lighthouse
7. Monitor error logs

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed
5. Update VITE_API_BASE_URL environment variable