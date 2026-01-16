# BandBoxe Dry Cleaners

A modern, secure React application for a dry cleaning business with AI-powered customer support.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **AI Chat Support**: Google Gemini-powered customer assistance
- **Booking System**: Complete booking flow with local storage
- **Security First**: Input validation, sanitization, and security headers
- **Performance Optimized**: Code splitting and lazy loading
- **Production Ready**: Configured for Vercel deployment

## 🛡️ Security Features

- Content Security Policy (CSP) headers
- Input validation and sanitization
- Rate limiting on API calls
- XSS protection
- Secure environment variable handling
- No sensitive data exposure

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Generative AI
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd bandboxe-dry-cleaners
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. Start development server
```bash
npm run dev
```

## 🌐 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/bandboxe-dry-cleaners)

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables

Set these in your Vercel dashboard:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_APP_ENV=production
VITE_API_BASE_URL=https://your-domain.vercel.app
```

## 🧪 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript checks
npm run security-audit # Run security audit
npm run build-and-audit # Full production build with checks
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatWidget.tsx
│   └── Layout.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── BookingPage.tsx
│   ├── ContactPage.tsx
│   └── DashboardPage.tsx
├── services/           # API and data services
│   ├── geminiService.ts
│   └── databaseService.ts
├── utils/              # Utility functions
│   └── security.ts
├── types.ts            # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🔒 Security Considerations

- All user inputs are validated and sanitized
- API keys are properly secured using environment variables
- Rate limiting prevents API abuse
- Security headers protect against common attacks
- No sensitive data is stored in localStorage
- Production builds remove console logs

## 🎨 Customization

### Colors
The app uses a custom color palette defined in Tailwind config:
- `brand-red`: #991B1B
- `brand-cream`: #FEFBF4
- `brand-gold`: #fbbf24

### Fonts
- Headers: Playfair Display (serif)
- Body: Inter (sans-serif)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and security checks
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email contact@bandboxe.in or call +91 98765 43210.
