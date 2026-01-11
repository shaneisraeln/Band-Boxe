import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, LayoutDashboard } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-brand-red font-semibold' : 'text-gray-700 hover:text-brand-red font-medium';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-cream">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="flex flex-col items-start leading-none">
                <h1 className="text-3xl font-black font-serif text-gray-900 tracking-tighter group-hover:text-brand-red transition-colors">
                  BandBoxe
                </h1>
                <div className="flex items-center w-full">
                  <span className="h-[2px] w-6 bg-brand-red mr-2"></span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-600">Dry Cleaners</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/services" className={isActive('/services')}>Services</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <Link to="/dashboard" className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${location.pathname === '/dashboard' ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <LayoutDashboard size={16} />
              <span className="text-sm font-bold">My Orders</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden bg-brand-cream border-t border-red-100 py-6 px-6 flex flex-col gap-6 shadow-lg absolute w-full z-50">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-medium text-gray-800">Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-medium text-gray-800">About</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-medium text-gray-800">Services</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-medium text-gray-800">Contact</Link>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-bold text-brand-red flex items-center gap-2">
              <LayoutDashboard size={20} /> My Orders
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-red text-white pt-16 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex flex-col items-start leading-none mb-6">
                 <h2 className="text-3xl font-black font-serif tracking-tighter">BandBoxe</h2>
                 <p className="text-xs uppercase tracking-widest text-red-200 mt-1">Dry Cleaners</p>
              </div>
              <p className="text-red-100 text-sm leading-relaxed mb-6">
                Specialized garment care since 1950. We preserve your precious fabrics with state-of-the-art technology and traditional care.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-red-800 flex items-center justify-center hover:bg-white hover:text-brand-red transition-all"><Facebook size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-red-800 flex items-center justify-center hover:bg-white hover:text-brand-red transition-all"><Instagram size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-red-800 flex items-center justify-center hover:bg-white hover:text-brand-red transition-all"><Twitter size={16} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-red-100 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">My Orders</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3 text-red-100 text-sm">
                <li>Silk Saree Polishing</li>
                <li>Suit & Blazer Cleaning</li>
                <li>Wedding Attire Care</li>
                <li>Leather Restoration</li>
                <li>Darning & Alterations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-red-100 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <span>123 Silk Saree Lane, T. Nagar,<br/>Chennai, India - 600017</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0" />
                  <span>contact@bandboxe.in</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-red-200">
            <p>&copy; 2024 BandBoxe Dry Cleaners. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;