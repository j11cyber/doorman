import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemsDropdownOpen, setSystemsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const storedUser = localStorage.getItem('amco_user');
        setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSystemsDropdownOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSystemsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = location.pathname === '/';

  const doorSystems = [
    { name: 'Pivot Doors', path: '/products?category=Pivot%20Doors', desc: 'Oversized monolithic pivot portals' },
    { name: 'Concealed & Flush Doors', path: '/products?category=Concealed%20%26%20Flush%20Doors', desc: 'Zero-sightline frameless invisible doors' },
    { name: 'Sliding Glass Partitions', path: '/products?category=Sliding%20Glass%20Partitions', desc: 'Acoustic fluted and smoked glass dividers' },
    { name: 'Armored Security Doors', path: '/products?category=Armored%20Security%20Doors', desc: 'RC4 ballistic-grade fortified entrances' },
    { name: 'Bespoke Wood Doors', path: '/products?category=Bespoke%20Wood%20Doors', desc: 'Handcrafted ribbed walnut & smoked oak' },
    { name: 'Architectural Hardware', path: '/products?category=Architectural%20Hardware', desc: 'Cast solid bronze sculptural pulls' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled || !isHome
          ? 'bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-[#1C1C1C] py-3.5 sm:py-4 shadow-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Mark */}
          <Link to="/" className="flex flex-col group flex-shrink-0">
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.04em] text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors duration-300">
              <span className="font-light text-gray-300">The</span>
              <span className="font-medium text-white">Doorman</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] font-mono -mt-1 transition-opacity duration-300 group-hover:opacity-90">
              Architectural Doors
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* Shop Doors Link */}
            <Link
              to="/products"
              className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                location.pathname === '/products' && !location.search ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
              }`}
            >
              Shop Doors
            </Link>

            {/* Door Systems Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setSystemsDropdownOpen(true)}
              onMouseLeave={() => setSystemsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSystemsDropdownOpen(!systemsDropdownOpen)}
                className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 flex items-center space-x-1 ${
                  location.search.includes('category') ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Door Systems</span>
                <i className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${systemsDropdownOpen ? 'rotate-180 text-[#C5A880]' : ''}`}></i>
              </button>

              {/* Dropdown Menu */}
              {systemsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-[#0C0C0C]/98 border border-[#222222] shadow-2xl backdrop-blur-2xl p-3 grid grid-cols-1 gap-1 animate-fade-in">
                  <div className="px-3 py-2 border-b border-[#1A1A1A] mb-1">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                      Shop by Door System
                    </p>
                  </div>
                  {doorSystems.map((system) => (
                    <Link
                      key={system.name}
                      to={system.path}
                      className="px-3 py-2 rounded-none hover:bg-[#161616] text-left transition-colors group block"
                    >
                      <p className="text-xs font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors">
                        {system.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-light truncate mt-0.5">
                        {system.desc}
                      </p>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-[#1A1A1A] mt-1 px-3 py-1.5 flex justify-between items-center text-[10px] font-mono">
                    <Link to="/products" className="text-[#C5A880] hover:underline">
                      View Full Catalogue →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bespoke */}
            <Link
              to="/bespoke"
              className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                location.pathname === '/bespoke' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
              }`}
            >
              Bespoke
            </Link>

            {/* Projects */}
            <Link
              to="/projects"
              className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                location.pathname === '/projects' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
              }`}
            >
              Projects
            </Link>

            {/* About */}
            <Link
              to="/about"
              className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                location.pathname === '/about' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </Link>

            {/* Contact & Quote */}
            <Link
              to="/contact"
              className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                location.pathname === '/contact' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact & Quote
            </Link>

            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-xs uppercase tracking-widest-arch text-[#C5A880] border border-[#C5A880]/40 px-3 py-1 hover:bg-[#C5A880] hover:text-black transition-all duration-300 font-mono"
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Quick Catalogue Search Icon / Button */}
            <button
              onClick={() => navigate('/products')}
              className="p-2 text-gray-300 hover:text-[#C5A880] transition-colors"
              title="Search Catalogue"
              aria-label="Search Catalogue"
            >
              <i className="ri-search-line text-base sm:text-lg"></i>
            </button>

            {/* Cart Icon with Live Count */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-[#C5A880] transition-colors duration-300 flex items-center"
              aria-label="Specification Bag"
              title="Specification Bag"
            >
              <i className="ri-shopping-bag-line text-lg sm:text-xl"></i>
              {itemCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#0A0A0A] font-mono text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-fade-in">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            {/* Auth Link / Status */}
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-3 text-xs">
                <span className="text-gray-400 font-mono">
                  {currentUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-red-400 text-xs tracking-wider uppercase transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex text-xs uppercase tracking-widest-arch text-[#F3F3F1] hover:text-[#C5A880] transition-colors duration-300"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/98 border-b border-[#1C1C1C] px-6 py-8 mt-3 backdrop-blur-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link
              to="/products"
              className="text-lg font-serif text-[#F3F3F1] hover:text-[#C5A880] transition-colors flex items-center justify-between py-1 border-b border-[#1A1A1A]"
            >
              <span>Shop All Doors</span>
              <i className="ri-arrow-right-line text-xs text-[#C5A880]"></i>
            </Link>

            {/* Mobile Door Systems Links */}
            <div className="py-2 space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                Door Systems
              </p>
              <div className="grid grid-cols-1 gap-1.5 pl-2">
                {doorSystems.map((system) => (
                  <Link
                    key={system.name}
                    to={system.path}
                    className="text-sm font-light text-gray-300 hover:text-white py-1 transition-colors flex items-center justify-between"
                  >
                    <span>{system.name}</span>
                    <i className="ri-arrow-right-s-line text-gray-600 text-xs"></i>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/bespoke"
              className="text-base font-serif text-[#F3F3F1] hover:text-[#C5A880] transition-colors flex items-center justify-between py-2 border-t border-[#1A1A1A]"
            >
              <span>Bespoke Engineering</span>
              <i className="ri-arrow-right-line text-xs text-[#C5A880]"></i>
            </Link>

            <Link
              to="/projects"
              className="text-base font-serif text-[#F3F3F1] hover:text-[#C5A880] transition-colors flex items-center justify-between py-2 border-t border-[#1A1A1A]"
            >
              <span>Built Projects</span>
              <i className="ri-arrow-right-line text-xs text-[#C5A880]"></i>
            </Link>

            <Link
              to="/about"
              className="text-base font-serif text-[#F3F3F1] hover:text-[#C5A880] transition-colors flex items-center justify-between py-2 border-t border-[#1A1A1A]"
            >
              <span>About & Atelier</span>
              <i className="ri-arrow-right-line text-xs text-[#C5A880]"></i>
            </Link>

            <Link
              to="/contact"
              className="text-base font-serif text-[#F3F3F1] hover:text-[#C5A880] transition-colors flex items-center justify-between py-2 border-t border-[#1A1A1A]"
            >
              <span>Contact & Quote</span>
              <i className="ri-arrow-right-line text-xs text-[#C5A880]"></i>
            </Link>

            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-sm font-mono uppercase tracking-widest text-[#C5A880] py-2 border-t border-[#1C1C1C]"
              >
                Admin Dashboard
              </Link>
            )}

            <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
              {currentUser ? (
                <>
                  <span className="text-xs text-gray-400 font-mono">{currentUser.name}</span>
                  <button
                    onClick={logout}
                    className="text-xs text-red-400 uppercase tracking-widest"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center bg-[#C5A880] text-[#0A0A0A] py-3 text-xs uppercase tracking-widest-arch font-medium"
                >
                  Sign In to Spec Portal
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

